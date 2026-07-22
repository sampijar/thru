# Website — GitHub Pages

Halaman landing page siap deploy ke GitHub Pages.

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

## ✏️ Cara Kustomisasi

Buka `index.html` dengan teks editor (Notepad, VS Code, dll.) dan cari semua komentar `<!-- TODO: -->`:

| Yang perlu diubah | Cari teks ini |
|---|---|
| Judul browser & tab | `<title>Nama Brand` |
| Meta deskripsi & Open Graph/Twitter | `TODO: Isi deskripsi singkat...` |
| URL canonical & og:url (setelah domain aktif) | `namabrand.example.com` |
| Data terstruktur (JSON-LD) | blok `<script type="application/ld+json">` |
| Tagline utama | `Solusi Terbaik untuk` |
| Subtitle hero | `Kami hadir untuk mendorong...` |
| Angka statistik | `100+`, `5+`, dll. |
| Bagian "Tentang Kami" | section `id="tentang"` |
| Langkah proses kerja | section `id="proses"` |
| Nama kartu layanan | `Layanan Pertama`, dst. |
| Testimoni klien | section `id="testimoni"` |
| Pertanyaan & jawaban FAQ | section `id="faq"` |
| Email kontak | `hello@namabrand.com` |
| Nama perusahaan di footer | `Nama Brand. All rights reserved.` (tahun sudah otomatis) |

## ✨ Fitur

- **Mode gelap/terang** — tombol 🌙/☀️ di navbar, tersimpan di browser pengguna.
- **Menu mobile (hamburger)** — navigasi tetap bisa diakses penuh di layar kecil.
- **Section tambahan** — Proses Kerja, Testimoni, dan FAQ (accordion) siap diisi.
- **SEO & social preview** — meta description, Open Graph, Twitter Card, canonical URL, dan JSON-LD Organization.
- **Aksesibilitas** — skip link, `aria-*` pada menu, kontras warna terjaga di kedua tema, serta menghormati preferensi *reduced motion*.
- **Tombol kembali ke atas** dan tahun copyright yang otomatis diperbarui.

---

Dibuat dengan ❤️ — siap deploy, tinggal isi konten.
