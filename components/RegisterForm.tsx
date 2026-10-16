"use client";

import { useActionState } from "react";
import { registerForEvent, type RegisterState } from "@/lib/actions/register";
import type { Dictionary } from "@/content/en";

const field =
  "mt-2 block min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-base text-ink outline-none transition-colors focus:border-royal focus:ring-2 focus:ring-signal-soft";

export default function RegisterForm({
  slug,
  copy,
  campuses,
}: {
  slug: string;
  copy: Dictionary["events"]["form"];
  campuses: { key: string; label: string }[];
}) {
  const [state, action, pending] = useActionState<RegisterState, FormData>(registerForEvent, { status: "idle" });

  if (state.status === "success" || state.status === "already") {
    return (
      <p role="status" className="rounded-xl bg-signal-soft px-5 py-4 font-bold text-ink">
        <span aria-hidden="true">✓ </span>
        {state.status === "success" ? copy.success : copy.already}
      </p>
    );
  }

  return (
    <form action={action} className="grid gap-4">
      <h2 className="text-[1.4rem] leading-tight text-royal">{copy.title}</h2>
      <p className="-mt-2 text-sm text-slate">{copy.intro}</p>
      <input type="hidden" name="slug" value={slug} />
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="text-sm font-bold">
        {copy.name}
        <input name="name" required minLength={2} maxLength={120} autoComplete="name" className={field} />
      </label>
      <label className="text-sm font-bold">
        {copy.email}
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
      </label>
      <label className="text-sm font-bold">
        {copy.campus}
        <select name="campus" defaultValue="" className={field}>
          <option value="">{copy.campusNone}</option>
          {campuses.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      {(state.status === "invalid" || state.status === "error") && (
        <p role="alert" className="text-sm font-bold text-[#c2264b]">
          {state.status === "invalid" ? copy.invalid : copy.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-royal px-6 font-bold text-paper transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
