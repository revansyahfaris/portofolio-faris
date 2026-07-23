'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { portofolioConfig } from '../../config/portofolioConfig';
import { sfx } from '../../lib/sfx';
import QuestModal from './QuestModal';
import Image from 'next/image';

interface MenuItem {
  id: string;
  label: string;
  targetId: string;
  textSize: string;
  transformStyle: string;
}

// LENGKUNGAN PERSPEKTIF MENU — RATA KIRI, VANISHING POINT KE ARAH KIRI ATAS
const MENU_ITEMS: MenuItem[] = [
  {
    id: 'profile',
    label: 'PROFILE',
    targetId: 'profile',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(12deg) skewX(10deg) translate3d(60px, 0, 0)',
  },
  {
    id: 'skills',
    label: 'SKILLS',
    targetId: 'skills',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(9deg) skewX(8deg) translate3d(40px, 0, 0)',
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    targetId: 'experience',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(6deg) skewX(6deg) translate3d(20px, 0, 0)',
  },
  {
    id: 'achievement',
    label: 'ACHIEVEMENT',
    targetId: 'achievement',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(3deg) skewX(4deg) translate3d(10px, 0, 0)',
  },
  {
    id: 'academy',
    label: 'ACADEMY',
    targetId: 'academy',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(0deg) skewX(2deg) translate3d(0px, 0, 0)',
  },
  {
    id: 'company',
    label: 'COMPANY',
    targetId: 'company',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(-3deg) skewX(0deg) translate3d(10px, 0, 0)',
  },
  {
    id: 'github',
    label: 'GITHUB',
    targetId: 'github',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(-6deg) skewX(-2deg) translate3d(25px, 0, 0)',
  },
  {
    id: 'quest',
    label: 'QUEST',
    targetId: 'projects',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(-9deg) skewX(-4deg) translate3d(45px, 0, 0)',
  },
  {
    id: 'connect',
    label: 'CONNECT',
    targetId: 'contact',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(-12deg) skewX(-6deg) translate3d(55px, 0, 0)',
  },
];

