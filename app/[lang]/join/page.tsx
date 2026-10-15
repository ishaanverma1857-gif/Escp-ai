import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contactHref, getDictionary, hasLocale } from "@/lib/i18n";
import { site } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, MaskedLines } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/join">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).nav.join } : {};
}

export default async function JoinPage({ params }: PageProps<"/[lang]/join">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const j = dict.join;
  const applyHref = site.applicationUrl ?? contactHref(lang, dict.mail.apply);

  return (
    <>
      <PageHeader kicker={dict.nav.join} title={j.title} intro={j.intro}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={applyHref}>{j.ctaApply}</Button>
          <Button href="#recruitment" variant="quiet">
            {j.ctaProcess}
          </Button>
        </div>
      </PageHeader>

      {/* Values */}
      <section className="on-ink overflow-hidden bg-ink py-24 text-paper md:py-32">
        <div className="container-site">
          <Reveal>
            <p className="max-w-[30ch] font-display text-[clamp(2rem,1.4rem+2.6vw,3.75rem)] leading-[1.1]">{j.values}</p>
          </Reveal>
          <Stagger className="mt-14 flex flex-wrap gap-3" gap={0.08}>
            {j.valueWords.map((w) => (
              <StaggerItem key={w} className="rounded-full border border-paper/25 px-5 py-2.5 text-lg">
                {w}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <MaskedLines as="h2" inView lines={[j.gainTitle]} className="text-h2 md:col-span-4" />
          <Stagger className="grid gap-x-10 sm:grid-cols-2 md:col-span-8" gap={0.05}>
            {j.gains.map((g) => (
              <StaggerItem key={g} className="flex gap-4 border-t border-line py-5 text-lead">
                <svg viewBox="0 0 20 20" className="mt-[0.3em] h-5 w-5 shrink-0 text-signal" aria-hidden="true">
                  <path d="M4 10.5 8.2 14.5 16 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {g}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Recruitment */}
      <section id="recruitment" className="border-t border-line bg-fog/60 py-24 md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <MaskedLines as="h2" inView lines={[j.recruitmentTitle]} className="text-h2 md:col-span-4" />
          <Reveal delay={0.1} className="md:col-span-8">
            <p className="max-w-[62ch] font-display text-[clamp(1.35rem,1.15rem+0.8vw,1.85rem)] leading-[1.45]">{j.recruitment}</p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button href={applyHref}>{j.ctaApply}</Button>
              <Button href={contactHref(lang, dict.mail.apply)} variant="secondary">
                {j.ctaMember}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <MaskedLines as="h2" inView lines={[j.contactTitle]} className="text-h2 md:col-span-4" />
          <Reveal delay={0.1} className="md:col-span-8">
            <p className="text-lead text-slate">{j.contactBody}</p>
            {site.email || site.instagram ? (
              <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                {site.email && (
                  <div>
                    <dt className="text-slate">{j.email}</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${site.email}`} className="link-underline font-display text-[1.75rem] break-all">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                )}
                {site.instagram && (
                  <div>
                    <dt className="text-slate">{j.instagram}</dt>
                    <dd className="mt-1">
                      <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className="link-underline font-display text-[1.75rem]">
                        @{site.instagram}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            ) : (
              <p className="mt-10 rounded-[1.25rem] border border-dashed border-ink/25 p-8 font-display text-2xl leading-snug">{j.contactPending}</p>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
