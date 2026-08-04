import { memo } from 'react';
import type { CSSProperties } from 'react';
import { SKILLS } from './palette';

interface StarBurstProps {
  readonly className?: string;
  readonly style?: CSSProperties;
  /** 📍 Opsi untuk membalik warna bintang */
  readonly invert?: boolean;
  /**
   * 📍 Mode render layer:
   * - 'all'   : Render alas kuning + cincin sekaligus (default)
   * - 'base'  : Render HANYA alas kuning paling luar (scale 1.0)
   * - 'rings' : Render HANYA cincin-cincin dalam tanpa alas kuning
   */
  readonly pass?: 'all' | 'base' | 'rings';
}

/** Point bintang hasil kustomisasimu */
const STAR_POINTS = '50,2 64,33 100,35 72,60.6 80.9,97 50,77 19.1,97 27.3,60.6 0,35 35,33';

/** Cincin terluar (Alas Kuning) */
const BASE_RING = { scale: 0.8, color: SKILLS.starBack };

/** Cincin-cincin dalam (Hijau & Hitam) */
const INNER_RINGS = [
  { scale: 0.8, color: SKILLS.starA },
  { scale: 0.61, color: SKILLS.starB },
  { scale: 0.43, color: SKILLS.starA },
  { scale: 0.3, color: SKILLS.starB },
  { scale: 0.18, color: SKILLS.starA },
];

export const StarBurst = memo(function StarBurst({
  className = '',
  style,
  invert = false,
  pass = 'all',
}: StarBurstProps) {
  // Tentukan ring mana saja yang dirender berdasarkan pass
  const ringsToRender =
    pass === 'base'
      ? [BASE_RING]
      : pass === 'rings'
        ? INNER_RINGS
        : [BASE_RING, ...INNER_RINGS];

  return (
    <svg
      aria-hidden
      className={className}
      style={{
        ...style,
        filter: invert ? 'invert(1)' : undefined,
      }}
      viewBox="0 0 100 100"
    >
      {ringsToRender.map((ring) => (
        <polygon
          key={ring.scale}
          points={STAR_POINTS}
          fill={ring.color}
          transform={`translate(50 50) scale(${ring.scale}) translate(-50 -50)`}
        />
      ))}
    </svg>
  );
});