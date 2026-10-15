import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { site } from "@/content/site";
import { Button } from "@/components/ui";
import { Knot } from "@/components/brand";
import { DottedArc, FlowLines, Spotlight } from "@/components/fx";
import { FadeIn, MaskedLines, Stagger, StaggerItem } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/login">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).nav.login, robots: { index: false } } : {};
}

export default async function LoginPage({ params }: PageProps<"/[lang]/login">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const l = dict.login;

  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
      <FlowLines tone="light" preset="soft" className="opacity-80" />
      <DottedArc className="absolute right-[7%] top-28 hidden w-36 text-royal/50 md:block" rotate={-80} sweep={75} />
      <div className="container-site relative">
        <FadeIn>
          <p className="kicker mb-6">{dict.nav.login}</p>
        </FadeIn>
        <MaskedLines lines={[l.title]} className="text-h1 text-royal" />
        <FadeIn delay={0.3}>
          <p className="mt-6 text-lead text-slate">{l.choose}</p>
        </FadeIn>

        <Stagger as="div" className="mt-12 grid gap-6 md:grid-cols-2" gap={0.12}>
          {/* Members */}
          <StaggerItem as="article" className="on-ink relative isolate overflow-hidden rounded-[2rem] bg-ink text-paper">
            <Spotlight colour="rgba(142,168,255,0.18)" className="flex h-full flex-col p-8 md:p-12">
              <FlowLines tone="dark" preset="band" className="-z-10 opacity-60" />
              <Knot gap="var(--color-ink)" className="h-12 w-12 text-paper" />
              <h2 className="mt-10 text-[clamp(1.8rem,1.4rem+1.6vw,2.6rem)] font-extrabold uppercase leading-none">{l.memberTitle}</h2>
              <p className="mt-4 max-w-[40ch] text-lead text-paper/80">{l.memberBody}</p>
              <div className="mt-auto pt-10">
                <Button href={site.memberPlatformUrl} variant="onInk" disabledLabel={l.memberSoon}>
                  {l.memberCta}
                </Button>
              </div>
            </Spotlight>
          </StaggerItem>

          {/* Applicants */}
          <StaggerItem as="article" className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-paper">
            <Spotlight className="flex h-full flex-col p-8 md:p-12">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-royal font-display text-2xl font-extrabold text-royal">
                +
              </span>
              <h2 className="mt-10 text-[clamp(1.8rem,1.4rem+1.6vw,2.6rem)] font-extrabold uppercase leading-none text-royal">{l.applicantTitle}</h2>
              <p className="mt-4 max-w-[40ch] text-lead text-slate">{l.applicantBody}</p>
              <div className="mt-auto pt-10">
                <Button href={href(lang, "/apply")} variant="secondary">
                  {l.applicantCta}
                </Button>
              </div>
            </Spotlight>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
