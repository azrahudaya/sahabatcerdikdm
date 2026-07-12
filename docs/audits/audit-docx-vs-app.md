# Audit DOCX vs Aplikasi Sahabat CERDIK DM

Tanggal audit: 23 Juni 2026

## Ruang lingkup

Audit ini membandingkan aplikasi React/Express yang ada saat ini dengan delapan dokumen Word di root proyek:

- `../source-docx/1. Beranda.docx`
- `../source-docx/2.1 Tentang Diabetes Melitus.docx`
- `../source-docx/2.2 Pencegahan DM.docx`
- `../source-docx/2.3.2   Reproduksi Dewasa (Edukasi Berdasarkan siklus).docx`
- `../source-docx/2.3.3 Ibu Hamil.docx`
- `../source-docx/2.3.4 Ibu Nifas dan Menyusui.docx`
- `../source-docx/2.3.5 Reproduksi Usia Lanjut.docx`
- `../source-docx/Tabel Menu Aplikasi Paket Media Edukasi DM.docx`

Status yang digunakan:

- `SUDAH`: fungsi atau materi utama sudah tersedia.
- `SEBAGIAN`: sudah ada halaman atau ringkasan, tetapi isi atau perilakunya belum memenuhi dokumen.
- `BELUM`: belum tersedia atau masih berupa placeholder.

## Kesimpulan eksekutif

Aplikasi sudah memiliki fondasi produk yang nyata: landing page, akun, dashboard, FINDRISC, penyimpanan hasil, riwayat, report PDF, email hasil, reminder WhatsApp, materi dasar, fase kehidupan, FAQ, mitos dan fakta, serta umpan balik. Jadi proyek ini bukan lagi sekadar prototipe visual.

Namun, aplikasi belum dapat disebut lengkap terhadap dokumen. Bagian paling matang adalah autentikasi dan alat skrining. Bagian yang paling tertinggal adalah kedalaman materi edukasi per fase, media edukasi asli, evaluasi pre-test/post-test, referensi ilmiah, privasi, dan penyesuaian alur skrining untuk ibu hamil serta remaja. Secara objektif, statusnya adalah **MVP fungsional, tetapi belum document-complete dan belum production-ready untuk aplikasi edukasi kesehatan**.

## Temuan prioritas tertinggi

### P0. Alur FINDRISC belum aman untuk seluruh fase

Semua halaman fase, termasuk ibu hamil, mengarahkan pengguna ke FINDRISC yang sama melalui tombol `Mulai skrining` (`client/src/pages/PhasePage.jsx:31`). Dokumen ibu hamil justru meminta edukasi diabetes melitus gestasional, pemeriksaan khusus, dan skrining usia kehamilan 24-28 minggu. FINDRISC adalah estimasi risiko DM tipe 2 dalam 10 tahun pada orang dewasa dan bukan alat diagnosis diabetes gestasional.

Aplikasi memang menampilkan peringatan agar ibu hamil memeriksakan diri ke tenaga kesehatan (`client/src/pages/DeteksiDiniPage.jsx:516`), tetapi tidak melakukan penyaringan kondisi sebelum kuis. Usia minimum juga 18 tahun (`client/src/utils/screening.js:56`), sedangkan dokumen menempatkan remaja sebagai salah satu sasaran utama.

Perbaikan wajib:

- Tambahkan pertanyaan gerbang sebelum FINDRISC: usia, sedang hamil atau tidak, sudah pernah didiagnosis DM atau tidak, dan gejala yang membutuhkan pemeriksaan segera.
- Arahkan ibu hamil ke alur informasi DM gestasional dan anjuran pemeriksaan tenaga kesehatan, bukan langsung ke skor risiko 10 tahun.
- Arahkan pengguna di bawah 18 tahun ke materi remaja dan pemeriksaan profesional, bukan menolak angka tanpa penjelasan.
- Jangan gunakan FINDRISC sebagai satu-satunya pintu `Deteksi Dini` untuk seluruh fase kehidupan.

### P0. Materi medis dari dokumen belum memiliki validasi dan sitasi yang dapat diperiksa

