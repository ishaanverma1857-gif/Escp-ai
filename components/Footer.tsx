import Link from "next/link";
import { Logo } from "./ui";
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
    <footer className="on-ink mt-auto bg-ink text-paper">
      <div className="container-site grid gap-14 pb-10 pt-20 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-6">
          <Logo className="text-paper" />
          <p className="mt-8 max-w-[22ch] font-display text-[clamp(1.9rem,1.4rem+1.8vw,2.9rem)] leading-[1.1]">{footer.tagline}</p>
          <ul className="mt-8 flex gap-6 text-paper/70">
            {(["paris", "turin", "madrid"] as const).map((c) => (
              <li key={c}>{campuses[c]}</li>
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
      <div className="container-site flex flex-col gap-2 border-t border-paper/12 py-8 text-sm text-paper/60 sm:flex-row sm:justify-between">
        <p>{footer.rights}</p>
        <p>{footer.independent}</p>
      </div>
    </footer>
  );
}
