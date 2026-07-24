# Thru360 — Website (GitHub Pages)

Landing page resmi **Thru360** — mitra bisnis 360° (marketing, digital, finance, legal) sekaligus venture builder. Siap deploy ke GitHub Pages.

## 📁 Struktur File

```
/
├── index.html            ← Halaman utama (edit di sini)
├── privacy.html          ← Kebijakan Privasi
├── terms.html            ← Syarat & Ketentuan
├── logo.svg              ← Logo brand Anda
├── apple-touch-icon.png / favicon-32.png / site.webmanifest  ← Ikon & PWA manifest
├── assets/og-image.png   ← Gambar social preview (Open Graph/Twitter Card)
├── assets/logos/         ← Logo venture & brand kolaborasi (dipakai di section Portofolio & Kolaborasi)
├── .nojekyll             ← Wajib ada agar GitHub Pages bekerja dengan benar
├── supabase/schema.sql   ← Skema tabel + RLS untuk form Business Check-Up, Freelancer & Investor
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

Dibuat dengan ❤️ — siap deploy, tinggal konfirmasi bagian bertanda TODO.
