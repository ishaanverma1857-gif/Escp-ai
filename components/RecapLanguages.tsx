"use client";

import { useState, type ReactNode } from "react";

/** Language tabs for a recap: every version is rendered on the server, the tabs only switch which one shows. */
export default function RecapLanguages({
  label,
  initial,
  options,
  panels,
}: {
  label: string;
  initial: string;
  options: { code: string; name: string }[];
  panels: Record<string, ReactNode>;
}) {
  const [active, setActive] = useState(panels[initial] ? initial : options[0].code);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-bold uppercase tracking-[0.15em] text-slate">{label}</span>
        <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.code}
              type="button"
              role="tab"
              id={`recap-tab-${o.code}`}
              aria-selected={active === o.code}
              aria-controls={`recap-panel-${o.code}`}
              lang={o.code}
              onClick={() => setActive(o.code)}
              className="min-h-11 cursor-pointer rounded-full border border-ink/20 px-4 text-[0.95rem] font-bold text-ink transition-colors hover:border-ink aria-selected:border-royal aria-selected:bg-royal aria-selected:text-paper"
            >
              {o.name}
            </button>
          ))}
        </div>
      </div>
      {options.map((o) => (
        <div
          key={o.code}
          role="tabpanel"
          id={`recap-panel-${o.code}`}
          aria-labelledby={`recap-tab-${o.code}`}
          lang={o.code}
          hidden={active !== o.code}
        >
          {panels[o.code]}
        </div>
      ))}
    </div>
  );
}
