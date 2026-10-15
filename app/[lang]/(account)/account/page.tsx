import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { getDictionary, hasLocale, href, type Locale } from "@/lib/i18n";
import { isConfirmedMember, isEscpEmail } from "@/lib/auth";
import { Button } from "@/components/ui";
import { Knot } from "@/components/brand";
import { FlowLines, Spotlight } from "@/components/fx";
import { FadeIn, MaskedLines } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[lang]/account">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).account.kicker, robots: { index: false } } : {};
}

/** Removes an account created with a non-ESCP email so the person can sign up again correctly. */
async function deleteWrongAccount(formData: FormData) {
  "use server";
  const lang = String(formData.get("lang")) as Locale;
  const user = await currentUser();
  if (user && !isEscpEmail(user.primaryEmailAddress?.emailAddress)) {
    await (await clerkClient()).users.deleteUser(user.id);
  }
  redirect(href(hasLocale(lang) ? lang : "en", "/sign-up"));
}

async function AccountContent({ lang }: { lang: Locale }) {
  const user = await currentUser();
  if (!user) redirect(href(lang, "/sign-in"));

  const dict = getDictionary(lang);
  const a = dict.account;
  const email = user.primaryEmailAddress?.emailAddress ?? "";
  const name = user.firstName ?? email.split("@")[0].split(".")[0];

  const signOut = (
    <SignOutButton redirectUrl={href(lang, "/login")}>
      <button type="button" className="link-underline cursor-pointer font-bold text-slate hover:text-ink">
        {a.signOut}
      </button>
    </SignOutButton>
  );

  // Safety net on the server: only ESCP student emails get any access.
  if (!isEscpEmail(email)) {
    return (
      <div className="max-w-2xl">
        <MaskedLines lines={[a.wrongDomainTitle]} className="text-h1 text-royal" />
        <p className="mt-6 text-lead text-slate">{a.wrongDomainBody}</p>
        <p className="mt-3 text-slate">
          {a.signedInAs} <strong className="text-ink">{email}</strong>
        </p>
        <form action={deleteWrongAccount} className="mt-10 flex flex-wrap items-center gap-6">
          <input type="hidden" name="lang" value={lang} />
          <button
            type="submit"
            className="inline-flex min-h-12 cursor-pointer items-center rounded-full bg-royal px-6 font-bold text-paper transition-colors hover:bg-ink"
          >
            {a.wrongDomainCta}
          </button>
          {signOut}
        </form>
      </div>
    );
  }

  const member = isConfirmedMember(user.publicMetadata);

  return (
    <>
      <MaskedLines lines={[`${a.title}, ${name}`]} className="text-h1 capitalize text-royal" />
      <FadeIn delay={0.3}>
        <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-slate">
          <span>
            {a.signedInAs} <strong className="text-ink">{email}</strong>
          </span>
          {signOut}
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <article className="on-ink relative isolate overflow-hidden rounded-[2rem] bg-ink text-paper">
          <Spotlight colour="rgba(142,168,255,0.18)" className="flex h-full flex-col p-8 md:p-12">
            <FlowLines tone="dark" preset="band" className="-z-10 opacity-60" />
            <Knot gap="var(--color-ink)" className="h-12 w-12 text-paper" />
            <h2 className="mt-10 text-[clamp(1.8rem,1.4rem+1.6vw,2.6rem)] font-extrabold uppercase leading-none">{a.memberTitle}</h2>
            <p className="mt-4 max-w-[40ch] text-lead text-paper/80">{member ? a.memberBody : a.memberPending}</p>
            <div className="mt-auto pt-10">
              <Button href={member ? href(lang, "/account/members") : null} variant="onInk">
                {a.memberCta}
              </Button>
            </div>
          </Spotlight>
        </article>

        <article className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-paper">
          <Spotlight className="flex h-full flex-col p-8 md:p-12">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-royal font-display text-2xl font-extrabold text-royal">
              +
            </span>
            <h2 className="mt-10 text-[clamp(1.8rem,1.4rem+1.6vw,2.6rem)] font-extrabold uppercase leading-none text-royal">{a.applyTitle}</h2>
            <p className="mt-4 max-w-[40ch] text-lead text-slate">{a.applyBody}</p>
            <div className="mt-auto pt-10">
              <Button href={href(lang, "/apply")} variant="secondary">
                {a.applyCta}
              </Button>
            </div>
          </Spotlight>
        </article>
      </div>
    </>
  );
}

export default async function AccountPage({ params }: PageProps<"/[lang]/account">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const a = getDictionary(lang).account;

  return (
    <section className="relative min-h-[80dvh] overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
      <FlowLines tone="light" preset="soft" className="opacity-80" />
      <div className="container-site relative">
        <p className="kicker mb-6">{a.kicker}</p>
        <Suspense fallback={<div className="h-80 animate-pulse rounded-[2rem] bg-fog" />}>
          <AccountContent lang={lang} />
        </Suspense>
      </div>
    </section>
  );
}
