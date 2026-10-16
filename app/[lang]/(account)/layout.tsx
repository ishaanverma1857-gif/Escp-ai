import { ClerkProvider } from "@clerk/nextjs";
import { deDE, enUS, esES, frFR, itIT } from "@clerk/localizations";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { authEnabled } from "@/lib/auth";
import PageHeader from "@/components/PageHeader";

/** Branded look for Clerk's sign-in, sign-up and profile screens. */
const appearance = {
  variables: {
    colorPrimary: "#2241a8",
    colorForeground: "#0b1b4d",
    colorMutedForeground: "#4a5573",
    colorBackground: "#ffffff",
    colorInput: "#f7f8fc",
    colorDanger: "#c2264b",
    fontFamily: "var(--font-atkinson), system-ui, sans-serif",
    borderRadius: "0.9rem",
  },
  elements: {
    card: { boxShadow: "0 30px 60px -30px rgba(11,27,77,0.35)", border: "1px solid #d3daea" },
    headerTitle: { fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontWeight: 800, textTransform: "uppercase" },
    formButtonPrimary: { fontWeight: 700, textTransform: "none" },
  },
};

/** Accounts live only under this group, so the rest of the site stays fully static. */
export default async function AccountLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  if (!authEnabled()) {
    const l = getDictionary(lang).login;
    return <PageHeader title={l.title} intro={getDictionary(lang).common.comingSoon} />;
  }

  return (
    <ClerkProvider
      localization={{ en: enUS, fr: frFR, it: itIT, es: esES, de: deDE }[lang]}
      appearance={appearance as never}
      signInUrl={`/${lang}/sign-in`}
      signUpUrl={`/${lang}/sign-up`}
      afterSignOutUrl={`/${lang}/login`}
    >
      {children}
    </ClerkProvider>
  );
}
