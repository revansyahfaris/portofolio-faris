'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { Shield, Zap, Sword, Terminal, Cpu, Layers, GitCommit, FolderCheck } from 'lucide-react';
import { portofolioConfig } from '../../config/portofolioConfig';
import { sfx } from '../../lib/sfx';

// =============================================================================
// TYPES
// =============================================================================
type TabType = 'status' | 'params' | 'equipment';

interface Capability {
  name: string;
  icon: LucideIcon;
  color: string;
}

interface EquipmentItem {
  label: string;
  value: string;
}

interface GithubCommitSearchResponse {
  total_count: number;
}

// =============================================================================
// CONSTANTS (dipindah ke luar komponen agar tidak dibuat ulang setiap render)
// =============================================================================
const MAX_GPA = 4.0;
const FALLBACK_COMMIT_COUNT = 1250;
const DEFAULT_GITHUB_USERNAME = 'revansyahfaris';

const TABS: readonly TabType[] = ['status', 'params', 'equipment'];

const CAPABILITIES: readonly Capability[] = [
  { name: 'UI/UX Design', icon: Sword, color: 'border-emerald-400 text-emerald-400' },
  { name: 'Frontend Dev', icon: Zap, color: 'border-cyan-400 text-cyan-400' },
  { name: 'Backend Dev', icon: Shield, color: 'border-teal-400 text-teal-400' },
  { name: 'AI Engineer', icon: Cpu, color: 'border-amber-400 text-amber-400' },
  { name: 'Graphic Designer', icon: Layers, color: 'border-emerald-400 text-emerald-300' },
  { name: 'Embedded Eng.', icon: Terminal, color: 'border-cyan-300 text-cyan-300' },
];

const TECH_STACK: readonly string[] = [
  'React / Next.js',
  'Laravel & Express',
  'ASP.NET C#',
  'MySQL & Relational',
  'Tailwind & Figma',
  'C++ / Embedded',
];

const EQUIPMENT: readonly EquipmentItem[] = [
  { label: 'IDE / DESIGN', value: 'VS Code, Figma, Visual Studio' },
  { label: 'HARDWARE KIT', value: 'ESP32, STM32, Logic Analyzer' },
];

// portofolioConfig bersifat statis (hasil import module), jadi kalkulasi GPA
// cukup dilakukan sekali saat module di-load, bukan setiap render.
const CURRENT_GPA = parseFloat(portofolioConfig.personal.gpa || '0');
const GPA_PERCENTAGE = Math.min((CURRENT_GPA / MAX_GPA) * 100, 100);

// =============================================================================
// SHARED 3D CARD SHELL
// =============================================================================
const CARD_BASE_CLASSES =
  'relative bg-zinc-900 border-4 border-black p-4 sm:p-5 pl-4 shadow-[0px_6px_0px_#10b981,-6px_-6px_0px_#10b981] antialiased';

const CARD_BASE_STYLE: CSSProperties = {
  transformOrigin: '100% 50%',
  WebkitFontSmoothing: 'antialiased',
  backfaceVisibility: 'hidden',
  willChange: 'transform',
};

interface Card3DProps {
  className?: string;
  style: CSSProperties;
  children: ReactNode;
}

function Card3D({ className = '', style, children }: Card3DProps) {
  return (
    <div className={`${CARD_BASE_CLASSES} ${className}`} style={{ ...CARD_BASE_STYLE, ...style }}>
      {children}
    </div>
  );
}

// =============================================================================
// STATIC BACKGROUND LAYERS (tidak pernah butuh re-render setelah mount)
// =============================================================================
const FlameBackground = memo(function FlameBackground() {
  return (
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
            backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.25) 15%, transparent 16%)',
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
  );
});

const ProfileBanners = memo(function ProfileBanners() {
  return (
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
  );
});

const CharacterPhoto = memo(function CharacterPhoto() {
  return (
    <div className="absolute -bottom-16 -right-24 w-[65vw] sm:w-[50vw] md:w-[38vw] lg:w-[70vw] h-[65vh] sm:h-[110vh] z-30 pointer-events-none select-none flex items-end justify-end">
      <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-105 origin-bottom-right">
        <Image
          src="/assets/profile/photo-profile.png"
          alt="Profile Character"
          fill
          priority
          sizes="(max-width: 640px) 65vw, (max-width: 1024px) 50vw, 70vw"
          className="object-contain object-bottom filter contrast-125 saturate-80"
        />
      </div>
    </div>
  );
});

