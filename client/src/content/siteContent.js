export const siteContent = {
  brand: {
    name: "Sahabat CERDIK DM",
    tagline: "Langkah sehat untuk perempuan."
  },
  navigation: [
    { label: "Beranda", to: "/" },
    { label: "Tentang DM", to: "/tentang-dm" },
    { label: "Pencegahan", to: "/pencegahan-dm" },
    { label: "Gizi Seimbang", to: "/gizi-seimbang" },
    { label: "Deteksi Dini", to: "/deteksi-dini" },
    { label: "FAQ", to: "/faq" },
    { label: "Dashboard", to: "/dashboard" }
  ],
  home: {
    title: "Teman ringkas mengenali risiko DM.",
    description:
      "Sahabat CERDIK DM membantu pengguna membaca informasi penting, cek risiko awal, dan menjaga kebiasaan sehat lewat reminder sederhana.",
    primaryCta: {
      label: "Masuk ke aplikasi",
      to: "/dashboard"
    },
    secondaryCta: {
      label: "Cek risiko dulu",
      to: "/deteksi-dini"
    },
    visual: {
      title: "Preview dashboard aplikasi",
      size: "960 x 720 px",
      note: "Bisa dibuat sebagai mockup layar aplikasi berisi icon menu, hasil cek risiko, dan reminder CERDIK."
    }
  },
  entryModules: [
    {
      id: "tentang-dm",
      label: "Tentang DM",
      icon: "DM",
      iconSrc: "/menu-icons/dm.png",
      tone: "blush",
      description: "Dasar informasi diabetes pada perempuan.",
      to: "/tentang-dm"
    },
    {
      id: "pencegahan-dm",
      label: "Pencegahan",
      icon: "PG",
      iconSrc: "/menu-icons/pg.png",
      tone: "sage",
      description: "Langkah CERDIK dan pola hidup sehat.",
      to: "/pencegahan-dm"
    },
    {
      id: "gizi-seimbang",
      label: "Gizi Seimbang",
      icon: "3J",
      iconSrc: "/menu-icons/3j.png",
      tone: "butter",
      description: "Jumlah, jenis, jadwal, dan pilihan makan harian.",
      to: "/gizi-seimbang"
    },
    {
      id: "deteksi-dini",
      label: "Deteksi Dini",
      icon: "DD",
      iconSrc: "/menu-icons/dd.png",
      tone: "coral-deep",
      description: "Kuis risiko, IMT, dan lingkar perut.",
      to: "/deteksi-dini"
    },
    {
      id: "fase-kehidupan",
      label: "Fase Kehidupan",
      icon: "FK",
      iconSrc: "/menu-icons/fk.png",
      tone: "sage-soft",
      description: "Pilih materi sesuai kondisi pengguna.",
      to: "#fase-kehidupan"
    },
    {
      id: "media-edukasi",
      label: "Media Edukasi",
      icon: "ME",
      iconSrc: "/menu-icons/me.png",
      tone: "blush",
      description: "Ruang video dan infografis edukasi.",
      to: "/dashboard/media-edukasi"
    }
  ],
  cerdik: [
    {
      letter: "C",
      title: "Cek kesehatan",
      description: "Mulai dari pengecekan dasar yang rutin."
    },
    {
      letter: "E",
      title: "Enyahkan asap rokok",
      description: "Jaga diri dari rokok aktif maupun pasif."
    },
    {
      letter: "R",
      title: "Rajin aktivitas fisik",
      description: "Biasakan tubuh aktif setiap hari."
    },
    {
      letter: "D",
      title: "Diet seimbang",
      description: "Pilih makan yang lebih teratur dan seimbang."
    },
    {
      letter: "I",
      title: "Istirahat cukup",
      description: "Tidur cukup membantu tubuh tetap stabil."
    },
    {
      letter: "K",
      title: "Kelola stres",
      description: "Tenangkan pikiran dengan cara yang sederhana."
    }
  ],
  tools: [
    {
      title: "Kuis Faktor Risiko",
      description: "Beberapa pertanyaan singkat untuk mulai mengenali risiko.",
      link: "/deteksi-dini"
    },
    {
      title: "Kalkulator IMT",
      description: "Cek apakah berat badan sudah mendekati target sehat.",
      link: "/deteksi-dini"
    },
    {
      title: "Lingkar Perut",
      description: "Panduan ukur sederhana yang mudah diikuti.",
      link: "/deteksi-dini"
    },
    {
      title: "Kapan Cek Gula Darah",
      description: "Petunjuk kapan sebaiknya lanjut periksa.",
      link: "/deteksi-dini"
    }
  ],
  reminders: [
    {
      day: "Senin",
      title: "Cek IMT dan lingkar perut",
      detail: "Mulai minggu dengan cek sederhana."
    },
    {
      day: "Selasa",
      title: "Jauhi asap rokok",
      detail: "Jaga tubuh dari paparan asap."
    },
    {
      day: "Rabu",
      title: "Gerak 30 menit",
      detail: "Luangkan waktu untuk lebih aktif."
    },
    {
      day: "Kamis",
      title: "Atur makan lebih seimbang",
      detail: "Pilih makan yang lebih teratur."
    },
    {
      day: "Jumat",
      title: "Tidur cukup",
      detail: "Tubuh butuh istirahat yang cukup."
    },
    {
      day: "Sabtu",
      title: "Kelola stres",
      detail: "Cari jeda untuk menenangkan diri."
    },
    {
      day: "Minggu",
      title: "Kenali gejala klasik DM",
      detail: "Perhatikan tanda-tanda yang terasa tidak biasa."
    }
  ],
  dashboard: {
    title: "Dashboard Sahabat CERDIK DM",
    summary: [
      {
        label: "Fase",
        value: "5",
        body: "Jalur edukasi perempuan"
      },
      {
        label: "CERDIK",
        value: "6",
        body: "Perilaku pencegahan inti"
      },
      {
        label: "Skrining",
        value: "3",
        body: "Risiko, IMT, lingkar perut"
      }
    ],
    recommendedPath: [
      {
        title: "Kenali fase",
        body: "Pilih materi yang paling dekat dengan kondisi saat ini.",
        to: "/#fase-kehidupan"
      },
      {
        title: "Cek risiko",
        body: "Isi kuis singkat, IMT, dan lingkar perut.",
        to: "/deteksi-dini"
      },
      {
        title: "Rapikan kebiasaan",
        body: "Baca pencegahan, gizi seimbang, dan CERDIK.",
        to: "/pencegahan-dm"
      }
    ],
    sections: [
      {
        id: "menu-utama",
        title: "Menu Utama",
        description: "Akses cepat ke materi inti aplikasi.",
        items: [
          {
            id: "tentang-dm",
            label: "Tentang DM",
            icon: "DM",
            iconSrc: "/menu-icons/dm.png",
            tone: "blush",
            description: "Pengertian, gejala, dan faktor risiko.",
            to: "/tentang-dm"
          },
          {
            id: "pencegahan-dm",
            label: "Pencegahan",
            icon: "PG",
            iconSrc: "/menu-icons/pg.png",
            tone: "sage",
            description: "CERDIK, gaya hidup, dan pencegahan bertahap.",
            to: "/pencegahan-dm"
          },
          {
            id: "gizi-seimbang",
            label: "Gizi Seimbang",
            icon: "3J",
            iconSrc: "/menu-icons/3j.png",
            tone: "butter",
            description: "Jumlah, jenis, jadwal, label makanan, dan camilan sehat.",
            to: "/gizi-seimbang"
          },
          {
            id: "deteksi-dini",
            label: "Deteksi Dini",
            icon: "DD",
            iconSrc: "/menu-icons/dd.png",
            tone: "coral-deep",
            description: "Kuis risiko, IMT, lingkar perut, dan tindak lanjut.",
            to: "/deteksi-dini"
          },
          {
            id: "faq",
            label: "FAQ",
            icon: "FAQ",
            tone: "butter",
            description: "Jawaban singkat untuk pertanyaan umum.",
            to: "/faq"
          }
        ]
      },
      {
        id: "fase-kehidupan",
        title: "Fase Kehidupan",
        description: "Pilih materi yang paling dekat dengan kondisi pengguna.",
        items: [
          {
            id: "remaja",
            label: "Remaja",
            icon: "R",
            tone: "butter",
            description: "Bangun kebiasaan sehat sejak dini.",
            to: "/fase/remaja"
          },
          {
            id: "reproduksi-dewasa",
            label: "Reproduksi Dewasa",
            icon: "RD",
            tone: "blush",
            description: "Jaga keseimbangan tubuh dan siapkan kehamilan sehat.",
            to: "/fase/reproduksi-dewasa"
          },
          {
            id: "ibu-hamil",
            label: "Ibu Hamil",
            icon: "IH",
            tone: "sage",
            description: "Fokus pada pemantauan dan keamanan kehamilan.",
            to: "/fase/ibu-hamil"
          },
          {
            id: "ibu-nifas-menyusui",
            label: "Ibu Nifas & Menyusui",
            icon: "NM",
            tone: "sage-soft",
            description: "Pemulihan tubuh, berat badan, dan menyusui.",
            to: "/fase/ibu-nifas-menyusui"
          },
          {
            id: "usia-lanjut",
            label: "Usia Lanjut",
            icon: "UL",
            tone: "coral-deep",
            description: "Tetap aktif dan rutin memeriksa kondisi tubuh.",
            to: "/fase/usia-lanjut"
          }
        ]
      },
      {
        id: "fitur-pendukung",
        title: "Fitur Pendukung",
        description: "Pelengkap aplikasi berdasarkan struktur docs.",
        items: [
          {
            id: "media-edukasi",
            label: "Media Edukasi",
            icon: "ME",
            iconSrc: "/menu-icons/me.png",
            tone: "blush",
            description: "Video, materi visual, dan media belajar ringan.",
            to: "/dashboard/media-edukasi"
          },
          {
            id: "mitos-fakta",
            label: "Mitos & Fakta",
            icon: "MF",
            tone: "coral-deep",
            description: "Klarifikasi singkat seputar DM pada perempuan.",
            to: "/dashboard/mitos-fakta"
          },
          {
            id: "evaluasi-edukasi",
            label: "Evaluasi Edukasi",
            icon: "EV",
            tone: "butter",
            description: "Pre-test, post-test, dan kuis Sahabat CERDIK DM.",
            to: "/dashboard/evaluasi"
          },
          {
            id: "reminder-harian",
            label: "Reminder Harian",
            icon: "RH",
            iconSrc: "/menu-icons/re.png",
            tone: "sage",
            description: "Pengingat mingguan berbasis langkah CERDIK.",
            to: "/dashboard/reminder-harian"
          },
          {
            id: "tentang-aplikasi",
            label: "Tentang Aplikasi",
            icon: "APP",
            tone: "coral-deep",
            description: "Ringkasan fungsi aplikasi dan arah pengembangannya.",
            to: "/dashboard/tentang-aplikasi"
          },
          {
            id: "tim-pengembang",
            label: "Tim Pengembang",
            icon: "TP",
            tone: "blush",
            description: "Ruang identitas tim penyusun aplikasi.",
            to: "/dashboard/tim-pengembang"
          },
          {
            id: "sumber-referensi",
            label: "Sumber Referensi",
            icon: "SR",
            tone: "sage-soft",
            description: "Catatan sumber materi dan batasan informasi.",
            to: "/dashboard/sumber-referensi"
          },
          {
            id: "kebijakan-privasi",
            label: "Kebijakan Privasi",
            icon: "KP",
            tone: "butter",
            description: "Penjelasan data akun, skrining, dan reminder.",
            to: "/dashboard/kebijakan-privasi"
          },
          {
            id: "umpan-balik",
            label: "Umpan Balik",
            icon: "UB",
            tone: "sage",
            description: "Saran pengguna untuk pengembangan konten dan UI.",
            to: "/dashboard/umpan-balik"
          }
        ]
      }
    ]
  },
  dashboardPages: {
    mediaEdukasi: {
      title: "Media Edukasi",
      intro: "Bagian ini disiapkan untuk menampung video, infografis, dan materi visual sesuai paket media edukasi DM.",
      placeholders: [
        {
          title: "Video edukasi DM remaja",
          size: "1280 x 720 px",
          note: "Thumbnail video untuk risiko DM remaja, minuman manis, aktivitas fisik, dan kebiasaan harian."
        },
        {
          title: "Video edukasi DM ibu hamil",
          size: "1280 x 720 px",
          note: "Thumbnail video untuk DM gestasional, skrining 24-28 minggu, gizi, dan kontrol kehamilan."
        },
        {
          title: "Video minuman pencegahan remaja",
          size: "1280 x 720 px",
          note: "Thumbnail resep/minuman rendah gula untuk remaja. Isi final perlu validasi gizi."
        },
        {
          title: "Video camilan sehat ibu hamil",
          size: "1280 x 720 px",
          note: "Thumbnail camilan sehat untuk ibu hamil. Isi final perlu validasi bidan/ahli gizi."
        },
        {
          title: "Infografis carousel",
          size: "1080 x 1350 px",
          note: "Gunakan untuk gejala, faktor risiko, atau langkah pencegahan."
        }
      ],
      points: [
        {
          title: "Video edukasi",
          body: "Prioritas awal mengikuti dokumen: edukasi DM remaja, edukasi DM ibu hamil, minuman pencegahan remaja, dan camilan sehat ibu hamil."
        },
        {
          title: "Infografis ringkas",
          body: "Materi visual singkat cocok untuk gejala, pencegahan, dan langkah CERDIK."
        },
        {
          title: "Audio relaksasi",
          body: "Dapat ditambahkan sebagai media pendukung pilar Kelola Stres setelah naskah dan validasinya siap."
        }
      ]
    },
    reminderHarian: {
      title: "Reminder Harian",
      intro: "Bagian ini menjadi ruang untuk pengingat sederhana yang membantu menjaga ritme sehat sepanjang minggu.",
      placeholders: [
        {
          title: "Mockup kalender reminder",
          size: "1080 x 1080 px",
          note: "Bisa berisi kartu Senin-Minggu dengan satu kebiasaan CERDIK per hari."
        }
      ],
      points: [
        {
          title: "Pengingat mingguan",
          body: "Isi reminder dapat mengikuti pola Senin sampai Minggu yang sudah ada di dokumen."
        },
        {
          title: "Fokus kebiasaan kecil",
          body: "Setiap pengingat sebaiknya singkat, ringan, dan mudah dijalankan."
        },
        {
          title: "Siap dikembangkan",
          body: "Ke depan, bagian ini bisa dihubungkan ke notifikasi atau jadwal personal."
        }
      ]
    },
    tentangAplikasi: {
      title: "Tentang Aplikasi",
      intro: "Sahabat CERDIK DM disusun sebagai aplikasi informasi kesehatan perempuan dengan fokus pencegahan Diabetes Melitus.",
      placeholders: [
        {
          title: "Diagram alur aplikasi",
          size: "1200 x 720 px",
          note: "Bisa berisi alur Beranda, Login, Dashboard, Cek Risiko, dan Fase Kehidupan."
        }
      ],
      points: [
        {
          title: "Berbasis fase kehidupan",
          body: "Materi dibagi agar lebih relevan untuk remaja, usia reproduksi, ibu hamil, ibu nifas, dan usia lanjut."
        },
        {
          title: "Fokus edukasi",
          body: "Aplikasi ini membantu pengguna memahami informasi, bukan menggantikan pemeriksaan tenaga kesehatan."
        },
        {
          title: "Arah pengembangan",
          body: "Dashboard, reminder, dan media edukasi bisa terus diperluas mengikuti kebutuhan produk."
        }
      ]
    },
    timPengembang: {
      title: "Tim Pengembang",
      intro: "Halaman ini disiapkan sebagai ruang identitas tim penyusun, validator materi, dan pengembang media edukasi.",
      placeholders: [
        {
          title: "Foto atau ilustrasi tim",
          size: "1200 x 720 px",
          note: "Bisa berisi foto tim, suasana penyusunan materi, atau ilustrasi kolaborasi."
        }
      ],
      points: [
        {
          title: "Penyusun materi",
          body: "Bagian ini dapat diisi nama penyusun materi edukasi DM dan fase kehidupan perempuan."
        },
        {
          title: "Validator kesehatan",
          body: "Sebelum publikasi, materi sebaiknya ditinjau oleh dosen, bidan, atau tenaga kesehatan yang relevan."
        },
        {
          title: "Pengembang aplikasi",
          body: "Bagian ini dapat mencatat pihak yang mengembangkan website, visual, dan media interaktif."
        }
      ]
    },
    sumberReferensi: {
      title: "Sumber Referensi",
      intro: "Catatan sumber awal yang dipakai untuk menyusun MVP edukasi. Materi tetap perlu ditinjau oleh validator kesehatan sebelum rilis publik.",
      points: [
        {
          title: "Basis materi",
          body: "Konten MVP disusun dari dokumen menu aplikasi, materi diabetes melitus, pencegahan DM, serta edukasi berdasarkan siklus kehidupan perempuan."
        },
        {
          title: "Metode FINDRISC",
          body: "Skrining memakai FINDRISC sebagai alat non-lab untuk memperkirakan risiko DM tipe 2 pada pengguna dewasa. Hasilnya bukan diagnosis."
        },
        {
          title: "Batasan medis",
          body: "Ibu hamil, remaja, pengguna yang sudah didiagnosis DM, atau pengguna dengan keluhan menetap diarahkan ke materi dan pemeriksaan tenaga kesehatan, bukan skor risiko umum."
        },
        {
          title: "Perlu validasi",
          body: "Angka ambang, anjuran fase khusus, serta konten herbal atau teknik relaksasi dari dokumen perlu review tenaga kesehatan sebelum dipublikasikan sebagai materi final."
        }
      ],
      links: [
        {
          label: "Lindstrom & Tuomilehto, Diabetes Care 2003",
          description: "Riset awal Diabetes Risk Score/FINDRISC untuk prediksi risiko DM tipe 2.",
          href: "https://pubmed.ncbi.nlm.nih.gov/12610029/"
        },
        {
          label: "ADA Type 2 Diabetes Risk Test",
          description: "Contoh penekanan bahwa risk test bukan diagnosis dan hasil perlu dikonfirmasi di fasilitas kesehatan.",
          href: "https://diabetes.org/diabetes-risk-test"
        },
        {
          label: "ADA Standards of Care in Diabetes 2026",
          description: "Pedoman klinis tahunan untuk diagnosis, pencegahan, dan manajemen diabetes.",
          href: "https://diabetes.org/newsroom/press-releases/american-diabetes-association-releases-standards-care-diabetes-2026"
        },
        {
          label: "CDC Diabetes During Pregnancy",
          description: "Rujukan umum tentang diabetes pada kehamilan, tes DM gestasional, dan tindak lanjut setelah melahirkan.",
          href: "https://www.cdc.gov/maternal-infant-health/pregnancy-diabetes/index.html"
        }
      ]
    },
    kebijakanPrivasi: {
      title: "Kebijakan Privasi",
      intro: "Ringkasan privasi MVP. Halaman ini menjelaskan data yang dipakai dan kontrol awal yang sudah tersedia di akun.",
      points: [
        {
          title: "Data yang digunakan",
          body: "Aplikasi menyimpan nama, nomor WhatsApp atau email, pilihan fase, hasil skrining, reminder WhatsApp, dan umpan balik."
        },
        {
          title: "Tujuan penggunaan",
          body: "Data dipakai untuk memisahkan akun, menyimpan riwayat skrining, mengirim ringkasan hasil, dan menjalankan reminder yang dibuat pengguna."
        },
        {
          title: "Kontrol pengguna",
          body: "Pengguna dapat mengubah profil, mengekspor data akun, menghapus satu hasil skrining, menghapus seluruh riwayat skrining, atau menghapus akun beserta data terkait dari halaman profil."
        },
        {
          title: "Tahap produksi",
          body: "Sebelum rilis publik, aplikasi tetap perlu kebijakan final, persetujuan eksplisit, retensi data, dan penjelasan provider email/WhatsApp."
        }
      ]
    }
  },
  mitosFakta: {
    title: "Mitos & Fakta DM pada Perempuan",
    intro:
      "Klarifikasi singkat untuk membantu pengguna membedakan informasi yang perlu dipercaya dan yang perlu diperiksa ulang.",
    items: [
      {
        myth: "DM hanya terjadi pada usia lanjut.",
        fact: "Risiko memang meningkat dengan usia, tetapi perempuan remaja, usia reproduksi, ibu hamil, dan ibu nifas juga bisa memiliki faktor risiko."
      },
      {
        myth: "Kalau belum ada gejala, berarti aman.",
        fact: "DM bisa berkembang perlahan. Skrining tetap penting bila ada faktor risiko seperti riwayat keluarga, obesitas, PCOS, atau riwayat DM gestasional."
      },
      {
        myth: "Ibu hamil tidak perlu cek gula darah jika merasa sehat.",
        fact: "Skrining diabetes gestasional tetap penting, terutama pada usia kehamilan 24-28 minggu atau bila ada faktor risiko sejak awal."
      },
      {
        myth: "Pencegahan DM harus diet ekstrem.",
        fact: "Pencegahan lebih realistis dimulai dari pola makan seimbang, aktivitas fisik, tidur cukup, dan pengelolaan stres."
      },
      {
        myth: "Menyusui tidak ada hubungannya dengan risiko DM.",
        fact: "Materi fase nifas dan menyusui menekankan bahwa menyusui dapat membantu pemulihan metabolik dan mendukung berat badan ibu."
      },
      {
        myth: "Hasil kuis risiko sama dengan diagnosis.",
        fact: "Kuis hanya skrining edukatif. Diagnosis tetap perlu pemeriksaan tenaga kesehatan."
      }
    ]
  },
  feedback: {
    title: "Umpan Balik Aplikasi",
    intro:
      "Form ringan untuk mencatat apakah materi sudah jelas, mudah dipakai, dan cocok untuk kebutuhan pengguna.",
    topics: [
      "Materi mudah dipahami",
      "Tampilan nyaman di ponsel",
      "Alur cek risiko jelas",
      "Konten fase kehidupan relevan"
    ]
  },
  evaluation: {
    title: "Evaluasi Edukasi",
    intro:
      "Pre-test, post-test, dan kuis singkat untuk mengecek pemahaman pengguna setelah membaca materi.",
    modes: [
      {
        id: "pretest",
        label: "Pre-test",
        description: "Isi sebelum belajar untuk melihat pemahaman awal."
      },
      {
        id: "posttest",
        label: "Post-test",
        description: "Isi setelah membaca materi untuk membandingkan perkembangan."
      },
      {
        id: "quiz",
        label: "Kuis CERDIK",
        description: "Latihan ringan seputar fitur dan pesan utama aplikasi."
      }
    ],
    questions: [
      {
        id: "app-purpose",
        question: "Apa tujuan utama Sahabat CERDIK DM?",
        options: [
          { value: "education", label: "Memberi edukasi, cek risiko awal, dan reminder kebiasaan sehat." },
          { value: "diagnosis", label: "Menggantikan diagnosis dokter." },
          { value: "medicine", label: "Menentukan obat diabetes." }
        ],
        answer: "education",
        explanation: "Aplikasi bersifat edukatif dan membantu tindak lanjut awal, bukan diagnosis atau terapi."
      },
      {
        id: "cerdik",
        question: "CERDIK dalam aplikasi ini dipakai sebagai apa?",
        options: [
          { value: "steps", label: "Pegangan perilaku pencegahan harian." },
          { value: "score", label: "Skor laboratorium gula darah." },
          { value: "medicine", label: "Nama obat diabetes." }
        ],
        answer: "steps",
        explanation: "CERDIK adalah rangkaian perilaku: cek kesehatan, hindari asap rokok, aktif, diet seimbang, istirahat, dan kelola stres."
      },
      {
        id: "findrisc-limit",
        question: "Hasil FINDRISC di aplikasi harus dibaca sebagai apa?",
        options: [
          { value: "diagnosis", label: "Diagnosis pasti diabetes." },
          { value: "screening", label: "Skrining awal untuk menentukan perlu tidaknya tindak lanjut." },
          { value: "pregnancy-test", label: "Tes diabetes gestasional." }
        ],
        answer: "screening",
        explanation: "FINDRISC adalah skrining non-lab untuk risiko awal, sehingga hasilnya perlu dikonfirmasi bila ada faktor risiko atau keluhan."
      },
      {
        id: "pregnancy-flow",
        question: "Jika pengguna sedang hamil, jalur yang lebih tepat adalah...",
        options: [
          { value: "findrisc-only", label: "Langsung memakai skor FINDRISC sebagai jawaban akhir." },
          { value: "pregnancy-care", label: "Membaca fase ibu hamil dan mengikuti pemeriksaan tenaga kesehatan." },
          { value: "ignore", label: "Tidak perlu membaca materi karena belum ada gejala." }
        ],
        answer: "pregnancy-care",
        explanation: "Kehamilan membutuhkan perhatian pada diabetes gestasional dan pemeriksaan yang sesuai arahan tenaga kesehatan."
      },
      {
        id: "nutrition",
        question: "Prinsip 3J pada gizi seimbang berarti...",
        options: [
          { value: "jajan-jalan-jam", label: "Jajan, jalan, jam tidur." },
          { value: "jumlah-jenis-jadwal", label: "Jumlah, jenis, dan jadwal makan." },
          { value: "jantung-janin-jasmani", label: "Jantung, janin, dan jasmani." }
        ],
        answer: "jumlah-jenis-jadwal",
        explanation: "3J membantu pengguna membaca porsi, pilihan makanan, dan ritme makan."
      },
      {
        id: "warning-sign",
        question: "Keluhan seperti sering haus, sering buang air kecil, luka sulit sembuh, atau penglihatan kabur yang menetap sebaiknya...",
        options: [
          { value: "check", label: "Diperiksakan ke tenaga kesehatan." },
          { value: "wait", label: "Dibiarkan sampai hilang sendiri." },
          { value: "only-quiz", label: "Cukup dijawab lewat kuis aplikasi." }
        ],
        answer: "check",
        explanation: "Keluhan menetap perlu pemeriksaan langsung; aplikasi hanya membantu edukasi dan arahan awal."
      }
    ]
  },
  pages: {
    tentangDm: {
      title: "Tentang Diabetes Melitus",
      intro:
        "Halaman ini merangkum pengertian dasar DM, jenis-jenisnya, faktor risiko pada perempuan, gejala awal, dan dampak kesehatan yang perlu dipahami sejak dini.",
      callout: "DM pada perempuan perlu dilihat sesuai fase kehidupan karena risiko hormonal, kehamilan, dan perubahan metabolik tidak selalu sama di setiap usia.",
      visual: {
        title: "Ilustrasi gula darah dan tubuh",
        size: "1200 x 800 px",
        note: "Bisa berisi visual sederhana tentang gula darah, insulin, gejala, dan faktor risiko perempuan."
      },
      quickFacts: [
        {
          label: "01",
          title: "Kenali gejala",
          body: "Sering haus, lapar, buang air kecil, lelah, atau luka sulit sembuh perlu diperhatikan."
        },
        {
          label: "02",
          title: "Lihat risiko",
          body: "Riwayat keluarga, IMT, lingkar perut, PCOS, dan DM gestasional termasuk penanda penting."
        },
        {
          label: "03",
          title: "Cegah dampak",
          body: "Pencegahan dini membantu menekan risiko komplikasi jangka panjang."
        }
      ],
      nextActions: [
        { label: "Mulai cek risiko", to: "/deteksi-dini" },
        { label: "Baca pencegahan", to: "/pencegahan-dm" }
      ],
      sections: [
        {
          title: "Apa itu Diabetes Melitus",
          body:
            "Diabetes Melitus adalah kondisi ketika kadar gula darah terlalu tinggi karena tubuh tidak mampu memproduksi insulin, menggunakan insulin dengan baik, atau keduanya.",
          bullets: [
            "Kadar gula darah tinggi dapat berlangsung menahun.",
            "Gejala bisa muncul perlahan dan sering tidak disadari."
          ]
        },
        {
          title: "Jenis utama DM",
          body: "Jenis yang paling umum dibahas adalah DM tipe 1, DM tipe 2, diabetes gestasional, dan beberapa tipe lainnya.",
          bullets: [
            "DM tipe 1 berkaitan dengan produksi insulin yang sangat kurang.",
            "DM tipe 2 paling sering terjadi dan erat dengan resistensi insulin.",
            "DM gestasional muncul pada kehamilan, terutama trimester kedua atau ketiga."
          ]
        },
        {
          title: "Faktor risiko pada perempuan",
          body: "Risiko dipengaruhi riwayat keluarga, usia, IMT, lingkar perut, aktivitas fisik, pola makan, hipertensi, PCOS, dan riwayat DM gestasional.",
          bullets: [
            "Perempuan dengan lingkar perut 80 cm atau lebih perlu lebih waspada.",
            "Riwayat melahirkan bayi lebih dari 4 kg menjadi penanda risiko penting."
          ]
        },
        {
          title: "Tanda dan gejala awal",
          body: "Gejala klasik DM meliputi sering haus, sering lapar, sering buang air kecil, dan penurunan berat badan tanpa sebab yang jelas.",
          bullets: [
            "Keluhan tambahan dapat berupa cepat lelah, kesemutan, luka sulit sembuh, dan penglihatan kabur.",
            "Pada perempuan, gatal area kewanitaan juga termasuk tanda yang perlu diwaspadai."
          ]
        },
        {
          title: "Dampak pada kesehatan perempuan",
          body: "DM dapat memengaruhi kualitas hidup, kehamilan, mata, ginjal, jantung, saraf, serta meningkatkan risiko infeksi dan komplikasi kronis lainnya.",
          bullets: [
            "Komplikasi jangka panjang dapat menurunkan produktivitas.",
            "Pencegahan dini jauh lebih ringan dibanding penanganan komplikasi."
          ]
        }
      ]
    },
    pencegahanDm: {
      title: "Pencegahan Diabetes Melitus",
      intro:
        "Pencegahan DM pada website ini bertumpu pada strategi CERDIK, gaya hidup sehat perempuan, serta penyesuaian anjuran sesuai fase kehidupan.",
      callout: "Target besar dari pencegahan primer adalah membangun kebiasaan sehat sebelum komplikasi muncul, bukan menunggu gejala berat.",
      visual: {
        title: "Ilustrasi langkah CERDIK",
        size: "1200 x 800 px",
        note: "Bisa berisi enam kartu C-E-R-D-I-K dengan ikon sederhana dan satu aksi harian."
      },
      quickFacts: [
        {
          label: "01",
          title: "Primer",
          body: "Mencegah risiko sejak awal lewat kebiasaan sehat dan skrining ringan."
        },
        {
          label: "02",
          title: "Sekunder",
          body: "Mengendalikan kondisi agar komplikasi bisa dideteksi lebih dini."
        },
        {
          label: "03",
          title: "Tersier",
          body: "Menjaga kualitas hidup saat komplikasi sudah terjadi."
        }
      ],
      nextActions: [
        { label: "Buka gizi seimbang", to: "/gizi-seimbang" },
        { label: "Cek risiko awal", to: "/deteksi-dini" }
      ],
      sections: [
        {
          title: "Pencegahan primer",
          body: "Ditujukan bagi perempuan yang memiliki faktor risiko atau prediabetes, dengan fokus pada perubahan gaya hidup dan skrining mandiri ringan.",
          bullets: [
            "Cek kesehatan berkala",
            "Aktivitas fisik rutin",
            "Pola makan seimbang",
            "Tidur cukup dan kelola stres"
          ]
        },
        {
          title: "Pencegahan sekunder",
          body: "Berlaku pada pasien yang sudah terdiagnosis DM, dengan fokus pengendalian gula darah dan deteksi komplikasi secara berkala.",
          bullets: [
            "Pantau tekanan darah, profil lipid, mata, ginjal, saraf, dan kaki.",
            "Kendalikan faktor risiko lain secara komprehensif."
          ]
        },
        {
          title: "Pencegahan tersier",
          body: "Ditujukan untuk mencegah kecacatan lebih lanjut dan mempertahankan kualitas hidup pada penyandang DM yang sudah mengalami komplikasi.",
          bullets: [
            "Perlu layanan kesehatan yang terkoordinasi.",
            "Rehabilitasi dini membantu menekan dampak lanjutan."
          ]
        },
        {
          title: "Pencegahan berbasis fase kehidupan",
          body: "Perempuan memiliki kebutuhan pencegahan yang berubah mulai dari remaja sampai usia lanjut.",
          bullets: [
            "Remaja fokus pada pencegahan obesitas dan gaya hidup aktif.",
            "Ibu hamil fokus pada skrining DM gestasional 24-28 minggu.",
            "Nifas dan menyusui fokus pada pemulihan metabolik dan berat badan.",
            "Usia lanjut fokus pada aktivitas aman dan pencegahan komplikasi."
          ]
        }
      ]
    },
    giziSeimbang: {
      title: "Gizi Seimbang yang mudah dijalankan",
      intro:
        "Bagian ini membantu pengguna memahami pola makan pencegahan DM secara singkat: jumlah, jenis, jadwal, dan pilihan harian yang lebih aman.",
      callout: "Kuncinya bukan diet ekstrem. Mulai dari porsi yang lebih sadar, minuman lebih rendah gula, dan jadwal makan yang lebih teratur.",
      visual: {
        title: "Ilustrasi piring makan 3J",
        size: "1200 x 800 px",
        note: "Bisa berisi piring, sayur, protein, karbohidrat, dan label Jumlah-Jenis-Jadwal."
      },
      quickFacts: [
        {
          label: "01",
          title: "Jumlah",
          body: "Perhatikan porsi makan dan minuman manis agar asupan energi tidak berlebihan."
        },
        {
          label: "02",
          title: "Jenis",
          body: "Utamakan makanan tinggi serat, lauk seimbang, dan kurangi makanan ultra proses."
        },
        {
          label: "03",
          title: "Jadwal",
          body: "Buat ritme makan lebih teratur agar tubuh lebih mudah menjaga kestabilan energi."
        }
      ],
      nextActions: [
        { label: "Cek risiko awal", to: "/deteksi-dini" },
        { label: "Pilih fase kehidupan", to: "/#fase-kehidupan" }
      ],
      sections: [
        {
          title: "Prinsip 3J",
          body: "3J membantu pengguna membaca makan harian dengan bahasa sederhana: jumlah makanan, jenis pilihan, dan jadwal makan.",
          bullets: [
            "Jumlah: makan secukupnya sesuai kebutuhan tubuh, bukan mengikuti porsi besar sebagai kebiasaan.",
            "Jenis: utamakan karbohidrat kompleks, lauk rendah lemak, sayur, buah, dan air putih.",
            "Jadwal: susun 3 kali makan utama dan 2-3 selingan kecil bila dibutuhkan agar ritme makan tidak terlalu acak."
          ]
        },
        {
          title: "Contoh menu harian",
          body: "Contoh ini bukan resep wajib. Gunakan sebagai pola sederhana untuk menyusun piring yang lebih seimbang.",
          visual: {
            title: "Placeholder contoh piring harian",
            size: "1080 x 720 px",
            note: "Bisa berisi tiga kartu: sarapan, makan siang, makan malam, masing-masing dengan piring sederhana."
          },
          bullets: [
            "Sarapan: sumber karbohidrat secukupnya, telur/tahu/tempe, sayur, dan air putih.",
            "Makan siang: nasi atau pengganti karbohidrat, lauk berprotein, setengah piring sayur/buah, dan minuman tanpa gula.",
            "Makan malam: porsi lebih sadar, pilih lauk tidak terlalu berminyak, dan hindari minuman manis sebagai kebiasaan penutup."
          ]
        },
        {
          title: "Indeks glikemik",
          body: "Indeks glikemik membantu memahami makanan yang lebih cepat atau lebih lambat menaikkan gula darah.",
          bullets: [
            "Baca indeks glikemik bersama porsi, cara memasak, dan kombinasi makanan, bukan sebagai satu-satunya penentu sehat.",
            "Karbohidrat yang lebih utuh dan tinggi serat biasanya membantu rasa kenyang lebih lama.",
            "Makanan manis tetap perlu dibatasi meski dimakan dalam porsi kecil karena mudah menjadi kebiasaan harian."
          ]
        },
        {
          title: "Baca label makanan",
          body: "Label membantu pengguna melihat gula, garam, lemak, dan total energi sebelum membeli makanan kemasan.",
          visual: {
            title: "Placeholder label makanan",
            size: "960 x 720 px",
            note: "Bisa berupa label nutrisi abu-abu dengan penanda takaran saji, gula, natrium, lemak, dan kalori."
          },
          bullets: [
            "Mulai dari takaran saji, lalu bandingkan dengan jumlah yang benar-benar dimakan.",
            "Cek gula, natrium/garam, lemak jenuh, dan total energi sebelum memilih produk.",
            "Perhatikan minuman kemasan karena sering terasa ringan tetapi kandungan gulanya tinggi."
          ]
        },
        {
          title: "Camilan sehat",
          body: "Camilan tetap boleh, tetapi pilih yang lebih membantu kenyang dan tidak hanya memberi gula cepat.",
          bullets: [
            "Buah potong, kacang secukupnya, yogurt tawar, ubi rebus, atau camilan rumahan bisa menjadi opsi.",
            "Pilih camilan yang punya serat atau protein, bukan hanya rasa manis.",
            "Untuk ibu hamil, menyusui, lansia, atau pengguna dengan penyakit tertentu, sesuaikan dengan arahan tenaga kesehatan."
          ]
        }
      ]
    },
    deteksiDini: {
      title: "Skrining awal yang sederhana dan mudah dipahami",
      intro:
        "Bagian ini membantu pengguna mengenali risiko lebih awal sebelum memutuskan pemeriksaan lanjutan.",
      callout: "Hasil skrining bersifat edukatif dan tidak menggantikan diagnosis dokter atau tenaga kesehatan.",
      sections: [
        {
          title: "Kuis faktor risiko",
          body: "Pertanyaan FINDRISC menyorot usia, IMT, lingkar perut, aktivitas fisik, konsumsi sayur/buah, obat tekanan darah, riwayat gula darah tinggi, dan riwayat keluarga DM.",
          bullets: [
            "Gate awal memisahkan kondisi khusus seperti kehamilan, usia di bawah 18 tahun, diagnosis DM sebelumnya, atau keluhan yang perlu diperiksa.",
            "Hasil akhir digunakan sebagai arahan edukasi dan tindak lanjut, bukan diagnosis."
          ]
        },
        {
          title: "Kalkulator IMT",
          body: "Pengguna memasukkan tinggi dan berat badan untuk melihat apakah berat badan sudah masuk rentang sehat.",
          bullets: [
            "IMT membantu membaca risiko umum terkait berat badan.",
            "Perlu dibaca bersama lingkar perut dan gaya hidup."
          ]
        },
        {
          title: "Lingkar perut",
          body: "Panduan ukur mandiri membantu pengguna perempuan memeriksa obesitas sentral dengan batas waspada 80 cm atau lebih.",
          bullets: [
            "Lakukan pengukuran pada posisi dan waktu yang konsisten.",
            "Gunakan angka ini sebagai pemicu evaluasi gaya hidup."
          ]
        },
        {
          title: "Kapan cek gula darah",
          body: "Pemeriksaan lanjutan dianjurkan bila pengguna memiliki kombinasi faktor risiko, gejala klasik DM, atau kondisi khusus seperti kehamilan dan riwayat DM gestasional.",
          bullets: [
            "Segera periksa jika ada gejala klasik yang menetap.",
            "Ibu hamil perlu memperhatikan jadwal skrining 24-28 minggu."
          ]
        }
      ]
    },
    faq: {
      title: "Pertanyaan umum seputar DM pada perempuan",
      intro:
        "Jawaban singkat untuk pertanyaan yang sering muncul.",
      items: [
        {
          question: "Apakah DM hanya terjadi pada usia lanjut?",
          answer: "Tidak. Risiko meningkat seiring usia, tetapi remaja, perempuan usia reproduksi, ibu hamil, dan ibu nifas juga dapat memiliki faktor risiko yang penting."
        },
        {
          question: "Apakah ibu hamil perlu skrining khusus?",
          answer: "Ya. Dokumen menekankan skrining diabetes gestasional pada usia kehamilan 24-28 minggu, terutama bila ada faktor risiko sejak awal."
        },
        {
          question: "Apakah menyusui membantu pencegahan DM?",
          answer: "Ya, materi pada fase nifas dan menyusui menjelaskan bahwa menyusui membantu pemulihan metabolik ibu dan dapat menurunkan risiko DM tipe 2 di kemudian hari."
        },
        {
          question: "Apakah hasil kuis risiko bisa menggantikan pemeriksaan dokter?",
          answer: "Tidak. Hasil kuis adalah skrining awal yang membantu pengguna memahami apakah perlu mencari evaluasi medis lebih lanjut."
        }
      ]
    }
  },
  phases: [
    {
      slug: "remaja",
      label: "Remaja",
      accent: "butter",
      summary: "Bangun kebiasaan aktif dan pola makan yang lebih baik sejak dini.",
      focusPoints: [
        "Kurangi konsumsi makanan tinggi gula dan tinggi lemak.",
        "Biasakan aktivitas fisik rutin sejak sekolah dan rumah.",
        "Kenali risiko kelebihan berat badan lebih awal."
      ],
      warningSigns: [
        "Berat badan naik cepat disertai kebiasaan minuman manis tinggi.",
        "Sering haus, sering buang air kecil, atau cepat lelah saat aktivitas harian.",
        "Kulit area leher atau lipatan tampak lebih gelap dan sulit hilang.",
        "Riwayat keluarga DM ditambah aktivitas fisik yang sangat kurang."
      ],
      cerdikTips: [
        { title: "Cek kesehatan", text: "Pantau berat badan dan kebiasaan makan secara berkala." },
        { title: "Enyahkan asap rokok", text: "Hindari rokok aktif maupun pasif sejak usia muda." },
        { title: "Rajin aktivitas fisik", text: "Utamakan olahraga yang disukai agar kebiasaan lebih mudah bertahan." },
        { title: "Diet seimbang", text: "Kurangi minuman manis dan camilan ultra proses." },
        { title: "Istirahat cukup", text: "Jam tidur yang baik membantu metabolisme dan fokus belajar." },
        { title: "Kelola stres", text: "Bangun coping skill yang sehat untuk mencegah makan emosional." }
      ],
      careMoments: [
        "Fokus utamanya adalah membangun kebiasaan sehat sejak dini.",
        "Fokus utama tetap pada pencegahan obesitas dan gaya hidup aktif."
      ],
      sourceNote:
        "Belum ada DOCX fase remaja khusus di root. Materi ini disusun dari tabel menu aplikasi dan dokumen beranda, sehingga perlu dilengkapi lagi bila dokumen remaja tersedia.",
      visual: {
        title: "Ilustrasi remaja aktif",
        size: "1200 x 720 px",
        note: "Bisa berisi remaja berjalan/bersepeda, botol air, piring sederhana, dan ikon tidur/stres."
      },
      modules: [
        {
          label: "Kebiasaan",
          title: "Mulai dari hal harian yang paling sering terjadi.",
          body: "Fase remaja lebih cocok diarahkan pada pencegahan obesitas dini, pengurangan minuman manis, dan mengurangi duduk terlalu lama.",
          points: [
            "Pilih air putih lebih sering daripada minuman manis.",
            "Kurangi screen time yang membuat tubuh terlalu lama diam.",
            "Bangun kebiasaan bergerak yang disukai agar tidak terasa seperti hukuman."
          ]
        },
        {
          label: "Cek awal",
          title: "Fokus pada pemantauan sederhana.",
          body: "Skrining skor FINDRISC di aplikasi tidak dipakai untuk usia di bawah 18 tahun, tetapi edukasi risiko tetap bisa dimulai.",
          points: [
            "Pantau berat badan dan lingkar perut dengan pendampingan orang tua atau tenaga kesehatan bila perlu.",
            "Perhatikan gejala yang menetap seperti sering haus, sering buang air kecil, cepat lelah, atau luka sulit sembuh.",
            "Jika ada riwayat keluarga DM dan berat badan berlebih, lebih baik konsultasi ke fasilitas kesehatan."
          ]
        }
      ]
    },
    {
      slug: "reproduksi-dewasa",
      label: "Reproduksi Dewasa",
      accent: "blush",
      summary: "Jaga tubuh tetap seimbang sambil menyiapkan kehamilan yang lebih sehat.",
      focusPoints: [
        "Waspadai riwayat DM gestasional, PCOS, dan riwayat melahirkan bayi besar.",
        "Pantau IMT, lingkar perut, tekanan darah, dan profil lipid.",
        "Gunakan fase ini untuk perencanaan kehamilan yang lebih sehat."
      ],
      warningSigns: [
        "Siklus haid tidak teratur disertai riwayat PCOS atau berat badan berlebih.",
        "Lingkar perut 80 cm atau lebih, terutama bila ada riwayat keluarga DM.",
        "Pernah mengalami DM gestasional atau melahirkan bayi lebih dari 4 kg.",
        "Gejala klasik DM seperti sering haus, lapar, atau buang air kecil menetap."
      ],
      cerdikTips: [
        { title: "Cek kesehatan", text: "Pantau IMT, lingkar perut, glukosa darah, dan tekanan darah." },
        { title: "Enyahkan asap rokok", text: "Paparan asap rokok memperberat risiko metabolik dan risiko kehamilan." },
        { title: "Rajin aktivitas fisik", text: "Gerak rutin membantu sensitivitas insulin dan kontrol berat badan." },
        { title: "Diet seimbang", text: "Kurangi gula, garam, dan lemak, lalu tingkatkan serat harian." },
        { title: "Istirahat cukup", text: "Tidur berkualitas membantu keseimbangan hormon dan nafsu makan." },
        { title: "Kelola stres", text: "Stres kronis dapat memengaruhi perilaku makan dan kestabilan glukosa." }
      ],
      careMoments: [
        "Skrining tetap penting walau belum ada gejala klasik DM.",
        "SADARI dan tes IVA masih relevan sebagai bagian edukasi kesehatan perempuan."
      ],
      visual: {
        title: "Ilustrasi perempuan usia reproduksi",
        size: "1200 x 720 px",
        note: "Bisa berisi kartu siklus haid, cek lingkar perut, piring makan, dan rencana kehamilan sehat."
      },
      modules: [
        {
          label: "Risiko",
          title: "Risiko khas fase reproduksi dewasa.",
          body: "Dokumen menekankan riwayat DM gestasional, PCOS, riwayat bayi lahir besar, berat badan, lingkar perut, hipertensi, dan gaya hidup sebagai penanda penting.",
          points: [
            "Catat riwayat keluarga DM, PCOS, diabetes saat hamil, atau pernah melahirkan bayi besar.",
            "Perhatikan lingkar perut, IMT, tekanan darah, dan pola makan tinggi gula/garam/lemak.",
            "Gejala klasik yang menetap tetap menjadi alasan untuk cek gula darah di fasilitas kesehatan."
          ]
        },
        {
          label: "Cek",
          title: "Cek kesehatan berkala dibuat lebih praktis.",
          body: "Pemeriksaan mandiri di aplikasi dapat membantu mengawali percakapan, tetapi data medis tetap perlu dikonfirmasi di layanan kesehatan.",
          visual: {
            title: "Placeholder kartu cek reproduksi dewasa",
            size: "960 x 640 px",
            note: "Bisa berisi checklist IMT, lingkar perut, tekanan darah, gula darah, SADARI, dan IVA."
          },
          points: [
            "Gunakan deteksi dini untuk membaca risiko awal dan menyimpan riwayat.",
            "Lanjutkan pemeriksaan gula darah, tekanan darah, dan lipid sesuai arahan tenaga kesehatan.",
            "Tambahkan perhatian pada kesehatan reproduksi seperti SADARI dan tes IVA bila relevan."
          ]
        },
        {
          label: "CERDIK",
          title: "Kebiasaan yang paling bisa diubah.",
          body: "Fase ini cocok untuk membangun ritme bergerak, mengurangi asap rokok, tidur cukup, dan menata stres akibat pekerjaan atau aktivitas harian.",
          points: [
            "Targetkan aktivitas sedang secara rutin, misalnya jalan cepat, bersepeda santai, berenang, atau olahraga yang realistis dilakukan.",
            "Buat rumah dan ruang kerja lebih bebas asap rokok.",
            "Gunakan jeda singkat untuk napas perlahan, peregangan, atau aktivitas yang menurunkan ketegangan."
          ]
        },
        {
          label: "Gizi",
          title: "Pakai 3J untuk menjaga ritme makan.",
          body: "Dokumen menekankan jumlah, jenis, dan jadwal sebagai cara membaca makan harian tanpa diet ekstrem.",
          points: [
            "Jumlah: mulai dari porsi yang cukup dan tujuan menjaga berat badan sehat.",
            "Jenis: pilih karbohidrat kompleks, protein tanpa lemak, sayur, buah, dan batasi gorengan/minuman manis.",
            "Jadwal: makan utama dan selingan kecil dibuat teratur agar tidak berakhir makan berlebihan."
          ]
        },
        {
          label: "Kehamilan",
          title: "Rencanakan kehamilan lebih sehat.",
          body: "Untuk pengguna yang sedang menyiapkan kehamilan, fase ini menjadi waktu untuk merapikan faktor risiko sebelum hamil.",
          points: [
            "Diskusikan riwayat DM, PCOS, hipertensi, atau obat rutin dengan tenaga kesehatan sebelum hamil.",
            "Rapikan pola makan, aktivitas fisik, tidur, dan berhenti merokok sebelum konsepsi.",
            "Bila sudah hamil, gunakan jalur ibu hamil dan pemeriksaan DM gestasional, bukan FINDRISC umum."
          ]
        }
      ]
    },
    {
      slug: "ibu-hamil",
      label: "Ibu Hamil",
      accent: "sage",
      summary: "Kehamilan perlu pemantauan yang lebih tenang, teratur, dan aman.",
      focusPoints: [
        "Skrining DM gestasional pada usia kehamilan 24-28 minggu adalah poin kunci.",
        "Riwayat DM gestasional, obesitas, PCOS, dan bayi lahir besar memperkuat faktor risiko.",
        "Kontrol pola makan dan aktivitas fisik harus menyesuaikan keamanan kehamilan."
      ],
      warningSigns: [
        "Memiliki faktor risiko DM gestasional sebelum atau selama kehamilan.",
        "Kenaikan berat badan perlu dievaluasi bersama bidan atau tenaga kesehatan.",
        "Keluhan haus, lelah, atau buang air kecil terasa sangat menonjol dan menetap.",
        "Hasil skrining awal perlu diulang pada usia kehamilan 24-28 minggu sesuai arahan."
      ],
      cerdikTips: [
        { title: "Cek kesehatan", text: "Ikuti kunjungan antenatal dan skrining glukosa sesuai usia kehamilan." },
        { title: "Enyahkan asap rokok", text: "Hindari rokok untuk menjaga kesehatan ibu dan perkembangan janin." },
        { title: "Rajin aktivitas fisik", text: "Pilih aktivitas aman seperti jalan santai atau gerakan ringan yang disetujui tenaga kesehatan." },
        { title: "Diet seimbang", text: "Perhatikan porsi, asupan serat, dan kenaikan berat badan yang sehat." },
        { title: "Istirahat cukup", text: "Tidur dan jeda istirahat membantu ibu tetap stabil selama kehamilan." },
        { title: "Kelola stres", text: "Gunakan teknik napas atau relaksasi ringan untuk menurunkan ketegangan." }
      ],
      careMoments: [
        "Jika skrining awal sebelum 24 minggu negatif, pemeriksaan tetap diulang pada 24-28 minggu.",
        "Pemantauan tekanan darah dan berat badan menjadi bagian penting dari fase ini."
      ],
      visual: {
        title: "Ilustrasi pemantauan ibu hamil",
        size: "1200 x 720 px",
        note: "Bisa berisi ibu hamil, buku ANC, kartu 24-28 minggu, piring sehat, dan ikon jalan santai."
      },
      modules: [
        {
          label: "DMG",
          title: "Fokus utama: diabetes gestasional.",
          body: "Dokumen menempatkan diabetes gestasional sebagai isu utama fase hamil, sehingga pengguna tidak diarahkan ke skor risiko 10 tahun sebagai jawaban akhir.",
          points: [
            "Perhatikan riwayat DM gestasional, obesitas, PCOS, riwayat bayi lahir besar, atau riwayat keluarga DM.",
            "Skrining DM gestasional perlu dibicarakan dengan tenaga kesehatan, terutama pada usia kehamilan 24-28 minggu.",
            "Keluhan yang terasa menetap sebaiknya tidak ditunda untuk dikonsultasikan."
          ]
        },
        {
          label: "Cek",
          title: "Pemeriksaan rutin dibuat sebagai pegangan.",
          body: "Aplikasi membantu mengingat poin penting, tetapi pemeriksaan kehamilan tetap mengikuti bidan, dokter, atau fasilitas kesehatan.",
          visual: {
            title: "Placeholder alur cek ibu hamil",
            size: "960 x 640 px",
            note: "Bisa berupa timeline ANC, cek tekanan darah, berat badan, gula darah, dan skrining 24-28 minggu."
          },
          points: [
            "Ikuti jadwal kunjungan antenatal dan tanyakan kapan perlu cek glukosa.",
            "Pantau berat badan dan tekanan darah sebagai bagian dari pemantauan rutin.",
            "Simpan reminder untuk jadwal pemeriksaan agar tidak mudah terlewat."
          ]
        },
        {
          label: "Aktivitas",
          title: "Gerak aman, bukan memaksakan olahraga.",
          body: "Aktivitas fisik pada kehamilan perlu menyesuaikan kondisi ibu dan arahan tenaga kesehatan.",
          points: [
            "Pilih aktivitas ringan sampai sedang seperti jalan santai atau gerakan yang disetujui tenaga kesehatan.",
            "Hentikan aktivitas dan minta arahan bila muncul keluhan tidak biasa.",
            "Gabungkan gerak ringan dengan istirahat yang cukup agar tubuh tidak terlalu lelah."
          ]
        },
        {
          label: "Gizi",
          title: "Pola makan mengikuti 3J dan kebutuhan kehamilan.",
          body: "Dokumen menekankan porsi, jenis makanan, jadwal makan, serta pembatasan gula, garam, dan lemak.",
          points: [
            "Jumlah: sesuaikan makan dengan kebutuhan ibu dan pertumbuhan janin, bukan makan berlebihan.",
            "Jenis: pilih karbohidrat kompleks, protein tanpa lemak, sayur, buah, dan air putih.",
            "Jadwal: makan utama dan selingan kecil dapat membantu pola makan lebih teratur."
          ]
        },
        {
          label: "Keluarga",
          title: "Dukungan rumah ikut menentukan.",
          body: "Keluarga dapat membantu mengurangi asap rokok, menyiapkan pilihan makan lebih baik, dan mengingatkan jadwal kontrol.",
          points: [
            "Buat rumah bebas asap rokok untuk melindungi ibu dan janin.",
            "Libatkan pasangan/keluarga untuk membantu rutinitas makan, istirahat, dan kontrol.",
            "Kelola stres dengan napas perlahan, jeda istirahat, dan dukungan emosional."
          ]
        }
      ]
    },
    {
      slug: "ibu-nifas-menyusui",
      label: "Ibu Nifas dan Menyusui",
      accent: "sage-soft",
      summary: "Fokus pada pemulihan tubuh, berat badan, dan manfaat menyusui.",
      focusPoints: [
        "Riwayat DM gestasional meningkatkan risiko DM tipe 2 di masa depan.",
        "Pemantauan glukosa, IMT, lingkar perut, dan tekanan darah tetap dibutuhkan.",
        "Menyusui membantu pemulihan metabolik dan pencapaian berat badan yang lebih sehat."
      ],
      warningSigns: [
        "Pernah DM gestasional dan belum melakukan kontrol ulang pasca persalinan.",
        "Berat badan sulit turun disertai lingkar perut yang meningkat.",
        "Cepat lelah berlebihan, sering haus, atau sering buang air kecil menetap.",
        "Infeksi atau luka lebih lama pulih setelah persalinan."
      ],
      cerdikTips: [
        { title: "Cek kesehatan", text: "Lanjutkan pemantauan glukosa dan berat badan setelah persalinan." },
        { title: "Enyahkan asap rokok", text: "Rumah bebas asap rokok mendukung kesehatan ibu dan bayi." },
        { title: "Rajin aktivitas fisik", text: "Mulai dengan aktivitas aman yang sesuai kondisi nifas." },
        { title: "Diet seimbang", text: "Penuhi kebutuhan gizi ibu menyusui tanpa mengabaikan kontrol berat badan." },
        { title: "Istirahat cukup", text: "Atur pola istirahat sefleksibel mungkin di sela perawatan bayi." },
        { title: "Kelola stres", text: "Dukungan keluarga dan jeda singkat sangat membantu kestabilan emosional." }
      ],
      careMoments: [
        "Jika hasil pasca persalinan normal, skrining tetap perlu diulang berkala.",
        "Bila masuk prediabetes, pemeriksaan lanjutan dianjurkan setiap tahun."
      ],
      visual: {
        title: "Ilustrasi ibu nifas dan menyusui",
        size: "1200 x 720 px",
        note: "Bisa berisi ibu dan bayi, kartu menyusui, pemantauan berat badan, piring sehat, dan dukungan keluarga."
      },
      modules: [
        {
          label: "Risiko",
          title: "Risiko pascapersalinan perlu tetap dipantau.",
          body: "Dokumen menekankan riwayat DM gestasional, bayi lahir besar, perubahan metabolik pascapersalinan, dan pola hidup saat menyusui.",
          points: [
            "Jika pernah mengalami DM gestasional, risiko DM tipe 2 di masa depan perlu dipantau.",
            "Riwayat bayi lahir besar menjadi tanda penting untuk dicatat di konsultasi berikutnya.",
            "Keluhan seperti sering haus, cepat lelah, atau sering buang air kecil yang menetap perlu diperiksa."
          ]
        },
        {
          label: "Cek",
          title: "Kontrol setelah melahirkan jangan hilang.",
          body: "Fase setelah persalinan sering sibuk, jadi aplikasi membantu mengingatkan pemantauan yang tetap penting.",
          visual: {
            title: "Placeholder cek pascapersalinan",
            size: "960 x 640 px",
            note: "Bisa berisi checklist kontrol nifas, berat badan, lingkar perut, gula darah, tekanan darah, dan reminder."
          },
          points: [
            "Pantau berat badan, lingkar perut, tekanan darah, dan gula darah sesuai arahan tenaga kesehatan.",
            "Jika merencanakan kehamilan berikutnya, diskusikan pemeriksaan sebelum konsepsi.",
            "Gunakan reminder agar jadwal kontrol tidak tenggelam oleh rutinitas merawat bayi."
          ]
        },
        {
          label: "Menyusui",
          title: "Menyusui masuk sebagai bagian pencegahan.",
          body: "Dokumen menempatkan menyusui sebagai dukungan pemulihan metabolik ibu sekaligus manfaat untuk bayi.",
          points: [
            "Menyusui dapat mendukung pemulihan metabolik dan pengelolaan berat badan ibu.",
            "Kebutuhan makan ibu menyusui tetap perlu cukup, bukan diet ketat.",
            "Dukungan keluarga penting agar ibu punya waktu makan, minum, dan istirahat."
          ]
        },
        {
          label: "Aktivitas",
          title: "Mulai bertahap sesuai kondisi tubuh.",
          body: "Aktivitas setelah melahirkan perlu mengikuti kondisi nifas, pemulihan, dan arahan tenaga kesehatan.",
          points: [
            "Mulai dari gerakan ringan dan aktivitas rumah yang aman.",
            "Naikkan intensitas perlahan setelah tubuh siap dan tidak ada keluhan.",
            "Hentikan bila muncul nyeri, perdarahan berlebih, pusing, atau keluhan lain."
          ]
        },
        {
          label: "Gizi",
          title: "Pola makan mendukung pemulihan dan ASI.",
          body: "Dokumen tetap memakai prinsip 3J, piring seimbang, serta pembatasan gula, garam, dan lemak.",
          points: [
            "Penuhi sumber energi, protein, sayur, buah, dan cairan yang cukup.",
            "Pilih camilan yang membantu kenyang, bukan hanya tinggi gula.",
            "Jaga porsi secara bertahap untuk membantu berat badan kembali lebih sehat."
          ]
        }
      ]
    },
    {
      slug: "usia-lanjut",
      label: "Reproduksi Usia Lanjut",
      accent: "coral-deep",
      summary: "Tetap aktif, jaga berat badan, dan periksa rutin dengan tenang.",
      focusPoints: [
        "Usia 45 tahun ke atas termasuk kelompok yang perlu skrining rutin meski tanpa gejala.",
        "Hipertensi, dislipidemia, dan hipoglikemia menjadi perhatian penting.",
        "Aktivitas dan target kesehatan perlu menyesuaikan kondisi fisik dan komorbid."
      ],
      warningSigns: [
        "Kesemutan, kebas, atau luka kaki sulit sembuh.",
        "Penglihatan kabur, mudah lelah, atau penurunan berat badan tanpa sebab jelas.",
        "Riwayat hipertensi, kolesterol tinggi, atau penyakit jantung bersama gejala DM.",
        "Tanda gula darah terlalu rendah seperti gemetar, keringat dingin, atau bingung perlu segera ditangani."
      ],
      cerdikTips: [
        { title: "Cek kesehatan", text: "Pantau glukosa darah, tekanan darah, IMT, lingkar perut, dan lipid." },
        { title: "Enyahkan asap rokok", text: "Berhenti merokok membantu menekan risiko kardiovaskular dan komplikasi." },
        { title: "Rajin aktivitas fisik", text: "Utamakan latihan aman seperti jalan, senam ringan, atau aktivitas rumah tangga aktif." },
        { title: "Diet seimbang", text: "Pilih porsi yang mendukung gula darah stabil dan berat badan terjaga." },
        { title: "Istirahat cukup", text: "Pemulihan tubuh pada usia lanjut perlu ritme tidur yang baik." },
        { title: "Kelola stres", text: "Kesehatan mental dan sosial penting untuk kepatuhan gaya hidup sehat." }
      ],
      careMoments: [
        "Lansia lebih rentan terhadap hipoglikemia dan pemulihannya bisa lebih lambat.",
        "Pencegahan komplikasi kronis menjadi tujuan utama fase ini."
      ],
      visual: {
        title: "Ilustrasi lansia aktif dan aman",
        size: "1200 x 720 px",
        note: "Bisa berisi lansia berjalan, pemeriksaan kaki, kartu PATUH, piring sehat, dan keluarga pendamping."
      },
      modules: [
        {
          label: "Risiko",
          title: "Risiko meningkat dan perlu dibaca lebih hati-hati.",
          body: "Dokumen menekankan usia, perubahan metabolik, penyakit penyerta, dan risiko hipoglikemia sebagai perhatian utama pada lansia.",
          points: [
            "Perhatikan riwayat hipertensi, kolesterol tinggi, penyakit jantung, stroke, atau penggunaan obat DM.",
            "Waspadai tanda gula darah terlalu rendah seperti gemetar, keringat dingin, lemas, bingung, atau pusing.",
            "Pengaturan target kesehatan lansia perlu mengikuti dokter/tenaga kesehatan, tidak disamakan dengan usia muda."
          ]
        },
        {
          label: "PATUH",
          title: "Gunakan PATUH untuk pencegahan komplikasi.",
          body: "Untuk lansia yang sudah terdiagnosis DM, dokumen menekankan perilaku PATUH sebagai pegangan harian.",
          points: [
            "Periksa kesehatan secara rutin.",
            "Atasi penyakit dengan pengobatan yang tepat dan teratur.",
            "Tetap aktivitas fisik, upayakan diet sehat, dan hindari asap rokok."
          ]
        },
        {
          label: "Cek",
          title: "Pemeriksaan rutin membantu tetap mandiri.",
          body: "Pemantauan lansia tidak berhenti pada gula darah, tetapi juga mata, ginjal, kaki, tekanan darah, dan profil lipid.",
          visual: {
            title: "Placeholder cek komplikasi lansia",
            size: "960 x 640 px",
            note: "Bisa berisi checklist mata, ginjal, saraf/kaki, tekanan darah, lipid, dan gula darah."
          },
          points: [
            "Cek gula darah, tekanan darah, berat badan/IMT, lingkar perut, dan lipid sesuai arahan tenaga kesehatan.",
            "Perhatikan kesehatan mata, ginjal, saraf, dan kaki secara berkala.",
            "Gunakan riwayat skrining sebagai bahan diskusi, bukan pengganti pemeriksaan."
          ]
        },
        {
          label: "Kaki",
          title: "Perawatan kaki dibuat lebih eksplisit.",
          body: "Dokumen menekankan pencegahan luka kaki karena gangguan saraf dan sirkulasi dapat menjadi komplikasi penting.",
          points: [
            "Periksa kaki setiap hari untuk melihat luka, kemerahan, kulit pecah, atau perubahan warna.",
            "Hindari berjalan tanpa alas kaki, termasuk di dalam rumah.",
            "Gunakan alas kaki nyaman dan minta bantuan bila sulit memeriksa telapak kaki sendiri."
          ]
        },
        {
          label: "Aktif",
          title: "Aktivitas aman lebih penting daripada berat.",
          body: "Aktivitas lansia perlu terukur, tidak memaksa, dan menyesuaikan kemampuan fisik serta penyakit penyerta.",
          points: [
            "Pilih jalan santai, senam ringan, berkebun, atau aktivitas rumah yang aman.",
            "Kurangi duduk terlalu lama dengan jeda gerak ringan.",
            "Bila ada komplikasi atau keluhan, tanyakan batas aktivitas kepada tenaga kesehatan."
          ]
        },
        {
          label: "Gizi",
          title: "Piring seimbang dan hidrasi tetap menjadi kunci.",
          body: "Dokumen menekankan 3J, pembatasan gula/garam/lemak, sayur-buah, dan cukup air putih untuk lansia.",
          points: [
            "Jumlah: porsi lebih sadar karena kebutuhan energi dapat berubah seiring usia.",
            "Jenis: utamakan karbohidrat kompleks, protein tanpa lemak, sayur, buah, dan batasi gorengan/makanan kaleng.",
            "Jadwal: makan teratur dalam porsi yang sesuai membantu tubuh lebih mudah menjaga ritme."
          ]
        }
      ]
    }
  ]
};
