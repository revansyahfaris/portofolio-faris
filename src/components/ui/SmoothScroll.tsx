'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
// CSS bawaan Lenis sengaja diinline ke globals.css (lihat bagian "LENIS BASE STYLES")
// alih-alih diimpor terpisah di sini, agar tidak menjadi request CSS render-blocking sendiri.

// Nama properti window.__lenis dipakai (bukan nama default) agar tidak bentrok
// dengan deklarasi global lain milik package Lenis.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * SmoothScroll
 *
 * Membungkus seluruh halaman dan menginisialisasi instance Lenis untuk efek
 * smooth-scroll. Instance disimpan di window.__lenis supaya komponen lain
 * (HeroSection) dapat mengontrolnya langsung (stop/start/scrollTo) tanpa
 * perlu React context.
 *
 * Penting: komponen ini TIDAK boleh dimuat dengan ssr:false di halaman.
 * Karena children dirender di dalamnya, mem-nonaktifkan SSR pada komponen ini
 * akan membuat seluruh konten anak (termasuk gambar LCP di HeroSection) ikut
 * tidak ter-render di HTML awal dan baru muncul setelah JavaScript selesai
 * dimuat — pernah menyebabkan LCP meningkat dari ~2 detik menjadi ~8 detik.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoResize: true,
    });

    window.__lenis = lenis;

    // Lenis perlu dipanggil pada setiap animation frame agar posisi scroll ter-update.
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // Diset undefined (bukan operator delete) karena tipe properti opsional pada interface Window.
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}