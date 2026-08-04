'use client';

import { useCallback, useRef, useState } from 'react';
import { SKILL_CATEGORIES } from './constants';
import { ACTIVE_SLOT, FIRST_SLOT, LAST_SLOT } from './slots';
import type { LetterSpec } from './types';

/**
 * Satu "lembar" pada kipas: bidang diagonal beserta nama kategorinya.
 *
 * Membawa isinya sendiri dan bukan sekadar menempati posisi. Inilah bedanya
 * dengan susunan sebelumnya: dulu bidangnya diam dan hanya teksnya yang ditukar,
 * sehingga tidak ada benda yang bisa dianimasikan berpindah. Sekarang lembarnya
 * yang bergerak membawa nama kategorinya ikut serta — dan karena identitasnya
 * dijaga lewat `id`, React memindahkan elemen yang sama alih-alih membuat yang
 * baru, yang memang syarat mutlak agar transisi CSS-nya bisa berjalan.
 */
export interface Sheet {
  readonly id: number;
  /** Posisi pada kipas. Lihat slots.ts. */
  readonly slot: number;
  readonly categoryIndex: number;
  readonly label: string;
  readonly letters?: readonly LetterSpec[];
}

const TOTAL = SKILL_CATEGORIES.length;

/** Modulo yang selalu mengembalikan nilai tak negatif. */
const wrap = (n: number) => ((n % TOTAL) + TOTAL) % TOTAL;

function buildSheet(id: number, categoryIndex: number, slot: number): Sheet {
  const category = SKILL_CATEGORIES[categoryIndex];
  return {
    id,
    slot,
    categoryIndex,
    label: category.bannerLabel,
    letters: category.letters,
  };
}

/**
 * Kipas sebagai ban berjalan lembar demi lembar.
 *
 * Selalu ada tepat satu lembar terparkir di luar layar pada tiap ujungnya —
 * itu yang membuat perpindahan tidak perlu satu pun trik. Saat panah ditekan,
 * seluruh lembar bergeser satu slot dengan transisi CSS biasa: yang di ujung
 * atas keluar layar, yang terparkir di bawah masuk ke pandangan, dan sebuah
 * lembar baru dipasang di parkiran yang baru saja kosong.
 *
 * Lembar baru itu selalu lahir di luar layar, jadi kemunculannya tidak pernah
 * terlihat dan tidak perlu dianimasikan. Ini yang menghindarkan masalah klasik
 * carousel melingkar: tanpa parkiran, lembar terakhir harus "berpindah tempat"
 * dari ujung atas ke ujung bawah dalam satu kedipan, dan kedipan itu hanya bisa
 * disembunyikan dengan mematikan transisi selama satu frame — trik rapuh yang
 * tidak dibutuhkan sama sekali di sini.
 */
export function useSheetCarousel() {
  const nextId = useRef(0);

  const [sheets, setSheets] = useState<readonly Sheet[]>(() => {
    const initial: Sheet[] = [];
    for (let slot = FIRST_SLOT; slot <= LAST_SLOT; slot += 1) {
      initial.push(buildSheet(nextId.current++, wrap(slot - ACTIVE_SLOT), slot));
    }
    return initial;
  });

  /*
   * Indeks aktif DITURUNKAN dari lembarnya, bukan disimpan sebagai keadaan
   * kedua. Dua sumber kebenaran untuk satu hal yang sama pasti akan lepas
   * sinkron — cukup satu kali lupa memperbaruinya bersamaan, dan nomor kategori
   * tidak lagi cocok dengan lembar yang tampil di tengah.
   */
  const activeIndex =
    sheets.find((sheet) => sheet.slot === ACTIVE_SLOT)?.categoryIndex ?? 0;

  const step = useCallback((delta: number) => {
    const direction = delta > 0 ? 1 : -1;

    setSheets((previous) => {
      // Maju berarti seluruh lembar naik satu slot; mundur sebaliknya.
      const shifted = previous
        .map((sheet) => ({ ...sheet, slot: sheet.slot - direction }))
        .filter((sheet) => sheet.slot >= FIRST_SLOT && sheet.slot <= LAST_SLOT);

      /*
       * Kategori lembar yang datang dihitung dari TETANGGANYA di ujung, bukan
       * dari indeks aktif. Dengan begitu seluruh perubahan cukup dikerjakan satu
       * pemanggilan setState — tidak ada pembaruan keadaan yang bersarang di
       * dalam updater keadaan lain, yang di StrictMode akan dijalankan dua kali
       * dan menggeser kipasnya dobel.
       */
      const vacated = direction > 0 ? LAST_SLOT : FIRST_SLOT;
      const neighbour = direction > 0 ? shifted[shifted.length - 1] : shifted[0];
      const arrival = buildSheet(
        nextId.current++,
        wrap(neighbour.categoryIndex + direction),
        vacated,
      );

      return direction > 0 ? [...shifted, arrival] : [arrival, ...shifted];
    });
  }, []);

  return { activeIndex, sheets, step };
}
