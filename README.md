# Thru360 — Website (GitHub Pages)

Landing page resmi **Thru360** — mitra bisnis 360° (marketing, digital, finance, legal) sekaligus venture builder. Siap deploy ke GitHub Pages.

## 📁 Struktur File

```
/
├── index.html            ← Halaman utama (edit di sini)
├── cari-talent.html      ← Halaman terpisah: Database CV Kandidat (cari/filter/bayar buka kontak)
├── privacy.html          ← Kebijakan Privasi
├── terms.html            ← Syarat & Ketentuan
├── logo.svg              ← Logo brand Anda
├── apple-touch-icon.png / favicon-32.png / site.webmanifest  ← Ikon & PWA manifest
├── assets/og-image.png   ← Gambar social preview (Open Graph/Twitter Card)
├── assets/logos/         ← Logo venture & brand kolaborasi (dipakai di section Portofolio & Kolaborasi)
├── .nojekyll             ← Wajib ada agar GitHub Pages bekerja dengan benar
├── supabase/schema.sql   ← Skema tabel + RLS untuk semua form + Database CV
├── supabase/seed_sample_cv.sql   ← Data CONTOH/FIKTIF untuk preview section Database CV (opsional)
├── supabase/functions/   ← Edge Functions (Deno) untuk pembayaran Xendit di Database CV
└── README.md
```

## 🚀 Cara Upload ke GitHub Pages

