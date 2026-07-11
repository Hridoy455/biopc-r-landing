# Deploying to Vercel + pointing your BioPC domain

This guide deploys the landing page to **Vercel** (free) and serves it at a
subdomain such as **`courses.biopc.org`**, while your domain stays where it is.

There are two ways to deploy. **Method A (GitHub)** is recommended because every
future change redeploys automatically. **Method B (CLI)** is fastest if you don't
want to use GitHub.

---

## Before you start

- A free account at <https://vercel.com> (sign up with Google/GitHub/email).
- Your Google Apps Script web app URL ready (see `google-apps-script/SETUP.md`).
- Your Meta Pixel ID ready (Meta Events Manager).

---

## Method A — GitHub + Vercel (recommended)

### 1. Put the code on GitHub

1. Create a new **empty** repository at <https://github.com/new>
   (e.g. `biopc-r-landing`). Don't add a README/gitignore — the project has them.
2. In a terminal, from the project folder, push it (the repo is already
   committed locally):

   ```bash
   cd "D:\DESKTOP_ALL\BioPC.org website\biopc-academy"
   git branch -M main
   git remote add origin https://github.com/<your-username>/biopc-r-landing.git
   git push -u origin main
   ```

### 2. Import into Vercel

1. Go to <https://vercel.com/new>.
2. Click **Import** next to your `biopc-r-landing` repo.
3. Vercel auto-detects Next.js — leave the build settings as-is.
4. Expand **Environment Variables** and add the ones from the table below.
5. Click **Deploy**. In ~1 minute you get a live URL like
   `biopc-r-landing.vercel.app`.

### 3. Push updates later

Any time you change content (e.g. edit `src/lib/site-config.ts`), commit and push
— Vercel redeploys automatically:

```bash
git add -A && git commit -m "Update course dates and payment numbers"
git push
```

---

## Method B — Vercel CLI (no GitHub)

```bash
cd "D:\DESKTOP_ALL\BioPC.org website\biopc-academy"
npm i -g vercel
vercel login
vercel            # answer the prompts; first run creates the project
# add env vars (repeat for each, choose Production when asked):
vercel env add NEXT_PUBLIC_META_PIXEL_ID
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add SHEETS_WEBAPP_URL
vercel env add SHEETS_SHARED_SECRET
vercel --prod     # deploy to production
```

To redeploy after edits: `vercel --prod`.

---

## Environment variables (set these in Vercel)

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://courses.biopc.org` | Your final public URL. |
| `NEXT_PUBLIC_META_PIXEL_ID` | your Pixel ID | From Meta Events Manager. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Optional (GA4). |
| `SHEETS_WEBAPP_URL` | `https://script.google.com/macros/s/…/exec` | From the Apps Script deploy. |
| `SHEETS_SHARED_SECRET` | long random string | Must match `SHARED_SECRET` in `Code.gs`. |

In the Vercel dashboard: **Project → Settings → Environment Variables**. After
adding/changing variables, **redeploy** (Deployments → ⋯ → Redeploy) so they
take effect.

---

## Point `courses.biopc.org` at Vercel

1. In your Vercel project: **Settings → Domains → Add** → enter
   `courses.biopc.org` → **Add**.
2. Vercel shows a DNS record to create. For a subdomain it's a **CNAME**:

   | Type | Name / Host | Value / Target |
   |---|---|---|
   | CNAME | `courses` | `cname.vercel-dns.com` |

3. Add that record wherever **biopc.org's DNS** is managed (your domain
   registrar, or Hostinger's hPanel if biopc.org is there):
   **hPanel → Domains → DNS / Nameservers → DNS Records → Add Record**.
4. Wait for DNS to propagate (usually minutes, up to a few hours). Vercel shows
   a green check and issues an HTTPS certificate automatically.

> Using the apex domain `biopc.org` instead of a subdomain? Add an **A record**
> for `@` → `76.76.21.21` instead of the CNAME. A subdomain is recommended so it
> won't affect your main site.

---

## After deploying — verify

- [ ] Visit `https://courses.biopc.org` — page loads over HTTPS.
- [ ] Submit a test registration → a row appears in your Google Sheet and you get
      the confirmation email.
- [ ] Install the **Meta Pixel Helper** Chrome extension → visit the page → it
      shows `PageView`, and `Lead` / `CompleteRegistration` fire on submit.
- [ ] Paste the URL into the Facebook
      [Sharing Debugger](https://developers.facebook.com/tools/debug/) to confirm
      the share image/title look right (click "Scrape Again" if you update them).
