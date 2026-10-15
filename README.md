# ESCP AI website

Bilingual (English / French) website for ESCP AI, the student-led AI society of ESCP Business School.

Built with Next.js 16 (App Router), Tailwind CSS 4 and Motion. Every page is pre-rendered as static HTML, so it loads fast on any device.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000 — redirects to /en or /fr based on browser language
npm run build      # production build
npm run start      # serve the production build
```

## Deploy

The simplest option is [Vercel](https://vercel.com): import the repository and click Deploy. No configuration is needed.
The language redirect on `/` uses Next.js Proxy, so the site needs a host that runs Next.js (Vercel, Netlify, or any Node server).

## Editing content

All text lives in three files. You don't need to touch the page code to change copy.

| File | What it holds |
| --- | --- |
| `content/en.ts` | All English copy |
| `content/fr.ts` | All French copy (same structure as English) |
| `content/site.ts` | Shared facts: links, team, partners, event dates, products, impact figures |

### Before launch: fill these in `content/site.ts`

Anything set to `null` is waiting for confirmation. Until then the site shows a clear "coming soon" state, never a broken link.

- `site.email` — official email. Once set, every "Become a partner", "Request a service", "Apply" and "Place an order" button opens a pre-addressed email.
- `site.instagram` — Instagram handle (without the @).
- `site.memberPlatformUrl` — member platform URL (Member login page).
- `site.shopOrderUrl` — optional external shop or order form. Without it, orders go through email.
- `site.applicationUrl` — optional online application form.
- `impact` — verified figures. A figure only appears on the homepage once its `value` is a number.
- `events[].registrationUrl` and `events[].places` — per-event registration link and capacity.

### Adding an event

1. Add an entry to `events` in `content/site.ts` (a `slug`, an ISO `date` if known, and a `sortKey` for ordering).
2. Add the same slug under `events.items` in both `content/en.ts` and `content/fr.ts`.

The event gets its own page at `/en/events/<slug>` and `/fr/events/<slug>` automatically.

## Design system

Defined in `app/globals.css`.

- **Colours:** ink navy `#0E2240`, paper `#F6F7F9`, fog `#E8ECF2`, slate `#4A5568`, and one accent, signal blue `#2F54EB`, reserved for AI moments and actions.
- **Type:** Newsreader (display serif) and Atkinson Hyperlegible Next (body text, chosen for readability).
- **Motion:** headline mask reveals, the animated campus map, scroll-triggered reveals, a scroll-drawn events timeline, page transitions and a partner marquee. Everything respects the operating system's "reduce motion" setting.