const FlameFlareForeground = memo(function FlameFlareForeground() {
  return (
    <div className="absolute -top-[0px] -right-[800px] w-[85vw] sm:w-[65vw] md:w-[130vw] h-full z-40 pointer-events-none select-none overflow-visible rotate-[36deg]">
      <div
        className="absolute inset-y-[-20%] left-[-5%] w-[115%] bg-amber-300 opacity-80 grunge-jitter-c transform-gpu will-change-transform"
        style={{
          clipPath:
            'polygon(35% 100%, 45% 78%, 28% 62%, 48% 48%, 40% 30%, 62% 38%, 58% 10%, 78% 32%, 68% 52%, 90% 58%, 74% 70%, 86% 88%, 62% 80%, 52% 100%)',
        }}
      />
    </div>
  );
});

const BackgroundWatermark = memo(function BackgroundWatermark() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <span className="absolute -left-10 -bottom-6 font-serif font-black text-[25vw] text-white/20 leading-none select-none -rotate-12 pointer-events-none">
        01
      </span>
    </div>
  );
});

const SectionFooter = memo(function SectionFooter() {
  return (
    <footer className="relative z-40 flex items-center justify-between pt-3 text-xs font-mono shrink-0">
      <div className="flex items-center gap-4 text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="text-white font-bold bg-zinc-800 px-1.5 py-0.5 text-[10px] -skew-x-12">D-PAD</span> NAVIGATE
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <span className="text-white font-bold bg-zinc-800 px-1.5 py-0.5 text-[10px] -skew-x-12">X</span> DETAILS
        </span>
      </div>
    </footer>
  );
});

// =============================================================================
// TOP NAV / TAB SWITCHER
// =============================================================================
interface TopNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onPrev: () => void;
  onNext: () => void;
}

const TAB_LABELS: Record<TabType, string> = {
  status: 'STATUS',
  params: 'TECH STACK',
  equipment: 'EQUIPMENT',
};

const TopNav = memo(function TopNav({ activeTab, onSelectTab, onPrev, onNext }: TopNavProps) {
  return (
    <header className="relative z-20 flex items-center justify-between w-full shrink-0">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onPrev}
          onMouseEnter={() => sfx.playHover()}
          className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 hover:border-emerald-500 px-2.5 py-1 -skew-x-12 text-xs font-mono font-bold text-zinc-300 transition cursor-pointer"
        >
          <span className="text-emerald-400 font-black">&lt; LB</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onSelectTab(tab)}
              className={`px-3.5 py-1 -skew-x-12 transition-all cursor-pointer font-bold ${
                tab === 'equipment' ? 'hidden sm:block' : ''
              } ${
                activeTab === tab
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        <button
          onClick={onNext}
          onMouseEnter={() => sfx.playHover()}
          className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 hover:border-emerald-500 px-2.5 py-1 -skew-x-12 text-xs font-mono font-bold text-zinc-300 transition cursor-pointer"
        >
          <span className="text-emerald-400 font-black">RB &gt;</span>
        </button>
      </div>
    </header>
  );
});

// =============================================================================
// CARD 1: IDENTITY
// =============================================================================
const IDENTITY_STYLE: CSSProperties = {
  transform: 'perspective(400px) rotateY(28deg) rotateX(4deg) rotateZ(18deg) translateZ(-40px) translateX(450px) translateY(100px)',
};

interface IdentityCardProps {
  name: string;
  tagline: string;
}

const IdentityCard = memo(function IdentityCard({ name, tagline }: IdentityCardProps) {
  return (
    <Card3D className="md:pl-4 w-full sm:max-w-[750px]" style={IDENTITY_STYLE}>
      <div className="pr-20 sm:pr-32 md:pr-40 lg:pr-24 max-w-[100%]">
        <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-xl tracking-tight text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
          {name}
        </h2>
        <p className="font-mono text-xs text-teal-400 font-bold tracking-widest uppercase mt-0.5">
          {tagline}
        </p>
      </div>
    </Card3D>
  );
});

// =============================================================================
// CARD 2: TAB CONTENT
// =============================================================================
const TAB_CONTENT_STYLE: CSSProperties = {
  transform: 'perspective(400px) rotateY(28deg) rotateX(0deg) rotateZ(8deg) translateZ(-40px) translateX(215px) translateY(80px) scale(0.9)',
};

const CapabilityBadge = memo(function CapabilityBadge({ capability }: { capability: Capability }) {
  const Icon = capability.icon;
  return (
    <div
      className={`bg-zinc-950 px-3 py-1.5 -skew-x-12 border-l-4 ${capability.color} border-y border-r border-zinc-800 flex items-center gap-1.5 shadow-[2px_2px_0px_#000] hover:scale-105 transition-transform duration-200 cursor-default`}
    >
      <Icon size={13} className="shrink-0" />
      <span className="font-bold tracking-wider text-zinc-100 text-[11px] uppercase">{capability.name}</span>
    </div>
  );
});

