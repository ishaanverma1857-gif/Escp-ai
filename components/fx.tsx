"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type MotionValue,
} from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** True only on devices with a precise pointer (mouse/trackpad), where hover effects make sense. */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

/* ------------------------------------------------------------------ */
/* Smooth scrolling                                                    */
/* ------------------------------------------------------------------ */

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll() {
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -96 }, autoRaf: true });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reduce]);

  // New page starts at the top.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}

/* ------------------------------------------------------------------ */
/* Scroll progress bar                                                 */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[58] h-[2px] origin-left bg-signal"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Flow lines — bundles of fine contour lines, the ESCP AI texture      */
/* ------------------------------------------------------------------ */

type Ribbon = { y: number; amp: number; freq: number; speed: number; phase: number; spread: number; lines: number; tilt: number };

const RIBBONS: Record<"hero" | "band" | "soft", Ribbon[]> = {
  hero: [
    { y: 0.28, amp: 0.16, freq: 1.3, speed: 0.11, phase: 0, spread: 0.2, lines: 34, tilt: 0.35 },
    { y: 0.86, amp: 0.12, freq: 1.7, speed: 0.08, phase: 2.1, spread: 0.16, lines: 28, tilt: -0.25 },
  ],
  band: [
    { y: 0.32, amp: 0.2, freq: 1.1, speed: 0.1, phase: 0.6, spread: 0.24, lines: 36, tilt: 0.2 },
    { y: 0.78, amp: 0.14, freq: 1.6, speed: 0.07, phase: 3.4, spread: 0.18, lines: 26, tilt: -0.3 },
  ],
  soft: [{ y: 0.55, amp: 0.18, freq: 1.2, speed: 0.08, phase: 1.2, spread: 0.22, lines: 30, tilt: 0.15 }],
};

