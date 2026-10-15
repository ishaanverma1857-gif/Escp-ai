"use client";

import { motion, useReducedMotion } from "motion/react";
import { campuses, type Campus } from "@/content/site";
import { entryDelay } from "./motion";

/*
 * A small cartographic view of western Europe that links the ESCP AI
 * campuses with arcs. Positions use a simple equirectangular projection, so
 * the cities sit where they really are relative to each other.
 */

const LON_MIN = -6;
const LAT_MAX = 53.5;
const SCALE = 40;
const LON_SCALE = SCALE * Math.cos((46 * Math.PI) / 180);
const W = 480;
const H = 580;

const project = (c: Pick<Campus, "lat" | "lon">) => ({
  x: (c.lon - LON_MIN) * LON_SCALE,
  y: (LAT_MAX - c.lat) * SCALE,
});

function arc(a: { x: number; y: number }, b: { x: number; y: number }, bend = 0.2) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  // Control point pushed perpendicular to the chord.
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${(mx - dy * bend).toFixed(1)} ${(my + dx * bend).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

const EASE = [0.22, 1, 0.36, 1] as const;

type Labels = Record<"paris" | "turin" | "madrid" | "london" | "londonNote" | "mapLabel", string>;

export default function CampusNetwork({ labels }: { labels: Labels }) {
  const reduce = useReducedMotion();
  const d0 = entryDelay() - 0.2;
  const p = Object.fromEntries(campuses.map((c) => [c.key, project(c)])) as Record<Campus["key"], { x: number; y: number }>;

  const links = [
    { id: "paris-turin", d: arc(p.paris, p.turin, 0.18) },
    { id: "turin-madrid", d: arc(p.turin, p.madrid, 0.16) },
    { id: "madrid-paris", d: arc(p.madrid, p.paris, 0.2) },
  ];
  const future = arc(p.paris, p.london, -0.25);

  const meridians = Array.from({ length: 9 }, (_, i) => -6 + i * 2);
  const parallels = Array.from({ length: 8 }, (_, i) => 40 + i * 2);

  const labelPos: Record<Campus["key"], { dx: number; dy: number; anchor: "start" | "end" }> = {
    paris: { dx: 18, dy: -10, anchor: "start" },
    turin: { dx: 16, dy: -22, anchor: "start" },
    madrid: { dx: 18, dy: 30, anchor: "start" },
    london: { dx: -16, dy: -16, anchor: "end" },
  };

  const coord = (c: Campus) =>
    `${Math.abs(c.lat).toFixed(2)}° ${c.lat >= 0 ? "N" : "S"}, ${Math.abs(c.lon).toFixed(2)}° ${c.lon >= 0 ? "E" : "W"}`;

  return (
    <svg
      viewBox={`-20 -10 ${W + 40} ${H + 20}`}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label={labels.mapLabel}
    >
      {/* Graticule */}
      <g stroke="currentColor" className="text-ink/10" strokeWidth="1">
        {meridians.map((lon) => {
          const x = (lon - LON_MIN) * LON_SCALE;
          return <line key={`m${lon}`} x1={x} y1={0} x2={x} y2={H} />;
        })}
        {parallels.map((lat) => {
          const y = (LAT_MAX - lat) * SCALE;
          return <line key={`p${lat}`} x1={0} y1={y} x2={W} y2={y} />;
        })}
      </g>

      {/* Links between campuses */}
      {links.map((l, i) => (
        <motion.path
          key={l.id}
          id={l.id}
          d={l.d}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: d0 + 0.6 + i * 0.25 }}
        />
      ))}

      {/* The planned London branch */}
      <motion.path
        d={future}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="1.5"
        strokeDasharray="3 6"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: d0 + 1.6 }}
      />

      {/* Signals travelling between campuses */}
      {!reduce &&
        links.map((l, i) => (
          <circle key={`pulse-${l.id}`} r="3.5" fill="var(--color-signal)" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="3.6s" begin={`${d0 + 2.2 + i * 1.2}s`} repeatCount="indefinite" />
            <animateMotion dur="3.6s" begin={`${d0 + 2.2 + i * 1.2}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1">
              <mpath href={`#${l.id}`} />
            </animateMotion>
          </circle>
        ))}

      {/* Campus nodes */}
      {campuses.map((c, i) => {
        const { x, y } = p[c.key];
        const lp = labelPos[c.key];
        return (
          <motion.g
            key={c.key}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: c.upcoming ? d0 + 1.7 : d0 + 0.3 + i * 0.18 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            {!c.upcoming && !reduce && (
              <circle cx={x} cy={y} r="8" fill="none" stroke="var(--color-signal)" strokeWidth="1">
                <animate attributeName="r" values="8;26" dur="3s" begin={`${i * 0.9}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="3s" begin={`${i * 0.9}s`} repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={x}
              cy={y}
              r={c.upcoming ? 5 : 7}
              fill={c.upcoming ? "var(--color-paper)" : "var(--color-ink)"}
              stroke={c.upcoming ? "var(--color-signal)" : "var(--color-paper)"}
              strokeWidth={c.upcoming ? 1.5 : 2.5}
            />
            <text
              x={x + lp.dx}
              y={y + lp.dy}
              textAnchor={lp.anchor}
              fontFamily="var(--font-display)"
              fontSize="24"
              className="fill-ink"
            >
              {labels[c.key]}
            </text>
            <text
              x={x + lp.dx}
              y={y + lp.dy + 18}
              textAnchor={lp.anchor}
              fontFamily="var(--font-sans)"
              fontSize="11.5"
              className={c.upcoming ? "fill-signal-deep" : "fill-slate"}
            >
              {c.upcoming ? labels.londonNote : coord(c)}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
