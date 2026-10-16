import Link from "next/link";
import type { ReactNode } from "react";
import { href, type Locale } from "@/lib/i18n";
import { ROLE_LABEL, type Viewer } from "@/lib/viewer";
import { CAMPUS_LABEL, DIVISION_LABEL } from "@/lib/sample-data";

import { btnPrimary, btnSecondary } from "./styles";

export * from "./styles";

const TABS = [
  { key: "events", label: "Events" },
  { key: "members", label: "Members" },
  { key: "tasks", label: "Tasks" },
] as const;
export type DashboardTab = (typeof TABS)[number]["key"];

export function DashboardShell({ lang, active, children }: { lang: Locale; active: DashboardTab; children: ReactNode }) {
  return (
    <section className="min-h-[80dvh] bg-paper pb-24 pt-28 md:pt-32">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href={href(lang, "/account")} className="link-underline text-sm text-slate hover:text-ink">
              <span aria-hidden="true">←</span> My account
            </Link>
            <h1 className="mt-3 font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-extrabold uppercase leading-none text-royal">
              Dashboard
            </h1>
          </div>
          <span className="rounded-full bg-signal-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-royal">
            Prototype
          </span>
        </div>
        <nav aria-label="Dashboard" className="mt-8 border-b border-line">
          <ul className="-mb-px flex gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <li key={t.key}>
                <Link
                  href={href(lang, `/dashboard/${t.key}`)}
                  aria-current={active === t.key ? "page" : undefined}
                  className="block border-b-2 border-transparent px-4 py-3 font-bold text-slate transition-colors hover:text-ink aria-[current=page]:border-royal aria-[current=page]:text-royal"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function ViewerBadge({ viewer }: { viewer: Viewer }) {
  const scope = [viewer.campus && CAMPUS_LABEL[viewer.campus], viewer.division && DIVISION_LABEL[viewer.division]]
    .filter(Boolean)
    .join(" · ");
  return (
    <p className="text-sm text-slate">
      Signed in as <strong className="text-ink">{viewer.name}</strong> ·{" "}
      <span className="font-bold text-royal">{ROLE_LABEL[viewer.role]}</span>
      {scope && ` · ${scope}`}
    </p>
  );
}

export function NoAccess({ lang }: { lang: Locale }) {
  return (
    <div className="max-w-xl rounded-[1.5rem] border border-line bg-fog/60 p-8">
      <h2 className="text-[1.5rem] leading-tight text-royal">Members only</h2>
      <p className="mt-3 text-slate">
        The dashboard is for confirmed ESCP AI members. Log in with your ESCP email; if you just joined, the team needs to confirm your
        membership first.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={href(lang, "/sign-in")} className={btnPrimary}>
          Log in
        </Link>
        <Link href={href(lang, "/account")} className={btnSecondary}>
          My account
        </Link>
      </div>
    </div>
  );
}

export function Badge({ tone = "neutral", children }: { tone?: "neutral" | "good" | "warn" | "bad" | "info"; children: ReactNode }) {
  const tones = {
    neutral: "bg-fog text-slate",
    good: "bg-[#dff3e8] text-[#17663f]",
    warn: "bg-[#fff1d6] text-[#8a5a00]",
    bad: "bg-[#fde4ea] text-[#a01d3e]",
    info: "bg-signal-soft text-royal",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}

export const Skeleton = () => <div className="h-72 animate-pulse rounded-[1.5rem] bg-fog" />;

export function DbMissing() {
  return (
    <p className="rounded-xl bg-[#fff1d6] px-5 py-4 text-[#8a5a00]">
      The database isn&apos;t connected yet. Add Neon in Vercel → Storage, then redeploy.
    </p>
  );
}