### Langkah 1 — Buat Repository baru di GitHub
1. Buka [github.com](https://github.com) → klik **New Repository**
2. Nama repo bebas, misal: `website` atau `namabrand.github.io`
3. Set ke **Public** → klik **Create repository**

### Langkah 2 — Upload file
Di halaman repo yang baru dibuat:
1. Klik **Add file → Upload files**
2. Drag & drop **semua isi folder ini** (index.html, logo.svg, .nojekyll, README.md)
3. Klik **Commit changes**

### Langkah 3 — Aktifkan GitHub Pages
1. Buka tab **Settings** di repo
2. Klik **Pages** (di sidebar kiri)
3. Source: pilih **Deploy from a branch**
4. Branch: pilih **main** → folder **/ (root)**
5. Klik **Save**

Tunggu 1–2 menit, lalu akses:
- `https://username.github.io/nama-repo/` — jika nama repo bukan `username.github.io`
- `https://username.github.io/` — jika nama repo adalah `username.github.io`

---

## ✏️ Struktur Konten

Konten diambil dari *Credentials Pitch Deck* & *Company Profile 2026* resmi Thru360. Bagian yang masih perlu dikonfirmasi ditandai `<!-- TODO -->` di `index.html`:

| Section | Isi |
|---|---|
| Hero | Tagline & positioning venture builder |
| Tentang (`#tentang`) | Business challenges → respons Thru360 |
| Nilai-Nilai (`#nilai`) | Integrated Approach, Data-Driven Decisions, Execution Excellence, Scalable Growth (accordion) |
| Layanan (`#layanan`) | Growth & Marketing, Finance & Advisory, Digital Solutions, Legal & Compliance |
| Proses (`#proses`) | Discover → Strategize → Execute → Optimize → Scale |
| Dampak (`#dampak`) | Bento warna-warni: 20x ROAS, 10x ROI, 5M+ impressions, +30% efisiensi, +30% retensi |
| Portofolio (`#portofolio`) | **Venture: Citrust** (konsultan F&B), **Briga** (konsultan bisnis berkelanjutan), **Tilde** (software house), **FundHub** (konsultasi keuangan & funding) + industri yang dilayani |
| Business Check-Up (`#business-checkup`) | Form langsung di web (bukan redirect Google Form), submit ke Supabase |
| Investor (`#investor`) | CTA & form minat investasi (holding atau per-venture), submit ke Supabase |
| Ajukan Pendanaan (`#ajukan-pendanaan`) | Form untuk founder/startup mengajukan diri untuk didanai Thru360 (link pitch deck dll), submit ke Supabase |
| Studi Kasus (`#studi-kasus`) | Skinmade, Resoult.co, PowerBuilding Gym, TPR Metallurgy |
| Kolaborasi | Daftar brand & institusi partner |
| Freelancer (`#freelancer`) | Form pendaftaran Mitra Freelancer THRU (THRUpers) langsung di web, submit ke Supabase |
| Database CV (`cari-talent.html`) | Halaman terpisah — cari & filter kandidat magang/entry-level; nama tersensor, pengalaman & pendidikan gratis dilihat, kontak & sosial media terkunci sampai bayar Rp 25.000/CV lewat Xendit |
| Testimoni | Kutipan dari Gary Miller (PowerBuilding) & Adrian Allo (Jenggala Semesta) |
| FAQ (`#faq`) | Pertanyaan umum seputar Thru360 |
| Kontak (`#kontak`) | Varian Ferandanes De Lima · +(62) 811 944 0998 · partnership@thrucorp.com |

## ✨ Fitur

- **Dark mode permanen** — dinilai lebih kuat untuk brand Thru360.
- **Menu mobile (hamburger)** — navigasi tetap bisa diakses penuh di layar kecil.
- **Business Check-Up, Daftar Freelancer, Minat Investor & Ajukan Pendanaan** — semuanya form asli langsung di web (modal, bukan redirect), submit ke Supabase (lihat bagian *Supabase* di bawah).
- **Klik venture untuk detail** — card di section Portofolio bisa diklik, membuka modal dengan deskripsi venture & CTA diskusi kolaborasi.
- **SEO & social preview** — meta description, Open Graph, Twitter Card, canonical URL, dan JSON-LD Organization.
- **Aksesibilitas** — skip link, `aria-*` pada menu, serta menghormati preferensi *reduced motion*.
- **Tombol kembali ke atas** dan tahun copyright yang otomatis diperbarui.
- **CTA langsung ke WhatsApp** & email tim partnership.

---

## 🗄️ Supabase (backend form)

Form **Business Check-Up**, **Daftar Freelancer**, dan **Minat Investor** submit langsung ke Supabase lewat REST API (tanpa perlu server/backend tambahan).

**Setup:**
1. Buat project di [supabase.com](https://supabase.com) (atau pakai yang sudah ada).
2. Buka **SQL Editor** → jalankan seluruh isi file [`supabase/schema.sql`](./supabase/schema.sql). Ini membuat 4 tabel (`business_checkups`, `freelancer_applications`, `investor_interest`, `funding_applications`) dan mengaktifkan **Row Level Security** dengan policy: publik hanya boleh **INSERT**, tidak bisa membaca data siapa pun (data pengunjung situs tetap privat).
3. Buka **Settings → Data API**, salin **Project URL** dan **publishable key** (`sb_publishable_...`).
4. Paste di `index.html`, cari baris:
   ```js
   const SUPABASE_URL = 'https://gbmglrpryusfwduzzhih.supabase.co';
   const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_...';
   ```
   dan ganti sesuai project kamu.

⚠️ **Jangan pernah** menaruh **secret key** (`sb_secret_...` / service role key) di `index.html` atau file apa pun di repo ini — repo & situs ini bersifat publik (bisa dibaca lewat "View Source"), dan secret key itu bisa bypass semua proteksi RLS di atas. Hanya **publishable key** yang aman ditaruh di frontend.

**Lihat data yang masuk:** buka Supabase Dashboard → **Table Editor** → pilih tabel `business_checkups`, `freelancer_applications`, `investor_interest`, atau `funding_applications`.

---

## 🔒 Database CV Kandidat (search, filter, bayar-untuk-buka-kontak)

Section ini berbeda dari form-form di atas: selain publishable key + Supabase REST API,
fitur ini **butuh backend** (Supabase Edge Functions) karena melibatkan pembayaran sungguhan
lewat Xendit — proses yang **tidak boleh** dijalankan langsung dari browser pengunjung, sama
seperti alasan secret key Supabase tidak boleh ada di frontend.

### Bagaimana data dilindungi

- Tabel `cv_candidates` menyimpan SEMUA data kandidat (termasuk nama asli, telepon, email,
  sosial media), tapi **sengaja tidak punya RLS policy untuk publik sama sekali** — publishable
  key tidak bisa membaca tabel ini langsung, titik.
- Publik hanya bisa membaca lewat **view** `cv_candidates_public`, yang cuma berisi kolom aman:
  nama tersensor, kategori, ringkasan, pendidikan, pengalaman kerja, skill, kota, dan harga.
- Data sensitif (nama asli, telepon, email, LinkedIn, portfolio) **hanya** bisa diambil lewat
  Edge Function `reveal-cv`, dan itu pun hanya kalau ada transaksi `cv_unlocks` yang sudah
  berstatus `paid` untuk token yang dikirim. Kalau belum bayar, function ini menolak memberi data.

### Alur pembayaran

1. Pengunjung isi email di modal "Buka Kontak" → frontend panggil Edge Function `create-cv-invoice`.
2. Function itu ambil **harga dari database** (bukan dari request, supaya tidak bisa dimanipulasi),
   buat invoice di Xendit pakai **secret key** (aman, cuma ada di server), simpan baris `pending`
   di `cv_unlocks`, lalu balikin link pembayaran Xendit.
3. Browser diarahkan ke halaman pembayaran Xendit.
4. Setelah bayar, Xendit memanggil Edge Function `xendit-webhook` (dicek pakai
   **Webhook Verification Token**, supaya orang lain tidak bisa memalsukan "sudah bayar").
   Function ini update status jadi `paid`.
5. Xendit redirect pengunjung balik ke situs dengan token unlock di URL. Frontend panggil
   Edge Function `reveal-cv` dengan token itu — kalau memang sudah `paid`, kontak & sosial
   media kandidat ditampilkan di kartu CV terkait (dan disimpan di localStorage browser
   supaya tetap kelihatan kalau halaman di-refresh).

### Setup

1. **Jalankan schema:** seperti biasa, jalankan seluruh isi [`supabase/schema.sql`](./supabase/schema.sql)
   di SQL Editor Supabase — ini juga membuat tabel `cv_candidates`, view `cv_candidates_public`,
   dan tabel `cv_unlocks`.
2. **(Opsional) Isi data contoh:** jalankan [`supabase/seed_sample_cv.sql`](./supabase/seed_sample_cv.sql)
   kalau ingin lihat tampilan section-nya dulu dengan data fiktif, sebelum data kandidat asli siap.
   Hapus baris-barisnya (atau set `is_active = false`) begitu data asli sudah diinput.
3. **Install Supabase CLI** (kalau belum): `npm install -g supabase`, lalu `supabase login`.
4. **Link ke project:** `supabase link --project-ref <project-ref-kamu>` (project ref ada di URL
   dashboard Supabase).
5. **Set secrets** (isi placeholder dengan nilai asli):
   ```bash
   supabase secrets set \
     XENDIT_SECRET_KEY=xnd_development_xxxxxxxxxxxx \
     XENDIT_WEBHOOK_TOKEN=xxxxxxxxxxxxxxxx \
     SITE_URL=https://thrucorp.com
   ```
   - `XENDIT_SECRET_KEY` — dari dashboard Xendit → **Settings → API Keys**. Bisa pakai key
     **Test Mode** dulu (mulai dengan `xnd_development_`) untuk uji coba dengan pembayaran
     simulasi, meskipun akun Xendit masih dalam proses verifikasi — key **Live Mode**
     (`xnd_production_`) baru aktif setelah verifikasi selesai.
   - `XENDIT_WEBHOOK_TOKEN` — dari dashboard Xendit → **Settings → Webhooks** → **Verification Token**.
   - `SITE_URL` — domain situs kamu (dipakai untuk redirect setelah bayar).
6. **Deploy functions:**
   ```bash
   supabase functions deploy create-cv-invoice
   supabase functions deploy xendit-webhook
   supabase functions deploy reveal-cv
   ```
7. **Daftarkan webhook di Xendit:** dashboard Xendit → **Settings → Webhooks** → isi URL callback
   "Invoice Paid" dengan:
   ```
   https://<project-ref>.supabase.co/functions/v1/xendit-webhook
   ```

⚠️ **Sebelum mengisi data kandidat asli:** pastikan Thru360 memang punya hak untuk menampilkan
profil kandidat tersebut (walau nama disensor) dan menjual akses ke kontak/sosial media mereka —
ini data pribadi pihak ketiga, jadi butuh dasar hukum/consent yang jelas (lihat UU PDP), bukan
cuma keputusan teknis.

---

Dibuat dengan ❤️ — siap deploy, tinggal konfirmasi bagian bertanda TODO.
