'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import type { CSSProperties } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { portofolioConfig } from '../../config/portofolioConfig';
import { sfx } from '../../lib/sfx';
import QuestModal from './QuestModal';
import Image from 'next/image';
import StarsBackground from './StarsBackground';

/* ============================================================
   TYPES
   ============================================================ */
interface MenuItem {
  readonly id: string;
  readonly label: string;
  readonly targetId: string;
  readonly textSize: string;
  readonly wrapperStyle: CSSProperties;
}

interface GrungeLayerConfig {
  readonly className: string;
  readonly clipPath: string;
  readonly opacity?: number;
  readonly backgroundImage?: string;
  readonly backgroundSize?: string;
  readonly mixBlendMode?: CSSProperties['mixBlendMode'];
}

/* ============================================================
   CONSTANTS (module scope -> dibuat sekali)
   ============================================================ */
const MENU_ITEMS: readonly MenuItem[] = [
  { id: 'profile', label: 'PROFILE', targetId: 'profile', textSize: 'text-3xl md:text-5xl', wrapperStyle: { transform: 'rotate(24deg) skewX(16deg) translate3d(110px, -90px, 0)' } },
  { id: 'skills', label: 'SKILLS', targetId: 'skills', textSize: 'text-3xl md:text-5xl', wrapperStyle: { transform: 'rotate(18deg) skewX(12deg) translate3d(65px, -50px, 0)' } },
  { id: 'experience', label: 'EXPERIENCE', targetId: 'experience', textSize: 'text-3xl md:text-5xl', wrapperStyle: { transform: 'rotate(12deg) skewX(8deg) translate3d(30px, -60px, 0)' } },
  { id: 'achievement', label: 'ACHIEVEMENT', targetId: 'achievement', textSize: 'text-3xl md:text-5xl', wrapperStyle: { transform: 'rotate(6deg) skewX(4deg) translate3d(10px, -35px, 0)' } },
  { id: 'academy', label: 'ACADEMY', targetId: 'academy', textSize: 'text-3xl md:text-5xl', wrapperStyle: { transform: 'rotate(0deg) skewX(0deg) translate3d(0px, 0, 0)' } },
  { id: 'company', label: 'COMPANY', targetId: 'company', textSize: 'text-3xl md:text-5xl', wrapperStyle: { transform: 'rotate(-6deg) skewX(-4deg) translate3d(10px, 20px, 0)' } },
  { id: 'github', label: 'GITHUB', targetId: 'github', textSize: 'text-3xl md:text-5xl', wrapperStyle: { transform: 'rotate(-12deg) skewX(-8deg) translate3d(30px, 30px, 0)' } },
  { id: 'quest', label: 'QUEST', targetId: 'projects', textSize: 'text-3xl md:text-5xl', wrapperStyle: { transform: 'rotate(-18deg) skewX(-12deg) translate3d(65px, 40px, 0)' } },
  { id: 'connect', label: 'CONNECT', targetId: 'contact', textSize: 'text-3xl md:text-5xl', wrapperStyle: { transform: 'rotate(-24deg) skewX(-16deg) translate3d(110px, 90px, 0)' } },
];

