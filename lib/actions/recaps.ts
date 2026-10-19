"use server";

import { refresh, updateTag } from "next/cache";
import { sql } from "@/lib/db";
import { campusOfSlug } from "@/lib/event-store";
import { HELD_IN } from "@/lib/recaps";
import { canManageEventOn, getViewer } from "@/lib/viewer";

export type RecapFormState = { error: string | null; saved?: "draft" | "published"; at?: number };

const text = (f: FormData, k: string, max: number) => String(f.get(k) ?? "").replace(/\r\n/g, "\n").trim().slice(0, max);

/** Save an event's recap as a draft or publish it on the public event page. */
export async function saveRecap(_prev: RecapFormState, f: FormData): Promise<RecapFormState> {
  const viewer = await getViewer();
  if (!viewer) return { error: "Your session has expired. Log in again." };
  const slug = text(f, "slug", 120);
  const campus = slug ? await campusOfSlug(slug) : null;
  if (!campus) return { error: "This event no longer exists." };
  if (!canManageEventOn(viewer, campus)) return { error: "Only this campus's admins can edit its recap." };

  const heldRaw = text(f, "heldIn", 5);
  const heldIn = (HELD_IN as readonly string[]).includes(heldRaw) ? heldRaw : "fr";
  const summary = text(f, "summary", 20_000);
  const status = f.get("intent") === "publish" ? "published" : "draft";
  if (status === "published" && summary.length < 20) return { error: "Add a summary before publishing." };

  await sql(
    `insert into recaps (event_slug, held_in, summary, takeaways, links, transcript, status, updated_by, updated_at)
     values ($1,$2,$3,$4,$5,$6,$7,$8, now())
     on conflict (event_slug) do update set held_in = $2, summary = $3, takeaways = $4, links = $5, transcript = $6, status = $7, updated_by = $8, updated_at = now()`,
    [slug, heldIn, summary, text(f, "takeaways", 10_000), text(f, "links", 10_000), text(f, "transcript", 400_000), status, viewer.email],
  );
  updateTag("recaps");
  refresh();
  return { error: null, saved: status, at: Date.now() };
}
