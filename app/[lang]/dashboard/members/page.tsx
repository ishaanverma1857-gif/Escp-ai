import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasLocale, href, formatDate, type Locale } from "@/lib/i18n";
import { dbEnabled, sql } from "@/lib/db";
import { canResetSampleData, getViewer, ROLE_LABEL, type Role } from "@/lib/viewer";
import { CAMPUSES, CAMPUS_LABEL, DIVISIONS, DIVISION_LABEL, MEMBER_STATUSES, type Campus, type Division } from "@/lib/sample-data";
import { resetDemoData } from "@/lib/actions/tasks";
import { Badge, DashboardShell, DbMissing, NoAccess, Skeleton, ViewerBadge, btnPrimary, btnSecondary, input, label } from "@/components/dashboard/kit";

type Member = {
  id: number;
  name: string;
  email: string;
  campus: Campus;
  division: Division;
  position: string;
  status: (typeof MEMBER_STATUSES)[number];
  joined: string;
  projects: string;
  permission: Role;
};

type Filters = { campus?: string; division?: string; status?: string; q?: string };

const STATUS_TONE = { active: "good", alumni: "neutral", pending: "warn" } as const;
const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

async function MembersContent({ lang, filters }: { lang: Locale; filters: Promise<Filters> }) {
  const viewer = await getViewer();
  if (!viewer) return <NoAccess lang={lang} />;
  if (!dbEnabled()) return <DbMissing />;
  const f = await filters;

  const where: string[] = [];
  const args: unknown[] = [];
  if (f.campus) where.push(`campus = $${args.push(f.campus)}`);
  if (f.division) where.push(`division = $${args.push(f.division)}`);
  if (f.status) where.push(`status = $${args.push(f.status)}`);
  if (f.q) where.push(`(name ilike $${args.push(`%${f.q}%`)} or projects ilike $${args.length})`);
  const members = await sql<Member>(
    `select id, name, email, campus, division, position, status, to_char(joined, 'YYYY-MM-DD') as joined, projects, permission from members ${
      where.length ? `where ${where.join(" and ")}` : ""
    } order by status = 'alumni', campus, name`,
    args,
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ViewerBadge viewer={viewer} />
        <Badge tone="info">Sample data</Badge>
      </div>

      <form method="get" className="mt-6 grid gap-4 rounded-[1.25rem] border border-line bg-fog/50 p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.4fr_auto]">
        <label className={label}>
          Campus
          <select name="campus" defaultValue={f.campus ?? ""} className={input}>
            <option value="">All campuses</option>
            {CAMPUSES.map((c) => (
              <option key={c} value={c}>
                {CAMPUS_LABEL[c]}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Division
          <select name="division" defaultValue={f.division ?? ""} className={input}>
            <option value="">All divisions</option>
            {DIVISIONS.map((d) => (
              <option key={d} value={d}>
                {DIVISION_LABEL[d]}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Status
          <select name="status" defaultValue={f.status ?? ""} className={input}>
            <option value="">Any status</option>
            {MEMBER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Search
          <input name="q" defaultValue={f.q ?? ""} placeholder="Name or project" className={input} />
        </label>
        <div className="flex items-end gap-2">
          <button type="submit" className={btnPrimary}>
            Filter
          </button>
          <Link href={href(lang, "/dashboard/members")} className={btnSecondary}>
            Clear
          </Link>
        </div>
      </form>

      <p className="mt-6 text-sm text-slate">
        {members.length} {members.length === 1 ? "member" : "members"}
      </p>
      <ul className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((m) => (
          <li key={m.id} className="rounded-[1.25rem] border border-line bg-paper">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-royal font-display text-sm font-extrabold text-paper"
                >
                  {initials(m.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-bold">{m.name}</span>
                    <Badge tone={STATUS_TONE[m.status]}>{m.status[0].toUpperCase() + m.status.slice(1)}</Badge>
                  </span>
                  <span className="mt-0.5 block text-sm text-slate">
                    {m.position} · {DIVISION_LABEL[m.division]}
                  </span>
                  <span className="block text-sm text-slate">{CAMPUS_LABEL[m.campus]}</span>
                </span>
                <span aria-hidden="true" className="mt-1 text-slate transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <dl className="grid grid-cols-[7.5rem_1fr] gap-x-3 gap-y-2 border-t border-line px-5 py-4 text-sm">
                <dt className="text-slate">Email</dt>
                <dd className="break-all">{m.email}</dd>
                <dt className="text-slate">Joined</dt>
                <dd>{formatDate(lang, m.joined, { month: "short", year: "numeric" })}</dd>
                <dt className="text-slate">Projects</dt>
                <dd>{m.projects || "—"}</dd>
                <dt className="text-slate">Permissions</dt>
                <dd>{ROLE_LABEL[m.permission] ?? m.permission}</dd>
              </dl>
            </details>
          </li>
        ))}
      </ul>
      {members.length === 0 && <p className="mt-4 rounded-xl border border-dashed border-line p-6 text-slate">No members match these filters.</p>}

      <p className="mt-8 text-sm text-slate">
        Someone can belong to Paris, work in Communication and have ordinary member permissions: campus, division and permissions are three
        separate things.
      </p>
      {canResetSampleData(viewer) && (
        <form action={resetDemoData} className="mt-6">
          <button type="submit" className={btnSecondary}>
            Reset sample members and tasks
          </button>
        </form>
      )}
    </>
  );
}

export default async function DashboardMembersPage({ params, searchParams }: PageProps<"/[lang]/dashboard/members">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const filters = searchParams.then((s) => {
    const one = (v: string | string[] | undefined) => (typeof v === "string" && v ? v.slice(0, 60) : undefined);
    return { campus: one(s.campus), division: one(s.division), status: one(s.status), q: one(s.q) };
  });
  return (
    <DashboardShell lang={lang} active="members">
      <Suspense fallback={<Skeleton />}>
        <MembersContent lang={lang} filters={filters} />
      </Suspense>
    </DashboardShell>
  );
}
