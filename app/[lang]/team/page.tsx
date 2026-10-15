import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { campuses, people, photo, teamGroups } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import { Knot } from "@/components/brand";
import { DottedArc, FlowLines, Spotlight } from "@/components/fx";
import { MaskedLines, Reveal, Stagger, StaggerItem } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/team">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).team.title } : {};
}

export default async function TeamPage({ params }: PageProps<"/[lang]/team">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.team;

  return (
    <>
      <PageHeader title={t.title} intro={t.intro} />

      {/* One panel per team, alternating light and navy like the Instagram carousel. */}
      {teamGroups.map((group, gi) => {
        const dark = gi % 2 === 1;
        return (
          <section
            key={group.key}
            className={`relative overflow-hidden py-20 md:py-28 ${dark ? "on-ink bg-ink text-paper" : "bg-paper text-royal"}`}
          >
            <FlowLines tone={dark ? "dark" : "light"} preset="band" className={dark ? "" : "opacity-70"} />
            <DottedArc
              className={`absolute ${gi % 2 ? "left-[4%] top-1/2" : "right-[5%] top-16"} w-28 ${dark ? "text-signal-on-ink/70" : "text-royal/50"}`}
              rotate={gi % 2 ? 100 : -80}
            />
            <Knot
              gap={dark ? "var(--color-ink)" : "var(--color-paper)"}
              className={`absolute bottom-10 right-[5%] hidden h-16 w-16 md:block ${dark ? "text-paper" : "text-ink"}`}
            />
            <div className="container-site relative">
              <MaskedLines
                as="h2"
                inView
                lines={[t.groups[group.key]]}
                className={`text-[clamp(2.6rem,1.6rem+4vw,5.2rem)] font-extrabold uppercase leading-none tracking-[-0.02em] ${dark ? "text-paper" : "text-royal"}`}
              />
              <Stagger className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 md:gap-x-10" gap={0.1}>
                {group.members.map((m) => (
                  <StaggerItem key={m.id} className="group text-center">
                    <div
                      className={`mx-auto max-w-[17rem] overflow-hidden rounded-[2.5rem] border-[3px] transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:-translate-y-2 ${
                        dark ? "border-paper/90" : "border-royal/80"
                      }`}
                    >
                      <Image
                        src={photo(m.id)}
                        alt={people[m.id]}
                        width={360}
                        height={480}
                        sizes="(min-width: 768px) 272px, 45vw"
                        className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.05]"
                      />
                    </div>
                    <p className={`mt-5 font-display text-[clamp(0.95rem,0.8rem+0.6vw,1.3rem)] font-extrabold uppercase leading-tight ${dark ? "text-paper" : "text-royal"}`}>
                      {people[m.id]}
                    </p>
                    {m.role && <p className={`mt-1.5 italic ${dark ? "text-paper/75" : "text-slate"}`}>{t.roles[m.role]}</p>}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        );
      })}

      <section className="border-t border-line py-24 md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="text-h2">{t.divisionsTitle}</h2>
            <p className="mt-6 max-w-[34ch] text-lead text-slate">{t.divisionsIntro}</p>
          </Reveal>
          <Stagger as="dl" className="md:col-span-8">
            {t.divisions.map((d) => (
              <StaggerItem as="div" key={d.name} className="group grid gap-2 border-t border-line py-7 last:border-b sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-8">
                <dt className="font-display text-[1.25rem] font-extrabold uppercase leading-tight text-royal transition-colors duration-300 group-hover:text-signal">
                  {d.name}
                </dt>
                <dd className="text-lead text-slate">{d.purpose}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="on-ink relative overflow-hidden bg-ink py-24 text-paper md:py-32">
        <FlowLines tone="dark" preset="soft" />
        <div className="container-site relative">
          <div className="grid gap-8 md:grid-cols-12">
            <MaskedLines as="h2" inView lines={[t.campusesTitle]} className="text-h2 md:col-span-5" />
            <Reveal delay={0.1} className="md:col-span-7">
              <p className="text-lead text-paper/80">{t.campusesBody}</p>
            </Reveal>
          </div>
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {campuses
              .filter((c) => !c.upcoming)
              .map((c) => (
                <StaggerItem key={c.key} className="bg-ink">
                  <Spotlight colour="rgba(142,168,255,0.16)" className="h-full p-8 md:p-10">
                    <h3 className="text-[clamp(2rem,1.6rem+1.8vw,3.2rem)] font-extrabold uppercase leading-none">{dict.campuses[c.key]}</h3>
                    <p className="mt-3 text-sm text-paper/60">
                      {c.lat.toFixed(2)}° N, {Math.abs(c.lon).toFixed(2)}° {c.lon >= 0 ? "E" : "W"}
                    </p>
                    <p className="mt-10 text-paper/70">{t.representative}</p>
                    <p className="text-signal-on-ink">{dict.common.toBeAnnounced}</p>
                  </Spotlight>
                </StaggerItem>
              ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
