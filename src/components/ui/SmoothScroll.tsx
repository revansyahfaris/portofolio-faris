'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
// 📍 CSS Lenis di-inline ke globals.css (lihat bagian "LENIS BASE STYLES")
// biar gak jadi request CSS terpisah yang render-blocking sendiri.

// Gunakan nama properti custom (__lenis) agar tidak bentrok dengan deklarasi bawaan paket Lenis
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoResize: true,
    });

    // Simpan instance ke window.__lenis
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined; // Gunakan assignment undefined alih-alih operator delete
    };
  }, []);

  return <>{children}</>;
}