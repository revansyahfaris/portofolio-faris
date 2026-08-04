import type { AcademyProfile } from './types';

/**
 * Data pendidikan formal.
 *
 * PERHATIAN — bagian coursework, roles, dan projects masih placeholder yang
 * disusun agar strukturnya bisa diuji dengan konten sepanjang aslinya. Ganti
 * dengan mata kuliah, peran asisten, dan proyek yang benar-benar diambil.
 *
 * Catatan soal IPK: menampilkan IPK hanya bermanfaat bila angkanya kompetitif
 * untuk konteks yang dituju. Bila suatu saat dirasa tidak relevan lagi (misalnya
 * setelah punya pengalaman kerja beberapa tahun), cukup kosongkan field gpa —
 * blok IPK akan otomatis tidak dirender tanpa perlu mengubah komponen.
 */
export const ACADEMY_PROFILE: AcademyProfile = {
  university: 'Universitas Diponegoro',
  faculty: 'Fakultas Teknik',
  major: 'Teknik Komputer',
  degree: 'S1 / Sarjana Teknik',
  period: '2024 — Sekarang',
  startISO: '2024-08',
  location: 'Semarang, Indonesia',
  gpa: '3.61',
  gpaScale: '4.00',
  focus:
    'Fokus pada perpaduan rekayasa perangkat lunak dan sistem tertanam: dari perancangan antarmuka hingga pemrograman perangkat keras.',

  coursework: [
    {
      area: 'Rekayasa Perangkat Lunak',
      courses: [
        'Pemrograman Berorientasi Objek',
        'Rekayasa Perangkat Lunak',
        'Basis Data',
        'Struktur Data & Algoritma',
      ],
    },
    {
      area: 'Sistem & Jaringan',
      courses: ['Jaringan Komputer', 'Sistem Operasi', 'Organisasi & Arsitektur Komputer'],
    },
    {
      area: 'Sistem Tertanam',
      courses: ['Mikroprosesor & Mikrokontroler', 'Sistem Digital', 'Elektronika Dasar'],
    },
    {
      area: 'Data & Kecerdasan Buatan',
      courses: ['Kecerdasan Buatan', 'Pengolahan Citra Digital', 'Probabilitas & Statistika'],
    },
  ],

  roles: [
    {
      title: 'Asisten Praktikum',
      scope: 'Praktikum Sistem Digital',
      period: '2025 — 2026',
      description:
        'Membimbing praktikan dalam perancangan rangkaian digital, memeriksa laporan, dan menilai hasil praktikum.',
    },
    {
      title: 'Anggota Laboratorium',
      scope: 'Lab Sistem Tertanam / CERC',
      period: '2026 — Sekarang',
      description:
        'Terlibat dalam pengujian purwarupa berbasis mikrokontroler dan dokumentasi hasil eksperimen.',
    },
  ],

  projects: [
    {
      title: 'Sistem Transparansi Dana Beasiswa',
      course: 'Rekayasa Perangkat Lunak',
      description:
        'Aplikasi web multi-peran dengan audit log untuk memantau penyaluran dana beasiswa secara terbuka.',
      stack: ['Next.js', 'Express.js', 'PostgreSQL'],
    },
    {
      title: 'Deteksi Postur Berbasis Computer Vision',
      course: 'Pengolahan Citra Digital',
      description:
        'Purwarupa desktop yang membaca kemiringan kepala secara waktu nyata dan memicu peringatan otomatis.',
      stack: ['Python', 'OpenCV', 'MediaPipe'],
    },
  ],
};
