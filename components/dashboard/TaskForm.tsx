"use client";

import { useActionState } from "react";
import { createTask, type TaskFormState } from "@/lib/actions/tasks";
import { btnPrimary, input, label } from "./styles";

type Option = { key: string; label: string };

export default function TaskForm({
  campuses,
  divisions,
  people,
  defaults,
}: {
  campuses: Option[];
  divisions: Option[];
  people: string[];
  defaults: { campus: string; division: string; start: string; deadline: string };
}) {
  const [state, action, pending] = useActionState<TaskFormState, FormData>(createTask, { error: null });

  return (
    // A new key after each save clears the form for the next task.
    <form key={state.ok ?? 0} action={action} className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <label className={label}>
          Task title
          <input name="title" required minLength={3} maxLength={160} placeholder="What needs to happen" className={input} />
        </label>
        <label className={label}>
          Project
          <input name="project" maxLength={120} placeholder="Which initiative it belongs to" className={input} />
        </label>
      </div>
      <label className={label}>
        Description
        <input name="description" maxLength={2000} placeholder="Context and expected deliverable" className={input} />
      </label>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <label className={label}>
          Campus
          <select name="campus" defaultValue={defaults.campus} className={input}>
            {campuses.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Division
          <select name="division" defaultValue={defaults.division} className={input}>
            {divisions.map((d) => (
              <option key={d.key} value={d.key}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Assigned to
          <select name="assignee" defaultValue="" className={input}>
            <option value="">Unassigned</option>
            {people.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className={label}>
            Start
            <input name="start" type="date" required defaultValue={defaults.start} className={input} />
          </label>
          <label className={label}>
            Deadline
            <input name="deadline" type="date" required defaultValue={defaults.deadline} className={input} />
          </label>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-6">
        <fieldset>
          <legend className="text-sm font-bold">Importance</legend>
          <div className="mt-2 flex gap-4">
            {["high", "low"].map((v) => (
              <label key={v} className="inline-flex items-center gap-2 text-sm">
                <input type="radio" name="importance" value={v} defaultChecked={v === "high"} className="accent-[#2241a8]" />
                {v === "high" ? "High" : "Low"}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-bold">Urgency</legend>
          <div className="mt-2 flex gap-4">
            {["high", "low"].map((v) => (
              <label key={v} className="inline-flex items-center gap-2 text-sm">
                <input type="radio" name="urgency" value={v} defaultChecked={v === "low"} className="accent-[#2241a8]" />
                {v === "high" ? "High" : "Low"}
              </label>
            ))}
          </div>
        </fieldset>
        <button type="submit" disabled={pending} className={`${btnPrimary} ml-auto`}>
          {pending ? "Adding…" : "Add task"}
        </button>
      </div>
      {state.error && (
        <p role="alert" className="font-bold text-[#c2264b]">
          {state.error}
        </p>
      )}
      {state.ok && !state.error && (
        <p role="status" className="font-bold text-[#17663f]">
          ✓ Task added.
        </p>
      )}
    </form>
  );
}