Halaman sumber masih menyatakan bahwa referensi dan validasi akan ditambahkan (`client/src/content/siteContent.js:495`). Tidak ada daftar pustaka, tahun publikasi, tautan, validator medis, maupun sitasi per klaim. Ini penting karena dokumen memuat angka ambang, target kesehatan, klaim penurunan risiko, akupresur, dan bahan herbal/TOGA.

Dokumen sumber juga memiliki bagian yang perlu diselaraskan sebelum dipublikasikan, antara lain perbedaan kategori IMT, target tekanan darah kehamilan yang tidak konsisten, serta anjuran biji pala, pare, kayu manis, dan akupresur yang belum disertai sumber yang terlihat. Konten tersebut tidak boleh dipindahkan ke aplikasi secara otomatis tanpa review tenaga kesehatan.

Perbaikan wajib:

- Tetapkan satu pedoman klinis utama dan tahun versinya.
- Minta dokter, bidan, ahli gizi, atau dosen kesehatan yang relevan meninjau setiap fase.
- Tampilkan daftar referensi nyata dan sumber singkat pada klaim berangka atau berisiko.
- Tandai tanggal review dan nama/role validator materi.

### P0. Privasi belum sebanding dengan data kesehatan yang disimpan

Aplikasi menyimpan identitas, email/nomor WhatsApp, pilihan fase, hasil skrining, jadwal reminder, evaluasi, dan umpan balik. Kontrol data sudah lebih baik: pengguna dapat ekspor data, menghapus satu hasil skrining, menghapus seluruh riwayat skrining, dan menghapus akun beserta data terkait. Yang masih belum selesai adalah consent eksplisit, masa retensi, kebijakan final, dan penjelasan pihak pemroses pesan/email.

Perbaikan wajib:

- Buat kebijakan privasi final sebelum rilis publik.
- Tambahkan consent yang spesifik untuk akun, data skrining, email hasil, dan WhatsApp.
- Pertahankan kontrol hapus satu hasil, hapus seluruh riwayat, ekspor data, dan hapus akun sebagai bagian kebijakan final.
- Jelaskan retensi, keamanan, dan keterlibatan provider email/WhatsApp.

### P0. Konfigurasi Docker masih konfigurasi pengembangan

Docker memakai `AUTH_SECRET: change-this-secret-before-production`, password database statis, SMTP kosong, dan `WHATSAPP_PROVIDER: mock` (`docker-compose.yml:23`). Akibatnya email dan WhatsApp nyata tidak aktif pada konfigurasi default, sementara secret tersebut tidak aman untuk deployment publik.

Perbaikan wajib:

- Pindahkan secret dan password ke `.env` yang tidak masuk Git.
- Gagal-start pada mode production bila `AUTH_SECRET` masih nilai default.
- Konfigurasikan SMTP dan provider pesan nyata, atau tampilkan status fitur belum aktif secara jujur.
- Batasi CORS pada domain produksi.

## Matriks kesesuaian menu dokumen

