import type { Quest } from './types';

/**
 * Arsip proyek.
 *
 * Sebelumnya data ini berada di portofolioConfig.projects dengan bidang yang jauh
 * lebih sedikit. Dipindahkan ke sini agar strukturnya bisa mencakup narasi lengkap
 * (masalah, solusi, fitur, tautan) tanpa membebani berkas konfigurasi identitas,
 * dan agar hanya ada satu sumber data proyek.
 *
 * Bidang image sengaja dikosongkan untuk seluruh entri karena berkas tangkapan
 * layarnya belum ada di folder public. Menunjuk ke berkas yang tidak ada akan
 * menghasilkan gambar rusak — sinyal yang jauh lebih buruk daripada tidak ada
 * gambar sama sekali. Isi kembali bidang image dan imageAlt begitu tangkapan
 * layarnya tersedia; panel rincian akan otomatis menampilkannya.
 *
 * PERHATIAN — bidang links masih menunjuk ke alamat placeholder. Tautan yang rusak
 * atau mengarah ke halaman umum lebih merugikan daripada tidak ada tautan sama
 * sekali: pembaca yang menekan "Demo" lalu mendarat di halaman profil GitHub akan
 * menyimpulkan proyeknya tidak benar-benar ada. Kosongkan bidang yang belum punya
 * alamat sebenarnya — tombolnya otomatis tidak dirender.
 */
export const QUESTS: readonly Quest[] = [
  {
    code: 'QST-01',
    title: 'Digital Footprint Map',
    tagline: 'Memetakan jejak data pribadi yang tersebar di berbagai layanan menjadi satu grafik.',
    category: 'Full-Stack Web',
    year: '2026',
    status: 'Selesai',
    problem:
      'Orang jarang tahu berapa banyak layanan yang menyimpan data pribadinya dan bagaimana layanan-layanan itu saling terhubung, karena informasinya tersebar dan tidak pernah tampil dalam satu tampilan.',
    solution:
      'Aplikasi web yang mencatat tiap layanan beserta data yang diberikan kepadanya, lalu menampilkannya sebagai grafik jaringan radial. Data sensitif dienkripsi memakai Fernet (AES-128) sebelum disimpan.',
    features: [
      'Grafik jaringan radial interaktif yang bisa digeser dan diperbesar',
      'Enkripsi data sensitif di sisi server sebelum masuk basis data',
      'Arsitektur serverless sehingga biaya operasional mendekati nol saat menganggur',
    ],
    technologies: ['FastAPI', 'React', 'TypeScript', 'Neon Postgres', 'React Flow'],
    links: {},
  },
  {
    code: 'QST-02',
    title: 'Doomscroll & AI Posture',
    tagline: 'Aplikasi desktop yang menegur ketika postur duduk mulai membungkuk.',
    category: 'Computer Vision',
    year: '2026',
    status: 'Selesai',
    problem:
      'Postur membungkuk saat menatap layar berlangsung tanpa disadari, dan pengingat berbasis waktu tidak membantu karena tidak tahu kondisi postur yang sebenarnya.',
    solution:
      'Aplikasi desktop yang membaca kemiringan kepala dari kamera secara waktu nyata memakai MediaPipe, lalu membunyikan alarm hanya ketika postur benar-benar melewati ambang batas.',
    features: [
      'Deteksi kemiringan kepala waktu nyata tanpa mengirim gambar ke mana pun',
      'Pemrosesan kamera pada thread terpisah agar antarmuka tetap responsif',
      'Ambang batas dan penundaan alarm yang bisa disetel pengguna',
    ],
    technologies: ['Python', 'OpenCV', 'Google MediaPipe', 'Multi-Threading'],
    links: {},
  },
  {
    code: 'QST-03',
    title: 'SI-PATRA System',
    tagline: 'Sistem transparansi penyaluran dana beasiswa dengan jejak audit.',
    category: 'Full-Stack Web',
    year: '2026',
    status: 'Selesai',
    problem:
      'Penyaluran dana beasiswa sulit ditelusuri karena pencatatannya terpisah-pisah, sehingga penerima tidak punya cara memverifikasi status dananya sendiri.',
    solution:
      'Aplikasi web dengan tiga peran (mahasiswa, pelapor, admin). Setiap perubahan data tercatat pada audit log yang tidak bisa disunting, sehingga riwayatnya selalu bisa ditelusuri.',
    features: [
      'Kontrol akses berbasis peran dengan pembatasan di sisi server',
      'Audit log yang mencatat setiap perubahan beserta pelakunya',
      'Papan ringkasan status penyaluran per periode',
    ],
    technologies: ['Next.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    links: {},
  },
  {
    code: 'QST-04',
    title: 'MandalaSwara News Portal',
    tagline: 'Purwarupa antarmuka portal berita beserta alur kerja redaksinya.',
    category: 'UI/UX Design',
    year: '2026',
    status: 'Purwarupa',
    problem:
      'Portal berita daerah umumnya dirancang hanya dari sisi pembaca, sehingga alur kerja redaksi yang harus menerbitkan puluhan artikel per hari justru tidak terlayani.',
    solution:
      'Perancangan menyeluruh dua sisi: tampilan pembaca dan panel redaksi. Keduanya dibangun di atas satu design system agar dapat diimplementasikan tanpa penerjemahan ulang.',
    features: [
      'Design system dengan token warna, tipografi, dan komponen yang terdefinisi',
      'Alur kerja redaksi dari draf hingga terbit, termasuk peninjauan',
      'Purwarupa interaktif yang bisa dicoba langsung sebelum dikembangkan',
    ],
    technologies: ['Figma', 'UI/UX Design', 'Design System'],
    links: {},
  },
];
