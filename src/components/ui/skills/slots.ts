// File: src/components/ui/skills/slots.ts

import { SKILLS } from './palette';

/**
 * Slot yang terlihat berada di 0, 1, dan 2. Slot -1 dan 3 adalah PARKIRAN di
 * luar layar: satu di atas untuk lembar yang baru saja keluar, satu di bawah
 * untuk lembar yang bersiap masuk.
 *
 * Keduanya bukan hiasan melainkan yang membuat carousel ini bekerja tanpa trik.
 * Lihat useSheetCarousel.ts.
 */
export const FIRST_SLOT = -1;
export const LAST_SLOT = 3;

/**
 * Slot yang menampung kategori terpilih.
 *
 * Slot tengah, karena kategori aktif harus punya tetangga di atas dan bawahnya —
 * itulah yang memberi tahu pengguna bahwa daftarnya bisa digulir dua arah tanpa
 * perlu petunjuk tertulis.
 */
export const ACTIVE_SLOT = 1;

export interface SlotGeometry {
  /** Derajat menurun ke kanan; makin besar makin curam. */
  readonly angle: number;
  /** Jarak bidang dari titik hilang dalam vh, sebelum diputar. */
  readonly offset: number;
  readonly color: string;
  /** Jarak tepi kiri label dari titik hilang, menyusuri bidang, dalam vw. */
  readonly labelStart: number;
}

/**
 * Geometri tiap slot. Lembar berpindah DI ANTARA nilai-nilai ini, dan seluruh
 * perpindahannya dikerjakan transisi CSS biasa atas `top`, `transform`,
 * `background-color`, dan `right` labelnya.
 *
 * Tiga slot yang terlihat memakai angka yang sudah kamu kunci sebelumnya, tidak
 * satu pun diubah. Dua slot ujungnya PARKIRAN — tidak pernah digambar sebagai
 * bidang merah, hanya dipakai label sebagai tempat berangkat dan tujuan.
 *
 * Karena yang berjalan cuma teks, parkirannya tidak perlu sejauh kalau bidangnya
 * ikut bergerak: yang harus keluar dari pandangan hanya satu baris huruf, bukan
 * kotak setebal 75vh.
 */
export const SLOT_GEOMETRY: Readonly<Record<number, SlotGeometry>> = {
  [-1]: { angle: 55, offset: -46, color: SKILLS.red, labelStart: 32 },
  0: { angle: 42, offset: -25, color: SKILLS.red, labelStart: 42 },
  1: { angle: 29, offset: -13, color: SKILLS.redBright, labelStart: 52 },
  2: { angle: 16, offset: -9, color: SKILLS.red, labelStart: 57 },
  3: { angle: 3, offset: 10, color: SKILLS.red, labelStart: 62 },
};

/** Slot yang benar-benar digambar sebagai bidang merah. Sisanya parkiran label. */
export const VISIBLE_SLOTS = [0, 1, 2] as const;

/** Tebal bidang dalam vh. Sama di semua slot. */
export const SHEET_THICKNESS = 75;

/** Posisi label dari tepi atas bidangnya, dalam vh. */
export const LABEL_TOP = 1.5;

/** Ukuran huruf label, dalam vh. */
export const LABEL_SIZE = 20;
