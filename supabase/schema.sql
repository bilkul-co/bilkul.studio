create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  service_type text not null,
  business_name text not null,
  industry text,
  goals text[] not null,
  timeline text not null,
  email text not null,
  phone text,
  details text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.demo_blueprints (
  id uuid primary key default gen_random_uuid(),
  prompt text,
  meta jsonb,
  brand_name text not null,
  tagline text not null,
  tone text not null,
  primary_color text not null,
  sections jsonb not null,
  prompt_anchors text[],
  coverage_score text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
alter table public.demo_blueprints enable row level security;

drop policy if exists "public insert leads" on public.leads;
drop policy if exists "admin read leads" on public.leads;
drop policy if exists "admin update leads" on public.leads;
drop policy if exists "public insert demos" on public.demo_blueprints;
drop policy if exists "admin read demos" on public.demo_blueprints;

create policy "public insert leads"
on public.leads
for insert
to anon, authenticated
with check (true);

create policy "admin read leads"
on public.leads
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

create policy "admin update leads"
on public.leads
for update
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true)
with check ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

create policy "public insert demos"
on public.demo_blueprints
for insert
to anon, authenticated
with check (true);

create policy "admin read demos"
on public.demo_blueprints
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);
