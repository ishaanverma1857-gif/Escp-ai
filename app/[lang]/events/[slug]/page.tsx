import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { events } from "@/content/site";
import { dateParts, findEvent } from "@/lib/events";
import { Button } from "@/components/ui";
import { FadeIn, MaskedLines, Reveal } from "@/components/motion";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/events/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !findEvent(slug)) return {};
  const c = getDictionary(lang).events.items[slug];
  return { title: c.title, description: c.short };
}

export default async function EventPage({ params }: PageProps<"/[lang]/events/[slug]">) {
  const { lang, slug } = await params;
  const event = findEvent(slug);
  if (!hasLocale(lang) || !event) notFound();
  const dict = getDictionary(lang);
  const ev = dict.events;
  const c = ev.items[event.slug];
  const d = dateParts(lang, event);
  const tba = dict.common.toBeAnnounced;

  const facts: { label: string; value: string }[] = [
    { label: ev.fields.date, value: d ? `${d.weekday} ${d.day} ${d.month} ${d.year}` : c.when },
    { label: ev.fields.time, value: c.time ?? tba },
    { label: ev.fields.location, value: c.location ?? tba },
    { label: ev.fields.speakers, value: c.speakers ?? tba },
    { label: ev.fields.places, value: event.places !== null ? String(event.places) : ev.placesUnknown },
    ...(c.partner ? [{ label: ev.fields.partner, value: c.partner }] : []),
    ...(c.audience ? [{ label: ev.fields.audience, value: c.audience }] : []),
  ];

  return (
    <article className="pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="container-site">
        <FadeIn>
          <Link href={href(lang, "/events")} className="link-underline text-slate hover:text-ink">
            <span aria-hidden="true">←</span> {dict.common.backToEvents}
          </Link>
        </FadeIn>

        <div className="mt-10 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeIn delay={0.05}>
              <p className="kicker">{c.when}</p>
            </FadeIn>
            <MaskedLines lines={[c.title]} className="mt-4 text-h1 text-royal" delay={0.1} />
            <FadeIn delay={0.35}>
              <p className="mt-8 max-w-[60ch] text-lead text-slate">{c.description}</p>
            </FadeIn>

            <Reveal className="mt-14">
              <h2 className="text-[1.5rem] leading-tight text-royal">{ev.fields.programme}</h2>
              <p className="mt-3 text-slate">{c.programme ?? tba}</p>
            </Reveal>
            <Reveal className="mt-10">
              <h2 className="text-[1.5rem] leading-tight text-royal">{ev.fields.accessibility}</h2>
              <p className="mt-3 max-w-[60ch] text-slate">{ev.accessibilityDefault}</p>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={0.2} className="lg:sticky lg:top-28">
              <div className="rounded-[1.5rem] bg-fog p-8 md:p-10">
                <dl className="divide-y divide-line">
                  {facts.map((f) => (
                    <div key={f.label} className="grid grid-cols-[8.5rem_1fr] gap-4 py-4 first:pt-0">
                      <dt className="text-slate">{f.label}</dt>
                      <dd className="font-bold first-letter:uppercase">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8">
                  <Button href={event.registrationUrl} className="w-full" disabledLabel={dict.common.linkComingSoon}>
                    {ev.register}
                  </Button>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </article>
  );
}
