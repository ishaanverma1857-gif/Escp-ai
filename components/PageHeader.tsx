import { FadeIn, MaskedLines } from "./motion";

/** Title block shared by the inner pages. */
export default function PageHeader({
  kicker,
  title,
  intro,
  children,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
      <div aria-hidden="true" className="graticule pointer-events-none absolute inset-0" />
      <div className="container-site relative grid gap-10 md:grid-cols-12">
        <div className="md:col-span-10 lg:col-span-9">
          {kicker && (
            <FadeIn>
              <p className="mb-6 font-display text-xl italic text-slate">{kicker}</p>
            </FadeIn>
          )}
          <MaskedLines lines={[title]} className="text-h1" />
          {intro && (
            <FadeIn delay={0.35}>
              <p className="mt-8 max-w-[62ch] text-lead text-slate">{intro}</p>
            </FadeIn>
          )}
          {children && <FadeIn delay={0.5}>{children}</FadeIn>}
        </div>
      </div>
    </section>
  );
}
