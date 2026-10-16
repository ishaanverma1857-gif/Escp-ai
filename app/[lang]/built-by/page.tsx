import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { builders } from "@/content/site";
import { Knot } from "@/components/brand";
import { Button } from "@/components/ui";
import { DottedArc, FlowLines } from "@/components/fx";
import { FadeIn, MaskedLines, Reveal, Stagger, StaggerItem } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/built-by">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const b = getDictionary(lang).builders;
  return { title: b.title, description: b.intro };
}

export default async function BuiltByPage({ params }: PageProps<"/[lang]/built-by">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const b = getDictionary(lang).builders;
  const instagram = `https://instagram.com/${builders.instagram}`;

  return (
    <>
      <section className="on-ink relative overflow-hidden bg-ink pb-20 pt-36 text-paper md:pb-28 md:pt-48">
        <FlowLines tone="dark" preset="band" />
        <DottedArc className="absolute right-[6%] top-28 w-28 text-signal-on-ink/70" rotate={-80} />
        <div className="container-site relative">
          <FadeIn>
            <p className="kicker mb-6 text-signal-on-ink">{b.kicker}</p>
          </FadeIn>
          <MaskedLines
            lines={b.title.split(" ")}
            className="text-[clamp(2.8rem,1.4rem+6vw,7rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em]"
          />
          <FadeIn delay={0.35}>
            <p className="mt-8 max-w-[52ch] text-lead text-paper/80">{b.intro}</p>
            <div className="mt-10">
              <Button href={instagram} variant="onInk">
                <InstagramIcon /> @{builders.instagram}
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-32">
        <FlowLines tone="light" preset="soft" className="opacity-70" />
        <Knot gap="var(--color-paper)" className="absolute bottom-12 right-[5%] hidden h-16 w-16 text-ink md:block" />
        <div className="container-site relative">
          <MaskedLines as="h2" inView lines={[b.teamTitle]} className="text-h2 text-royal" />
          <Stagger className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-3" gap={0.12}>
            {builders.members.map((m) => (
              <StaggerItem key={m.id} className="group text-center">
                <div className="mx-auto max-w-[19rem] overflow-hidden rounded-[2.5rem] border-[3px] border-royal/80 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:-translate-y-2">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={380}
                      height={507}
                      sizes="(min-width: 640px) 304px, 80vw"
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.05]"
                    />
                  ) : (
                    <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 bg-fog">
                      <span aria-hidden="true" className="font-display text-[5rem] font-extrabold leading-none text-royal/25">
                        {m.name[0]}
                      </span>
                      <span className="text-sm font-bold uppercase tracking-[0.18em] text-royal/60">{b.photoSoon}</span>
                    </div>
                  )}
                </div>
                <p className="mt-6 font-display text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] font-extrabold uppercase leading-tight text-royal">{m.name}</p>
                <p className="mt-1.5 italic text-slate">{b.roles[m.role]}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-line bg-fog/60 py-24 md:py-32">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-12">
            <MaskedLines as="h2" inView lines={[b.videosTitle]} className="text-h2 text-royal md:col-span-5" />
            <Reveal delay={0.1} className="md:col-span-7">
              <p className="text-lead text-slate">{b.videosIntro}</p>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2" gap={0.12}>
            {builders.videos.map((v, i) => (
              <StaggerItem key={i}>
                {v.src ? (
                  <video
                    poster={v.poster ?? undefined}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={`${b.videoLabel} ${i + 1}`}
                    className="aspect-video w-full rounded-[1.5rem] bg-ink object-cover"
                  >
                    {/* WebM first for browsers without H.264; every other browser uses the MP4. */}
                    {v.webm && <source src={v.webm} type="video/webm" />}
                    <source src={v.src} type="video/mp4" />
                  </video>
                ) : (
                  <div className="on-ink relative flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-[1.5rem] bg-ink text-paper">
                    <FlowLines tone="dark" preset="soft" className="opacity-60" />
                    <span aria-hidden="true" className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-paper/40">
                      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-paper/70">
                        <path d="M7 4.5v15l12.5-7.5L7 4.5Z" />
                      </svg>
                    </span>
                    <p className="relative font-display text-sm font-bold uppercase tracking-[0.2em] text-paper/70">
                      {b.videoLabel} {i + 1} · {b.videoSoon}
                    </p>
                  </div>
                )}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-14">
            <Button href={instagram} variant="secondary">
              <InstagramIcon /> {b.follow}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
