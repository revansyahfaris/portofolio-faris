/**
 * Sumber data tunggal untuk seluruh konten portofolio (identitas, sosial media,
 * proyek, dan pengalaman kerja/organisasi).
 *
 * Catatan: bagian "projects" dan "experiences" belum ditampilkan di UI manapun
 * saat ini — data ini disiapkan lebih dulu untuk section yang direncanakan
 * menyusul (menu "QUEST"/"COMPANY"/"ACADEMY" di HeroSection sudah mengarah ke
 * targetId yang section-nya belum dibuat). Bukan dead code, jangan dihapus.
 */
export const portofolioConfig = {
  // -------------------------------------------------------------
  // 1. PERSONAL IDENTITY & HUMAN TOUCH
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
    // Human/Personal story snippet (Bikin terasa autentik!)
    bioHuman:
      'Saat tidak ngoding arsitektur database atau ngoprek mikrokontroler di lab, biasanya saya lagi mendesain UI/UX interaktif sambil ngopi atau bikin skrip cerita naratif.',
    assets: {
      avatar: '/assets/hero/profile-portrait.png', // Foto profil transparan
      signature: '/assets/hero/signature.svg',
    },
  },

  // -------------------------------------------------------------
  // 2. SOCIAL & CONTACT LINKS
  // -------------------------------------------------------------
  socials: {
    github: 'https://github.com/revansyahfaris',
    linkedin: 'https://linkedin.com/in/farisrevan',
    email: 'mailto:farisrevan13@gmail.com',
    instagram: 'https://instagram.com/mejabelakang.studio',
  },

  // -------------------------------------------------------------
  // 3. FEATURED PROJECTS (QUEST ARCHIVE)
  // -------------------------------------------------------------
  projects: [
    {
      code: 'QST-01',
      title: 'Digital Footprint Map',
      subtitle: 'Cyber Radar & Privacy Network Topology',
      tech: ['FastAPI', 'React', 'TypeScript', 'Neon Postgres', 'React Flow'],
      desc: 'Web serverless full-stack dengan enkripsi Fernet (AES-128) dan grafik jaringan radial interaktif untuk analisis privasi.',
      date: '2026',
      image: '/assets/projects/project-01.webp',
      link: 'https://github.com/revansyahfaris',
    },
    {
      code: 'QST-02',
      title: 'Doomscroll & AI Posture',
      subtitle: 'Computer Vision Desktop App',
      tech: ['Python', 'OpenCV', 'Google MediaPipe', 'Multi-Threading'],
      desc: 'Aplikasi desktop melacak postur kepala secara real-time dan memicu alarm suara otomatis saat postur membungkuk.',
      date: '2026',
      image: '/assets/projects/project-02.webp',
      link: 'https://github.com/revansyahfaris',
    },
    {
      code: 'QST-03',
      title: 'SI-PATRA System',
      subtitle: 'Scholarship Fund Transparency',
      tech: ['Next.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
      desc: 'Sistem transparansi dana beasiswa dengan kontrol akses multi-role (Student, Reporter, Admin) serta audit log.',
      date: '2026',
      image: '/assets/projects/project-03.webp',
      link: 'https://github.com/revansyahfaris',
    },
    {
      code: 'QST-04',
      title: 'MandalaSwara News Portal',
      subtitle: 'High-Fidelity Interactive Prototype',
      tech: ['Figma', 'UI/UX Design', 'Design System'],
      desc: 'Perancangan antarmuka portal berita modern lengkap dengan workflow CMS Admin dan animasi interaktif.',
      date: '2026',
      image: '/assets/projects/project-04.webp',
      link: 'https://figma.com',
    },
  ],

  // -------------------------------------------------------------
  // 4. EXPERIENCE & ORGANIZATIONS (FOLLOWER BONDS)
  // -------------------------------------------------------------
  experiences: [
    {
      rank: 'RANK 01',
      role: 'IT / Operations Intern',
      company: 'Bank Jateng',
      period: '1 Month Internship',
      logo: '/assets/experience/bank-jateng.png',
      desc: 'Mendukung operasional infrastruktur digital, pengelolaan alur data instansi finansial, dan efisiensi kerja korporasi.',
    },
    {
      rank: 'RANK 02',
      role: 'Founder & UI/UX Lead',
      company: 'Meja Belakang Production',
      period: '2022 - Present',
      logo: '/assets/experience/meja-belakang.png',
      desc: 'Mengembangkan bisnis studio kreatif desain grafis & UI/UX web/aplikasi untuk puluhan klien lintas industri.',
    },
    {
      rank: 'RANK 03',
      role: 'Staff Embedded System',
      company: 'Computer Engineering Research Club (CERC)',
      period: '2026 - Present',
      logo: '/assets/experience/cerc.png',
      desc: 'Riset dan perancangan prototype sistem tertanam (microcontroller, sensor, hardware troubleshooting).',
    },
    {
      rank: 'RANK 04',
      role: 'Head of R&D Division',
      company: 'Sosial HIMASKOM UNDIP',
      period: '2026 - Present',
      logo: '/assets/experience/himaskom.png',
      desc: 'Memimpin program kerja divisi, koordinasi alur kerja tim, dan evaluasi inovasi program kerja organisasi.',
    },
  ],
};