"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { getViewer, canManageEventOn } from "@/lib/viewer";
import { staticEventCampus } from "@/lib/event-store";
import { findEvent } from "@/lib/events";
import { hasLocale } from "@/lib/i18n";

export type EventFormState = { error: string | null };

const text = (f: FormData, k: string, max = 500) => String(f.get(k) ?? "").trim().slice(0, max);
const optional = (f: FormData, k: string, max = 300) => text(f, k, max) || null;

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "event";

const dashboardPath = (f: FormData) => {
  const lang = String(f.get("lang") ?? "en");
  return `/${hasLocale(lang) ? lang : "en"}/dashboard`;
};

/** Create or edit a dashboard event. The submit button decides: save as draft or publish. */
export async function saveEvent(_prev: EventFormState, f: FormData): Promise<EventFormState> {
  const viewer = await getViewer();
  if (!viewer) return { error: "Your session has expired. Log in again." };

  const id = Number(f.get("id")) || null;
  const campus = text(f, "campus", 20);
  if (!canManageEventOn(viewer, campus)) return { error: "You can only manage events for your own campus." };

  const title = text(f, "title", 140);
  const date = text(f, "date", 10);
  if (title.length < 3) return { error: "Give the event a title." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Choose a date." };
  const placesRaw = text(f, "places", 6);
  const places = placesRaw ? Math.max(0, Math.floor(Number(placesRaw))) || null : null;
  const status = f.get("intent") === "publish" ? "published" : "draft";

  const values = [
    title,
    text(f, "short", 200),
    text(f, "description", 4000),
    campus,
    date,
    optional(f, "time", 20),
    optional(f, "location"),
    optional(f, "organizer"),
    optional(f, "speakers"),
    places,
    status,
  ];

  let savedId = id;
  if (id) {
    const existing = await sql<{ campus: string }>("select campus from events where id = $1", [id]);
    if (!existing[0] || !canManageEventOn(viewer, existing[0].campus)) return { error: "You can't edit this event." };
    await sql(
      "update events set title=$1, short=$2, description=$3, campus=$4, date=$5, time=$6, location=$7, organizer=$8, speakers=$9, places=$10, status=$11 where id=$12",
      [...values, id],
    );
  } else {
    const slug = `${slugify(title)}-${Date.now().toString(36).slice(-5)}`;
    const rows = await sql<{ id: number }>(
      "insert into events (title, short, description, campus, date, time, location, organizer, speakers, places, status, slug, created_by) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning id",
      [...values, slug, viewer.email],
    );
    savedId = rows[0].id;
  }

  // The public Events pages pick the change up on their next visit.
  updateTag("events");
  redirect(`${dashboardPath(f)}/events/${savedId}?saved=${status}`);
}

export async function setEventStatus(f: FormData) {
  const viewer = await getViewer();
  const id = Number(f.get("id"));
  const status = f.get("status") === "published" ? "published" : "draft";
  if (!viewer || !id) return;
  const rows = await sql<{ campus: string }>("select campus from events where id = $1", [id]);
  if (!rows[0] || !canManageEventOn(viewer, rows[0].campus)) return;
  await sql("update events set status = $1 where id = $2", [status, id]);
  updateTag("events");
  refresh();
}

export async function deleteEvent(f: FormData) {
  const viewer = await getViewer();
  const id = Number(f.get("id"));
  if (!viewer || !id) return;
  const rows = await sql<{ campus: string; slug: string }>("select campus, slug from events where id = $1", [id]);
  if (!rows[0] || !canManageEventOn(viewer, rows[0].campus)) return;
  await sql("delete from registrations where event_slug = $1", [rows[0].slug]);
  await sql("delete from events where id = $1", [id]);
  updateTag("events");
  redirect(`${dashboardPath(f)}/events`);
}

/** The campus an event belongs to, whether it was written in the site's content or created in the dashboard. */
async function campusOfSlug(slug: string) {
  if (findEvent(slug)) return staticEventCampus(slug);
  const rows = await sql<{ campus: string }>("select campus from events where slug = $1", [slug]);
  return rows[0]?.campus ?? null;
}

export async function setAttendance(f: FormData) {
  const viewer = await getViewer();
  const regId = Number(f.get("registration"));
  if (!viewer || !regId) return;
  const reg = await sql<{ event_slug: string }>("select event_slug from registrations where id = $1", [regId]);
  const campus = reg[0] ? await campusOfSlug(reg[0].event_slug) : null;
  if (!campus || !canManageEventOn(viewer, campus)) return;
  await sql("update registrations set attended = $1 where id = $2", [f.get("attended") === "true", regId]);
  refresh();
}
