import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import AuthShell from "@/components/AuthShell";

export async function generateMetadata({ params }: PageProps<"/[lang]/sign-in">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).login.loginTitle, robots: { index: false } } : {};
}

export default async function SignInPage({ params }: PageProps<"/[lang]/sign-in">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const l = getDictionary(lang).login;

  return (
    <AuthShell kicker={getDictionary(lang).nav.login} title={l.loginTitle} note={l.escpOnly} back={{ href: href(lang, "/login"), label: getDictionary(lang).nav.login }}>
      <SignIn routing="hash" signUpUrl={href(lang, "/sign-up")} forceRedirectUrl={href(lang, "/account")} />
    </AuthShell>
  );
}
