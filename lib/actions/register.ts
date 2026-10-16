"use server";

import { dbEnabled, sql } from "@/lib/db";
import { isRegistrable } from "@/lib/event-store";
import { CAMPUSES } from "@/lib/sample-data";

export type RegisterState = { status: "idle" | "success" | "already" | "invalid" | "error" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Public event registration. No account needed; one registration per email per event. */
export async function registerForEvent(_prev: RegisterState, formData: FormData): Promise<RegisterState> {
  // Bots fill every field; people never see this one.
  if (String(formData.get("website") ?? "") !== "") return { status: "success" };

  const slug = String(formData.get("slug") ?? "");
  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const campusRaw = String(formData.get("campus") ?? "");
  const campus = (CAMPUSES as readonly string[]).includes(campusRaw) ? campusRaw : null;
  if (name.length < 2 || !EMAIL.test(email)) return { status: "invalid" };
  if (!dbEnabled()) return { status: "error" };

  try {
    if (!(await isRegistrable(slug))) return { status: "error" };
    const rows = await sql<{ id: number }>(
      "insert into registrations (event_slug, name, email, campus) values ($1, $2, $3, $4) on conflict (event_slug, email) do nothing returning id",
      [slug, name, email, campus],
    );
    return { status: rows.length ? "success" : "already" };
  } catch (err) {
    console.error("Registration failed", err);
    return { status: "error" };
  }
}
