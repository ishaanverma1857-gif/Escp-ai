import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { impact, partners, people, photo, teamGroups, type PersonId } from "@/content/site";
import { dateParts, eventEndsAt, timeline } from "@/lib/events";
import { siteClock } from "@/lib/event-store";
import CampusNetwork from "@/components/CampusNetwork";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui";
import { CountUp, FadeIn, MaskedLines, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { DottedArc, EventStatus, FlowLines, PointerParallax, ScrollKnot, ScrollText, Tilt, VelocityMarquee } from "@/components/fx";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { home, common, events: ev, team } = dict;

  // Re-evaluated every minute: once an event is over, the next one takes its place.
  const now = await siteClock();
  const { featured, upcoming: next } = timeline(now);
  const featuredCopy = ev.items[featured.slug];
  const featuredDate = dateParts(lang, featured);
  const upcoming = next.filter((e) => e.slug !== featured.slug).slice(0, 3);
  // The poster lines below describe the KPMG conference only.
  const isKpmg = featured.slug === "kpmg-ai-conference";
  const stats = impact.filter((s) => s.value !== null);

  // Everyone once, labelled with the first team they appear in.
  const seen = new Set<PersonId>();
  const crew = teamGroups.flatMap((g) =>
    g.members.filter((m) => !seen.has(m.id) && seen.add(m.id)).map((m) => ({ id: m.id, group: team.groups[g.key] })),
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 md:pt-36 lg:min-h-[min(100dvh,62rem)]">
        <PointerParallax depth={4} className="absolute inset-[-3%]">
          <div className="relative h-[106dvh] max-h-[66rem] min-h-[44rem] w-full">
            <FlowLines tone="light" preset="hero" />
          </div>
        </PointerParallax>
        <DottedArc className="absolute right-[6%] top-24 hidden w-40 text-royal/60 md:block" rotate={-80} sweep={75} />
        <DottedArc className="absolute bottom-16 left-[3%] w-28 text-royal/50" rotate={110} sweep={70} dots={8} />
        <div className="container-site relative grid items-center gap-y-12 pb-20 lg:grid-cols-12 lg:gap-x-8 lg:pb-28">
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="kicker mb-7">{home.kicker}</p>
            </FadeIn>
            <MaskedLines lines={home.heroTitle} className="text-display text-royal" />
            <FadeIn delay={0.45}>
              <p className="mt-8 max-w-[54ch] text-lead text-slate">{home.heroBody}</p>
            </FadeIn>
            <FadeIn delay={0.6} className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-4">
              <Button href={href(lang, "/join")}>{home.ctaJoin}</Button>
              <Button href={href(lang, "/events")} variant="secondary">
                {home.ctaEvents}
              </Button>
              <Button href={href(lang, "/services")} variant="quiet">
                {home.ctaServices}
              </Button>
            </FadeIn>
            <FadeIn delay={0.8}>
              <ul className="mt-12 flex flex-wrap gap-2.5">
                {home.formats.map((f) => (
                  <li key={f} className="rounded-full border border-royal/20 bg-paper/80 px-4 py-1.5 text-sm font-bold text-royal">
                    {f}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          <div className="mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:col-span-5 lg:max-w-none">
            <PointerParallax depth={14}>
              <CampusNetwork labels={dict.campuses} locale={lang} />
            </PointerParallax>
            <FadeIn delay={1.2}>
              <p className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-royal">
                <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
                </span>
                {dict.campuses.mapHint}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-line py-24 md:py-36">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <MaskedLines as="h2" inView lines={[home.missionTitle]} className="text-h2 md:col-span-4" />
          <div className="md:col-span-8">
            <ScrollText text={home.missionBody} className="font-display text-[clamp(1.45rem,1.1rem+1.4vw,2.35rem)] font-semibold leading-[1.35] tracking-[-0.01em] text-ink" />
            <Stagger className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {home.pillars.map((p) => (
                <StaggerItem key={p.title} className="border-t-2 border-royal pt-5">
                  <h3 className="text-[1.35rem] font-extrabold uppercase leading-tight text-royal">{p.title}</h3>
                  <p className="mt-2 text-slate">{p.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Featured event, styled after the society's event posters */}
      <section className="pb-24 md:pb-32">
        <div className="container-site">
          <MaskedLines as="h2" inView lines={[home.featuredTitle]} className="text-h2" />
          <Reveal delay={0.1} className="mt-10">
            <Tilt max={3}>
              <article className="on-ink relative isolate overflow-hidden rounded-[2rem] bg-ink p-7 text-paper sm:p-10 md:p-14">
                <FlowLines tone="dark" preset="band" className="-z-10 opacity-70" />
                <div aria-hidden="true" className="orb pointer-events-none absolute -right-40 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-y-1/2 md:-right-24" />
                <div aria-hidden="true" className="orb-ring pointer-events-none absolute -right-56 top-1/2 -z-10 h-[46rem] w-[46rem] -translate-y-1/2 md:-right-40" />

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Logo gap="var(--color-ink)" />
                  {featuredCopy.partner && (
                    <>
                      <span aria-hidden="true" className="text-xl text-paper/50">×</span>
                      <span className="font-display text-2xl font-extrabold italic tracking-tight">{featuredCopy.partner}</span>
                    </>
                  )}
                </div>
                <div className="mt-8 h-px max-w-3xl bg-paper/20" />

                <h3 className="mt-8 max-w-[16ch] text-[clamp(2.2rem,1.4rem+3.4vw,4.4rem)] font-extrabold leading-[1] tracking-[-0.02em]">
                  {featuredCopy.title}
                </h3>
                {isKpmg && <p className="kicker mt-6">{home.featuredKind}</p>}
                <p className="mt-4 max-w-[52ch] text-lead text-paper/80">{featuredCopy.description}</p>

                {isKpmg && (
                  <>
                    <p className="mt-8 font-display text-xl font-bold text-signal-on-ink">{home.featuredMeet}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {home.featuredAreas.map((a) => (
                        <li key={a} className="rounded-full border border-paper/25 px-3.5 py-1 text-sm">
                          {a}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <dl className="mt-10 grid max-w-3xl gap-6 border-y border-paper/20 py-6 sm:grid-cols-[auto_auto_1fr] sm:divide-x sm:divide-paper/20 sm:gap-0">
                  <div className="sm:pr-8">
                    <dt className="sr-only">{ev.fields.date}</dt>
                    <dd className="font-display font-extrabold uppercase leading-tight">
                      <span className="block text-sm text-paper/70">{featuredDate?.weekday}</span>
                      <span className="text-2xl">{featuredDate ? `${featuredDate.day} ${featuredDate.month}` : featuredCopy.when}</span>
                    </dd>
                  </div>
                  <div className="sm:px-8">
                    <dt className="sr-only">{ev.fields.time}</dt>
                    <dd className="font-display text-[2.1rem] font-extrabold leading-none">{featuredCopy.time ?? common.toBeAnnounced}</dd>
                  </div>
                  <div className="sm:pl-8">
                    <dt className="sr-only">{ev.fields.location}</dt>
                    <dd className="font-display text-lg font-bold leading-snug">{featuredCopy.location ?? common.toBeAnnounced}</dd>
                  </div>
                </dl>

                <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  {featured.startsAt && (
                    <EventStatus
                      startsAt={featured.startsAt}
                      endsAt={eventEndsAt(featured)}
                      labels={{ startsIn: home.startsIn, liveNow: home.liveNow, liveNote: home.liveNote, ended: home.ended, endedNote: home.endedNote }}
                      countdown={home.countdown}
                    />
                  )}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    {eventEndsAt(featured) > now && (
                      <Button href={featured.registrationUrl ?? `${href(lang, `/events/${featured.slug}`)}#register`} variant="onInk">
                        {home.register}
                      </Button>
                    )}
                    <Link href={href(lang, `/events/${featured.slug}`)} className="font-bold underline decoration-paper/40 underline-offset-[6px] hover:decoration-paper">
                      {common.viewDetails}
                    </Link>
                  </div>
                </div>
              </article>
            </Tilt>
          </Reveal>

          {/* Next events */}
          <div className="mt-20 grid gap-8 md:grid-cols-12">
            <MaskedLines as="h2" inView lines={[home.upcomingTitle]} className="text-[1.6rem] leading-tight md:col-span-4" />
            <Stagger className="md:col-span-8">
              {upcoming.map((e) => {
                const c = ev.items[e.slug];
                return (
                  <StaggerItem key={e.slug} className="border-t border-line last:border-b">
                    <Link href={href(lang, `/events/${e.slug}`)} className="group grid gap-1 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                      <span className="font-bold text-royal">{c.when}</span>
                      <span>
                        <span className="block font-display text-[1.4rem] font-bold leading-snug transition-colors group-hover:text-signal">{c.title}</span>
                        <span className="mt-1 block text-slate">{c.short}</span>
                      </span>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
          <Reveal className="mt-10 md:ml-[33.333%] md:pl-4">
            <Button href={href(lang, "/events")} variant="secondary">
              {home.allEvents}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Impact */}
      <section className="on-ink relative overflow-hidden bg-ink py-24 text-paper md:py-32">
        <FlowLines tone="dark" preset="band" />
        <ScrollKnot className="pointer-events-none absolute -right-32 top-1/2 w-[36rem] -translate-y-1/2 text-signal-on-ink/40 md:right-0 md:w-[42rem]" />
        <div className="container-site relative grid gap-14 md:grid-cols-12">
          <MaskedLines as="h2" inView lines={[home.impactTitle]} className="text-h2 md:col-span-4" />
          <div className="md:col-span-8">
            <dl className="grid gap-12 sm:grid-cols-2">
              {stats.map((s, i) => (
                <Reveal key={s.key} delay={i * 0.08}>
                  <dt className="sr-only">{home.impactLabels[s.key]}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(3.4rem,2.2rem+4.4vw,6.4rem)] font-extrabold leading-[0.85] tracking-[-0.03em]">
                      <CountUp value={s.value!} suffix={s.suffix} locale={lang} />
                    </span>
                    <span className="mt-4 block text-lg text-paper/75">{home.impactLabels[s.key]}</span>
                    {s.key === "campuses" && (
                      <span className="mt-1 block text-lg text-signal-on-ink">
                        {dict.campuses.paris}, {dict.campuses.turin}, {dict.campuses.madrid}, {dict.campuses.berlin}
                      </span>
                    )}
                  </dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.15}>
              <p className="mt-16 max-w-[24ch] font-display text-[clamp(1.6rem,1.2rem+1.8vw,2.6rem)] font-bold leading-[1.15]">{home.impactClosing}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32">
        <div className="container-site mb-12 flex flex-wrap items-end justify-between gap-6">
          <MaskedLines as="h2" inView lines={[home.teamTitle]} className="text-h2 max-w-[18ch]" />
          <Button href={href(lang, "/team")} variant="secondary">
            {home.teamLink}
          </Button>
        </div>
        <VelocityMarquee label={home.teamTitle} baseVelocity={-1.4} className="py-4">
          {crew.map((m) => (
            <Link key={m.id} href={href(lang, "/team")} className="group mx-3 block w-[13rem] shrink-0 md:mx-4 md:w-[15rem]">
              <span className="block overflow-hidden rounded-[2.25rem] border-2 border-royal/70 bg-fog">
                <Image
                  src={photo(m.id)}
                  alt={people[m.id]}
                  width={360}
                  height={480}
                  sizes="240px"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.06]"
                />
              </span>
              <span className="mt-4 block text-center font-display font-extrabold uppercase leading-tight text-royal">{people[m.id]}</span>
              <span className="mt-1 block text-center text-sm text-slate">{m.group}</span>
            </Link>
          ))}
        </VelocityMarquee>
      </section>

      {/* Ecosystem */}
      <section className="border-y border-line bg-fog/60 py-16 md:py-20">
        <div className="container-site mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[1.6rem] leading-tight">{home.ecosystemTitle}</h2>
          <Link href={href(lang, "/partners")} className="link-underline font-bold">
            {home.ecosystemLink}
          </Link>
        </div>
        <VelocityMarquee label={home.ecosystemTitle}>
          {partners.map((name) => (
            <span key={name} className="flex items-center whitespace-nowrap font-display text-[clamp(2.2rem,1.5rem+3vw,4.25rem)] font-extrabold uppercase leading-none tracking-[-0.02em] text-royal">
              <span className="px-6 md:px-12">{name}</span>
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-signal" />
            </span>
          ))}
        </VelocityMarquee>
      </section>

      {/* Join */}
      <section className="on-ink relative overflow-hidden bg-royal py-24 text-paper md:py-36">
        <FlowLines tone="dark" preset="soft" />
        <DottedArc className="absolute right-[8%] top-12 w-36 text-paper/50" rotate={-70} />
        <div className="container-site relative grid gap-10 md:grid-cols-12">
          <MaskedLines as="h2" inView lines={[home.joinTitle]} className="text-h1 font-extrabold uppercase md:col-span-8" />
          <Reveal delay={0.1} className="md:col-span-4 md:self-end">
            <p className="text-lead text-paper/85">{home.joinBody}</p>
            <div className="mt-8">
              <Button href={href(lang, "/join")} variant="onInk">
                {home.ctaJoin}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
