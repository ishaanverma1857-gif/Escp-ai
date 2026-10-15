import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contactHref, getDictionary, hasLocale } from "@/lib/i18n";
import { partners } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/partners">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).nav.partners } : {};
}

export default async function PartnersPage({ params }: PageProps<"/[lang]/partners">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const p = dict.partners;

  return (
    <>
      <PageHeader kicker={dict.nav.partners} title={p.title} intro={p.intro} />

      <section className="pb-24 md:pb-32">
        <div className="container-site">
          <Reveal>
            <h2 className="text-h2">{p.ecosystemTitle}</h2>
          </Reveal>
          {/* Names are set in type until partner logos are approved for use. */}
          <Stagger className="mt-12 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((name) => (
              <StaggerItem
                key={name}
                className="group relative flex min-h-40 items-end border-b border-r border-line p-7 md:min-h-52 md:p-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:scale-y-100"
                />
                <span className="relative font-display text-[clamp(2rem,1.6rem+1.4vw,2.75rem)] leading-none transition-colors duration-500 group-hover:text-paper">
                  {name}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="text-h2">{p.whyTitle}</h2>
          </Reveal>
          <Stagger className="md:col-span-7">
            {p.why.map((reason) => (
              <StaggerItem key={reason} className="flex gap-5 border-t border-line py-5 text-lead last:border-b">
                <svg viewBox="0 0 10 10" className="mt-[0.55em] h-2.5 w-2.5 shrink-0 text-signal" aria-hidden="true">
                  <circle cx="5" cy="5" r="4" fill="currentColor" />
                </svg>
                {reason}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-site">
          <Reveal>
            <div className="on-ink flex flex-col gap-8 rounded-[1.75rem] bg-ink p-8 text-paper md:flex-row md:items-end md:justify-between md:p-14">
              <div>
                <h2 className="text-h2">{p.cta}</h2>
                <p className="mt-4 max-w-[48ch] text-lead text-paper/75">{p.ctaBody}</p>
              </div>
              <Button href={contactHref(lang, dict.mail.partner)} variant="onInk" className="shrink-0">
                {p.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
