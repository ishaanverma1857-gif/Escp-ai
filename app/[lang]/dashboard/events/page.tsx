import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, href, formatDate, type Locale } from "@/lib/i18n";
import { dbEnabled, sql } from "@/lib/db";
import { EVENT_COLUMNS, staticEventCampus, type DbEvent } from "@/lib/event-store";
import { sortedEvents } from "@/lib/events";
import { canManageEventOn, canManageEvents, getViewer } from "@/lib/viewer";
import { CAMPUS_LABEL, type Campus } from "@/lib/sample-data";
import { Badge, DashboardShell, DbMissing, NoAccess, Skeleton, ViewerBadge, btnPrimary } from "@/components/dashboard/kit";

async function EventsContent({ lang }: { lang: Locale }) {
  const viewer = await getViewer();
  if (!viewer) return <NoAccess lang={lang} />;
  if (!dbEnabled()) return <DbMissing />;

  const [created, counts] = await Promise.all([
    sql<DbEvent>(`select ${EVENT_COLUMNS} from events order by date`),
    sql<{ event_slug: string; total: number; attended: number }>(
      "select event_slug, count(*)::int as total, count(*) filter (where attended)::int as attended from registrations group by event_slug",
    ),
  ]);
  const count = (slug: string) => counts.find((c) => c.event_slug === slug);
  // Drafts are only visible to the people who can publish them.
  const visible = created.filter((e) => e.status === "published" || canManageEventOn(viewer, e.campus));
  const items = getDictionary(lang).events.items;
  const dateLabel = (iso: string) => formatDate(lang, iso, { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  const rows = [
    ...visible.map((e) => ({
      key: String(e.id),
      title: e.title,
      when: dateLabel(e.date),
      sort: e.date,
      campus: e.campus,
      status: e.status,
      source: "Dashboard",
      slug: e.slug,
    })),
    ...sortedEvents().map((e) => ({
      key: e.slug,
      title: items[e.slug].title,
      when: e.date ? dateLabel(e.date) : items[e.slug].when,
      sort: e.sortKey,
      campus: staticEventCampus(e.slug),
      status: "published" as const,
      source: "Website content",
      slug: e.slug,
    })),
  ].sort((a, b) => a.sort.localeCompare(b.sort));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ViewerBadge viewer={viewer} />
        {canManageEvents(viewer) && (
          <Link href={href(lang, "/dashboard/events/new")} className={btnPrimary}>
            <span aria-hidden="true">+</span> New event
          </Link>
        )}
      </div>

      <div className="mt-6 overflow-x-auto rounded-[1.25rem] border border-line bg-paper">
        <table className="w-full min-w-[720px] text-left text-[0.95rem]">
          <thead className="border-b border-line bg-fog/60 text-sm text-slate">
            <tr>
              <th className="px-5 py-3 font-bold">Event</th>
              <th className="px-5 py-3 font-bold">Date</th>
              <th className="px-5 py-3 font-bold">Campus</th>
              <th className="px-5 py-3 font-bold">Status</th>
              <th className="px-5 py-3 font-bold">Registrations</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => {
              const c = count(r.slug);
              return (
                <tr key={r.key}>
                  <td className="px-5 py-4">
                    <span className="font-bold">{r.title}</span>
                    <span className="block text-xs text-slate">{r.source}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">{r.when}</td>
                  <td className="px-5 py-4">{CAMPUS_LABEL[r.campus as Campus] ?? r.campus}</td>
                  <td className="px-5 py-4">
                    {r.status === "published" ? <Badge tone="good">Published</Badge> : <Badge tone="warn">Draft</Badge>}
                  </td>
                  <td className="px-5 py-4 tabular-nums">
                    {c ? `${c.total}${c.attended ? ` · ${c.attended} attended` : ""}` : "0"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href={href(lang, `/dashboard/events/${r.key}`)} className="link-underline font-bold text-royal">
                      {canManageEventOn(viewer, r.campus) ? "Manage" : "View"}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-slate">
        Published events appear on the public Events page straight away. Website-content events (like KPMG) are edited in the site&apos;s
        content files, but their registrations show up here too.
      </p>
    </>
  );
}

export default async function DashboardEventsPage({ params }: PageProps<"/[lang]/dashboard/events">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <DashboardShell lang={lang} active="events">
      <Suspense fallback={<Skeleton />}>
        <EventsContent lang={lang} />
      </Suspense>
    </DashboardShell>
  );
}
