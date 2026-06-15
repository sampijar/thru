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
| Judul browser & tab | `<title>Nama Brand</title>` |
| Tagline utama | `Solusi Terbaik untuk` |
| Subtitle hero | `Kami hadir untuk mendorong...` |
| Angka statistik | `100+`, `5+`, dll. |
| Nama kartu layanan | `Layanan Pertama`, dst. |
| Email kontak | `hello@namabrand.com` |
| Copyright footer | `© 2025 Nama Brand` |

---

Dibuat dengan ❤️ — siap deploy, tinggal isi konten.
