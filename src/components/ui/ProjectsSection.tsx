'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { portofolioConfig } from '@/config/portofolioConfig';

type Project = typeof portofolioConfig.projects[number];

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
        {/* MOCKUP / PREVIEW IMAGE FROM PUBLIC ASSETS */}
        {proj.image && (
          <div className="relative w-full h-48 mb-4 border border-zinc-700 overflow-hidden bg-zinc-950">
            <Image
              src={proj.image}
              alt={proj.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-300 filter contrast-110"
            />
          </div>
        )}

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
        <a
          href={proj.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-150"
        >
          <ExternalLink size={16} />
        </a>
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
        style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 80%)' }}
      />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10 pt-4">
        <div 
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-white/20 pb-6 atlus-scroll-hidden ${
            headerInView ? 'atlus-scroll-visible' : ''
          }`}
        >
          <div>
            <div className="inline-block bg-white text-zinc-950 font-serif font-black text-xs px-3 py-1 -rotate-2 tracking-widest uppercase mb-2">
              QUEST ARCHIVE {'//'} SELECTED WORKS
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tighter uppercase text-white -rotate-1">
              ENGINEERING <span className="text-red-500">PROJECTS.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-4 py-2 -skew-x-12 self-start md:self-auto">
            TOTAL RECORDS: <span className="text-red-500 font-bold">{portofolioConfig.projects.length} ARCHIVES</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portofolioConfig.projects.map((proj, idx) => (
            <ProjectCard key={idx} proj={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}