// Data particle di-generate sekali di luar komponen (module-level), bukan saat render
const EMBER_PARTICLES = Array.from({ length: 14 }, (_, i) => {
  // pseudo-random deterministik pakai index sebagai seed, biar tetap variatif tapi konsisten
  const seed = (i * 9301 + 49297) % 233280 / 233280;
  const seed2 = (i * 4933 + 12347) % 233280 / 233280;
  const seed3 = (i * 2417 + 7919) % 233280 / 233280;
  const seed4 = (i * 6151 + 3571) % 233280 / 233280;
  const seed5 = (i * 8837 + 5237) % 233280 / 233280;

  return {
    id: i,
    left: 10 + seed * 80,
    bottom: seed2 * 20,
    size: 2 + seed3 * 3,
    duration: 4 + seed4 * 4,
    delay: seed5 * 5,
  };
});

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [effectsReady, setEffectsReady] = useState(false);

  const isLockRef = useRef(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEffectsReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // SEQUENTIAL SCROLL LOCK FOR HERO MENU
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY < 80) {
        if (isLockRef.current) {
          e.preventDefault();
          return;
        }

        if (e.deltaY > 0) {
          if (selectedIndex < MENU_ITEMS.length - 1) {
            e.preventDefault();
            isLockRef.current = true;
            sfx.playHover();
            setSelectedIndex((prev) => prev + 1);

            setTimeout(() => {
              isLockRef.current = false;
            }, 200);
          }
        } else if (e.deltaY < 0) {
          if (selectedIndex > 0) {
            e.preventDefault();
            isLockRef.current = true;
            sfx.playHover();
            setSelectedIndex((prev) => prev - 1);

            setTimeout(() => {
              isLockRef.current = false;
            }, 200);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [selectedIndex]);

  // Keyboard Event: Tekan 'M' untuk Glitch
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

  const handleMenuClick = (targetId: string, index: number) => {
    sfx.playSelect();
    setSelectedIndex(index);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden font-sans select-none flex flex-col justify-between p-6 md:p-12 transition-filter duration-150 ${
        glitchActive ? 'invert contrast-200' : ''
      }`}
    >
      <QuestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* BACKGROUND IMAGE - BULLETPROOF UNTUK BROWSER BER-TAB & FULLSCREEN */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-end justify-end">
        <div
          className={`
          relative max-w-none flex-shrink-0 -rotate-90 transition-all duration-300

          /* Menggunakan svh (Small Viewport Height) & svw agar ukurannya stabil meski ada tab browser/address bar */
          w-[100svh] h-[100svw] translate-y-[18%] -translate-x-[10%]
          sm:w-[115svh] sm:h-[115svw] sm:translate-y-[14%] sm:-translate-x-[14%]
          lg:w-[145svh] lg:h-[145svw] lg:translate-y-[9%] lg:-translate-x-[16%]
          `}
        >
          <Image
            src="/assets/hero/hero-bg.png"
            alt="Hero Artwork"
            fill
            priority
            className="object-contain"
            style={{
              objectPosition: 'left center',
              scale: '1.4',
            }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10" />
      </div>

      {/* ANGKA URUTAN BESAR - POJOK KANAN ATAS HERO SECTION (ala Persona) */}
      <div className="pointer-events-none select-none absolute -top-6 right-2 md:right-8 z-10 overflow-hidden w-[28vw] max-w-[420px] text-right">
        <span
          key={selectedIndex}
          className="block font-serif font-black text-white/10 leading-none"
          style={{ fontSize: 'clamp(180px, 28vw, 420px)', fontVariantNumeric: 'tabular-nums' }}
        >
          {selectedIndex + 1}
        </span>
      </div>

      {/* 1. TOP HUD / NAVBAR */}
      <header className="relative z-20 flex items-center justify-between border-b-2 border-white/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 text-white px-2 py-0.5 -rotate-3 font-mono font-black text-xs tracking-tighter shadow-md">
            DEV:01
          </div>
          <span className="font-serif font-black text-xl tracking-tight uppercase italic">
            {portofolioConfig.personal.nickname.toUpperCase()}<span className="text-red-500">.DEV</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={toggleSfx}
            onMouseEnter={() => sfx.playHover()}
            className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 px-3 py-1.5 -skew-x-12 hover:border-red-500 text-zinc-300 transition cursor-pointer"
          >
            {sfxEnabled ? (
              <Volume2 size={14} className="text-emerald-400" />
            ) : (
              <VolumeX size={14} className="text-red-500" />
            )}
            <span>SFX: {sfxEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => {
              sfx.playSelect();
              setIsModalOpen(true);
            }}
            onMouseEnter={() => sfx.playHover()}
            className="bg-white text-zinc-950 font-black px-4 py-1.5 -rotate-2 hover:bg-red-600 hover:text-white transition uppercase tracking-wider text-xs shadow-lg cursor-pointer"
          >
            DISPATCH QUEST
          </button>
        </div>
      </header>

      {/* 2. MAIN RADIAL CURVED VANISHING POINT MENU (RATA KIRI) */}
      <main className="relative z-20 my-auto py-2 flex flex-col justify-center items-start max-w-5xl mr-auto">
        
        {/* CONTAINER PERSPECTIVE ARENA */}
        <div 
          className="flex flex-col space-y-1 my-2 transition-transform duration-300 origin-left"
          style={{
            perspective: '1000px',
            perspectiveOrigin: '0% 50%',
          }}
        >
          {MENU_ITEMS.map((item, index) => {
            const isSelected = selectedIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => handleMenuClick(item.targetId, index)}
                onMouseEnter={() => {
                  sfx.playHover();
                  setSelectedIndex(index);
                }}
                className="group relative flex justify-end cursor-pointer transition-all duration-200 origin-left"
                style={{
                  transform: item.transformStyle,
                }}
              >
                {/* WRAPPER - inline-block, ukurannya ngikutin teks, TIDAK di-clip, jadi flame bebas mencuat keluar */}
                <div className="relative inline-block">

                  {/* GRUNGE FLAME - HIGH-POLISH ATLUS FIRE EFFECT */}
                {isSelected && effectsReady && (
                  <div className="absolute inset-0 -z-10 overflow-visible pointer-events-none select-none">
                    
                    {/* 1. LAYER 0: BLACK INK SLASH OUTLINE (Memberikan kontras tegas ala manga/Sumi-e) */}
                    <div
                      className="absolute inset-y-[-85%] right-[-10%] w-[180%] bg-zinc-950 grunge-jitter-a"
                      style={{
                        clipPath: 'polygon(15% 100%, 30% 68%, 10% 50%, 38% 35%, 20% 15%, 52% 25%, 48% -5%, 78% 20%, 62% 42%, 95% 48%, 68% 62%, 88% 88%, 52% 72%, 40% 100%)',
                        willChange: 'transform',
                      }}
                    />

                    {/* 2. LAYER 1: BASE DEEP CRIMSON FLAME */}
                    <div
                      className="absolute inset-y-[-75%] right-0 w-[150%] bg-red-600 grunge-jitter-a shadow-[0_0_25px_rgba(220,38,38,0.8)]"
                      style={{
                        clipPath: 'polygon(20% 100%, 35% 70%, 15% 55%, 40% 40%, 25% 20%, 55% 30%, 50% 0%, 75% 25%, 65% 45%, 90% 50%, 70% 65%, 85% 85%, 55% 75%, 45% 100%)',
                        willChange: 'transform',
                      }}
                    />

                    {/* 3. LAYER 2: VIBRANT NEON ORANGE CORE WITH HALFTONE PATTERN */}
                    <div
                      className="absolute inset-y-[-60%] right-0 w-[125%] bg-[#FF5500] grunge-jitter-b"
                      style={{
                        clipPath: 'polygon(30% 100%, 40% 75%, 20% 60%, 45% 45%, 35% 25%, 60% 35%, 55% 5%, 80% 30%, 68% 50%, 92% 55%, 72% 68%, 88% 88%, 60% 78%, 50% 100%)',
                        opacity: 0.95,
                        willChange: 'transform',
                        backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.25) 15%, transparent 16%)',
                        backgroundSize: '6px 6px',
                      }}
                    />

                    {/* 4. LAYER 3: HOT WHITE-YELLOW INNER FLAME */}
                    <div
                      className="absolute inset-y-[-40%] right-[5%] w-[90%] bg-amber-300 grunge-jitter-c"
                      style={{
                        clipPath: 'polygon(35% 100%, 45% 78%, 28% 62%, 48% 48%, 40% 30%, 62% 38%, 58% 10%, 78% 32%, 68% 52%, 90% 58%, 74% 70%, 86% 88%, 62% 80%, 52% 100%)',
                        opacity: 0.9,
                        willChange: 'transform',
                      }}
                    />

                    {/* 5. LAYER 4: FRONT BURST GLOW (Ember Accent Layer) */}
                    <div
                      className="absolute inset-y-[-20%] right-[-5%] w-[150%] bg-red-600/60 grunge-jitter-a"
                      style={{
                        clipPath: 'polygon(25% 100%, 38% 72%, 18% 58%, 42% 42%, 28% 22%, 58% 32%, 52% 2%, 78% 28%, 68% 48%, 92% 52%, 72% 68%, 88% 88%, 58% 78%, 48% 100%)',
                        mixBlendMode: 'screen',
                        willChange: 'transform',
                      }}
                    />

                    {/* 6. DYNAMIC EMBERS / PERCIKAN API MELAYANG (SPARKS)
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute -top-0 left-90 w-3 h-3 bg-amber-300 rotate-45 grunge-jitter-a opacity-90 shadow-[0_0_10px_#f59e0b]" />
                      <div className="absolute -top-10 left-90 w-2 h-2 bg-red-500 -rotate-12 grunge-jitter-c opacity-80 shadow-[0_0_8px_#ef4444]" />
                      <div className="absolute -top-0 left-80 w-2.5 h-2.5 bg-amber-400 rotate-12 grunge-jitter-b opacity-85 shadow-[0_0_10px_#fbbf24]" />
                      <div className="absolute top-2 right-44 w-1.5 h-1.5 bg-white -rotate-45 grunge-jitter-a opacity-95" />
                    </div> */}

                  </div>
                )}

                  {/* ATLUS CUTOUT TEXT HOVER STYLE - box ber-clip-path, terpisah dari flame */}
                  <div
                    className={`relative inline-block px-4 py-0.5 transition-all duration-150 ${
                      isSelected
                        ? 'bg-red-600 text-zinc-950 scale-105 shadow-[0_0_35px_rgba(220,38,38,0.9)] z-30'
                        : 'bg-transparent text-white group-hover:bg-red-600 group-hover:text-zinc-950'
                    }`}
                    style={{
                      clipPath: 'polygon(0 0, 95% 15%, 100% 85%, 0 100%)',
                    }}
                  >
                    <h1
                      className={`font-serif font-black ${item.textSize} tracking-tighter uppercase transition-all leading-none ${
                        isSelected
                          ? 'text-zinc-950 translate-x-2'
                          : 'text-white group-hover:text-zinc-950 group-hover:translate-x-2'
                      }`}
                    >
                      {item.label}
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. BAR MERAH DEKORATIF DI BAWAH DERETAN TEKS MENU */}
        <div className="relative w-full mt-6 mb-3 pointer-events-none">
          <div
            className="w-[110%] -ml-6 h-10 bg-red-600/90 -rotate-2 shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-start px-8 z-0"
            style={{ clipPath: 'polygon(0 20%, 98% 0, 100% 80%, 0 100%)' }}
          >
            <span className="font-serif font-black text-xs md:text-sm tracking-[0.3em] uppercase text-red-100 opacity-90 text-left">
              {portofolioConfig.personal.name.toUpperCase()} {'//'} {portofolioConfig.personal.tagline.toUpperCase()}
            </span>
          </div>
        </div>

        {/* DESCRIPTION BIO BOX */}
        <div
          className="max-w-xl bg-zinc-900/90 border-l-4 border-red-600 p-3.5 shadow-2xl -rotate-1 mr-auto"
          style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 0 100%)' }}
        >
          <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed text-left">
            {portofolioConfig.personal.bioShort}
          </p>
        </div>

      </main>

      {/* 4. BOTTOM METRICS HUD */}
      <footer className="relative z-20 flex flex-col md:flex-row items-end md:items-center justify-between border-t-2 border-white/20 pt-4 gap-4">
        <div className="flex items-center gap-4 sm:gap-6 font-serif">
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 -skew-x-12 flex items-center gap-3">
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">GPA</span>
            <span className="text-xl md:text-2xl font-black text-white">{portofolioConfig.personal.gpa}</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 -skew-x-12 flex items-center gap-3">
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">PROJECTS</span>
            <span className="text-xl md:text-2xl font-black text-red-500">20+</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 -skew-x-12 hidden sm:flex items-center gap-3">
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">LOCATION</span>
            <span className="text-sm font-bold text-teal-400">
              {portofolioConfig.personal.location.toUpperCase()}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            sfx.playSelect();
            setIsModalOpen(true);
          }}
          onMouseEnter={() => sfx.playHover()}
          className="group flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-serif font-black px-8 py-3 -rotate-2 shadow-[4px_4px_0px_rgba(255,255,255,0.9)] transition uppercase tracking-wider text-sm cursor-pointer"
        >
          INITIATE QUEST <ArrowRight size={18} />
        </button>
      </footer>

      <style jsx>{`
        @keyframes ember-rise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(-160px) translateX(10px); opacity: 0; }
        }
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
    </div>
  );
}