const GRUNGE_LAYERS: readonly GrungeLayerConfig[] = [
  {
    className: 'absolute inset-y-[-85%] right-[-10%] w-[180%] bg-zinc-950 grunge-jitter-a',
    clipPath: 'polygon(15% 100%, 30% 68%, 10% 50%, 38% 35%, 20% 15%, 52% 25%, 48% -5%, 78% 20%, 62% 42%, 95% 48%, 68% 62%, 88% 88%, 52% 72%, 40% 100%)',
  },
  {
    className: 'absolute inset-y-[-75%] right-0 w-[150%] bg-red-600 grunge-jitter-a shadow-[0_0_25px_rgba(220,38,38,0.8)]',
    clipPath: 'polygon(20% 100%, 35% 70%, 15% 55%, 40% 40%, 25% 20%, 55% 30%, 50% 0%, 75% 25%, 65% 45%, 90% 50%, 70% 65%, 85% 85%, 55% 75%, 45% 100%)',
  },
  {
    className: 'absolute inset-y-[-60%] right-0 w-[125%] bg-[#FF5500] grunge-jitter-b',
    clipPath: 'polygon(30% 100%, 40% 75%, 20% 60%, 45% 45%, 35% 25%, 60% 35%, 55% 5%, 80% 30%, 68% 50%, 92% 55%, 72% 68%, 88% 88%, 60% 78%, 50% 100%)',
    opacity: 0.95,
    backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.25) 15%, transparent 16%)',
    backgroundSize: '6px 6px',
  },
  {
    className: 'absolute inset-y-[-40%] right-[5%] w-[90%] bg-amber-300 grunge-jitter-c',
    clipPath: 'polygon(35% 100%, 45% 78%, 28% 62%, 48% 48%, 40% 30%, 62% 38%, 58% 10%, 78% 32%, 68% 52%, 90% 58%, 74% 70%, 86% 88%, 62% 80%, 52% 100%)',
    opacity: 0.9,
  },
  {
    className: 'absolute inset-y-[-20%] right-[-5%] w-[150%] bg-red-600/60 grunge-jitter-a',
    clipPath: 'polygon(25% 100%, 38% 72%, 18% 58%, 42% 42%, 28% 22%, 58% 32%, 52% 2%, 78% 28%, 68% 48%, 92% 52%, 72% 68%, 88% 88%, 58% 78%, 48% 100%)',
    mixBlendMode: 'screen',
  },
];

const ROOT_CLASSNAME =
  'relative min-h-[100dvh] h-[100dvh] w-full bg-zinc-950 text-white overflow-hidden font-sans select-none flex flex-col justify-between p-4 sm:p-6 md:p-10 transition-filter duration-150';

const INNER_WRAPPER_STYLE_SELECTED: CSSProperties = {
  transform: 'rotateY(10deg) scale(1.3)',
  transformOrigin: 'right center',
  transformStyle: 'preserve-3d',
  backfaceVisibility: 'hidden',
  transition: 'transform 200ms ease',
};

const INNER_WRAPPER_STYLE_UNSELECTED: CSSProperties = {
  transform: 'rotateY(22deg) scale(1.3)',
  transformOrigin: 'right center',
  transformStyle: 'preserve-3d',
  backfaceVisibility: 'hidden',
  transition: 'transform 200ms ease',
};

const LABEL_CLIP_STYLE: CSSProperties = { clipPath: 'polygon(0 0, 95% 15%, 100% 85%, 0 100%)' };
const ARTWORK_ASPECT_STYLE: CSSProperties = { aspectRatio: '16 / 9' };

const ARTWORK_IMAGE_STYLE: CSSProperties = {
  objectPosition: 'top 30% right 25%',
  transform: 'scale(3.2) translateX(15%) translateY(0%)',
  transformOrigin: 'top right',
};

const INDEX_DISPLAY_STYLE: CSSProperties = {
  fontSize: 'clamp(32px, 16vw, 240px)',
  fontVariantNumeric: 'lining-nums tabular-nums',
};

const MENU_PERSPECTIVE_STYLE: CSSProperties = { perspective: '1000px', perspectiveOrigin: '0% 50%' };
const TAGLINE_BAR_STYLE: CSSProperties = { clipPath: 'polygon(2% 0, 100% 20%, 100% 100%, 0 80%)' };
const TAGLINE_TEXT_STYLE: CSSProperties = { textShadow: '1px 1px 2px rgba(0,0,0,0.5)', rotate: '1.05deg' };
const BIO_BOX_STYLE: CSSProperties = { clipPath: 'polygon(4% 0, 100% 0, 100% 100%, 0 100%)' };

/* ============================================================
   FLATTENED MENU ITEM ROW
   ============================================================ */
interface MenuItemRowProps {
  readonly item: MenuItem;
  readonly isSelected: boolean;
  readonly effectsReady: boolean;
  readonly index: number;
  readonly onClick: (targetId: string, index: number) => void;
  readonly onHover: (targetId: string, index: number) => void;
}

