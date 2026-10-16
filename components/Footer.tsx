import Link from "next/link";
import { Logo } from "./ui";
import { FlowLines } from "./fx";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/en";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { nav, footer, campuses, join } = dict;
  const links = [
    { path: "/team", label: nav.team },
    { path: "/partners", label: nav.partners },
    { path: "/events", label: nav.events },
    { path: "/services", label: nav.services },
    { path: "/join", label: nav.join },
    { path: "/shop", label: nav.shop },
    { path: "/login", label: nav.login },
  ];

  return (
    <footer className="on-ink relative mt-auto overflow-hidden bg-ink text-paper">
      <FlowLines tone="dark" preset="soft" className="opacity-80" />
      <div className="container-site relative pt-20 md:pt-28">
        <Logo size="lg" gap="var(--color-ink)" className="text-paper" />
      </div>
      <div className="container-site relative grid gap-14 pb-10 pt-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="max-w-[24ch] font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-semibold leading-[1.15]">{footer.tagline}</p>
          <ul className="mt-8 flex gap-6 text-paper/70">
            {(["paris", "turin", "madrid", "berlin"] as const).map((c) => (
              <li key={c}>
                <Link href={`/${locale}/campuses/${c}`} className="link-underline hover:text-paper">
                  {campuses[c]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={footer.explore} className="md:col-span-3">
          <h2 className="font-sans text-sm font-bold text-paper/60">{footer.explore}</h2>
          <ul className="mt-5 space-y-2.5">
            {links.map((l) => (
              <li key={l.path}>
                <Link href={`/${locale}${l.path}`} className="link-underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-sans text-sm font-bold text-paper/60">{footer.contact}</h2>
          <ul className="mt-5 space-y-2.5">
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="link-underline">
                  {site.email}
                </a>
              </li>
            )}
            {site.instagram && (
              <li>
                <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className="link-underline">
                  Instagram @{site.instagram}
                </a>
              </li>
            )}
            {!site.email && !site.instagram && <li className="max-w-[28ch] text-paper/70">{join.contactPending}</li>}
          </ul>
        </div>
      </div>
      <div className="container-site relative flex flex-col gap-2 border-t border-paper/12 py-8 text-sm text-paper/60 sm:flex-row sm:justify-between">
        <p>{footer.rights}</p>
        <p className="flex flex-wrap gap-x-2">
          <span>{footer.independent}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <Link href={`/${locale}/built-by`} className="link-underline text-paper/80 hover:text-paper">
            {dict.builders.credit}
          </Link>
        </p>
      </div>
    </footer>
  );
}
