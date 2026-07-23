'use client';

import { useState } from 'react';
import { ArrowRight, Trophy, Code2, Cpu, ShieldCheck } from 'lucide-react';

interface ResultNode {
  id: string;
  category: string;
  title: string;
  stat: string;
  subStat: string;
  color: string;
  desc: string;
}

const NODES: ResultNode[] = [
  {
    id: '01',
    category: 'FULL-STACK SYSTEMS',
    title: 'Digital Footprint & SI-PATRA',
    stat: '3.59 GPA',
    subStat: 'A-RANK ACADEMIC',
    color: 'bg-teal-500',
    desc: 'Pengembangan arsitektur web scalable, integrasi database relasional, dan protokol enkripsi data.',
  },
  {
    id: '02',
    category: 'EMBEDDED & HARDWARE',
    title: 'Computer Vision & CERC Research',
    stat: '20+ PROJ',
    subStat: 'COMPLETED QUESTS',
    color: 'bg-red-600',
    desc: 'Pemrograman sistem tertanam, pendeteksian AI MediaPipe real-time, dan integrasi komponen sensor.',
  },
  {
    id: '03',
    category: 'STUDIO LEADERSHIP',
    title: 'Meja Belakang Production',
    stat: 'FOUNDER',
    subStat: 'UI/UX & CREATIVE LEAD',
    color: 'bg-amber-500',
    desc: 'Manajemen studio kreatif, komunikasi klien, dan perancangan antarmuka high-fidelity.',
  },
];

export default function ResultPlaneSection() {
  const [activeNode, setActiveNode] = useState<ResultNode>(NODES[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle Parallax Mouse Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[650px] bg-zinc-950 border-t-4 border-b-4 border-red-600 text-white overflow-hidden select-none my-12 flex flex-col justify-between p-6 md:p-12"
    >
      
      {/* 1. LAYER BACKGROUND: DIAGONAL PAINT SLASHES (PSEUDO 3D PLANE) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`,
        }}
      >
        {/* Toska Paint Slash */}
        <div 
          className="absolute -top-36 -left-20 w-[110%] h-[70%] bg-teal-800/40 -rotate-12 origin-top-left border-b-4 border-teal-400/50"
          style={{ clipPath: 'polygon(0 0, 100% 10%, 80% 100%, 0 75%)' }}
        />

        {/* Red Crimson Paint Slash */}
        <div 
          className="absolute top-[35%] -right-20 w-[120%] h-[60%] bg-red-700/80 -rotate-6 origin-center border-t-4 border-red-400 shadow-[0_0_80px_rgba(220,38,38,0.5)]"
          style={{ clipPath: 'polygon(10% 0, 100% 20%, 90% 100%, 0 80%)' }}
        />

        {/* Black Ink Bottom Slice */}
        <div 
          className="absolute -bottom-20 -left-10 w-[120%] h-[40%] bg-zinc-950 -rotate-3"
          style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)' }}
        />
      </div>

      {/* 2. LAYER FLOOR TEXT: TILTED PERSPECTIVE TEXT (Lantai 3D Semu) */}
      <div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25 overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(800px) rotateX(40deg) rotateZ(-15deg) translate3d(${mousePos.x * 30}px, ${mousePos.y * 30}px, 0)`,
        }}
      >
        <h1 className="font-serif font-black text-8xl md:text-[13rem] tracking-tighter uppercase text-white leading-none whitespace-nowrap italic">
          RESULT // TRIUMPH
        </h1>
      </div>

      {/* 3. TOP HUD / HEADER */}
      <div className="relative z-20 flex items-center justify-between border-b-2 border-white/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 text-white font-mono font-black text-xs px-3 py-1 -rotate-2 shadow-lg">
            STAGE CLEAR
          </div>
          <span className="font-serif font-black text-2xl tracking-tight uppercase italic text-white">
            UNSCATHED <span className="text-red-500">TRIUMPH</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-4 py-1.5 -skew-x-12">
          <Trophy size={14} className="text-amber-400" />
          <span>STATUS: OVERALL A-RANK</span>
        </div>
      </div>

      {/* 4. MAIN INTERACTIVE CONTENT (3D-LIKE RESULT NODES) */}
      <div className="relative z-20 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
        
        {/* LEFT COLUMN: INTERACTIVE STAT NODES (DIAGONAL STACK) */}
        <div className="lg:col-span-7 space-y-4">
          {NODES.map((node) => {
            const isActive = activeNode.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`group cursor-pointer transition-all duration-200 p-4 border-2 -skew-x-12 flex items-center justify-between ${
                  isActive
                    ? 'bg-zinc-900 border-red-500 translate-x-4 shadow-[0_0_25px_rgba(220,38,38,0.5)]'
                    : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-500 hover:translate-x-2'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono font-black text-xs px-2 py-1 -rotate-3 text-white ${node.color}`}>
                    {node.id}
                  </span>
                  <div>
                    <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                      {node.category}
                    </p>
                    <h3 className="font-serif font-black text-lg md:text-xl text-white uppercase group-hover:text-red-400 transition">
                      {node.title}
                    </h3>
                  </div>
                </div>

                {/* STAT BADGE */}
                <div className="text-right font-serif">
                  <p className="font-black text-xl md:text-2xl text-amber-400 leading-none">
                    {node.stat}
                  </p>
                  <span className="font-mono text-[9px] bg-white text-zinc-950 font-bold px-1.5 py-0.5 uppercase tracking-tighter inline-block mt-1">
                    {node.subStat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: FOREGROUND ACTIVE CARD (BERDIRI TEGAK MEMOTONG LANTAI) */}
        <div 
          className="lg:col-span-5 relative transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)`,
          }}
        >
          <div 
            className="bg-zinc-900/95 border-4 border-red-600 p-6 shadow-2xl backdrop-blur-none -rotate-2 relative z-10"
            style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 92%)' }}
          >
            {/* CARD HUD HEADER */}
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
              <span className="font-mono font-bold text-xs text-teal-400">
                [ ACTIVE NODE METRICS ]
              </span>
              <div className="flex gap-1">
                <Code2 size={14} className="text-red-500" />
                <Cpu size={14} className="text-amber-400" />
                <ShieldCheck size={14} className="text-teal-400" />
              </div>
            </div>

            <h2 className="font-serif font-black text-2xl text-white uppercase leading-tight mb-2">
              {activeNode.title}
            </h2>

            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans mb-6">
              {activeNode.desc}
            </p>

            <a
              href="#projects"
              className="group flex items-center justify-between w-full bg-red-600 hover:bg-red-500 text-white font-serif font-black text-xs px-5 py-3 -skew-x-12 transition duration-150 uppercase tracking-wider shadow-lg"
            >
              <span>INSPECT ARCHIVE DATA</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>

      </div>

      {/* 5. BOTTOM HUD ACTION BAR */}
      <div className="relative z-20 flex items-center justify-between border-t-2 border-white/20 pt-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-4">
          <span>MONEY: <strong className="text-white">10,000 pts</strong></span>
          <span>•</span>
          <span>MAG: <strong className="text-teal-400">2,000 pts</strong></span>
        </div>
        <div className="hidden sm:block text-zinc-500">
          [ MOVE CURSOR TO PARALLAX TILT ]
        </div>
      </div>

    </section>
  );
}