const TechStackItem = memo(function TechStackItem({ tech }: { tech: string }) {
  return (
    <div className="bg-zinc-950 px-3 py-1.5 border-l-2 border-emerald-400 text-zinc-100 text-[11px] font-bold">
      {tech}
    </div>
  );
});

const EquipmentCard = memo(function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <div className="bg-zinc-950 p-2 border border-zinc-700">
      <span className="text-[10px] text-zinc-400 block font-bold">{item.label}</span>
      <span className="font-bold text-white">{item.value}</span>
    </div>
  );
});

const StatusTabContent = memo(function StatusTabContent() {
  return (
    <>
      <h4 className="font-serif font-black text-xs text-emerald-400 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-700 pb-1.5 max-w-md">
        <Terminal size={14} /> CORE CAPABILITIES
      </h4>
      <div className="flex flex-wrap gap-2 sm:gap-2.5 font-mono text-xs max-w-xl py-1">
        {CAPABILITIES.map((capability) => (
          <CapabilityBadge key={capability.name} capability={capability} />
        ))}
      </div>
    </>
  );
});

const ParamsTabContent = memo(function ParamsTabContent() {
  return (
    <>
      <h4 className="font-serif font-black text-xs text-emerald-400 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-700 pb-1.5 max-w-md">
        <Layers size={14} /> PRIMARY TECH STACK
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs max-w-lg py-1">
        {TECH_STACK.map((tech) => (
          <TechStackItem key={tech} tech={tech} />
        ))}
      </div>
    </>
  );
});

const EquipmentTabContent = memo(function EquipmentTabContent() {
  return (
    <>
      <h4 className="font-serif font-black text-xs text-emerald-400 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-700 pb-1.5 max-w-md">
        <Cpu size={14} /> ENGINEERING TOOLS
      </h4>
      <div className="grid grid-cols-2 gap-2 font-mono text-xs max-w-lg py-1">
        {EQUIPMENT.map((item) => (
          <EquipmentCard key={item.label} item={item} />
        ))}
      </div>
    </>
  );
});

const TabContentCard = memo(function TabContentCard({ activeTab }: { activeTab: TabType }) {
  return (
    <Card3D className="md:pl-4 w-full sm:max-w-[750px]" style={TAB_CONTENT_STYLE}>
      <div className="pr-20 sm:pr-32 md:pr-40 lg:pr-12 max-w-[100%] flex flex-col gap-3">
        {activeTab === 'status' && <StatusTabContent />}
        {activeTab === 'params' && <ParamsTabContent />}
        {activeTab === 'equipment' && <EquipmentTabContent />}
      </div>
    </Card3D>
  );
});

// =============================================================================
// CARD 3: DEGREE / AFFILIATION
// =============================================================================
const DEGREE_STYLE: CSSProperties = {
  transform: 'perspective(400px) rotateY(28deg) rotateX(4deg) rotateZ(-6deg) translateZ(-40px) translateX(275px) translateY(20px) scale(0.9)',
};

const DegreeCard = memo(function DegreeCard() {
  return (
    <Card3D className="md:pl-4 w-full sm:max-w-[750px]" style={DEGREE_STYLE}>
      <div className="pr-20 sm:pr-32 md:pr-40 lg:pr-12 max-w-[50%] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 text-zinc-950 font-black font-serif px-2.5 py-1 text-sm -rotate-3 border border-black shadow-[2px_2px_0px_#000]">
            01
          </div>
          <div>
            <span className="font-mono text-[10px] text-zinc-300 font-bold uppercase block tracking-wider">
              DEGREE / AFFILIATION
            </span>
            <h3 className="font-serif font-black text-xs xs:text-base text-white tracking-wider uppercase">
              COMPUTER ENGINEERING <span className="text-xs text-zinc-400 font-sans font-normal">{'/'} UNDIP</span>
            </h3>
          </div>
        </div>
      </div>
    </Card3D>
  );
});

// =============================================================================
// CARD 4: METRICS
// =============================================================================
const METRICS_STYLE: CSSProperties = {
  transform: 'perspective(400px) rotateY(28deg) rotateX(4deg) rotateZ(-20deg) translateZ(-40px) translateX(400px) translateY(-15px) scale(1)',
};

