'use client';

import { useCallback, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

interface MoveOptions {
  /**
   * Ikut memindahkan fokus papan ketik ke item tujuan.
   *
   * Dibutuhkan saat perpindahan dipicu tombol panah (pengguna papan ketik harus
   * tahu di mana posisinya sekarang), tetapi TIDAK boleh dipakai saat perpindahan
   * dipicu tombol navigasi terpisah — memindahkan fokus ke daftar akan merampas
   * fokus dari tombol yang baru saja ditekan, sehingga menekannya berulang kali
   * menjadi mustahil.
   */
  readonly focus?: boolean;
}

/**
 * Logika pemilih bergaya tab untuk section satu layar.
 *
 * Diekstrak menjadi hook karena delapan section memakai pola yang persis sama:
 * satu daftar pilihan, satu panel rincian, navigasi tombol panah, dan penomoran
 * halaman. Menyalin logikanya di tiap section berarti delapan tempat yang harus
 * diperbaiki setiap kali ada cacat perilaku papan ketik — dan cacat semacam itu
 * hampir tidak pernah terlihat sampai ada yang benar-benar mencoba menavigasinya
 * tanpa tetikus.
 *
 * Hook ini hanya mengurus perilaku, bukan tampilan. Setiap section tetap bebas
 * menentukan bentuk, warna, dan susunan visual pemilihnya sendiri.
 *
 * Kewajiban pemakainya:
 * - pasang railRef pada wadah yang ber-role="tablist"
 * - beri tiap tombol pilihan role="tab" dan tabIndex sesuai activeIndex
 * - pasang handleKeyDown pada wadah tablist
 */
export function useStageTabs(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);

  const moveTo = useCallback((nextIndex: number, options: MoveOptions = {}) => {
    setActiveIndex(nextIndex);
    if (!options.focus) return;
    railRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')[nextIndex]?.focus();
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? count - 1 : current - 1));
  }, [count]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current === count - 1 ? 0 : current + 1));
  }, [count]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const last = count - 1;
      let next: number;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          next = activeIndex === last ? 0 : activeIndex + 1;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          next = activeIndex === 0 ? last : activeIndex - 1;
          break;
        // Home dan End disertakan karena keduanya perilaku baku pola tab menurut
        // panduan WAI-ARIA, dan pengguna papan ketik berpengalaman akan mencobanya.
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = last;
          break;
        default:
          return;
      }

      // Mencegah tombol panah ikut menggulir halaman saat dipakai menavigasi daftar.
      event.preventDefault();
      moveTo(next, { focus: true });
    },
    [activeIndex, count, moveTo]
  );

  /** Penomoran halaman bergaya "02 / 04". */
  const pageLabel = `${String(activeIndex + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;

  return { activeIndex, railRef, moveTo, goPrev, goNext, handleKeyDown, pageLabel };
}
