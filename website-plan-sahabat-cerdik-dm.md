# Rencana Website dan MVP

## Nama Produk

Sahabat CERDIK DM

## Dasar Penyusunan

Rencana ini disusun dari dokumen berikut yang ada di repo:

- `1. Beranda.docx`
- `2.1 Tentang Diabetes Melitus.docx`
- `2.2 Pencegahan DM.docx`
- `2.3.2   Reproduksi Dewasa (Edukasi Berdasarkan siklus).docx`
- `2.3.3 Ibu Hamil.docx`
- `2.3.4 Ibu Nifas dan Menyusui.docx`
- `2.3.5 Reproduksi Usia Lanjut.docx`
- `Tabel Menu Aplikasi Paket Media Edukasi DM.docx`

Dokumen ini sengaja menjaga arah website tetap sesuai source. Jika ada fitur atau halaman yang belum memiliki materi rinci di dokumen sumber, bagian itu ditandai sebagai `perlu materi lanjutan`.

## Ringkasan Produk

Sahabat CERDIK DM adalah website edukasi kesehatan perempuan yang berfokus pada pencegahan Diabetes Melitus melalui pendekatan promotif-preventif kebidanan, strategi CERDIK, dan edukasi berdasarkan siklus kehidupan perempuan.

Tujuan utama website:

- memberi edukasi DM yang mudah dipahami
- membantu perempuan mengenali faktor risiko lebih dini
- memberi panduan pencegahan berbasis CERDIK
- menyediakan materi sesuai fase kehidupan perempuan
- mendukung bidan atau tenaga kesehatan saat melakukan edukasi

## Target Pengguna

Target utama:

- perempuan Indonesia usia remaja sampai lanjut usia
- ibu hamil
- ibu nifas dan menyusui

Target pendukung:

- bidan
- tenaga kesehatan promotif-preventif
- keluarga yang mendampingi perempuan berisiko DM

## Konsep Website

Website sebaiknya dibangun sebagai platform edukasi yang sederhana, hangat, dan mudah dipakai di ponsel. Fungsi utamanya bukan konsultasi medis penuh, tetapi:

- pusat informasi pencegahan DM pada perempuan
- media belajar berdasarkan fase kehidupan
- alat skrining mandiri ringan
- pengarah tindak lanjut awal

Karakter website:

- mobile-first
- bahasa sederhana
- fokus pada tindakan praktis
- konten dibagi per fase kehidupan
- hasil skrining tidak bersifat diagnosis

## Struktur Utama Website

Struktur ini mengikuti `Tabel Menu Aplikasi Paket Media Edukasi DM.docx`.

### 1. Beranda

Isi utama:

- sambutan singkat
- tujuan aplikasi
- navigasi cepat ke menu utama
- navigasi cepat ke fase kehidupan perempuan
- pesan kunci pencegahan DM
- notifikasi edukasi harian dalam bentuk konten

Tujuan halaman:

- menjelaskan kenapa DM penting dicegah pada perempuan
- mengarahkan user ke jalur edukasi yang paling relevan

### 2. Menu Utama

#### 2.1 Tentang Diabetes Melitus

Subkonten dari dokumen:

- pengertian DM
- jenis DM
- faktor risiko DM pada perempuan
- tanda dan gejala awal DM
- dampak DM terhadap kesehatan perempuan

#### 2.2 Pencegahan DM

Subkonten dari dokumen:

- prinsip pencegahan DM
- gaya hidup sehat perempuan
- aktivitas fisik sesuai usia
- pengelolaan stres
- edukasi berdasarkan siklus kehidupan perempuan

#### 2.3 Perilaku CERDIK Berdasarkan Siklus Kehidupan

Fase yang tercantum pada menu:

- remaja
- reproduksi dewasa
- ibu hamil
- ibu nifas dan menyusui
- reproduksi usia lanjut

Setiap fase idealnya memakai pola konten yang konsisten:

- risiko DM pada fase tersebut
- C: cek kesehatan berkala
- E: enyahkan asap rokok
- R: rajin aktivitas fisik
- D: diet sehat dan gizi seimbang
- I: istirahat cukup
- K: kelola stres

Tambahan konten spesifik sesuai dokumen:

- reproduksi dewasa: perencanaan kehamilan sehat
- ibu hamil: risiko diabetes gestasional, aktivitas fisik aman saat hamil, pemantauan berat badan selama kehamilan
- ibu nifas dan menyusui: manfaat menyusui terhadap pencegahan DM, pemantauan berat badan selama nifas
- reproduksi usia lanjut: pencegahan komplikasi DM

