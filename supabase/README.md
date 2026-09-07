# Supabase setup guide

## What went wrong (common mistake)

If you see:

```text
ERROR: 42601: syntax error at or near "/"
LINE 1: /Users/ankit/workspace/portfolio/supabase/schema.sql
```

You pasted the **file path** into the SQL Editor. Supabase expects **SQL code**, not a path from your computer.

The web SQL Editor cannot read files from your Mac — you must copy the file **contents** and paste them.

---

## Step-by-step

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in
2. **New project** → pick a name, password, region
3. Wait until the project finishes provisioning

### 2. Run the schema (tables + security)

1. In Supabase dashboard, open **SQL Editor** (left sidebar)
2. Click **New query**
3. In Cursor, open `supabase/schema.sql` in this repo
4. Select all (`Cmd+A`) → copy (`Cmd+C`)
5. Paste into the Supabase SQL Editor (replace anything already there)
6. Click **Run**
7. You should see **Success. No rows returned**

### 3. Run the seed (initial portfolio data)

1. **New query** again in SQL Editor
2. Open `supabase/seed.sql` in Cursor → copy all → paste → **Run**
3. You should see **Success** (may show row counts from inserts)

### 4. Create admin user

1. Go to **Authentication** → **Users**
2. **Add user** → **Create new user**
3. Enter your email and a strong password
4. Use these at `/admin/login` on your site

### 5. Get API keys for the app

1. **Project Settings** → **API**
2. Copy **Project URL** → `VITE_SUPABASE_URL` in `.env.local`
3. Copy **anon public** key → `VITE_SUPABASE_ANON_KEY` in `.env.local`

Example `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Restart `npm run dev` after adding env vars.

---

## Verify setup

In Supabase **Table Editor**, you should see:

- `site_settings` (1 row)
- `skills` (8 rows)
- `projects` (4 rows)
- `experience` (5 rows)
- `social_links` (2 rows)
- `contact_messages` (empty)

In **Storage**, bucket `portfolio-assets` should exist.

---

## If schema fails on second run

The updated `schema.sql` uses `drop policy if exists` so you can re-run it safely. If a table already exists, that is fine — `create table if not exists` skips creation.

## If seed fails

- Run `schema.sql` first
- If data already exists, seed uses `on conflict` — safe to re-run for most tables
