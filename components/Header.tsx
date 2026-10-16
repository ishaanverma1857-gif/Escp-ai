"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./ui";
import { Magnetic } from "./fx";
import { CartButton } from "./Cart";
import { localeInfo, locales, type Locale } from "@/lib/locales";
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
  const langHref = (l: Locale) => `/${l}${rest ? `/${rest}` : ""}`;

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
            <CartButton label={nav.cart} className="-mx-2 text-ink/80 hover:text-ink" />
            <LanguageMenu locale={locale} label={nav.language} hrefFor={langHref} />
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

          <div className="flex items-center gap-1 lg:hidden">
          {!open && <CartButton label={nav.cart} className="text-ink" />}
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
              </motion.div>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-paper/60">{nav.language}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {locales.map((l) => (
                    <li key={l}>
                      <Link
                        href={langHref(l)}
                        hrefLang={l}
                        lang={l}
                        aria-current={l === locale ? "true" : undefined}
                        className="inline-flex min-h-11 items-center rounded-full border border-paper/25 px-4 text-base transition-colors aria-[current=true]:border-paper aria-[current=true]:bg-paper aria-[current=true]:text-ink"
                      >
                        {localeInfo[l].name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LanguageMenu({ locale, label, hrefFor }: { locale: Locale; label: string; hrefFor: (l: Locale) => string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="language-menu"
        aria-label={`${label}: ${localeInfo[locale].name}`}
        className="flex min-h-11 items-center gap-1.5 text-[0.95rem] font-bold uppercase text-ink/80 transition-colors hover:text-ink"
      >
        {locale}
        <svg aria-hidden="true" viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id="language-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute right-0 top-full mt-2 min-w-44 rounded-2xl border border-line bg-paper p-1.5 shadow-[0_18px_40px_-18px_rgba(11,27,77,0.35)]"
          >
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={hrefFor(l)}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? "true" : undefined}
                  className="flex items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 text-[0.95rem] text-ink/80 transition-colors hover:bg-fog hover:text-ink aria-[current=true]:font-bold aria-[current=true]:text-royal"
                >
                  {localeInfo[l].name}
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate">{l}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
