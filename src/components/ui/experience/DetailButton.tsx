// File: src/components/ui/experience/DetailButton.tsx

'use client';

import { memo } from 'react';
import { rectStyle, uy } from './canvas';
import type { CanvasRect } from './canvas';
import { XP } from './palette';
import { toOrigin, toTransform } from './transform';
import type { ShapeTransform } from './transform';

interface DetailButtonProps {
  /** Nama entri yang dibuka, untuk label pembaca layar. */
  readonly label: string;
  readonly onOpen: () => void;
}

/**
 * ================== PENYETEL TOMBOL DETAIL ==================
 */
const TAG: CanvasRect = {
  w: 410,
  h: 110,
  x: 1570,
  y: 1160,
};

const TAG_SHAPE: ShapeTransform = {
  rotate: -40,
  skewX: -10,
  skewY: 0,
  scaleX: 1,
  scaleY: 1,
  origin: 'center',
};

/** Bentuk pita kuning (dalam persen terhadap TAG) */
const TAG_POINTS = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 100 },
  { x: 0, y: 100 },
];

/** 📍 Geseran underlayer KHUSUS PITA KUNING (dalam persen) */
const PITA_UNDERLAYER_OFFSET = { x: -10, y: 0 };

/** Segitiga penanda (dalam persen terhadap TAG) */
const MARK = { left: 8, top: -10, width: 24, height: 102 };

/** 📍 Mirror Segitiga Mendatar (true = Hadap Kiri, false = Hadap Kanan) */
const MARK_FLIP_X = false;

/** 📍 Geseran underlayer KHUSUS SEGITIGA (dalam persen) */
const MARK_UNDERLAYER_OFFSET = { x: -15, y: 15 }; // 👈 Sekarang angka geseran ini akan langsung bekerja!

/** 📍 PENYETEL TEKS DETAIL (Terpisah dari area pita) */
/**
 * Geser teks "Detail" di dalam tombolnya, dalam VH.
 *
 * Dulu piksel. Pitanya berukuran vh sehingga ikut menyusut saat layar mengecil,
 * sementara geseran piksel tidak — teksnya merayap keluar dari pitanya.
 *
 * Dikonversi pada 1vh = 9px, jadi 8.889 di sini sama persis dengan 80px pada
 * viewport acuan.
 */
const LABEL_POS = {
  x: 8.889,
  y: 0.556,
};

/** Ukuran huruf "Detail", dalam vh. */
const LABEL_SIZE = 5;

/** 📍 Rapat/Renggang antar huruf pada teks "Detail" */
const LABEL_LETTER_SPACING = '-0.1em';

export const DetailButton = memo(function DetailButton({
  label,
  onOpen,
}: DetailButtonProps) {
  const clipPath = `polygon(${TAG_POINTS.map((p) => `${p.x}% ${p.y}%`).join(', ')})`;

  // 📍 FIX: Rangkai string transform dengan rapi tanpa kata 'none'
  const scaleStr = MARK_FLIP_X ? 'scaleX(-1)' : '';

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Lihat rincian ${label}`}
      className="absolute cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.04]"
      style={{
        ...rectStyle(TAG),
        transform: toTransform(TAG_SHAPE),
        transformOrigin: toOrigin(TAG_SHAPE),
      }}
    >
      {/* 1. LAYER PITA KUNING */}
      <span
        aria-hidden
        className="absolute inset-0 block"
        style={{
          backgroundColor: XP.yellowDeep,
          clipPath,
          transform: `translate(${PITA_UNDERLAYER_OFFSET.x}%, ${PITA_UNDERLAYER_OFFSET.y}%)`,
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0 block"
        style={{ backgroundColor: XP.yellow, clipPath }}
      />

      {/* 2. LAYER SEGITIGA */}
      {/* Underlayer Segitiga Hitam */}
      <span
        aria-hidden
        className="absolute block"
        style={{
          left: `${MARK.left}%`,
          top: `${MARK.top}%`,
          width: `${MARK.width}%`,
          height: `${MARK.height}%`,
          backgroundColor: XP.ink,
          clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
          // 📍 Rangkai translate dan scale tanpa syntax error
          transform: `translate(${MARK_UNDERLAYER_OFFSET.x}%, ${MARK_UNDERLAYER_OFFSET.y}%) ${scaleStr}`.trim(),
          transformOrigin: 'center',
        }}
      />
      {/* Segitiga Merah Utama */}
      <span
        aria-hidden
        className="absolute block"
        style={{
          left: `${MARK.left}%`,
          top: `${MARK.top}%`,
          width: `${MARK.width}%`,
          height: `${MARK.height}%`,
          backgroundColor: XP.red,
          clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
          transform: scaleStr || undefined,
          transformOrigin: 'center',
        }}
      />

      {/* 3. TEKS "DETAIL" */}
      <span
        aria-hidden
        className="absolute font-serif leading-none"
        style={{
          left: uy(LABEL_POS.x),
          top: uy(LABEL_POS.y),
          fontSize: uy(LABEL_SIZE),
          color: XP.ink,
          letterSpacing: LABEL_LETTER_SPACING,
          scale: 1.1,
        }}
      >
        Detail
      </span>
    </button>
  );
});