interface StatBadgeProps {
  icon: LucideIcon;
  iconColorClass: string;
  borderColorClass: string;
  valueColorClass: string;
  label: string;
  children: ReactNode;
}

const StatBadge = memo(function StatBadge({
  icon: Icon,
  iconColorClass,
  borderColorClass,
  valueColorClass,
  label,
  children,
}: StatBadgeProps) {
  return (
    <div
      className={`bg-zinc-950 p-2.5 border-l-4 ${borderColorClass} border-y border-r border-zinc-800 flex items-center justify-between shadow-[2px_2px_0px_#000]`}
    >
      <div className="flex flex-col">
        <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase flex items-center gap-1">
          <Icon size={11} className={iconColorClass} /> {label}
        </span>
        <span className={`text-lg font-black ${valueColorClass} tracking-tight mt-0.5`}>{children}</span>
      </div>
    </div>
  );
});

interface GpaBadgeProps {
  currentGpa: number;
  maxGpa: number;
  gpaPercentage: number;
}

const GpaBadge = memo(function GpaBadge({ currentGpa, maxGpa, gpaPercentage }: GpaBadgeProps) {
  return (
    <div className="bg-zinc-950 p-2.5 border-l-4 border-amber-400 border-y border-r border-zinc-800 flex flex-col justify-center shadow-[2px_2px_0px_#000]">
      <div className="flex justify-between items-center text-[10px] font-bold mb-1">
        <span className="text-amber-400 tracking-wider">CUMULATIVE GPA</span>
        <span className="text-zinc-200">
          {currentGpa.toFixed(2)} / {maxGpa.toFixed(2)}
        </span>
      </div>
      <div className="w-full h-2 bg-zinc-900 border border-zinc-700 -skew-x-12 overflow-hidden p-0.5">
        <div
          className="h-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] transition-all duration-500 ease-out"
          style={{ width: `${gpaPercentage}%` }}
        />
      </div>
    </div>
  );
});

interface MetricsCardProps {
  commitCount: number | null;
  loadingCommits: boolean;
}