| Kebutuhan dokumen | Status | Kondisi aplikasi saat ini | Kekurangan utama |
| --- | --- | --- | --- |
| Beranda dan pengantar aplikasi | SEBAGIAN | Hero, ikon menu, fase, dan CERDIK tersedia | Tujuan aplikasi dan notifikasi edukasi harian dari dokumen dipadatkan; tidak ada rekomendasi personal setelah login |
| Tentang DM | SUDAH/SEBAGIAN | Pengertian, tipe, faktor risiko perempuan, gejala, dan dampak tersedia (`siteContent.js:588`) | Masih ringkasan dan visual placeholder; sumber tiap klaim belum ada |
| Pencegahan DM | SEBAGIAN | Primer, sekunder, tersier, dan gambaran fase tersedia (`siteContent.js:665`) | Penjelasan CERDIK, aktivitas berdasarkan usia, stres, relaksasi, dan contoh praktis belum sedalam dokumen |
| CERDIK | SEBAGIAN | Enam singkatan tampil pada landing dan fase | Belum menjadi program aktivitas terstruktur; personalisasi dan tindak lanjut tiap langkah masih minim |
| Remaja | SEBAGIAN | Ada kartu dan halaman ringkas | Tidak ada dokumen fase remaja khusus di root; isi saat ini belum memiliki sumber materi setara empat fase lain |
| Reproduksi dewasa | SEBAGIAN | Risiko, PCOS, DM gestasional terdahulu, dan CERDIK diringkas | Perencanaan kehamilan sehat, pemeriksaan mandiri siklus, contoh aktivitas, menu, dan dukungan keluarga belum menjadi modul nyata |
| Ibu hamil | SEBAGIAN | Skrining 24-28 minggu dan peringatan umum disebut | Tidak ada alur DM gestasional khusus, jadwal ANC, pemantauan berat badan, menu, aktivitas aman, dan ilustrasi dokumen |
| Ibu nifas dan menyusui | SEBAGIAN | Pemulihan, berat badan, menyusui, dan CERDIK diringkas | Manfaat menyusui, pemantauan pascapersalinan, senam nifas, menu, dukungan keluarga, dan tindak lanjut DMG belum lengkap |
| Reproduksi usia lanjut | SEBAGIAN | Aktivitas, berat badan, pemeriksaan rutin, dan komplikasi disebut | PATUH, perawatan kaki, senam lansia, pola makan, pencegahan jatuh, dan komplikasi belum menjadi materi rinci |
| Gizi 3J | SEBAGIAN | Jumlah, jenis, jadwal dijelaskan (`siteContent.js:735`) | Tidak ada menu harian konkret, tabel contoh indeks glikemik, label pangan beranotasi, resep/camilan, dan penyesuaian per fase |
| Deteksi dini | SUDAH/SEBAGIAN | Wizard FINDRISC, IMT, lingkar perut, skor, tindak lanjut, simpan otomatis, riwayat, PDF, dan email tersedia | Belum menanyakan PCOS, status kehamilan, riwayat bayi >4 kg secara langsung, gejala, atau diagnosis DM; tidak ada panduan visual ukur lingkar perut |
| Kapan cek gula darah | SEBAGIAN | Disebut dalam materi dan hasil skrining | Belum menjadi decision flow yang jelas berdasarkan gejala, kehamilan, riwayat, dan kategori risiko |
| Reminder harian | SEBAGIAN | CRUD jadwal WhatsApp, test message, penyimpanan PostgreSQL, dan fokus otomatis berdasarkan fase/hari CERDIK tersedia | Default provider masih mock pada konfigurasi pengembangan; perlu verifikasi pengiriman nyata di produksi |
| Media edukasi | BELUM | Halaman dan slot tersedia (`siteContent.js:389`) | Semua masih placeholder; empat video yang disebut dokumen belum ada; audio relaksasi juga belum ada |
| FAQ | SEBAGIAN | Empat FAQ tersedia (`siteContent.js:850`) | Cakupan belum mewakili semua pertanyaan praktis dalam dokumen fase dan skrining |
| Mitos dan fakta | SUDAH | Enam kartu informasi tersedia | Tetap membutuhkan sumber ilmiah dan tanggal review |
| Evaluasi pengguna | SEBAGIAN | Pre-test, post-test, kuis CERDIK, riwayat evaluasi, dan form kepuasan tersedia | Pertanyaan masih dasar dan perlu diselaraskan dengan validator serta materi final |
| Tentang aplikasi | SEBAGIAN | Halaman ringkas tersedia | Masih generik dan menggunakan placeholder |
| Tim pengembang/validator | BELUM | Halaman shell tersedia | Tidak ada nama tim, peran, identitas validator, atau kontak resmi (`siteContent.js:470`) |
| Sumber referensi ilmiah | BELUM | Halaman shell tersedia | Tidak ada bibliografi atau tautan sumber (`siteContent.js:495`) |
| Kebijakan privasi | SEBAGIAN | Halaman penjelasan sementara, export data, hapus hasil, hapus riwayat, dan hapus akun tersedia | Belum berupa kebijakan final; consent eksplisit, retensi, dan provider email/WhatsApp belum lengkap |

## Audit konten per area

### Tentang Diabetes Melitus

Struktur lima topik utama dokumen sudah dipetakan: definisi, jenis, faktor risiko perempuan, tanda/gejala, dan dampak. Halaman ini paling dekat dengan kebutuhan dokumen. Kekurangannya adalah contoh visual masih kotak placeholder (`client/src/pages/TopicPage.jsx:24`), tidak ada sitasi, dan materi terlalu pendek untuk beberapa faktor khusus perempuan seperti PCOS dan riwayat DM gestasional.

