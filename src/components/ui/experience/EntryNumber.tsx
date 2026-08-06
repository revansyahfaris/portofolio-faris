// File: src/components/ui/experience/EntryNumber.tsx

import { memo } from 'react';
import { toX, toY, uy } from './canvas';
import { XP } from './palette';

interface EntryNumberProps {
  readonly sectionNumber?: number;
}

/** Penempatan angka besar di sudut kanan bawah. */
const PLACEMENT = {
  x: 2150,
  y: 1325,
  /** Ukuran huruf dalam vh. */
  size: 28,
  rotate: -48,

  // 📍 PENYETEL KHUSUS WINDOWED:
  /** Geser angka mendatar saat windowed (positif = kanan, negatif = kiri) */
  driftX: 0.2,
  /** Geser angka tegak saat windowed (positif = bawah, negatif = atas) */
  driftY: 0,
  /** Penambahan piksel ukuran angka per piksel kelebihan layar */
  sizeDrift: 0,
};

export const EntryNumber = memo(function EntryNumber({
  sectionNumber = 4,
}: EntryNumberProps) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute block font-serif font-bold leading-none tabular-nums"
      style={{
        // 📍 Teruskan driftX, driftY, dan sizeDrift ke fungsi penataan
        left: toX(PLACEMENT.x, PLACEMENT.driftX),
        top: toY(PLACEMENT.y, PLACEMENT.driftY),
        fontSize: uy(PLACEMENT.size, PLACEMENT.sizeDrift),
        color: XP.numberTint,
        transform: `rotate(${PLACEMENT.rotate}deg)`,
        transformOrigin: '0 0',
        mixBlendMode: 'luminosity',
      }}
    >
      {String(sectionNumber).padStart(2, '0')}
    </span>
  );
});