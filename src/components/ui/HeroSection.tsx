'use client';

/**
 * HeroSection
 *
 * Section pertama yang tampil di halaman (di atas viewport awal / above-the-fold).
 * Berisi:
 * - Menu navigasi utama berbentuk daftar label yang bisa dipilih lewat scroll wheel.
 * - Artwork/gambar hero dengan efek fade di tepi kiri dan bawah.
 * - Integrasi dengan Lenis untuk mengunci scroll selama navigasi menu berlangsung,
 *   dan untuk snap otomatis ke section Profile setelah menu selesai dijelajahi.
 */

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { portofolioConfig } from '../../config/portofolioConfig';
import Image from 'next/image';
import StarsBackground from './StarsBackground';
import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/* ============================================================
   TIPE DATA & KONSTANTA
   ============================================================ */

/** Satu item pada menu navigasi utama Hero. */
interface MenuItem {
  readonly id: string;
  readonly label: string;
  readonly targetId: string;
  readonly textSize: string;
  readonly wrapperStyle: CSSProperties;
}

/** Konfigurasi satu lapisan efek "grunge" (bentuk polygon beranimasi) di belakang menu item yang aktif. */
interface GrungeLayerConfig {
  readonly className: string;
  readonly clipPath: string;
  readonly opacity?: number;
  readonly backgroundImage?: string;
  readonly backgroundSize?: string;
  readonly mixBlendMode?: CSSProperties['mixBlendMode'];
}

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

/* Class untuk isolasi layout dan paint agar perhitungan ulang section ini
   tidak memicu reflow pada section lain di luar Hero. */
const ROOT_CLASSNAME =
  'relative min-h-[100dvh] h-[100dvh] w-full bg-transparent text-white overflow-hidden font-sans select-none flex flex-col justify-between p-4 sm:p-6 md:p-10 contain-layout contain-paint';

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
const ARTWORK_SHADOW_STYLE: CSSProperties = { aspectRatio: '16 / 9' };

const INDEX_DISPLAY_STYLE: CSSProperties = {
  fontSize: 'clamp(32px, 16vw, 240px)',
  fontVariantNumeric: 'lining-nums tabular-nums',
};

const MENU_PERSPECTIVE_STYLE: CSSProperties = { perspective: '1000px', perspectiveOrigin: '0% 50%' };
const TAGLINE_BAR_STYLE: CSSProperties = { clipPath: 'polygon(2% 0, 100% 20%, 100% 100%, 0 80%)' };
const TAGLINE_TEXT_STYLE: CSSProperties = { textShadow: '1px 1px 2px rgba(0,0,0,0.5)', rotate: '1.05deg' };
const BIO_BOX_STYLE: CSSProperties = { clipPath: 'polygon(4% 0, 100% 0, 100% 100%, 0 100%)' };

/* ============================================================
   BARIS MENU ITEM
   ============================================================ */
interface MenuItemRowProps {
  readonly item: MenuItem;
  readonly isSelected: boolean;
  readonly effectsReady: boolean;
  readonly index: number;
  readonly onClick: (targetId: string, index: number) => void;
  readonly onHover: (targetId: string, index: number) => void;
}

/** Satu baris menu navigasi. Menampilkan label dan efek lapisan grunge saat item ini dipilih. */
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
        <div
          className="absolute inset-0 -z-10 overflow-visible pointer-events-none select-none transition-opacity duration-150 isolate"
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

const ARTWORK_IMAGE_STYLE: CSSProperties = {
  objectPosition: 'right 25% top 30%',
  transform:'scale(1.9) translateX(10%) translateY(0%)',
  transformOrigin: 'right top',
};

/**
 * Gambar artwork utama Hero. Tepi kiri dan bawah gambar dibuat memudar (fade) memakai
 * mask-image ganda (Webkit dan standar) agar kompatibel lintas browser.
 *
 * Catatan performa: kombinasi elemen besar + mask + transform pada ARTWORK_IMAGE_STYLE
 * membuat elemen ini selalu mendapat compositing layer GPU tersendiri. Ini sudah
 * diverifikasi sebagai biaya yang melekat pada teknik fade bermask, bukan indikasi bug.
 */
