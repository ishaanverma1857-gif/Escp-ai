import Link from "next/link";
import { DottedArc, FlowLines } from "./fx";
import { FadeIn, MaskedLines } from "./motion";

/** Branded frame around Clerk's sign-in and sign-up forms. */
export default function AuthShell({
  kicker,
  title,
  note,
  back,
  children,
}: {
  kicker: string;
  title: string;
  note: string;
  back: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
      <FlowLines tone="light" preset="soft" className="opacity-80" />
      <DottedArc className="absolute right-[7%] top-28 hidden w-36 text-royal/50 md:block" rotate={-80} sweep={75} />
      <div className="container-site relative grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:pt-10">
          <FadeIn>
            <Link href={back.href} className="link-underline text-sm font-bold text-slate hover:text-ink">
              <span aria-hidden="true">←</span> {back.label}
            </Link>
            <p className="kicker mb-5 mt-8">{kicker}</p>
          </FadeIn>
          <MaskedLines lines={[title]} className="text-h1 text-royal" />
          <FadeIn delay={0.3}>
            <p className="mt-6 inline-flex rounded-full bg-signal-soft px-4 py-2 text-sm font-bold text-royal">{note}</p>
          </FadeIn>
        </div>
        <FadeIn delay={0.2} className="flex justify-center lg:col-span-7 lg:justify-end">
          {children}
        </FadeIn>
      </div>
    </section>
  );
}
