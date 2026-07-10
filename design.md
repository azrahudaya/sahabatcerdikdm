# Design Direction

## Nama Produk

Sahabat CERDIK DM

## Dasar Arah Desain

Dokumen ini menerjemahkan kebutuhan produk di `website-plan-sahabat-cerdik-dm.md` ke arah visual yang bisa langsung dipakai saat mendesain dan membangun website.

Referensi visual dari pengguna menunjukkan karakter berikut:

- mobile-first
- tampilan seperti aplikasi kesehatan modern
- dominan kartu putih bertumpuk
- aksen warna coral hangat
- sudut membulat besar
- bayangan lembut tapi terasa dalam
- komposisi playful dan sedikit editorial

Tujuan dokumen ini adalah menjaga agar website terasa rapi, hangat, dan premium, tanpa jatuh ke tampilan `AI slop`, dashboard template, atau landing page SaaS generik.

## Prinsip Visual

### 1. Hangat, bukan dingin klinis

Website ini bergerak di domain kesehatan perempuan dan pencegahan DM. Karena itu tampilannya tidak boleh terasa seperti portal rumah sakit yang kaku. Gunakan nuansa hangat, suportif, dan membumi.

### 2. Ringan, bukan penuh ornamen

Visual boleh playful, tetapi tidak ramai. Setiap elemen harus membantu pemahaman konten, bukan sekadar dekorasi.

### 3. Modern editorial, bukan template app generik

Hindari pola UI yang terlalu default seperti:

- hero generik dengan ilustrasi orang melambaikan tangan
- gradient ungu-biru generik
- card statistik palsu
- ikon medis yang terlalu stok

### 4. Mobile-first yang benar

Arah visual utama harus terasa seperti pengalaman di layar ponsel, lalu diperluas ke tablet dan desktop. Referensi pengguna kuat di area ini, jadi layout desktop pun tetap sebaiknya terasa seperti susunan panel mobile yang diperbesar.

### 5. Human dan actionable

Konten ini berbicara soal pencegahan, skrining ringan, dan fase hidup perempuan. Desain harus membantu orang mengambil tindakan sederhana:

- pilih fase kehidupan
- pahami risiko
- cek IMT
- ukur lingkar perut
- baca saran tindak lanjut

## Kepribadian Brand

Brand Sahabat CERDIK DM sebaiknya terasa:

- hangat
- suportif
- jelas
- tidak menggurui
- tidak menakut-nakuti
- mudah dipahami
- cukup modern untuk dipercaya

Kata kunci visual:

- soft confidence
- women-centered
- preventive care
- practical wellness
- clean layered cards
- warm coral interface

## Tipografi

### Font utama

- `Manrope`

### Rekomendasi penggunaan

- Heading: Manrope 700-800
- Body: Manrope 400-500
- Label kecil / caption: Manrope 500-600

### Karakter tipografi yang diinginkan

- heading padat dan tegas
- body tetap lega dan mudah dibaca
- hindari letter spacing berlebihan
- hindari all caps untuk paragraf panjang

### Skala tipografi yang disarankan

- Hero title: 44-56px desktop, 32-38px mobile
- Section title: 28-36px desktop, 22-28px mobile
- Card title: 18-22px
- Body: 15-18px
- Small text: 13-14px

### Aturan tipografi

- gunakan line-height cukup lapang untuk teks edukasi
- heading boleh padat, tetapi paragraf harus ringan dibaca
- angka pada kalkulator dan hasil skrining harus lebih tegas daripada teks lain

## Palet Warna

Palet mengikuti semangat referensi visual, tetapi disesuaikan agar cocok untuk edukasi kesehatan perempuan dan tidak terasa seperti aplikasi asuransi.

### Core palette

- `Coral Primary`: `#FF5A6E`
- `Coral Deep`: `#E4485C`
- `Blush Mist`: `#FFF1F3`
- `Warm Ivory`: `#FCFAF7`
- `Graphite`: `#1F1A1B`
- `Slate Gray`: `#726A6C`
- `Soft Line`: `#E9E1E3`

### Supporting palette

- `Sage Calm`: `#C9D8C5`
- `Leaf Accent`: `#7FA26B`
- `Butter Cream`: `#F7E7B7`
- `Sky Hint`: `#DDECF7`

### Semantic palette

- Success: `#4D8B5F`
- Warning: `#D48A2C`
- Danger: `#C84B5D`
- Info: `#5B88A5`

### Aturan warna

- coral menjadi identitas utama untuk CTA, highlight, dan elemen penting
- warna netral tetap dominan agar konten medis terasa kredibel
- sage dan butter dipakai sebagai aksen penyeimbang, bukan warna utama
- hindari terlalu banyak warna aktif dalam satu section

## Permukaan dan Kedalaman

Referensi pengguna kuat di penggunaan kartu putih mengambang. Ini harus jadi bahasa visual utama.

### Surface system

