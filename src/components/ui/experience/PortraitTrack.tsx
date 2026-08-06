// File: src/components/ui/experience/PortraitTrack.tsx

import { memo } from 'react';
import { rectStyle, uy } from './canvas';
import type { CanvasRect } from './canvas';

/** 📍 Lingkaran Pemotong (Cutout) */
const CUTTER: CanvasRect = {
  w: 3029,
  h: 1558,
  x: 1820,
  y: -340,
};

const ROTATION_ANGLE = -25;

interface PortraitTrackProps {
  readonly imageSrc?: string;
  readonly scale?: number;
  readonly offsetX?: number;
  readonly offsetY?: number;

  // 📍 TAMBAHAN UNTUK PENYETELAN WINDOWED FOTO:
  /** Geser foto mendatar saat layar melebar (Windowed) */
  readonly driftX?: number;
  /** Geser foto tegak saat layar melebar (Windowed) */
  readonly driftY?: number;
  /** Pembesaran/pengecilan skala foto saat layar melebar (Windowed) */
  readonly scaleDrift?: number;
}

export const PortraitTrack = memo(function PortraitTrack({
  imageSrc,
  scale = 0.95,
  offsetX = -50,
  offsetY = 22.222,
  // 📍 Atur nilai bawaan windowed di sini:
  driftX = 0,       // Positif = geser kanan, Negatif = geser kiri
  driftY = 0,       // Positif = geser bawah, Negatif = geser atas
  scaleDrift = 0,   // Positif = membesar, Negatif = mengecil
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
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Portrait"
          className="h-full w-full object-contain object-center"
          style={{
            // 📍 Masukkan driftX, driftY, dan scaleDrift ke dalam fungsi uy()
            transform: `rotate(${-ROTATION_ANGLE}deg) translate(${uy(offsetX, driftX)}, ${uy(offsetY, driftY)}) scale(${scale + scaleDrift})`,
            transformOrigin: 'center',
          }}
        />
      ) : null}
    </div>
  );
});