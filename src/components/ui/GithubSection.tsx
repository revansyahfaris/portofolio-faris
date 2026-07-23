'use client';

import { GitCommit, GitPullRequest, Terminal } from 'lucide-react';

export default function GithubSection() {
  // Ganti dengan username GitHub kamu
  const githubUsername = 'revansyahfaris';

  return (
    <section className="border-t-4 border-red-600 bg-zinc-950 p-6 md:p-16 text-white relative select-none overflow-hidden">
      {/* Background Accent */}
      <div 
        className="absolute -bottom-10 -left-20 w-[500px] h-[250px] bg-teal-950/20 -rotate-12 pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 100% 20%, 80% 100%, 0 80%)' }}
      />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-white/20 pb-6">
          <div>
            <div className="inline-block bg-red-600 text-white font-serif font-black text-xs px-3 py-1 -rotate-2 tracking-widest uppercase mb-2">
              ACTIVITY LOG // REAL-TIME METRICS
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tighter uppercase text-white -rotate-1">
              GITHUB <span className="text-teal-400">CONTRIBUTIONS.</span>
            </h2>
          </div>

          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-4 py-2 -skew-x-12 font-mono text-xs text-zinc-300 hover:border-red-600 hover:text-white transition duration-150 self-start md:self-auto"
          >
            <Terminal size={14} className="text-red-500" />
            <span>@github/{githubUsername}</span>
          </a>
        </div>

        {/* HUD METRICS & GRAPH GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: ATLUS STYLE STAT CARDS */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div 
              className="bg-zinc-900 border-2 border-zinc-800 p-5 -rotate-1 hover:rotate-0 transition duration-150 flex items-center justify-between"
              style={{ clipPath: 'polygon(0 0, 100% 0, 97% 100%, 0 95%)' }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-600 text-white -skew-x-12">
                  <GitCommit size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Code Activity</p>
                  <p className="font-serif font-black text-lg">ACTIVE COMMITTER</p>
                </div>
              </div>
              <span className="font-mono text-xs text-red-500 font-bold">2026</span>
            </div>

            <div 
              className="bg-zinc-900 border-2 border-zinc-800 p-5 -rotate-1 hover:rotate-0 transition duration-150 flex items-center justify-between"
              style={{ clipPath: 'polygon(0 0, 100% 0, 97% 100%, 0 95%)' }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-teal-600 text-white -skew-x-12">
                  <GitPullRequest size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Repositories</p>
                  <p className="font-serif font-black text-lg">FULL-STACK &amp; EMBEDDED</p>
                </div>
              </div>
              <span className="font-mono text-xs text-teal-400 font-bold">PUBLIC</span>
            </div>
          </div>

          {/* RIGHT: REAL-TIME CONTRIBUTION GRAPH IMAGE */}
          <div 
            className="lg:col-span-8 bg-zinc-900 border-2 border-zinc-800 p-4 -rotate-1 hover:rotate-0 transition duration-200 flex flex-col justify-center items-center overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 96%)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=github-compact&bg_color=18181b&color=dc2626&line=0d9488&point=ffffff&area=true&hide_border=true`}
              alt="GitHub Activity Graph"
              className="w-full h-auto object-cover rounded filter contrast-125"
              loading="lazy"
            />
          </div>

        </div>

      </div>
    </section>
  );
}