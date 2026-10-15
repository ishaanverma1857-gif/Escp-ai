import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { impact, partners } from "@/content/site";
import { dateParts, featuredEvent, sortedEvents } from "@/lib/events";
import CampusNetwork from "@/components/CampusNetwork";
import { Button } from "@/components/ui";
import { CountUp, FadeIn, MaskedLines, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { NeuralField, PointerParallax, ScrollText, ScrollTriangle, Tilt, VelocityMarquee } from "@/components/fx";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { home, common, events: ev } = dict;

  const featured = featuredEvent();
  const featuredCopy = ev.items[featured.slug];
  const featuredDate = dateParts(lang, featured);
  const upcoming = sortedEvents().filter((e) => e.slug !== featured.slug).slice(0, 3);
  const stats = impact.filter((s) => s.value !== null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 md:pt-36 lg:min-h-[min(100dvh,60rem)]">
        <div aria-hidden="true" className="graticule pointer-events-none absolute inset-0" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_40%,black_20%,transparent_75%)]">
          <NeuralField />
        </div>
        <div className="container-site relative grid items-center gap-y-10 pb-20 lg:grid-cols-12 lg:gap-x-8 lg:pb-28">
          <div className="lg:col-span-7">
            <MaskedLines lines={home.heroTitle} className="text-display" />
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
          </div>
          <div className="mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:col-span-5 lg:max-w-none">
            <PointerParallax depth={14}>
              <CampusNetwork labels={dict.campuses} />
            </PointerParallax>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-line py-24 md:py-36">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <MaskedLines as="h2" inView lines={[home.missionTitle]} className="text-h2 md:col-span-4" />
          <div className="md:col-span-8">
            <ScrollText text={home.missionBody} className="font-display text-[clamp(1.6rem,1.2rem+1.5vw,2.6rem)] leading-[1.3] text-ink" />
            <Stagger className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {home.pillars.map((p) => (
                <StaggerItem key={p.title} className="border-t-2 border-ink pt-5">
                  <h3 className="text-[1.6rem] leading-tight">{p.title}</h3>
                  <p className="mt-2 text-slate">{p.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="on-ink relative overflow-hidden bg-ink py-24 text-paper md:py-32">
        <ScrollTriangle className="pointer-events-none absolute -right-24 top-1/2 w-[34rem] -translate-y-1/2 text-paper/20 md:right-0 md:w-[40rem]" />
        <div className="container-site relative grid gap-14 md:grid-cols-12">
          <MaskedLines as="h2" inView lines={[home.impactTitle]} className="text-h2 md:col-span-4" />
          <div className="md:col-span-8">
            <dl className="grid gap-12 sm:grid-cols-2">
              {stats.map((s, i) => (
                <Reveal key={s.key} delay={i * 0.08}>
                  <dt className="sr-only">{home.impactLabels[s.key]}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(5rem,3.5rem+6vw,9.5rem)] leading-[0.85]">
                      <CountUp value={s.value!} suffix={s.suffix} />
                    </span>
                    <span className="mt-4 block text-lg text-paper/75">{home.impactLabels[s.key]}</span>
                    {s.key === "campuses" && (
                      <span className="mt-1 block text-lg text-signal-on-ink">
                        {dict.campuses.paris}, {dict.campuses.turin}, {dict.campuses.madrid}
                      </span>
                    )}
                  </dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.15}>
              <p className="mt-16 max-w-[24ch] font-display text-[clamp(1.8rem,1.3rem+2vw,3rem)] leading-[1.12]">{home.impactClosing}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured event */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <MaskedLines as="h2" inView lines={[home.featuredTitle]} className="text-h2" />
          <Reveal delay={0.1} className="mt-10">
            <Tilt max={4}>
            <article className="group grid overflow-hidden rounded-[1.75rem] bg-fog md:grid-cols-12">
              <div className="relative flex flex-col justify-between gap-8 bg-signal p-8 text-paper md:col-span-4 md:p-10">
                {featuredDate && (
                  <p className="font-display leading-none">
                    <span className="block text-[clamp(6rem,4rem+6vw,10rem)] leading-[0.8]">{featuredDate.day}</span>
                    <span className="mt-3 block text-3xl capitalize">{featuredDate.month}</span>
                  </p>
                )}
                <p className="text-lg text-paper/85">
                  {featuredCopy.time}
                  <br />
                  {featuredCopy.location}
                </p>
              </div>
              <div className="flex flex-col gap-6 p-8 md:col-span-8 md:p-12">
                <h3 className="text-[clamp(2rem,1.5rem+2vw,3.25rem)] leading-[1.05]">{featuredCopy.title}</h3>
                <p className="max-w-[60ch] text-lead text-slate">{featuredCopy.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-4">
                  <Button href={featured.registrationUrl} disabledLabel={common.linkComingSoon}>
                    {home.register}
                  </Button>
                  <Button href={href(lang, `/events/${featured.slug}`)} variant="quiet">
                    {common.viewDetails}
                  </Button>
                </div>
              </div>
            </article>
            </Tilt>
          </Reveal>

          {/* Next events */}
          <div className="mt-20 grid gap-8 md:grid-cols-12">
            <MaskedLines as="h2" inView lines={[home.upcomingTitle]} className="text-[1.75rem] leading-tight md:col-span-4" />
            <Stagger className="md:col-span-8">
              {upcoming.map((e) => {
                const c = ev.items[e.slug];
                return (
                  <StaggerItem key={e.slug} className="border-t border-line last:border-b">
                    <Link href={href(lang, `/events/${e.slug}`)} className="group grid gap-1 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                      <span className="text-slate">{c.when}</span>
                      <span>
                        <span className="block font-display text-2xl leading-snug transition-colors group-hover:text-signal">{c.title}</span>
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

      {/* Ecosystem */}
      <section className="border-y border-line bg-fog/60 py-16 md:py-20">
        <div className="container-site mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[1.75rem] leading-tight">{home.ecosystemTitle}</h2>
          <Link href={href(lang, "/partners")} className="link-underline font-bold">
            {home.ecosystemLink}
          </Link>
        </div>
        <VelocityMarquee items={partners} label={home.ecosystemTitle} />
      </section>

      {/* Join */}
      <section className="py-24 md:py-36">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <MaskedLines as="h2" inView lines={[home.joinTitle]} className="text-h1 md:col-span-8" />
          <Reveal delay={0.1} className="md:col-span-4 md:self-end">
            <p className="text-lead text-slate">{home.joinBody}</p>
            <div className="mt-8">
              <Button href={href(lang, "/join")}>{home.ctaJoin}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