- background utama: warm ivory atau putih dengan sedikit tint hangat
- kartu utama: putih solid
- panel sekunder: blush mist atau very light gray
- border: tipis dan halus, bukan outline hitam keras di semua komponen

### Shadow system

- shadow besar, lembut, dan difus
- gunakan beberapa layer shadow tipis, bukan satu shadow gelap
- kartu penting boleh terasa sedikit mengapung
- hindari shadow tajam ala neumorphism ekstrem

### Radius

- hero panel: 28-36px
- card umum: 20-28px
- chip dan tombol kecil: 999px atau 16-20px

## Bentuk dan Bahasa Layout

### Arah komposisi

Layout harus memakai kombinasi:

- section bersih dan lapang
- susunan kartu yang saling overlap ringan
- panel miring tipis atau offset halus untuk memberi rasa hidup

### Yang diambil dari referensi

- floating cards
- elemen bertumpuk
- CTA coral tegas
- ponsel sebagai bahasa utama

### Yang perlu diubah untuk Sahabat CERDIK DM

- lebih banyak ruang baca untuk artikel edukasi
- lebih sedikit rasa `insurance dashboard`
- lebih banyak struktur konten kesehatan dan langkah praktis
- elemen ilustratif sebaiknya mendukung fase kehidupan perempuan

### Grid yang disarankan

- Mobile: 4 kolom fleksibel
- Tablet: 8 kolom
- Desktop: 12 kolom

### Spacing system

- basis spacing: `4, 8, 12, 16, 20, 24, 32, 40, 56, 72`
- section desktop: 88-120px vertical spacing
- section mobile: 56-72px vertical spacing

## Arah Hero Section

Hero harus menjadi area paling khas. Jangan buat hero yang terlalu biasa.

### Konsep hero

Hero menampilkan website sebagai sahabat edukasi kesehatan perempuan dengan pendekatan visual seperti tumpukan kartu pada layar ponsel.

### Komposisi yang disarankan

- kiri atau atas: headline besar dan ringkas
- kanan atau bawah: mockup ponsel / frame device berisi kartu-kartu fitur
- floating cards di sekitar device:
  - card fase kehidupan
  - card hasil cek IMT
  - card notifikasi CERDIK
  - card skrining dini

### Isi hero

- headline: tegas dan tidak terlalu panjang
- subheadline: menekankan pencegahan DM pada perempuan sesuai fase kehidupan
- CTA utama: `Mulai Cek Risiko`
- CTA sekunder: `Pilih Fase Kehidupan`

### Karakter hero

- terang
- ringan
- optimis
- tidak terlalu formal
- tidak memakai ilustrasi stok generik besar

## Gaya Komponen

### Tombol

- bentuk rounded pill atau rounded rectangle besar
- tombol primer memakai coral
- teks tombol tegas, bukan terlalu tipis
- hover dan active memberi rasa padat, bukan glow berlebihan

### Card

Jenis card yang perlu ada:

- card fase kehidupan
- card CERDIK
- card hasil skrining
- card artikel singkat
- card FAQ
- card media edukasi

Karakter card:

- putih
- rounded
- shadow lembut
- punya hierarki isi yang jelas
- bisa memakai aksen warna kecil di header, badge, atau ikon

### Input dan form

Untuk kuis risiko, kalkulator IMT, dan lingkar perut:

- field besar dan jelas
- label mudah dibaca
- tombol radio dan checkbox tidak terlalu kecil
- hasil muncul dalam panel yang terasa penting

### Navigation

#### Mobile

- sticky top bar sederhana
- bottom navigation opsional jika ingin sangat app-like, tetapi jangan dipaksakan bila mengganggu struktur web

#### Desktop

- top navigation bersih
- tombol CTA jelas di kanan
- hindari navbar terlalu padat

### Badge dan chip

Badge dipakai untuk:

- fase kehidupan
- tingkat risiko
- kategori artikel
- status CERDIK

Gunakan warna lembut dengan teks kontras, bukan neon.

## Ilustrasi dan Ikon

### Ikon

Gunakan ikon yang:

- sederhana
- sedikit rounded
- terasa ramah
- konsisten stroke atau fill style-nya

Hindari:

- ikon medis stok yang terlalu generik
- campuran style outline dan fill tanpa aturan

### Ilustrasi

Jika memakai ilustrasi, arah yang cocok:

- sederhana
- editorial
- tubuh manusia atau perempuan digambarkan dengan sopan dan tidak terlalu detail
- bukan ilustrasi 3D generik

### Fotografi

Jika memakai foto:

- pakai foto real perempuan Indonesia bila tersedia
- hindari foto stok luar negeri yang terasa tidak relevan
- gunakan crop dekat, hangat, dan natural

## Motion

Motion harus membantu rasa modern, bukan sekadar hiasan.

### Motion yang disarankan

- kartu masuk dengan stagger halus
- hover card dengan elevasi ringan
- angka hasil kalkulator muncul dengan transisi lembut
- progress atau bar indikator bergerak singkat saat hasil tampil

### Hindari

