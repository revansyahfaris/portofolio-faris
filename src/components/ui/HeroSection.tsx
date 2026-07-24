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

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'profile',
    label: 'PROFILE',
    targetId: 'profile',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(24deg) skewX(16deg) translate3d(110px, -90px, 0)',
  },
  {
    id: 'skills',
    label: 'SKILLS',
    targetId: 'skills',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(18deg) skewX(12deg) translate3d(55px, -50px, 0)',
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    targetId: 'experience',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(12deg) skewX(8deg) translate3d(30px, -60px, 0)',
  },
  {
    id: 'achievement',
    label: 'ACHIEVEMENT',
    targetId: 'achievement',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(6deg) skewX(4deg) translate3d(10px, -35px, 0)',
  },
  {
    id: 'academy',
    label: 'ACADEMY',
    targetId: 'academy',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(0deg) skewX(0deg) translate3d(0px, 0, 0)',
  },
  {
    id: 'company',
    label: 'COMPANY',
    targetId: 'company',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(-6deg) skewX(-4deg) translate3d(10px, 20px, 0)',
  },
  {
    id: 'github',
    label: 'GITHUB',
    targetId: 'github',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(-12deg) skewX(-8deg) translate3d(30px, 30px, 0)',
  },
  {
    id: 'quest',
    label: 'QUEST',
    targetId: 'projects',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(-18deg) skewX(-12deg) translate3d(55px, 40px, 0)',
  },
  {
    id: 'connect',
    label: 'CONNECT',
    targetId: 'contact',
    textSize: 'text-3xl md:text-5xl',
    transformStyle: 'rotate(-24deg) skewX(-16deg) translate3d(110px, 90px, 0)',
  },
];

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
      className={`relative min-h-[100dvh] w-full bg-zinc-950 text-white overflow-hidden font-sans select-none flex flex-col justify-between p-6 md:p-12 transition-filter duration-150 ${
        glitchActive ? 'invert contrast-200' : ''
      }`}
    >
      <QuestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/50 to-transparent z-0"
          style={{ mixBlendMode: 'overlay' }}
        >
          <div className="w-full h-full">
            <Image
              src="/assets/hero/background.webp"
              alt="background"
              fill
              priority
              className="object-cover"
              style={{
                filter: 'grayscale(0) contrast(5) brightness(1)',
              }}
            />
          </div>
        </div>
        
      </div>
      
      {/* BACKGROUND IMAGE - BULLETPROOF UNTUK BROWSER BER-TAB & FULLSCREEN */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[80vw] sm:w-[60vw] lg:w-[45vw]"
          style={{
            aspectRatio: '16 / 9',
          }}
        >
          {/* WRAPPER BARU KHUSUS BUAT BREATHING ANIMATION */}
          <div className="w-full h-full hero-breathe">
            <Image
              src="/assets/hero/hero-bg-dekstop.png"
              alt="Hero Artwork"
              fill
              priority
              className="object-cover"
              style={{
                objectPosition: 'top 30% right 25%',
                transform: 'scale(3.2) translateX(15%) translateY(0%)',
                transformOrigin: 'top right',
                // filter: `
                //   drop-shadow(1px 0 0 white)
                //   drop-shadow(-1px 0 0 white)
                //   drop-shadow(0 1px 0 white)
                //   drop-shadow(0 -1px 0 white)
                // `,
              }}
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/55 to-transparent z-10" />
      </div>

      {/* ANGKA URUTAN BESAR - POJOK KANAN BAWAH HERO SECTION (ala Persona) */}
      <div className="pointer-events-none select-none absolute -bottom-6 right-2 md:right-8 z-10 overflow-hidden w-[28vw] max-w-[420px] text-right">
        <span
          key={selectedIndex}
          className="block font-serif font-black text-white/10 leading-none"
          style={{
            fontSize: 'clamp(180px, 28vw, 420px)',
            fontVariantNumeric: 'lining-nums tabular-nums',
          }}
        >
          {selectedIndex + 1}
        </span>
      </div>

      {/* 1. TOP HUD / NAVBAR */}
      <header className="relative z-30 flex items-center justify-between">
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
      <main className="relative z-10 my-auto py-2 flex flex-col justify-center items-start w-full max-w-xl mr-auto">
        
        {/* CONTAINER PERSPECTIVE ARENA */}
        <div 
          className="flex flex-col items-end space-y-1.5 w-full my-2 transition-transform duration-300 origin-left translate-y-5"
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
                className={`group relative flex justify-end cursor-pointer transition-all duration-200 origin-left ${
                  isSelected ? 'z-0' : 'z-20'
                }`}
                style={{
                  transform: item.transformStyle,
                }}
              >
                {/* PERSPECTIVE CONTEXT - membungkus objek 3D (flame + box) */}
                <div
                  className="relative inline-block"
                  style={{
                    perspective: '350px',
                    perspectiveOrigin: '0% 50%',
                  }}
                >
                  {/* OBJEK 3D TUNGGAL - flame & box sekarang jadi SATU kesatuan yang diputar bareng */}
                  <div
                    className="relative inline-block"
                    style={{
                      transform: `rotateY(${isSelected ? 10 : 22}deg) scale(${isSelected ? 1.3 : 1.3}`, // selalu aktif, makin kuat saat selected
                      transformOrigin: 'right center',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      transition: 'transform 200ms ease',
                    }}
                  >
                    {/* GRUNGE FLAME - sekarang locked dengan box karena satu parent yang sama */}
                    {isSelected && effectsReady && (
                      <div className="absolute inset-0 -z-10 overflow-visible pointer-events-none select-none">
                        <div
                          className="absolute inset-y-[-85%] right-[-10%] w-[180%] bg-zinc-950 grunge-jitter-a"
                          style={{
                            clipPath: 'polygon(15% 100%, 30% 68%, 10% 50%, 38% 35%, 20% 15%, 52% 25%, 48% -5%, 78% 20%, 62% 42%, 95% 48%, 68% 62%, 88% 88%, 52% 72%, 40% 100%)',
                            willChange: 'transform',
                          }}
                        />
                        <div
                          className="absolute inset-y-[-75%] right-0 w-[150%] bg-red-600 grunge-jitter-a shadow-[0_0_25px_rgba(220,38,38,0.8)]"
                          style={{
                            clipPath: 'polygon(20% 100%, 35% 70%, 15% 55%, 40% 40%, 25% 20%, 55% 30%, 50% 0%, 75% 25%, 65% 45%, 90% 50%, 70% 65%, 85% 85%, 55% 75%, 45% 100%)',
                            willChange: 'transform',
                          }}
                        />
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
                        <div
                          className="absolute inset-y-[-40%] right-[5%] w-[90%] bg-amber-300 grunge-jitter-c"
                          style={{
                            clipPath: 'polygon(35% 100%, 45% 78%, 28% 62%, 48% 48%, 40% 30%, 62% 38%, 58% 10%, 78% 32%, 68% 52%, 90% 58%, 74% 70%, 86% 88%, 62% 80%, 52% 100%)',
                            opacity: 0.9,
                            willChange: 'transform',
                          }}
                        />
                        <div
                          className="absolute inset-y-[-20%] right-[-5%] w-[150%] bg-red-600/60 grunge-jitter-a"
                          style={{
                            clipPath: 'polygon(25% 100%, 38% 72%, 18% 58%, 42% 42%, 28% 22%, 58% 32%, 52% 2%, 78% 28%, 68% 48%, 92% 52%, 72% 68%, 88% 88%, 58% 78%, 48% 100%)',
                            mixBlendMode: 'screen',
                            willChange: 'transform',
                          }}
                        />
                      </div>
                    )}

                    {/* ATLUS CUTOUT TEXT - background & teks, tanpa transform sendiri (sudah ikut parent) */}
                    <div
                      className={`relative inline-block text-right px-4 py-0.5 transition-colors duration-150 ${
                        isSelected
                          ? 'bg-red-600 text-zinc-950 shadow-[0_0_35px_rgba(220,38,38,0.9)] z-30'
                          : 'bg-transparent text-white group-hover:bg-red-600 group-hover:text-zinc-950'
                      }`}
                      style={{
                        clipPath: 'polygon(0 0, 95% 15%, 100% 85%, 0 100%)',
                      }}
                    >
                      <h1
                        className={`font-serif font-black ${item.textSize} text-right tracking-tighter uppercase leading-none ${
                          isSelected ? 'text-zinc-950' : 'text-white group-hover:text-zinc-950'
                        }`}
                      >
                        {item.label}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 3. BAR MERAH DEKORATIF DI BAWAH DERETAN TEKS MENU */}
      <div className="relative z-30 w-full mt-6 mb-3 pointer-events-none flex justify-end">
        <div
          className="w-[50%] -mr-6 h-10 bg-red-600/90 -rotate-2 shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-end px-8 z-0"
          style={{ clipPath: 'polygon(2% 0, 100% 20%, 100% 100%, 0 80%)' }}
        >
          <span
          className="font-serif font-black text-xs md:text-sm tracking-[0.3em] uppercase text-red-100 opacity-90 text-right"
          style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            rotate: '0.5deg',
          }}
          >
            {portofolioConfig.personal.tagline.toUpperCase()}
          </span>
        </div>
      </div>

      {/* DESCRIPTION BIO BOX */}
      <div
        className="max-w-xl bg-zinc-900/90 border-r-4 border-red-600 p-3.5 shadow-2xl -rotate-1 ml-auto"
        style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%)' }}
      >
        <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed text-right">
          {portofolioConfig.personal.bioShort}
        </p>
      </div>

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
        @keyframes hero-breathe {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }

        .hero-breathe { animation: hero-breathe 12s ease-in-out infinite; }

        .grunge-jitter-a { animation: grunge-jitter-a 1.8s steps(4, jump-end) infinite; }
        .grunge-jitter-b { animation: grunge-jitter-b 1.4s steps(3, jump-end) infinite; }
        .grunge-jitter-c { animation: grunge-jitter-c 1.1s steps(3, jump-end) infinite; }
      `}</style>
    </div>
  );
}