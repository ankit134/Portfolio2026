# Ankit Shrestha — Portfolio

Hybrid portfolio for **Ankit Shrestha**, UX/UI Designer based in Nepal. React + Vite frontend, **Supabase** backend (database, auth, storage), deployed on **Vercel**.

## Live site

- **Production:** [GitHub Pages](https://ankit134.github.io/Portfolio2026/) — auto-deploy on push to `main` (see below)
- **Admin:** `/admin/login` (after Supabase Auth user is created)

## Tech stack

| Layer | Tools |
|--------|--------|
| Frontend | React 19, Vite 8, Tailwind CSS v4, React Router |
| Data | TanStack React Query, Supabase JS client |
| Backend | Supabase (Postgres, Auth, Storage, RLS) |
| Hosting | GitHub Pages (GitHub Actions) |
| Code | GitHub |

## Features

- Dynamic portfolio content from Supabase (profile, projects, experience, skills)
- Project case study pages at `/projects/:slug`
- Contact form with messages stored in database
- Protected admin dashboard at `/admin` for CRUD
- Static fallback from `src/data/content.js` when Supabase env vars are missing
- Scroll animations, sticky work stack, reduced-motion support

## Getting started

### Prerequisites

- Node.js 20+
- npm
- [Supabase](https://supabase.com) project (free tier)
- [Vercel](https://vercel.com) account (free tier)

### Install

```bash
npm install
cp .env.example .env.local
```

Add your Supabase URL and anon key to `.env.local`.

### Database setup

**Important:** Paste the **SQL file contents** into Supabase SQL Editor — not the file path. Full guide: [`supabase/README.md`](supabase/README.md).

1. Create a project at [supabase.com](https://supabase.com)
2. **SQL Editor** → New query → copy all of `supabase/schema.sql` → paste → Run
3. New query → copy all of `supabase/seed.sql` → paste → Run
4. **Authentication → Users** → create your admin user (email + password)
5. **Settings → API** → copy Project URL and anon key into `.env.local`

### Development

```bash
npm run dev
```

Open `http://localhost:5173`

### Production build

```bash
npm run build
npm run preview
```

## Deploy on GitHub Pages

Pushing to `main` only updates the repo until Pages is wired up. One-time setup:

1. GitHub repo **Settings → Secrets and variables → Actions** → add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. **Settings → Pages** → **Build and deployment** → Source: **GitHub Actions**
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually under **Actions**)

The workflow (`.github/workflows/deploy.yml`) runs `npm run build`, uploads `dist`, and publishes to  
`https://ankit134.github.io/Portfolio2026/`.

Content changes via `/admin` do **not** require redeploy — only code changes do.

Optional: [Vercel](https://vercel.com) with `base: '/'` in `vite.config.js` and `vercel.json` if you prefer a custom domain without the `/Portfolio2026` path.

## Project structure

```
src/
├── pages/              # Home, project detail, admin pages
├── components/         # UI sections + admin ProtectedRoute
├── context/            # PortfolioContext
├── hooks/              # Data + scroll hooks
├── lib/                # Supabase client, queries, mappers
├── data/content.js     # Static fallback content
supabase/
├── schema.sql          # Tables, RLS, storage policies
└── seed.sql            # Initial data
.github/workflows/      # GitHub Pages deploy on push to main
vercel.json             # Optional Vercel SPA rewrites
```

## Admin

| Route | Purpose |
|-------|---------|
| `/admin/login` | Sign in |
| `/admin` | Dashboard |
| `/admin/profile` | Edit bio and contact |
| `/admin/projects` | CRUD projects + case studies |
| `/admin/experience` | CRUD work history |
| `/admin/skills` | Manage skill tags |
| `/admin/messages` | Read contact submissions |

## Custom domain (optional)

Add your domain in Vercel project **Settings → Domains**. No code changes needed (`base` is `/`).

## Changelog

See [CHANGELOG.md](CHANGELOG.md). After making changes, run:

```bash
npm run changelog -- "Brief description of your change"
```

## License

Private portfolio project. All rights reserved.
