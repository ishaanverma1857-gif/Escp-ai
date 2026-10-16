"use client";

import { useActionState } from "react";
import { saveEvent, type EventFormState } from "@/lib/actions/events";
import { btnPrimary, btnSecondary, input, label } from "./styles";

export type EventFormValues = {
  id?: number;
  title: string;
  short: string;
  description: string;
  campus: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  speakers: string;
  places: string;
  status?: "draft" | "published";
};

export default function EventForm({
  lang,
  campuses,
  values,
}: {
  lang: string;
  campuses: { key: string; label: string }[];
  values: EventFormValues;
}) {
  const [state, action, pending] = useActionState<EventFormState, FormData>(saveEvent, { error: null });
  const published = values.status === "published";

  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="lang" value={lang} />
      {values.id && <input type="hidden" name="id" value={values.id} />}

      <label className={label}>
        Title
        <input name="title" required minLength={3} maxLength={140} defaultValue={values.title} placeholder="AI Workshop: prompting for consultants" className={input} />
      </label>
      <label className={label}>
        One-line summary <span className="font-normal text-slate">(shown in the events list)</span>
        <input name="short" maxLength={200} defaultValue={values.short} className={input} />
      </label>
      <label className={label}>
        Description
        <textarea name="description" rows={5} maxLength={4000} defaultValue={values.description} className={`${input} py-3`} />
      </label>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <label className={label}>
          Campus
          <select name="campus" defaultValue={values.campus} className={input}>
            {campuses.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Date
          <input name="date" type="date" required defaultValue={values.date} className={input} />
        </label>
        <label className={label}>
          Time
          <input name="time" type="time" defaultValue={values.time} className={input} />
        </label>
        <label className={label}>
          Location
          <input name="location" maxLength={300} defaultValue={values.location} placeholder="Champerret campus, room 204" className={input} />
        </label>
        <label className={label}>
          Organiser
          <input name="organizer" maxLength={300} defaultValue={values.organizer} placeholder="ESCP AI Events" className={input} />
        </label>
        <label className={label}>
          Speakers
          <input name="speakers" maxLength={300} defaultValue={values.speakers} className={input} />
        </label>
        <label className={label}>
          Places
          <input name="places" type="number" min={0} max={100000} defaultValue={values.places} className={input} />
        </label>
      </div>

      {state.error && (
        <p role="alert" className="font-bold text-[#c2264b]">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap gap-3 border-t border-line pt-6">
        <button type="submit" name="intent" value="publish" disabled={pending} className={btnPrimary}>
          {published ? "Save and keep published" : "Publish"}
        </button>
        <button type="submit" name="intent" value="draft" disabled={pending} className={btnSecondary}>
          {published ? "Save as draft (hide from site)" : "Save draft"}
        </button>
      </div>
    </form>
  );
}
