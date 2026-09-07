# Changelog

All notable changes to this portfolio project are documented here.

When you ship a feature or fix, add an entry under a new date heading (newest first).

```bash
npm run changelog -- "Short description of what changed"
```

---

## 2026-09-07

- Home **Selected Work** stack: hover **View Case Study** CTA and click card to open case study page (disabled when no admin case study data).
- Added **Recent works** page at `/projects` with full project list and hover **View Case Study** CTA (white pill, disabled when no case study data).
- Home **Selected Work** shows at most 4 stacked projects; **View all project** button appears only when there are more than 4 projects.
- Added `hasCaseStudy()` helper to detect admin case study content.
- Introduced this changelog and `npm run changelog` script.

## 2026-09-03

- Hybrid portfolio: Supabase CMS, admin dashboard, contact form, project detail pages.
- Migrated hosting from GitHub Pages to Vercel (`vercel.json`, `base: '/'`).
