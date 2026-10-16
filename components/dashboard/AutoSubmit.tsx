"use client";

import type { SelectHTMLAttributes } from "react";

/** A select that saves as soon as it changes. */
export function AutoSubmitSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} onChange={(e) => e.currentTarget.form?.requestSubmit()} />;
}

/** A checkbox that saves as soon as it is ticked. */
export function AutoSubmitCheckbox({ name, checked, label }: { name: string; checked: boolean; label: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
      <input type="hidden" name={name} value={checked ? "false" : "true"} />
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="h-5 w-5 cursor-pointer accent-[#2241a8]"
      />
      {label}
    </label>
  );
}
