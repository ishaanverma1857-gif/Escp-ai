import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Buildings,
  ChalkboardTeacher,
  FlowArrow,
  GearSix,
  Handshake,
  Lightbulb,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { contactHref, getDictionary, hasLocale } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const icons: Record<string, Icon> = {
  flow: FlowArrow,
  gear: GearSix,
  chalk: ChalkboardTeacher,
  building: Buildings,
  lightbulb: Lightbulb,
  handshake: Handshake,
};

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).nav.services } : {};
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const s = dict.services;

  return (
    <>
      <PageHeader kicker={dict.nav.services} title={s.title} intro={s.intro} />

      <section className="pb-24 md:pb-32">
        <div className="container-site">
          <Stagger className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {s.items.map((item) => {
              const IconCmp = icons[item.icon];
              return (
                <StaggerItem key={item.name} className="group flex flex-col bg-paper p-8 transition-colors duration-500 hover:bg-fog md:p-10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-paper">
                    <IconCmp size={26} weight="light" aria-hidden="true" />
                  </span>
                  <h2 className="mt-10 text-[1.75rem] leading-[1.15]">{item.name}</h2>
                  <p className="mt-3 text-slate">{item.body}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="on-ink bg-ink py-24 text-paper md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <h2 className="text-h1">{s.ctaTitle}</h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6 md:self-end">
            <p className="max-w-[46ch] text-lead text-paper/75">{s.ctaBody}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={contactHref(lang, dict.mail.service)} variant="onInk">
                {s.ctaRequest}
              </Button>
              <Button href={contactHref(lang, dict.mail.project)} variant="onInkOutline">
                {s.ctaSubmit}
              </Button>
              <Button href={contactHref(lang, dict.mail.meeting)} variant="onInkOutline">
                {s.ctaMeeting}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
