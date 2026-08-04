import type { ExperienceEntry } from './types';

/**
 * Data pengalaman kerja dan organisasi.
 *
 * PERHATIAN — sebagian angka pada bagian "metrics" masih berupa placeholder yang
 * masuk akal, bukan hasil pengukuran sungguhan. Angka dampak adalah bagian yang
 * paling sering diverifikasi saat wawancara, jadi tiap nilai di bawah ini harus
 * diganti dengan angka yang benar-benar bisa dipertanggungjawabkan sebelum
 * portofolio dipublikasikan. Bila sebuah peran memang belum punya angka yang
 * jujur, kosongkan array metrics-nya — bagian itu akan otomatis tidak dirender,
 * dan itu jauh lebih baik daripada mencantumkan angka karangan.
 *
 * Urutan array menentukan urutan tampil: peran paling relevan diletakkan lebih
 * dulu, bukan yang paling baru secara kronologis, karena pembaca hampir selalu
 * berhenti setelah dua entri pertama.
 */
export const EXPERIENCES: readonly ExperienceEntry[] = [
  {
    rank: 'I',
    role: 'Founder & UI/UX Lead',
    company: 'Meja Belakang Production',
    employmentType: 'Founder',
    period: '2022 — Sekarang',
    startISO: '2022-01',
    location: 'Semarang, Indonesia (Remote)',
    summary:
      'Menjalankan studio kreatif yang mengerjakan desain grafis dan perancangan antarmuka web/aplikasi untuk klien lintas industri.',
    responsibilities: [
      'Memimpin proses desain dari riset kebutuhan klien, wireframe, sampai prototipe interaktif siap dikembangkan.',
      'Menyusun design system yang dipakai ulang antar proyek agar waktu pengerjaan klien baru turun signifikan.',
      'Menangani komunikasi klien, penetapan lingkup kerja, dan penyerahan aset akhir ke tim pengembang.',
    ],
    metrics: [
      { value: '30+', label: 'Proyek klien selesai' },
      { value: '4 thn', label: 'Studio berjalan' },
      { value: '40%', label: 'Waktu desain terpangkas' },
    ],
    stack: ['Figma', 'Design System', 'Adobe Illustrator', 'Next.js', 'Tailwind CSS'],
  },
  {
    rank: 'II',
    role: 'IT & Operations Intern',
    company: 'Bank Jateng',
    employmentType: 'Internship',
    period: 'Jul 2025 — Agu 2025',
    startISO: '2025-07',
    endISO: '2025-08',
    location: 'Semarang, Indonesia',
    summary:
      'Mendukung operasional infrastruktur digital dan pengelolaan alur data pada lingkungan institusi finansial.',
    responsibilities: [
      'Membantu pemeliharaan perangkat dan jaringan kantor cabang, termasuk penelusuran gangguan harian.',
      'Merapikan alur pencatatan data operasional sehingga proses rekap yang tadinya manual bisa dipangkas.',
      'Menyusun dokumentasi prosedur singkat agar langkah penanganan bisa diulang oleh staf lain.',
    ],
    metrics: [
      { value: '1 bln', label: 'Program magang' },
      { value: '25%', label: 'Waktu rekap data berkurang' },
    ],
    stack: ['Excel / Spreadsheet', 'Networking', 'Hardware Troubleshooting', 'SOP Documentation'],
  },
  {
    rank: 'III',
    role: 'Head of Research & Development',
    company: 'Departemen Sosial HIMASKOM UNDIP',
    employmentType: 'Organization',
    period: '2026 — Sekarang',
    startISO: '2026-01',
    location: 'Universitas Diponegoro',
    summary:
      'Memimpin divisi R&D: merancang program kerja, mengoordinasi alur kerja tim, dan mengevaluasi hasilnya.',
    responsibilities: [
      'Merancang dan menjalankan program kerja divisi bersama anggota lintas angkatan.',
      'Menetapkan alur kerja dan tenggat sehingga progres tiap program bisa dilacak secara terbuka.',
      'Melakukan evaluasi pasca-kegiatan sebagai dasar perbaikan program periode berikutnya.',
    ],
    metrics: [
      { value: '8', label: 'Anggota dikoordinasi' },
      { value: '5', label: 'Program kerja dijalankan' },
    ],
    stack: ['Project Planning', 'Team Coordination', 'Notion', 'Public Speaking'],
  },
  {
    rank: 'IV',
    role: 'Staff Embedded System',
    company: 'Computer Engineering Research Club (CERC)',
    employmentType: 'Research',
    period: '2026 — Sekarang',
    startISO: '2026-01',
    location: 'Universitas Diponegoro',
    summary:
      'Riset dan perancangan purwarupa sistem tertanam: mikrokontroler, integrasi sensor, dan penelusuran masalah perangkat keras.',
    responsibilities: [
      'Merakit dan menguji purwarupa berbasis mikrokontroler beserta pembacaan sensornya.',
      'Menelusuri kegagalan perangkat keras hingga ke tingkat rangkaian sebelum menyalahkan sisi perangkat lunak.',
      'Mendokumentasikan hasil pengujian agar dapat direplikasi anggota lain.',
    ],
    metrics: [{ value: '3', label: 'Purwarupa diuji' }],
    stack: ['C / C++', 'ESP32', 'STM32', 'Sensor Integration', 'Oscilloscope'],
  },
];
