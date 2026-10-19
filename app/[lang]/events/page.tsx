import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { site } from "@/content/site";
import { eventCards } from "@/lib/event-store";
import { publishedRecaps } from "@/lib/recaps";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui";
import { Reveal, MaskedLines } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/events">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).events.title } : {};
}

export default async function EventsPage({ params }: PageProps<"/[lang]/events">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const ev = dict.events;
  const [cards, recaps] = await Promise.all([eventCards(lang), publishedRecaps()]);
  const recapCards = recaps.flatMap((r) => {
    const c = cards.find((x) => x.slug === r.eventSlug);
    return c ? [{ ...c, heldIn: r.heldIn }] : [];
  });
  const subscribeHref = site.instagram ? `https://instagram.com/${site.instagram}` : href(lang, "/join#contact");

  return (
    <>
      <PageHeader title={ev.title} intro={ev.intro}>
        <div className="mt-10">
          <Button href={subscribeHref} variant="secondary">
            {ev.subscribe}
          </Button>
        </div>
      </PageHeader>

      <section className="pb-24 md:pb-32">
        <div className="container-site">
          <MaskedLines as="h2" inView lines={[ev.calendarTitle]} className="text-h2" />
          <div className="mt-14">
            <Timeline>
              {cards.map((e) => {
                return (
                  <li key={e.slug} className="relative">
                    <Reveal y={20}>
                      <Link
                        href={href(lang, `/events/${e.slug}`)}
                        className="group grid gap-3 pb-14 pl-10 md:grid-cols-[16rem_1fr] md:gap-0 md:pl-0"
                      >
                        <span className="text-lg font-bold text-royal md:pr-10 md:pt-1 md:text-right">{e.when}</span>
                        <span
                          aria-hidden="true"
                          className={`absolute left-0 top-[0.45rem] h-4 w-4 rounded-full border-2 transition-colors duration-300 md:left-[16rem] ${
                            e.featured ? "border-signal bg-signal" : "border-ink bg-paper group-hover:bg-ink"
                          }`}
                        />
                        <span className="md:pl-12">
                          <span className="block font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.2rem)] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-royal transition-colors duration-300 group-hover:text-signal">
                            {e.title}
                          </span>
                          <span className="mt-3 block max-w-[56ch] text-lead text-slate">{e.short}</span>
                          <span className="mt-4 inline-block font-bold underline decoration-ink/25 underline-offset-[6px] transition-colors group-hover:decoration-signal">
                            {dict.common.viewDetails}
                          </span>
                        </span>
                      </Link>
                    </Reveal>
                  </li>
                );
              })}
            </Timeline>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-fog/60 py-24 md:py-32">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <MaskedLines as="h2" inView lines={[ev.recapsTitle]} className="text-h2 md:col-span-5" />
          <Reveal delay={0.1} className="md:col-span-7">
            <p className="text-lead text-slate">{ev.recapsBody}</p>
            {recapCards.length > 0 ? (
              <ul className="mt-10 grid gap-4">
                {recapCards.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`${href(lang, `/events/${r.slug}`)}#recap`}
                      className="group flex items-center justify-between gap-6 rounded-[1.25rem] border border-line bg-paper p-6 transition-colors hover:border-royal md:p-7"
                    >
                      <span>
                        <span className="text-sm font-bold uppercase tracking-[0.15em] text-signal">{ev.recap.banner}</span>
                        <span className="mt-2 block font-display text-[1.35rem] font-extrabold uppercase leading-tight text-royal">{r.title}</span>
                        <span className="mt-1 block text-slate">{r.when}</span>
                      </span>
                      <span className="shrink-0 font-bold text-royal transition-transform group-hover:translate-x-1">
                        {ev.recap.read} <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-10 rounded-[1.25rem] border border-dashed border-ink/25 p-8">
                <p className="font-display text-xl font-semibold leading-snug">{ev.recapsEmpty}</p>
                <div className="mt-6">
                  <Button href={subscribeHref} variant="quiet">
                    {ev.subscribe}
                  </Button>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
