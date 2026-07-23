'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { sfx } from '@/lib/sfx';
import QuestModal from './QuestModal';
import AtlusThreeCanvas from './ThreeCanvas';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  // Keyboard Event: Tekan 'M' untuk Glitch Metaphor Effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm' && !isModalOpen) {
        sfx.playSelect();
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 800);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const toggleSfx = () => {
    sfx.enabled = !sfxEnabled;
    setSfxEnabled(!sfxEnabled);
    if (!sfxEnabled) sfx.playSelect();
  };

  return (
    <div className={`relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden font-sans select-none flex flex-col justify-between p-6 md:p-12 transition-filter duration-150 ${glitchActive ? 'invert contrast-200' : ''}`}>
      
      <QuestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 1. BACKGROUND GEOMETRY */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-20 -left-20 w-[130%] h-[65%] bg-teal-950/40 -rotate-12 transform origin-top-left border-b-2 border-teal-500/30"
          style={{ clipPath: 'polygon(0 0, 100% 15%, 85% 100%, 0 80%)' }}
        />
        <div 
          className="absolute top-[38%] -left-10 w-[110%] h-20 bg-red-600/90 -rotate-6 shadow-[0_0_50px_rgba(220,38,38,0.4)] flex items-center px-12 z-0"
          style={{ clipPath: 'polygon(0 20%, 100% 0, 98% 80%, 0 100%)' }}
        >
          <span className="font-serif font-black text-xs md:text-sm tracking-[0.35em] uppercase text-red-100 opacity-80">
            MUHAMMAD FARIS REVANSYAH // ARCHITECTING DIGITAL &amp; HARDWARE REALMS
          </span>
        </div>
      </div>

      {/* 2. TOP HUD / NAVBAR */}
      <header className="relative z-20 flex items-center justify-between border-b-2 border-white/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 text-white px-2 py-0.5 -rotate-3 font-mono font-black text-xs tracking-tighter shadow-md">
            DEV:01
          </div>
          <span className="font-serif font-black text-xl tracking-tight uppercase italic">
            FARIS<span className="text-red-500">.</span>DEV
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          {/* SFX TOGGLE BUTTON */}
          <button
            onClick={toggleSfx}
            onMouseEnter={() => sfx.playHover()}
            className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 px-3 py-1.5 -skew-x-12 hover:border-red-500 text-zinc-300 transition"
          >
            {sfxEnabled ? <Volume2 size={14} className="text-emerald-400" /> : <VolumeX size={14} className="text-red-500" />}
            <span>SFX: {sfxEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* DISPATCH QUEST BUTTON */}
          <button
            onClick={() => { sfx.playSelect(); setIsModalOpen(true); }}
            onMouseEnter={() => sfx.playHover()}
            className="bg-white text-zinc-950 font-black px-4 py-1.5 -rotate-2 hover:bg-red-600 hover:text-white transition uppercase tracking-wider text-xs shadow-lg"
          >
            DISPATCH QUEST
          </button>
        </div>
      </header>

      {/* 3. MAIN CONTENT: MENU + 3D CANVAS */}
      <main className="relative z-20 my-auto py-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 max-w-7xl">
        <div className="lg:col-span-7 flex flex-col gap-1 md:gap-2 items-start">
          <div className="bg-white text-zinc-950 font-serif font-black text-xs md:text-sm px-3 py-1 -rotate-2 tracking-widest uppercase mb-4 shadow-md">
            COMPUTER ENGINEERING // UNDIP CLASS OF &apos;24
          </div>

          <a href="#projects" onMouseEnter={() => sfx.playHover()} className="group cursor-pointer">
            <h1 className="font-serif font-black text-5xl md:text-8xl tracking-tighter uppercase -rotate-3 text-white group-hover:text-red-500 group-hover:translate-x-4 transition drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              FULL-STACK
            </h1>
          </a>

          <a href="#projects" onMouseEnter={() => sfx.playHover()} className="group cursor-pointer ml-4 md:ml-12">
            <h1 className="font-serif font-black text-5xl md:text-8xl tracking-tighter uppercase -rotate-2 text-zinc-200 group-hover:text-teal-400 group-hover:translate-x-4 transition drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              EMBEDDED
            </h1>
          </a>

          <a href="#projects" onMouseEnter={() => sfx.playHover()} className="group cursor-pointer ml-8 md:ml-24">
            <h1 className="font-serif font-black text-5xl md:text-8xl tracking-tighter uppercase -rotate-3 text-red-500 group-hover:text-white group-hover:translate-x-4 transition drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              PROJECTS
            </h1>
          </a>

          <a href="#experience" onMouseEnter={() => sfx.playHover()} className="group cursor-pointer ml-12 md:ml-36">
            <h1 className="font-serif font-black text-3xl md:text-6xl tracking-tighter uppercase -rotate-1 text-zinc-400 group-hover:text-red-400 transition">
              MEJA BELAKANG
            </h1>
          </a>

          <div 
            className="mt-8 max-w-xl bg-zinc-900/90 border-l-4 border-red-600 p-5 shadow-2xl -rotate-1"
            style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}
          >
            <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
              Membangun arsitektur perangkat lunak scalable, protokol enkripsi jaringan, hingga sistem hardware IoT interaktif. Founder &amp; UI/UX Lead di Studio Meja Belakang.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <AtlusThreeCanvas />
        </div>
      </main>

      {/* 4. BOTTOM METRICS HUD */}
      <footer className="relative z-20 flex flex-col md:flex-row items-end md:items-center justify-between border-t-2 border-white/20 pt-4 gap-4">
        <div className="flex items-center gap-4 sm:gap-6 font-serif">
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 -skew-x-12 flex items-center gap-3">
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">GPA</span>
            <span className="text-xl md:text-2xl font-black text-white">3.59</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 -skew-x-12 flex items-center gap-3">
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">PROJECTS</span>
            <span className="text-xl md:text-2xl font-black text-red-500">20+</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 -skew-x-12 hidden sm:flex items-center gap-3">
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">PRESS [M]</span>
            <span className="text-xs font-bold text-teal-400">GLITCH OVERLAY</span>
          </div>
        </div>

        <button
          onClick={() => { sfx.playSelect(); setIsModalOpen(true); }}
          onMouseEnter={() => sfx.playHover()}
          className="group flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-serif font-black px-8 py-3 -rotate-2 shadow-[4px_4px_0px_rgba(255,255,255,0.9)] transition uppercase tracking-wider text-sm"
        >
          INITIATE QUEST <ArrowRight size={18} />
        </button>
      </footer>

    </div>
  );
}