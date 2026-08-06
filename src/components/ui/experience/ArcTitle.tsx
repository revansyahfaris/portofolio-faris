// File: src/components/ui/experience/ArcTitle.tsx

import { memo } from 'react';
import { ux, uy } from './canvas';
import { FIELD } from './palette';

export interface ArcLetter {
  c: string;
  angle: number;
  radius?: number;
  x?: number;
  y?: number;
  spin?: number;
  skewX?: number;
  skewY?: number;
  scale?: number;
  stretchX?: number;
  stretchY?: number;
  driftX?: number;
  driftY?: number;
  /**
   * Pembesaran huruf ini saat layar melebar, dalam PIKSEL ukuran huruf per
   * piksel kelebihan lebar layar.
   *
   * Bukan pengali. 0.02 berarti tiap 100px kelebihan lebar menambah 2px pada
   * ukuran hurufnya. Bernilai nol pada rasio rancangan, sehingga layar penuh
   * tidak tersentuh berapa pun angkanya.
   */
  sizeDrift?: number;
}

const ARC = {
  centerX: 84,
  centerY: 0,
  radius: 89,
  size: 22,
  /** Pembesaran bawaan untuk huruf yang tidak menyetel sizeDrift-nya sendiri. */
  globalSizeDrift: 0,
};

const LETTERS: readonly ArcLetter[] = [
  // sizeDrift: tiap 100px kelebihan lebar layar menambah 2px ukuran huruf.
  { c: 'E', angle: 116.6, scale: 2.16, x: -25.5, y: 24.5, spin: 5, skewX: 21, stretchX: 1.05, stretchY: 1.18, driftX: 0.20, driftY: -0.1, sizeDrift: 0.2 },
  { c: 'X', angle: 84, scale: 1.78, x: -8.8, y: 21.5, spin: 2, skewX: 2, skewY: 0.9, stretchX: 1.08, stretchY: 1.57, driftX: 0.08, driftY: 0.05, sizeDrift: 0.215 },
  { c: 'P', angle: 75.1, scale: 1.52, x: 3, y: 35, spin: 0, skewX: 0, skewY: -30, stretchX: 1, stretchY: 2.2, driftX: 0.0, driftY: 0.2, sizeDrift: 0.22 },
  { c: 'E', angle: 65.9, scale: 2, x: 5, y: 45, spin: 0, skewX: 0, skewY: -35, stretchX: 1, stretchY: 2.1, driftX: 0.55, driftY: 0.05, sizeDrift: -0.05, },
  { c: 'R', angle: 57.5, scale: 1.45, x: 43.5, y: 45.5, spin: 0, skewX: 0, skewY: -38, stretchX: 1.2, stretchY: 1.85, driftX:0.41, driftY: 0.0, sizeDrift: -0.1 },
  { c: 'I', angle: 42.5, scale: 1.25, x: 61.5, y: 26.3, spin: 0, skewX: 0, skewY: -30, stretchX: 1.1, stretchY: 1.15, driftX: 0.1, driftY: 0.01 },
  { c: 'E', angle: 25.3, scale: 1, x: 60, y: 14.5, spin: 0, skewX: 0, skewY: -20, stretchX: 1, stretchY: 1, driftX: -0.02, driftY: 0.003, },
  { c: 'N', angle: 8.1, scale: 0.95, x: 55, y: 6.7, spin: 0, skewX: 0, skewY: 0, stretchX: 1, stretchY: 1 },
  { c: 'C', angle: -0.1, scale: 0.82, x: 57, y: 5 },
  { c: 'E', angle: -10.3, scale: 0.9, x: 56, y: 4.4 },
];

export const ArcTitle = memo(function ArcTitle() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute h-0 w-0"
        style={{ left: ux(ARC.centerX), top: uy(ARC.centerY) }}
      >
        {LETTERS.map((letter, index) => {
          const radius = ARC.radius + (letter.radius ?? 0);
          const theta = (letter.angle * Math.PI) / 180;
          const dx = -radius * Math.sin(theta);
          const dy = radius * Math.cos(theta);

          const baseScale = letter.scale ?? 1;
          const letterDrift = letter.sizeDrift ?? ARC.globalSizeDrift;

          return (
            <span
              key={`${letter.c}-${index}`}
              className="absolute block font-serif uppercase leading-none"
              style={{
                /*
                 * Pembesaran saat windowed dikerjakan DI SINI, sebagai
                 * penambahan pada ukuran huruf — bukan lewat scale().
                 *
                 * font-size adalah panjang, dan menambahkan panjang dengan
                 * panjang itu sah. scale() menuntut bilangan tanpa satuan, dan
                 * bilangan itu tidak bisa diturunkan dari ukuran layar di CSS
                 * murni. Lihat catatan di canvas.ts.
                 *
                 * Ukuran huruf yang sungguhan juga lebih baik daripada hasil
                 * skala: hurufnya dirender ulang pada ukuran barunya, bukan
                 * diraster lalu diperbesar.
                 */
                fontSize: uy(ARC.size * baseScale, letterDrift),
                color: FIELD.arcLetters,
                transform: [
                  // driftY WAJIB diteruskan ke uy, sama seperti driftX ke ux.
                  // Sebelumnya field-nya ada di ArcLetter tetapi tidak pernah
                  // sampai ke sini — jadi menuliskannya di data tidak
                  // menghasilkan apa pun, dan TypeScript pun tidak mengeluh
                  // karena tipenya memang sah, cuma tidak dibaca.
                  `translate(${ux(letter.x ?? 0, letter.driftX ?? 0)}, ${uy(letter.y ?? 0, letter.driftY ?? 0)})`,
                  `translate(${ux(dx)}, ${uy(dy)})`,
                  `rotate(${letter.angle + (letter.spin ?? 0)}deg)`,
                  'translate(-50%, -50%)',
                ].join(' '),
              }}
            >
              <span
                className="block"
                style={{
                  transform: [
                    `skewX(${letter.skewX ?? 0}deg)`,
                    `skewY(${letter.skewY ?? 0}deg)`,
                    `scaleX(${letter.stretchX ?? 1})`,
                    `scaleY(${letter.stretchY ?? 1})`,
                  ].join(' '),
                  transformOrigin: 'center',
                }}
              >
                {letter.c}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
});