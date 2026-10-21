import type { StaticRecap } from "@/content/recaps";
import { getDictionary, localeInfo, locales, type Locale } from "@/lib/i18n";
import { Markdown } from "@/lib/markdown";
import RecapLanguages from "./RecapLanguages";
import { Reveal } from "./motion";

/** A recap written into the site, in every language, with a switcher. Opens in the visitor's language. */
export default function StaticEventRecap({ recap, lang }: { recap: StaticRecap; lang: Locale }) {
  const copy = getDictionary(lang).events.recap;
  const language = new Intl.DisplayNames([lang], { type: "language" }).of(recap.heldIn) ?? recap.heldIn;

  const panels = Object.fromEntries(
    locales.map((code) => {
      const c = getDictionary(code).events.recap;
      const v = recap.versions[code];
      return [
        code,
        <div key={code} className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h3 className="text-[1.6rem] leading-tight text-royal">{c.summaryTitle}</h3>
            <Markdown source={v.summary} className="mt-5 max-w-[72ch] text-[1.05rem] leading-relaxed text-ink/85" />
          </div>
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h3 className="text-[1.3rem] leading-tight text-royal">{c.linksTitle}</h3>
              <ul className="mt-4 grid gap-2">
                {recap.links.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 rounded-xl border border-line bg-paper px-5 py-3.5 font-bold text-royal transition-colors hover:border-royal"
                    >
                      <span className="min-w-0 truncate">{l.label[code]}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <details className="group rounded-[1.5rem] border border-line bg-paper lg:col-span-12">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 [&::-webkit-details-marker]:hidden">
              <span className="text-[1.3rem] font-bold leading-tight text-royal">{c.showTranscript}</span>
              <span aria-hidden="true" className="text-xl text-royal transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div data-lenis-prevent className="max-h-[75vh] overflow-y-auto border-t border-line px-7 py-6">
              <h3 className="sr-only">{c.transcriptTitle}</h3>
              <Markdown source={v.transcript} className="max-w-[78ch] leading-relaxed text-ink/85" />
            </div>
          </details>
        </div>,
      ];
    }),
  );

  return (
    <section id="recap" className="scroll-mt-28 border-t border-line bg-fog/60 py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="kicker">{copy.bannerMulti}</p>
          <h2 className="mt-4 text-h2 text-royal">{copy.titleMulti}</h2>
          <p className="mt-5 max-w-[62ch] text-lead text-slate">
            {recap.heldIn !== lang && <strong className="text-ink">{copy.heldIn.replace("{language}", language)} </strong>}
            {copy.aiNoteMulti}
          </p>
        </Reveal>
        <div className="mt-10">
          <RecapLanguages
            label={copy.chooseLanguage}
            initial={lang}
            options={locales.map((l) => ({ code: l, name: localeInfo[l].name }))}
            panels={panels}
          />
        </div>
      </div>
    </section>
  );
}
