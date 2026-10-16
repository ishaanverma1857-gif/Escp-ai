import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { defaultLocale, hasLocale, LOCALE_PATTERN, type Locale } from "@/lib/locales";

function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return (ranked.find((entry) => hasLocale(entry.lang))?.lang as Locale) ?? defaultLocale;
}

/** Sends visitors without a language prefix to /en or /fr. */
function localeRedirect(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (hasLocale(first)) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// Clerk runs only once its keys are configured, so the public site keeps working without them.
const withClerk = clerkMiddleware((_auth, request) => localeRedirect(request));
const authEnabled = !!process.env.CLERK_SECRET_KEY && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Only the account pages need Clerk; the public site never touches it, so it stays as fast as before.
const ACCOUNT_ROUTES = new RegExp(`^/(${LOCALE_PATTERN})/(sign-in|sign-up|account|dashboard)(/|$)`);

export function proxy(request: NextRequest, event: NextFetchEvent) {
  if (authEnabled && ACCOUNT_ROUTES.test(request.nextUrl.pathname)) return withClerk(request, event);
  return localeRedirect(request);
}

export const config = {
  matcher: [
    // Skip Next internals and any file with an extension (favicon, images, ...).
    "/((?!_next|.*\\..*).*)",
    // Clerk's API routes, if any are added later.
    "/(api|trpc)(.*)",
  ],
};
