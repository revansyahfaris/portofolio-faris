// File: src/components/ui/experience/PortraitTrack.tsx

import { memo } from 'react';
import { rectStyle } from './canvas';
import type { CanvasRect } from './canvas';

/** 📍 Lingkaran Pemotong (Ukurannya persis sama dengan CUTTER di FieldEllipse) */
const CUTTER: CanvasRect = {
  w: 3029,
  h: 1558,
  x: 1770,
  y: -340,
};

const ROTATION_ANGLE = -25;

interface PortraitTrackProps {
  /** URL foto karakter/diri */
  readonly imageSrc?: string;
  readonly scale?: number;
  /**
   * Geser foto mendatar di dalam bingkainya, dalam VH.
   *
   * Dulu piksel, dan itu cacat: cutout-nya berukuran vh sehingga ikut menyusut
   * saat layar mengecil, sementara geseran piksel tetap sebesar itu juga. Foto
   * karena itu merayap keluar dari lubangnya begitu jendela diperkecil.
   *
   * Nilainya dikonversi pada 1vh = 9px (tinggi viewport acuan 900px), jadi -50
   * di sini menghasilkan piksel yang sama persis dengan -450px sebelumnya.
   */
  readonly offsetX?: number;
  /** Geser foto tegak, dalam vh. Aturan yang sama. */
  readonly offsetY?: number;
}

export const PortraitTrack = memo(function PortraitTrack({
  imageSrc,
  scale = 0.95,
  offsetX = -50,
  offsetY = 22.222,
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
            transform: `rotate(${-ROTATION_ANGLE}deg) translate(${offsetX}vh, ${offsetY}vh) scale(${scale})`,
            transformOrigin: 'center',
          }}
        />
      ) : null}
    </div>
  );
});