const HeroArtwork = memo(function HeroArtwork() {
  return (
    <div
      className="absolute inset-0 z-[5] overflow-hidden pointer-events-none"
      style={{ isolation: 'isolate' }}
    >
      <div
        className="absolute top-0 right-0 w-[95vw] sm:w-[80vw] lg:w-[70vw]"
        style={ARTWORK_SHADOW_STYLE}
      >
        <div
          className="w-full h-full hero-breathe relative"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%), linear-gradient(to top, transparent 0%, black 15%)',
            WebkitMaskComposite: 'destination-in',
            maskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
            maskComposite: 'intersect',
          }}
        >
          <div className="absolute top-0 right-0 w-[80vw] sm:w-[60vw] lg:w-[45vw] h-full">
            <Image
              src="https://res.cloudinary.com/iyerv9sc/image/upload/f_auto,q_auto/hero-bg-dekstop_dhiy7s"
              alt="Hero Artwork"
              fill
              priority={true}
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
              className="object-cover"
              style={ARTWORK_IMAGE_STYLE}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

interface HeroIndexDisplayProps {
  readonly selectedIndex: number;
}

/** Menampilkan nomor urut menu yang sedang aktif (misal "01", "02") secara dekoratif, diputar 90 derajat. */
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
  readonly onDispatchQuest: () => void;
}

/**
 * Header di bagian atas Hero, berisi tombol ajakan utama.
 *
 * Tombol ini dulunya membuka QuestModal. Karena modal tersebut dinonaktifkan
 * (formulirnya masih menyimulasikan pengiriman dan tidak terhubung ke backend),
 * tombolnya kini mengarahkan pengguna ke section Connect yang formulirnya benar-
 * benar terkirim. Membiarkannya memanggil handler yang tidak menghasilkan apa pun
 * jauh lebih buruk daripada mengubah tujuannya: pengguna menekan tombol paling
 * menonjol di halaman lalu tidak terjadi apa-apa.
 */
