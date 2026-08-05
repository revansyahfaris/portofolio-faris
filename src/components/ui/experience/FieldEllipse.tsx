// File: src/components/ui/experience/FieldEllipse.tsx

import { memo } from 'react';
import { CANVAS, rectStyle, toVh } from './canvas';
import type { CanvasRect } from './canvas';
import { FIELD } from './palette';

/** Bidang tosca utama */
const ELLIPSE: CanvasRect = {
  w: 3664.01,
  h: 2087,
  x: 628,
  y: -494,
};

/** 📍 Lingkaran Pemotong (Cutout) tempat foto ditaruh */
const CUTTER: CanvasRect = {
  w: 3029,
  h: 1558,
  x: 1780,
  y: -354,
};

export const FieldEllipse = memo(function FieldEllipse() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* 📍 MASKING CUTOUT:
              Putih = Area Tosca Tetap Tampil
              Hitam = Area Diberi Lubang Transparan (Cutout) */}
          <mask id="ellipse-cutout-mask">
            {/* Tutup seluruh kanvas dengan warna putih */}
            <rect width={CANVAS.width} height={CANVAS.height} fill="white" />

            {/* Gambar lingkaran hitam untuk MELUBANGI bidang tosca */}
            <ellipse
              cx={CUTTER.x + CUTTER.w / 2}
              cy={CUTTER.y + CUTTER.h / 2}
              rx={CUTTER.w / 2}
              ry={CUTTER.h / 2}
              fill="black"
              transform={`rotate(-25, ${CUTTER.x + CUTTER.w / 2}, ${CUTTER.y + CUTTER.h / 2})`}
            />
          </mask>
        </defs>

        {/* Bidang Lonjong Tosca yang sudah dilubangi */}
        <ellipse
          cx={ELLIPSE.x + ELLIPSE.w / 2}
          cy={ELLIPSE.y + ELLIPSE.h / 2}
          rx={ELLIPSE.w / 2}
          ry={ELLIPSE.h / 2}
          fill={FIELD.ellipse}
          mask="url(#ellipse-cutout-mask)"
        />
      </svg>
    </div>
  );
});