import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { campuses, team } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/team">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).team.title } : {};
}

const initials = (name: string) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

export default async function TeamPage({ params }: PageProps<"/[lang]/team">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.team;

  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />

      <section className="pb-24 md:pb-32">
        <div className="container-site">
          <Reveal>
            <h2 className="text-h2">{t.leadershipTitle}</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {team.map((m) => (
              <StaggerItem key={m.name} className="group flex items-center gap-5">
                <span
                  aria-hidden="true"
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-fog font-display text-[1.75rem] text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-paper"
                >
                  {initials(m.name)}
                </span>
                <span>
                  <span className="block font-display text-[1.6rem] leading-tight">{m.name}</span>
                  <span className="mt-1 block text-slate">{t.roles[m.role]}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="text-h2">{t.divisionsTitle}</h2>
            <p className="mt-6 max-w-[34ch] text-lead text-slate">{t.divisionsIntro}</p>
          </Reveal>
          <Stagger as="dl" className="md:col-span-8">
            {t.divisions.map((d) => (
              <StaggerItem as="div" key={d.name} className="group grid gap-2 border-t border-line py-7 last:border-b sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
                <dt className="font-display text-[1.6rem] leading-tight transition-colors duration-300 group-hover:text-signal">{d.name}</dt>
                <dd className="text-lead text-slate sm:pt-1">{d.purpose}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="on-ink bg-ink py-24 text-paper md:py-32">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <h2 className="text-h2">{t.campusesTitle}</h2>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <p className="text-lead text-paper/80">{t.campusesBody}</p>
            </Reveal>
          </div>
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] bg-paper/15 sm:grid-cols-3">
            {campuses
              .filter((c) => !c.upcoming)
              .map((c) => (
                <StaggerItem key={c.key} className="bg-ink p-8 md:p-10">
                  <h3 className="text-[clamp(2.5rem,2rem+2vw,3.75rem)] leading-none">{dict.campuses[c.key]}</h3>
                  <p className="mt-3 text-sm text-paper/60">
                    {c.lat.toFixed(2)}° N, {Math.abs(c.lon).toFixed(2)}° {c.lon >= 0 ? "E" : "W"}
                  </p>
                  <p className="mt-10 text-paper/70">{t.representative}</p>
                  <p className="text-signal-on-ink">{dict.common.toBeAnnounced}</p>
                </StaggerItem>
              ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
