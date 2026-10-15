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
