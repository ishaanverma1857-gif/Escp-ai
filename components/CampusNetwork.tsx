"use client";

import { motion, useReducedMotion } from "motion/react";
import { campuses, type Campus } from "@/content/site";
import { entryDelay } from "./motion";
import { BORDERS, CAMPUS_COUNTRIES, LAND, MAP } from "./europe-map";

/*
 * A map of western Europe that links the ESCP AI campuses with arcs.
 * Coastlines and borders come pre-projected from europe-map.ts; the campuses
 * use the same projection, so every city sits exactly where it is on the map.
 */

const { LON_MIN, LAT_MAX, SCALE, LON_SCALE, W, H } = MAP;

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

  const meridians = [-8, -4, 0, 4, 8, 12];
  const parallels = [38, 42, 46, 50, 54];

  const labelPos: Record<Campus["key"], { dx: number; dy: number; anchor: "start" | "end" }> = {
    paris: { dx: 16, dy: -8, anchor: "start" },
    turin: { dx: 16, dy: 26, anchor: "start" },
    madrid: { dx: -16, dy: 30, anchor: "end" },
    london: { dx: -14, dy: -14, anchor: "end" },
  };

  const coord = (c: Campus) =>
    `${Math.abs(c.lat).toFixed(2)}° ${c.lat >= 0 ? "N" : "S"}, ${Math.abs(c.lon).toFixed(2)}° ${c.lon >= 0 ? "E" : "W"}`;

  return (
    <div className="relative">
    {/* Static map on its own layer, so the moving signals above never force it to repaint. */}
    <svg
      viewBox={`-20 -10 ${W + 40} ${H + 20}`}
      className="absolute inset-0 h-auto w-full [transform:translateZ(0)]"
      aria-hidden="true"
    >
      <defs>
        {/* Soft edges so the map melts into the page instead of ending in a hard box. */}
        <radialGradient id="map-fade" cx="50%" cy="50%" r="58%">
          <stop offset="62%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <mask id="map-mask" maskUnits="userSpaceOnUse" x="-20" y="-10" width={W + 40} height={H + 20}>
          <rect x="-20" y="-10" width={W + 40} height={H + 20} fill="url(#map-fade)" />
        </mask>
      </defs>

      <motion.g
        mask="url(#map-mask)"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: d0 }}
        style={{ transformOrigin: `${W / 2}px ${H / 2}px` }}
      >
        <rect x="-20" y="-10" width={W + 40} height={H + 20} fill="#e3e9f8" />
        {/* Graticule over the sea */}
        <g stroke="var(--color-royal)" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 5">
          {meridians.map((lon) => {
            const x = (lon - LON_MIN) * LON_SCALE;
            return <line key={`m${lon}`} x1={x} y1={-10} x2={x} y2={H + 10} />;
          })}
          {parallels.map((lat) => {
            const y = (LAT_MAX - lat) * SCALE;
            return <line key={`p${lat}`} x1={-20} y1={y} x2={W + 20} y2={y} />;
          })}
        </g>
        {/* Land, the campus countries, and borders */}
        <path d={LAND} fill="#fbfcff" stroke="var(--color-royal)" strokeOpacity="0.45" strokeWidth="0.9" strokeLinejoin="round" />
        {Object.entries(CAMPUS_COUNTRIES).map(([k, d]) => (
          <path key={k} d={d} fill="var(--color-signal)" fillOpacity={k === "uk" ? 0.05 : 0.09} />
        ))}
        <path d={BORDERS} fill="none" stroke="var(--color-royal)" strokeOpacity="0.22" strokeWidth="0.7" strokeDasharray="3 2.5" />
      </motion.g>
    </svg>
    <svg
      viewBox={`-20 -10 ${W + 40} ${H + 20}`}
      className="relative h-auto w-full overflow-visible"
      role="img"
      aria-label={labels.mapLabel}
    >

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
              fontSize="21"
              fontWeight="800"
              className="fill-ink"
              stroke="var(--color-paper)"
              strokeWidth="5"
              strokeLinejoin="round"
              paintOrder="stroke"
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
              stroke="var(--color-paper)"
              strokeWidth="4"
              strokeLinejoin="round"
              paintOrder="stroke"
            >
              {c.upcoming ? labels.londonNote : coord(c)}
            </text>
          </motion.g>
        );
      })}
    </svg>
    </div>
  );
}
