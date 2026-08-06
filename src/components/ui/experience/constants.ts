// File: src/components/ui/experience/constants.ts

import type { ExperienceEntry } from './types';

export const EXPERIENCES: readonly ExperienceEntry[] = [
  {
    rank: 'I',
    role: 'UI/UX Designer & Frontend Dev',
    company: 'Bank Jateng',
    employmentType: 'Intern',
    period: 'Jul 2026 - Aug 2026',
    startISO: '2026-07',
    endISO: '2026-08',
    location: 'Kantor Pusat Bank Jateng, Semarang, Indonesia',
    project: 'Chatbot AI-LLM Project',
    summary:
      'Menyediakan layanan desain antarmuka dan pengalaman pengguna untuk proyek chatbot berbasis AI-LLM, termasuk prototipe interaktif dan sistem desain yang konsisten.',
    responsibilities: [
      'Mendesain prototipe interaktif untuk chatbot AI-LLM, termasuk alur percakapan dan antarmuka pengguna.',
      'Membuat sistem desain yang konsisten untuk memastikan keseragaman visual dan pengalaman pengguna di seluruh platform.',
      'Berkoordinasi dengan tim pengembang untuk mengimplementasikan desain dan memastikan kesesuaian dengan spesifikasi teknis.',
    ],
    metrics: [{ value: '1', label: 'Prototipe interaktif' }],
    stack: ['Figma', 'Design System', 'Next.js', 'Tailwind CSS', 'React', 'TypeScript'],
  },
  {
    rank: 'II',
    role: 'IT & Operations Intern',
    company: 'Bank Jateng',
    employmentType: 'Internship',
    period: 'Jul 2025 — Agu 2025',
    startISO: '2025-07',
    endISO: '2025-08',
    location: 'Kantor Pusat Bank Jateng, Semarang, Indonesia',
    project: 'IT Infrastructure & Data',
    summary:
      'Mendukung operasional infrastruktur digital dan pemeliharaan perangkat jaringan di lingkungan institusi finansial.',
    responsibilities: [
      'Membantu pemeliharaan perangkat dan jaringan kantor cabang harian.',
      'Merapikan alur pencatatan data operasional untuk efisiensi rekap.',
      'Menyusun dokumentasi SOP penanganan gangguan staf IT.',
    ],
    metrics: [
      { value: '1 bln', label: 'Program magang' },
      { value: '25%', label: 'Waktu rekap data berkurang' },
    ],
    stack: ['Excel / Spreadsheet', 'Networking', 'Hardware Troubleshooting', 'SOP Documentation'],
  },
  {
    rank: 'III',
    role: 'Head of R&D',
    company: 'SOSIAL HIMASKOM UNDIP',
    employmentType: 'Organization',
    period: '2026 — Sekarang',
    startISO: '2026-01',
    location: 'Universitas Diponegoro',
    project: 'R&D Department Ops',
    summary:
      'Memimpin divisi R&D: merancang program kerja, mengoordinasi tim, dan mengevaluasi hasil kegiatan.',
    responsibilities: [
      'Merancang dan menjalankan program kerja divisi bersama tim.',
      'Menetapkan alur kerja dan pelacakan tenggat program.',
      'Melakukan evaluasi pasca-kegiatan untuk perbaikan berkala.',
    ],
    metrics: [
      { value: '8', label: 'Anggota dikoordinasi' },
      { value: '5', label: 'Program kerja dijalankan' },
    ],
    stack: ['Project Planning', 'Team Coordination', 'Notion', 'Public Speaking'],
  },
  {
    rank: 'IV',
    role: 'Embedded System Staff',
    company: 'CERC UNDIP',
    employmentType: 'Research',
    period: '2026 — Sekarang',
    startISO: '2026-01',
    location: 'Universitas Diponegoro',
    project: 'Embedded Research',
    summary:
      'Riset dan perancangan purwarupa sistem tertanam, integrasi sensor, dan troubleshooting hardware.',
    responsibilities: [
      'Merakit dan menguji purwarupa mikrokontroler & sensor.',
      'Menelusuri kegagalan perangkat keras hingga tingkat rangkaian.',
      'Mendokumentasikan hasil riset untuk replikasi anggota.',
    ],
    metrics: [{ value: '3', label: 'Purwarupa diuji' }],
    stack: ['C / C++', 'ESP32', 'STM32', 'Sensor Integration', 'Oscilloscope'],
  },
];