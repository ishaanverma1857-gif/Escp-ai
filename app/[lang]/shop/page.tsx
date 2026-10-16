import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, localeInfo } from "@/lib/i18n";
import { products } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { AddToCart } from "@/components/Cart";
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
  const price = new Intl.NumberFormat(lang === "en" ? "en-IE" : localeInfo[lang].intl, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

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
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#efefef]">
                    <Image
                      src={p.image}
                      alt={`${copy.name}: ${copy.detail}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.03]"
                    />
                  </div>
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
                    <AddToCart product={p.key} sizes={p.sizes} copy={s.cart} />
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
