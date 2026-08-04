import type { CSSProperties } from 'react';

/**
 * Rasio layar tempat komposisi Skills dirancang: 2880 × 1800.
 *
 * Angka ini bukan sekadar catatan — seluruh sistem satuan di bawah diturunkan
 * darinya. Mengubahnya berarti menyatakan bahwa rancangan aslinya dibuat pada
 * rasio lain, dan seluruh komposisi akan menyesuaikan sendiri.
 */
export const DESIGN_ASPECT = 2880 / 1800; // 1.6

const VAR = '--skills-u';

/** Memangkas ekor pecahan biner: 14 * 1.6 = 22.400000000000002. */
const trim = (n: number) => Number(n.toFixed(4));

/**
 * Satuan yang setara 1vh PADA RASIO RANCANGAN.
 *
 * Dipakai menggantikan setiap `vh` yang ada sekarang: `20vh` menjadi `u(20)`.
 * Pada layar penuh 2880×1800 nilainya sama persis dengan sebelumnya, jadi
 * tampilan yang sudah kamu setel tidak bergeser sedikit pun.
 */
export const u = (n: number) => `calc(var(${VAR}) * ${trim(n)})`;

/**
 * Satuan yang setara 1vw PADA RASIO RANCANGAN.
 *
 * Menggantikan setiap `vw`: `42vw` menjadi `uw(42)`. Perhatikan bahwa ini
 * BUKAN sumbu kedua — nilainya tetap kelipatan dari satuan yang sama, hanya
 * dikalikan rasio rancangan. Justru itu intinya: mendatar dan tegak tidak lagi
 * bisa bergerak sendiri-sendiri.
 */
export const uw = (n: number) => `calc(var(${VAR}) * ${trim(n * DESIGN_ASPECT)})`;

/**
 * Nilai satuannya, dipasang sekali di akar section.
 *
 * max() memberi perilaku "cover": satuan mengikuti sisi yang paling membatasi,
 * sehingga kanvas selalu menutupi layar dan tidak pernah menyisakan bidang
 * kosong. Kebalikannya, min(), akan memuat seluruh komposisi tetapi meninggalkan
 * pita kosong di dua sisi — dan komposisi ini memang dirancang untuk terpotong
 * di setiap tepinya, jadi memuatkannya seluruhnya justru merusak maksudnya.
 *
 * Pembagi 160 = 100 × rasio rancangan. Pada rasio 1.6 kedua cabang max()
 * bernilai sama persis, dan itulah yang menjamin layar penuh tidak berubah.
 */
export const SKILLS_UNIT_STYLE = {
  [VAR]: `max(1vh, calc(100vw / ${trim(100 * DESIGN_ASPECT)}))`,
} as unknown as CSSProperties;