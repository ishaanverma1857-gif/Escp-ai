import { events, type EventRecord } from "@/content/site";
import { formatDate, type Locale } from "./i18n";

export const sortedEvents = () => [...events].sort((a, b) => a.sortKey.localeCompare(b.sortKey));

export const featuredEvent = () => events.find((e) => e.featured) ?? sortedEvents()[0];

export const findEvent = (slug: string) => events.find((e) => e.slug === slug);

/** Day + month parts for the date badges. Falls back to the textual label when the day is not fixed. */
export function dateParts(locale: Locale, e: EventRecord) {
  if (!e.date) return null;
  return {
    day: formatDate(locale, e.date, { day: "numeric" }),
    month: formatDate(locale, e.date, { month: "long" }),
    year: formatDate(locale, e.date, { year: "numeric" }),
    weekday: formatDate(locale, e.date, { weekday: "long" }),
  };
}

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

/**
 * When an event is over (ms). Uses endsAt, else 3 hours after startsAt, else the end of its day in Paris.
 * Events without a fixed day ("Early November") stay listed until two weeks after their sort date.
 */
export function eventEndsAt(e: EventRecord) {
  if (e.endsAt) return Date.parse(e.endsAt);
  if (e.startsAt) return Date.parse(e.startsAt) + 3 * HOUR;
  return Date.parse(`${e.date ?? e.sortKey}T23:59:59+01:00`) + (e.date ? 0 : 14 * DAY);
}

/** Upcoming and past events at a given time, and which one the homepage should feature. */
export function timeline(now: number) {
  const all = sortedEvents();
  const upcoming = all.filter((e) => eventEndsAt(e) > now);
  const past = all.filter((e) => eventEndsAt(e) <= now).reverse();
  const featured = upcoming.find((e) => e.featured) ?? upcoming.find((e) => e.startsAt) ?? upcoming[0] ?? past[0] ?? all[0];
  return { featured, upcoming, past };
}
