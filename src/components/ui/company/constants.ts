import type { StudioProfile } from './types';

/**
 * Profil studio kreatif.
 *
 * PERHATIAN — angka pada proofPoints dan durasi pada workflow masih placeholder.
 * Keduanya adalah janji yang akan diukur oleh calon klien, jadi pastikan angkanya
 * benar-benar bisa dipenuhi sebelum dipublikasikan.
 *
 * Catatan penyusunan: kategori klien sengaja ditulis sebagai kategori, bukan nama
 * perusahaan. Menyebut nama klien tanpa izin tertulis berisiko secara hukum dan
 * profesional, sementara kategori sudah cukup untuk menunjukkan cakupan pengalaman.
 */
export const STUDIO_PROFILE: StudioProfile = {
  brand: 'Meja Belakang Production',
  tagline: 'Desain yang dikerjakan seperti perangkat lunak: terstruktur, teruji, bisa diserahterimakan.',

  positioning:
    'Studio kecil yang menangani desain antarmuka dan identitas visual untuk tim yang butuh hasil siap dikembangkan, bukan sekadar gambar yang bagus. Setiap penyerahan dilengkapi design system dan catatan implementasi, sehingga pengembang dapat langsung membangunnya tanpa menebak-nebak.',

  vision:
    'Menjadi mitra desain yang hasil kerjanya bisa langsung dipakai tim teknis tanpa penerjemahan ulang.',

  mission: [
    'Menyerahkan desain dalam bentuk yang siap dibangun: komponen konsisten, token warna dan tipografi terdefinisi.',
    'Menjaga keputusan desain tetap dapat dijelaskan alasannya, bukan sekadar selera.',
    'Menyesuaikan cakupan kerja dengan anggaran klien secara terbuka sejak awal.',
  ],

  services: [
    {
      code: 'S-01',
      name: 'UI/UX Design',
      description:
        'Perancangan antarmuka web dan aplikasi, dari alur pengguna sampai purwarupa interaktif.',
      deliverables: ['User flow', 'Wireframe', 'Purwarupa interaktif', 'Design system'],
    },
    {
      code: 'S-02',
      name: 'Frontend Development',
      description:
        'Implementasi antarmuka menjadi kode produksi yang responsif dan berperforma baik.',
      deliverables: ['Next.js / React', 'Komponen reusable', 'Optimasi performa'],
    },
    {
      code: 'S-03',
      name: 'Brand & Graphic Design',
      description:
        'Identitas visual dan aset grafis untuk kebutuhan promosi maupun produk digital.',
      deliverables: ['Logo & identitas', 'Panduan merek', 'Aset media sosial'],
    },
  ],

  clientCategories: [
    'UMKM & bisnis lokal',
    'Startup tahap awal',
    'Organisasi kampus',
    'Kreator & studio kecil',
    'Proyek riset akademik',
  ],

  workflow: [
    {
      step: '01',
      name: 'Discovery',
      description: 'Menggali tujuan, batasan, dan tolok ukur keberhasilan bersama klien.',
      duration: '2-3 hari',
    },
    {
      step: '02',
      name: 'Struktur',
      description: 'Menyusun alur pengguna dan kerangka antarmuka sebelum menyentuh visual.',
      duration: '3-5 hari',
    },
    {
      step: '03',
      name: 'Desain',
      description: 'Membangun tampilan akhir beserta design system yang menyertainya.',
      duration: '1-2 minggu',
    },
    {
      step: '04',
      name: 'Serah Terima',
      description: 'Menyerahkan aset, dokumentasi, dan sesi penjelasan untuk tim pengembang.',
      duration: '2-3 hari',
    },
  ],

  proofPoints: [
    { value: '30+', label: 'Proyek diselesaikan' },
    { value: '4 thn', label: 'Studio beroperasi' },
    { value: '5', label: 'Kategori klien' },
  ],
};
