// File: src/components/ui/skills/SkillsFurniture.tsx

import { memo } from 'react';
import { SKILLS } from './palette';
import { rigid } from './units';

interface SkillsFurnitureProps {
  /** 
   * 📍 Nomor urut section di landing page (misal: 3 untuk "03").
   * BUKAN nomor indeks kategori skills yang sedang aktif!
   */
  readonly sectionNumber?: number;
  /** Keadaan section. */
  readonly state: 'closed' | 'open';
}

/** Penempatan angka besar di sudut kanan atas. */
const NUMBER_PLACEMENT = {
  top: '-6vh',
  right: '-3vw',
  size: 30,
};

/** Penempatan wordmark "Skills" di sudut kanan bawah. */
const WORDMARK_PLACEMENT = {
  closed: { bottom: '-4vh', right: '-1vw', size: 24 },
  open: { bottom: '-4vh', right: '-1vw', size: 24 },
} as const;

export const SkillsFurniture = memo(function SkillsFurniture({
  sectionNumber = 3, // 👈 Default ke 03 (atau sesuaikan nomor urut section ini di websitemu)
  state,
}: SkillsFurnitureProps) {
  const wordmark = WORDMARK_PLACEMENT[state];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 📍 Nomor Section Halaman (Statis 03, tidak ikut berubah saat ganti skill) */}
      <span
        className="absolute font-serif font-bold leading-none tabular-nums"
        style={{
          top: NUMBER_PLACEMENT.top,
          right: rigid(NUMBER_PLACEMENT.right),
          fontSize: `${NUMBER_PLACEMENT.size}vh`,
          color: SKILLS.teal,
          transform: 'rotate(45deg)',
          transformOrigin: '50% 70%',
        }}
      >
        {String(sectionNumber).padStart(2, '0')}
      </span>

      {/* Wordmark "Skills" */}
      <span
        className="absolute font-serif font-bold leading-none mix-blend-exclusion z-40"
        style={{
          bottom: wordmark.bottom,
          right: rigid(wordmark.right),
          fontSize: `${wordmark.size}vh`,
          color: SKILLS.redBright,
        }}
      >
        Skills
      </span>
    </div>
  );
});