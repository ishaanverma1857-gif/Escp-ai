import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { display, sans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 — ESCP AI",
  description: "This page does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <main className="container-site flex min-h-dvh flex-col justify-center py-24">
          <p className="font-display text-xl italic text-slate">404</p>
          <h1 className="mt-4 text-h1">This page does not exist</h1>
          <p lang="fr" className="mt-4 font-display text-2xl text-slate">Cette page n&apos;existe pas</p>
          <div className="mt-10 flex flex-wrap gap-6">
            <Link href="/en" className="link-underline font-bold">Back to the homepage</Link>
            <Link href="/fr" lang="fr" className="link-underline font-bold">Retour à l&apos;accueil</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