### Pencegahan DM

Aplikasi mengubah dokumen panjang menjadi empat artikel pendek. Ini baik untuk keterbacaan mobile, tetapi terlalu banyak substansi hilang. Aktivitas berdasarkan kelompok usia, contoh pengelolaan stres, metode relaksasi, dukungan keluarga, dan tindakan CERDIK yang operasional belum tersedia. Audio atau teks relaksasi yang diminta dokumen juga belum ada.

### Fase kehidupan

Komponen fase hanya merender fokus, tip CERDIK, tanda waspada, dan kapan perlu cek (`client/src/pages/PhasePage.jsx:49`). Pola ini konsisten, tetapi semua fase menjadi terlalu seragam dan kehilangan kebutuhan khas masing-masing fase. Dokumen sebenarnya menyediakan isi yang jauh lebih kaya, termasuk tindakan, menu, aktivitas, pemeriksaan, dukungan keluarga, dan ilustrasi.

### Gizi

Semua heading utama dokumen sudah ada, tetapi isi masih berupa prinsip umum. `Contoh menu harian` bahkan belum menampilkan susunan menu nyata (`client/src/content/siteContent.js:776`). Aplikasi membutuhkan contoh yang konkret dan terukur tanpa berubah menjadi pemberi terapi individual.

### Deteksi dini

Implementasi teknisnya matang: validasi angka, perhitungan FINDRISC, progress, idempotency agar hasil tidak tersimpan ganda, riwayat akun, dan report. Backend memvalidasi serta menyimpan hasil ke PostgreSQL (`server/src/index.js:820`, `server/src/index.js:877`). Email hasil dipanggil setelah penyimpanan (`server/src/index.js:943`).

Perbedaan penting: deskripsi konten menyatakan faktor PCOS, DM gestasional, dan bayi >4 kg (`client/src/content/siteContent.js:810`), tetapi pertanyaan FINDRISC aktual hanya aktivitas, sayur/buah, obat tekanan darah, riwayat gula tinggi, dan keluarga (`client/src/utils/screening.js:1`). Artinya janji halaman dan formulir aktual belum sepenuhnya sama.

### Media dan aset dokumen

Dokumen Word memuat aset visual bermakna seperti Isi Piring Sehat, pemeriksaan mandiri siklus, akupresur stres, senam hamil, contoh piring ibu hamil, dukungan keluarga, TOGA/biji pala, senam nifas, senam lansia, dan piring sehat lansia. Aset tersebut belum digunakan di aplikasi. Saat ini `TopicPage`, `PhasePage`, dan `DashboardInfoPage` masih memakai shape abu-abu melalui `ImagePlaceholder`.

Dokumen tabel menu juga menyebut empat media video: edukasi DM remaja, edukasi DM ibu hamil, minuman pencegahan untuk remaja, dan camilan sehat ibu hamil. Keempatnya belum tersedia sebagai konten yang dapat diputar.

## Audit alur dan navigasi

- Route utama dan route dashboard sudah lengkap secara teknis (`client/src/App.jsx:54`).
- Dashboard hanya menonjolkan Cek Risiko, Reminder, Gizi, dan Fase (`client/src/pages/DashboardPage.jsx:7`). Tentang DM, Pencegahan, FAQ, dan fase individual tidak menjadi menu utama seperti struktur dokumen.
- Klik ikon landing sebelum login menyimpan maksud tujuan, tetapi dashboard hanya menampilkan nama modul dan tidak membuka modul tujuan. `moduleLabel` hanya dipakai sebagai hint (`client/src/pages/DashboardPage.jsx:76`).
- Pilihan fase tersimpan pada profil, tetapi dampaknya masih sebatas kartu/label. Pilihan tersebut belum menyusun urutan materi, reminder, atau rekomendasi yang personal.
- Riwayat skrining tersedia di dashboard dan halaman cek risiko. Ini sudah sesuai kebutuhan produk dan lebih baik daripada rencana awal.

## Audit backend dan kualitas teknis

### Yang sudah baik