const MenuItemRow = memo(function MenuItemRow({
  item,
  isSelected,
  effectsReady,
  index,
  onClick,
  onHover,
}: MenuItemRowProps) {
  return (
    <div
      onClick={() => onClick(item.targetId, index)}
      onMouseEnter={() => onHover(item.targetId, index)}
      className={`group relative flex justify-end cursor-pointer transition-all duration-200 origin-left ${
        isSelected ? 'z-0' : 'z-20'
      }`}
      style={{
        ...item.wrapperStyle,
        perspective: '350px',
        perspectiveOrigin: '0% 50%',
      }}
    >
      <div
        className="relative inline-block"
        style={isSelected ? INNER_WRAPPER_STYLE_SELECTED : INNER_WRAPPER_STYLE_UNSELECTED}
      >
        {/* GRUNGE FLAME */}
        <div
          className="absolute inset-0 -z-10 overflow-visible pointer-events-none select-none transition-opacity duration-150"
          style={{
            opacity: isSelected && effectsReady ? 1 : 0,
            visibility: isSelected ? 'visible' : 'hidden',
          }}
        >
          {GRUNGE_LAYERS.map((layer, layerIndex) => (
            <div
              key={layerIndex}
              className={layer.className}
              style={{
                clipPath: layer.clipPath,
                opacity: layer.opacity,
                backgroundImage: layer.backgroundImage,
                backgroundSize: layer.backgroundSize,
                mixBlendMode: layer.mixBlendMode,
                animationPlayState: isSelected ? 'running' : 'paused',
              }}
            />
          ))}
        </div>

        <h1
          className={`font-serif font-black ${item.textSize} text-right tracking-tighter uppercase leading-none px-4 py-0.5 transition-colors duration-150 ${
            isSelected
              ? 'bg-red-600 text-zinc-950 shadow-[0_0_35px_rgba(220,38,38,0.9)] z-30'
              : 'bg-transparent text-white group-hover:bg-red-600 group-hover:text-zinc-950'
          }`}
          style={LABEL_CLIP_STYLE}
        >
          {item.label}
        </h1>
      </div>
    </div>
  );
});

/* ============================================================
   SUB-KOMPONEN ISOLASI
   ============================================================ */
const HeroStarsBackground = memo(function HeroStarsBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="w-full h-full scale-115 relative hero-breathe">
        <StarsBackground />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950/90 z-0" />
    </div>
  );
});

const HeroArtwork = memo(function HeroArtwork() {
  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      <div className="absolute top-0 right-0 w-[80vw] sm:w-[60vw] lg:w-[45vw]" style={ARTWORK_ASPECT_STYLE}>
        <div className="w-full h-full hero-breathe">
          <Image
            src="/assets/hero/hero-bg-dekstop.png"
            alt="Hero Artwork"
            fill
            priority={true}
            fetchPriority="high"
            loading="eager"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 45vw"
            className="object-cover transform-gpu"
            style={{
              ...ARTWORK_IMAGE_STYLE,
              contain: 'paint',
            }}
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/55 to-transparent z-10" />
    </div>
  );
});

interface HeroIndexDisplayProps {
  readonly selectedIndex: number;
}

const HeroIndexDisplay = memo(function HeroIndexDisplay({ selectedIndex }: HeroIndexDisplayProps) {
  return (
    <div className="pointer-events-none select-none absolute -rotate-90 top-32 right-2 md:right-8 z-0 w-[7vw] max-w-[420px] text-right">
      <span
        key={selectedIndex}
        className="block font-serif font-black text-white leading-none opacity-90"
        style={INDEX_DISPLAY_STYLE}
      >
        {'0'}
        {selectedIndex + 1}
      </span>
    </div>
  );
});

interface HeroTopHudProps {
  readonly sfxEnabled: boolean;
  readonly onToggleSfx: () => void;
  readonly onOpenModal: () => void;
}

