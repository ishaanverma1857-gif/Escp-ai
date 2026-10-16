import en from "@/content/en";
import fr from "@/content/fr";
import it from "@/content/it";
import es from "@/content/es";
import de from "@/content/de";
import { site } from "@/content/site";

import { localeInfo, type Locale } from "./locales";

export * from "./locales";

const dictionaries = { en, fr, it, es, de };

export const getDictionary = (locale: Locale) => dictionaries[locale];

/** Prefix an internal path with the locale: href("fr", "/events") → "/fr/events". */
export const href = (locale: Locale, path = "/") =>
  `/${locale}${path === "/" ? "" : path}`;

/**
 * Where a contact-style call to action should go. Uses email once the official
 * address is confirmed; until then it opens an Instagram DM, or the contact section.
 */
export function contactHref(locale: Locale, subject: string) {
  if (site.email) return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
  if (site.instagram) return `https://ig.me/m/${site.instagram}`;
  return href(locale, "/join#contact");
}

export function formatDate(locale: Locale, iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(localeInfo[locale].intl, { timeZone: "Europe/Paris", ...options }).format(
    new Date(`${iso}T12:00:00Z`),
  );
}
