import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getDictionary, hasLocale, href, type Locale } from "@/lib/i18n";
import { isConfirmedMember, isEscpEmail } from "@/lib/auth";
import { campuses } from "@/content/site";
import { FlowLines } from "@/components/fx";
import { MaskedLines } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/account/members">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).account.membersTitle, robots: { index: false } } : {};
}

async function MembersContent({ lang }: { lang: Locale }) {
  const user = await currentUser();
  if (!user) redirect(href(lang, "/sign-in"));

  const dict = getDictionary(lang);
  const a = dict.account;
  // Checked on the server on every visit, so the page can't be opened by guessing its address.
  if (!isEscpEmail(user.primaryEmailAddress?.emailAddress) || !isConfirmedMember(user.publicMetadata)) {
    return (
      <div className="max-w-2xl">
        <p className="text-lead text-slate">{a.notMember}</p>
        <Link href={href(lang, "/account")} className="link-underline mt-6 inline-block font-bold text-royal">
          {a.backToAccount}
        </Link>
      </div>
    );
  }

  const n = dict.nav;
  const links = [
    { path: "/events", label: n.events },
    { path: "/team", label: n.team },
    { path: "/partners", label: n.partners },
    { path: "/services", label: n.services },
    { path: "/shop", label: n.shop },
    ...campuses.map((c) => ({ path: `/campuses/${c.key}`, label: dict.campuses[c.key] })),
  ];

  return (
    <>
      <MaskedLines lines={[a.membersTitle]} className="text-h1 text-royal" />
      <p className="mt-6 max-w-[56ch] text-lead text-slate">{a.membersIntro}</p>
      <h2 className="mt-14 text-h2">{a.membersLinks}</h2>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.path}>
            <Link
              href={href(lang, l.path)}
              className="flex items-center justify-between rounded-[1.25rem] border border-line bg-paper px-6 py-5 font-display text-lg font-extrabold uppercase text-royal transition-colors duration-300 hover:border-royal hover:bg-fog"
            >
              {l.label}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={href(lang, "/account")} className="link-underline mt-12 inline-block font-bold text-slate hover:text-ink">
        <span aria-hidden="true">←</span> {a.backToAccount}
      </Link>
    </>
  );
}

export default async function MembersPage({ params }: PageProps<"/[lang]/account/members">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <section className="relative min-h-[80dvh] overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
      <FlowLines tone="light" preset="soft" className="opacity-80" />
      <div className="container-site relative">
        <p className="kicker mb-6">{getDictionary(lang).account.kicker}</p>
        <Suspense fallback={<div className="h-80 animate-pulse rounded-[2rem] bg-fog" />}>
          <MembersContent lang={lang} />
        </Suspense>
      </div>
    </section>
  );
}
