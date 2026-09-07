-- Portfolio schema for Supabase (Postgres)
-- HOW TO RUN: Copy ALL text from this file and paste into Supabase SQL Editor.
-- Do NOT paste the file path (e.g. /Users/.../schema.sql) — that causes syntax error 42601.

-- Extensions
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  name text not null,
  initials text not null,
  photo_path text,
  role text,
  location text,
  address text,
  email text,
  phone text,
  hero_summary text,
  about_summary text,
  about_secondary text,
  education text,
  certification text,
  copyright_location text,
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  sort_order int not null default 0
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text,
  title text not null,
  description text,
  tags text[] not null default '{}',
  pad_color text not null default '#111113',
  image_path text,
  image_alt text,
  sort_order int not null default 0,
  case_study jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  company text not null,
  role text not null,
  period text,
  location text,
  highlights text[] not null default '{}',
  grid_span text not null default 'md:row-span-1',
  sort_order int not null default 0
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  href text not null,
  icon text,
  sort_order int not null default 0
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Updated_at trigger
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.site_settings enable row level security;
alter table public.skills enable row level security;
alter table public.projects enable row level security;
alter table public.experience enable row level security;
alter table public.social_links enable row level security;
alter table public.contact_messages enable row level security;

-- Drop existing policies so this script can be re-run safely
drop policy if exists "Public read site_settings" on public.site_settings;
drop policy if exists "Public read skills" on public.skills;
drop policy if exists "Public read projects" on public.projects;
drop policy if exists "Public read experience" on public.experience;
drop policy if exists "Public read social_links" on public.social_links;
drop policy if exists "Public insert contact_messages" on public.contact_messages;
drop policy if exists "Admin manage site_settings" on public.site_settings;
drop policy if exists "Admin manage skills" on public.skills;
drop policy if exists "Admin manage projects" on public.projects;
drop policy if exists "Admin manage experience" on public.experience;
drop policy if exists "Admin manage social_links" on public.social_links;
drop policy if exists "Admin read contact_messages" on public.contact_messages;
drop policy if exists "Admin update contact_messages" on public.contact_messages;

create policy "Public read site_settings"
  on public.site_settings for select to anon, authenticated using (true);

create policy "Public read skills"
  on public.skills for select to anon, authenticated using (true);

create policy "Public read projects"
  on public.projects for select to anon, authenticated using (true);

create policy "Public read experience"
  on public.experience for select to anon, authenticated using (true);

create policy "Public read social_links"
  on public.social_links for select to anon, authenticated using (true);

create policy "Public insert contact_messages"
  on public.contact_messages for insert to anon, authenticated with check (true);

create policy "Admin manage site_settings"
  on public.site_settings for all to authenticated using (true) with check (true);

create policy "Admin manage skills"
  on public.skills for all to authenticated using (true) with check (true);

create policy "Admin manage projects"
  on public.projects for all to authenticated using (true) with check (true);

create policy "Admin manage experience"
  on public.experience for all to authenticated using (true) with check (true);

create policy "Admin manage social_links"
  on public.social_links for all to authenticated using (true) with check (true);

create policy "Admin read contact_messages"
  on public.contact_messages for select to authenticated using (true);

create policy "Admin update contact_messages"
  on public.contact_messages for update to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Storage bucket
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

drop policy if exists "Public read portfolio assets" on storage.objects;
drop policy if exists "Admin upload portfolio assets" on storage.objects;
drop policy if exists "Admin update portfolio assets" on storage.objects;
drop policy if exists "Admin delete portfolio assets" on storage.objects;

create policy "Public read portfolio assets"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'portfolio-assets');

create policy "Admin upload portfolio assets"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio-assets');

create policy "Admin update portfolio assets"
  on storage.objects for update to authenticated
  using (bucket_id = 'portfolio-assets');

create policy "Admin delete portfolio assets"
  on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio-assets');
