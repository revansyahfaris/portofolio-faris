// File: src/components/ui/experience/EntrySlide.tsx

import { memo } from 'react';
import type { ReactNode } from 'react';
import { OVAL_CONFIG } from './ArcMotionDebug';
import { toX, toY } from './canvas';
import { PIVOT, SLIDE, SWEEP_DEGREES, SWEEP_SCALE } from './motion';
import type { SwapPhase } from './useArcSwap';

interface EntrySlideProps {
  readonly phase: SwapPhase;
  readonly direction: number;
  readonly children: ReactNode;
}

/** 📍 Durasi opacity memudar saat keluar (dalam ms). Makin kecil = makin cepat hilang. */
const FADE_OUT_DURATION = 180; 

export const EntrySlide = memo(function EntrySlide({
  phase,
  direction,
  children,
}: EntrySlideProps) {
  const sweep =
    phase === 'leaving' ? -direction : phase === 'arriving' ? direction : 0;

  const scale =
    sweep === 0
      ? 1
      : phase === 'leaving'
      ? SWEEP_SCALE
      : phase === 'arriving'
      ? SWEEP_SCALE
      : 1;

  const step = phase === 'leaving' ? SLIDE.exit : SLIDE.enter;

  const rotDeg = sweep * SWEEP_DEGREES;
  
  const shiftX = sweep * (SWEEP_DEGREES * OVAL_CONFIG.ratioX * 4);
  const shiftY = sweep !== 0 ? OVAL_CONFIG.offsetY * 0.05 : 0;

  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `translate(${toX(shiftX)}, ${toY(shiftY)}) rotate(${rotDeg}deg) scale(${scale})`,
        transformOrigin: `${toX(PIVOT.x)} ${toY(PIVOT.y)}`,
        opacity: phase === 'leaving' ? 0 : 1,

        // 📍 SEPARASI TRANSISI:
        // - opacity pakai FADE_OUT_DURATION (180ms) saat leaving
        // - transform tetap pakai step.duration (misal 700ms) agar gerakan ayunan tetap utuh
        transition:
          phase === 'arriving'
            ? 'none'
            : phase === 'leaving'
            ? `transform ${step.duration}ms ${step.ease}, opacity ${FADE_OUT_DURATION}ms ease-out`
            : `transform ${step.duration}ms ${step.ease}, opacity ${step.duration}ms ${step.ease}`,
      }}
    >
      {children}
    </div>
  );
});