import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { display, sans } from "@/lib/fonts";
import { getDictionary, hasLocale, localeInfo, locales } from "@/lib/i18n";
import { products } from "@/content/site";
import { CartDrawer } from "@/components/Cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/components/motion";
import { ScrollProgress, SmoothScroll } from "@/components/fx";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    title: { default: meta.title, template: "%s — ESCP AI" },
    description: meta.description,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])) },
    openGraph: { title: meta.title, description: meta.description, siteName: "ESCP AI", locale: localeInfo[lang].og, type: "website" },
  };
}

export const viewport: Viewport = {
  themeColor: "#f6f7f9",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Header locale={lang} nav={dict.nav} />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer locale={lang} dict={dict} />
          <CartDrawer
            copy={dict.shop.cart}
            orderSoon={dict.shop.orderSoon}
            intl={lang === "en" ? "en-IE" : localeInfo[lang].intl}
            products={products.map((p) => ({ key: p.key, name: dict.shop.products[p.key].name, price: p.price, image: p.image }))}
          />
        </MotionProvider>
      </body>
    </html>
  );
}
