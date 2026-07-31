-- Thru360 — skema Supabase untuk form Business Check-Up, Pendaftaran Freelancer, Minat Investor, Pengajuan Pendanaan & Database CV
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
drop policy if exists "Allow public insert on business_checkups" on public.business_checkups;
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

drop policy if exists "Allow public insert on freelancer_applications" on public.freelancer_applications;
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

drop policy if exists "Allow public insert on investor_interest" on public.investor_interest;
create policy "Allow public insert on investor_interest"
  on public.investor_interest
  for insert
  to anon
  with check (true);

-- ==================== PENGAJUAN PENDANAAN (Startup/Founder apply for funding) ====================
create table if not exists public.funding_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nama_perusahaan text not null,
  badan_hukum text,
  tahun_beroperasi text,
  tahap_bisnis text,
  lokasi_hq text,
  jumlah_karyawan text,
  nama_jabatan text not null,
  email text not null,
  nomor_telepon text not null,
  website_atau_ig text,
  sektor text,
  masalah_inti text,
  solusi_model_bisnis text,
  traksi text,
  kebutuhan_pendanaan text,
  link_pitch_deck text not null,
  pesan text
);

alter table public.funding_applications enable row level security;

drop policy if exists "Allow public insert on funding_applications" on public.funding_applications;
create policy "Allow public insert on funding_applications"
  on public.funding_applications
  for insert
  to anon
  with check (true);

-- ==================== DATABASE CV KANDIDAT (browse + pay-to-unlock) ====================
-- Tabel ini menyimpan SEMUA data kandidat, termasuk data sensitif (kontak, sosial media, nama asli).
-- Tabel ini SENGAJA tidak diberi policy RLS apa pun untuk anon -- artinya publik TIDAK BISA
-- membaca tabel ini sama sekali lewat publishable key. Akses publik HANYA lewat view
-- `cv_candidates_public` di bawah (yang hanya mengekspos kolom non-sensitif), dan data sensitif
-- hanya bisa diambil lewat Supabase Edge Function `reveal-cv` setelah pembayaran Xendit lunas
-- (function tersebut memakai service_role key, bukan publishable key).
create table if not exists public.cv_candidates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  is_active boolean not null default true,
  price_idr integer not null default 25000,

  -- Kolom PUBLIK (aman ditampilkan tanpa bayar):
  display_name text not null,          -- nama tersensor, mis. "Diva P. N. S."
  role_category text,                  -- mis. "Business Development", "Admission", "Marketing"
  headline text,
  summary text,
  education_institution text,
  education_degree text,
  education_period text,
  work_experience jsonb,               -- array of {company, title, period, description}
  skills text[],
  location_city text,

  -- Kolom SENSITIF (hanya lewat reveal-cv setelah bayar):
  full_name text not null,
  phone text,
  email text,
  linkedin_url text,
  portfolio_url text,
  other_social text,
  cv_file_url text
);

alter table public.cv_candidates enable row level security;
-- Sengaja TIDAK ada create policy di sini untuk role anon -- base table terkunci total dari publik.

-- View publik: cuma expose kolom yang aman, dipakai oleh search/filter di halaman web.
create or replace view public.cv_candidates_public as
select
  id, created_at, display_name, role_category, headline, summary,
  education_institution, education_degree, education_period,
  work_experience, skills, location_city, price_idr
from public.cv_candidates
where is_active = true;

grant select on public.cv_candidates_public to anon;

-- Tabel transaksi unlock. TIDAK ADA policy untuk anon sama sekali (insert maupun select) --
-- hanya bisa diakses lewat Edge Function (create-cv-invoice, xendit-webhook, reveal-cv)
-- yang jalan dengan service_role key di sisi server, supaya pembeli tidak bisa memalsukan
-- status "sudah bayar" lewat request langsung ke Supabase.
create table if not exists public.cv_unlocks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  cv_id uuid not null references public.cv_candidates(id),
  buyer_email text not null,
  buyer_whatsapp text,
  amount integer not null,
  xendit_invoice_id text,
  xendit_external_id text unique,
  status text not null default 'pending', -- pending | paid | expired | failed
  unlock_token text unique,
  paid_at timestamptz
);

alter table public.cv_unlocks enable row level security;
-- Sengaja TIDAK ada create policy di sini untuk role apa pun selain service_role (default).