const HeroTopHud = memo(function HeroTopHud({ sfxEnabled, onToggleSfx, onOpenModal }: HeroTopHudProps) {
  return (
    <header className="relative z-30 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3 text-xs font-mono">
        <button
          onClick={onToggleSfx}
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
          onClick={onOpenModal}
          onMouseEnter={() => sfx.playHover()}
          className="bg-white text-zinc-950 font-black px-4 py-1.5 -rotate-2 hover:bg-red-600 hover:text-white transition uppercase tracking-wider text-xs shadow-lg cursor-pointer"
        >
          DISPATCH QUEST
        </button>
      </div>
    </header>
  );
});

interface HeroMenuProps {
  readonly selectedIndex: number;
  readonly effectsReady: boolean;
  readonly onMenuClick: (targetId: string, index: number) => void;
  readonly onMenuHover: (targetId: string, index: number) => void;
}

const HeroMenu = memo(function HeroMenu({ selectedIndex, effectsReady, onMenuClick, onMenuHover }: HeroMenuProps) {
  return (
    <main className="relative z-10 my-auto py-2 flex flex-col justify-center items-start w-full max-w-xl mr-auto">
      <div
        className="flex flex-col items-end space-y-1.5 w-full my-2 transition-transform duration-300 origin-left -translate-y-4"
        style={MENU_PERSPECTIVE_STYLE}
      >
        {MENU_ITEMS.map((item, index) => (
          <MenuItemRow
            key={item.id}
            item={item}
            index={index}
            isSelected={selectedIndex === index}
            effectsReady={effectsReady}
            onClick={onMenuClick}
            onHover={onMenuHover}
          />
        ))}
      </div>
    </main>
  );
});

interface HeroBottomHudProps {
  readonly onOpenModal: () => void;
}

