"use client";

import { MotionConfig, motion, useInView, useReducedMotion, animate } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Shared with the page template: on the first load the intro curtain covers the
 * page for about a second, so entrance animations wait for it to lift.
 */
export const introState = { first: true };
export const entryDelay = () => (introState.first ? 1.05 : 0.4);

/** Respects the OS "reduce motion" setting for every Motion animation below it. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "p";
};

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** A list whose items arrive one after another. */
export function Stagger({
  children,
  className,
  as = "ul",
  gap = 0.07,
}: {
  children: ReactNode;
  className?: string;
  as?: "ul" | "ol" | "div" | "dl";
  gap?: number;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "li",
}: {
  children: ReactNode;
  className?: string;
  as?: "li" | "div" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline whose words rise out of a mask one after another.
 * With `inView` it plays when scrolled into view instead of on page load.
 */
export function MaskedLines({
  lines,
  className,
  as = "h1",
  delay = 0,
  inView = false,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  inView?: boolean;
}) {
  const Tag = motion[as];
  const start = (inView ? 0 : entryDelay()) + delay;
  let index = 0;
  const trigger = inView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.4 } }
    : { initial: "hidden", animate: "show" };

  return (
    <Tag className={className} {...trigger}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, wi) => {
            const i = index++;
            return (
              <Fragment key={wi}>
              <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span
                  className="inline-block origin-bottom-left"
                  variants={{
                    hidden: { y: "110%", rotate: 7 },
                    show: { y: 0, rotate: 0, transition: { duration: 1, ease: EASE, delay: start + i * 0.07 } },
                  }}
                >
                  {word}
                </motion.span>
              </span>{" "}
              </Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Simple fade + rise on mount, for content right under a page title. */
export function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const start = entryDelay() + delay;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: start }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up to a number when it first becomes visible. */
export function CountUp({ value, suffix = "", locale = "en" }: { value: number; suffix?: string; locale?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB").format(shown)}
      {suffix}
    </span>
  );
}
