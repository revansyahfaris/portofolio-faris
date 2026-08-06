// File: src/components/ui/experience/ArcMotionDebug.tsx

'use client';

import { memo } from 'react';
import { CANVAS, toX, toY } from './canvas';
import { DEBUG_ARC_MOTION, PIVOT, SWEEP_DEGREES } from './motion';

export const OVAL_CONFIG = {
  ratioX: 1.35,
  offsetX: 0,
  offsetY: 0,
};

export const ArcMotionDebug = memo(function ArcMotionDebug() {
  if (!DEBUG_ARC_MOTION) return null;

  const centerCanvas = { x: CANVAS.width / 2, y: CANVAS.height / 2 };

  const dx = centerCanvas.x - PIVOT.x;
  const dy = centerCanvas.y - PIVOT.y;
  const radiusY = Math.sqrt(dx * dx + dy * dy);
  const radiusX = radiusY * OVAL_CONFIG.ratioX;

  const ellipseCx = PIVOT.x + OVAL_CONFIG.offsetX;
  const ellipseCy = PIVOT.y + OVAL_CONFIG.offsetY;

  // 📍 Hitung sudut awal ke pusat kanvas (dalam derajat)
  const baseAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

  // 📍 Hitung titik batas ayunan Kiri (-SWEEP_DEGREES) dan Kanan (+SWEEP_DEGREES)
  const angleLeft = ((baseAngleDeg - SWEEP_DEGREES) * Math.PI) / 180;
  const angleRight = ((baseAngleDeg + SWEEP_DEGREES) * Math.PI) / 180;

  const sweepLeftX = ellipseCx + radiusX * Math.cos(angleLeft);
  const sweepLeftY = ellipseCy + radiusY * Math.sin(angleLeft);

  const sweepRightX = ellipseCx + radiusX * Math.cos(angleRight);
  const sweepRightY = ellipseCy + radiusY * Math.sin(angleRight);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-50 overflow-visible"
    >
      <svg className="h-full w-full overflow-visible">
        {/* Lintasan Oval Penuh (Tipis) */}
        <ellipse
          cx={toX(ellipseCx)}
          cy={toY(ellipseCy)}
          rx={toX(radiusX)}
          ry={toY(radiusY)}
          fill="none"
          stroke="#00ffff"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.3"
        />

        {/* 📍 GARIS BATAS AYUNAN (Dipengaruhi SWEEP_DEGREES) */}
        {/* Garis Batas Kiri / Exit */}
        <line
          x1={toX(PIVOT.x)}
          y1={toY(PIVOT.y)}
          x2={toX(sweepLeftX)}
          y2={toY(sweepLeftY)}
          stroke="#ff0055"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        {/* Garis Batas Kanan / Enter */}
        <line
          x1={toX(PIVOT.x)}
          y1={toY(PIVOT.y)}
          x2={toX(sweepRightX)}
          y2={toY(sweepRightY)}
          stroke="#00ff88"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* 📍 TITIK UJUNG AYUNAN */}
        <circle cx={toX(sweepLeftX)} cy={toY(sweepLeftY)} r="5" fill="#ff0055" />
        <circle cx={toX(sweepRightX)} cy={toY(sweepRightY)} r="5" fill="#00ff88" />
      </svg>

      {/* Titik Paku Poros (Pivot Point) */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: toX(PIVOT.x),
          top: toY(PIVOT.y),
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="absolute h-6 w-6 animate-ping rounded-full border-2 border-red-500 bg-red-500/30" />
        <div className="z-10 h-4 w-4 rounded-full border-2 border-white bg-red-600 shadow-md" />

        <span className="absolute left-6 top-0 whitespace-nowrap rounded bg-black/80 px-2 py-1 font-mono text-[10px] text-white backdrop-blur">
          PIVOT ({PIVOT.x}, {PIVOT.y}) | Sweep Range: ±{SWEEP_DEGREES}°
        </span>
      </div>
    </div>
  );
});