import type { Locale } from "@/lib/locales";
import en from "./kpmg-ai-conference/en";
import fr from "./kpmg-ai-conference/fr";
import it from "./kpmg-ai-conference/it";
import es from "./kpmg-ai-conference/es";
import de from "./kpmg-ai-conference/de";

/**
 * Recaps written into the site (Markdown, one version per language). An event with one here shows it,
 * with a language switcher, instead of a recap from the dashboard.
 */
export type StaticRecap = {
  heldIn: string;
  versions: Record<Locale, { summary: string; transcript: string }>;
  links: { label: Record<Locale, string>; url: string }[];
};

const same = (label: string): Record<Locale, string> => ({ en: label, fr: label, it: label, es: label, de: label });

export const staticRecaps: Record<string, StaticRecap> = {
  "kpmg-ai-conference": {
    heldIn: "fr",
    versions: { en, fr, it, es, de },
    links: [
      { label: same("Anthropic"), url: "https://www.anthropic.com" },
      { label: same("Claude"), url: "https://claude.ai" },
      { label: same("Microsoft Copilot"), url: "https://copilot.microsoft.com" },
      {
        label: {
          en: "EU AI Act (official text)",
          fr: "AI Act européen (texte officiel)",
          it: "AI Act europeo (testo ufficiale)",
          es: "Ley de IA de la UE (texto oficial)",
          de: "EU AI Act (offizieller Text)",
        },
        url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
      },
      { label: same("KPMG"), url: "https://kpmg.com" },
    ],
  },
};
