import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasLocale, href, type Locale } from "@/lib/i18n";
import { dbEnabled, sql } from "@/lib/db";
import { canCreateTasks, canEditTask, canResetSampleData, canUpdateTaskStatus, getViewer } from "@/lib/viewer";
import { CAMPUSES, CAMPUS_LABEL, DIVISIONS, DIVISION_LABEL, TASK_STATUSES, TASK_STATUS_LABEL } from "@/lib/sample-data";
import { resetDemoData } from "@/lib/actions/tasks";
import { Badge, DashboardShell, DbMissing, NoAccess, Skeleton, ViewerBadge, btnPrimary, btnSecondary, input, label } from "@/components/dashboard/kit";
import { TaskBoard, TaskGantt, TaskList, TaskMatrix, isOverdue, type Task } from "@/components/dashboard/TaskViews";
import TaskForm from "@/components/dashboard/TaskForm";

const VIEWS = [
  { key: "list", label: "List" },
  { key: "board", label: "Board" },
  { key: "matrix", label: "Matrix" },
  { key: "gantt", label: "Gantt" },
] as const;
type View = (typeof VIEWS)[number]["key"];

type Query = { view: View; campus?: string; division?: string; assignee?: string; status?: string };

const isoDay = (offset = 0) => {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + offset)).toISOString().slice(0, 10);
};

