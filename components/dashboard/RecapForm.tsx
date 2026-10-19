"use client";

import { useActionState, useState } from "react";
import { saveRecap, type RecapFormState } from "@/lib/actions/recaps";
import { btnPrimary, btnSecondary, input, label } from "./styles";

export type RecapValues = {
  heldIn: string;
  summary: string;
  takeaways: string;
  links: string;
  transcript: string;
  status: "draft" | "published" | null;
};

const LANGUAGES = [
  { code: "fr", label: "French" },
  { code: "en", label: "English" },
  { code: "it", label: "Italian" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
];

/** What to paste into ChatGPT, Claude or Gemini together with the recording or its transcript. */
const AI_PROMPT = `You are preparing the English recap of an ESCP AI student society event. I am giving you the recording (or its raw transcript). The event may be in French or another language.

Write everything in clear English and reply with exactly these four sections and headings:

SUMMARY
3 to 5 short paragraphs: what the event was about, who spoke, and the main ideas, in the order they came up. Separate paragraphs with a blank line.

KEY TAKEAWAYS
6 to 10 points, one per line, each a complete sentence a student could act on or remember.

LINKS
Every website, tool, company page, programme or resource that was mentioned, one per line, written as: Name | https://full-url
Only include a link if you are sure of the exact address. Skip anything you would have to guess.

TRANSCRIPT
The full transcript translated into English. Start each speaker's turn on a new paragraph with their name or role (e.g. "Speaker (KPMG):"). Keep the meaning faithful; do not summarise here.

Rules: do not invent facts, names, numbers or links. If something is unclear in the recording, write [inaudible].`;

export default function RecapForm({ slug, values }: { slug: string; values: RecapValues }) {
  const [state, action, pending] = useActionState<RecapFormState, FormData>(saveRecap, { error: null });
  const [copied, setCopied] = useState(false);
  const published = (state.saved ?? values.status) === "published";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(AI_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: the prompt is still visible to select by hand.
    }
  };

  return (
    <div className="grid gap-6">
      <details className="rounded-xl border border-line bg-fog/60">
        <summary className="cursor-pointer px-5 py-4 font-bold text-royal">How to make a recap with AI (step by step)</summary>
        <div className="grid gap-4 border-t border-line px-5 py-5 text-[0.95rem]">
          <ol className="grid list-decimal gap-2 pl-5 text-slate">
            <li>Record the event on your phone (audio is enough).</li>
            <li>Open ChatGPT, Claude or Gemini, upload the recording (or a transcript of it) and paste the prompt below.</li>
            <li>Copy each section of the answer into the matching box here: Summary, Key takeaways, Links, Transcript.</li>
            <li>Read it through once, fix any names, then press Publish. It appears on the event page straight away.</li>
          </ol>
          <div className="relative">
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-line bg-paper p-4 text-xs leading-relaxed text-ink">{AI_PROMPT}</pre>
            <button type="button" onClick={copy} className={`${btnSecondary} absolute right-3 top-3 min-h-9 px-4 text-sm`}>
              {copied ? "✓ Copied" : "Copy prompt"}
            </button>
          </div>
        </div>
      </details>

      <form action={action} className="grid gap-6">
        <input type="hidden" name="slug" value={slug} />
        <label className={`${label} max-w-xs`}>
          Language the event was held in
          <select name="heldIn" defaultValue={values.heldIn} className={input}>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Summary <span className="font-normal text-slate">(in English; blank line between paragraphs)</span>
          <textarea name="summary" rows={7} maxLength={20000} defaultValue={values.summary} className={`${input} py-3`} />
        </label>
        <label className={label}>
          Key takeaways <span className="font-normal text-slate">(one per line)</span>
          <textarea name="takeaways" rows={6} maxLength={10000} defaultValue={values.takeaways} className={`${input} py-3`} />
        </label>
        <label className={label}>
          Important links <span className="font-normal text-slate">(one per line: Name | https://…)</span>
          <textarea
            name="links"
            rows={4}
            maxLength={10000}
            defaultValue={values.links}
            placeholder={"Event slides | https://…"}
            className={`${input} py-3 font-mono text-sm`}
          />
        </label>
        <label className={label}>
          Full transcript <span className="font-normal text-slate">(in English; can be long)</span>
          <textarea name="transcript" rows={10} maxLength={400000} defaultValue={values.transcript} className={`${input} py-3`} />
        </label>

        {state.error && (
          <p role="alert" className="font-bold text-[#c2264b]">
            {state.error}
          </p>
        )}
        {state.saved && !state.error && (
          <p role="status" className="font-bold text-[#17663f]">
            ✓ {state.saved === "published" ? "Published. The recap appears on the event page within a few seconds." : "Saved as a draft. It isn't public yet."}
          </p>
        )}

        <div className="flex flex-wrap gap-3 border-t border-line pt-6">
          <button type="submit" name="intent" value="publish" disabled={pending} className={btnPrimary}>
            {published ? "Save and keep published" : "Publish recap"}
          </button>
          <button type="submit" name="intent" value="draft" disabled={pending} className={btnSecondary}>
            {published ? "Unpublish (save as draft)" : "Save draft"}
          </button>
        </div>
      </form>
    </div>
  );
}
