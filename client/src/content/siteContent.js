export const siteContent = {
  brand: {
    name: "Sahabat CERDIK DM",
    tagline: "Langkah sehat untuk perempuan."
  },
  navigation: [
    { label: "Beranda", to: "/" },
    { label: "Tentang", to: "/tentang" },
    { label: "Tentang DM", to: "/tentang-dm" },
    { label: "Pencegahan", to: "/pencegahan-dm" },
    { label: "Gizi Seimbang", to: "/gizi-seimbang" },
    { label: "Deteksi Dini", to: "/deteksi-dini" },
    { label: "FAQ", to: "/faq" },
    { label: "Kontak", to: "/kontak" },
    { label: "Dashboard", to: "/dashboard" }
  ],
  home: {
    title: "Teman ringkas mengenali risiko DM.",
    description:
      "Baca info penting, cek risiko awal, dan jaga kebiasaan sehat lewat reminder sederhana.",
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
      description: "Pilih materi sesuai kondisi Anda.",
      to: "#fase-kehidupan"
    },
    {
      id: "media-edukasi",
      label: "Media Edukasi",
      icon: "ME",
      iconSrc: "/menu-icons/me.png",
      tone: "blush",
      description: "Video dan infografis ringkas.",
      to: "/dashboard/media-edukasi"
    }
  ],
  cerdik: [
    {
      letter: "C",
      title: "Cek kesehatan",
      description: "Ukur IMT, lingkar perut, dan cek gula darah bila tersedia."
    },
    {
      letter: "E",
      title: "Enyahkan asap rokok",
      description: "Jauhi rokok aktif dan paparan asap di rumah atau kerja."
    },
    {
      letter: "R",
      title: "Rajin aktivitas fisik",
      description: "Gerak 30 menit, bisa dicicil jadi beberapa sesi pendek."
    },
    {
      letter: "D",
      title: "Diet seimbang",
      description: "Pakai prinsip 3J: jumlah, jenis, dan jadwal makan."
    },
    {
      letter: "I",
      title: "Istirahat cukup",
      description: "Jaga jam tidur lebih teratur dan kurangi begadang."
    },
    {
      letter: "K",
      title: "Kelola stres",
      description: "Ambil jeda, tarik napas, atau bicara dengan orang tepercaya."
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
        description: "Materi inti yang paling sering dibutuhkan.",
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
        description: "Pilih materi yang paling dekat dengan kondisi Anda.",
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
        description: "Menu tambahan.",
        items: [
          {
            id: "media-edukasi",
            label: "Media Edukasi",
            icon: "ME",
            iconSrc: "/menu-icons/me.png",
            tone: "blush",
            description: "Video dan infografis ringkas.",
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
            description: "Cek pemahaman sebelum dan sesudah membaca materi.",
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
            label: "Tentang",
            icon: "APP",
            tone: "coral-deep",
            description: "Kenali fungsi dan tim aplikasi.",
            to: "/dashboard/tentang-aplikasi"
          },
          {
            id: "sumber-referensi",
            label: "Sumber Referensi",
            icon: "SR",
            tone: "sage-soft",
            description: "Sumber dan batasan materi.",
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
      intro: "Video dan infografis singkat untuk memahami DM lebih cepat.",
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
          body: "Mulai dari video remaja, ibu hamil, minuman rendah gula, dan camilan sehat."
        },
        {
          title: "Infografis ringkas",
          body: "Ringkasan visual untuk gejala, pencegahan, dan langkah CERDIK."
        },
        {
          title: "Audio relaksasi",
          body: "Bisa ditambahkan nanti untuk latihan kelola stres."
        }
      ]
    },
    reminderHarian: {
      title: "Reminder Harian",
      intro: "Atur pesan WhatsApp ringan untuk menjaga ritme sehat sepanjang minggu.",
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
          body: "Reminder bisa dibuat lebih personal mengikuti fase dan hasil skrining pengguna."
        }
      ]
    },
    tentangAplikasi: {
      title: "Tentang",
      intro: "Aplikasi ini membantu membaca materi DM, cek risiko awal, dan mengatur reminder sehat.",
      placeholders: [
        {
          title: "Diagram alur aplikasi",
          size: "1200 x 720 px",
          note: "Bisa berisi alur Beranda, Login, Dashboard, Cek Risiko, dan Fase Kehidupan."
        }
      ],
      points: [
        {
          title: "Materi sesuai fase",
          body: "Pilih materi untuk remaja, usia reproduksi, ibu hamil, ibu nifas, atau usia lanjut."
        },
        {
          title: "Cek risiko awal",
          body: "Skrining membantu mengenali risiko lebih awal. Hasilnya bukan diagnosis."
        },
        {
          title: "Reminder sehat",
          body: "Atur pengingat sederhana agar kebiasaan CERDIK lebih mudah dijaga."
        },
        {
          title: "Tim pengembang",
          body: "Tim penyusun materi dan pengembang aplikasi menyiapkan konten, alur web, skrining, reminder, dan pengelolaan akun."
        }
      ]
    },
    timPengembang: {
      title: "Tim Pengembang",
      intro: "Informasi tim penyusun dan validator materi Sahabat CERDIK DM.",
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
          body: "Tim penyusun materi bertanggung jawab merapikan isi edukasi agar tetap jelas dan mudah dipakai."
        },
        {
          title: "Validator kesehatan",
          body: "Materi sebaiknya ditinjau tenaga kesehatan sebelum dipakai luas."
        },
        {
          title: "Pengembang aplikasi",
          body: "Pengembang aplikasi menyiapkan alur web, dashboard, skrining, reminder, dan pengelolaan akun."
        }
      ]
    },
    sumberReferensi: {
      title: "Sumber Referensi",
      intro: "Sumber awal untuk materi edukasi dan skrining. Materi medis tetap perlu ditinjau tenaga kesehatan.",
      points: [
        {
          title: "Materi awal",
          body: "Materi disusun dari rujukan edukasi DM, pencegahan, dan fase kehidupan perempuan."
        },
        {
          title: "FINDRISC",
          body: "FINDRISC dipakai untuk skrining non-lab risiko DM tipe 2 pada pengguna dewasa. Ini bukan diagnosis."
        },
        {
          title: "Batasan medis",
          body: "Remaja, ibu hamil, pengguna dengan diagnosis DM, atau keluhan menetap perlu arahan tenaga kesehatan."
        },
        {
          title: "Perlu ditinjau",
          body: "Materi kesehatan perlu ditinjau berkala agar tetap aman dan sesuai rujukan."
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
          description: "Contoh penekanan bahwa skrining risiko bukan diagnosis dan hasil perlu dikonfirmasi di fasilitas kesehatan.",
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
      intro: "Ringkasan privasi akun. Halaman ini menjelaskan data yang dipakai dan kontrol awal yang tersedia di aplikasi.",
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
          title: "Halaman lengkap",
          body: "Versi publik yang lebih lengkap tersedia di halaman Privasi Data pada footer aplikasi."
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
        myth: "Hasil skrining sama dengan diagnosis.",
        fact: "Skrining hanya membantu melihat risiko awal. Diagnosis tetap perlu pemeriksaan tenaga kesehatan."
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
    intro: "Cek pemahaman setelah membaca materi.",
    modes: [
      {
        id: "pretest",
        label: "Pre-test",
        description: "Isi sebelum mulai belajar."
      },
      {
        id: "posttest",
        label: "Post-test",
        description: "Isi setelah membaca materi."
      },
      {
        id: "quiz",
        label: "Kuis CERDIK",
        description: "Latihan singkat seputar pesan utama."
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
        explanation: "Aplikasi ini membantu edukasi dan langkah awal, bukan diagnosis atau terapi."
      },
      {
        id: "cerdik",
        question: "CERDIK dipakai sebagai apa?",
        options: [
          { value: "steps", label: "Pegangan perilaku pencegahan harian." },
          { value: "score", label: "Skor laboratorium gula darah." },
          { value: "medicine", label: "Nama obat diabetes." }
        ],
        answer: "steps",
        explanation: "CERDIK adalah pegangan harian: cek kesehatan, hindari asap rokok, aktif, makan seimbang, istirahat, dan kelola stres."
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
        explanation: "FINDRISC adalah skrining non-lab. Jika ada risiko atau keluhan, lanjut periksa."
      },
      {
        id: "pregnancy-flow",
        question: "Jika sedang hamil, jalur yang lebih tepat adalah...",
        options: [
          { value: "findrisc-only", label: "Langsung memakai skor FINDRISC sebagai jawaban akhir." },
          { value: "pregnancy-care", label: "Baca fase ibu hamil dan ikuti pemeriksaan tenaga kesehatan." },
          { value: "ignore", label: "Tidak perlu membaca materi karena belum ada gejala." }
        ],
        answer: "pregnancy-care",
        explanation: "Saat hamil, cek gula darah perlu mengikuti arahan tenaga kesehatan."
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
        explanation: "3J membantu membaca porsi, pilihan makanan, dan ritme makan."
      },
      {
        id: "warning-sign",
        question: "Jika sering haus, sering buang air kecil, luka sulit sembuh, atau penglihatan kabur menetap, sebaiknya...",
        options: [
          { value: "check", label: "Diperiksakan ke tenaga kesehatan." },
          { value: "wait", label: "Dibiarkan sampai hilang sendiri." },
          { value: "only-quiz", label: "Cukup dijawab lewat kuis aplikasi." }
        ],
        answer: "check",
        explanation: "Keluhan menetap perlu pemeriksaan langsung. Aplikasi hanya membantu arahan awal."
      }
    ]
  },
  pages: {
    tentang: {
      layout: "about",
      title: "Tentang Sahabat CERDIK DM",
      intro:
        "Teman ringkas untuk membaca informasi DM, cek risiko awal, dan menjaga kebiasaan sehat.",
      callout:
        "Edukasi dan skrining awal. Bukan pengganti pemeriksaan tenaga kesehatan.",
      nextActions: [
        { label: "Mulai cek risiko", to: "/deteksi-dini" },
        { label: "Hubungi kami", to: "/kontak" }
      ],
      sections: [
        {
          title: "Untuk siapa",
          body:
            "Untuk perempuan di beberapa fase kehidupan.",
          bullets: [
            "Pilih materi sesuai kondisi saat ini.",
            "Kondisi khusus tetap perlu arahan tenaga kesehatan."
          ]
        },
        {
          title: "Yang bisa dilakukan",
          body:
            "Baca materi singkat, isi skrining awal, dan atur reminder.",
          bullets: [
            "Materi DM, pencegahan, gizi, dan fase kehidupan.",
            "Reminder WhatsApp untuk kebiasaan CERDIK."
          ]
        },
        {
          title: "Tim pengembang",
          body:
            "Dikembangkan sebagai aplikasi edukasi digital yang sederhana.",
          bullets: [
            "Materi dirapikan agar singkat dan jelas.",
            "Konten kesehatan tetap perlu ditinjau sebelum dipakai luas."
          ]
        }
      ]
    },
    tentangDm: {
      title: "Tentang Diabetes Melitus",
      intro: "Kenali dasar DM, gejala awal, dan faktor risiko pada perempuan.",
      callout: "Risiko DM bisa berbeda di setiap fase kehidupan: remaja, hamil, nifas, sampai usia lanjut.",
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
            "Diabetes Melitus terjadi saat gula darah terlalu tinggi karena tubuh kekurangan insulin atau tidak memakai insulin dengan baik.",
          bullets: [
            "Kadar gula darah tinggi dapat berlangsung menahun.",
            "Gejala bisa muncul perlahan dan sering tidak disadari."
          ]
        },
        {
          title: "Jenis utama DM",
          body: "Jenis yang sering dibahas adalah DM tipe 1, DM tipe 2, dan diabetes saat hamil.",
          bullets: [
            "DM tipe 1 berkaitan dengan produksi insulin yang sangat kurang.",
            "DM tipe 2 paling sering terjadi dan erat dengan resistensi insulin.",
            "DM gestasional muncul pada kehamilan, terutama trimester kedua atau ketiga."
          ]
        },
        {
          title: "Faktor risiko pada perempuan",
          body: "Risiko dipengaruhi riwayat keluarga, usia, IMT, lingkar perut, aktivitas, pola makan, hipertensi, PCOS, dan riwayat DM saat hamil.",
          bullets: [
            "Perempuan dengan lingkar perut 80 cm atau lebih perlu lebih waspada.",
            "Riwayat melahirkan bayi lebih dari 4 kg menjadi penanda risiko penting."
          ]
        },
        {
          title: "Tanda dan gejala awal",
          body: "Tanda umum DM antara lain sering haus, sering lapar, sering buang air kecil, dan berat badan turun tanpa sebab jelas.",
          bullets: [
            "Keluhan tambahan dapat berupa cepat lelah, kesemutan, luka sulit sembuh, dan penglihatan kabur.",
            "Pada perempuan, gatal area kewanitaan juga termasuk tanda yang perlu diwaspadai."
          ]
        },
        {
          title: "Dampak pada kesehatan perempuan",
          body: "DM bisa berdampak pada kehamilan, mata, ginjal, jantung, saraf, dan risiko infeksi.",
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
        "Mulai dari kebiasaan yang bisa dijalankan: cek kesehatan, gerak rutin, makan lebih sadar, dan istirahat cukup.",
      callout: "Tujuannya bukan berubah total dalam sehari, tapi membangun kebiasaan kecil sebelum keluhan muncul.",
      visual: {
        title: "Ilustrasi langkah CERDIK",
        size: "1200 x 800 px",
        note: "Bisa berisi enam kartu C-E-R-D-I-K dengan ikon sederhana dan satu aksi harian."
      },
      quickFacts: [
        {
          label: "01",
          title: "Cegah sejak awal",
          body: "Mencegah risiko sejak awal lewat kebiasaan sehat dan skrining ringan."
        },
        {
          label: "02",
          title: "Pantau risiko",
          body: "Cek kondisi secara berkala bila faktor risiko mulai terlihat."
        },
        {
          label: "03",
          title: "Jaga kualitas hidup",
          body: "Menjaga kualitas hidup saat komplikasi sudah terjadi."
        }
      ],
      nextActions: [
        { label: "Buka gizi seimbang", to: "/gizi-seimbang" },
        { label: "Cek risiko awal", to: "/deteksi-dini" }
      ],
      sections: [
        {
          title: "Cegah sejak awal",
          body: "Untuk Anda yang punya faktor risiko atau ingin mulai lebih sehat. Fokusnya kebiasaan harian dan cek sederhana.",
          bullets: [
            "Cek kesehatan berkala",
            "Aktivitas fisik rutin",
            "Pola makan seimbang",
            "Tidur cukup dan kelola stres"
          ]
        },
        {
          title: "Pantau bila sudah berisiko",
          body: "Jika pernah mendapat hasil pemeriksaan tinggi atau diagnosis DM, kontrol rutin jadi penting.",
          bullets: [
            "Pantau tekanan darah, profil lipid, mata, ginjal, saraf, dan kaki.",
            "Ikuti arahan tenaga kesehatan untuk menjaga faktor risiko lain."
          ]
        },
        {
          title: "Jaga kualitas hidup",
          body: "Saat komplikasi sudah muncul, fokusnya adalah mencegah kondisi bertambah berat dan tetap bisa beraktivitas.",
          bullets: [
            "Perlu kontrol yang teratur bersama tenaga kesehatan.",
            "Rehabilitasi dini membantu menekan dampak lanjutan."
          ]
        },
        {
          title: "Pencegahan sesuai fase",
          body: "Kebutuhan pencegahan berubah mengikuti fase kehidupan.",
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
        "Atur makan harian dengan 3J: jumlah, jenis, dan jadwal.",
      callout: "Kuncinya bukan diet ekstrem. Mulai dari porsi yang lebih sadar, minuman rendah gula, dan jadwal makan yang lebih teratur.",
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
          body: "3J membantu mengatur porsi, pilihan makanan, dan jadwal makan.",
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
            title: "Contoh piring harian",
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
          body: "Indeks glikemik membantu melihat seberapa cepat makanan menaikkan gula darah.",
          bullets: [
            "Baca indeks glikemik bersama porsi, cara memasak, dan kombinasi makanan, bukan sebagai satu-satunya penentu sehat.",
            "Karbohidrat yang lebih utuh dan tinggi serat biasanya membantu rasa kenyang lebih lama.",
            "Makanan manis tetap perlu dibatasi meski dimakan dalam porsi kecil karena mudah menjadi kebiasaan harian."
          ]
        },
        {
          title: "Baca label makanan",
          body: "Baca label untuk melihat gula, garam, lemak, dan total energi sebelum membeli makanan kemasan.",
          visual: {
            title: "Contoh label makanan",
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
          body: "Camilan tetap boleh. Pilih yang lebih mengenyangkan dan tidak tinggi gula.",
          bullets: [
            "Buah potong, kacang secukupnya, yogurt tawar, ubi rebus, atau camilan rumahan bisa menjadi opsi.",
            "Pilih camilan yang punya serat atau protein, bukan hanya rasa manis.",
            "Untuk ibu hamil, menyusui, lansia, atau pengguna dengan penyakit tertentu, sesuaikan dengan arahan tenaga kesehatan."
          ]
        }
      ]
    },
    syaratKetentuan: {
      title: "Syarat dan Ketentuan",
      intro:
        "Ketentuan umum penggunaan Sahabat CERDIK DM sebagai aplikasi informasi, skrining awal, dan pengingat kebiasaan sehat.",
      callout:
        "Aplikasi ini bersifat edukatif. Informasi, hasil skrining, dan reminder tidak menggantikan diagnosis, konsultasi, atau keputusan tenaga kesehatan.",
      nextActions: [
        { label: "Baca Privasi Data", to: "/privasi-data" },
        { label: "Kembali ke Beranda", to: "/" }
      ],
      sections: [
        {
          title: "Penggunaan aplikasi",
          body:
            "Dengan menggunakan aplikasi, pengguna setuju memakai Sahabat CERDIK DM secara wajar untuk membaca materi, mengisi skrining awal, menyimpan hasil, dan mengatur reminder.",
          bullets: [
            "Pengguna bertanggung jawab memastikan data yang diisi benar dan milik sendiri.",
            "Akun tidak boleh dipakai untuk mengakses, mengubah, atau menghapus data milik orang lain.",
            "Pengguna di bawah usia dewasa sebaiknya memakai aplikasi dengan pendampingan orang tua, wali, atau pendamping yang bertanggung jawab."
          ]
        },
        {
          title: "Batasan informasi kesehatan",
          body:
            "Konten DM, gizi, fase kehidupan, FINDRISC, dan CERDIK disediakan untuk membantu pemahaman awal dan kebiasaan pencegahan.",
          bullets: [
            "Hasil FINDRISC adalah skrining non-lab, bukan diagnosis Diabetes Melitus.",
            "Jika ada keluhan menetap, kehamilan, riwayat DM, atau kondisi khusus, pengguna perlu menghubungi tenaga kesehatan.",
            "Keputusan pemeriksaan, diagnosis, obat, terapi, dan tindakan medis tetap berada pada tenaga kesehatan."
          ]
        },
        {
          title: "Akun, keamanan, dan reminder",
          body:
            "Beberapa fitur membutuhkan akun agar hasil skrining, profil fase, dan reminder bisa tersimpan terpisah untuk setiap pengguna.",
          bullets: [
            "Pengguna wajib menjaga kerahasiaan akses akun dan tidak membagikan kode atau kredensial kepada pihak lain.",
            "Reminder WhatsApp hanya dikirim berdasarkan pengaturan yang dibuat pengguna dan dapat diubah atau dimatikan.",
            "Layanan dapat terganggu sementara karena pemeliharaan, perubahan teknis, atau gangguan pihak ketiga seperti email, WhatsApp, hosting, dan jaringan."
          ]
        },
        {
          title: "Konten dan larangan penggunaan",
          body:
            "Pengguna dapat membaca materi, mengisi evaluasi, dan memberi umpan balik untuk membantu pengembangan aplikasi.",
          bullets: [
            "Dilarang mengirim konten yang melanggar hukum, menyesatkan, mengandung data pribadi orang lain tanpa izin, atau mengganggu layanan.",
            "Dilarang mencoba merusak sistem, melakukan scraping berlebihan, atau menyalahgunakan fitur autentikasi.",
            "Materi aplikasi dapat diperbarui mengikuti validasi, kebutuhan produk, dan rujukan kesehatan yang lebih baru."
          ]
        },
        {
          title: "Dasar umum dan perubahan",
          body:
            "Ketentuan ini disusun secara umum dengan memperhatikan praktik layanan elektronik di Indonesia, termasuk prinsip kehati-hatian dalam UU ITE sebagaimana telah diubah terakhir dengan UU No. 1 Tahun 2024.",
          bullets: [
            "Versi ini bukan nasihat hukum final dan dapat disesuaikan sebelum rilis publik skala besar.",
            "Perubahan penting sebaiknya diberitahukan melalui aplikasi atau kanal resmi pengelola.",
            "Jika ada bagian yang tidak berlaku, bagian lain tetap dapat digunakan sejauh diizinkan hukum yang berlaku di Indonesia."
          ]
        }
      ]
    },
    privasiData: {
      title: "Privasi Data",
      intro:
        "Cara aplikasi memakai dan melindungi data akun, skrining, dan reminder.",
      callout:
        "Privasi ini mengikuti prinsip UU No. 27 Tahun 2022: tujuan jelas, data terbatas, aman, dan bisa dikontrol pengguna.",
      nextActions: [
        { label: "Baca Syarat & Ketentuan", to: "/syarat-ketentuan" },
        { label: "Masuk ke Profil", to: "/dashboard/profil" }
      ],
      sections: [
        {
          title: "Data yang dikumpulkan",
          body:
            "Data yang dipakai bergantung pada fitur yang digunakan. Tidak semua pengguna akan mengisi semua data.",
          bullets: [
            "Data akun: nama, email atau nomor WhatsApp, kata sandi yang disimpan dalam bentuk hash, dan status verifikasi.",
            "Data profil dan skrining: fase kehidupan, usia, tinggi, berat, lingkar perut, jawaban FINDRISC, skor, kategori risiko, dan catatan tindak lanjut.",
            "Data fitur: pengaturan reminder, riwayat reminder, evaluasi edukasi, umpan balik, serta data teknis dasar seperti waktu akses dan log keamanan.",
            "Penyimpanan browser dipakai untuk sesi login, preferensi, dan persetujuan cookie."
          ]
        },
        {
          title: "Tujuan penggunaan data",
          body:
            "Data digunakan untuk menjalankan fitur inti aplikasi dan menjaga pengalaman pengguna tetap personal namun sederhana.",
          bullets: [
            "Membuat akun, login, memulihkan akses, dan memisahkan data antar pengguna.",
            "Menyimpan hasil skrining, menampilkan riwayat, membuat laporan PDF, dan mengirim ringkasan bila fitur email aktif.",
            "Mengirim reminder WhatsApp sesuai jadwal yang dipilih serta memperbaiki materi, alur, dan kualitas aplikasi."
          ]
        },
        {
          title: "Penyimpanan dan pembagian data",
          body:
            "Data disimpan pada database aplikasi dan hanya dibagikan sejauh diperlukan untuk menjalankan layanan.",
          bullets: [
            "Data dapat diproses oleh penyedia infrastruktur seperti server, database, email, atau WhatsApp reminder.",
            "Data tidak dijual sebagai data pribadi pengguna.",
            "Data dapat dibuka bila diwajibkan oleh hukum, perintah otoritas yang sah, atau untuk melindungi keamanan layanan."
          ]
        },
        {
          title: "Hak dan kontrol pengguna",
          body:
            "Anda bisa mengelola data akun melalui fitur yang tersedia.",
          bullets: [
            "Pengguna dapat memperbarui profil, mengekspor data akun, menghapus hasil skrining, menghapus riwayat skrining, atau menghapus akun.",
            "Pengguna dapat menonaktifkan reminder WhatsApp kapan saja dari halaman reminder.",
            "Permintaan akses, koreksi, penarikan persetujuan, atau penghapusan data dapat dilakukan melalui fitur profil dan kanal resmi pengelola aplikasi."
          ]
        },
        {
          title: "Keamanan, retensi, dan batasan",
          body:
            "Aplikasi menerapkan langkah keamanan dasar seperti autentikasi, pemisahan data per akun, dan pembatasan akses endpoint.",
          bullets: [
            "Data disimpan selama akun aktif atau selama diperlukan untuk tujuan fitur, kecuali pengguna menghapusnya atau hukum mewajibkan penyimpanan lebih lama.",
            "Tidak ada sistem yang sepenuhnya bebas risiko, sehingga pengguna tetap perlu menjaga akses akun dan perangkatnya.",
            "Kebijakan ini dapat diperbarui bila fitur, provider, atau kewajiban hukum berubah."
          ]
        }
      ]
    },
    kontak: {
      layout: "contact",
      title: "Kontak",
      intro:
        "Untuk pertanyaan, koreksi materi, bantuan akun, atau permintaan terkait data.",
      callout:
        "Untuk keluhan kesehatan, tetap hubungi tenaga kesehatan.",
      nextActions: [
        { label: "Kirim email", to: "mailto:hudaya.azra@gmail.com" },
        { label: "Baca Privasi Data", to: "/privasi-data" }
      ],
      sections: [
        {
          title: "Email",
          body:
            "Gunakan email untuk kebutuhan umum terkait aplikasi.",
          bullets: [
            "Alamat: hudaya.azra@gmail.com",
            "Sertakan nama akun dan ringkasan kebutuhan."
          ]
        },
        {
          title: "Batas bantuan",
          body:
            "Kontak ini tidak menggantikan konsultasi medis atau layanan darurat.",
          bullets: [
            "Untuk kondisi darurat, hubungi layanan kesehatan terdekat.",
            "Masukan produk dipakai untuk memperbaiki materi dan alur aplikasi."
          ]
        }
      ]
    },
    deteksiDini: {
      title: "Cek risiko awal dengan mudah",
      intro:
        "Isi data dasar dan beberapa pertanyaan untuk mengenali risiko lebih awal.",
      callout: "Ini skrining awal, bukan diagnosis. Jika ada keluhan, lanjut periksa ke tenaga kesehatan.",
      sections: [
        {
          title: "Kuis faktor risiko",
          body: "Pertanyaan FINDRISC melihat usia, IMT, lingkar perut, aktivitas, pola makan, obat tekanan darah, dan riwayat DM.",
          bullets: [
            "Kondisi khusus seperti hamil, usia di bawah 18 tahun, diagnosis DM, atau keluhan menetap diarahkan ke halaman yang lebih sesuai.",
            "Hasil akhir dipakai untuk menentukan langkah berikutnya."
          ]
        },
        {
          title: "Kalkulator IMT",
          body: "Masukkan tinggi dan berat badan untuk melihat gambaran IMT.",
          bullets: [
            "IMT membantu membaca risiko umum terkait berat badan.",
            "Perlu dibaca bersama lingkar perut dan gaya hidup."
          ]
        },
        {
          title: "Lingkar perut",
          body: "Lingkar perut membantu melihat risiko obesitas sentral. Untuk perempuan, 80 cm atau lebih perlu lebih waspada.",
          bullets: [
            "Lakukan pengukuran pada posisi dan waktu yang konsisten.",
            "Gunakan angka ini untuk mulai mengevaluasi kebiasaan harian."
          ]
        },
        {
          title: "Kapan cek gula darah",
          body: "Cek lanjutan dianjurkan bila ada beberapa faktor risiko, gejala menetap, kehamilan, atau riwayat DM gestasional.",
          bullets: [
            "Segera periksa jika ada gejala klasik yang menetap.",
            "Ibu hamil perlu memperhatikan jadwal skrining 24-28 minggu."
          ]
        }
      ]
    },
    faq: {
      title: "Pertanyaan umum seputar DM pada perempuan",
      intro: "Jawaban singkat untuk pertanyaan yang sering muncul.",
      items: [
        {
          question: "Apakah DM hanya terjadi pada usia lanjut?",
          answer: "Tidak. Risiko memang naik seiring usia, tetapi remaja, ibu hamil, dan ibu nifas juga bisa berisiko."
        },
        {
          question: "Apakah ibu hamil perlu skrining khusus?",
          answer: "Ya. Cek gula darah saat hamil biasanya dibahas pada usia kehamilan 24-28 minggu, terutama bila ada faktor risiko."
        },
        {
          question: "Apakah menyusui membantu pencegahan DM?",
          answer: "Menyusui dapat membantu pemulihan metabolik ibu dan mendukung berat badan yang lebih sehat."
        },
        {
          question: "Apakah hasil skrining risiko bisa menggantikan pemeriksaan dokter?",
          answer: "Tidak. Skrining hanya membantu melihat risiko awal. Diagnosis tetap perlu pemeriksaan tenaga kesehatan."
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
        "Materi remaja dibuat sebagai pengantar kebiasaan sehat. Untuk kondisi khusus, tetap minta arahan orang tua atau tenaga kesehatan.",
      visual: {
        title: "Ilustrasi remaja aktif",
        size: "1200 x 720 px",
        note: "Bisa berisi remaja berjalan/bersepeda, botol air, piring sederhana, dan ikon tidur/stres."
      },
      modules: [
        {
          label: "Kebiasaan",
          title: "Mulai dari hal harian yang paling sering terjadi.",
          body: "Mulai dari minuman lebih sehat, lebih sering bergerak, dan tidak duduk terlalu lama.",
          points: [
            "Pilih air putih lebih sering daripada minuman manis.",
            "Kurangi screen time yang membuat tubuh terlalu lama diam.",
            "Bangun kebiasaan bergerak yang disukai agar tidak terasa seperti hukuman."
          ]
        },
        {
          label: "Cek awal",
          title: "Fokus pada pemantauan sederhana.",
          body: "FINDRISC belum cocok untuk usia di bawah 18 tahun, tapi edukasi risiko tetap bisa dimulai.",
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
          title: "Risiko yang perlu diperhatikan.",
          body: "Catat riwayat DM saat hamil, PCOS, bayi lahir besar, berat badan, lingkar perut, tekanan darah, dan kebiasaan harian.",
          points: [
            "Catat riwayat keluarga DM, PCOS, diabetes saat hamil, atau pernah melahirkan bayi besar.",
            "Perhatikan lingkar perut, IMT, tekanan darah, dan pola makan tinggi gula/garam/lemak.",
            "Gejala klasik yang menetap tetap menjadi alasan untuk cek gula darah di fasilitas kesehatan."
          ]
        },
        {
          label: "Cek",
          title: "Cek kesehatan berkala dibuat lebih praktis.",
          body: "Cek mandiri membantu memulai percakapan. Data medis tetap perlu dikonfirmasi di layanan kesehatan.",
          visual: {
            title: "Kartu cek reproduksi dewasa",
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
          body: "Mulai dari ritme bergerak, mengurangi asap rokok, tidur cukup, dan menata stres harian.",
          points: [
            "Targetkan aktivitas sedang secara rutin, misalnya jalan cepat, bersepeda santai, berenang, atau olahraga yang realistis dilakukan.",
            "Buat rumah dan ruang kerja lebih bebas asap rokok.",
            "Gunakan jeda singkat untuk napas perlahan, peregangan, atau aktivitas yang menurunkan ketegangan."
          ]
        },
        {
          label: "Gizi",
          title: "Pakai 3J untuk menjaga ritme makan.",
          body: "Gunakan jumlah, jenis, dan jadwal untuk mengatur makan tanpa diet ekstrem.",
          points: [
            "Jumlah: mulai dari porsi yang cukup dan tujuan menjaga berat badan sehat.",
            "Jenis: pilih karbohidrat kompleks, protein tanpa lemak, sayur, buah, dan batasi gorengan/minuman manis.",
            "Jadwal: makan utama dan selingan kecil dibuat teratur agar tidak berakhir makan berlebihan."
          ]
        },
        {
          label: "Kehamilan",
          title: "Rencanakan kehamilan lebih sehat.",
          body: "Jika sedang merencanakan kehamilan, fase ini cocok untuk merapikan faktor risiko lebih dulu.",
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
          title: "Fokus utama: gula darah saat hamil.",
          body: "Saat hamil, pemeriksaan gula darah mengikuti arahan tenaga kesehatan, bukan skor risiko 10 tahun.",
          points: [
            "Perhatikan riwayat DM gestasional, obesitas, PCOS, riwayat bayi lahir besar, atau riwayat keluarga DM.",
            "Skrining DM gestasional perlu dibicarakan dengan tenaga kesehatan, terutama pada usia kehamilan 24-28 minggu.",
            "Keluhan yang terasa menetap sebaiknya tidak ditunda untuk dikonsultasikan."
          ]
        },
        {
          label: "Cek",
          title: "Pemeriksaan rutin dibuat sebagai pegangan.",
          body: "Aplikasi membantu mengingat poin penting. Pemeriksaan tetap mengikuti bidan, dokter, atau fasilitas kesehatan.",
          visual: {
            title: "Alur cek ibu hamil",
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
          body: "Aktivitas saat hamil perlu menyesuaikan kondisi ibu dan arahan tenaga kesehatan.",
          points: [
            "Pilih aktivitas ringan sampai sedang seperti jalan santai atau gerakan yang disetujui tenaga kesehatan.",
            "Hentikan aktivitas dan minta arahan bila muncul keluhan tidak biasa.",
            "Gabungkan gerak ringan dengan istirahat yang cukup agar tubuh tidak terlalu lelah."
          ]
        },
        {
          label: "Gizi",
          title: "Pola makan mengikuti 3J dan kebutuhan kehamilan.",
          body: "Perhatikan porsi, jenis makanan, jadwal makan, serta batas gula, garam, dan lemak.",
          points: [
            "Jumlah: sesuaikan makan dengan kebutuhan ibu dan pertumbuhan janin, bukan makan berlebihan.",
            "Jenis: pilih karbohidrat kompleks, protein tanpa lemak, sayur, buah, dan air putih.",
            "Jadwal: makan utama dan selingan kecil dapat membantu pola makan lebih teratur."
          ]
        },
        {
          label: "Keluarga",
          title: "Dukungan rumah ikut menentukan.",
          body: "Keluarga bisa membantu mengurangi asap rokok, menyiapkan makan lebih baik, dan mengingatkan jadwal kontrol.",
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
          body: "Setelah melahirkan, riwayat DM saat hamil, bayi lahir besar, dan pola hidup tetap perlu diperhatikan.",
          points: [
            "Jika pernah mengalami DM gestasional, risiko DM tipe 2 di masa depan perlu dipantau.",
            "Riwayat bayi lahir besar menjadi tanda penting untuk dicatat di konsultasi berikutnya.",
            "Keluhan seperti sering haus, cepat lelah, atau sering buang air kecil yang menetap perlu diperiksa."
          ]
        },
        {
          label: "Cek",
          title: "Setelah melahirkan, cek kesehatan tetap penting.",
          body: "Masa nifas sering sibuk. Reminder bisa membantu agar kontrol tidak terlewat.",
          visual: {
            title: "Cek pascapersalinan",
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
          body: "Menyusui dapat mendukung pemulihan metabolik ibu dan memberi manfaat untuk bayi.",
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
          body: "Gunakan prinsip 3J, piring seimbang, dan batasi gula, garam, serta lemak.",
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
          body: "Pada usia lanjut, penyakit penyerta dan risiko gula darah terlalu rendah perlu lebih diperhatikan.",
          points: [
            "Perhatikan riwayat hipertensi, kolesterol tinggi, penyakit jantung, stroke, atau penggunaan obat DM.",
            "Waspadai tanda gula darah terlalu rendah seperti gemetar, keringat dingin, lemas, bingung, atau pusing.",
            "Pengaturan target kesehatan lansia perlu mengikuti dokter/tenaga kesehatan, tidak disamakan dengan usia muda."
          ]
        },
        {
          label: "PATUH",
          title: "Gunakan PATUH untuk pencegahan komplikasi.",
          body: "Jika sudah terdiagnosis DM, PATUH bisa menjadi pegangan harian.",
          points: [
            "Periksa kesehatan secara rutin.",
            "Atasi penyakit dengan pengobatan yang tepat dan teratur.",
            "Tetap aktivitas fisik, upayakan diet sehat, dan hindari asap rokok."
          ]
        },
        {
          label: "Cek",
          title: "Pemeriksaan rutin membantu tetap mandiri.",
          body: "Pemantauan tidak hanya gula darah, tetapi juga mata, ginjal, kaki, tekanan darah, dan lipid.",
          visual: {
            title: "Cek komplikasi lansia",
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
          title: "Perawatan kaki perlu rutin.",
          body: "Periksa kaki untuk mencegah luka yang terlambat disadari.",
          points: [
            "Periksa kaki setiap hari untuk melihat luka, kemerahan, kulit pecah, atau perubahan warna.",
            "Hindari berjalan tanpa alas kaki, termasuk di dalam rumah.",
            "Gunakan alas kaki nyaman dan minta bantuan bila sulit memeriksa telapak kaki sendiri."
          ]
        },
        {
          label: "Aktif",
          title: "Aktivitas aman lebih penting daripada berat.",
          body: "Pilih aktivitas yang aman, ringan, dan sesuai kemampuan tubuh.",
          points: [
            "Pilih jalan santai, senam ringan, berkebun, atau aktivitas rumah yang aman.",
            "Kurangi duduk terlalu lama dengan jeda gerak ringan.",
            "Bila ada komplikasi atau keluhan, tanyakan batas aktivitas kepada tenaga kesehatan."
          ]
        },
        {
          label: "Gizi",
          title: "Piring seimbang dan hidrasi tetap menjadi kunci.",
          body: "Tetap pakai 3J, batasi gula/garam/lemak, tambah sayur-buah, dan cukup minum air putih.",
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
