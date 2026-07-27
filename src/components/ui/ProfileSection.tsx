'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Shield, Zap, Sword, User, Terminal, Cpu, Layers } from 'lucide-react';
import { portofolioConfig } from '../../config/portofolioConfig';
import { sfx } from '../../lib/sfx';

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState<'status' | 'params' | 'equipment'>('status');

  const handleTabChange = (tab: 'status' | 'params' | 'equipment') => {
    sfx.playSelect();
    setActiveTab(tab);
  };

  return (
    <section
      id="profile"
      className="relative min-h-[100dvh] h-[100dvh] w-full bg-zinc-950 text-white overflow-hidden font-sans select-none flex flex-col justify-between p-4 sm:p-6 md:p-10 border-t-2 border-red-600/30"
    >
      {/* ========================================================================= */}
      {/* 1. BACKGROUND FULLSCREEN CHARACTER ARTWORK WITH RAPI & SYNCHRONIZED FLAME */}
      {/* ========================================================================= */}
      <div className="absolute top-5 -right-200 w-[85vw] sm:w-[65vw] md:w-[120vw] h-full z-20 pointer-events-none select-none overflow-visible rotate-36">
        
        {/* GRUNGE FLAME CONTAINER */}
        <div className="absolute inset-0 z-0 overflow-visible">
          {/* LAYER 1: OUTER BLACK GRUNGE FLAME */}
          {/* 
          <div
            className="absolute inset-y-[-45%] left-[-22%] w-[150%] bg-zinc-950 grunge-jitter-a transform-gpu"
            style={{
              clipPath:
                'polygon(15% 100%, 30% 68%, 10% 50%, 38% 35%, 20% 15%, 52% 25%, 48% -5%, 78% 20%, 62% 42%, 95% 48%, 68% 62%, 88% 88%, 52% 72%, 40% 100%)',
            }}
          /> 
          */}

          {/* LAYER 2: CRIMSON RED FLAME + DROP GLOW */}
          <div
            className="absolute inset-y-[-38%] left-[-16%] w-[170%] bg-red-600 grunge-jitter-a shadow-[0_0_35px_rgba(220,38,38,0.9)] transform-gpu"
            style={{
              clipPath:
                'polygon(20% 100%, 35% 70%, 15% 55%, 40% 40%, 25% 20%, 55% 30%, 50% 0%, 75% 25%, 65% 45%, 90% 50%, 70% 65%, 85% 85%, 55% 75%, 45% 100%)',
            }}
          />

          {/* LAYER 3: ORANGE GRUNGE FLAME + HALFTONE PATTERN */}
          <div
            className="absolute inset-y-[-30%] left-[-10%] w-[130%] bg-[#FF5500] opacity-95 grunge-jitter-b transform-gpu"
            style={{
              clipPath:
                'polygon(30% 100%, 40% 75%, 20% 60%, 45% 45%, 35% 25%, 60% 35%, 55% 5%, 80% 30%, 68% 50%, 92% 55%, 72% 68%, 88% 88%, 60% 78%, 50% 100%)',
              backgroundImage:
                'radial-gradient(rgba(0, 0, 0, 0.25) 15%, transparent 16%)',
              backgroundSize: '6px 6px',
            }}
          />

          {/* LAYER 4: AMBER / YELLOW HOT CORE FLAME */}
          <div
            className="absolute inset-y-[-20%] left-[-5%] w-[115%] bg-amber-300 opacity-90 grunge-jitter-c transform-gpu"
            style={{
              clipPath:
                'polygon(35% 100%, 45% 78%, 28% 62%, 48% 48%, 40% 30%, 62% 38%, 58% 10%, 78% 32%, 68% 52%, 90% 58%, 74% 70%, 86% 88%, 62% 80%, 52% 100%)',
            }}
          />

          {/* LAYER 5: SCREEN BLEND GLOW FLARE */}
          <div
            className="absolute inset-y-[-10%] left-[-12%] w-[140%] bg-red-600/60 grunge-jitter-a transform-gpu"
            style={{
              clipPath:
                'polygon(25% 100%, 38% 72%, 18% 58%, 42% 42%, 28% 22%, 58% 32%, 52% 2%, 78% 28%, 68% 48%, 92% 52%, 72% 68%, 88% 88%, 58% 78%, 48% 100%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </div>

    <div className="absolute top-5 -right-200 w-[85vw] sm:w-[65vw] md:w-[120vw] h-full z-40 pointer-events-none select-none overflow-visible rotate-36">
        {/* LAYER AMBER CORE / EFFECT DI ATAS FOTO */}
        <div
            className="absolute inset-y-[-20%] left-[-5%] w-[115%] bg-amber-300 opacity-70 grunge-jitter-c transform-gpu"
            style={{
            clipPath:
                'polygon(35% 100%, 45% 78%, 28% 62%, 48% 48%, 40% 30%, 62% 38%, 58% 10%, 78% 32%, 68% 52%, 90% 58%, 74% 70%, 86% 88%, 62% 80%, 52% 100%)',
            }}
        />
    </div> {/* 👈 Penutup container z-40 yang benar di sini */}
    
      {/* ========================================================================= */}
      {/* 📍 1B. CHARACTER PROFILE PHOTO (POSITIONED AT BOTTOM-RIGHT)               */}
      {/* ========================================================================= */}
      <div className="absolute -bottom-16 -right-24 w-[65vw] sm:w-[50vw] md:w-[38vw] lg:w-[70vw] h-[65vh] sm:h-[110vh] z-30 pointer-events-none select-none flex items-end justify-end">
        <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-105">
          <Image
            src="/assets/profile/photo-profile.png"
            alt="Profile Character"
            fill
            priority
            sizes="(max-width: 640px) 65vw, (max-width: 1024px) 50vw, 35vw"
            className="object-contain object-bottom filter contrast-150 saturate-40"
            />
        </div>
      </div>

      {/* 2. BACKGROUND DIAGONAL WATERMARK */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #ef4444 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <span className="absolute -left-10 -bottom-6 font-serif font-black text-[25vw] text-white/5 leading-none select-none -rotate-12 pointer-events-none">
          01
        </span>
      </div>

      {/* 3. TOP NAV / TAB SWITCHER */}
      <header className="relative z-20 flex items-center justify-between w-full shrink-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => handleTabChange(activeTab === 'equipment' ? 'params' : activeTab === 'params' ? 'status' : 'equipment')}
            onMouseEnter={() => sfx.playHover()}
            className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 hover:border-red-500 px-2.5 py-1 -skew-x-12 text-xs font-mono font-bold text-zinc-300 transition cursor-pointer"
          >
            <span className="text-red-500 font-black">&lt; LB</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
            <button
              onClick={() => handleTabChange('status')}
              className={`px-3.5 py-1 -skew-x-12 transition-all cursor-pointer font-bold ${
                activeTab === 'status'
                  ? 'bg-red-600 text-zinc-950 shadow-[0_0_15px_rgba(220,38,38,0.8)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              STATUS
            </button>
            <button
              onClick={() => handleTabChange('params')}
              className={`px-3.5 py-1 -skew-x-12 transition-all cursor-pointer font-bold ${
                activeTab === 'params'
                  ? 'bg-red-600 text-zinc-950 shadow-[0_0_15px_rgba(220,38,38,0.8)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              TECH STACK
            </button>
            <button
              onClick={() => handleTabChange('equipment')}
              className={`px-3.5 py-1 -skew-x-12 transition-all cursor-pointer font-bold hidden sm:block ${
                activeTab === 'equipment'
                  ? 'bg-red-600 text-zinc-950 shadow-[0_0_15px_rgba(220,38,38,0.8)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              EQUIPMENT
            </button>
          </div>

          <button
            onClick={() => handleTabChange(activeTab === 'status' ? 'params' : activeTab === 'params' ? 'equipment' : 'status')}
            onMouseEnter={() => sfx.playHover()}
            className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 hover:border-red-500 px-2.5 py-1 -skew-x-12 text-xs font-mono font-bold text-zinc-300 transition cursor-pointer"
          >
            <span className="text-red-500 font-black">RB &gt;</span>
          </button>
        </div>
      </header>

      {/* 4. MAIN STATUS ARENA */}
      <div className="relative z-10 w-full my-auto -translate-y-8 sm:-translate-y-12 md:-translate-y-24 py-2 flex flex-col justify-center items-start overflow-visible">
        <div className="w-[85vw] sm:w-[75vw] lg:w-[110vw] -ml-12 md:-ml-18 flex flex-col gap-3.5 -rotate-2 sm:-rotate-5 transition-transform duration-300">
          
          {/* BANNER NAMA & METRICS */}
          <div className="relative bg-zinc-950 border-y-2 border-red-600 p-4 sm:p-5 shadow-2xl">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-800 pb-2.5 mb-3 pl-10 md:pl-20 pr-16 sm:pr-24 lg:pr-32">
              <div>
                <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-white uppercase">
                  {portofolioConfig.personal.name}
                </h2>
                <p className="font-mono text-xs text-red-500 tracking-widest uppercase mt-0.5">
                  {portofolioConfig.personal.tagline || 'AN ENGINEER WITH ART IN MIND'}
                </p>
              </div>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 font-mono text-xs pl-10 md:pl-20 pr-16 sm:pr-24 lg:pr-32 max-w-2xl">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-cyan-400">GITHUB COMMITS</span>
                  <span className="text-zinc-300">1,250+</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-900 border border-zinc-700 -skew-x-12 overflow-hidden p-0.5">
                  <div className="h-full bg-cyan-400 w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-amber-400">PROJECT RATE</span>
                  <span className="text-zinc-300">20+ DONE</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-900 border border-zinc-700 -skew-x-12 overflow-hidden p-0.5">
                  <div className="h-full bg-amber-400 w-[88%]" />
                </div>
              </div>
            </div>
          </div>

          {/* ARCANA & CLASS BAR */}
          <div className="relative bg-zinc-900 border-r-4 border-red-600 p-3.5 pl-14 md:pl-24 pr-16 sm:pr-24 lg:pr-32 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-zinc-950 font-black font-serif px-2.5 py-1 text-sm -rotate-3">
                ?
              </div>
              <div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase block">DEGREE / AFFILIATION</span>
                <h3 className="font-serif font-black text-sm sm:text-base text-white tracking-wider uppercase">
                  COMPUTER ENGINEERING <span className="text-xs text-zinc-400 font-sans font-normal">{'/'} UNDIP</span>
                </h3>
              </div>
            </div>
          </div>

          {/* TAB CONTENT */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-5 pl-14 md:pl-24 pr-16 sm:pr-24 lg:pr-32 shadow-2xl flex flex-col gap-3">
            {activeTab === 'status' && (
              <>
                <h4 className="font-serif font-black text-xs text-red-500 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-800 pb-1.5 max-w-md">
                  <Terminal size={14} /> CORE CAPABILITIES
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs max-w-lg">
                  <div className="bg-zinc-950 p-2.5 border border-zinc-800 flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-500">UI/UX & FRONTEND</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Sword size={12} className="text-red-500" /> 95 <span className="text-[10px] text-emerald-400">MAX</span>
                    </span>
                  </div>

                  <div className="bg-zinc-950 p-2.5 border border-zinc-800 flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-500">BACKEND & SQL</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Shield size={12} className="text-cyan-400" /> 90 <span className="text-[10px] text-emerald-400">+5</span>
                    </span>
                  </div>

                  <div className="bg-zinc-950 p-2.5 border border-zinc-800 flex flex-col gap-0.5 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-zinc-500">HARDWARE / IoT</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Zap size={12} className="text-amber-400" /> 88 <span className="text-[10px] text-emerald-400">+8</span>
                    </span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'params' && (
              <>
                <h4 className="font-serif font-black text-xs text-red-500 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-800 pb-1.5 max-w-md">
                  <Layers size={14} /> PRIMARY TECH STACK
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs max-w-lg py-1">
                  {['React / Next.js', 'Laravel & Express', 'ASP.NET C#', 'MySQL & Relational', 'Tailwind & Figma', 'C++ / Embedded'].map((tech) => (
                    <div key={tech} className="bg-zinc-950 px-3 py-1.5 border-l-2 border-red-600 text-zinc-200 text-[11px] font-bold">
                      {tech}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'equipment' && (
              <>
                <h4 className="font-serif font-black text-xs text-red-500 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-800 pb-1.5 max-w-md">
                  <Cpu size={14} /> ENGINEERING TOOLS
                </h4>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs max-w-lg py-1">
                  <div className="bg-zinc-950 p-2 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">IDE / DESIGN</span>
                    <span className="font-bold text-white">VS Code, Figma, Visual Studio</span>
                  </div>
                  <div className="bg-zinc-950 p-2 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">HARDWARE KIT</span>
                    <span className="font-bold text-white">ESP32, STM32, Logic Analyzer</span>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* 5. FOOTER PROMPT */}
      <footer className="relative z-40 flex items-center justify-between border-t border-zinc-800 pt-3 text-xs font-mono shrink-0">
        <div className="flex items-center gap-4 text-zinc-500">
          <span className="flex items-center gap-1"><span className="text-white font-bold bg-zinc-800 px-1.5 py-0.5 text-[10px] -skew-x-12">D-PAD</span> NAVIGATE</span>
          <span className="hidden sm:flex items-center gap-1"><span className="text-white font-bold bg-zinc-800 px-1.5 py-0.5 text-[10px] -skew-x-12">X</span> DETAILS</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-serif font-black text-sm tracking-widest text-red-500 uppercase">
          <User size={16} /> PROFILE STATUS
        </div>
      </footer>

      {/* KEYFRAME ANIMATIONS (JITTER & BREATHE) */}
      <style jsx global>{`
        @keyframes grunge-jitter-a {
          0%   { transform: translate(0, 0) scaleY(1); }
          25%  { transform: translate(-2px, 3px) scaleY(0.94); }
          50%  { transform: translate(3px, -2px) scaleY(1.06); }
          75%  { transform: translate(-1px, -3px) scaleY(0.97); }
          100% { transform: translate(0, 0) scaleY(1); }
        }
        @keyframes grunge-jitter-b {
          0%   { transform: translate(0, 0) scaleY(1) skewX(0deg); }
          33%  { transform: translate(2px, -3px) scaleY(1.08) skewX(2deg); }
          66%  { transform: translate(-3px, 2px) scaleY(0.9) skewX(-3deg); }
          100% { transform: translate(0, 0) scaleY(1) skewX(0deg); }
        }
        @keyframes grunge-jitter-c {
          0%   { transform: translate(0, 0) scaleY(1); }
          33%  { transform: translate(-3px, 2px) scaleY(1.1); }
          66%  { transform: translate(2px, -3px) scaleY(0.9); }
          100% { transform: translate(0, 0) scaleY(1); }
        }

        .grunge-jitter-a { animation: grunge-jitter-a 1.8s steps(4, jump-end) infinite; }
        .grunge-jitter-b { animation: grunge-jitter-b 1.4s steps(3, jump-end) infinite; }
        .grunge-jitter-c { animation: grunge-jitter-c 1.1s steps(3, jump-end) infinite; }
      `}</style>
    </section>
  );
}