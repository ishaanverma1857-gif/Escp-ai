import { setTaskAssignee, setTaskStatus, deleteTask } from "@/lib/actions/tasks";
import { CAMPUS_LABEL, DIVISION_LABEL, TASK_STATUSES, TASK_STATUS_LABEL, type Campus, type Division, type TaskStatus } from "@/lib/sample-data";
import { AutoSubmitSelect } from "./AutoSubmit";
import { Badge } from "./kit";

export type Task = {
  id: number;
  title: string;
  description: string;
  campus: Campus;
  division: Division;
  project: string;
  assignee: string;
  start: string;
  deadline: string;
  importance: "high" | "low";
  urgency: "high" | "low";
  status: TaskStatus;
  canEdit: boolean;
  canMove: boolean;
};

export const STATUS_TONE = { todo: "neutral", in_progress: "info", blocked: "bad", done: "good" } as const;

const DAY = 86_400_000;
const utc = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const short = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(utc(iso));

export const isOverdue = (t: Task, today: string) => t.status !== "done" && t.deadline < today;

const selectCls =
  "min-h-9 rounded-lg border border-line bg-paper px-2 text-sm font-bold text-ink outline-none focus:border-royal focus:ring-2 focus:ring-signal-soft";

export function StatusControl({ task }: { task: Task }) {
  if (!task.canMove) return <Badge tone={STATUS_TONE[task.status]}>{TASK_STATUS_LABEL[task.status]}</Badge>;
  return (
    <form action={setTaskStatus}>
      <input type="hidden" name="id" value={task.id} />
      <AutoSubmitSelect name="status" defaultValue={task.status} aria-label={`Status of ${task.title}`} className={selectCls}>
        {TASK_STATUSES.map((s) => (
          <option key={s} value={s}>
            {TASK_STATUS_LABEL[s]}
          </option>
        ))}
      </AutoSubmitSelect>
    </form>
  );
}

