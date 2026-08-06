// File: src/components/ui/experience/useArcSwap.ts

'use client';

import { useEffect, useRef, useState } from 'react';

/** Tahap perpindahan yang sedang berjalan. */
export type SwapPhase = 'idle' | 'leaving' | 'arriving';

export function useArcSwap<T>(value: T, exitDuration: number) {
  const [shown, setShown] = useState(value);
  const [phase, setPhase] = useState<SwapPhase>('idle');
  
  // Lacak nilai value terakhir yang sedang diproses
  const targetValue = useRef(value);

  useEffect(() => {
    if (value === targetValue.current && phase === 'idle') return;

    targetValue.current = value;
    setPhase('leaving');

    // 1. Fase LEAVING -> ARRIVING
    const exitTimer = window.setTimeout(() => {
      setShown(value);
      setPhase('arriving');

      // 2. Fase ARRIVING -> IDLE (Beri delay singkat 50ms agar browser sempat menggambar frame baru)
      const enterTimer = window.setTimeout(() => {
        setPhase('idle');
      }, 50);

      return () => window.clearTimeout(enterTimer);
    }, exitDuration);

    return () => {
      window.clearTimeout(exitTimer);
    };
  }, [value, exitDuration]);

  return { shown, phase };
}