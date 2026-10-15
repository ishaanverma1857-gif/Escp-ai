import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { site } from "@/content/site";
import { Button } from "@/components/ui";
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
    <section className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-48">
      <div aria-hidden="true" className="graticule pointer-events-none absolute inset-0" />
      <div className="container-site relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FadeIn>
            <p className="kicker mb-6">{dict.nav.login}</p>
          </FadeIn>
          <MaskedLines lines={[l.title]} className="text-h1" />
          <FadeIn delay={0.35}>
            <p className="mt-8 max-w-[56ch] text-lead text-slate">{l.body}</p>
            <div className="mt-10">
              <Button href={site.memberPlatformUrl} disabledLabel={dict.common.linkComingSoon}>
                {l.cta}
              </Button>
            </div>
            <p className="mt-10 text-slate">
              {l.notMember}{" "}
              <Link href={href(lang, "/join")} className="font-bold text-ink underline decoration-ink/30 underline-offset-[6px] hover:decoration-signal">
                {l.notMemberLink}
              </Link>
            </p>
          </FadeIn>
        </div>

        {/* A quiet preview of what the workspace organises. */}
        <div className="lg:col-span-5" aria-hidden="true">
          <Stagger as="div" className="on-ink rounded-[1.75rem] bg-ink p-6 text-paper shadow-[0_40px_80px_-40px_rgba(14,34,64,0.6)] md:p-8" gap={0.09}>
            <div className="mb-6 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-paper/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-paper/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-paper/25" />
            </div>
            {l.features.map((f, i) => (
              <StaggerItem as="div" key={f} className="flex items-center gap-4 border-t border-paper/12 py-4">
                <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-signal-on-ink" : "bg-paper/40"}`} />
                <span className="font-display text-xl font-bold">{f}</span>
                <span className="ml-auto h-2 rounded-full bg-paper/12" style={{ width: `${30 + ((i * 17) % 40)}%` }} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
