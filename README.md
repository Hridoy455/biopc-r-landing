# BioPC — R Programming for Biologists (Landing Page)

A fast, conversion-optimized landing page for BioPC's **R Programming for
Biologists** live course, built for a Facebook/Meta ad campaign. Visitors learn
about the course and register through an on-page form; every registration is
stored in a Google Sheet, and traffic + conversions are tracked with the Meta
Pixel and (optionally) Google Analytics 4.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

---

## Features

- **Single, focused landing page** — hero with live countdown, benefits,
  curriculum, instructor, testimonials, FAQ, payment instructions, and a
  registration form.
- **Registration → Google Sheets** via a Google Apps Script web app (no
  database to manage). Optional payment-screenshot upload to Drive + automatic
  confirmation email.
- **Meta Pixel** funnel events: `PageView`, `ViewContent`, `InitiateCheckout`,
  `Lead`, and `CompleteRegistration`.
- **Google Analytics 4** (optional) with button/CTA and form-completion events.
- **Spam protection** — server-side validation, honeypot field, and rate
  limiting on the API route.
- **SEO ready** — metadata, Open Graph + Twitter cards, dynamic OG image,
  JSON-LD (Course/Organization/FAQ), `robots.txt`, and `sitemap.xml`.
- **Dark/light mode**, fully responsive, reduced-motion aware.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
#   then edit .env.local (see "Environment variables" below)

# 3. Run locally
npm run dev
# open http://localhost:3000
```

The page works without any keys configured — analytics simply stay off and the
form will report that registration is unavailable until you set up the Google
Sheet (below).

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public URL of the site (SEO/OG/canonical). |
| `NEXT_PUBLIC_META_PIXEL_ID` | For ads | Meta Pixel ID from Events Manager. Empty = disabled. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 Measurement ID (`G-XXXXXXXXXX`). Empty = disabled. |
| `SHEETS_WEBAPP_URL` | For registration | Apps Script web app URL (`.../exec`). |
| `SHEETS_SHARED_SECRET` | For registration | Shared secret; must match the Apps Script. |

`NEXT_PUBLIC_*` variables are exposed to the browser; the two `SHEETS_*`
variables are used server-side only.

---

## Editing course content

Almost all copy lives in two files — no component edits needed:

- **`src/lib/site-config.ts`** — course name, dates, **registration deadline**
  (countdown), **price**, format, contact emails, social links, and the
  **payment account numbers** (bKash/Nagad/Rocket/Bank).
- **`src/lib/content.ts`** — benefits, audience, "why BioPC", curriculum weeks,
  instructor bio, testimonials, FAQs, and trust stats.

> ⚠️ Before going live, replace the placeholder payment numbers
> (`01XXXXXXXXX`) in `site-config.ts` and set the real
> `registrationDeadline` and `courseStartDate`.

To add a real instructor photo, drop `public/instructor.jpg` and swap the
initials block in `src/components/sections/instructor.tsx` for a `next/image`.

---

## Registration storage (Google Sheets)

Follow **[`google-apps-script/SETUP.md`](./google-apps-script/SETUP.md)** to:

1. Create a Google Sheet.
2. Paste `google-apps-script/Code.gs` into Apps Script.
3. Deploy it as a Web App and copy the URL into `SHEETS_WEBAPP_URL`.

Each submission appends a row (with a `Pending` status you can update to
`Approved`/`Rejected`), optionally saves the screenshot to Drive, and emails the
student a confirmation.

---

## Meta Pixel setup

1. In [Meta Events Manager](https://business.facebook.com/events_manager),
   create/choose a Pixel and copy its **Pixel ID**.
2. Set `NEXT_PUBLIC_META_PIXEL_ID` in your environment.
3. Events fired automatically:
   - `PageView` — every page load.
   - `InitiateCheckout` — when a visitor clicks a "Register" CTA or starts the form.
   - `Lead` + `CompleteRegistration` — on successful form submission.
4. In Ads Manager, use **CompleteRegistration** (or **Lead**) as your
   conversion objective.
5. Verify with the **Meta Pixel Helper** Chrome extension after deploying.

---

## Deploy to Vercel

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from the table above in
   **Project → Settings → Environment Variables**.
4. Deploy. Point your subdomain (e.g. `courses.biopc.org`) at the project under
   **Settings → Domains**.

> The registration API route uses the Node.js runtime and needs a server — deploy
> on Vercel (or any Node host), not as a purely static export.

---

## Project structure

```
biopc-academy/
├─ public/                     # logo, favicon, static assets
├─ google-apps-script/         # Google Sheets backend + setup guide
│  ├─ Code.gs
│  └─ SETUP.md
├─ src/
│  ├─ app/
│  │  ├─ api/register/route.ts # form endpoint: validate → Sheets
│  │  ├─ layout.tsx            # metadata, fonts, pixel/GA, theme
│  │  ├─ page.tsx              # assembles the landing sections
│  │  ├─ globals.css           # design tokens + Tailwind layers
│  │  ├─ opengraph-image.tsx   # dynamic social share image
│  │  ├─ robots.ts / sitemap.ts
│  ├─ components/
│  │  ├─ analytics/            # MetaPixel, GoogleAnalytics
│  │  ├─ sections/             # hero, benefits, curriculum, registration, …
│  │  ├─ seo/json-ld.tsx
│  │  ├─ site/                 # navbar, footer
│  │  ├─ theme/                # theme script + toggle
│  │  └─ ui/                   # reveal, countdown, icons, headings
│  └─ lib/
│     ├─ site-config.ts        # course config + payment info (edit me)
│     ├─ content.ts            # marketing copy (edit me)
│     ├─ registration.ts       # form types + validation (shared)
│     ├─ pixel.ts              # Meta/GA event helpers
│     └─ utils.ts
├─ tailwind.config.ts
└─ next.config.mjs
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Lint with ESLint. |

---

© BioPC — A Bioinformatics Lab of Research and Training.
