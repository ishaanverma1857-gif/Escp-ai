/**
 * Facts and links that are shared by both languages.
 *
 * Anything set to `null` is still waiting for confirmation (see the
 * "Before Publication" list in the copy document). The site is built to
 * degrade gracefully: a null link renders as a "coming soon" state instead of
 * a broken button, and a null impact figure is simply not shown.
 */

export const site = {
  name: "ESCP AI",
  /** Official contact email, e.g. "hello@escp-ai.org". TODO: confirm. */
  email: null as string | null,
  /** Instagram handle without the @, e.g. "escp.ai". TODO: confirm. */
  instagram: null as string | null,
  /** URL of the internal member platform. TODO: confirm. */
  memberPlatformUrl: null as string | null,
  /** External shop / order form URL. When null, orders go through email. */
  shopOrderUrl: null as string | null,
  /** Online application form for recruitment. When null, applications go through email. */
  applicationUrl: null as string | null,
};

/** Impact figures. Leave `value` null until a verified figure is available. */
export const impact: { key: string; value: number | null; suffix?: string }[] = [
  { key: "events", value: null, suffix: "+" },
  { key: "members", value: null, suffix: "+" },
  { key: "campuses", value: 3 },
  { key: "companies", value: null },
  { key: "projects", value: null },
];

export type Campus = {
  key: "paris" | "turin" | "madrid" | "london";
  lat: number;
  lon: number;
  /** London is the planned January 2027 branch, drawn as a future node. */
  upcoming?: boolean;
};

export const campuses: Campus[] = [
  { key: "paris", lat: 48.8566, lon: 2.3522 },
  { key: "turin", lat: 45.0703, lon: 7.6869 },
  { key: "madrid", lat: 40.4168, lon: -3.7038 },
  { key: "london", lat: 51.5072, lon: -0.1276, upcoming: true },
];

export const team = [
  { name: "Gianni Taleb", role: "president" },
  { name: "Jeremy Vilcosqui", role: "vicePresident" },
  { name: "Laurent Darnis", role: "treasurer" },
  { name: "Yessine Ben-Mansour", role: "generalSecretary" },
  { name: "Anna Di Raddo", role: "events" },
  { name: "Luke Lord", role: "research" },
  { name: "Thomas Desormais", role: "communication" },
  { name: "Joseph Gouraud", role: "business" },
  { name: "Brice Borde", role: "research" },
] as const;

/** Partner names as written in the copy document. Logos need approval first. */
export const partners = [
  "KPMG",
  "Artefact",
  "OpenAI",
  "Accio Work",
  "Hugging Face",
  "Les EnthousIAstes",
];

export type EventSlug =
  | "kpmg-ai-conference"
  | "ai-optimisation-workshop"
  | "deep-tech-round-tables"
  | "accio-work-workshop"
  | "macro-de-curtis-conference"
  | "artefact-case-study"
  | "london-branch-launch";

export type EventRecord = {
  slug: EventSlug;
  /** ISO date when the exact day is confirmed. */
  date?: string;
  /** Used to sort events whose exact day is not confirmed yet. */
  sortKey: string;
  time?: string;
  /** Registration link. TODO: add once available. */
  registrationUrl: string | null;
  /** Number of places. TODO: add once known. */
  places: number | null;
  featured?: boolean;
};

export const events: EventRecord[] = [
  { slug: "kpmg-ai-conference", date: "2026-10-20", sortKey: "2026-10-20", time: "18:00", registrationUrl: null, places: null, featured: true },
  { slug: "ai-optimisation-workshop", date: "2026-10-28", sortKey: "2026-10-28", registrationUrl: null, places: null },
  { slug: "deep-tech-round-tables", sortKey: "2026-11-03", registrationUrl: null, places: null },
  { slug: "accio-work-workshop", sortKey: "2026-11-05", registrationUrl: null, places: null },
  { slug: "macro-de-curtis-conference", sortKey: "2026-11-15", registrationUrl: null, places: null },
  { slug: "artefact-case-study", sortKey: "2026-11-25", registrationUrl: null, places: null },
  { slug: "london-branch-launch", sortKey: "2027-01-15", registrationUrl: null, places: null },
];

export const products = [
  { key: "hoodie", price: 40, colour: "#14161B", colourKey: "black" },
  { key: "tshirt", price: 29, colour: "#FFFFFF", colourKey: "white" },
  { key: "cap", price: 25, colour: "#1B2A4A", colourKey: "navy" },
] as const;
