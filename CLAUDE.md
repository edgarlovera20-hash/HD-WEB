# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`HD-WEB` is the **public-facing** platform of the Heavenly Dreams (HD) ecosystem
(`heavenlydreams.com.mx`): corporate website, marketing/landing pages, SEO content, and public lead
capture. Per `ecosystem-boundaries.v1.json` it must **not** do user administration, candidate or
client management, finance operations, internal dashboards, or execute AI automation directly. Its
job at the data layer is narrow: **capture leads and hand them off to `HD-CRM`** — it has no database
of its own.

Unlike the internal HD apps, this repo is **standalone**: it does *not* depend on the `@hd/core-*`
packages, so there is no `../HD-CORE` sibling-checkout requirement here.

> `README.md` lists an aspirational stack (Next.js/NestJS/Shadcn). The actual stack is React 18 +
> Vite 6 + Tailwind v4 served by a thin Express server. Trust the code.

## Commands

```bash
npm install
npm run dev          # tsx server.ts — Express server on port 3000
npm run typecheck    # tsc --noEmit — the real quality gate (CI runs this)
npm run lint         # alias for tsc --noEmit
npm run test         # placeholder (echo TODO)
npm run format       # prettier on src/**
npm run build        # build:client (vite build) + build:server (esbuild → dist/server.cjs)
npm start            # node dist/server.cjs (production: serves built client + /api)
```

No test runner is wired up yet. `typecheck` is the gate CI enforces.

## Architecture

**Thin Express front + React SPA** (`server.ts`): in production serves the Vite-built client; in dev
exposes the API while Vite serves the client.

- **Lead intake**: `POST /api/leads` validates input with Zod, is rate-limited
  (`express-rate-limit`, 5 requests / 15 min), and forwards to the CRM at
  `CRM_API_URL` (default `http://localhost:3002`). This is the main backend responsibility — keep it
  thin and do not add domain ownership here.
- `src/` — React + React Router client (`App.tsx`, `pages/`, `components/`).
- Note this repo also contains some **legacy/static** assets alongside the Vite app (`app.js`,
  `store.js`, `admin.html`/`admin.js`, `styles.css`, `server.cjs`, `assets/`). New work should go in
  the React `src/` app + `server.ts` unless you are deliberately touching the static pages.
- `design-system/`, `blueprints/`, `contracts/`, `docs/`, `design-qa.md` document the brand/UX; the
  PNGs are reference mockups (desktop/mobile).

## Config

Copy `.env.example` to `.env`. Key vars: `PORT`, `PUBLIC_BASE_URL`, `CRM_API_URL` (where leads are
forwarded), `N8N_WEBHOOK_*`. No `DATABASE_URL` / `JWT_SECRET` — this app holds no users or persisted
domain data.
