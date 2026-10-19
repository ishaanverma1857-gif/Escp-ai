import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { dbEnabled, sql } from "./db";

/**
 * Event recaps: an English summary, key takeaways, links and the full transcript,
 * prepared with AI from the event recording and published from the dashboard.
 */
export type Recap = {
  eventSlug: string;
  heldIn: string;
  summary: string;
  takeaways: string;
  links: string;
  transcript: string;
  status: "draft" | "published";
  updatedAt: string;
};

export const RECAP_COLUMNS =
  "event_slug as \"eventSlug\", held_in as \"heldIn\", summary, takeaways, links, transcript, status, to_char(updated_at, 'YYYY-MM-DD') as \"updatedAt\"";

/** Languages an event can be held in (ISO codes, shown with each visitor's own language names). */
export const HELD_IN = ["fr", "en", "it", "es", "de"] as const;

/** Published recaps. Cached, refreshed the moment one is saved in the dashboard. */
export async function publishedRecaps(): Promise<Recap[]> {
  "use cache";
  cacheTag("recaps");
  if (!dbEnabled()) {
    cacheLife("max");
    return [];
  }
  try {
    const rows = await sql<Recap>(`select ${RECAP_COLUMNS} from recaps where status = 'published' order by updated_at desc`);
    cacheLife("hours");
    return rows;
  } catch (err) {
    console.error("Could not load recaps", err);
    cacheLife("minutes");
    return [];
  }
}

export async function publishedRecap(slug: string) {
  return (await publishedRecaps()).find((r) => r.eventSlug === slug) ?? null;
}

/** One item per non-empty line, without leading bullets or numbers. */
export const lines = (text: string) =>
  text
    .split("\n")
    .map((l) => l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim())
    .filter(Boolean);

/** "Label | https://url" per line (a bare URL works too). Only http(s) links are kept. */
export function parseLinks(text: string) {
  return lines(text).flatMap((line) => {
    const [a, b] = line.includes("|") ? line.split("|").map((x) => x.trim()) : [null, line];
    const url = b ?? "";
    try {
      const u = new URL(url);
      if (u.protocol !== "https:" && u.protocol !== "http:") return [];
      return [{ label: a || u.hostname.replace(/^www\./, ""), url: u.toString() }];
    } catch {
      return [];
    }
  });
}

/** Paragraphs separated by blank lines. */
export const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
