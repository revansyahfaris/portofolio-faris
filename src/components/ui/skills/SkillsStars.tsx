// File: src/components/ui/skills/SkillsStars.tsx

import { memo } from 'react';
import type { CSSProperties } from 'react';
import { SKILLS } from './palette';

interface SkillsStarsProps {
  readonly state: 'closed' | 'open';
}

interface StarPlacement {
  readonly top?: string;
  readonly right?: string;
  readonly bottom?: string;
  readonly left?: string;
  readonly size: number;
  readonly rotate: number;
  readonly blend: CSSProperties['mixBlendMode'];
  readonly invert?: boolean;
  readonly opacity?: number;
  readonly baseOffsetX?: number;
  readonly baseOffsetY?: number;
}

const CLOSED_STARS: readonly StarPlacement[] = [
  // Bintang kiri tengah
  { top: '18vh', left: '-9vw', size: 36, rotate: 28, blend: 'normal', baseOffsetX: -8, baseOffsetY: 2 },

  // Grup bintang atas
  { top: '0vh', left: '20vw', size: 22, rotate: 21, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6 },
  { top: '-6vh', left: '25vw', size: 28, rotate: -28, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6 },

  { top: '-24vh', left: '12vw', size: 42, rotate: 0, blend: 'difference' },
  { top: '-24vh', left: '12vw', size: 42, rotate: 0, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6 },
  
  { top: '0vh', left: '20vw', size: 22, rotate: 21, blend: 'difference' },
  { top: '0vh', left: '20vw', size: 22, rotate: 21, blend: 'multiply', invert: true, },
  

  { top: '-6vh', left: '25vw', size: 28, rotate: -28, blend: 'difference' },
  { top: '-6vh', left: '25vw', size: 28, rotate: -28, blend: 'multiply', invert: true, },

  // Grup bintang kiri bawah
  { bottom: '-10vh', left: '3vw', size: 22, rotate: 8, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6 },
  { bottom: '-6vh', left: '8vw', size: 28, rotate: 28, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6 },

  { bottom: '-8vh', left: '-7vw', size: 42, rotate: -18, blend: 'difference' },
  { bottom: '-8vh', left: '-7vw', size: 42, rotate: -18, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6 },
  
  { bottom: '-10vh', left: '3vw', size: 22, rotate: 8, blend: 'difference' },
  { bottom: '-10vh', left: '3vw', size: 22, rotate: 8, blend: 'multiply', invert: true, },

  { bottom: '-6vh', left: '8vw', size: 28, rotate: 28, blend: 'difference' },
  { bottom: '-6vh', left: '8vw', size: 28, rotate: 28, blend: 'multiply', invert: true, },

  // Grup bintang kanan bawah
  { bottom: '8vh', right: '10vw', size: 38, rotate: 24, blend: 'multiply', invert: true, baseOffsetX: -8, baseOffsetY: 1 },

  { bottom: '-32vh', right: '-24vw', size: 90, rotate: 115, blend: 'difference', baseOffsetX: 0, baseOffsetY: 7 },
  { bottom: '-32vh', right: '-24vw', size: 90, rotate: 115, blend: 'multiply', invert: true, baseOffsetX: 0, baseOffsetY: 7 },

  { bottom: '8vh', right: '10vw', size: 38, rotate: 24, blend: 'difference', baseOffsetX: -8, baseOffsetY: 1 },
  { bottom: '8vh', right: '10vw', size: 38, rotate: 24, blend: 'multiply', invert: true, },
];

const OPEN_STARS: readonly StarPlacement[] = [
  { bottom: '-32vh', right: '-24vw', size: 90, rotate: 115, blend: 'difference', baseOffsetX: 0, baseOffsetY: 7 },
  { bottom: '-32vh', right: '-24vw', size: 90, rotate: 115, blend: 'multiply', invert: true, baseOffsetX: 0, baseOffsetY: 7 },

  { bottom: '8vh', right: '10vw', size: 38, rotate: 24, blend: 'difference', baseOffsetX: -8, baseOffsetY: 1 },
  { bottom: '8vh', right: '10vw', size: 38, rotate: 24, blend: 'multiply', invert: true, baseOffsetX: -8, baseOffsetY: 1 },
];

