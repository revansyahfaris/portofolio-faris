/**
 * Sumber data tunggal untuk identitas dan kontak.
 *
 * Cakupan berkas ini sengaja dipersempit menjadi hal-hal yang dipakai lintas
 * section: identitas pribadi, tautan sosial, dan informasi kontak. Data yang hanya
 * relevan bagi satu section berada di berkas constants.ts pada folder section
 * masing-masing (experience/, achievement/, academy/, company/, quest/, skills/),
 * mengikuti pola yang sudah dipakai folder profile/.
 *
 * Pemisahan itu penting karena berkas konfigurasi terpusat cenderung tumbuh menjadi
 * tempat penampungan segalanya, dan setiap perubahan kecil pada satu section
 * akhirnya menyentuh berkas yang diimpor hampir seluruh halaman.
 */
export const portofolioConfig = {
  // -------------------------------------------------------------
  // 1. IDENTITAS PRIBADI
  // -------------------------------------------------------------
  personal: {
    name: 'Muhammad Faris Revansyah',
    nickname: 'Faris',
    tagline: 'An engineer with art in mind',
    classYear: "UNDIP Computer Engineering '24",
    location: 'Semarang, Indonesia',
    status: 'READY FOR QUEST',
    gpa: '3.61',
    bioShort:
      'Creating a software and/or hardware solution in an efficient, creative, and beutiful way!',
    bioHuman:
      'Saat tidak ngoding arsitektur database atau ngoprek mikrokontroler di lab, biasanya saya lagi mendesain UI/UX interaktif sambil ngopi atau bikin skrip cerita naratif.',
    assets: {
      avatar: '/assets/hero/profile-portrait.png',
      signature: '/assets/hero/signature.svg',
    },
  },

  // -------------------------------------------------------------
  // 2. TAUTAN SOSIAL
  // -------------------------------------------------------------
  socials: {
    github: 'https://github.com/revansyahfaris',
    linkedin: 'https://linkedin.com/in/farisrevan',
    email: 'mailto:farisrevan13@gmail.com',
    instagram: 'https://instagram.com/mejabelakang.studio',
  },

  // -------------------------------------------------------------
  // 3. KONTAK & KETERSEDIAAN
  // -------------------------------------------------------------
  contact: {
    /** Alamat email tanpa awalan mailto:, agar bisa ditampilkan sekaligus disalin. */
    emailAddress: 'farisrevan13@gmail.com',
    /**
     * Nomor WhatsApp format internasional tanpa tanda plus maupun spasi, sesuai
     * yang dibutuhkan tautan wa.me.
     * GANTI dengan nomor sebenarnya sebelum dipublikasikan.
     */
    whatsappNumber: '6281292635514',
    /** Pesan pembuka yang otomatis terisi saat tautan WhatsApp dibuka. */
    whatsappGreeting: 'Halo Faris, saya menemukan portofolio Anda dan ingin berdiskusi soal',

    /**
     * Status ketersediaan. Ditampilkan menonjol karena inilah informasi pertama
     * yang menentukan apakah pembaca perlu repot menghubungi sama sekali.
     * Perbarui secara berkala — status yang basi lebih merugikan daripada tidak ada.
     */
    availability: {
      isOpen: true,
      label: 'Terbuka untuk magang & proyek freelance',
      detail: 'Dapat memulai pekerjaan baru mulai Q3 2026',
      /** Perkiraan waktu balas, menetapkan harapan sejak awal. */
      responseTime: 'Biasanya dibalas dalam 1×24 jam',
      timezone: 'GMT+7 (WIB)',
    },
  },
};
