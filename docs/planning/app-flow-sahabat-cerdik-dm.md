# Alur Aplikasi Sahabat CERDIK DM

## Pemahaman Arah Produk

Sahabat CERDIK DM lebih cocok diposisikan sebagai **aplikasi informasi dan edukasi kesehatan perempuan** dengan fokus pencegahan Diabetes Melitus, bukan sekadar landing page artikel.

Berarti arsitektur produk sebaiknya dibagi menjadi 2 area:

- **Area awal / public entry**
- **Area dashboard / setelah login**

Ini cocok dengan keinginan agar pengguna melihat deretan ikon di awal, lalu ketika klik diarahkan untuk login, dan setelah itu masuk ke dashboard aplikasi.

## Struktur Besar yang Disarankan

### 1. Public Entry

Halaman ini berfungsi sebagai:

- halaman pembuka brand
- pengenalan singkat tentang aplikasi
- titik masuk ke menu utama
- pemancing user untuk login

### 2. Auth Flow

Bagian ini berfungsi untuk:

- login
- daftar akun
- lupa password bila dibutuhkan

### 3. Dashboard

Halaman ini menjadi pusat navigasi utama aplikasi setelah user berhasil masuk.

Dashboard berisi ikon-ikon menu yang diambil langsung dari dokumen aplikasi.

## Alur yang Paling Masuk Akal

### Flow Utama

1. User membuka domain utama
2. User melihat halaman pembuka dengan ringkasan singkat dan deretan ikon menu
3. User klik salah satu ikon
4. Jika user belum login:
   - tampil halaman login / modal login
   - setelah berhasil login, diarahkan ke `dashboard.domain`
5. Jika user sudah login:
   - langsung diarahkan ke halaman terkait di dashboard

### Flow Setelah Login

1. User masuk ke `dashboard.domain`
2. User melihat dashboard dengan ikon menu utama
3. User pilih topik yang ingin dibuka
4. User masuk ke halaman konten / tools sesuai menu

## Rekomendasi Struktur Domain

### Opsi yang cocok

- `domain.com` untuk halaman awal / public
- `dashboard.domain.com` untuk area login dan aplikasi

Atau jika tetap satu domain:

- `domain.com/` untuk public
- `domain.com/dashboard` untuk aplikasi

Kalau mengikuti keinginanmu, struktur subdomain memang cocok:

- public entry lebih seperti halaman pengantar
- dashboard terasa seperti aplikasi yang terpisah

## Rekomendasi Halaman Awal

Halaman awal jangan terlalu penuh. Fokus utamanya:

- nama aplikasi
- ringkasan 1-2 kalimat
- tombol login / daftar
- grid ikon

### Komponen halaman awal

- header sederhana
- hero singkat
- grid ikon menu
- tombol `Masuk`
- tombol `Daftar`

### Perilaku ikon di halaman awal

Ada 2 pendekatan:

#### Opsi A: Semua ikon butuh login

Saat ikon diklik:

- jika belum login, arahkan ke login
- jika sudah login, buka modul terkait

Ini paling sesuai dengan arahanmu.

#### Opsi B: Konten dasar bisa dilihat tanpa login, tools butuh login

Contoh:

- `Tentang DM` dan `Pencegahan DM` bisa dibuka tanpa login
- `Deteksi Dini`, `Reminder`, dan personal area butuh login

Ini biasanya lebih bagus untuk produk informasi, tapi kalau kamu mau flow full-auth, Opsi A tetap bisa dipakai.

## Dashboard Setelah Login

Dashboard sebaiknya berbentuk **grid ikon menu utama**. Jangan langsung ramai dengan grafik atau data palsu.

Fokus dashboard:

- menu cepat
- ikon mudah dikenali
- akses ke topik utama dari docs

## Struktur Dashboard Berdasarkan Docs

Ikon-ikon di dashboard bisa disusun seperti ini:

### Grup 1: Menu Utama

- Tentang DM
- Pencegahan DM
- Deteksi Dini DM
- FAQ

### Grup 2: Fase Kehidupan Perempuan

- Remaja
- Reproduksi Dewasa
- Ibu Hamil
- Ibu Nifas dan Menyusui
- Reproduksi Usia Lanjut

### Grup 3: Fitur Pendukung

- Media Edukasi
- Reminder Harian
- Tentang Aplikasi
- Profil Saya

## Saran Susunan Dashboard

### Baris atas

- kartu sapaan singkat
- shortcut ke 3 aksi utama:
  - Mulai Cek Risiko
  - Pilih Fase Kehidupan
  - Lanjutkan Bacaan Terakhir

### Area utama

Grid ikon besar:

- Tentang DM
- Pencegahan DM
- Deteksi Dini
- Remaja
- Reproduksi Dewasa
- Ibu Hamil
- Ibu Nifas dan Menyusui
- Usia Lanjut
- FAQ
- Media Edukasi

### Area bawah

- reminder harian
- akses profil
- logout

## Alur Navigasi yang Disarankan

### Dari halaman awal ke login

- klik ikon
- muncul layar login
- setelah sukses login, redirect ke dashboard

### Dari dashboard ke modul

- klik ikon `Tentang DM`
- masuk ke halaman isi

- klik ikon `Ibu Hamil`
- masuk ke halaman fase ibu hamil

- klik ikon `Deteksi Dini`
- masuk ke tools skrining

## Saran Prioritas MVP

Kalau dibangun sebagai aplikasi informasi, MVP-nya menurutku seperti ini:

### Public

- halaman awal
- grid ikon
- login
- register

### Dashboard

- dashboard utama
- menu Tentang DM
- menu Pencegahan DM
- menu Fase Kehidupan
- menu Deteksi Dini
- menu FAQ

### Belum wajib di MVP

- riwayat aktivitas user
- reminder pintar
- bookmark
- progress tracker
- rekomendasi yang dipersonalisasi

## Saran UX Agar Tidak Membingungkan

Supaya flow-nya tetap enak:

- ikon di halaman awal dan dashboard harus konsisten
- nama menu harus sama dengan docs
- jangan terlalu banyak level submenu di awal
- dashboard jangan diisi data dummy
- halaman fase kehidupan harus langsung bisa dipahami tanpa banyak klik tambahan

## Rekomendasi Final

Kalau mengikuti keinginanmu, alur terbaiknya adalah:

1. **Halaman awal** berisi ikon-ikon utama
2. **Klik ikon** memicu login jika user belum masuk
3. **Setelah login** user masuk ke `dashboard.domain`
4. **Dashboard** menampilkan ikon-ikon menu utama berdasarkan docs
5. **Setiap ikon** membuka halaman informasi atau tools yang sesuai

## Bentuk Ikon yang Paling Cocok

Untuk isi dashboard nanti, ikon bisa mengikuti kelompok berikut:

- `Tentang DM`
- `Pencegahan DM`
- `Deteksi Dini`
- `Remaja`
- `Reproduksi Dewasa`
- `Ibu Hamil`
- `Ibu Nifas & Menyusui`
- `Usia Lanjut`
- `FAQ`
- `Media Edukasi`

## Keputusan Produk yang Saya Sarankan

Jika kamu ingin aplikasi terasa benar sebagai app informasi:

- **halaman awal** dibuat seperti portal masuk
- **login** muncul saat user mulai memilih menu
- **dashboard** jadi pusat semua ikon dan modul

Ini paling nyambung dengan keinginanmu dan juga masih sesuai dengan dokumen yang sudah kita rangkum.
