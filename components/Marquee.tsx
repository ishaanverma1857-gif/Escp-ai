/** Slowly scrolling row of partner names. Pauses on hover/focus and for reduced motion. */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((name) => (
        <li key={name} className="flex items-center whitespace-nowrap font-display text-[clamp(2rem,1.4rem+2.6vw,3.75rem)] leading-none text-ink">
          <span className="px-6 md:px-10">{name}</span>
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-signal" aria-hidden="true">
            <circle cx="5" cy="5" r="4" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" aria-label={label} role="region">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
