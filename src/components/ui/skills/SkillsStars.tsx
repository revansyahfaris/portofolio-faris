// File: src/components/ui/skills/SkillsStars.tsx

import { memo } from 'react';
import type { CSSProperties } from 'react';
import { SKILLS } from './palette';
import { rigid, withDrift } from './units';

interface SkillsStarsProps {
  /**
   * Lapisan mana yang dirender.
   *
   * - "buried"     : bintang yang hanya milik keadaan tertutup. Dirender SEBELUM
   *                  OpenPanel, sehingga tertimbun saat bidang merah naik.
   * - "persistent" : bintang yang letaknya sama persis di kedua keadaan.
   *                  Dirender SESUDAH OpenPanel dan tidak pernah dianimasikan —
   *                  sebagaimana wordmark "Skills" yang juga diam di tempat.
   */
  readonly layer: 'buried' | 'persistent';
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
  /**
   * Simpangan mendatar yang hanya berlaku saat rasio layar menyimpang dari
   * acuan. Positif menggeser ke kanan saat jendela makin lebar-pendek.
   */
  readonly driftX?: number;
  /**
   * Simpangan tegak dengan aturan yang sama. Negatif menaikkan.
   */
  readonly driftY?: number;
}

/**
 * Dua penyetel khusus mode windowed.
 *
 * Keduanya bernilai nol pada rasio acuan, jadi fullscreen tidak tersentuh. Satu
 * angka mengendalikan seluruh anggota kelompoknya — kelompok atas terdiri dari
 * tiga bintang yang masing-masing dirender berkali-kali untuk lapisan blend
 * berbeda, dan semuanya WAJIB bergeser bersamaan. Menuliskan angkanya satu per
 * satu di tiap entri berarti cepat atau lambat ada satu yang tertinggal dan
 * bintangnya terbelah.
 */
const LEFT_STAR_RISE = -0.3;
const TOP_GROUP_SHIFT = 0.95;

/**
 * Bintang yang hanya hidup di keadaan tertutup.
 *
 * Kelompok kanan bawah sengaja TIDAK ada di sini melainkan di PERSISTENT_STARS,
 * karena letaknya sama persis di kedua keadaan. Menganimasikan sesuatu yang
 * berpindah ke tempat yang sama hanya menghasilkan kedipan tanpa maksud.
 */
const BURIED_STARS: readonly StarPlacement[] = [
  // Bintang kiri tengah
  { top: '18vh', left: '-9vw', size: 36, rotate: 28, blend: 'normal', baseOffsetX: -8, baseOffsetY: 2, driftY: LEFT_STAR_RISE },

  // Grup bintang atas
  { top: '0vh', left: '20vw', size: 22, rotate: 21, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6, driftX: TOP_GROUP_SHIFT },
  { top: '-6vh', left: '25vw', size: 28, rotate: -28, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6, driftX: TOP_GROUP_SHIFT },

  { top: '-24vh', left: '12vw', size: 42, rotate: 0, blend: 'difference', driftX: TOP_GROUP_SHIFT },
  { top: '-24vh', left: '12vw', size: 42, rotate: 0, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6, driftX: TOP_GROUP_SHIFT },

  { top: '0vh', left: '20vw', size: 22, rotate: 21, blend: 'difference', driftX: TOP_GROUP_SHIFT },
  { top: '0vh', left: '20vw', size: 22, rotate: 21, blend: 'multiply', invert: true, driftX: TOP_GROUP_SHIFT },


  { top: '-6vh', left: '25vw', size: 28, rotate: -28, blend: 'difference', driftX: TOP_GROUP_SHIFT },
  { top: '-6vh', left: '25vw', size: 28, rotate: -28, blend: 'multiply', invert: true, driftX: TOP_GROUP_SHIFT },

  // Grup bintang kiri bawah
  { bottom: '-10vh', left: '3vw', size: 22, rotate: 8, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6 },
  { bottom: '-6vh', left: '8vw', size: 28, rotate: 28, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6 },

  { bottom: '-8vh', left: '-7vw', size: 42, rotate: -18, blend: 'difference' },
  { bottom: '-8vh', left: '-7vw', size: 42, rotate: -18, blend: 'multiply', invert: true, baseOffsetX: -5, baseOffsetY: -6 },
  
  { bottom: '-10vh', left: '3vw', size: 22, rotate: 8, blend: 'difference' },
  { bottom: '-10vh', left: '3vw', size: 22, rotate: 8, blend: 'multiply', invert: true, },

  { bottom: '-6vh', left: '8vw', size: 28, rotate: 28, blend: 'difference' },
  { bottom: '-6vh', left: '8vw', size: 28, rotate: 28, blend: 'multiply', invert: true, },
];

/**
 * Grup bintang kanan bawah — letaknya sama di keadaan tertutup maupun terbuka.
 *
 * Dirender satu kali saja di atas OpenPanel, tanpa transisi apa pun. Yang
 * berubah cukup APA YANG ADA DI BELAKANGNYA: saat tertutup bintang-bintang ini
 * membaur dengan kipas, saat terbuka dengan bidang merah. Pembauran itu terjadi
 * sendirinya karena mix-blend-mode selalu membaca lapisan di bawahnya, jadi
 * tidak ada satu pun animasi yang perlu ditulis untuk menghasilkannya.
 */
const PERSISTENT_STARS: readonly StarPlacement[] = [
  { bottom: '8vh', right: '10vw', size: 38, rotate: 24, blend: 'multiply', invert: true, baseOffsetX: -8, baseOffsetY: 1 },

  { bottom: '-32vh', right: '-24vw', size: 90, rotate: 115, blend: 'difference', baseOffsetX: 0, baseOffsetY: 7 },
  { bottom: '-32vh', right: '-24vw', size: 90, rotate: 115, blend: 'multiply', invert: true, baseOffsetX: 0, baseOffsetY: 7 },

  { bottom: '8vh', right: '10vw', size: 38, rotate: 24, blend: 'difference', baseOffsetX: -8, baseOffsetY: 1 },
  { bottom: '8vh', right: '10vw', size: 38, rotate: 24, blend: 'multiply', invert: true, },
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

export const SkillsStars = memo(function SkillsStars({ layer }: SkillsStarsProps) {
  const stars = layer === 'buried' ? BURIED_STARS : PERSISTENT_STARS;

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
          // top dan bottom dilewatkan apa adanya: keduanya sudah bersatuan vh
          // dan memang sudah sejalan. Hanya left dan right yang dialihkan, dan
          // itu pun hanya bila nilainya bersatuan vw.
          top: withDrift(star.top, star.driftY),
          right: withDrift(star.right, star.driftX && -star.driftX),
          bottom: withDrift(star.bottom, star.driftY && -star.driftY),
          left: withDrift(star.left, star.driftX),
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