'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Shield, Zap, Sword, Terminal, Cpu, Layers, GitCommit, FolderCheck } from 'lucide-react';
import { portofolioConfig } from '../../config/portofolioConfig';
import { sfx } from '../../lib/sfx';

type TabType = 'status' | 'params' | 'equipment';

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState<TabType>('status');
  const tabs: TabType[] = ['status', 'params', 'equipment'];

  // 1. Kalkulasi IPK Dinamis dari Config (3.61 / 4.00 = 90.25%)
  const currentGpa = parseFloat(portofolioConfig.personal.gpa || '0');
  const maxGpa = 4.00;
  const gpaPercentage = Math.min((currentGpa / maxGpa) * 100, 100);

  // 2. State GitHub Commits Realtime
  const [commitCount, setCommitCount] = useState<number | null>(null);
  const [loadingCommits, setLoadingCommits] = useState<boolean>(true);

  const handleTabChange = (tab: TabType) => {
    sfx.playSelect();
    setActiveTab(tab);
  };

  const handleNextTab = (direction: 'next' | 'prev') => {
    sfx.playSelect();
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % tabs.length
        : (currentIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[nextIndex]);
  };

  // 3. Auto Fetch GitHub Commit Counter
  useEffect(() => {
    async function fetchGithubCommits() {
      try {
        const githubUrl = portofolioConfig.socials.github;
        const username = githubUrl.split('/').pop() || 'revansyahfaris';

        const res = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
          headers: {
            Accept: 'application/vnd.github.cloak-preview+json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCommitCount(data.total_count);
        } else {
          setCommitCount(1250); // Fallback jika rate limit tercapai
        }
      } catch (err) {
        console.error('Failed to fetch GitHub commits:', err);
        setCommitCount(1250); // Fallback nilai default
      } finally {
        setLoadingCommits(false);
      }
    }

    fetchGithubCommits();
  }, []);

  return (
    <section
      id="profile"
      className="relative min-h-[100dvh] h-[100dvh] w-full bg-zinc-950 text-white overflow-hidden font-sans select-none flex flex-col justify-between p-4 sm:p-6 md:p-10 border-t-2 border-emerald-500/40"
    >
      {/* ========================================================================= */}
      {/* 📍 1A. BACKGROUND FLAME BASE (Z-20)                                       */}
      {/* ========================================================================= */}
      <div className="absolute -top-[25px] -right-[700px] w-[85vw] sm:w-[65vw] md:w-[120vw] h-full z-20 pointer-events-none select-none overflow-visible rotate-[36deg]">
        <div className="absolute inset-0 z-0 overflow-visible">
          {/* LAYER 2: CRIMSON RED FLAME */}
          <div
            className="absolute inset-y-[-38%] left-[-16%] w-[170%] bg-red-600 grunge-jitter-a shadow-[0_0_35px_rgba(220,38,38,0.9)] transform-gpu will-change-transform"
            style={{
              clipPath:
                'polygon(20% 100%, 35% 70%, 15% 55%, 40% 40%, 25% 20%, 55% 30%, 50% 0%, 75% 25%, 65% 45%, 90% 50%, 70% 65%, 85% 85%, 55% 75%, 45% 100%)',
            }}
          />

          {/* LAYER 3: ORANGE GRUNGE FLAME */}
          <div
            className="absolute inset-y-[-30%] left-[-10%] w-[130%] bg-[#FF5500] opacity-95 grunge-jitter-b transform-gpu will-change-transform"
            style={{
              clipPath:
                'polygon(30% 100%, 40% 75%, 20% 60%, 45% 45%, 35% 25%, 60% 35%, 55% 5%, 80% 30%, 68% 50%, 92% 55%, 72% 68%, 88% 88%, 60% 78%, 50% 100%)',
              backgroundImage:
                'radial-gradient(rgba(0, 0, 0, 0.25) 15%, transparent 16%)',
              backgroundSize: '6px 6px',
            }}
          />

          {/* LAYER 4: AMBER CORE */}
          <div
            className="absolute inset-y-[-20%] left-[-5%] w-[115%] bg-amber-300 opacity-90 grunge-jitter-c transform-gpu will-change-transform"
            style={{
              clipPath:
                'polygon(35% 100%, 45% 78%, 28% 62%, 48% 48%, 40% 30%, 62% 38%, 58% 10%, 78% 32%, 68% 52%, 90% 58%, 74% 70%, 86% 88%, 62% 80%, 52% 100%)',
            }}
          />

          {/* LAYER 5: SCREEN BLEND GLOW FLARE */}
          <div
            className="absolute inset-y-[-10%] left-[-12%] w-[140%] bg-red-600/60 grunge-jitter-a transform-gpu will-change-transform"
            style={{
              clipPath:
                'polygon(25% 100%, 38% 72%, 18% 58%, 42% 42%, 28% 22%, 58% 32%, 52% 2%, 78% 28%, 68% 48%, 92% 52%, 72% 68%, 88% 88%, 58% 78%, 48% 100%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📍 1D. PERSONA 5 RANSOM 3D TEXT BANNERS                                   */}
      {/* ========================================================================= */}
      <div className="absolute top-[68vh] right-[2vw] sm:right-[5vw] lg:right-[8vw] z-50 pointer-events-none select-none flex flex-col items-end gap-1">
        {/* BANNER 1: "PROFILE" */}
        <div className="[perspective:1000px] [transform-style:preserve-3d]">
          <div 
            className="flex items-center gap-1 sm:gap-2 bg-white text-black p-2 sm:p-3 -skew-x-12 border-4 border-black shadow-[10px_10px_0px_#000,-4px_-4px_0px_#10b981] transform-gpu [transform-style:preserve-3d]"
            style={{
              transform: 'rotateX(20deg) rotateY(60deg) rotateZ(-4deg) translateZ(30px)',
            }}
          >
            <span className="font-serif font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter uppercase inline-block -rotate-3 text-emerald-500 drop-shadow-[2px_2px_0px_#000]">P</span>
            <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl tracking-tight uppercase inline-block rotate-2">R</span>
            <span className="font-serif font-black text-3xl sm:text-5xl md:text-6xl tracking-widest uppercase inline-block -rotate-6 bg-black text-white px-1.5 shadow-[3px_3px_0px_#10b981]">O</span>
            <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase inline-block rotate-3">F</span>
            <span className="font-mono font-black text-3xl sm:text-5xl md:text-6xl uppercase inline-block -rotate-2 text-emerald-500 drop-shadow-[2px_2px_0px_#000]">I</span>
            <span className="font-serif font-black text-2xl sm:text-4xl md:text-5xl uppercase inline-block rotate-6">L</span>
            <span className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase inline-block -rotate-3 bg-teal-600 text-white px-1 shadow-[3px_3px_0px_#000]">E</span>
          </div>
        </div>

        {/* BANNER 2: "STATUS" */}
        <div className="[perspective:800px] [transform-style:preserve-3d] -mr-8 sm:-mr-16 -mt-4 sm:-mt-6">
          <div 
            className="flex items-center gap-1 sm:gap-2 bg-teal-600 text-white p-2 sm:p-2.5 -skew-x-12 border-4 border-black shadow-[12px_12px_0px_#000] transform-gpu [transform-style:preserve-3d]"
            style={{
              transform: 'rotateX(10deg) rotateY(-60deg) rotateZ(-4deg) translateZ(-30px) translateY(20px)',
            }}
          >
            <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl tracking-tight uppercase inline-block -rotate-6 bg-black text-white px-2 shadow-[2px_2px_0px_#fff]">S</span>
            <span className="font-serif font-black text-3xl sm:text-5xl md:text-6xl uppercase inline-block rotate-3 text-cyan-300 drop-shadow-[2px_2px_0px_#000]">T</span>
            <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase inline-block -rotate-2">A</span>
            <span className="font-serif font-black text-3xl sm:text-5xl md:text-6xl uppercase inline-block rotate-6 text-black drop-shadow-[2px_2px_0px_#fff]">T</span>
            <span className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase inline-block -rotate-3">U</span>
            <span className="font-serif font-black text-3xl sm:text-5xl md:text-6xl uppercase inline-block rotate-2 text-cyan-300 drop-shadow-[2px_2px_0px_#000]">S</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📍 1B. CHARACTER PROFILE PHOTO                                            */}
      {/* ========================================================================= */}
      <div className="absolute -bottom-16 -right-24 w-[65vw] sm:w-[50vw] md:w-[38vw] lg:w-[70vw] h-[65vh] sm:h-[110vh] z-30 pointer-events-none select-none flex items-end justify-end">
        <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-105 origin-bottom-right">
          <Image
            src="/assets/profile/photo-profile.png"
            alt="Profile Character"
            fill
            priority
            sizes="(max-width: 640px) 65vw, (max-width: 1024px) 50vw, 70vw"
            className="object-contain object-bottom filter contrast-125 saturate-80 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📍 1C. FOREGROUND AMBER FLARE                                             */}
      {/* ========================================================================= */}
      <div className="absolute -top-[0px] -right-[800px] w-[85vw] sm:w-[65vw] md:w-[130vw] h-full z-40 pointer-events-none select-none overflow-visible rotate-[36deg]">
        <div
          className="absolute inset-y-[-20%] left-[-5%] w-[115%] bg-amber-300 opacity-80 grunge-jitter-c transform-gpu will-change-transform"
          style={{
            clipPath:
              'polygon(35% 100%, 45% 78%, 28% 62%, 48% 48%, 40% 30%, 62% 38%, 58% 10%, 78% 32%, 68% 52%, 90% 58%, 74% 70%, 86% 88%, 62% 80%, 52% 100%)',
          }}
        />
      </div>

      {/* 2. BACKGROUND DIAGONAL WATERMARK */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
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
            onClick={() => handleNextTab('prev')}
            onMouseEnter={() => sfx.playHover()}
            className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 hover:border-emerald-500 px-2.5 py-1 -skew-x-12 text-xs font-mono font-bold text-zinc-300 transition cursor-pointer"
          >
            <span className="text-emerald-400 font-black">&lt; LB</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
            <button
              onClick={() => handleTabChange('status')}
              className={`px-3.5 py-1 -skew-x-12 transition-all cursor-pointer font-bold ${
                activeTab === 'status'
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              STATUS
            </button>
            <button
              onClick={() => handleTabChange('params')}
              className={`px-3.5 py-1 -skew-x-12 transition-all cursor-pointer font-bold ${
                activeTab === 'params'
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              TECH STACK
            </button>
            <button
              onClick={() => handleTabChange('equipment')}
              className={`px-3.5 py-1 -skew-x-12 transition-all cursor-pointer font-bold hidden sm:block ${
                activeTab === 'equipment'
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              EQUIPMENT
            </button>
          </div>

          <button
            onClick={() => handleNextTab('next')}
            onMouseEnter={() => sfx.playHover()}
            className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 hover:border-emerald-500 px-2.5 py-1 -skew-x-12 text-xs font-mono font-bold text-zinc-300 transition cursor-pointer"
          >
            <span className="text-emerald-400 font-black">RB &gt;</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 📍 4. MAIN STATUS ARENA (HIJAU TOSCA / CYAN ACCENTS)                     */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full my-auto -translate-y-8 sm:-translate-y-12 md:-translate-y-24 py-2 flex flex-col justify-center items-start overflow-visible">
        <div className="w-[85vw] sm:w-[75vw] lg:w-[110vw] -ml-12 md:-ml-18 flex flex-col gap-3.5 -rotate-2 sm:-rotate-5 transition-transform duration-300">
          
          {/* BANNER NAMA & METRICS */}
          <div className="relative bg-zinc-900 border-y-2 border-emerald-500 p-4 sm:p-5 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-700 pb-2.5 mb-3 pl-10 md:pl-20 pr-16 sm:pr-24 lg:pr-32">
              <div>
                <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                  {portofolioConfig.personal.name}
                </h2>
                <p className="font-mono text-xs text-teal-400 font-bold tracking-widest uppercase mt-0.5">
                  {portofolioConfig.personal.tagline || 'AN ENGINEER WITH ART IN MIND'}
                </p>
              </div>
            </div>

            {/* METRICS (2 Stat Card Diskrit + 1 Progress Bar IPK) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono pl-10 md:pl-20 pr-16 sm:pr-24 lg:pr-32 max-w-2xl">
            
              {/* STAT 1: GITHUB COMMITS (REALTIME DARI API) */}
              <div className="bg-zinc-950 p-2.5 border-l-4 border-cyan-400 border-y border-r border-zinc-800 flex items-center justify-between shadow-[2px_2px_0px_#000]">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase flex items-center gap-1">
                    <GitCommit size={11} className="text-cyan-400" /> COMMITS
                  </span>
                  <span className="text-lg font-black text-cyan-400 tracking-tight mt-0.5">
                    {loadingCommits ? (
                      <span className="text-xs text-zinc-500 animate-pulse">FETCHING...</span>
                    ) : (
                      <>
                        {commitCount?.toLocaleString() ?? '1,250'}
                        <span className="text-xs text-cyan-300 font-normal">+</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* STAT 2: COMPLETED PROJECTS */}
              <div className="bg-zinc-950 p-2.5 border-l-4 border-emerald-400 border-y border-r border-zinc-800 flex items-center justify-between shadow-[2px_2px_0px_#000]">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase flex items-center gap-1">
                    <FolderCheck size={11} className="text-emerald-400" /> PROJECTS
                  </span>
                  <span className="text-lg font-black text-emerald-400 tracking-tight mt-0.5">
                    20<span className="text-xs text-emerald-300 font-normal">+ DONE</span>
                  </span>
                </div>
              </div>

              {/* STAT 3: ACADEMIC GPA / IPK (DINAMIS SAMA DENGAN ANGKA) */}
              <div className="bg-zinc-950 p-2.5 border-l-4 border-amber-400 border-y border-r border-zinc-800 flex flex-col justify-center shadow-[2px_2px_0px_#000]">
                <div className="flex justify-between items-center text-[10px] font-bold mb-1">
                  <span className="text-amber-400 tracking-wider">CUMULATIVE GPA</span>
                  <span className="text-zinc-200">
                    {currentGpa.toFixed(2)} / {maxGpa.toFixed(2)}
                  </span>
                </div>
                
                {/* Progress Bar Dinamis */}
                <div className="w-full h-2 bg-zinc-900 border border-zinc-700 -skew-x-12 overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] transition-all duration-500 ease-out" 
                    style={{ width: `${gpaPercentage}%` }} 
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ARCANA & CLASS BAR */}
          <div className="relative bg-zinc-900 border-r-4 border-emerald-500 p-3.5 pl-14 md:pl-24 pr-16 sm:pr-24 lg:pr-32 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 text-zinc-950 font-black font-serif px-2.5 py-1 text-sm -rotate-3 border border-black shadow-[2px_2px_0px_#000]">
                01
              </div>
              <div>
                <span className="font-mono text-[10px] text-zinc-300 font-bold uppercase block tracking-wider">DEGREE / AFFILIATION</span>
                <h3 className="font-serif font-black text-sm sm:text-base text-white tracking-wider uppercase">
                  COMPUTER ENGINEERING <span className="text-xs text-zinc-400 font-sans font-normal">{'/'} UNDIP</span>
                </h3>
              </div>
            </div>
          </div>

          {/* TAB CONTENT */}
          <div className="bg-zinc-900 border-2 border-emerald-500/50 p-4 sm:p-5 pl-14 md:pl-24 pr-16 sm:pr-24 lg:pr-32 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col gap-3">
            {activeTab === 'status' && (
            <>
                <h4 className="font-serif font-black text-xs text-emerald-400 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-700 pb-1.5 max-w-md">
                <Terminal size={14} /> CORE CAPABILITIES
                </h4>

                {/* GRID EMBLEM BADGES (Rapi, Ringkas, Aksentuasi Persona) */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 font-mono text-xs max-w-xl py-1">
                {[
                    { name: 'UI/UX Design', icon: Sword, color: 'border-emerald-400 text-emerald-400' },
                    { name: 'Frontend Dev', icon: Zap, color: 'border-cyan-400 text-cyan-400' },
                    { name: 'Backend Dev', icon: Shield, color: 'border-teal-400 text-teal-400' },
                    { name: 'AI Engineer', icon: Cpu, color: 'border-amber-400 text-amber-400' },
                    { name: 'Graphic Designer', icon: Layers, color: 'border-emerald-400 text-emerald-300' },
                    { name: 'Embedded Eng.', icon: Terminal, color: 'border-cyan-300 text-cyan-300' },
                ].map((capability) => {
                    const IconComponent = capability.icon;
                    return (
                    <div
                        key={capability.name}
                        className={`bg-zinc-950 px-3 py-1.5 -skew-x-12 border-l-4 ${capability.color} border-y border-r border-zinc-800 flex items-center gap-1.5 shadow-[2px_2px_0px_#000] hover:scale-105 transition-transform duration-200 cursor-default`}
                    >
                        <IconComponent size={13} className="shrink-0" />
                        <span className="font-bold tracking-wider text-zinc-100 text-[11px] uppercase">
                        {capability.name}
                        </span>
                    </div>
                    );
                })}
                </div>
            </>
            )}

            {activeTab === 'params' && (
              <>
                <h4 className="font-serif font-black text-xs text-emerald-400 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-700 pb-1.5 max-w-md">
                  <Layers size={14} /> PRIMARY TECH STACK
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs max-w-lg py-1">
                  {['React / Next.js', 'Laravel & Express', 'ASP.NET C#', 'MySQL & Relational', 'Tailwind & Figma', 'C++ / Embedded'].map((tech) => (
                    <div key={tech} className="bg-zinc-950 px-3 py-1.5 border-l-2 border-emerald-400 text-zinc-100 text-[11px] font-bold">
                      {tech}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'equipment' && (
              <>
                <h4 className="font-serif font-black text-xs text-emerald-400 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-700 pb-1.5 max-w-md">
                  <Cpu size={14} /> ENGINEERING TOOLS
                </h4>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs max-w-lg py-1">
                  <div className="bg-zinc-950 p-2 border border-zinc-700">
                    <span className="text-[10px] text-zinc-400 block font-bold">IDE / DESIGN</span>
                    <span className="font-bold text-white">VS Code, Figma, Visual Studio</span>
                  </div>
                  <div className="bg-zinc-950 p-2 border border-zinc-700">
                    <span className="text-[10px] text-zinc-400 block font-bold">HARDWARE KIT</span>
                    <span className="font-bold text-white">ESP32, STM32, Logic Analyzer</span>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* 5. FOOTER PROMPT */}
      <footer className="relative z-40 flex items-center justify-between pt-3 text-xs font-mono shrink-0">
        <div className="flex items-center gap-4 text-zinc-500">
          <span className="flex items-center gap-1"><span className="text-white font-bold bg-zinc-800 px-1.5 py-0.5 text-[10px] -skew-x-12">D-PAD</span> NAVIGATE</span>
          <span className="hidden sm:flex items-center gap-1"><span className="text-white font-bold bg-zinc-800 px-1.5 py-0.5 text-[10px] -skew-x-12">X</span> DETAILS</span>
        </div>
      </footer>

      {/* KEYFRAME ANIMATIONS */}
      <style jsx global>{`
        @keyframes grunge-jitter-a {
          0%, 100% { transform: translate3d(0, 0, 0) scaleY(1); }
          25%  { transform: translate3d(-2px, 3px, 0) scaleY(0.94); }
          50%  { transform: translate3d(3px, -2px, 0) scaleY(1.06); }
          75%  { transform: translate3d(-1px, -3px, 0) scaleY(0.97); }
        }
        @keyframes grunge-jitter-b {
          0%, 100% { transform: translate3d(0, 0, 0) scaleY(1) skewX(0deg); }
          33%  { transform: translate3d(2px, -3px, 0) scaleY(1.08) skewX(2deg); }
          66%  { transform: translate3d(-3px, 2px, 0) scaleY(0.9) skewX(-3deg); }
        }
        @keyframes grunge-jitter-c {
          0%, 100% { transform: translate3d(0, 0, 0) scaleY(1); }
          33%  { transform: translate3d(-3px, 2px, 0) scaleY(1.1); }
          66%  { transform: translate3d(2px, -3px, 0) scaleY(0.9); }
        }

        .grunge-jitter-a { animation: grunge-jitter-a 1.8s steps(4, jump-end) infinite; }
        .grunge-jitter-b { animation: grunge-jitter-b 1.4s steps(3, jump-end) infinite; }
        .grunge-jitter-c { animation: grunge-jitter-c 1.1s steps(3, jump-end) infinite; }
      `}</style>
    </section>
  );
}