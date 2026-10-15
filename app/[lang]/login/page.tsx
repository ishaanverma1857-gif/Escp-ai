import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
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
          <p className="mt-6 max-w-[60ch] text-lead text-slate">{l.choose}</p>
          <ol className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {l.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-3 font-bold text-ink">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-royal font-display text-sm font-extrabold text-paper">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </FadeIn>

        <Stagger as="div" className="mt-12 grid gap-6 md:grid-cols-2" gap={0.12}>
          {/* Existing accounts */}
          <StaggerItem as="article" className="on-ink relative isolate overflow-hidden rounded-[2rem] bg-ink text-paper">
            <Spotlight colour="rgba(142,168,255,0.18)" className="flex h-full flex-col p-8 md:p-12">
              <FlowLines tone="dark" preset="band" className="-z-10 opacity-60" />
              <Knot gap="var(--color-ink)" className="h-12 w-12 text-paper" />
              <h2 className="mt-10 text-[clamp(1.8rem,1.4rem+1.6vw,2.6rem)] font-extrabold uppercase leading-none">{l.loginTitle}</h2>
              <p className="mt-4 max-w-[40ch] text-lead text-paper/80">{l.loginBody}</p>
              <div className="mt-auto pt-10">
                <Button href={href(lang, "/sign-in")} variant="onInk">
                  {l.loginCta}
                </Button>
              </div>
            </Spotlight>
          </StaggerItem>

          {/* New accounts */}
          <StaggerItem as="article" className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-paper">
            <Spotlight className="flex h-full flex-col p-8 md:p-12">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-royal font-display text-2xl font-extrabold text-royal">
                +
              </span>
              <h2 className="mt-10 text-[clamp(1.8rem,1.4rem+1.6vw,2.6rem)] font-extrabold uppercase leading-none text-royal">{l.signupTitle}</h2>
              <p className="mt-4 max-w-[40ch] text-lead text-slate">{l.signupBody}</p>
              <div className="mt-auto pt-10">
                <Button href={href(lang, "/sign-up")}>{l.signupCta}</Button>
              </div>
            </Spotlight>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
