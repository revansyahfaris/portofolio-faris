// File: src/components/ui/experience/EntryDetails.tsx

import { memo } from 'react';
import type { ReactNode } from 'react';
import { CANVAS, toVh } from './canvas';
import { XP } from './palette';

interface EntryDetailsProps {
  readonly company: string;
  readonly project: string;
  readonly period: string;
}

interface TextPlacement {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly size: number;
  readonly rotate: number;
  readonly lineHeight?: number;
  readonly letterSpacing?: string;
}

const PLACEMENT: Record<'company' | 'project' | 'period', TextPlacement> = {
  company: {
    x: 450,
    y: 540,
    w: 1500,
    size: 5.6,
    rotate: -2,
    lineHeight: 0.9,
    letterSpacing: '-0.03em',
  },
  project: {
    x: 900,
    y: 650,
    w: 1000,
    size: 8.5,
    rotate: -10,
    lineHeight: 0.8,
    letterSpacing: '-0.1em',
  },
  period: {
    x: 1050,
    y: 865,
    w: 800,
    size: 5.6,
    rotate: -25,
    lineHeight: 0.9,
    letterSpacing: '-0.09em',
  },
};

/** Satu baris teks yang ditempatkan pada koordinat kanvas. */
const PlacedText = memo(function PlacedText({
  at,
  children,
}: {
  readonly at: TextPlacement;
  readonly children: ReactNode;
}) {
  // 📍 Hitung titik batas kanan mutlak pada kanvas Photoshop: (x + w)
  const rightBoundaryPx = at.x + at.w;

  // 📍 Konversi jarak dari tepi kanan kanvas ke vh: (CANVAS.width - rightBoundaryPx)
  const rightInVh = toVh(CANVAS.width - rightBoundaryPx);

  return (
    <p
      className="pointer-events-none absolute font-serif leading-tight text-left" // 📍 Teks di dalam tetap RATA KIRI
      style={{
        // 📍 KUNCI SISI KANAN MUTLAK:
        // Menggunakan `right` alih-alih `left` memastikan batas kanan terkunci mati di titik (x + w)
        right: rightInVh,
        top: toVh(at.y),
        maxWidth: toVh(at.w), // 📍 Gunakan maxWidth agar lebar kotak menyesuaikan teks ke arah kiri
        fontSize: `${at.size}vh`,
        color: XP.white,
        transform: `rotate(${at.rotate}deg)`,
        // 📍 Poros di KANAN ATAS agar saat diputar batas kanannya tidak bergeser
        transformOrigin: '100% 0',
        lineHeight: at.lineHeight ?? 0.9,
        letterSpacing: at.letterSpacing ?? '-0.03em',
      }}
    >
      {children}
    </p>
  );
});

export const EntryDetails = memo(function EntryDetails({
  company,
  project,
  period,
}: EntryDetailsProps) {
  return (
    <>
      <PlacedText at={PLACEMENT.company}>{company}</PlacedText>
      <PlacedText at={PLACEMENT.project}>{project}</PlacedText>
      <PlacedText at={PLACEMENT.period}>
        <time>{period}</time>
      </PlacedText>
    </>
  );
});