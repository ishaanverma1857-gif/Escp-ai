"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Vertical line that draws itself as the calendar scrolls past. */
export default function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative">
      <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-[calc(16rem+7px)]" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-0 left-[7px] top-0 w-[2px] origin-top bg-signal md:left-[calc(16rem+6.5px)]"
      />
      <ol ref={ref} className="relative">
        {children}
      </ol>
    </div>
  );
}