async function TasksContent({ lang, query }: { lang: Locale; query: Promise<Query> }) {
  const viewer = await getViewer();
  if (!viewer) return <NoAccess lang={lang} />;
  if (!dbEnabled()) return <DbMissing />;
  const q = await query;

  const where: string[] = [];
  const args: unknown[] = [];
  if (q.campus) where.push(`campus = $${args.push(q.campus)}`);
  if (q.division) where.push(`division = $${args.push(q.division)}`);
  if (q.assignee) where.push(`assignee = $${args.push(q.assignee)}`);
  if (q.status) where.push(`status = $${args.push(q.status)}`);

  const [rows, people] = await Promise.all([
    sql<Omit<Task, "canEdit" | "canMove">>(
      `select id, title, description, campus, division, project, assignee, to_char(start_date, 'YYYY-MM-DD') as start, to_char(deadline, 'YYYY-MM-DD') as deadline, importance, urgency, status
       from tasks ${where.length ? `where ${where.join(" and ")}` : ""} order by status = 'done', deadline, id`,
      args,
    ),
    sql<{ name: string }>("select name from members where status <> 'alumni' order by name"),
  ]);
  const names = people.map((p) => p.name);
  const tasks: Task[] = rows.map((t) => ({ ...t, canEdit: canEditTask(viewer, t), canMove: canUpdateTaskStatus(viewer, t) }));
  const today = isoDay();
  const open = tasks.filter((t) => t.status !== "done");
  const overdue = tasks.filter((t) => isOverdue(t, today)).length;

  const qs = (patch: Partial<Query>) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...q, ...patch })) if (v) p.set(k, v);
    return `?${p.toString()}`;
  };
  const base = href(lang, "/dashboard/tasks");

  // Who can create tasks where: Super Admins anywhere, Branch Admins on their campus, Division Leads in their division.
  const createCampuses = viewer.role === "branchadmin" && viewer.campus ? [viewer.campus] : CAMPUSES;
  const createDivisions = viewer.role === "divisionlead" && viewer.division ? [viewer.division] : DIVISIONS;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ViewerBadge viewer={viewer} />
        <div className="flex flex-wrap gap-2">
          <Badge tone="info">Sample data</Badge>
          <Badge>{open.length} open</Badge>
          {overdue > 0 && <Badge tone="bad">{overdue} overdue</Badge>}
        </div>
      </div>

      {canCreateTasks(viewer) && (
        <details className="mt-6 rounded-[1.25rem] border border-line bg-paper">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-bold text-royal [&::-webkit-details-marker]:hidden">
            <span>
              <span aria-hidden="true">+ </span>New task
            </span>
            <span className="text-sm font-normal text-slate">Assign it, set a deadline and its priority</span>
          </summary>
          <div className="border-t border-line p-5">
            <TaskForm
              campuses={createCampuses.map((c) => ({ key: c, label: CAMPUS_LABEL[c] }))}
              divisions={createDivisions.map((d) => ({ key: d, label: DIVISION_LABEL[d] }))}
              people={names}
              defaults={{ campus: viewer.campus ?? createCampuses[0], division: viewer.division ?? createDivisions[0], start: today, deadline: isoDay(7) }}
            />
          </div>
        </details>
      )}

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <nav aria-label="Task views" className="inline-flex rounded-full border border-line bg-fog/60 p-1">
          {VIEWS.map((v) => (
            <Link
              key={v.key}
              href={`${base}${qs({ view: v.key })}`}
              aria-current={q.view === v.key ? "page" : undefined}
              className="rounded-full px-4 py-2 text-sm font-bold text-slate transition-colors hover:text-ink aria-[current=page]:bg-paper aria-[current=page]:text-royal aria-[current=page]:shadow-[0_1px_3px_rgba(11,27,77,0.15)]"
            >
              {v.label}
            </Link>
          ))}
        </nav>
      </div>

      <form method="get" className="mt-4 grid gap-4 rounded-[1.25rem] border border-line bg-fog/50 p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <input type="hidden" name="view" value={q.view} />
        <label className={label}>
          Campus
          <select name="campus" defaultValue={q.campus ?? ""} className={input}>
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
          <select name="division" defaultValue={q.division ?? ""} className={input}>
            <option value="">All divisions</option>
            {DIVISIONS.map((d) => (
              <option key={d} value={d}>
                {DIVISION_LABEL[d]}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Assigned to
          <select name="assignee" defaultValue={q.assignee ?? ""} className={input}>
            <option value="">Anyone</option>
            {names.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Status
          <select name="status" defaultValue={q.status ?? ""} className={input}>
            <option value="">Any status</option>
            {TASK_STATUSES.map((s) => (
              <option key={s} value={s}>
                {TASK_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end gap-2">
          <button type="submit" className={btnPrimary}>
            Filter
          </button>
          <Link href={`${base}?view=${q.view}`} className={btnSecondary}>
            Clear
          </Link>
        </div>
      </form>

      <div className="mt-6">
        {tasks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line p-6 text-slate">No tasks match these filters.</p>
        ) : q.view === "board" ? (
          <TaskBoard tasks={tasks} today={today} />
        ) : q.view === "matrix" ? (
          <TaskMatrix tasks={tasks} today={today} />
        ) : q.view === "gantt" ? (
          <TaskGantt tasks={tasks} today={today} />
        ) : (
          <TaskList tasks={tasks} people={names} today={today} />
        )}
      </div>

      {canResetSampleData(viewer) && (
        <form action={resetDemoData} className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-6">
          <button type="submit" className={btnSecondary}>
            Reset sample members and tasks
          </button>
          <span className="text-sm text-slate">Puts the example data back, so every demo starts the same way. Events aren&apos;t affected.</span>
        </form>
      )}
    </>
  );
}

export default async function DashboardTasksPage({ params, searchParams }: PageProps<"/[lang]/dashboard/tasks">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const query = searchParams.then((s): Query => {
    const one = (v: string | string[] | undefined) => (typeof v === "string" && v ? v.slice(0, 80) : undefined);
    const view = VIEWS.find((v) => v.key === s.view)?.key ?? "list";
    return { view, campus: one(s.campus), division: one(s.division), assignee: one(s.assignee), status: one(s.status) };
  });
  return (
    <DashboardShell lang={lang} active="tasks">
      <Suspense fallback={<Skeleton />}>
        <TasksContent lang={lang} query={query} />
      </Suspense>
    </DashboardShell>
  );
}
