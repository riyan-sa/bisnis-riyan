# Katalog UMKM + Order WhatsApp

Template workshop vibe coding Creative Hub App Talent (CHAT) 2026. Repo ini berisi tampilan aplikasi katalog UMKM; tugasmu merangkainya menjadi sistem utuh dengan bantuan AI: database, login admin, keamanan, dan pemesanan lewat WhatsApp.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FUSERNAME%2Fkatalog-umkm)

> Untuk pengelola repo: ganti `USERNAME` pada link tombol di atas dengan akun GitHub pemilik repo template ini.

## Langkah awal

1. **Salin repo ke akun GitHub-mu.** Klik tombol **Deploy with Vercel** di atas. Vercel akan membuat repo baru di akun GitHub-mu dan langsung men-deploy-nya. Setelah selesai, buka link Vercel-mu: katalog tampil dengan data contoh.
2. **Buat proyek Supabase.** Masuk ke [supabase.com](https://supabase.com) dengan akun GitHub, lalu buat proyek baru. Simpan password database di tempat aman.
3. **Siapkan database.** Di Supabase, buka **SQL Editor**, tempel seluruh isi `docs/schema.sql`, lalu klik **Run**. Tabel `produk` beserta data awal akan terbentuk.
4. **Siapkan akun admin.** Ikuti panduan akun admin yang dibagikan mentor. Setelah itu matikan pendaftaran akun baru di **Authentication > Sign In / Providers**.
5. **Isi environment variable di Vercel.** Buka proyekmu di Vercel > **Settings > Environment Variables**, lalu isi tiga variabel dari `.env.example`. Nilainya ada di Supabase > **Project Settings > API**. Setelah itu lakukan **Redeploy**.
6. **Clone repo ke laptop.**

   ```bash
   git clone https://github.com/<akunmu>/<nama-repo>.git
   cd <nama-repo>
   npm install
   ```

7. **Buat file `.env.local`.** Salin `.env.example` menjadi `.env.local`, lalu isi dengan nilai yang sama seperti di Vercel.
8. **Jalankan di laptop.**

   ```bash
   npm run dev
   ```

   Buka `http://localhost:3000`.

## Alur kerja

Kerjakan satu user story setiap kali, lalu simpan dan kirim perubahan:

```bash
git add .
git commit -m "US-01: katalog dari database"
git push
```

Setiap `git push`, Vercel otomatis men-deploy versi terbaru. Cek hasilnya di link Vercel-mu.

Urutan yang disarankan: US-01, US-02, US-03, US-04, US-05, US-06, lalu fitur bonus. Daftar lengkap ada di `docs/user-stories.md`.

## Isi repo

| File atau folder | Isi |
| --- | --- |
| `AGENTS.md` | Aturan untuk AI agent, dibaca sebelum setiap prompt |
| `DESIGN.md` | Panduan warna, huruf, dan komponen |
| `PROMPTS.md` | Jurnal prompt, wajib diisi |
| `docs/` | Problem statement, PRD, user story, rancangan teknis, skema database, checklist |
| `lib/toko.js` | Nama toko, nomor WhatsApp, alamat, jam buka |
| `app/` | Halaman aplikasi |
| `components/` | Komponen tampilan |

## Menyesuaikan dengan usahamu

- Identitas toko: ubah `lib/toko.js`.
- Warna: ubah bagian `@theme` di `app/globals.css` (lihat `DESIGN.md`).
- Produk: ubah langsung di Supabase > **Table Editor > produk**.

## Aturan penting

- Jangan menyimpan kunci atau password di kode, dan jangan push file `.env.local`.
- Jangan memberi awalan `NEXT_PUBLIC_` pada environment variable.
- Isi `PROMPTS.md` setiap menyelesaikan fitur.

## Sebelum mengumpulkan

1. Jalankan semua poin di `docs/checklist-keamanan.md` dan `docs/checklist-pengujian.md` pada link Vercel.
2. Lengkapi bagian di bawah ini.
3. Push perubahan terakhir sebelum batas waktu.

## Tentang Web Ini

**Toko Riyan** adalah aplikasi web katalog produk UMKM modern yang memudahkan calon pembeli melihat daftar produk dan melakukan pemesanan secara langsung lewat WhatsApp. Aplikasi ini juga dilengkapi dengan panel admin yang aman untuk mengelola katalog produk dan akun toko.

### Fitur Utama

#### Untuk Pengunjung (Calon Pembeli)
- **Katalog Produk Dinamis (US-01):** Menampilkan seluruh produk toko yang diambil langsung dari database Supabase secara server-side, lengkap dengan foto, nama, kategori, dan harga berformat rupiah.
- **Detail Produk (US-02):** Halaman khusus per produk (`/produk/[id]`) untuk melihat deskripsi lengkap dan foto produk, dengan penanganan halaman 404 jika produk tidak ditemukan.
- **Pemesanan via WhatsApp (US-03):** Tombol "Pesan via WhatsApp" yang membuka obrolan ke nomor resmi toko dengan pesan yang sudah terisi otomatis (nama dan harga produk).

#### Untuk Pemilik Toko (Admin)
- **Login Admin Aman (US-04):** Autentikasi menggunakan Supabase Auth dengan `@supabase/ssr` dan cookie berbasis Server Actions.
- **Ganti Password (US-05):** Fitur untuk mengganti password bawaan admin dengan validasi minimal 8 karakter di sisi server.
- **Proteksi Halaman Admin (US-06):** Seluruh rute `/admin` (kecuali `/admin/login`) terlindungi oleh `proxy.js`, memastikan pengunjung yang belum login dialihkan ke halaman login.
- **Manajemen Produk dari Database (US-07 s/d US-10):**
  - Melihat daftar produk langsung dari database (`/admin`).
  - Menambah produk baru (`/admin/produk/baru`).
  - Mengubah data produk yang ada (`/admin/produk/[id]/ubah`).
  - Menghapus produk dengan dialog konfirmasi.
  - Seluruh aksi manipulasi data terlindungi login di sisi server dan mematuhi Row Level Security (RLS).

### Arsitektur & Teknologi
- **Framework:** Next.js 16 (App Router, Server Components & Server Actions)
- **Styling:** Tailwind CSS 4
- **Database & Auth:** Supabase (PostgreSQL dengan RLS aktif, Supabase Auth via `@supabase/ssr`)
- **Deployment:** Vercel

---

## Tentang aplikasi ini

- **Nama usaha:** Toko Riyan
- **Tagline:** Produk Lokalan Orang Depok, siap dipesan lewat WhatsApp.
- **Pembuat:** Riyan
- **Nomor WhatsApp Toko:** 6288213701982
- **Fitur yang diselesaikan:** US-01 (Katalog DB), US-02 (Detail Produk), US-03 (Pesan via WhatsApp), US-04 (Login Admin), US-05 (Ganti Password), US-06 (Proteksi Admin / proxy.js), US-07 (List Produk Admin DB), US-08 (Tambah Produk), US-09 (Ubah Produk), US-10 (Hapus Produk).
