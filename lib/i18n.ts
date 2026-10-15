import en from "@/content/en";
import fr from "@/content/fr";
import { site } from "@/content/site";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries = { en, fr };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale) => dictionaries[locale];

export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "fr" : "en");

/** Prefix an internal path with the locale: href("fr", "/events") → "/fr/events". */
export const href = (locale: Locale, path = "/") =>
  `/${locale}${path === "/" ? "" : path}`;

/**
 * Where a contact-style call to action should go. Uses email once the official
 * address is confirmed; until then it points to the contact section.
 */
export function contactHref(locale: Locale, subject: string) {
  if (site.email) return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
  return href(locale, "/join#contact");
}

export function formatDate(locale: Locale, iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { timeZone: "Europe/Paris", ...options }).format(
    new Date(`${iso}T12:00:00Z`),
  );
}