Catatan:

- fase `remaja` ada di tabel menu, tetapi materi rinci remaja belum ada pada file yang tersedia saat ini

#### 2.4 Gizi Seimbang

Submenu pada tabel:

- prinsip 3J (Jumlah, Jenis, Jadwal)
- contoh menu harian
- indeks glikemik makanan
- tips membaca label makanan
- contoh camilan sehat

Catatan:

- menu ini sudah tercantum di tabel, tetapi materi rinci belum ditemukan sebagai dokumen terpisah pada folder saat ini

#### 2.5 Deteksi Dini DM

Submenu pada tabel:

- kuis faktor risiko DM
- kalkulator IMT
- pengukuran lingkar perut
- kapan harus cek gula darah
- rekomendasi tindak lanjut

Tujuan halaman:

- membantu user melakukan skrining awal secara mandiri
- memberi hasil sederhana dan arahan lanjutan

### 3. Menu Tambahan

Submenu pada tabel:

- tentang aplikasi
- tim pengembang
- sumber referensi ilmiah
- kebijakan privasi
- media edukasi
- FAQ
- evaluasi dan umpan balik

Rincian tambahan dari tabel:

- video edukasi DM bagi remaja
- video edukasi DM bagi ibu hamil
- video pembuatan minuman untuk mencegah DM bagi remaja
- video pembuatan camilan sehat mencegah DM bagi ibu hamil
- pertanyaan umum seputar DM
- mitos dan fakta DM pada perempuan
- pre-test dan post-test edukasi
- kuis Sahabat CERDIK DM

## Arsitektur Halaman yang Disarankan

### A. Alur Navigasi Utama

1. User masuk ke beranda
2. User memilih salah satu jalur:
   - belajar tentang DM
   - belajar pencegahan
   - pilih fase kehidupan
   - cek risiko
3. User membaca konten ringkas dan praktis
4. User menjalankan skrining mandiri
5. User mendapat saran tindak lanjut awal

### B. Pola Template Halaman Fase Kehidupan

Setiap halaman fase kehidupan sebaiknya punya urutan tetap:

1. ringkasan fase
2. risiko DM pada fase itu
3. poin CERDIK khusus fase itu
4. tanda yang perlu diwaspadai
5. kapan perlu periksa ke fasilitas kesehatan
6. tautan ke deteksi dini
7. artikel terkait

Ini penting agar seluruh halaman terasa konsisten walaupun topiknya berbeda.

## User Flow yang Paling Penting

### Flow 1: Pengunjung umum

- buka beranda
- baca pesan utama CERDIK
- masuk ke Tentang DM atau Pencegahan DM
- lanjut ke kuis risiko atau kalkulator IMT

### Flow 2: Pengguna berdasarkan fase kehidupan

- pilih fase kehidupan dari beranda
- baca edukasi sesuai fase
- lihat saran CERDIK yang relevan
- gunakan alat skrining dasar
- lihat rekomendasi tindak lanjut

### Flow 3: Ibu hamil

- masuk ke halaman ibu hamil
- pelajari risiko DMG
- lihat informasi skrining usia kehamilan 24-28 minggu
- cek panduan berat badan dan gaya hidup
- baca kapan harus memeriksakan gula darah

### Flow 4: Bidan atau tenaga kesehatan

- gunakan website sebagai media konseling
- buka materi fase yang sesuai pasien
- arahkan pasien mengisi kuis risiko atau kalkulator IMT

## MVP yang Disarankan

MVP harus fokus pada nilai inti dari dokumen: edukasi + skrining mandiri dasar + navigasi per fase kehidupan.

### Halaman wajib MVP

- beranda
- tentang DM
- pencegahan DM
- fase reproduksi dewasa
- fase ibu hamil
- fase ibu nifas dan menyusui
- fase reproduksi usia lanjut
- fase remaja sebagai placeholder jika materi belum lengkap
- deteksi dini DM
- FAQ dasar
- tentang aplikasi
- sumber referensi ilmiah
- kebijakan privasi

### Fitur wajib MVP

- navigasi per fase kehidupan perempuan
- penyajian materi CERDIK
- kuis faktor risiko DM sederhana
- kalkulator IMT
- panduan ukur lingkar perut
- hasil rekomendasi sederhana
- status hasil dengan bahasa non-diagnostik
- desain responsif untuk mobile