- animasi bounce berlebihan
- parallax berat
- elemen melayang tanpa tujuan

## Halaman dan Arah Desainnya

## 1. Beranda

Karakter:

- paling ekspresif
- paling editorial
- jadi wajah brand

Komponen visual utama:

- hero device mockup + floating cards
- section fase kehidupan dengan kartu besar
- section CERDIK dengan 6 kartu ringkas
- section deteksi dini dengan kalkulator teaser
- section FAQ singkat

## 2. Tentang DM

Karakter:

- informatif
- lebih tenang
- tetap hangat

Arah visual:

- blok konten modular
- diagram ringan
- callout box untuk gejala dan faktor risiko

## 3. Pencegahan DM

Karakter:

- edukatif
- actionable

Arah visual:

- sistem 6 pilar CERDIK
- tiap pilar punya warna aksen kecil
- gunakan checklist, info block, dan kartu langkah

## 4. Halaman Fase Kehidupan

Karakter:

- personal
- spesifik
- terasa relevan untuk user

Arah visual:

- hero mini sesuai fase
- warna aksen bisa sedikit berubah per fase
- gunakan modul yang konsisten agar semua halaman terasa satu keluarga

### Saran aksen per fase

- Remaja: coral + butter
- Reproduksi dewasa: coral + blush
- Ibu hamil: coral + sage
- Nifas dan menyusui: blush + sage
- Usia lanjut: coral deep + warm neutral

## 5. Deteksi Dini DM

Karakter:

- sederhana
- jelas
- meyakinkan

Arah visual:

- stepper atau alur bertahap
- form satu kolom di mobile
- hasil akhir sangat jelas dan mudah dipahami

Hasil sebaiknya dibungkus dalam card besar dengan:

- label hasil
- ringkasan arti hasil
- saran tindak lanjut
- disclaimer non-diagnostik

## 6. FAQ dan Media Edukasi

Karakter:

- ringan
- cepat dipindai

Arah visual:

- accordion rapi
- kartu video atau artikel dengan thumbnail bersih

## Desain Khusus Agar Tidak Terlihat AI Slop

Hal yang perlu dijaga:

- gunakan 1 visual idea utama: floating health cards
- jangan campur terlalu banyak gaya sekaligus
- buat setiap section punya ritme ruang yang jelas
- gunakan copy asli dari dokumen, bukan placeholder generik
- tampilkan data dan fitur yang memang ada, jangan isi dengan angka dummy berlebihan
- beri perbedaan nyata antar halaman fase kehidupan
- pertahankan disiplin warna dan radius

Hal yang harus dihindari:

- blob gradient random di mana-mana
- ilustrasi wanita generik bergaya startup
- statistik palsu yang tidak relevan
- testimonial fiktif
- kartu terlalu banyak dalam satu layar
- icon set campur aduk

## Komponen Visual Khas yang Disarankan

Supaya brand punya ciri:

- floating reminder card CERDIK
- card hasil IMT dengan accent bar
- card fase kehidupan dengan ikon sederhana
- device mockup sebagai elemen hero
- info strip horizontal untuk gejala klasik DM

## Aksesibilitas

Tetap prioritaskan:

- kontras teks cukup
- body text minimum nyaman dibaca di mobile
- tombol besar dan jarak sentuh aman
- jangan bergantung hanya pada warna untuk menunjukkan hasil risiko
- semua hasil skrining harus punya label teks yang jelas

## Rekomendasi Implementasi Frontend

Jika nanti diubah jadi UI nyata:

- gunakan CSS variables untuk token warna, radius, spacing, shadow
- font `Manrope` dipakai global
- batasi maksimal 2 style shadow
- buat komponen card reusable
- gunakan container width yang tidak terlalu lebar agar nuansa mobile-first tetap terjaga

## Ringkasan Arah Desain

Sahabat CERDIK DM sebaiknya tampil sebagai website health education yang:

- modern
- hangat
- feminin secara halus, bukan stereotip
- mobile-first
- kuat di komposisi kartu bertumpuk
- rapi dan kredibel
- fokus membantu perempuan memahami dan mencegah DM

## Asumsi yang Dipakai

Dokumen ini dibuat dengan asumsi berikut:

- website dibangun lebih dulu sebagai produk web, bukan native app
- referensi visual dipakai sebagai arah estetika, bukan untuk ditiru mentah
- produk tetap perlu menjaga kredibilitas medis meskipun tampil ramah
- desain akan mengikuti materi dokumen yang sudah ada, bukan menambah fitur baru

## Hal yang Akan Membuat Dokumen Ini Lebih Lengkap

Kalau nanti ingin diperdalam lagi, input paling berguna adalah:

- apakah ingin terasa lebih feminin lembut atau lebih netral klinis
- apakah ingin ada logo/monogram khusus
- apakah ingin nuansa visual lebih lokal Indonesia atau lebih universal
- apakah nanti homepage lebih condong ke edukasi artikel atau app-like tool
- apakah kamu ingin aku lanjutkan jadi wireframe section-by-section
