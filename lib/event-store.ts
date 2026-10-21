import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getDictionary, formatDate, type Locale } from "./i18n";
import { dbEnabled, sql } from "./db";
import { dateParts, eventEndsAt, findEvent, sortedEvents } from "./events";
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

/** "2026-10-28" + "18:30" in Paris time → an ISO timestamp with the right offset (summer or winter time). */
export function parisISO(date: string, time = "00:00") {
  const guess = new Date(`${date}T${time}:00Z`);
  const name = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", timeZoneName: "longOffset" })
    .formatToParts(guess)
    .find((p) => p.type === "timeZoneName")?.value;
  const offset = name && name !== "GMT" ? name.replace("GMT", "") : "+00:00";
  return `${date}T${time}:00${offset}`;
}

const HOUR = 3_600_000;
const validTime = (t: string | null | undefined) => (t && /^\d{2}:\d{2}$/.test(t) ? t : null);

/** One event as every list shows it: hand-written and dashboard events alike, with exact start and end. */
export type EventCard = {
  slug: string;
  when: string;
  title: string;
  short: string;
  description: string;
  partner: string | null;
  time: string | null;
  location: string | null;
  registrationUrl: string | null;
  date: { weekday: string; day: string; month: string } | null;
  /** Exact start when the time is known (drives the live timer). */
  startsAt: string | null;
  /** Start for ordering: the exact start, else the start of the day (or the rough sort date). */
  start: number;
  endsAt: number;
  featured: boolean;
  sortKey: string;
};

const longDate = (lang: Locale, iso: string) => formatDate(lang, iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/** Every public event, hand-written and dashboard-created, in start order. */
export async function eventCards(lang: Locale): Promise<EventCard[]> {
  const items = getDictionary(lang).events.items;
  const fixed: EventCard[] = sortedEvents().map((e) => {
    const c = items[e.slug];
    const d = dateParts(lang, e);
    return {
      slug: e.slug,
      when: c.when,
      title: c.title,
      short: c.short,
      description: c.description,
      partner: c.partner,
      time: c.time,
      location: c.location,
      registrationUrl: e.registrationUrl,
      date: d ? { weekday: d.weekday, day: d.day, month: d.month } : null,
      startsAt: e.startsAt ?? null,
      start: Date.parse(e.startsAt ?? parisISO(e.date ?? e.sortKey)),
      endsAt: eventEndsAt(e),
      featured: !!e.featured,
      sortKey: e.sortKey,
    };
  });
  const created: EventCard[] = (await publishedDbEvents()).map((e) => {
    const time = validTime(e.time);
    const startsAt = time ? parisISO(e.date, time) : null;
    return {
      slug: e.slug,
      when: longDate(lang, e.date),
      title: e.title,
      short: e.short,
      description: e.description || e.short,
      partner: null,
      time,
      location: e.location,
      registrationUrl: null,
      date: {
        weekday: formatDate(lang, e.date, { weekday: "long" }),
        day: formatDate(lang, e.date, { day: "numeric" }),
        month: formatDate(lang, e.date, { month: "long" }),
      },
      startsAt,
      start: Date.parse(startsAt ?? parisISO(e.date)),
      endsAt: startsAt ? Date.parse(startsAt) + 3 * HOUR : Date.parse(parisISO(e.date, "23:59")),
      featured: false,
      sortKey: e.date,
    };
  });
  return [...fixed, ...created].sort((a, b) => a.start - b.start || a.sortKey.localeCompare(b.sortKey));
}

/**
 * Which events are still to come (or happening now) and which are over, at a given time.
 * The next one — the soonest that hasn't ended — is the one the homepage features.
 */
export function splitByTime(cards: EventCard[], now: number) {
  const upcoming = cards.filter((c) => c.endsAt > now);
  const past = cards.filter((c) => c.endsAt <= now).sort((a, b) => b.start - a.start);
  return { upcoming, past, next: upcoming[0] ?? past[0] ?? null };
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
  startsAt: string | null;
  endsAt: number;
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
      startsAt: fixed.startsAt ?? null,
      endsAt: eventEndsAt(fixed),
    };
  }
  const e = (await publishedDbEvents()).find((x) => x.slug === slug);
  if (!e) return null;
  const when = longDate(lang, e.date);
  const dbTime = validTime(e.time);
  const dbStart = dbTime ? parisISO(e.date, dbTime) : null;
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
    startsAt: dbStart,
    endsAt: dbStart ? Date.parse(dbStart) + 3 * HOUR : Date.parse(parisISO(e.date, "23:59")),
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

/**
 * The current time, cached for a minute. Static pages use it to decide what is upcoming or past
 * and are regenerated in the background every minute, so nothing needs a redeploy after an event.
 * The exact live state (countdown, "happening now") is worked out in the visitor's browser.
 */
export async function siteClock() {
  "use cache";
  cacheLife("minutes");
  return Date.now();
}
