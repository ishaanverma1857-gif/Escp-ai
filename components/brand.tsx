import { useId } from "react";

/*
 * The ESCP AI symbol: two orbits crossing at ±45°, woven over and under.
 * Crossing points sit on the axes at distance T from the centre:
 * T = sqrt(2 / (1/RX² + 1/RY²)) for an ellipse rotated 45°.
 */
const RX = 40;
const RY = 21;
const T = Math.sqrt(2 / (1 / RX ** 2 + 1 / RY ** 2));
const STROKE = 10.5;

type KnotProps = {
  className?: string;
  /** Colour of the background behind the symbol, used for the weave gaps. */
  gap?: string;
  /** Stroke colour (defaults to currentColor). */
  colour?: string;
  /** Adds the `knot-draw` class so CSS can animate the strokes drawing in. */
  draw?: boolean;
  title?: string;
  /** Position and size, for nesting inside another SVG. */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export function Knot({ className = "", gap = "var(--color-paper)", colour = "currentColor", draw = false, title, ...position }: KnotProps) {
  const id = useId().replace(/:/g, "");
  const a = { cx: 50, cy: 50, rx: RX, ry: RY, transform: "rotate(45 50 50)", pathLength: 1 };
  const b = { ...a, transform: "rotate(-45 50 50)" };
  const r = 13.5;

  return (
    <svg
      viewBox="0 0 100 100"
      {...position}
      className={`${draw ? "knot-draw" : ""} ${className}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <clipPath id={`${id}-v`}>
          <circle cx="50" cy={50 - T} r={r} />
          <circle cx="50" cy={50 + T} r={r} />
        </clipPath>
        <clipPath id={`${id}-h`}>
          <circle cx={50 - T} cy="50" r={r} />
          <circle cx={50 + T} cy="50" r={r} />
        </clipPath>
      </defs>
      <g fill="none" strokeLinecap="round">
        <ellipse {...a} stroke={colour} strokeWidth={STROKE} />
        <ellipse {...b} stroke={colour} strokeWidth={STROKE} />
        <g clipPath={`url(#${id}-v)`}>
          <ellipse {...a} stroke={gap} strokeWidth={STROKE + 6} className="knot-gap" />
          <ellipse {...a} stroke={colour} strokeWidth={STROKE} />
        </g>
        <g clipPath={`url(#${id}-h)`}>
          <ellipse {...b} stroke={gap} strokeWidth={STROKE + 6} className="knot-gap" />
          <ellipse {...b} stroke={colour} strokeWidth={STROKE} />
        </g>
      </g>
    </svg>
  );
}

/** The "ESCP | AI" wordmark with the symbol, as on the society's posters. */
export function Logo({
  className = "",
  gap,
  size = "md",
}: {
  className?: string;
  gap?: string;
  size?: "md" | "lg";
}) {
  const lg = size === "lg";
  return (
    <span className={`inline-flex items-center ${lg ? "gap-5" : "gap-3"} ${className}`}>
      <span
        className={`font-display font-semibold uppercase leading-none ${
          lg ? "text-[clamp(2.2rem,1rem+5vw,5.5rem)] tracking-[0.22em]" : "text-[0.95rem] tracking-[0.3em]"
        }`}
      >
        ESCP
      </span>
      <span aria-hidden="true" className={`w-px self-stretch bg-current ${lg ? "my-1 opacity-60" : "my-0.5 opacity-70"}`} />
      <span
        className={`-ml-[0.1em] font-display font-semibold uppercase leading-none ${
          lg ? "text-[clamp(2.2rem,1rem+5vw,5.5rem)] tracking-[0.22em]" : "text-[0.95rem] tracking-[0.3em]"
        }`}
      >
        AI
      </span>
      <Knot gap={gap} className={lg ? "-ml-2 h-[clamp(2.6rem,1.2rem+5.6vw,6.2rem)] w-auto" : "-ml-1.5 h-8 w-8"} />
    </span>
  );
}
