import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { campuses, findCampus } from "@/content/site";
import { Knot } from "@/components/brand";
import { Button } from "@/components/ui";
import { DottedArc, FlowLines, Tilt } from "@/components/fx";
import { FadeIn, MaskedLines, Reveal, Stagger, StaggerItem } from "@/components/motion";

export function generateStaticParams() {
  return campuses.map((c) => ({ campus: c.key }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/campuses/[campus]">): Promise<Metadata> {
  const { lang, campus } = await params;
  const c = findCampus(campus);
  if (!hasLocale(lang) || !c) return {};
  const dict = getDictionary(lang);
  return { title: `${dict.campuses[c.key]}, ${dict.campusPage.cities[c.key].country}`, description: dict.campusPage.cities[c.key].intro };
}

/** A photo, or an honest branded panel until a real photo is added. */
function Photo({ src, alt, label, soon, className = "", sizes }: { src: string | null; alt: string; label: string; soon: string; className?: string; sizes: string }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.05]" />
      </div>
    );
  }
  return (
    <div className={`on-ink relative isolate flex flex-col justify-end overflow-hidden bg-ink p-6 text-paper ${className}`}>
      <FlowLines tone="dark" preset="soft" className="-z-10" />
      <Knot gap="var(--color-ink)" className="absolute right-5 top-5 h-9 w-9 text-paper/30" />
      <p className="font-display text-[clamp(1.3rem,1rem+1vw,1.8rem)] font-extrabold uppercase leading-tight">{label}</p>
      <p className="mt-1 text-sm text-paper/60">{soon}</p>
    </div>
  );
}

export default async function CampusPage({ params }: PageProps<"/[lang]/campuses/[campus]">) {
  const { lang, campus } = await params;
  const c = findCampus(campus);
  if (!hasLocale(lang) || !c) notFound();
  const dict = getDictionary(lang);
  const cp = dict.campusPage;
  const city = cp.cities[c.key];
  const name = dict.campuses[c.key];
  const igHref = c.instagram ? `https://instagram.com/${c.instagram}` : null;
  const coord = `${c.lat.toFixed(2)}° N, ${Math.abs(c.lon).toFixed(2)}° ${c.lon >= 0 ? "E" : "W"}`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
        <FlowLines tone="light" preset="hero" />
        <DottedArc className="absolute right-[6%] top-24 hidden w-36 text-royal/50 md:block" rotate={-80} sweep={75} />
        <div className="container-site relative grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeIn>
              <Link href={`${href(lang)}#main`} className="link-underline text-sm font-bold text-slate hover:text-ink">
                <span aria-hidden="true">←</span> {cp.back}
              </Link>
              <p className="kicker mb-5 mt-8">
                {c.upcoming ? cp.upcomingKicker : cp.kicker}, {city.country}
              </p>
            </FadeIn>
            <MaskedLines lines={[name]} className="text-[clamp(3.5rem,1.6rem+8vw,8.5rem)] leading-[0.92] text-royal" />
            <FadeIn delay={0.3}>
              <p className="mt-4 text-sm font-bold text-slate">{coord}</p>
              {c.upcoming && <p className="mt-3 inline-block rounded-full bg-signal-soft px-4 py-1.5 text-sm font-bold text-royal">{dict.campuses.londonNote}</p>}
              <p className="mt-7 max-w-[56ch] text-lead text-slate">{city.intro}</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                {igHref ? (
                  <Button href={igHref}>
                    <InstagramLogo size={20} weight="bold" aria-hidden="true" />
                    @{c.instagram}
                  </Button>
                ) : (
                  <p className="text-slate">{cp.noInstagram}</p>
                )}
                <Button href={href(lang, "/join")} variant="secondary">
                  {dict.nav.join}
                </Button>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="lg:col-span-5">
            <Tilt max={5}>
              <Photo
                src={c.campusPhoto}
                alt={city.campus}
                label={city.campus}
                soon={cp.photoSoon}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="group aspect-[4/5] rounded-[2.5rem] border-[3px] border-royal/70"
              />
            </Tilt>
          </FadeIn>
        </div>
      </section>

      {/* Landmarks */}
      <section className="border-t border-line py-24 md:py-32">
        <div className="container-site">
          <MaskedLines as="h2" inView lines={[cp.cityTitle]} className="text-h2" />
          <Stagger className="mt-12 grid gap-8 md:grid-cols-3" gap={0.1}>
            {city.landmarks.map((l, i) => (
              <StaggerItem key={l.name} as="article" className="group">
                <Tilt max={6}>
                  <Photo
                    src={c.landmarkPhotos[i] ?? null}
                    alt={l.name}
                    label={l.name}
                    soon={cp.photoSoon}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="aspect-[4/5] rounded-[2rem]"
                  />
                </Tilt>
                <h3 className="mt-5 text-[1.3rem] font-extrabold uppercase leading-tight text-royal">{l.name}</h3>
                <p className="mt-2 text-slate">{l.blurb}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Instagram call to action */}
      <section className="on-ink relative overflow-hidden bg-royal py-20 text-paper md:py-28">
        <FlowLines tone="dark" preset="soft" />
        <div className="container-site relative grid gap-10 md:grid-cols-12 md:items-end">
          <MaskedLines as="h2" inView lines={[cp.joinTitle]} className="text-h1 font-extrabold uppercase md:col-span-7" />
          <Reveal className="md:col-span-5">
            <p className="text-lead text-paper/85">{cp.joinBody}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {igHref && (
                <Button href={igHref} variant="onInk">
                  <InstagramLogo size={20} weight="bold" aria-hidden="true" />
                  {cp.follow}
                </Button>
              )}
              <Button href={href(lang, "/join")} variant="onInkOutline">
                {dict.nav.join}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other branches */}
      <section className="py-20 md:py-28">
        <div className="container-site">
          <h2 className="text-[1.6rem] leading-tight">{cp.others}</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {campuses
              .filter((o) => o.key !== c.key)
              .map((o) => (
                <li key={o.key}>
                  <Link
                    href={href(lang, `/campuses/${o.key}`)}
                    className="group flex items-center justify-between rounded-[1.25rem] border border-line bg-paper px-6 py-5 transition-colors duration-300 hover:border-royal hover:bg-fog"
                  >
                    <span>
                      <span className="block font-display text-xl font-extrabold uppercase text-royal">{dict.campuses[o.key]}</span>
                      <span className="text-sm text-slate">{o.instagram ? `@${o.instagram}` : dict.campuses.londonNote}</span>
                    </span>
                    <Knot className="h-7 w-7 text-royal/40 transition-transform duration-500 group-hover:rotate-90 group-hover:text-royal" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
