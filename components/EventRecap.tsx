import type { Dictionary } from "@/content/en";
import { lines, paragraphs, parseLinks, type Recap } from "@/lib/recaps";
import { Reveal } from "./motion";

/** The English recap on an event page: summary, takeaways, links, and the transcript folded away. */
export default function EventRecap({ recap, copy, lang }: { recap: Recap; copy: Dictionary["events"]["recap"]; lang: string }) {
  const language = new Intl.DisplayNames([lang], { type: "language" }).of(recap.heldIn) ?? recap.heldIn;
  const takeaways = lines(recap.takeaways);
  const links = parseLinks(recap.links);
  const transcript = paragraphs(recap.transcript);

  return (
    <section id="recap" lang="en" className="scroll-mt-28 border-t border-line bg-fog/60 py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="kicker">{copy.banner}</p>
          <h2 className="mt-4 text-h2 text-royal">{copy.title}</h2>
          <p className="mt-5 max-w-[62ch] text-lead text-slate" lang={lang}>
            {recap.heldIn !== "en" && <strong className="text-ink">{copy.heldIn.replace("{language}", language)} </strong>}
            {copy.aiNote}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h3 className="text-[1.5rem] leading-tight text-royal" lang={lang}>
              {copy.summaryTitle}
            </h3>
            <div className="mt-4 grid max-w-[65ch] gap-4 text-lead text-ink/85">
              {paragraphs(recap.summary).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="grid content-start gap-10 lg:col-span-5">
            {takeaways.length > 0 && (
              <Reveal delay={0.1} className="rounded-[1.5rem] bg-paper p-7 md:p-8">
                <h3 className="text-[1.3rem] leading-tight text-royal" lang={lang}>
                  {copy.takeawaysTitle}
                </h3>
                <ol className="mt-5 grid gap-3">
                  {takeaways.map((t, i) => (
                    <li key={i} className="grid grid-cols-[1.75rem_1fr] gap-2">
                      <span className="font-display font-extrabold text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
            {links.length > 0 && (
              <Reveal delay={0.15}>
                <h3 className="text-[1.3rem] leading-tight text-royal" lang={lang}>
                  {copy.linksTitle}
                </h3>
                <ul className="mt-4 grid gap-2">
                  {links.map((l) => (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center justify-between gap-4 rounded-xl border border-line bg-paper px-5 py-3.5 font-bold text-royal transition-colors hover:border-royal"
                      >
                        <span className="min-w-0 truncate">{l.label}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>

        {transcript.length > 0 && (
          <Reveal className="mt-14">
            <details className="group rounded-[1.5rem] border border-line bg-paper">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-[1.3rem] font-bold leading-tight text-royal" lang={lang}>
                  {copy.showTranscript}
                </span>
                <span aria-hidden="true" className="text-xl text-royal transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <div data-lenis-prevent className="max-h-[70vh] overflow-y-auto border-t border-line px-7 py-6">
                <h3 className="sr-only">{copy.transcriptTitle}</h3>
                <div className="grid max-w-[75ch] gap-4 leading-relaxed text-ink/85">
                  {transcript.map((p, i) => {
                    // "Speaker (KPMG): text" → the speaker in bold.
                    const m = p.match(/^([^:\n]{2,60}):\s+([\s\S]*)$/);
                    return m ? (
                      <p key={i}>
                        <strong className="text-ink">{m[1]}:</strong> {m[2]}
                      </p>
                    ) : (
                      <p key={i}>{p}</p>
                    );
                  })}
                </div>
              </div>
            </details>
          </Reveal>
        )}
      </div>
    </section>
  );
}
