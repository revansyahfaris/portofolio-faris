// File: src/components/ui/experience/PortraitTrack.tsx

import { memo } from 'react';
import { rectStyle } from './canvas';
import type { CanvasRect } from './canvas';

/** 📍 Lingkaran Pemotong (Ukurannya persis sama dengan CUTTER di FieldEllipse) */
const CUTTER: CanvasRect = {
  w: 3029,
  h: 1558,
  x: 1780,
  y: -354,
};

const ROTATION_ANGLE = -25;

interface PortraitTrackProps {
  /** URL foto karakter/diri */
  readonly imageSrc?: string;
  readonly scale?: number;
  /** 📍 Geser foto mendatar di dalam frame (px/%) */
  readonly offsetX?: number;
  /** 📍 Geser foto tegak di dalam frame (px/%) */
  readonly offsetY?: number;
}

export const PortraitTrack = memo(function PortraitTrack({
  imageSrc,
  scale = 0.95,
  offsetX = -450,
  offsetY = 200,
}: PortraitTrackProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute overflow-hidden"
      style={{
        ...rectStyle(CUTTER),
        borderRadius: '50%',
        transform: `rotate(${ROTATION_ANGLE}deg)`,
        transformOrigin: 'center',
      }}
    >
      {/* Jika ada foto, tampilkan di dalam lingkaran cutout ini */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Portrait"
          className="h-full w-full object-contain object-center"
          style={{
            // 📍 FIX: Masukkan offsetX, offsetY, dan scale variabel di sini!
            transform: `rotate(${-ROTATION_ANGLE}deg) translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
            transformOrigin: 'center',
          }}
        />
      ) : null}
    </div>
  );
});