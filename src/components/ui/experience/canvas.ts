// File: src/components/ui/experience/canvas.ts

import type { CSSProperties } from 'react';

/**
 * Ukuran kanvas Photoshop tempat rancangan Experience dibuat.
 *
 * Satu-satunya tempat angka ini ditulis. Sebelumnya ia hidup di dalam berkas
 * bentuknya sendiri, dan itu berarti tiap bentuk baru menyalinnya lagi —
 * padahal begitu salah satu salinan diperbarui dan yang lain tertinggal,
 * bentuk-bentuknya akan berskala berbeda tanpa ada yang salah secara kasat mata
 * di kodenya.
 */
export const CANVAS = { width: 2880, height: 1800 } as const;

/**
 * Satu bentuk sebagaimana tertera di panel Transform Photoshop.
 *
 * Nama fieldnya sengaja mengikuti label di panel itu — w, h, x, y — supaya
 * menyalinnya tidak perlu penerjemahan. x dan y adalah sudut KIRI ATAS kotak
 * pembatas, dan boleh negatif bila bentuknya mulai di luar kanvas.
 */
export interface CanvasRect {
  readonly w: number;
  readonly h: number;
  readonly x: number;
  readonly y: number;
}

/**
 * Mengubah piksel kanvas menjadi vh.
 *
 * KEDUA sumbu dibagi TINGGI kanvas, bukan masing-masing oleh sumbunya sendiri.
 * Inilah yang menjaga bentuknya tetap sebangun: bentuk yang lebarnya diukur
 * terhadap lebar layar dan tingginya terhadap tinggi layar akan berubah
 * proporsi begitu rasio layar berbeda dari rasio kanvas. Lingkaran adalah
 * bentuk yang paling telanjang memperlihatkannya — ia langsung menjadi lonjong.
 */
export const toVh = (px: number) => `${((px / CANVAS.height) * 100).toFixed(3)}vh`;

/**
 * Menerjemahkan satu baris panel Transform menjadi gaya penempatan CSS.
 *
 * Dipakai bersama `position: absolute` pada elemen yang induknya adalah section
 * itu sendiri. Tidak menetapkan warna maupun bentuk sudut — itu urusan
 * pemakainya, karena rect yang sama bisa menjadi lonjong, persegi, atau bingkai
 * pemotong tergantung apa yang dibutuhkan.
 */
export const rectStyle = (rect: CanvasRect): CSSProperties => ({
  left: toVh(rect.x),
  top: toVh(rect.y),
  width: toVh(rect.w),
  height: toVh(rect.h),
});
