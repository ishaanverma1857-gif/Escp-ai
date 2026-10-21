import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { campuses, events } from "@/content/site";
import { eventDetail, siteClock } from "@/lib/event-store";
import { dbEnabled } from "@/lib/db";
import { Button } from "@/components/ui";
import RegisterForm from "@/components/RegisterForm";
import EventRecap from "@/components/EventRecap";
import StaticEventRecap from "@/components/StaticEventRecap";
import { staticRecaps } from "@/content/recaps";
import { publishedRecap } from "@/lib/recaps";
import { FadeIn, MaskedLines, Reveal } from "@/components/motion";

export function generateStaticParams() {
  // Events created in the dashboard are rendered on their first visit and cached from then on.
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/events/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const e = await eventDetail(lang, slug);
  return e ? { title: e.title, description: e.short } : {};
}

export default async function EventPage({ params }: PageProps<"/[lang]/events/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [event, recap, now] = await Promise.all([eventDetail(lang, slug), publishedRecap(slug), siteClock()]);
  if (!event) notFound();
  const ended = event.endsAt <= now;
  // A recap written into the site (all languages) wins over one from the dashboard.
  const staticRecap = staticRecaps[slug] ?? null;
  const hasRecap = !!(staticRecap || recap);
  const dict = getDictionary(lang);
  const ev = dict.events;
  const tba = dict.common.toBeAnnounced;

  const facts: { label: string; value: string }[] = [
    { label: ev.fields.date, value: event.date },
    { label: ev.fields.time, value: event.time ?? tba },
    { label: ev.fields.location, value: event.location ?? tba },
    { label: ev.fields.speakers, value: event.speakers ?? tba },
    { label: ev.fields.places, value: event.places !== null ? String(event.places) : ev.placesUnknown },
    ...(event.organizer ? [{ label: ev.fields.organizer, value: event.organizer }] : []),
    ...(event.partner ? [{ label: ev.fields.partner, value: event.partner }] : []),
    ...(event.audience ? [{ label: ev.fields.audience, value: event.audience }] : []),
  ];

  return (
    <article className={`pt-32 md:pt-44 ${hasRecap ? "" : "pb-24 md:pb-32"}`}>
      <div className="container-site">
        <FadeIn>
          <Link href={href(lang, "/events")} className="link-underline text-slate hover:text-ink">
            <span aria-hidden="true">←</span> {dict.common.backToEvents}
          </Link>
        </FadeIn>

        <div className="mt-10 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeIn delay={0.05}>
              <p className="kicker">{event.kicker}</p>
            </FadeIn>
            <MaskedLines lines={[event.title]} className="mt-4 text-h1 text-royal" delay={0.1} />
            <FadeIn delay={0.35}>
              <p className="mt-8 max-w-[60ch] whitespace-pre-line text-lead text-slate">{event.description}</p>
              {!hasRecap && event.heldIn && event.heldIn !== "en" && (
                <p lang={lang} className="mt-8 flex max-w-[60ch] items-start gap-3 rounded-2xl bg-signal-soft px-5 py-4 text-royal">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 rounded-md bg-royal px-1.5 py-0.5 text-xs font-bold text-paper">
                    EN
                  </span>
                  <span className="font-bold">
                    {ev.recap.upcoming.replace("{language}", new Intl.DisplayNames([lang], { type: "language" }).of(event.heldIn) ?? event.heldIn)}
                  </span>
                </p>
              )}
              {hasRecap && (
                <a
                  href="#recap"
                  className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-signal-soft px-6 font-bold text-royal transition-colors hover:bg-royal hover:text-paper"
                >
                  {!staticRecap && <span aria-hidden="true">EN</span>} {ev.recap.read} <span aria-hidden="true">↓</span>
                </a>
              )}
            </FadeIn>

            <Reveal className="mt-14">
              <h2 className="text-[1.5rem] leading-tight text-royal">{ev.fields.programme}</h2>
              <p className="mt-3 text-slate">{event.programme ?? tba}</p>
            </Reveal>
            <Reveal className="mt-10">
              <h2 className="text-[1.5rem] leading-tight text-royal">{ev.fields.accessibility}</h2>
              <p className="mt-3 max-w-[60ch] text-slate">{ev.accessibilityDefault}</p>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={0.2} className="lg:sticky lg:top-28">
              <div className="relative rounded-[1.5rem] bg-fog p-8 md:p-10">
                <dl className="divide-y divide-line">
                  {facts.map((f) => (
                    <div key={f.label} className="grid grid-cols-[8.5rem_1fr] gap-4 py-4 first:pt-0">
                      <dt className="text-slate">{f.label}</dt>
                      <dd className="font-bold first-letter:uppercase">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div id="register" className="mt-8 scroll-mt-28">
                  {ended ? (
                    <p className="rounded-xl bg-paper px-5 py-4 font-bold text-slate">{ev.registrationClosed}</p>
                  ) : event.registrationUrl || !dbEnabled() ? (
                    <Button href={event.registrationUrl} className="w-full" disabledLabel={dict.common.linkComingSoon}>
                      {ev.register}
                    </Button>
                  ) : (
                    <RegisterForm
                      slug={event.slug}
                      copy={ev.form}
                      campuses={campuses.map((c) => ({ key: c.key, label: dict.campuses[c.key] }))}
                    />
                  )}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
      {hasRecap && (
        <div className="mt-24 md:mt-32">
          {staticRecap ? <StaticEventRecap recap={staticRecap} lang={lang} /> : recap && <EventRecap recap={recap} copy={ev.recap} lang={lang} />}
        </div>
      )}
    </article>
  );
}
