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
/* Neural field — interactive particle network behind the hero         */
/* ------------------------------------------------------------------ */

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export function NeuralField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LINK = 130;

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(95, Math.round((w * h) / (w < 640 ? 16000 : 13000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.8,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (!reduce) {
          // Gentle pull toward the cursor.
          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d < 220 && d > 1) {
              p.vx += (dx / d) * 0.012;
              p.vy += (dy / d) * 0.012;
            }
          }
          p.vx *= 0.985;
          p.vy *= 0.985;
          // Keep a minimum drift so the field never freezes.
          if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.04;
          if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.04;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(14,34,64,${(1 - d / LINK) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (pointer.active) {
          const d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (d < 180) {
            ctx.strokeStyle = `rgba(47,84,235,${(1 - d / 180) * 0.55})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
        const near = pointer.active && Math.hypot(a.x - pointer.x, a.y - pointer.y) < 180;
        ctx.fillStyle = near ? "rgba(47,84,235,0.9)" : "rgba(14,34,64,0.35)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, near ? a.r + 0.8 : a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    seed();
    if (reduce) draw();
    else raf = requestAnimationFrame(loop);

    const onResize = () => {
      seed();
      if (reduce) draw();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.y > 0 && pointer.y < rect.height;
    };
    const onLeave = () => (pointer.active = false);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none block h-full w-full ${className}`} />;
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

export function VelocityMarquee({ items, label, baseVelocity = -2.2 }: { items: string[]; label: string; baseVelocity?: number }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2500, 0, 2500], [8, 0, -8]);
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

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((name) => (
        <li key={name} className="flex items-center whitespace-nowrap font-display text-[clamp(2.4rem,1.6rem+3.4vw,4.75rem)] leading-none text-ink">
          <span className="px-6 md:px-12">{name}</span>
          <svg viewBox="0 0 10 10" className="h-3 w-3 text-signal" aria-hidden="true">
            <circle cx="5" cy="5" r="4" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label={label}
      className="relative overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <motion.div className="flex w-max" style={{ x, skewX }}>
        {row(false)}
        {row(true)}
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
/* Large campus triangle that draws itself with scroll                  */
/* ------------------------------------------------------------------ */

export function ScrollTriangle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const draw = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const nodes = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  return (
    <div ref={ref} aria-hidden="true" className={className}>
    <motion.svg viewBox="0 0 400 360" className="h-auto w-full" style={{ rotate }}>
      <motion.path
        d="M200 30 L370 320 L30 320 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ pathLength: draw }}
      />
      {[
        [200, 30],
        [370, 320],
        [30, 320],
      ].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="9" fill={i === 1 ? "var(--color-signal-on-ink)" : "currentColor"} style={{ opacity: nodes, scale: nodes }} />
      ))}
    </motion.svg>
    </div>
  );
}

export { EASE };
