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
  instagram: "escp.ai" as string | null,
  /** URL of the internal member platform. TODO: confirm. */
  memberPlatformUrl: null as string | null,
  /** External shop / order form URL. When null, orders go through email. */
  shopOrderUrl: null as string | null,
  /** Online application form for recruitment. When null, applications go through email. */
  applicationUrl: null as string | null,
};

/** Impact figures. Leave `value` null until a verified figure is available. */
export const impact: { key: string; value: number | null; suffix?: string }[] = [
  { key: "community", value: 1200, suffix: "+" },
  { key: "events", value: null, suffix: "+" },
  { key: "members", value: null, suffix: "+" },
  { key: "campuses", value: 4 },
  { key: "companies", value: null },
  { key: "projects", value: null },
];

export type CampusKey = "paris" | "turin" | "madrid" | "berlin" | "london";

export type Campus = {
  key: CampusKey;
  lat: number;
  lon: number;
  /** London is the planned January 2027 branch, drawn as a future node. */
  upcoming?: boolean;
  /** The branch's own Instagram account. */
  instagram: string | null;
  /**
   * Photos live in public/campuses/<key>/. Leave a slot null until a photo you
   * have the rights to use is added; the page shows a "photo coming soon" panel.
   */
  campusPhoto: string | null;
  landmarkPhotos: (string | null)[];
};

export const campuses: Campus[] = [
  { key: "paris", lat: 48.8566, lon: 2.3522, instagram: "escp.ai", campusPhoto: null, landmarkPhotos: [null, null, null] },
  { key: "turin", lat: 45.0703, lon: 7.6869, instagram: "escp.ai_turin", campusPhoto: null, landmarkPhotos: [null, null, null] },
  { key: "madrid", lat: 40.4168, lon: -3.7038, instagram: "escp.ai_madrid", campusPhoto: null, landmarkPhotos: [null, null, null] },
  { key: "berlin", lat: 52.52, lon: 13.405, instagram: "escp.ai_berlin", campusPhoto: null, landmarkPhotos: [null, null, null] },
  { key: "london", lat: 51.5072, lon: -0.1276, upcoming: true, instagram: null, campusPhoto: null, landmarkPhotos: [null, null, null] },
];

export const findCampus = (key: string) => campuses.find((c) => c.key === key);

export const people = {
  "gianni-taieb": "Gianni Taieb",
  "jeremy-vilcosqui": "Jeremy Vilcosqui",
  "laurent-darnis": "Laurent Darnis",
  "yessine-ben-mansour": "Yessine Ben Mansour",
  "anna-di-raddo": "Anna Di Raddo",
  "louise-frorath": "Louise Frorath",
  "luke-lord": "Luke Lord",
  "thomas-desormais": "Thomas Desormais",
  "joseph-gouraud": "Joseph Gouraud",
  "brice-borde": "Brice Borde",
} as const;

export type PersonId = keyof typeof people;
export const photo = (id: PersonId) => `/team/${id}.webp`;

/** Teams as presented on the ESCP AI Instagram. A person can sit in more than one team. */
export const teamGroups: { key: "bureau" | "research" | "eventsComms" | "business"; members: { id: PersonId; role?: string }[] }[] = [
  {
    key: "bureau",
    members: [
      { id: "gianni-taieb", role: "president" },
      { id: "jeremy-vilcosqui", role: "vicePresident" },
      { id: "laurent-darnis", role: "treasurer" },
    ],
  },
  {
    key: "research",
    members: [{ id: "brice-borde" }, { id: "yessine-ben-mansour", role: "generalSecretary" }, { id: "luke-lord" }],
  },
  {
    key: "eventsComms",
    members: [{ id: "anna-di-raddo", role: "events" }, { id: "thomas-desormais" }, { id: "louise-frorath" }],
  },
  {
    key: "business",
    members: [{ id: "joseph-gouraud" }, { id: "thomas-desormais" }, { id: "laurent-darnis" }],
  },
];

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
  /** Exact start, with time zone, for the live countdown. */
  startsAt?: string;
  /** Registration link. TODO: add once available. */
  registrationUrl: string | null;
  /** Number of places. TODO: add once known. */
  places: number | null;
  featured?: boolean;
};

export const events: EventRecord[] = [
  { slug: "kpmg-ai-conference", date: "2026-10-20", sortKey: "2026-10-20", time: "17:45", startsAt: "2026-10-20T17:45:00+02:00", registrationUrl: null, places: null, featured: true },
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
