"use server";

import { refresh } from "next/cache";
import { resetSampleData, sql } from "@/lib/db";
import { canCreateTasks, canEditTask, canResetSampleData, canUpdateTaskStatus, getViewer } from "@/lib/viewer";
import { CAMPUSES, DIVISIONS, TASK_STATUSES } from "@/lib/sample-data";

export type TaskFormState = { error: string | null; ok?: number };

const text = (f: FormData, k: string, max = 300) => String(f.get(k) ?? "").trim().slice(0, max);
const oneOf = <T extends string>(list: readonly T[], v: string, fallback: T) => ((list as readonly string[]).includes(v) ? (v as T) : fallback);
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

async function taskScope(id: number) {
  const rows = await sql<{ campus: string; division: string }>("select campus, division from tasks where id = $1", [id]);
  return rows[0] ?? null;
}

export async function createTask(_prev: TaskFormState, f: FormData): Promise<TaskFormState> {
  const viewer = await getViewer();
  if (!viewer || !canCreateTasks(viewer)) return { error: "You can't create tasks." };

  const scope = {
    campus: oneOf(CAMPUSES, text(f, "campus", 20), "paris"),
    division: oneOf(DIVISIONS, text(f, "division", 30), "events"),
  };
  if (!canEditTask(viewer, scope)) return { error: "You can only create tasks for your own campus or division." };

  const title = text(f, "title", 160);
  const start = text(f, "start", 10);
  const deadline = text(f, "deadline", 10);
  if (title.length < 3) return { error: "Give the task a title." };
  if (!isDate(start) || !isDate(deadline)) return { error: "Choose a start date and a deadline." };
  if (deadline < start) return { error: "The deadline can't be before the start date." };

  await sql(
    "insert into tasks (title, description, campus, division, project, assignee, start_date, deadline, importance, urgency, status) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'todo')",
    [
      title,
      text(f, "description", 2000),
      scope.campus,
      scope.division,
      text(f, "project", 120),
      text(f, "assignee", 120),
      start,
      deadline,
      f.get("importance") === "high" ? "high" : "low",
      f.get("urgency") === "high" ? "high" : "low",
    ],
  );
  refresh();
  return { error: null, ok: Date.now() };
}

export async function setTaskStatus(f: FormData) {
  const viewer = await getViewer();
  const id = Number(f.get("id"));
  const scope = id ? await taskScope(id) : null;
  if (!viewer || !scope || !canUpdateTaskStatus(viewer, scope)) return;
  await sql("update tasks set status = $1 where id = $2", [oneOf(TASK_STATUSES, text(f, "status", 20), "todo"), id]);
  refresh();
}

export async function setTaskAssignee(f: FormData) {
  const viewer = await getViewer();
  const id = Number(f.get("id"));
  const scope = id ? await taskScope(id) : null;
  if (!viewer || !scope || !canEditTask(viewer, scope)) return;
  await sql("update tasks set assignee = $1 where id = $2", [text(f, "assignee", 120), id]);
  refresh();
}

export async function deleteTask(f: FormData) {
  const viewer = await getViewer();
  const id = Number(f.get("id"));
  const scope = id ? await taskScope(id) : null;
  if (!viewer || !scope || !canEditTask(viewer, scope)) return;
  await sql("delete from tasks where id = $1", [id]);
  refresh();
}

export async function resetDemoData() {
  const viewer = await getViewer();
  if (!viewer || !canResetSampleData(viewer)) return;
  await resetSampleData();
  refresh();
}
