import "server-only";
import { Pool, type QueryResultRow } from "pg";
import { sampleMembers, sampleTasks } from "./sample-data";

/**
 * Postgres (Neon, connected through the Vercel Marketplace as DATABASE_URL).
 * Tables are created on first use, so there is no manual migration step.
 */
export const dbEnabled = () => !!process.env.DATABASE_URL;

const globalForDb = globalThis as unknown as { escpPool?: Pool; escpReady?: Promise<void> };

function pool() {
  if (!globalForDb.escpPool) {
    globalForDb.escpPool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5, idleTimeoutMillis: 10_000 });
  }
  return globalForDb.escpPool;
}

const SCHEMA = `
create table if not exists events (
  id serial primary key,
  slug text unique not null,
  title text not null,
  short text not null default '',
  description text not null default '',
  campus text not null,
  date date not null,
  time text,
  location text,
  organizer text,
  speakers text,
  places integer,
  status text not null default 'draft',
  created_by text,
  created_at timestamptz not null default now()
);
create table if not exists registrations (
  id serial primary key,
  event_slug text not null,
  name text not null,
  email text not null,
  campus text,
  attended boolean not null default false,
  created_at timestamptz not null default now(),
  unique (event_slug, email)
);
create table if not exists members (
  id serial primary key,
  name text not null,
  email text not null,
  campus text not null,
  division text not null,
  position text not null,
  status text not null default 'active',
  joined date not null default current_date,
  projects text not null default '',
  permission text not null default 'member'
);
create table if not exists tasks (
  id serial primary key,
  title text not null,
  description text not null default '',
  campus text not null,
  division text not null,
  project text not null default '',
  assignee text not null default '',
  start_date date not null,
  deadline date not null,
  importance text not null default 'low',
  urgency text not null default 'low',
  status text not null default 'todo',
  created_at timestamptz not null default now()
);
`;

async function ready() {
  globalForDb.escpReady ??= (async () => {
    await pool().query(SCHEMA);
    const { rows } = await pool().query<{ members: number; tasks: number }>(
      "select (select count(*) from members)::int as members, (select count(*) from tasks)::int as tasks",
    );
    if (rows[0].members === 0) await seedMembers();
    if (rows[0].tasks === 0) await seedTasks();
  })().catch((err) => {
    globalForDb.escpReady = undefined;
    throw err;
  });
  return globalForDb.escpReady;
}

export async function sql<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  await ready();
  return (await pool().query<T>(text, params)).rows;
}

async function seedMembers() {
  for (const m of sampleMembers) {
    await pool().query(
      "insert into members (name, email, campus, division, position, status, joined, projects, permission) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [m.name, m.email, m.campus, m.division, m.position, m.status, m.joined, m.projects, m.permission],
    );
  }
}

async function seedTasks() {
  for (const t of sampleTasks()) {
    await pool().query(
      "insert into tasks (title, description, campus, division, project, assignee, start_date, deadline, importance, urgency, status) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [t.title, t.description, t.campus, t.division, t.project, t.assignee, t.start, t.deadline, t.importance, t.urgency, t.status],
    );
  }
}

/** Puts the example members and tasks back, so a demo always starts from the same state. */
export async function resetSampleData() {
  await ready();
  await pool().query("truncate members, tasks restart identity");
  await seedMembers();
  await seedTasks();
}
