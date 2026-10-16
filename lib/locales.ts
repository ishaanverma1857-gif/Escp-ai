/** Language registry with no dictionary imports, so client components can use it cheaply. */
export const locales = ["en", "fr", "it", "es", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Per-language details: the name shown in the language menu, and formatting tags. */
export const localeInfo: Record<Locale, { name: string; intl: string; og: string }> = {
  en: { name: "English", intl: "en-GB", og: "en_GB" },
  fr: { name: "Français", intl: "fr-FR", og: "fr_FR" },
  it: { name: "Italiano", intl: "it-IT", og: "it_IT" },
  es: { name: "Español", intl: "es-ES", og: "es_ES" },
  de: { name: "Deutsch", intl: "de-DE", og: "de_DE" },
};

/** Matches the "/en" style prefix of any supported language. */
export const LOCALE_PATTERN = locales.join("|");

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