- Akun register/login, verifikasi email, reset password, ubah password, profil, dan token tersedia.
- Hasil skrining disimpan per pengguna di PostgreSQL.
- Penyimpanan hasil memakai idempotency key untuk mencegah duplikasi (`server/src/index.js:885`).
- Reminder dapat dibuat, diubah, dinonaktifkan, dihapus, dan dites.
- Docker Compose menyatukan app dan PostgreSQL.

### Yang masih kurang

- Reminder dan umpan balik masih disimpan di file JSON (`server/src/index.js:30`), bukan PostgreSQL. Ini rawan race condition dan sulit diskalakan ke lebih dari satu instance.
- Rate limit disimpan dalam `Map` memory (`server/src/index.js:39`), sehingga hilang saat restart dan tidak sinkron antar-instance.
- Provider WhatsApp default adalah mock dan SMTP kosong, sehingga integrasi nyata belum aktif pada Docker default.
- Test milik aplikasi sudah mencakup utilitas FINDRISC dan integration test API dasar untuk auth, pemisahan data skrining antar-user, reminder, evaluasi, feedback, dan export akun. Cakupan yang masih belum ada adalah email nyata, PDF, routing UI, end-to-end browser, serta regresi visual.
- Belum terlihat monitoring, audit log tindakan sensitif, backup/restore database, dan health check khusus app.

## Cakupan yang sudah kuat

- Responsivitas dan struktur web-app mobile sudah terbentuk.
- Autentikasi dan pemisahan data skrining per akun sudah tersedia.
- FINDRISC memiliki alur per langkah yang mudah diikuti.
- Hasil dapat tersimpan otomatis, dilihat kembali, dan dicetak sebagai PDF.
- Reminder memiliki lifecycle lengkap pada UI dan API.
- Tentang DM, FAQ, mitos/fakta, gizi, pencegahan, serta lima fase sudah mempunyai route dan struktur dasar.

## Roadmap yang disarankan

### Tahap 1: keselamatan dan kepercayaan

1. Validasi seluruh materi medis dan selesaikan konflik isi dokumen.
2. Tambahkan gate kehamilan, usia, diagnosis, dan gejala sebelum FINDRISC.
3. Publikasikan referensi ilmiah, validator, disclaimer, dan tanggal review.
4. Finalkan consent, kebijakan privasi, masa retensi, dan penjelasan provider email/WhatsApp.
5. Amankan secret Docker dan pisahkan konfigurasi development/production.

### Tahap 2: melengkapi MVP berdasarkan dokumen

1. Bangun template artikel fase yang mendukung pemeriksaan, CERDIK, aktivitas, gizi/menu, dukungan keluarga, dan kapan mencari bantuan.
2. Isi empat fase yang memiliki DOCX terlebih dahulu; tandai materi remaja sebagai belum lengkap sampai sumber resminya tersedia.
3. Lengkapi halaman gizi dengan menu, indeks glikemik, label, dan camilan yang sudah divalidasi.
4. Gunakan aset visual dokumen yang legal dan layak, lalu ganti placeholder prioritas tinggi.
5. Perbaiki redirect setelah login agar ikon yang dipilih benar-benar membuka modul tujuan.

### Tahap 3: media, evaluasi, dan operasional

1. Tambahkan empat video yang direncanakan dan audio relaksasi.
2. Tambahkan pre-test, post-test, dan kuis edukasi; pisahkan dari form kepuasan.
3. Personalisasikan reminder berdasarkan fase dan pola CERDIK mingguan.
4. Migrasikan reminder dan feedback ke PostgreSQL.
5. Perluas integration test, tambahkan end-to-end test, monitoring, backup, dan health check.

## Definisi selesai yang disarankan

Aplikasi dapat dianggap sesuai dokumen ketika seluruh menu pada tabel kebutuhan memiliki konten nyata, setiap fase memiliki isi khas dan tervalidasi, media tidak lagi placeholder, alur deteksi dini aman untuk kelompok khusus, sumber ilmiah dapat diperiksa, data pengguna dapat dikendalikan pemiliknya, serta email/WhatsApp benar-benar bekerja pada konfigurasi produksi. Sampai syarat tersebut terpenuhi, posisi yang paling tepat adalah **beta edukasi internal**, bukan layanan kesehatan publik yang final.
