import { notFound, redirect } from "next/navigation";
import { hasLocale, href } from "@/lib/i18n";

export default async function DashboardPage({ params }: PageProps<"/[lang]/dashboard">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  redirect(href(lang, "/dashboard/events"));
}