export function FlowLines({
  tone = "light",
  preset = "hero",
  className = "",
}: {
  tone?: "light" | "dark";
  preset?: keyof typeof RIBBONS;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let t = Math.random() * 100;
    let last = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, strength: 0, target: 0 };
    const ribbons = RIBBONS[preset];
    const rgb = tone === "light" ? "34,65,168" : "122,150,255";
    const baseAlpha = tone === "light" ? 0.15 : 0.22;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      const step = w < 640 ? 14 : 10;
      const sigma = Math.min(w, h) * 0.14;
      for (const r of ribbons) {
        for (let i = 0; i < r.lines; i++) {
          const k = i / (r.lines - 1) - 0.5;
          // Lines near the centre of the ribbon are a touch stronger.
          ctx.strokeStyle = `rgba(${rgb},${baseAlpha * (1 - Math.abs(k) * 0.9)})`;
          ctx.beginPath();
          for (let x = -step; x <= w + step; x += step) {
            const u = x / w;
            const centre =
              h * (r.y + r.tilt * (u - 0.5) * 0.4) +
              h * r.amp * Math.sin(u * Math.PI * r.freq + t * r.speed * 6 + r.phase) +
              h * r.amp * 0.35 * Math.sin(u * Math.PI * r.freq * 2.3 - t * r.speed * 4 + r.phase * 1.7);
            // The ribbon pinches and fans out along its length, like twisted contour lines.
            const fan = 0.35 + 0.65 * Math.abs(Math.sin(u * Math.PI * 1.4 + t * r.speed * 3 + r.phase));
            let y = centre + k * h * r.spread * fan;
            if (pointer.strength > 0.01) {
              const dx = x - pointer.x;
              const dy = y - pointer.y;
              const fall = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
              y += Math.sign(dy || 1) * fall * 46 * pointer.strength;
            }
            if (x === -step) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) {
        t += dt;
        pointer.strength += (pointer.target - pointer.strength) * 0.08;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) draw();
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.target = pointer.y > 0 && pointer.y < rect.height ? 1 : 0;
    };
    const onLeave = () => (pointer.target = 0);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, tone, preset]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 block h-full w-full ${className}`} />;
}

/** Arc of dots, a recurring motif in the ESCP AI visuals. Dots appear one by one when scrolled into view. */
export function DottedArc({ className = "", dots = 9, sweep = 70, radius = 120, rotate = 0 }: { className?: string; dots?: number; sweep?: number; radius?: number; rotate?: number }) {
  const pts = Array.from({ length: dots }, (_, i) => {
    const a = ((rotate + (i / (dots - 1)) * sweep) * Math.PI) / 180;
    return { x: radius + Math.cos(a) * radius, y: radius + Math.sin(a) * radius, r: 1.6 + (i / dots) * 1.6 };
  });
  return (
    <motion.svg
      viewBox={`-6 -6 ${radius * 2 + 12} ${radius * 2 + 12}`}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {pts.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill="currentColor"
          variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } } }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}
    </motion.svg>
  );
}

/** Live countdown to an event. Rendered only in the browser so server and client markup always match. */
export function Countdown({ to, labels }: { to: string; labels: { days: string; hours: string; minutes: string; seconds: string } }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const target = new Date(to).getTime();
  if (now === null || target - now <= 0) return <div className="h-[4.75rem]" aria-hidden="true" />;
  const s = Math.floor((target - now) / 1000);
  const parts = [
    { v: Math.floor(s / 86400), l: labels.days },
    { v: Math.floor((s % 86400) / 3600), l: labels.hours },
    { v: Math.floor((s % 3600) / 60), l: labels.minutes },
    { v: s % 60, l: labels.seconds },
  ];
  return (
    <div className="flex gap-3 sm:gap-4" role="timer" aria-live="off">
      {parts.map((p) => (
        <div key={p.l} className="min-w-[4.25rem] rounded-2xl bg-paper/10 px-3 py-2.5 text-center ring-1 ring-paper/20 backdrop-blur-sm">
          <span className="block font-display text-[1.9rem] font-extrabold leading-none tabular-nums">{String(p.v).padStart(2, "0")}</span>
          <span className="mt-1 block text-[0.7rem] font-semibold uppercase tracking-[0.18em] opacity-75">{p.l}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Text that lights up word by word as you scroll                       */
/* ------------------------------------------------------------------ */

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative">
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </span>
  );
}

export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee that reacts to scroll speed and direction                    */
/* ------------------------------------------------------------------ */

export function VelocityMarquee({
  children,
  label,
  baseVelocity = -2.2,
  className = "py-8",
}: {
  children: ReactNode;
  label: string;
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2500, 0, 2500], [6, 0, -6]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (reduce || paused) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = velocityFactor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div
      role="region"
      aria-label={label}
      className={`relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] ${className}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <motion.div className="flex w-max" style={{ x, skewX }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hover effects: magnetic, spotlight, tilt                             */
/* ------------------------------------------------------------------ */

export function Magnetic({ children, strength = 0.32, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const active = fine && !reduce;

  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className}`}
      style={active ? { x, y } : undefined}
      onPointerMove={(e) => {
        if (!active || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Radial light that follows the cursor across a surface. */
export function Spotlight({
  children,
  className = "",
  colour = "rgba(47,84,235,0.12)",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  colour?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = as;
  return (
    <Tag
      className={`spotlight ${className}`}
      style={{ "--spot": colour } as React.CSSProperties}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </Tag>
  );
}

export function Tilt({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 180, damping: 20 });
  const ry = useSpring(0, { stiffness: 180, damping: 20 });
  const active = fine && !reduce;

  return (
    <div className={`[perspective:1200px] ${className}`}>
      <motion.div
        className="h-full [transform-style:preserve-3d]"
        style={active ? { rotateX: rx, rotateY: ry } : undefined}
        onPointerMove={(e) => {
          if (!active) return;
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Follows the pointer anywhere on the page, for parallax on large elements like the hero map. */
export function PointerParallax({ children, className = "", depth = 10 }: { children: ReactNode; className?: string; depth?: number }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 60, damping: 18 });
  const ry = useSpring(0, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (!fine || reduce) return;
    const onMove = (e: PointerEvent) => {
      ry.set((e.clientX / window.innerWidth - 0.5) * depth);
      rx.set(-(e.clientY / window.innerHeight - 0.5) * depth);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduce, depth, rx, ry]);

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="[transform-style:preserve-3d]">
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Large ESCP AI symbol that draws its orbits as you scroll             */
/* ------------------------------------------------------------------ */

export function ScrollKnot({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drawA = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const drawB = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <motion.svg viewBox="0 0 100 100" className="h-auto w-full" style={{ rotate }}>
        <motion.ellipse cx="50" cy="50" rx="40" ry="21" transform="rotate(45 50 50)" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ pathLength: drawA }} />
        <motion.ellipse cx="50" cy="50" rx="40" ry="21" transform="rotate(-45 50 50)" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ pathLength: drawB }} />
        <motion.ellipse cx="50" cy="50" rx="46" ry="24" transform="rotate(45 50 50)" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="0.6 2.4" style={{ pathLength: drawB, opacity: 0.6 }} />
      </motion.svg>
    </div>
  );
}

export { EASE };
