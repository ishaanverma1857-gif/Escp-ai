import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getDictionary, formatDate, type Locale } from "./i18n";
import { dbEnabled, sql } from "./db";
import { dateParts, findEvent, sortedEvents } from "./events";
import type { EventRecord } from "@/content/site";

/** An event created in the dashboard. Written in one language by the organiser, shown as-is everywhere. */
export type DbEvent = {
  id: number;
  slug: string;
  title: string;
  short: string;
  description: string;
  campus: string;
  date: string;
  time: string | null;
  location: string | null;
  organizer: string | null;
  speakers: string | null;
  places: number | null;
  status: "draft" | "published";
};

export const EVENT_COLUMNS =
  "id, slug, title, short, description, campus, to_char(date, 'YYYY-MM-DD') as date, time, location, organizer, speakers, places, status";

/** Published dashboard events. Cached, and refreshed the moment an admin publishes, edits or removes one. */
export async function publishedDbEvents(): Promise<DbEvent[]> {
  "use cache";
  cacheTag("events");
  if (!dbEnabled()) {
    cacheLife("max");
    return [];
  }
  try {
    const rows = await sql<DbEvent>(`select ${EVENT_COLUMNS} from events where status = 'published' order by date`);
    cacheLife("hours");
    return rows;
  } catch (err) {
    // The site keeps working on the hand-written events if the database is unreachable; it retries soon.
    console.error("Could not load events", err);
    cacheLife("minutes");
    return [];
  }
}

/** The campus a hand-written event belongs to, for permissions in the dashboard. */
export const staticEventCampus = (slug: string) => (slug === "london-branch-launch" ? "london" : "paris");

export type EventCard = { slug: string; when: string; title: string; short: string; featured: boolean; sortKey: string };

const longDate = (lang: Locale, iso: string) => formatDate(lang, iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/** Every public event, hand-written and dashboard-created, in date order. */
export async function eventCards(lang: Locale): Promise<EventCard[]> {
  const items = getDictionary(lang).events.items;
  const fixed = sortedEvents().map((e) => ({
    slug: e.slug,
    when: items[e.slug].when,
    title: items[e.slug].title,
    short: items[e.slug].short,
    featured: !!e.featured,
    sortKey: e.sortKey,
  }));
  const created = (await publishedDbEvents()).map((e) => ({
    slug: e.slug,
    when: longDate(lang, e.date),
    title: e.title,
    short: e.short,
    featured: false,
    sortKey: e.date,
  }));
  return [...fixed, ...created].sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

export type EventDetail = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  short: string;
  description: string;
  time: string | null;
  location: string | null;
  speakers: string | null;
  places: number | null;
  partner: string | null;
  audience: string | null;
  organizer: string | null;
  programme: string | null;
  registrationUrl: string | null;
  heldIn: string | null;
};

export async function eventDetail(lang: Locale, slug: string): Promise<EventDetail | null> {
  const fixed: EventRecord | undefined = findEvent(slug);
  if (fixed) {
    const c = getDictionary(lang).events.items[fixed.slug];
    const d = dateParts(lang, fixed);
    return {
      slug,
      title: c.title,
      kicker: c.when,
      date: d ? `${d.weekday} ${d.day} ${d.month} ${d.year}` : c.when,
      short: c.short,
      description: c.description,
      time: c.time,
      location: c.location,
      speakers: c.speakers,
      places: fixed.places,
      partner: c.partner,
      audience: c.audience,
      organizer: null,
      programme: c.programme ?? null,
      registrationUrl: fixed.registrationUrl,
      heldIn: fixed.heldIn ?? null,
    };
  }
  const e = (await publishedDbEvents()).find((x) => x.slug === slug);
  if (!e) return null;
  const when = longDate(lang, e.date);
  return {
    slug,
    title: e.title,
    kicker: when,
    date: when,
    short: e.short,
    description: e.description || e.short,
    time: e.time,
    location: e.location,
    speakers: e.speakers,
    places: e.places,
    partner: null,
    audience: null,
    organizer: e.organizer,
    programme: null,
    registrationUrl: null,
    heldIn: null,
  };
}

/** True when a visitor may register for this slug: a hand-written event, or a published dashboard event. */
export async function isRegistrable(slug: string) {
  if (findEvent(slug)) return true;
  if (!dbEnabled()) return false;
  const rows = await sql<{ id: number }>("select id from events where slug = $1 and status = 'published'", [slug]);
  return rows.length > 0;
}

/** The campus an event belongs to, whether written in the site's content or created in the dashboard. */
export async function campusOfSlug(slug: string) {
  if (findEvent(slug)) return staticEventCampus(slug);
  const rows = await sql<{ campus: string }>("select campus from events where slug = $1", [slug]);
  return rows[0]?.campus ?? null;
}
