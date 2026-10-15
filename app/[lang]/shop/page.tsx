import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contactHref, getDictionary, hasLocale } from "@/lib/i18n";
import { products, site } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import { Tilt } from "@/components/fx";
import Garment from "@/components/Garment";
import { Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/shop">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).nav.shop } : {};
}

export default async function ShopPage({ params }: PageProps<"/[lang]/shop">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const s = dict.shop;
  const price = new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  // Orders go to the shop URL once it exists, otherwise by email; until either is confirmed the button waits.
  const orderHref = (name: string) =>
    site.shopOrderUrl ?? (site.email ? contactHref(lang, `${dict.mail.order}: ${name}`) : null);

  return (
    <>
      <PageHeader kicker={dict.nav.shop} title={s.title} intro={s.intro} />

      <section className="pb-24 md:pb-32">
        <div className="container-site">
          <Stagger className="grid gap-8 md:grid-cols-3" gap={0.1}>
            {products.map((p) => {
              const copy = s.products[p.key];
              return (
                <StaggerItem key={p.key} as="article" className="group flex flex-col">
                  <Tilt max={8}>
                  <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.5rem] bg-fog">
                    <div aria-hidden="true" className="graticule absolute inset-0 opacity-70" />
                    <div className="relative w-[72%] transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:-translate-y-2 group-hover:rotate-[-2deg] group-hover:scale-[1.04]">
                      <Garment kind={p.key} colour={p.colour} />
                    </div>
                  </div>
                  </Tilt>
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h2 className="text-[1.75rem] leading-tight">{copy.name}</h2>
                    <p className="font-display text-[1.6rem] font-extrabold tabular-nums text-royal">{price.format(p.price)}</p>
                  </div>
                  <p className="mt-2 text-slate">{copy.detail}</p>
                  <p className="mt-4 flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 rounded-full border border-ink/30"
                      style={{ backgroundColor: p.colour }}
                    />
                    <span>
                      <span className="sr-only">{s.colourLabel}: </span>
                      {s.colours[p.colourKey]}
                    </span>
                  </p>
                  <div className="mt-6">
                    <Button href={orderHref(copy.name)} variant="secondary" disabledLabel={s.orderSoon}>
                      {s.order}
                    </Button>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal className="mt-16">
            <p className="max-w-[60ch] text-lead text-slate">{s.note}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
