'use client';

import Image from 'next/image';
import { useInView } from '@/hooks/useInView';
import { portofolioConfig } from '@/config/portofolioConfig';

type Experience = typeof portofolioConfig.experiences[number];

function ExperienceCard({ exp }: { exp: Experience }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row md:items-center justify-between p-6 bg-zinc-900 border-2 border-zinc-800 gap-6 transition-all duration-300 hover:border-red-600 hover:bg-zinc-900/90 -rotate-1 hover:rotate-0 shadow-lg atlus-scroll-hidden ${
        isInView ? 'atlus-scroll-visible' : ''
      }`}
      style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 95%)' }}
    >
      <div className="flex items-start gap-4">
        {/* RANK BADGE */}
        <div className="flex flex-col items-center justify-center bg-red-600 text-white font-serif font-black px-3 py-2 -skew-x-12 shadow-md shrink-0">
          <span className="text-[10px] tracking-widest text-red-200">BOND</span>
          <span className="text-xs">{exp.rank}</span>
        </div>

        <div className="flex items-start gap-3">
          {/* LOGO ORGANISASI/COMPANY ASSET */}
          {exp.logo && (
            <div className="relative w-12 h-12 rounded bg-zinc-950 border border-zinc-800 p-1 shrink-0">
              <Image
                src={exp.logo}
                alt={exp.company}
                fill
                className="object-contain p-1"
              />
            </div>
          )}

          <div>
            <h3 className="text-xl font-serif font-black text-white uppercase tracking-tight">
              {exp.role}
            </h3>
            <p className="text-xs font-mono font-bold text-red-500 mt-0.5">{exp.company}</p>
            <p className="text-xs md:text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
              {exp.desc}
            </p>
          </div>
        </div>
      </div>

      <span className="text-xs font-mono text-zinc-300 bg-zinc-800 px-4 py-1.5 border border-zinc-700 -skew-x-12 self-start md:self-center shrink-0">
        {exp.period}
      </span>
    </div>
  );
}

export default function ExperienceSection() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.2 });

  return (
    <section id="experience" className="border-t-2 border-white/20 bg-zinc-950 p-6 md:p-16 text-white relative select-none">
      <div className="max-w-5xl mx-auto space-y-12">
        <div 
          ref={headerRef}
          className={`border-b-2 border-white/20 pb-6 atlus-scroll-hidden ${
            headerInView ? 'atlus-scroll-visible' : ''
          }`}
        >
          <div className="inline-block bg-red-600 text-white font-serif font-black text-xs px-3 py-1 -rotate-2 tracking-widest uppercase mb-2">
            FOLLOWER BONDS {'//'} EXP &amp; LEADERSHIP
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tighter uppercase text-white -rotate-1">
            CAREER &amp; <span className="text-teal-400">ORGANIZATION.</span>
          </h2>
        </div>

        <div className="space-y-6">
          {portofolioConfig.experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}