function AssigneeControl({ task, people }: { task: Task; people: string[] }) {
  if (!task.canEdit) return <span>{task.assignee || "Unassigned"}</span>;
  const options = task.assignee && !people.includes(task.assignee) ? [task.assignee, ...people] : people;
  return (
    <form action={setTaskAssignee}>
      <input type="hidden" name="id" value={task.id} />
      <AutoSubmitSelect name="assignee" defaultValue={task.assignee} aria-label={`Assignee of ${task.title}`} className={`${selectCls} font-normal`}>
        <option value="">Unassigned</option>
        {options.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </AutoSubmitSelect>
    </form>
  );
}

function DeleteControl({ task }: { task: Task }) {
  if (!task.canEdit) return null;
  return (
    <form action={deleteTask}>
      <input type="hidden" name="id" value={task.id} />
      <button type="submit" aria-label={`Delete ${task.title}`} className="cursor-pointer rounded-lg px-2 py-1 text-sm text-slate hover:bg-[#fde4ea] hover:text-[#a01d3e]">
        Delete
      </button>
    </form>
  );
}

function Priority({ task }: { task: Task }) {
  return (
    <span className="flex flex-wrap gap-1">
      {task.importance === "high" && <Badge tone="info">Important</Badge>}
      {task.urgency === "high" && <Badge tone="warn">Urgent</Badge>}
    </span>
  );
}

/* ---------- List ---------- */

export function TaskList({ tasks, people, today }: { tasks: Task[]; people: string[]; today: string }) {
  return (
    <div className="overflow-x-auto rounded-[1.25rem] border border-line bg-paper">
      <table className="w-full min-w-[960px] text-left text-[0.95rem]">
        <thead className="border-b border-line bg-fog/60 text-sm text-slate">
          <tr>
            <th className="px-4 py-3 font-bold">Task</th>
            <th className="px-4 py-3 font-bold">Campus · Division</th>
            <th className="px-4 py-3 font-bold">Assigned to</th>
            <th className="px-4 py-3 font-bold">Deadline</th>
            <th className="px-4 py-3 font-bold">Priority</th>
            <th className="px-4 py-3 font-bold">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {tasks.map((t) => (
            <tr key={t.id} className={t.status === "done" ? "text-slate" : ""}>
              <td className="max-w-[22rem] px-4 py-3">
                <span className={`font-bold ${t.status === "done" ? "line-through decoration-slate/50" : ""}`}>{t.title}</span>
                {t.project && <span className="block text-xs text-slate">{t.project}</span>}
              </td>
              <td className="px-4 py-3 text-sm">
                {CAMPUS_LABEL[t.campus]}
                <span className="block text-slate">{DIVISION_LABEL[t.division]}</span>
              </td>
              <td className="px-4 py-3 text-sm">
                <AssigneeControl task={t} people={people} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">
                {short(t.deadline)}
                {isOverdue(t, today) && <span className="block font-bold text-[#a01d3e]">Overdue</span>}
              </td>
              <td className="px-4 py-3">
                <Priority task={t} />
              </td>
              <td className="px-4 py-3">
                <StatusControl task={t} />
              </td>
              <td className="px-4 py-3 text-right">
                <DeleteControl task={t} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Board ---------- */

function TaskCard({ task, today }: { task: Task; today: string }) {
  return (
    <li className="rounded-xl border border-line bg-paper p-4 shadow-[0_1px_0_var(--color-line)]">
      <p className={`font-bold leading-snug ${task.status === "done" ? "text-slate line-through decoration-slate/50" : ""}`}>{task.title}</p>
      <p className="mt-1 text-xs text-slate">
        {task.assignee || "Unassigned"} · {CAMPUS_LABEL[task.campus]}
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span className={`text-xs font-bold ${isOverdue(task, today) ? "text-[#a01d3e]" : "text-slate"}`}>
          {isOverdue(task, today) ? "Overdue · " : "Due "}
          {short(task.deadline)}
        </span>
        <Priority task={task} />
      </div>
      <div className="mt-3">
        <StatusControl task={task} />
      </div>
    </li>
  );
}

export function TaskBoard({ tasks, today }: { tasks: Task[]; today: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {TASK_STATUSES.map((s) => {
        const col = tasks.filter((t) => t.status === s);
        return (
          <section key={s} className="rounded-[1.25rem] bg-fog/70 p-3">
            <h3 className="flex items-center justify-between px-1 pb-3 text-base font-bold">
              {TASK_STATUS_LABEL[s]} <span className="text-sm text-slate tabular-nums">{col.length}</span>
            </h3>
            <ul className="grid gap-3">
              {col.map((t) => (
                <TaskCard key={t.id} task={t} today={today} />
              ))}
            </ul>
            {col.length === 0 && <p className="px-1 pb-2 text-sm text-slate">Nothing here.</p>}
          </section>
        );
      })}
    </div>
  );
}

/* ---------- Eisenhower matrix ---------- */

const QUADRANTS = [
  { importance: "high", urgency: "high", title: "Do first", hint: "Important and urgent", tone: "border-[#c2264b]/40 bg-[#fde4ea]/40" },
  { importance: "high", urgency: "low", title: "Schedule", hint: "Important, not urgent", tone: "border-royal/30 bg-signal-soft/50" },
  { importance: "low", urgency: "high", title: "Delegate", hint: "Urgent, less important", tone: "border-[#8a5a00]/30 bg-[#fff1d6]/60" },
  { importance: "low", urgency: "low", title: "Later", hint: "Neither urgent nor important", tone: "border-line bg-fog/60" },
] as const;

export function TaskMatrix({ tasks, today }: { tasks: Task[]; today: string }) {
  const open = tasks.filter((t) => t.status !== "done");
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {QUADRANTS.map((q) => {
          const cell = open.filter((t) => t.importance === q.importance && t.urgency === q.urgency);
          return (
            <section key={q.title} className={`rounded-[1.25rem] border p-4 ${q.tone}`}>
              <h3 className="flex items-baseline justify-between gap-3 px-1">
                <span className="font-display text-lg font-extrabold uppercase text-ink">{q.title}</span>
                <span className="text-sm text-slate">
                  {q.hint} · <span className="tabular-nums">{cell.length}</span>
                </span>
              </h3>
              <ul className="mt-3 grid gap-3 lg:grid-cols-2">
                {cell.map((t) => (
                  <TaskCard key={t.id} task={t} today={today} />
                ))}
              </ul>
              {cell.length === 0 && <p className="mt-2 px-1 text-sm text-slate">No open tasks.</p>}
            </section>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-slate">
        Done tasks are hidden from the matrix ({tasks.length - open.length} done).
      </p>
    </>
  );
}

/* ---------- Gantt ---------- */

const BAR = {
  todo: "bg-royal/45",
  in_progress: "bg-signal",
  blocked: "bg-[#c2264b]",
  done: "bg-[#2f9e68]",
} as const;

export function TaskGantt({ tasks, today }: { tasks: Task[]; today: string }) {
  if (tasks.length === 0) return null;
  const sorted = [...tasks].sort((a, b) => a.start.localeCompare(b.start) || a.deadline.localeCompare(b.deadline));
  const first = Math.min(...sorted.map((t) => utc(t.start)), utc(today)) - 2 * DAY;
  const last = Math.max(...sorted.map((t) => utc(t.deadline)), utc(today)) + 3 * DAY;
  const span = last - first;
  const pct = (ms: number) => ((ms - first) / span) * 100;

  // A tick on every Monday (or every other one for long ranges).
  const ticks: number[] = [];
  const step = span / DAY > 70 ? 14 : 7;
  const firstMonday = first + (((8 - new Date(first).getUTCDay()) % 7) * DAY);
  for (let t = firstMonday; t <= last; t += step * DAY) ticks.push(t);
  const todayPct = pct(utc(today));
  const fmt = (ms: number) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(ms);

  return (
    <div className="overflow-x-auto rounded-[1.25rem] border border-line bg-paper">
      <div className="min-w-[860px]">
        <div className="grid grid-cols-[16rem_1fr] border-b border-line bg-fog/60 text-xs text-slate">
          <div className="px-4 py-3 text-sm font-bold">Task</div>
          <div className="relative h-11">
            {ticks.map((t) => (
              <span key={t} className="absolute top-3 -translate-x-1/2 whitespace-nowrap tabular-nums" style={{ left: `${pct(t)}%` }}>
                {fmt(t)}
              </span>
            ))}
          </div>
        </div>
        <ul>
          {sorted.map((t) => {
            const left = pct(utc(t.start));
            const width = Math.max(pct(utc(t.deadline) + DAY) - left, 1.2);
            return (
              <li key={t.id} className="grid grid-cols-[16rem_1fr] border-b border-line last:border-b-0">
                <div className="px-4 py-2.5">
                  <p className={`truncate text-sm font-bold ${t.status === "done" ? "text-slate line-through" : ""}`} title={t.title}>
                    {t.title}
                  </p>
                  <p className="truncate text-xs text-slate">{t.assignee || "Unassigned"}</p>
                </div>
                <div className="relative">
                  {ticks.map((x) => (
                    <span key={x} aria-hidden="true" className="absolute inset-y-0 w-px bg-line/70" style={{ left: `${pct(x)}%` }} />
                  ))}
                  <span aria-hidden="true" className="absolute inset-y-0 z-10 w-0.5 bg-[#c2264b]/70" style={{ left: `${todayPct}%` }} />
                  <span
                    className={`absolute top-1/2 h-6 -translate-y-1/2 rounded-full ${BAR[t.status]} ${
                      isOverdue(t, today) ? "ring-2 ring-[#c2264b] ring-offset-1" : ""
                    }`}
                    style={{ left: `${left}%`, width: `${width}%` }}
                    title={`${t.title}: ${short(t.start)} → ${short(t.deadline)} (${TASK_STATUS_LABEL[t.status]})`}
                  >
                    <span className="sr-only">
                      {short(t.start)} to {short(t.deadline)}, {TASK_STATUS_LABEL[t.status]}
                    </span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-4 py-3 text-xs text-slate">
        {TASK_STATUSES.map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className={`h-2.5 w-5 rounded-full ${BAR[s]}`} />
            {TASK_STATUS_LABEL[s]}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="h-3 w-0.5 bg-[#c2264b]" /> Today ({fmt(utc(today))})
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-5 rounded-full ring-2 ring-[#c2264b]" /> Overdue
        </span>
      </div>
    </div>
  );
}
