-- Thru360 — SAMPLE/PLACEHOLDER data untuk Database CV Kandidat
-- ============================================================
-- Semua kandidat di file ini adalah CONTOH/FIKTIF -- dipakai supaya section
-- "Database CV Kandidat" di web punya isi untuk direview sebelum data kandidat
-- asli dimasukkan. JANGAN dianggap data sungguhan, dan JANGAN dijadikan dasar
-- transaksi pembayaran sungguhan.
--
-- Cara pakai: jalankan file ini di SQL Editor Supabase SETELAH schema.sql,
-- kalau ingin melihat tampilan section CV dengan isi contoh. Hapus baris-baris
-- ini (atau set is_active = false) begitu data kandidat asli sudah siap diinput.

insert into public.cv_candidates
  (display_name, role_category, headline, summary, education_institution, education_degree,
   education_period, work_experience, skills, location_city, price_idr,
   full_name, phone, email, linkedin_url, portfolio_url)
values
  (
    'Anin P. S.', 'Business Development',
    'BD Intern dengan pengalaman partnership & outreach B2B',
    'Mahasiswa aktif dengan pengalaman magang business development di startup digital, terbiasa riset partner, cold outreach, dan menyusun proposal kerja sama.',
    'Universitas Contoh Nusantara', 'Bachelor of Business Administration', '2022 - Expected 2026',
    '[{"company":"PT Contoh Digital Indonesia","title":"Business Development Intern","period":"2025 - 2026","description":"Riset & outreach 50+ calon partner per bulan, menyusun proposal kerja sama, follow-up negosiasi."}]'::jsonb,
    array['Business Development','Partnership','Negotiation','CRM'],
    'Jakarta, ID', 25000,
    '[SAMPLE] Anin Putri Sample', '081200000001', 'sample.anin@example.com', 'https://linkedin.com/in/sample-anin', null
  ),
  (
    'Bagas W. R.', 'Admission',
    'Admission/Recruitment intern, terbiasa screening & interview kandidat',
    'Berpengalaman membantu proses rekrutmen mulai dari screening CV, penjadwalan interview, hingga koordinasi dengan kandidat dan tim internal.',
    'Universitas Contoh Merdeka', 'Bachelor of Psychology', '2023 - Expected 2027',
    '[{"company":"PT Contoh Talenta","title":"Admission Intern","period":"2025 - 2026","description":"Screening 200+ CV, menjadwalkan 80+ interview, menyusun laporan progres rekrutmen mingguan."}]'::jsonb,
    array['Recruitment','Screening','Interviewing','Administrasi'],
    'Bandung, ID', 25000,
    '[SAMPLE] Bagas Wirawan Sample', '081200000002', 'sample.bagas@example.com', 'https://linkedin.com/in/sample-bagas', null
  ),
  (
    'Citra A. D.', 'Marketing',
    'Social media & content marketing intern, fokus growth Instagram/TikTok',
    'Mengelola konten dan strategi media sosial untuk brand consumer, terbiasa dengan analytics engagement dan kolaborasi KOL skala kecil-menengah.',
    'Universitas Contoh Airlangga', 'Bachelor of Communication Science', '2022 - Expected 2026',
    '[{"company":"PT Contoh Brand Kreatif","title":"Social Media Intern","period":"2025 - 2026","description":"Mengelola akun Instagram 50k+ followers, menyusun content calendar, kolaborasi dengan 10+ micro-KOL."}]'::jsonb,
    array['Social Media','Content Planning','Copywriting','Analytics'],
    'Surabaya, ID', 25000,
    '[SAMPLE] Citra Ayu Sample', '081200000003', 'sample.citra@example.com', null, 'https://example.com/portfolio-sample-citra'
  ),
  (
    'Dimas F. H.', 'Digital & IT',
    'Software engineering intern, fokus web development',
    'Membangun dan memelihara fitur aplikasi web menggunakan JavaScript modern, terbiasa kerja dalam tim kecil dengan workflow Git.',
    'Institut Teknologi Contoh', 'Bachelor of Informatics Engineering', '2022 - Expected 2026',
    '[{"company":"PT Contoh Teknologi Nusantara","title":"Software Engineer Intern","period":"2025 - 2026","description":"Mengembangkan 5+ fitur produk, memperbaiki 30+ bug, code review rutin bersama tim."}]'::jsonb,
    array['JavaScript','React','Git','REST API'],
    'Yogyakarta, ID', 25000,
    '[SAMPLE] Dimas Fajar Sample', '081200000004', 'sample.dimas@example.com', 'https://linkedin.com/in/sample-dimas', 'https://github.com/sample-dimas'
  );
