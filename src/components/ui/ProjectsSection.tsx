'use client';

import { ExternalLink } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Project {
  title: string;
  subtitle: string;
  tech: string[];
  desc: string;
  date: string;
  code: string;
}

const projects: Project[] = [
  {
    code: 'QST-01',
    title: 'Digital Footprint Map',
    subtitle: 'Cyber Radar & Privacy Network Topology',
    tech: ['FastAPI', 'React', 'TypeScript', 'Neon Postgres', 'React Flow'],
    desc: 'Web serverless full-stack dengan enkripsi Fernet (AES-128) dan grafik jaringan radial interaktif untuk analisis privasi.',
    date: '2026',
  },
  {
    code: 'QST-02',
    title: 'Doomscroll & AI Posture',
    subtitle: 'Computer Vision Desktop App',
    tech: ['Python', 'OpenCV', 'Google MediaPipe', 'Multi-Threading'],
    desc: 'Aplikasi desktop melacak postur kepala secara real-time dan memicu alarm suara otomatis saat postur membungkuk.',
    date: '2026',
  },
  {
    code: 'QST-03',
    title: 'SI-PATRA System',
    subtitle: 'Scholarship Fund Transparency',
    tech: ['Next.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    desc: 'Sistem transparansi dana beasiswa dengan kontrol akses multi-role (Student, Reporter, Admin) serta audit log.',
    date: '2026',
  },
  {
    code: 'QST-04',
    title: 'MandalaSwara News Portal',
    subtitle: 'High-Fidelity Interactive Prototype',
    tech: ['Figma', 'UI/UX Design', 'Design System'],
    desc: 'Perancangan antarmuka portal berita modern lengkap dengan workflow CMS Admin dan animasi interaktif.',
    date: '2026',
  },
];

// Komponen Card Terpisah agar Panggilan Hook Legal
function ProjectCard({ proj }: { proj: Project }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group relative bg-zinc-900 border-2 border-zinc-800 p-6 transition-all duration-300 hover:border-red-600 hover:bg-zinc-900/90 flex flex-col justify-between hover:rotate-1 hover:-translate-y-2 shadow-xl cursor-pointer atlus-scroll-hidden ${
        isInView ? 'atlus-scroll-visible' : ''
      }`}
      style={{ clipPath: 'polygon(0 0, 100% 0, 97% 100%, 0 96%)' }}
    >
      <div>
        <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
          <span className="font-mono font-black text-xs bg-red-600 text-white px-2 py-0.5 -rotate-2 group-hover:bg-white group-hover:text-zinc-950 transition duration-150">
            {proj.code}
          </span>
          <span className="text-xs font-mono text-zinc-500">{proj.date}</span>
        </div>

        <h3 className="text-2xl font-serif font-black text-white group-hover:text-red-500 transition duration-150 tracking-tight uppercase">
          {proj.title}
        </h3>
        <p className="text-xs font-mono text-teal-400 mb-3">{proj.subtitle}</p>
        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed mb-6">
          {proj.desc}
        </p>
      </div>

      <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {proj.tech.map((t: string, i: number) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700 -skew-x-6 group-hover:border-zinc-500 transition"
            >
              {t}
            </span>
          ))}
        </div>
        <ExternalLink
          size={16}
          className="text-zinc-500 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-150"
        />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.2 });

  return (
    <section id="projects" className="min-h-screen border-t-4 border-red-600 bg-zinc-950 p-6 md:p-16 text-white relative overflow-hidden select-none">
      <div 
        className="absolute -top-10 -right-20 w-[600px] h-[300px] bg-red-950/20 -rotate-12 pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 100% 20%, 80% 100%, 0 80%)' }}
      />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10 pt-4">
        {/* HEADER SECTION */}
        <div 
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-white/20 pb-6 atlus-scroll-hidden ${
            headerInView ? 'atlus-scroll-visible' : ''
          }`}
        >
          <div>
            <div className="inline-block bg-white text-zinc-950 font-serif font-black text-xs px-3 py-1 -rotate-2 tracking-widest uppercase mb-2">
              QUEST ARCHIVE // SELECTED WORKS
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tighter uppercase text-white -rotate-1">
              ENGINEERING <span className="text-red-500">PROJECTS.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-4 py-2 -skew-x-12 self-start md:self-auto">
            TOTAL RECORDS: <span className="text-red-500 font-bold">20+ ARCHIVES</span>
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj: Project, idx: number) => (
            <ProjectCard key={idx} proj={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}