const HeroTopHud = memo(function HeroTopHud({ onDispatchQuest }: HeroTopHudProps) {
  return (
    <header className="relative z-30 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3 text-xs font-mono">
        <button
          type="button"
          onClick={onDispatchQuest}
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

/** Daftar menu navigasi utama, merender satu MenuItemRow untuk setiap entri di MENU_ITEMS. */
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
  readonly onDispatchQuest: () => void;
}

/** Panel di bagian bawah Hero: tagline, bio singkat, dan tombol "Initiate" menuju section Connect. */
const HeroBottomHud = memo(function HeroBottomHud({ onDispatchQuest }: HeroBottomHudProps) {
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
          type="button"
          onClick={onDispatchQuest}
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

/** Tombol pintasan di pojok kiri bawah untuk scroll langsung ke section Profile. */
const QuickScrollButton = memo(function QuickScrollButton({ onClick }: QuickScrollButtonProps) {
  return (
    <div className="absolute bottom-6 left-6 sm:left-10 z-30 pointer-events-auto">
      <button
        onClick={onClick}
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

/**
 * Komponen utama Hero section. Bertanggung jawab atas:
 * - State menu (index yang dipilih) dan navigasinya lewat scroll wheel maupun klik.
 * - Sinkronisasi dengan instance Lenis global (window.__lenis) untuk mengunci scroll
 *   selagi menu masih dijelajahi, dan melepas kunci saat sudah selesai.
 * - Snap otomatis ke section Profile setelah pengguna mencapai menu terakhir.
 */
export default function HeroSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [effectsReady, setEffectsReady] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const isInViewportRef = useRef(true);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const glitchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref dipakai supaya event listener (wheel/scroll) selalu membaca nilai terbaru
  // tanpa perlu dependency array yang memicu pemasangan ulang listener tiap render.
  const selectedIndexRef = useRef(selectedIndex);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  // Menunda aktivasi efek visual (glow, dsb.) satu frame setelah mount,
  // supaya tidak ikut serta dalam paint pertama.
  useEffect(() => {
    const id = requestAnimationFrame(() => setEffectsReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Melacak apakah Hero section sedang berada di viewport, dipakai oleh
  // handler lain (misalnya keyboard shortcut) untuk menghindari efek saat section tidak terlihat.
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

  // Mengubah gesture scroll wheel menjadi navigasi menu selama masih berada di
  // bagian atas halaman. Lenis dihentikan sementara (lenis.stop()) supaya wheel
  // event dipakai penuh untuk berpindah antar menu, bukan menggerakkan scroll halaman.
  useEffect(() => {
    let lastStepTime = 0;

    const handleWheel = (e: WheelEvent) => {
      const lenis = window.__lenis;
      const isAtTop = window.scrollY <= 10;

      if (!isAtTop) return;

      const current = selectedIndexRef.current;
      const maxIndex = MENU_ITEMS.length - 1;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const isNavigatingMenu =
        (isScrollingDown && current < maxIndex) ||
        (isScrollingUp && current > 0);

      if (isNavigatingMenu) {
        if (lenis) lenis.stop();
        e.preventDefault();

        if (Math.abs(e.deltaY) < 20) return;

        const now = Date.now();
        if (now - lastStepTime < 100) return;
        lastStepTime = now;

        if (isScrollingDown && current < maxIndex) {
          setSelectedIndex(current + 1);
        } else if (isScrollingUp && current > 0) {
          setSelectedIndex(current - 1);
        }
        return;
      }

      // Jika pengguna sudah berada di menu terakhir dan tetap scroll ke bawah,
      // lepas kunci Lenis dan lanjutkan scroll otomatis menuju section Profile.
      if (isScrollingDown && current === maxIndex) {
        if (lenis) {
          lenis.start();
          const profileEl = document.getElementById('profile');
          if (profileEl) {
            lenis.scrollTo(profileEl, { duration: 1.2 });
          }
        }
      }
    };

    const handleScrollCheck = () => {
      const lenis = window.__lenis;
      if (window.scrollY > 5 && lenis) {
        lenis.start();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScrollCheck, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScrollCheck);
    };
  }, []);

  // Menangani snap otomatis antara section Hero dan Profile berdasarkan
  // kecepatan scroll (flick) maupun posisi akhir scroll (scrollend).
  useEffect(() => {
    let isSnapping = false;
    let rafId: number | null = null;
    let lenisInstance: NonNullable<typeof window.__lenis> | null = null;

    const SNAP_THRESHOLD = 0.5;
    const FLICK_VELOCITY = 0.4; // px/ms — flick kencang: snap instan, gak usah nunggu scrollend

    const triggerSnap = (goToProfile: boolean) => {
      if (!lenisInstance) return;
      const profileEl = document.getElementById('profile');
      const heroEl = document.getElementById('hero');
      const target = goToProfile ? profileEl : heroEl;
      if (!target) return;

      isSnapping = true;
      lenisInstance.scrollTo(target, {
        duration: 0.6,
        lock: true,
        onComplete: () => {
          isSnapping = false;
        },
      });
    };

    const isInZone = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      return currentScrollY > heroHeight * 0.02 && currentScrollY < heroHeight * 0.98;
    };

    // Jalur cepat: kalau kecepatan scroll (flick) sudah melewati ambang batas,
    // langsung snap ke arah gerakan tanpa menunggu scroll benar-benar berhenti.
    const handleLenisScroll = ({ velocity }: { velocity: number }) => {
      if (isSnapping) return;
      if (!isInZone()) return;
      if (Math.abs(velocity) > FLICK_VELOCITY) {
        triggerSnap(velocity > 0);
      }
    };

    // Jalur utama: event "scrollend" menandakan browser sudah benar-benar selesai
    // memproses scroll (termasuk sisa momentum/inertia), sehingga lebih akurat
    // dibanding menebak dari kecepatan saja.
    const handleScrollEnd = () => {
      if (isSnapping) return;
      if (!isInZone()) return;

      const heroHeight = window.innerHeight;
      triggerSnap(window.scrollY > heroHeight * SNAP_THRESHOLD);
    };

    const waitForLenis = () => {
      const lenis = window.__lenis;
      if (lenis) {
        lenisInstance = lenis;
        lenis.on('scroll', handleLenisScroll);
        window.addEventListener('scrollend', handleScrollEnd);
        return;
      }
      rafId = requestAnimationFrame(waitForLenis);
    };

    waitForLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scrollend', handleScrollEnd);
      if (lenisInstance) lenisInstance.off('scroll', handleLenisScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
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
    const nextSection = document.getElementById('profile');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  /**
   * Membawa pengguna ke section Connect.
   *
   * Menggantikan pembukaan QuestModal yang formulirnya belum terhubung ke backend.
   * Section Connect punya formulir yang benar-benar terkirim beserta jalur kontak
   * langsung, jadi tujuan tombolnya tetap sama — hanya jalurnya yang kini nyata.
   */
  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleMenuSelect = useCallback((_targetId: string, index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    requestAnimationFrame(() => {
      setSelectedIndex(index);
    });
  }, []);

  const handleMenuClick = useCallback((targetId: string, index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setSelectedIndex(index);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section id="hero" ref={rootRef} className={ROOT_CLASSNAME}>
      <StarsBackground />
      <HeroArtwork />
      <HeroIndexDisplay selectedIndex={selectedIndex} />
      <HeroTopHud onDispatchQuest={scrollToContact} />
      <HeroMenu
        selectedIndex={selectedIndex}
        effectsReady={effectsReady}
        onMenuClick={handleMenuClick}
        onMenuHover={handleMenuSelect}
      />
      <HeroBottomHud onDispatchQuest={scrollToContact} />
      <QuickScrollButton onClick={scrollToNextSection} />

      <style jsx global>{`
        /* Mencegah layer promotion terkunci pada elemen beranimasi, agar fase commit
           rendering tidak tertahan lebih lama dari yang diperlukan. */
        .animate-fly-in-name,
        .animate-fly-in-degree,
        .animate-fly-in-capabilities,
        .grunge-jitter-a,
        .grunge-jitter-b,
        .grunge-jitter-c {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        /* Kelas "fx-paused" ditambahkan oleh hook useViewportPresence ketika elemen
           terkait berada di luar viewport, agar animasi berhenti dan layer GPU
           yang dipakainya bisa dilepas untuk menghemat memori. */
        .fx-paused .grunge-jitter-a,
        .fx-paused .grunge-jitter-b,
        .fx-paused .grunge-jitter-c {
          animation-play-state: paused;
          will-change: auto !important;
        }

        /* Melepaskan layer GPU setelah animasi fly-in selesai berjalan. */
        .animate-fly-in-name,
        .animate-fly-in-degree,
        .animate-fly-in-capabilities {
          will-change: auto;
          animation-fill-mode: forwards;
        }

        /* Keyframe jitter yang hanya memakai transform 3D (translate3d/scaleY), sehingga
           animasi berjalan sepenuhnya di compositor thread dan dipercepat GPU. */
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

        /* Efek "napas" halus pada HeroArtwork: sedikit membesar dan berputar
           lalu kembali ke ukuran semula, berulang setiap 12 detik. */
        @keyframes hero-breathe {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }

        .hero-breathe { animation: hero-breathe 12s ease-in-out infinite; }
        .grunge-jitter-a { animation: grunge-jitter-a 1.8s steps(4, jump-end) infinite; }
        .grunge-jitter-b { animation: grunge-jitter-b 1.4s steps(3, jump-end) infinite; }
        .grunge-jitter-c { animation: grunge-jitter-c 1.1s steps(3, jump-end) infinite; }

        /* Animasi masuk (entrance) berbentuk "kotak yang dilempar" untuk elemen identitas
           di ProfileSection: melayang masuk dari sudut dengan rotasi 3D lalu mendarat pada posisi akhir. */
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

        /* Memperlambat durasi animasi jitter di layar kecil untuk menghemat baterai dan beban GPU. */
        @media (max-width: 640px) {
          .grunge-jitter-a,
          .grunge-jitter-b,
          .grunge-jitter-c {
            animation-duration: 3s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fly-in-name,
          .animate-fly-in-degree,
          .animate-fly-in-capabilities,
          .grunge-jitter-a,
          .grunge-jitter-b,
          .grunge-jitter-c {
            animation: none !important;
            will-change: auto;
          }
        }
      `}</style>
    </section>
  );
}