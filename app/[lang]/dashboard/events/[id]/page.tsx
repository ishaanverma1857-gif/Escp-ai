import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href, formatDate, type Locale } from "@/lib/i18n";
import { dbEnabled, sql } from "@/lib/db";
import { EVENT_COLUMNS, staticEventCampus, type DbEvent } from "@/lib/event-store";
import { findEvent, sortedEvents } from "@/lib/events";
import { canManageEventOn, eventCampusesFor, getViewer } from "@/lib/viewer";
import { CAMPUS_LABEL, type Campus } from "@/lib/sample-data";
import { deleteEvent, setAttendance, setEventStatus } from "@/lib/actions/events";
import { Badge, DashboardShell, DbMissing, NoAccess, Skeleton, btnDanger, btnSecondary } from "@/components/dashboard/kit";
import { AutoSubmitCheckbox } from "@/components/dashboard/AutoSubmit";
import EventForm from "@/components/dashboard/EventForm";

type Registration = { id: number; name: string; email: string; campus: string | null; attended: boolean; created: string };

async function Registrations({ slug, canManage }: { slug: string; canManage: boolean }) {
  if (!canManage) {
    return <p className="text-slate">Registrations are visible to this campus&apos;s admins only.</p>;
  }
  const regs = await sql<Registration>(
    "select id, name, email, campus, attended, to_char(created_at at time zone 'Europe/Paris', 'DD Mon HH24:MI') as created from registrations where event_slug = $1 order by created_at desc",
    [slug],
  );
  const attended = regs.filter((r) => r.attended).length;
  return (
    <>
      <p className="text-slate">
        <strong className="text-ink tabular-nums">{regs.length}</strong> registered
        {regs.length > 0 && (
          <>
            {" "}
            · <strong className="text-ink tabular-nums">{attended}</strong> attended
          </>
        )}
      </p>
      {regs.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-line p-6 text-slate">
          No registrations yet. They appear here as soon as someone registers on the public event page.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-[1.25rem] border border-line">
          <table className="w-full min-w-[640px] text-left text-[0.95rem]">
            <thead className="border-b border-line bg-fog/60 text-sm text-slate">
              <tr>
                <th className="px-4 py-3 font-bold">Name</th>
                <th className="px-4 py-3 font-bold">Email</th>
                <th className="px-4 py-3 font-bold">Campus</th>
                <th className="px-4 py-3 font-bold">Registered</th>
                <th className="px-4 py-3 font-bold">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {regs.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-bold">{r.name}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.campus ? CAMPUS_LABEL[r.campus as Campus] : "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate">{r.created}</td>
                  <td className="px-4 py-3">
                    <form action={setAttendance}>
                      <input type="hidden" name="registration" value={r.id} />
                      <AutoSubmitCheckbox name="attended" checked={r.attended} label={r.attended ? "Attended" : "Mark attended"} />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

async function EventManage({ lang, params, saved }: { lang: Locale; params: Promise<{ id: string }>; saved: Promise<string | null> }) {
  const viewer = await getViewer();
  if (!viewer) return <NoAccess lang={lang} />;
  if (!dbEnabled()) return <DbMissing />;
  const { id } = await params;
  const back = (
    <Link href={href(lang, "/dashboard/events")} className="link-underline text-sm text-slate hover:text-ink">
      <span aria-hidden="true">←</span> All events
    </Link>
  );

  // Events written in the site's content: read-only here, but registrations are managed.
  const fixed = findEvent(id);
  if (fixed) {
    const c = getDictionary(lang).events.items[fixed.slug];
    const campus = staticEventCampus(fixed.slug);
    return (
      <div className="max-w-5xl">
        {back}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h2 className="text-[1.8rem] leading-tight text-royal">{c.title}</h2>
          <Badge tone="good">Published</Badge>
        </div>
        <p className="mt-2 text-slate">
          {c.when} · {CAMPUS_LABEL[campus]} · Website content (edited in the site&apos;s content files)
        </p>
        <Link href={href(lang, `/events/${fixed.slug}`)} className="link-underline mt-3 inline-block font-bold text-royal">
          View on the website ↗
        </Link>
        <h3 className="mt-10 text-[1.4rem] text-royal">Registrations</h3>
        <div className="mt-4">
          <Registrations slug={fixed.slug} canManage={canManageEventOn(viewer, campus)} />
        </div>
      </div>
    );
  }

  const numeric = Number(id);
  const rows = Number.isInteger(numeric) && numeric > 0 ? await sql<DbEvent>(`select ${EVENT_COLUMNS} from events where id = $1`, [numeric]) : [];
  const e = rows[0];
  if (!e || (e.status === "draft" && !canManageEventOn(viewer, e.campus))) {
    return (
      <div>
        {back}
        <p className="mt-6 text-slate">This event doesn&apos;t exist or has been deleted.</p>
      </div>
    );
  }
  const canManage = canManageEventOn(viewer, e.campus);
  const justSaved = await saved;
  const campuses = eventCampusesFor(viewer).map((c) => ({ key: c, label: CAMPUS_LABEL[c] }));

  return (
    <div className="max-w-5xl">
      {back}
      {justSaved && (
        <p role="status" className="mt-4 rounded-xl bg-[#dff3e8] px-5 py-3 font-bold text-[#17663f]">
          ✓ {justSaved === "published" ? "Published. It's now live on the public Events page." : "Saved as a draft. It's hidden from the website."}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h2 className="text-[1.8rem] leading-tight text-royal">{e.title}</h2>
        {e.status === "published" ? <Badge tone="good">Published</Badge> : <Badge tone="warn">Draft</Badge>}
      </div>
      <p className="mt-2 text-slate">
        {formatDate(lang, e.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        {e.time && ` · ${e.time}`} · {CAMPUS_LABEL[e.campus as Campus] ?? e.campus}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {e.status === "published" && (
          <Link href={href(lang, `/events/${e.slug}`)} className={btnSecondary}>
            View on the website ↗
          </Link>
        )}
        {canManage && (
          <form action={setEventStatus}>
            <input type="hidden" name="id" value={e.id} />
            <input type="hidden" name="status" value={e.status === "published" ? "draft" : "published"} />
            <button type="submit" className={btnSecondary}>
              {e.status === "published" ? "Unpublish" : "Publish now"}
            </button>
          </form>
        )}
      </div>

      <h3 className="mt-12 text-[1.4rem] text-royal">Registrations</h3>
      <div className="mt-4">
        <Registrations slug={e.slug} canManage={canManage} />
      </div>

      {canManage && (
        <>
          <h3 className="mt-14 text-[1.4rem] text-royal">Edit event</h3>
          <div className="mt-4 rounded-[1.25rem] border border-line bg-paper p-6 md:p-8">
            <EventForm
              lang={lang}
              campuses={campuses}
              values={{
                id: e.id,
                title: e.title,
                short: e.short,
                description: e.description,
                campus: e.campus,
                date: e.date,
                time: e.time ?? "",
                location: e.location ?? "",
                organizer: e.organizer ?? "",
                speakers: e.speakers ?? "",
                places: e.places?.toString() ?? "",
                status: e.status,
              }}
            />
          </div>
          <details className="mt-8">
            <summary className="cursor-pointer font-bold text-[#c2264b]">Delete this event…</summary>
            <form action={deleteEvent} className="mt-4 flex flex-wrap items-center gap-4">
              <input type="hidden" name="id" value={e.id} />
              <input type="hidden" name="lang" value={lang} />
              <p className="text-slate">This also deletes its registrations. It can&apos;t be undone.</p>
              <button type="submit" className={btnDanger}>
                Yes, delete it
              </button>
            </form>
          </details>
        </>
      )}
    </div>
  );
}

/** Website-content events are prerendered; dashboard events (numeric ids) render on request. */
export function generateStaticParams() {
  return sortedEvents().map((e) => ({ id: e.slug }));
}

export default async function ManageEventPage({ params, searchParams }: PageProps<"/[lang]/dashboard/events/[id]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const saved = searchParams.then((s) => (typeof s.saved === "string" ? s.saved : null));
  return (
    <DashboardShell lang={lang} active="events">
      <Suspense fallback={<Skeleton />}>
        <EventManage lang={lang} params={params} saved={saved} />
      </Suspense>
    </DashboardShell>
  );
}