### Bentuk hasil skrining MVP

Hasil skrining cukup sederhana, misalnya:

- risiko rendah
- perlu waspada
- disarankan cek ke fasilitas kesehatan

Tambahkan catatan bahwa hasil tidak menggantikan diagnosis dokter atau tenaga kesehatan.

### Yang belum perlu masuk MVP

- login dan akun pengguna
- simpan riwayat hasil
- dashboard personal
- notifikasi alarm otomatis atau push notification
- integrasi WhatsApp
- chatbot
- konsultasi langsung
- dashboard bidan
- pre-test dan post-test interaktif penuh
- CMS admin yang kompleks

## Kenapa Scope MVP Ini Paling Cocok

Karena seluruh elemen di bawah ini memang sudah kuat di dokumen:

- edukasi DM perempuan
- edukasi per fase kehidupan
- perilaku CERDIK
- kuis risiko
- kalkulator IMT
- pengukuran lingkar perut
- rekomendasi tindak lanjut

Sedangkan fitur seperti alarm pengingat harian, evaluasi lanjutan, dan personalisasi masih lebih cocok jadi tahap setelah MVP.

## Bentuk Implementasi MVP Per Halaman

### Beranda

Komponen:

- hero title: Sahabat CERDIK DM
- ringkasan misi aplikasi
- shortcut ke 5 fase kehidupan
- shortcut ke Tentang DM, Pencegahan, dan Cek Risiko
- blok pesan CERDIK
- blok notifikasi edukasi harian versi statis

### Tentang DM

Komponen:

- apa itu DM
- jenis DM
- faktor risiko pada perempuan
- gejala awal
- dampak terhadap kesehatan perempuan

### Pencegahan DM

Komponen:

- pencegahan primer, sekunder, tersier
- gaya hidup sehat perempuan
- penjelasan CERDIK
- aktivitas fisik sesuai usia
- pengelolaan stres

### Halaman Fase Kehidupan

Komponen umum:

- risiko DM
- cek kesehatan berkala
- asap rokok
- aktivitas fisik
- diet sehat
- istirahat cukup
- kelola stres

Komponen khusus:

- reproduksi dewasa: perencanaan kehamilan sehat
- ibu hamil: DMG, skrining 24-28 minggu, pemantauan berat badan
- nifas dan menyusui: manfaat menyusui, pemantauan berat badan pasca persalinan
- usia lanjut: pencegahan komplikasi DM

### Deteksi Dini DM

Komponen:

- kuis faktor risiko
- kalkulator IMT
- panduan lingkar perut
- kapan harus cek gula darah
- rekomendasi tindak lanjut

## Backlog Setelah MVP

Fase berikutnya bisa mengikuti isi tabel menu dan kebutuhan produk:

- halaman gizi seimbang yang lebih lengkap
- media edukasi video
- mitos vs fakta
- pre-test dan post-test edukasi
- kuis Sahabat CERDIK DM
- notifikasi harian otomatis
- penyimpanan hasil skrining
- mode edukasi untuk bidan atau kelas ibu

## Gap Dokumen yang Perlu Diperhatikan

Supaya build tetap sesuai sumber, ada beberapa gap yang perlu dicatat:

- materi rinci fase remaja belum ada di file yang tersedia
- materi rinci `Gizi Seimbang` belum ada sebagai dokumen terpisah
- materi rinci `Deteksi Dini DM` belum ada sebagai dokumen terpisah, meski fitur-fiturnya disebut jelas di tabel
- konten `FAQ`, `Media Edukasi`, `Pre-test/Post-test`, dan `Kuis Sahabat CERDIK DM` masih perlu materi lanjutan

## Rekomendasi Eksekusi

Urutan kerja paling aman:

1. finalisasi sitemap berdasarkan tabel menu
2. rapikan seluruh copy dari dokumen menjadi struktur halaman website
3. bangun MVP content-first
4. tambahkan fitur skrining dasar
5. validasi isi bersama penyusun materi
6. lanjut ke media edukasi dan fitur engagement

## Definisi MVP Dalam Satu Kalimat

MVP Sahabat CERDIK DM adalah website edukasi pencegahan Diabetes Melitus pada perempuan berdasarkan siklus kehidupan, yang menyediakan materi CERDIK dan skrining mandiri dasar dengan rekomendasi awal yang mudah dipahami.
