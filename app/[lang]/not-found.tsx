import Link from "next/link";

// Rendered when a page calls notFound() (for example, an unknown event).
export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70dvh] flex-col justify-center py-40">
      <p className="font-display text-xl italic text-slate">404</p>
      <h1 className="mt-4 text-h1">This page does not exist</h1>
      <p className="mt-6 max-w-[52ch] text-lead text-slate">Cette page n&apos;existe pas. The link may be out of date.</p>
      <div className="mt-10 flex flex-wrap gap-6">
        <Link href="/en" className="link-underline font-bold">Back to the homepage</Link>
        <Link href="/fr" className="link-underline font-bold">Retour à l&apos;accueil</Link>
      </div>
    </section>
  );
}
