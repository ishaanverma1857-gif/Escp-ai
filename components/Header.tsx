"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./ui";
import { Magnetic } from "./fx";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/en";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Header({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const links = [
    { path: "/team", label: nav.team },
    { path: "/partners", label: nav.partners },
    { path: "/events", label: nav.events },
    { path: "/services", label: nav.services },
    { path: "/shop", label: nav.shop },
  ];

  const rest = pathname.split("/").slice(2).join("/");
  const current = `/${rest}`;
  const isActive = (path: string) => current === path || current.startsWith(`${path}/`);
  const switchHref = `/${locale === "en" ? "fr" : "en"}${rest ? `/${rest}` : ""}`;

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 320);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {nav.skip}
      </a>
      <header
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-[55] transition-[background-color,box-shadow,backdrop-filter,translate] duration-500 ease-[var(--ease-out-quint)] ${
          scrolled && !open ? "bg-paper/95 shadow-[0_1px_0_var(--color-line)]" : "bg-transparent"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href={`/${locale}`}
            className={`relative z-[55] transition-colors ${open ? "text-paper" : "text-ink"}`}
            aria-label={`ESCP AI — ${nav.home}`}
          >
            <Logo gap={open ? "var(--color-ink)" : "var(--color-paper)"} />
          </Link>

          <nav aria-label={nav.primary} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.path} className="relative">
                  <Link
                    href={`/${locale}${l.path}`}
                    aria-current={isActive(l.path) ? "page" : undefined}
                    className="relative block px-3.5 py-2 text-[0.95rem] text-ink/80 transition-colors hover:text-ink aria-[current=page]:text-ink"
                  >
                    {l.label}
                    {isActive(l.path) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-signal"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <Link href={switchHref} hrefLang={locale === "en" ? "fr" : "en"} aria-label={nav.switchLabel} className="link-underline text-[0.95rem] text-ink/80 hover:text-ink">
              {locale === "en" ? "FR" : "EN"}
            </Link>
            <Link href={`/${locale}/login`} aria-current={isActive("/login") ? "page" : undefined} className="link-underline text-[0.95rem] text-ink/80 hover:text-ink">
              {nav.login}
            </Link>
            <Magnetic>
            <Link
              href={`/${locale}/join`}
              className="inline-flex min-h-11 items-center rounded-full bg-royal px-5 text-[0.95rem] font-bold text-paper transition-colors duration-300 hover:bg-ink"
            >
              {nav.join}
            </Link>
            </Magnetic>
          </div>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`relative z-[55] -mr-2 flex h-12 min-w-12 items-center justify-center gap-3 rounded-full px-3 text-[0.95rem] font-bold transition-colors lg:hidden ${
              open ? "text-paper" : "text-ink"
            }`}
          >
            <span>{open ? nav.close : nav.menu}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={`absolute left-0 h-[2px] w-6 bg-current transition-transform duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[2px] w-6 bg-current transition-transform duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={nav.menu}
            className="on-ink fixed inset-0 z-[52] flex flex-col overflow-y-auto bg-ink pt-24 text-paper lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav aria-label={nav.primary} className="container-site flex flex-1 flex-col pb-10">
              <motion.ul
                className="flex flex-col"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
              >
                {[{ path: "", label: nav.home }, ...links, { path: "/join", label: nav.join }].map((l, i) => (
                  <motion.li
                    key={l.path}
                    className="border-b border-paper/12"
                    variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                  >
                    <Link
                      ref={i === 0 ? firstLink : undefined}
                      href={`/${locale}${l.path}`}
                      aria-current={(l.path === "" ? current === "/" : isActive(l.path)) ? "page" : undefined}
                      className="flex items-center justify-between py-4 font-display text-[1.9rem] font-extrabold uppercase leading-tight tracking-[-0.01em] aria-[current=page]:text-signal-on-ink"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 pt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link href={`/${locale}/login`} className="text-lg underline decoration-paper/30 underline-offset-[6px]">
                  {nav.login}
                </Link>
                <Link href={switchHref} hrefLang={locale === "en" ? "fr" : "en"} className="text-lg underline decoration-paper/30 underline-offset-[6px]">
                  {nav.switchTo}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
