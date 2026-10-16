/* Shared styles for the prototype dashboard (English only for now). */
export const input =
  "mt-1.5 block min-h-11 w-full rounded-xl border border-line bg-paper px-3.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-royal focus:ring-2 focus:ring-signal-soft";
export const label = "block text-sm font-bold text-ink";
export const btn =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-bold transition-colors disabled:cursor-wait disabled:opacity-60";
export const btnPrimary = `${btn} bg-royal text-paper hover:bg-ink`;
export const btnSecondary = `${btn} border border-ink/20 bg-paper text-ink hover:border-ink`;
export const btnDanger = `${btn} border border-[#c2264b]/30 bg-paper text-[#c2264b] hover:border-[#c2264b]`;
