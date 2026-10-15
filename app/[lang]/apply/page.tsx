import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { site } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui";
import { FlowLines } from "@/components/fx";
import { MaskedLines, Reveal, Stagger, StaggerItem } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/apply">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).apply.title } : {};
}

/** Placeholder until applications open: explains the process and points to Instagram for the announcement. */
export default async function ApplyPage({ params }: PageProps<"/[lang]/apply">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const a = dict.apply;
  const ig = site.instagram ? `https://instagram.com/${site.instagram}` : null;

  return (
    <>
      <PageHeader kicker={a.kicker} title={a.title} intro={a.intro}>
        <p className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-signal-soft px-4 py-2 text-sm font-bold text-royal">
          <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
          </span>
          {dict.common.comingSoon}
        </p>
      </PageHeader>

      <section className="border-t border-line py-20 md:py-28">
        <div className="container-site">
          <MaskedLines as="h2" inView lines={[a.stepsTitle]} className="text-h2" />
          <Stagger as="ol" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {a.steps.map((s, i) => (
              <StaggerItem key={s.title} className="rounded-[1.5rem] border border-line bg-paper p-7">
                <span className="font-display text-4xl font-extrabold text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-[1.2rem] font-extrabold uppercase leading-tight text-royal">{s.title}</h3>
                <p className="mt-2 text-slate">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="on-ink relative overflow-hidden bg-royal py-20 text-paper md:py-28">
        <FlowLines tone="dark" preset="soft" />
        <div className="container-site relative grid gap-10 md:grid-cols-12 md:items-end">
          <MaskedLines as="h2" inView lines={[a.notifyTitle]} className="text-h1 font-extrabold uppercase md:col-span-7" />
          <Reveal className="md:col-span-5">
            <p className="text-lead text-paper/85">{a.notifyBody}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {ig && (
                <Button href={ig} variant="onInk">
                  <InstagramLogo size={20} weight="bold" aria-hidden="true" />
                  {a.notifyCta}
                </Button>
              )}
              <Button href={href(lang, "/join")} variant="onInkOutline">
                {a.learnMore}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
