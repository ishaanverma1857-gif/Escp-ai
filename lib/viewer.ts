import "server-only";
import { connection } from "next/server";
import { authEnabled, isEscpEmail } from "./auth";
import { CAMPUSES, DIVISIONS, type Campus, type Division } from "./sample-data";

/**
 * Roles are set by the team in the Clerk dashboard:
 * Users → the person → Metadata → Public →
 *   { "member": true, "role": "superadmin" | "branchadmin" | "divisionlead" | "member", "campus": "paris", "division": "events" }
 */
export const ROLES = ["superadmin", "branchadmin", "divisionlead", "member"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABEL: Record<Role, string> = {
  superadmin: "Super Admin",
  branchadmin: "Branch Admin",
  divisionlead: "Division Lead",
  member: "Member",
};

export type Viewer = {
  id: string;
  name: string;
  email: string;
  role: Role;
  campus: Campus | null;
  division: Division | null;
};

const pick = <T extends string>(list: readonly T[], value: unknown): T | null =>
  typeof value === "string" && (list as readonly string[]).includes(value) ? (value as T) : null;

/** Reads a role from Clerk public metadata. Confirmed members without a role are plain members. */
export function roleFrom(meta: Record<string, unknown> | undefined): Role | null {
  const role = pick(ROLES, meta?.role);
  if (role) return role;
  return meta?.member === true ? "member" : null;
}

/**
 * Local testing only: with no Clerk keys and outside Vercel, PROTOTYPE_DEV_ROLE stands in for a signed-in user.
 * It can never apply on the live site, where the Clerk keys are always set.
 */
export const devViewerEnabled = () => !authEnabled() && !process.env.VERCEL && !!pick(ROLES, process.env.PROTOTYPE_DEV_ROLE);

/** The signed-in dashboard user, or null when signed out, not an ESCP email, or not a confirmed member. */
export async function getViewer(): Promise<Viewer | null> {
  await connection();
  if (devViewerEnabled()) {
    return {
      id: "dev",
      name: "Test user",
      email: "test.user@edu.escp.eu",
      role: pick(ROLES, process.env.PROTOTYPE_DEV_ROLE)!,
      campus: pick(CAMPUSES, process.env.PROTOTYPE_DEV_CAMPUS) ?? "paris",
      division: pick(DIVISIONS, process.env.PROTOTYPE_DEV_DIVISION),
    };
  }
  if (!authEnabled()) return null;

  const { currentUser } = await import("@clerk/nextjs/server");
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  if (!user || !isEscpEmail(email)) return null;
  const role = roleFrom(user.publicMetadata);
  if (!role) return null;
  return {
    id: user.id,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || email.split("@")[0],
    email,
    role,
    campus: pick(CAMPUSES, user.publicMetadata?.campus),
    division: pick(DIVISIONS, user.publicMetadata?.division),
  };
}

/* ---------- What each role may do. Checked on the server for every page and action. ---------- */

export const canManageEvents = (v: Viewer) => v.role === "superadmin" || v.role === "branchadmin";

/** Super Admins handle every campus; Branch Admins only their own. */
export const canManageEventOn = (v: Viewer, campus: string) =>
  v.role === "superadmin" || (v.role === "branchadmin" && v.campus === campus);

export const eventCampusesFor = (v: Viewer): readonly Campus[] =>
  v.role === "superadmin" ? CAMPUSES : v.campus ? [v.campus] : [];

/** Creating, assigning and deleting tasks. */
export const canEditTask = (v: Viewer, t: { campus: string; division: string }) =>
  v.role === "superadmin" ||
  (v.role === "branchadmin" && v.campus === t.campus) ||
  (v.role === "divisionlead" && v.division === t.division);

/** Moving a task along (status): editors, plus members on the same campus. */
export const canUpdateTaskStatus = (v: Viewer, t: { campus: string; division: string }) =>
  canEditTask(v, t) || (v.campus !== null && v.campus === t.campus);

export const canCreateTasks = (v: Viewer) => v.role !== "member";

export const canResetSampleData = (v: Viewer) => v.role === "superadmin";
