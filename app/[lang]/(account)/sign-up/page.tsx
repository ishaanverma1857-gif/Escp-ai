import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import AuthShell from "@/components/AuthShell";

export async function generateMetadata({ params }: PageProps<"/[lang]/sign-up">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).login.signupTitle, robots: { index: false } } : {};
}

export default async function SignUpPage({ params }: PageProps<"/[lang]/sign-up">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const l = dict.login;

  return (
    <AuthShell kicker={dict.nav.login} title={l.signupTitle} note={l.escpOnly} back={{ href: href(lang, "/login"), label: dict.nav.login }}>
      <div>
        <SignUp routing="hash" signInUrl={href(lang, "/sign-in")} forceRedirectUrl={href(lang, "/account")} />
        <p className="mx-auto mt-6 max-w-[26rem] text-sm text-slate">{dict.account.privacy}</p>
      </div>
    </AuthShell>
  );
}
