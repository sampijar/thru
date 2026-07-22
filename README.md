# Thru360 — Website (GitHub Pages)

Landing page resmi **Thru360** — mitra bisnis 360° (marketing, digital, finance, legal) sekaligus venture builder. Siap deploy ke GitHub Pages.

## 📁 Struktur File

```
/
├── index.html      ← Halaman utama (edit di sini)
├── logo.svg        ← Logo brand Anda
├── .nojekyll       ← Wajib ada agar GitHub Pages bekerja dengan benar
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
| Layanan (`#layanan`) | Growth & Marketing, Finance & Advisory, Digital Solutions, Legal & Compliance |
| Proses (`#proses`) | Discover → Strategize → Execute → Optimize → Scale |
| Portofolio (`#portofolio`) | **Venture: Citrust** (konsultan F&B), **Briga** (konsultan bisnis berkelanjutan), **Tilde** (software house), **FundHub** (konsultasi keuangan & funding) + industri yang dilayani |
| Studi Kasus (`#studi-kasus`) | Skinmade, Resoult.co, PowerBuilding Gym, TPR Metallurgy |
| Kolaborasi | Daftar brand & institusi partner |
| Testimoni | Kutipan dari Gary Miller (PowerBuilding) & Adrian Allo (Jenggala Semesta) |
| FAQ (`#faq`) | Pertanyaan umum seputar Thru360 |
| Kontak (`#kontak`) | Varian Ferandanes De Lima · +(62) 811 944 0998 · partnership@thrucorp.com |

## ✨ Fitur

- **Mode gelap/terang** — tombol 🌙/☀️ di navbar, tersimpan di browser pengguna.
- **Menu mobile (hamburger)** — navigasi tetap bisa diakses penuh di layar kecil.
- **SEO & social preview** — meta description, Open Graph, Twitter Card, canonical URL, dan JSON-LD Organization.
- **Aksesibilitas** — skip link, `aria-*` pada menu, kontras warna terjaga di kedua tema, serta menghormati preferensi *reduced motion*.
- **Tombol kembali ke atas** dan tahun copyright yang otomatis diperbarui.
- **CTA langsung ke WhatsApp** & email tim partnership.

---

Dibuat dengan ❤️ — siap deploy, tinggal konfirmasi bagian bertanda TODO.