const HeroBottomHud = memo(function HeroBottomHud({ onOpenModal }: HeroBottomHudProps) {
  return (
    <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-10 z-30 flex flex-col items-end gap-2 max-w-md md:max-w-xl pointer-events-none">
      <div className="relative w-full flex justify-end px-4">
        <div
          className="w-[90%] sm:w-[75%] md:w-[70%] -mr-4 h-8 md:h-9 bg-red-600/90 -rotate-2 shadow-[0_0_25px_rgba(220,38,38,0.5)] flex items-center justify-end px-8 z-0"
          style={TAGLINE_BAR_STYLE}
        >
          <span
            className="font-serif font-black text-[10px] md:text-xs tracking-[0.25em] uppercase text-red-100 opacity-90 text-right whitespace-nowrap"
            style={TAGLINE_TEXT_STYLE}
          >
            {portofolioConfig.personal.tagline.toUpperCase()}
          </span>
        </div>
      </div>

      <div
        className="bg-zinc-900/95 border-r-4 border-red-600 p-2.5 md:p-3.5 shadow-2xl -rotate-1 text-right pointer-events-auto backdrop-blur-md"
        style={BIO_BOX_STYLE}
      >
        <p className="text-[11px] sm:text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
          {portofolioConfig.personal.bioShort}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 mt-1 pointer-events-auto">
        <button
          onClick={onOpenModal}
          onMouseEnter={() => sfx.playHover()}
          className="group flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-serif font-black px-4 sm:px-6 py-2 -rotate-2 shadow-[3px_3px_0px_rgba(255,255,255,0.9)] transition uppercase tracking-wider text-xs md:text-sm cursor-pointer whitespace-nowrap"
        >
          INITIATE <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
});

interface QuickScrollButtonProps {
  readonly onClick: () => void;
}

const QuickScrollButton = memo(function QuickScrollButton({ onClick }: QuickScrollButtonProps) {
  return (
    <div className="absolute bottom-6 left-6 sm:left-10 z-30 pointer-events-auto">
      <button
        onClick={onClick}
        onMouseEnter={() => sfx.playHover()}
        className="group flex items-center gap-3 bg-zinc-950/90 border border-zinc-800 hover:border-red-600 px-4 py-2 -skew-x-12 transition-all cursor-pointer shadow-lg backdrop-blur-md"
      >
        <div className="bg-red-600 text-zinc-950 p-1 rounded-none group-hover:bg-white transition-colors animate-bounce">
          <ArrowRight size={14} className="rotate-90" />
        </div>
        <div className="flex flex-col items-start font-mono text-[10px] tracking-widest uppercase">
          <span className="text-zinc-500 group-hover:text-red-500 transition-colors">QUICK</span>
          <span className="font-serif font-black text-xs text-white group-hover:text-red-400">SCROLL</span>
        </div>
      </button>
    </div>
  );
});

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [effectsReady, setEffectsReady] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const isLockRef = useRef(false);
  const isInViewportRef = useRef(true);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const glitchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedIndexRef = useRef(selectedIndex);
  const isModalOpenRef = useRef(isModalOpen);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEffectsReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // OBSERVER VIEWPORT BOUNDARY CHECK
  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewportRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      },
      { threshold: [0.1, 0.5, 0.9] }
    );

    observer.observe(rootEl);
    return () => observer.disconnect();
  }, []);

  // SEQUENTIAL SCROLL LOCK
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInViewportRef.current) return;

      const current = selectedIndexRef.current;

      if (e.deltaY > 0 && current < MENU_ITEMS.length - 1) {
        e.preventDefault();
        if (isLockRef.current) return;

        isLockRef.current = true;
        sfx.playHover();
        setSelectedIndex(current + 1);

        setTimeout(() => {
          isLockRef.current = false;
        }, 80);
      } else if (e.deltaY < 0 && current > 0) {
        e.preventDefault();
        if (isLockRef.current) return;

        isLockRef.current = true;
        sfx.playHover();
        setSelectedIndex(current - 1);

        setTimeout(() => {
          isLockRef.current = false;
        }, 80);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm' && !isModalOpenRef.current) {
        sfx.playSelect();
        rootRef.current?.classList.add('invert', 'contrast-200');
        if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
        glitchTimeoutRef.current = setTimeout(() => {
          rootRef.current?.classList.remove('invert', 'contrast-200');
          glitchTimeoutRef.current = null;
        }, 800);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const scrollToNextSection = useCallback(() => {
    sfx.playSelect();
    const nextSection = document.getElementById('profile');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const toggleSfx = useCallback(() => {
    setSfxEnabled((prev) => {
      const next = !prev;
      sfx.enabled = next;
      if (next) sfx.playSelect();
      return next;
    });
  }, []);

  const handleOpenModal = useCallback(() => {
    sfx.playSelect();
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Optimasi handler hover/select menu dengan requestAnimationFrame
  const handleMenuSelect = useCallback((targetId: string, index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    requestAnimationFrame(() => {
      setSelectedIndex((prev) => {
        if (prev !== index) sfx.playHover();
        return index;
      });
    });
  }, []);

  const handleMenuClick = useCallback((targetId: string, index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    sfx.playSelect();
    setSelectedIndex(index);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div ref={rootRef} className={ROOT_CLASSNAME}>
      <QuestModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <HeroStarsBackground />
      <HeroArtwork />
      <HeroIndexDisplay selectedIndex={selectedIndex} />
      <HeroTopHud sfxEnabled={sfxEnabled} onToggleSfx={toggleSfx} onOpenModal={handleOpenModal} />
      <HeroMenu
        selectedIndex={selectedIndex}
        effectsReady={effectsReady}
        onMenuClick={handleMenuClick}
        onMenuHover={handleMenuSelect}
      />
      <HeroBottomHud onOpenModal={handleOpenModal} />
      <QuickScrollButton onClick={scrollToNextSection} />

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
        @keyframes hero-breathe {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }

        .hero-breathe { animation: hero-breathe 12s ease-in-out infinite; will-change: transform; }
        .grunge-jitter-a { animation: grunge-jitter-a 1.8s steps(4, jump-end) infinite; }
        .grunge-jitter-b { animation: grunge-jitter-b 1.4s steps(3, jump-end) infinite; }
        .grunge-jitter-c { animation: grunge-jitter-c 1.1s steps(3, jump-end) infinite; }
      `}</style>
    </div>
  );
}