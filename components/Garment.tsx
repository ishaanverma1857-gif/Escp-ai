function Mark({ x, y, s = 1, colour }: { x: number; y: number; s?: number; colour: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -9 L9 6 L-9 6 Z" fill="none" stroke={colour} strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="0" cy="-8.5" r="2.4" fill={colour} />
      <circle cx="-8.5" cy="6" r="2.4" fill={colour} />
      <circle cx="8.5" cy="6" r="2.4" fill="var(--color-signal)" />
    </g>
  );
}

/** Simple line illustrations of each product, filled with its real colour. */
export default function Garment({ kind, colour }: { kind: "hoodie" | "tshirt" | "cap"; colour: string }) {
  const dark = colour !== "#FFFFFF";
  const stroke = dark ? "rgba(255,255,255,0.18)" : "var(--color-ink)";
  const mark = dark ? "#f6f7f9" : "var(--color-ink)";


  if (kind === "cap") {
    return (
      <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden="true">
        <path d="M40 128 C40 70 80 44 122 44 C166 44 196 74 198 124 Z" fill={colour} stroke={stroke} strokeWidth="1.5" />
        <path d="M120 44 C112 70 110 100 112 126" fill="none" stroke={stroke} strokeWidth="1.2" />
        <path d="M30 128 L198 124 C214 124 226 134 218 144 C196 150 118 154 44 148 C30 146 24 136 30 128 Z" fill={colour} stroke={stroke} strokeWidth="1.5" />
        <circle cx="121" cy="44" r="4" fill={colour} stroke={stroke} strokeWidth="1.2" />
        <Mark x={80} y={96} s={1.15} colour={mark} />
      </svg>
    );
  }

  if (kind === "tshirt") {
    return (
      <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true">
        <path
          d="M86 30 C96 42 144 42 154 30 L198 50 L222 98 L188 112 L182 96 L182 214 L58 214 L58 96 L52 112 L18 98 L42 50 Z"
          fill={colour}
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M86 30 C96 50 144 50 154 30" fill="none" stroke={stroke} strokeWidth="1.5" />
        <Mark x={145} y={86} s={0.9} colour={mark} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true">
      <path
        d="M84 40 C88 18 152 18 156 40 L200 58 L228 198 L196 206 L186 120 L186 222 L54 222 L54 120 L44 206 L12 198 L40 58 Z"
        fill={colour}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M84 40 C90 70 150 70 156 40" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M112 64 L110 96 M128 64 L130 96" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M78 168 L162 168 L170 206 L70 206 Z" fill="none" stroke={stroke} strokeWidth="1.3" />
      <Mark x={120} y={128} s={1.2} colour={mark} />
    </svg>
  );
}
