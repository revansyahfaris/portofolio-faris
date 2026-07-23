'use client';

import { Briefcase, Building2, Users, LucideIcon } from 'lucide-react';

interface Experience {
  rank: string;
  role: string;
  company: string;
  period: string;
  icon: LucideIcon;
  desc: string;
}

const experiences: Experience[] = [
  {
    rank: 'RANK 01',
    role: 'IT / Operations Intern',
    company: 'Bank Jateng',
    period: '1 Month Internship',
    icon: Building2,
    desc: 'Mendukung operasional infrastruktur digital, pengelolaan alur data instansi finansial, dan efisiensi kerja korporasi.',
  },
  {
    rank: 'RANK 02',
    role: 'Founder & UI/UX Lead',
    company: 'Meja Belakang Production',
    period: '2022 - Present',
    icon: Briefcase,
    desc: 'Mengembangkan bisnis studio kreatif desain grafis & UI/UX web/aplikasi untuk puluhan klien lintas industri.',
  },
  {
    rank: 'RANK 03',
    role: 'Staff Embedded System',
    company: 'Computer Engineering Research Club (CERC)',
    period: '2026 - Present',
    icon: Users,
    desc: 'Riset dan perancangan prototype sistem tertanam (microcontroller, sensor, hardware troubleshooting).',
  },
  {
    rank: 'RANK 04',
    role: 'Head of R&D Division',
    company: 'Sosial HIMASKOM UNDIP',
    period: '2026 - Present',
    icon: Users,
    desc: 'Memimpin program kerja divisi, koordinasi alur kerja tim, dan evaluasi inovasi program kerja organisasi.',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="border-t-2 border-white/20 bg-zinc-950 p-6 md:p-16 text-white relative select-none">
      
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <div className="border-b-2 border-white/20 pb-6">
          <div className="inline-block bg-red-600 text-white font-serif font-black text-xs px-3 py-1 -rotate-2 tracking-widest uppercase mb-2">
            FOLLOWER BONDS // EXP &amp; LEADERSHIP
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tighter uppercase text-white -rotate-1">
            CAREER &amp; <span className="text-teal-400">ORGANIZATION.</span>
          </h2>
        </div>

        {/* EXPERIENCE LIST (METAPHOR FOLLOWER RANK STYLE) */}
        <div className="space-y-6">
          {experiences.map((exp: Experience, idx: number) => {
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-zinc-900 border-2 border-zinc-800 gap-6 transition hover:border-red-600 hover:bg-zinc-900/90 -rotate-1 hover:rotate-0 shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 95%)' }}
              >
                <div className="flex items-start gap-4">
                  {/* RANK BADGE */}
                  <div className="flex flex-col items-center justify-center bg-red-600 text-white font-serif font-black px-3 py-2 -skew-x-12 shadow-md shrink-0">
                    <span className="text-[10px] tracking-widest text-red-200">BOND</span>
                    <span className="text-xs">{exp.rank}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-teal-400" />
                      <h3 className="text-xl font-serif font-black text-white uppercase tracking-tight">
                        {exp.role}
                      </h3>
                    </div>
                    <p className="text-xs font-mono font-bold text-red-500 mt-0.5">{exp.company}</p>
                    <p className="text-xs md:text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-zinc-300 bg-zinc-800 px-4 py-1.5 border border-zinc-700 -skew-x-12 self-start md:self-center shrink-0">
                  {exp.period}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}