// File: src/components/ui/experience/FieldEllipse.tsx

import { memo } from 'react';
import { CANVAS } from './canvas';
import type { CanvasRect } from './canvas';
import { FIELD } from './palette';

/** Bidang tosca utama */
const ELLIPSE: CanvasRect = {
  w: 3664.01,
  h: 2087,
  x: 628,
  y: -494,
};

/**
 * Bidang tosca. TIDAK lagi dilubangi mask.
 *
 * Lubang potongnya dulu digambar di sini sebagai <ellipse> hitam di dalam mask,
 * SEKALIGUS digambar ulang di PortraitTrack sebagai div CSS. Dua bentuk untuk
 * satu lubang yang sama — dan keduanya tidak mungkin sepakat begitu layar
 * melebar, karena urutan transformasinya berlawanan: SVG memutar di ruang
 * viewBox lalu diregangkan preserveAspectRatio="none", sedangkan CSS mengukur
 * kotak yang sudah teregang lalu memutarnya. Elips yang diputar-lalu-diregang
 * bukan bentuk yang sama dengan yang diregang-lalu-diputar. Pada rasio
 * rancangan keduanya berimpit; di luar itu simpangannya tumbuh mengikuti lebar.
 *
 * Sekarang lubangnya cukup digambar SEKALI, di PortraitTrack, sebagai lingkaran
 * berwarna sama dengan alas halaman. Latar di belakang bidang ini memang putih,
 * jadi "lubang tembus yang memperlihatkan putih" dan "lingkaran putih di atas
 * tosca" menghasilkan gambar yang sama persis — tetapi yang kedua hanya
 * memerlukan satu bentuk, di satu sistem koordinat, sehingga tidak ada yang
 * bisa menyimpang dari apa pun.
 */
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
        <ellipse
          cx={ELLIPSE.x + ELLIPSE.w / 2}
          cy={ELLIPSE.y + ELLIPSE.h / 2}
          rx={ELLIPSE.w / 2}
          ry={ELLIPSE.h / 2}
          fill={FIELD.ellipse}
        />
      </svg>
    </div>
  );
});