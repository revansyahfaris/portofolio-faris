import type { Achievement } from './types';

/**
 * Daftar penghargaan dan capaian eksternal.
 *
 * PERHATIAN — seluruh isi array ini masih placeholder. Bagian achievement adalah
 * klaim yang paling mudah diperiksa ulang oleh perekrut (nama lomba, penyelenggara,
 * dan tahun biasanya bisa dicari), sehingga entri yang tidak akurat justru merugikan.
 * Ganti dengan data sebenarnya, dan hapus entri yang tidak ada — daftar pendek yang
 * benar jauh lebih meyakinkan daripada daftar panjang yang meragukan.
 *
 * Bila belum ada capaian sama sekali, biarkan array ini kosong: komponen section
 * akan menampilkan keadaan kosong yang jujur, bukan kartu berisi data karangan.
 */
export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    award: 'Juara 2',
    competition: 'UI/UX Design Competition',
    organizer: 'Himpunan Mahasiswa Teknik Komputer',
    year: '2025',
    level: 'Nasional',
    description:
      'Merancang purwarupa antarmuka portal berita beserta alur kerja CMS admin, lengkap dengan design system dan uji kegunaan singkat.',
    participants: '120+ tim',
    tags: ['Figma', 'Design System', 'Usability Testing'],
  },
  {
    award: 'Finalis',
    competition: 'Hackathon Smart Campus',
    organizer: 'Universitas Diponegoro',
    year: '2025',
    level: 'Universitas',
    description:
      'Membangun sistem transparansi dana beasiswa dengan kontrol akses multi-peran dan audit log dalam waktu 48 jam.',
    participants: '40 tim',
    tags: ['Next.js', 'PostgreSQL', 'Express.js'],
  },
  {
    award: 'Penerima Pendanaan',
    competition: 'Program Kreativitas Mahasiswa (PKM)',
    organizer: 'Kementerian Pendidikan',
    year: '2025',
    level: 'Nasional',
    description:
      'Proposal purwarupa perangkat pemantau postur berbasis computer vision, lolos tahap pendanaan.',
    tags: ['Python', 'OpenCV', 'MediaPipe'],
  },
];