const MetricsCard = memo(function MetricsCard({ commitCount, loadingCommits }: MetricsCardProps) {
  return (
    <Card3D className="md:pl-2 w-full sm:max-w-[700px]" style={METRICS_STYLE}>
      <div className="pr-20 sm:pr-32 md:pr-40 lg:pr-16 max-w-[55%]">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 font-mono">
          <StatBadge
            icon={GitCommit}
            iconColorClass="text-cyan-400"
            borderColorClass="border-cyan-400"
            valueColorClass="text-cyan-400"
            label="COMMITS"
          >
            {loadingCommits ? (
              <span className="text-xs text-zinc-500 animate-pulse">FETCHING...</span>
            ) : (
              <>
                {(commitCount ?? FALLBACK_COMMIT_COUNT).toLocaleString()}
                <span className="text-xs text-cyan-300 font-normal">+</span>
              </>
            )}
          </StatBadge>

          <StatBadge
            icon={FolderCheck}
            iconColorClass="text-emerald-400"
            borderColorClass="border-emerald-400"
            valueColorClass="text-emerald-400"
            label="PROJECTS"
          >
            20<span className="text-xs text-emerald-300 font-normal">+ DONE</span>
          </StatBadge>

          <GpaBadge currentGpa={CURRENT_GPA} maxGpa={MAX_GPA} gpaPercentage={GPA_PERCENTAGE} />
        </div>
      </div>
    </Card3D>
  );
});

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState<TabType>('status');
  const [commitCount, setCommitCount] = useState<number | null>(null);
  const [loadingCommits, setLoadingCommits] = useState<boolean>(true);

  const handleSelectTab = useCallback((tab: TabType) => {
    sfx.playSelect();
    setActiveTab(tab);
  }, []);

  const handlePrevTab = useCallback(() => {
    sfx.playSelect();
    setActiveTab((prev) => {
      const currentIndex = TABS.indexOf(prev);
      return TABS[(currentIndex - 1 + TABS.length) % TABS.length];
    });
  }, []);

  const handleNextTab = useCallback(() => {
    sfx.playSelect();
    setActiveTab((prev) => {
      const currentIndex = TABS.indexOf(prev);
      return TABS[(currentIndex + 1) % TABS.length];
    });
  }, []);

  // Auto fetch GitHub commit counter — dengan AbortController agar tidak
  // menyebabkan memory leak / setState setelah komponen unmount.
  useEffect(() => {
    const controller = new AbortController();

    async function fetchGithubCommits() {
      try {
        const githubUrl = portofolioConfig.socials.github;
        const username = githubUrl.split('/').pop() || DEFAULT_GITHUB_USERNAME;

        const res = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
          headers: {
            Accept: 'application/vnd.github.cloak-preview+json',
          },
          signal: controller.signal,
        });

        if (res.ok) {
          const data: GithubCommitSearchResponse = await res.json();
          setCommitCount(data.total_count);
        } else {
          setCommitCount(FALLBACK_COMMIT_COUNT);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // Komponen sudah unmount sebelum request selesai — abaikan.
          return;
        }
        console.error('Failed to fetch GitHub commits:', err);
        setCommitCount(FALLBACK_COMMIT_COUNT);
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCommits(false);
        }
      }
    }

    fetchGithubCommits();

    return () => controller.abort();
  }, []);

  return (
    <section
      id="profile"
      className="relative min-h-[100dvh] h-[100dvh] w-full bg-zinc-950 text-white overflow-hidden font-sans select-none flex flex-col justify-between p-4 sm:p-6 md:p-10 border-t-2 border-emerald-500/40"
    >
      {/* 1A. Background flame base */}
      <FlameBackground />

      {/* 1D. Persona-style 3D text banners */}
      <ProfileBanners />

      {/* 1B. Character profile photo */}
      <CharacterPhoto />

      {/* 1C. Foreground amber flare */}
      <FlameFlareForeground />

      {/* 2. Background diagonal watermark */}
      <BackgroundWatermark />

      {/* 3. Top nav / tab switcher */}
      <TopNav activeTab={activeTab} onSelectTab={handleSelectTab} onPrev={handlePrevTab} onNext={handleNextTab} />

      {/* 4. Main status arena — individual 3D perspective card bars */}
      <div
        className="relative z-20 w-full my-auto -translate-y-8 sm:-translate-y-12 md:-translate-y-24 translate-x-12 sm:translate-x-32 md:translate-x-48 py-2 flex flex-col justify-center items-start overflow-visible"
        style={{ transform: 'translateY(32px)' }}
      >
        <div className="w-[95vw] sm:w-[85vw] lg:w-[70vw] -ml-12 sm:-ml-20 md:-ml-28 flex flex-col gap-4">
          <IdentityCard
            name={portofolioConfig.personal.name}
            tagline={portofolioConfig.personal.tagline || 'AN ENGINEER WITH ART IN MIND'}
          />
          <TabContentCard activeTab={activeTab} />
          <DegreeCard />
          <MetricsCard commitCount={commitCount} loadingCommits={loadingCommits} />
        </div>
      </div>

      {/* 5. Footer prompt */}
      <SectionFooter />

      {/* Keyframe animations */}
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

        /* 📍 "THROWN BOX" ENTRANCE — animasi kartu terlempar maju dari arah kanan belakang */
        @keyframes fly-in-name {
          0%   { opacity: 0; transform: translate3d(300px, -200px, -200px) rotateY(-50deg) rotateZ(35deg) scale(0.5); }
          55%  { opacity: 1; }
          100% { opacity: 1; transform: rotateY(-28deg) rotateX(8deg) rotateZ(-3deg) translateZ(80px) translateX(-30px); }
        }
        @keyframes fly-in-degree {
          0%   { opacity: 0; transform: translate3d(340px, -160px, -200px) rotateY(-50deg) rotateZ(45deg) scale(0.5); }
          55%  { opacity: 1; }
          100% { opacity: 1; transform: rotateY(-24deg) rotateX(6deg) rotateZ(-2deg) translateZ(60px) translateX(-20px); }
        }
        @keyframes fly-in-capabilities {
          0%   { opacity: 0; transform: translate3d(380px, -140px, -200px) rotateY(-50deg) rotateZ(-35deg) scale(0.5); }
          55%  { opacity: 1; }
          100% { opacity: 1; transform: rotateY(-20deg) rotateX(4deg) rotateZ(-1deg) translateZ(30px) translateX(0px); }
        }

        .animate-fly-in-name {
          animation: fly-in-name 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.05s;
        }
        .animate-fly-in-degree {
          animation: fly-in-degree 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.25s;
        }
        .animate-fly-in-capabilities {
          animation: fly-in-capabilities 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.45s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fly-in-name,
          .animate-fly-in-degree,
          .animate-fly-in-capabilities {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}