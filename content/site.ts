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
  { key: "paris", lat: 48.8566, lon: 2.3522, instagram: "escp.ai", campusPhoto: "/campuses/paris/campus.webp", landmarkPhotos: ["/campuses/paris/1.webp", "/campuses/paris/2.webp", "/campuses/paris/3.webp"] },
  { key: "turin", lat: 45.0703, lon: 7.6869, instagram: "escp.ai_turin", campusPhoto: "/campuses/turin/campus-2.webp", landmarkPhotos: [null, "/campuses/turin/2.webp", "/campuses/turin/3-2.webp"] },
  { key: "madrid", lat: 40.4168, lon: -3.7038, instagram: "escp.ai_madrid", campusPhoto: "/campuses/madrid/campus.webp", landmarkPhotos: ["/campuses/madrid/1.webp", "/campuses/madrid/2.webp", "/campuses/madrid/3.webp"] },
  { key: "berlin", lat: 52.52, lon: 13.405, instagram: "escp.ai_berlin", campusPhoto: "/campuses/berlin/campus.webp", landmarkPhotos: ["/campuses/berlin/1.webp", "/campuses/berlin/2.webp", "/campuses/berlin/3.webp"] },
  { key: "london", lat: 51.5072, lon: -0.1276, upcoming: true, instagram: null, campusPhoto: "/campuses/london/campus.webp", landmarkPhotos: ["/campuses/london/1.webp", "/campuses/london/2.webp", "/campuses/london/3.webp"] },
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
  /** Expected end, with time zone. Without it an event counts as ended 3 hours after it starts (or at the end of its day). */
  endsAt?: string;
  /** Registration link. TODO: add once available. */
  registrationUrl: string | null;
  /** Number of places. TODO: add once known. */
  places: number | null;
  featured?: boolean;
  /** Language the event is held in, when it isn't English (ISO code). Shows an "English recap after the event" notice. */
  heldIn?: string;
};

export const events: EventRecord[] = [
  { slug: "kpmg-ai-conference", date: "2026-10-20", sortKey: "2026-10-20", time: "17:45", startsAt: "2026-10-20T17:45:00+02:00", endsAt: "2026-10-20T21:00:00+02:00", registrationUrl: null, places: null, featured: true, heldIn: "fr" },
  { slug: "ai-optimisation-workshop", date: "2026-10-28", sortKey: "2026-10-28", registrationUrl: null, places: null },
  { slug: "deep-tech-round-tables", sortKey: "2026-11-03", registrationUrl: null, places: null },
  { slug: "accio-work-workshop", sortKey: "2026-11-05", registrationUrl: null, places: null },
  { slug: "macro-de-curtis-conference", sortKey: "2026-11-15", registrationUrl: null, places: null },
  { slug: "artefact-case-study", sortKey: "2026-11-25", registrationUrl: null, places: null },
  { slug: "london-branch-launch", sortKey: "2027-01-15", registrationUrl: null, places: null },
];

export const products = [
  { key: "hoodie", price: 49, colour: "#1B2A4A", colourKey: "navy", image: "/shop/hoodie-ai-incompetent.webp", sizes: ["S", "M", "L", "XL"] },
  { key: "tshirt", price: 29, colour: "#FFFFFF", colourKey: "white", image: "/shop/tshirt-ai-incompetent.webp", sizes: ["S", "M", "L", "XL"] },
  { key: "cap", price: 25, colour: "#14161B", colourKey: "black", image: "/shop/cap-ai-incompetent.webp", sizes: [] },
] as const;

/**
 * The student team that built this website. Photos go in public/builders/ (e.g. "/builders/filippo.webp");
 * videos in public/builders/ too (e.g. "/builders/video-1.mp4"). Leave null until they arrive.
 */
export const builders = {
  instagram: "artificially.incompetent.escp",
  members: [
    { id: "filippo", name: "Filippo", role: "lead", photo: null as string | null },
    { id: "constantin", name: "Constantin", role: "finance", photo: null as string | null },
    { id: "ishaan", name: "Ishaan", role: "cto", photo: null as string | null },
  ],
  videos: [
    { src: "/builders/build-film-1.mp4" as string | null, webm: "/builders/build-film-1.webm" as string | null, poster: "/builders/build-film-1-poster.webp" as string | null },
    { src: null as string | null, webm: null as string | null, poster: null as string | null },
  ],
} as const;
