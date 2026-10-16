import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasLocale, href, type Locale } from "@/lib/i18n";
import { dbEnabled } from "@/lib/db";
import { canManageEvents, eventCampusesFor, getViewer } from "@/lib/viewer";
import { CAMPUS_LABEL } from "@/lib/sample-data";
import { DashboardShell, DbMissing, NoAccess, Skeleton } from "@/components/dashboard/kit";
import EventForm from "@/components/dashboard/EventForm";

async function NewEventContent({ lang }: { lang: Locale }) {
  const viewer = await getViewer();
  if (!viewer) return <NoAccess lang={lang} />;
  if (!dbEnabled()) return <DbMissing />;
  if (!canManageEvents(viewer)) {
    return <p className="text-slate">Only Branch Admins and Super Admins can create events.</p>;
  }
  const campuses = eventCampusesFor(viewer).map((c) => ({ key: c, label: CAMPUS_LABEL[c] }));
  return (
    <div className="max-w-4xl">
      <Link href={href(lang, "/dashboard/events")} className="link-underline text-sm text-slate hover:text-ink">
        <span aria-hidden="true">←</span> All events
      </Link>
      <h2 className="mt-4 text-[1.8rem] leading-tight text-royal">New event</h2>
      <div className="mt-6 rounded-[1.25rem] border border-line bg-paper p-6 md:p-8">
        <EventForm
          lang={lang}
          campuses={campuses}
          values={{ title: "", short: "", description: "", campus: campuses[0]?.key ?? "paris", date: "", time: "", location: "", organizer: "", speakers: "", places: "" }}
        />
      </div>
    </div>
  );
}

export default async function NewEventPage({ params }: PageProps<"/[lang]/dashboard/events/new">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <DashboardShell lang={lang} active="events">
      <Suspense fallback={<Skeleton />}>
        <NewEventContent lang={lang} />
      </Suspense>
    </DashboardShell>
  );
}
