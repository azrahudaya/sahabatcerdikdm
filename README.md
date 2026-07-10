# Sahabat CERDIK DM

Fondasi awal website edukasi pencegahan Diabetes Melitus pada perempuan, berbasis `Express` untuk backend dan `React + Vite` untuk frontend.

## Struktur

- `client/` - aplikasi React
- `server/` - API Express
- `website-plan-sahabat-cerdik-dm.md` - ringkasan produk dan MVP
- `design.md` - arah visual

## Stack

- Express.js
- React
- Vite
- React Router
- PostgreSQL untuk user register/login
- CSS kustom dengan token desain dari `design.md`

## Menjalankan Project

Cara paling mudah adalah memakai Docker:

```bash
npm run docker:up
```

Aplikasi production build akan tersedia di `http://localhost:5000`, termasuk API dan frontend. PostgreSQL berjalan di service `db` dan data user disimpan di volume Docker.

Untuk development lokal tanpa Docker penuh, nyalakan PostgreSQL terlebih dahulu lalu jalankan:

```bash
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:5173` dan API Express di `http://localhost:5000`.

Minimal environment backend:

```bash
DATABASE_URL=postgres://sahabat:sahabat_dev_password@localhost:5432/sahabat_cerdik_dm
AUTH_SECRET=change-this-secret-before-production
PUBLIC_APP_URL=http://localhost:5000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_SECURE=false
MAIL_FROM="Sahabat CERDIK DM <no-reply@example.com>"
PASSWORD_RESET_TTL_MINUTES=60
EMAIL_VERIFICATION_TTL_HOURS=24
```

Env SMTP bersifat opsional. Jika belum diisi, hasil skrining tetap tersimpan. Pada mode development,
tautan reset password dan verifikasi email ditampilkan di antarmuka untuk pengujian lokal. Pada mode
production, SMTP harus dikonfigurasi agar tautan tersebut dapat diterima pengguna.

## Script

```bash
npm run dev
npm run dev:client
npm run dev:server
npm run build
npm run start
npm run docker:up
npm run docker:down
```

## Scope Inisialisasi

Starter ini sudah mencakup:

- struktur monorepo ringan
- API Express dasar
- register dan login user dengan password hash
- homepage React yang mengikuti `design.md`
- route untuk halaman inti:
  - Beranda
  - Tentang DM
  - Pencegahan DM
  - Deteksi Dini
  - FAQ
  - Fase Kehidupan

## Catatan Konten

Konten awal disusun dari dokumen yang ada di repo. Beberapa bagian seperti `remaja`, `gizi seimbang`, dan detail penuh `deteksi dini` masih bisa diperdalam saat materi final tersedia.
