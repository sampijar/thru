-- Thru360 — skema Supabase untuk form Business Check-Up, Pendaftaran Freelancer & Minat Investor
-- Jalankan seluruh file ini di Supabase Dashboard -> SQL Editor -> New query -> Run

create extension if not exists pgcrypto;

-- ==================== BUSINESS CHECK-UP ====================
create table if not exists public.business_checkups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nama text not null,
  email text not null,
  nomor_telepon text not null,
  nama_bisnis text not null,
  goals_5_tahun text,
  gambaran_bisnis text,
  kompetitor text,
  top_produk text,
  rata_rata_penjualan text,
  ekspektasi_kerjasama text,
  prioritas text,
  kendala text
);

alter table public.business_checkups enable row level security;

-- Publik (anon/publishable key) hanya boleh INSERT, tidak boleh membaca data orang lain.
create policy "Allow public insert on business_checkups"
  on public.business_checkups
  for insert
  to anon
  with check (true);

-- ==================== PENDAFTARAN FREELANCER (THRUpers) ====================
create table if not exists public.freelancer_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nama text not null,
  nomor_telepon text not null,
  alamat text,
  lama_freelance text,
  skill_set text not null,
  portfolio_url text not null,
  setuju_privasi boolean not null default false
);

alter table public.freelancer_applications enable row level security;

create policy "Allow public insert on freelancer_applications"
  on public.freelancer_applications
  for insert
  to anon
  with check (true);

-- ==================== MINAT INVESTOR ====================
create table if not exists public.investor_interest (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nama text not null,
  email text not null,
  nomor_telepon text not null,
  institusi text,
  tipe_investor text,
  minat_venture text,
  pesan text
);

alter table public.investor_interest enable row level security;

create policy "Allow public insert on investor_interest"
  on public.investor_interest
  for insert
  to anon
  with check (true);
