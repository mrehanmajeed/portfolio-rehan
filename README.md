# Muhammad Rehan Majeed — Portfolio

Personal portfolio for a Software Developer working across AI engineering and
full-stack architecture. Single-page Next.js App Router site with a working
contact endpoint.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
Lenis · Nodemailer

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable               | Required | Purpose                                                                 |
| ---------------------- | -------- | ----------------------------------------------------------------------- |
| `EMAIL_USER`           | yes      | Gmail address that sends and receives contact-form messages.            |
| `EMAIL_PASS`           | yes      | Google **App Password** — never the account password.                   |
| `NEXT_PUBLIC_SITE_URL` | yes      | Absolute origin. Drives metadata, `sitemap.xml`, and `robots.txt`.      |

Without the two email variables the site still builds and serves; the contact
endpoint returns `503` and logs the reason rather than failing silently.

## Scripts

| Command             | Does                                                        |
| ------------------- | ----------------------------------------------------------- |
| `npm run dev`       | Dev server.                                                 |
| `npm run build`     | Production build.                                           |
| `npm start`         | Serve the production build.                                 |
| `npm run lint`      | ESLint (`eslint-config-next`, core-web-vitals + TypeScript). |
| `npm run typecheck` | `tsc --noEmit`.                                             |
| `npm test`          | Node's built-in test runner over the contact validator.      |

## Editing the content

All copy lives in [`app/data/profile.ts`](app/data/profile.ts) — profile,
experience, education, skills, projects, and certificates. Components read from
it and render; none of them hard-code content. To add a project, append one
entry to `projects` with `tier: "featured" | "archive"`; the nav dropdown,
cards, anchors, and case-study modal all pick it up.

Links that do not exist yet are omitted rather than pointed at a placeholder —
leave `liveDemo` / `repo` unset and the button simply will not render.

## Structure

```
app/
├── api/contact/
│   ├── route.ts          POST handler: rate limit → validate → send
│   ├── validate.ts       Pure validation + fixed-window rate limiter
│   └── validate.test.ts  node:test coverage for both
├── components/           One component per section, plus shared pieces
├── data/profile.ts       Single source of truth for all content
├── hooks/                useTypewriter · useScrollLock · useSmoothScroll
├── layout.tsx            Fonts, metadata, JSON-LD Person schema
├── page.tsx              Composition only
├── robots.ts · sitemap.ts
└── globals.css           Design tokens and utilities
```

## Contact endpoint

`POST /api/contact` accepts `{ name, email, message }`. It rejects malformed
bodies, strips control characters so mail headers cannot be injected, drops
anything that fills the hidden honeypot field, and rate-limits to 5 messages
per IP per hour.

The rate limiter is in-process, so on a scaled-out serverless deployment it
applies per instance. That is enough to stop a single script; swap in Vercel KV
or Upstash if it ever needs to be exact.

## Deploying to Vercel

1. Push to GitHub and import the repository at [vercel.com/new](https://vercel.com/new).
2. Add `EMAIL_USER`, `EMAIL_PASS`, and `NEXT_PUBLIC_SITE_URL` under
   **Settings → Environment Variables** for Production, Preview, and Development.
3. Deploy. Framework preset, build command, and output directory are detected
   automatically.
4. After attaching a custom domain, update `NEXT_PUBLIC_SITE_URL` and redeploy
   so canonical URLs and the sitemap point at the right origin.