/** Point bintang kustom milikmu */
const STAR_POINTS = '50,2 64,33 100,35 72,60.6 80.9,97 50,77 19.1,97 27.3,60.6 0,35 35,33';

/** Definisi cincin bintang */
const BASE_RING = { scale: 0.8, color: SKILLS.starBack };
const INNER_RINGS = [
  { scale: 0.8, color: SKILLS.starA },
  { scale: 0.65, color: SKILLS.starB },
  { scale: 0.5, color: SKILLS.starA },
  { scale: 0.35, color: SKILLS.starB },
  { scale: 0.2, color: SKILLS.starA },
];

export const SkillsStars = memo(function SkillsStars({ state }: SkillsStarsProps) {
  const stars = state === 'closed' ? CLOSED_STARS : OPEN_STARS;

  // 📍 FIX: Pisahkan daftar bintang tanpa ada yang tumpang tindih
  const standaloneStars = stars.filter((s) => s.blend === 'luminosity' || s.blend === 'normal');
  const differenceStars = stars.filter((s) => s.blend === 'difference');
  const multiplyInvertStars = stars.filter((s) => s.blend === 'multiply' && s.invert);

  /** Helper untuk merender 1 bintang lengkap (Base + 5 Cincin Dalam) */
  const renderSingleStar = (star: StarPlacement, index: number) => {
    const baseX = star.baseOffsetX ?? 0;
    const baseY = star.baseOffsetY ?? 0;

    return (
      <div
        key={index}
        className="absolute"
        style={{
          top: star.top,
          right: star.right,
          bottom: star.bottom,
          left: star.left,
          width: `${star.size}vh`,
          height: `${star.size}vh`,
          opacity: star.opacity,
          mixBlendMode: star.blend === 'luminosity' || star.blend === 'normal' ? star.blend : undefined,
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: `rotate(${star.rotate}deg)` }}>
          {/* 1. Layer Alas Kuning */}
          <g className="star-base" transform={`translate(${baseX} ${baseY})`}>
            <polygon
              points={STAR_POINTS}
              fill={BASE_RING.color}
              transform={`translate(50 50) scale(${BASE_RING.scale}) translate(-50 -50)`}
            />
          </g>
          {/* 2. Layer 5 Cincin Dalam */}
          <g className="star-rings">
            {INNER_RINGS.map((ring) => (
              <polygon
                key={ring.scale}
                points={STAR_POINTS}
                fill={ring.color}
                transform={`translate(50 50) scale(${ring.scale}) translate(-50 -50)`}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 📍 CANVAS 1: Bintang Mandiri (LUMINOSITY / NORMAL) */}
      {standaloneStars.length > 0 && (
        <div className="absolute inset-0" style={{ isolation: 'isolate', mixBlendMode: 'luminosity' }}>
          {standaloneStars.map((star, idx) => renderSingleStar(star, idx))}
        </div>
      )}

      {/* 📍 CANVAS 2: GRUP BINTANG SUBTRAKSI A (Blend: DIFFERENCE) */}
      {differenceStars.length > 0 && (
        <div className="absolute inset-0" style={{ isolation: 'isolate', mixBlendMode: 'difference' }}>
          {differenceStars.map((star, idx) => renderSingleStar(star, idx))}
        </div>
      )}

      {/* 📍 CANVAS 3: GRUP BINTANG SUBTRAKSI B (Blend: MULTIPLY + INVERT) */}
      {multiplyInvertStars.length > 0 && (
        <div className="absolute inset-0" style={{ isolation: 'isolate', mixBlendMode: 'multiply', filter: 'invert(1)' }}>
          {multiplyInvertStars.map((star, idx) => renderSingleStar(star, idx))}
        </div>
      )}
    </div>
  );
});