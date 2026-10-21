import { Fragment, type ReactNode } from "react";

/**
 * A small Markdown renderer for recap documents: ## / ### headings, paragraphs, "- " lists, ---,
 * **bold**, *italic* and [links](https://…). The top "# Title" is dropped (the page has its own).
 */
export function Markdown({ source, className = "" }: { source: string; className?: string }) {
  const blocks = source.replace(/\r\n/g, "\n").trim().split(/\n\s*\n/);
  const out: ReactNode[] = [];

  blocks.forEach((raw, i) => {
    const block = raw.trim();
    if (!block || /^#\s/.test(block)) return;
    if (/^-{3,}$/.test(block)) {
      out.push(<hr key={i} className="my-2 border-line" />);
      return;
    }
    const h = block.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      out.push(
        h[1] === "##" ? (
          <h3 key={i} className="mt-6 text-[1.4rem] leading-tight text-royal first:mt-0">
            {inline(h[2])}
          </h3>
        ) : (
          <h4 key={i} className="mt-4 text-[1.15rem] leading-tight text-royal">
            {inline(h[2])}
          </h4>
        ),
      );
      return;
    }
    const lines = block.split("\n");
    if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
      out.push(
        <ul key={i} className="grid list-disc gap-2 pl-6 marker:text-signal">
          {lines.map((l, j) => (
            <li key={j}>{inline(l.replace(/^\s*[-*]\s+/, ""))}</li>
          ))}
        </ul>,
      );
      return;
    }
    out.push(<p key={i}>{inline(lines.join(" "))}</p>);
  });

  return <div className={`grid gap-4 ${className}`}>{out}</div>;
}

/** **bold**, *italic* and [text](https://url) inside a line. */
function inline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) parts.push(<strong key={k++} className="font-bold text-ink">{m[1]}</strong>);
    else if (m[2] !== undefined) parts.push(<em key={k++}>{m[2]}</em>);
    else
      parts.push(
        <a key={k++} href={m[4]} target="_blank" rel="noopener noreferrer" className="font-bold text-royal underline underline-offset-4">
          {m[3]}
        </a>,
      );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
}
