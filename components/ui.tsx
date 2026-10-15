import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "./fx";

/** Three linked nodes — the campuses — beside the society name. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" aria-hidden="true">
        <path d="M14 4 L24 21 L4 21 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="14" cy="4.5" r="3" fill="currentColor" />
        <circle cx="23.5" cy="21" r="3" fill="var(--color-signal)" />
        <circle cx="4.5" cy="21" r="3" fill="currentColor" />
      </svg>
      <span className="text-[1.0625rem] font-bold tracking-[-0.01em]">ESCP AI</span>
    </span>
  );
}

type ButtonVariant = "primary" | "secondary" | "quiet" | "onInk" | "onInkOutline";

const variants: Record<ButtonVariant, string> = {
  primary:
    "relative overflow-hidden bg-ink text-paper before:absolute before:inset-0 before:translate-y-full before:rounded-full before:bg-signal before:transition-transform before:duration-500 before:ease-[var(--ease-out-quint)] hover:before:translate-y-0",
  secondary:
    "relative overflow-hidden border border-ink/25 text-ink transition-[color,border-color] before:absolute before:inset-0 before:translate-y-full before:rounded-full before:bg-ink before:transition-transform before:duration-500 before:ease-[var(--ease-out-quint)] hover:border-ink hover:text-paper hover:before:translate-y-0",
  quiet: "text-ink underline decoration-ink/30 underline-offset-[6px] hover:decoration-signal px-0! min-h-0!",
  onInk: "bg-paper text-ink hover:bg-signal-soft",
  onInkOutline: "border border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.98rem] font-bold transition-colors duration-300 cursor-pointer select-none";

/**
 * Link styled as a button. External links (http, mailto) open normally;
 * when `href` is null the button renders in a clearly disabled state.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  disabledLabel,
}: {
  href: string | null;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabledLabel?: string;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (!href) {
    return (
      <span className="inline-flex flex-col items-start gap-1.5">
        <span aria-disabled="true" className={`${base} ${variants[variant]} cursor-not-allowed! opacity-45 ${className}`}>
          {children}
        </span>
        {disabledLabel && <span className="text-sm text-current/70">{disabledLabel}</span>}
      </span>
    );
  }
  const external = /^(https?:|mailto:)/.test(href);
  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;
  const link = external ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
  return variant === "quiet" ? link : <Magnetic className={className.includes("w-full") ? "w-full" : ""}>{link}</Magnetic>;
}

export function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-h2 ${className}`}>{children}</h2>;
}
