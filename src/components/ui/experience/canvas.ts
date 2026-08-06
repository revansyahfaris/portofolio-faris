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

/** Lebar kanvas bila tingginya dianggap 100. Untuk 2880x1800: 160. */
const CANVAS_WIDTH_IN_UNITS = (CANVAS.width / CANVAS.height) * 100;

/**
 * SATUAN DASAR seluruh komposisi Experience.
 *
 * Menggantikan vh, dan bedanya cuma satu hal: satuan ini ikut membesar begitu
 * layar lebih lebar daripada rasio rancangannya.
 *
 * PADA RASIO RANCANGAN KEDUA CABANGNYA BERNILAI SAMA PERSIS. Untuk kanvas
 * 2880x1800, lebar layar tepat 1.6 kali tingginya, sehingga 100vw/160 = 1vh.
 * max() karena itu mengembalikan 1vh, dan tidak ada satu piksel pun yang
 * bergeser dari keadaan sebelumnya. Ini bukan pendekatan yang kebetulan cocok —
 * kesamaannya aritmetika, bukan hasil penyetelan.
 *
 * Di atas rasio itu — layar lebih lebar dan pendek — cabang keduanya menang dan
 * seluruh komposisi membesar mengikuti lebar, sehingga tetap memenuhi layar
 * alih-alih menyisakan pita kosong di kedua tepi.
 *
 * Di bawah rasio itu, satuannya tetap 1vh dan komposisinya menjadi lebih lebar
 * daripada layar. Kelebihannya terpotong merata di kiri dan kanan oleh
 * DesignFrame yang dipusatkan — bukan menumpuk di satu sisi.
 *
 * KENAPA BUKAN transform: scale()
 *
 * scale() memerlukan angka tanpa satuan, dan CSS tidak bisa membagi 100vw
 * dengan 160vh. Faktornya wajib dihitung di JavaScript, sehingga render pertama
 * selalu memakai scale(1) lalu melompat setelah efeknya berjalan — kedipan yang
 * muncul di setiap pemuatan halaman. Cara ini bekerja sejak cat pertama, tanpa
 * satu baris JavaScript pun, dan teksnya memperoleh font-size sungguhan alih-alih
 * hasil raster yang diperbesar.
 */
const UNIT_X = `max(1vh, 100vw / ${CANVAS_WIDTH_IN_UNITS})`;
const UNIT_Y = '1vh';

const trim = (n: number) => Number(n.toFixed(4));

/**
 * Satuan MENDATAR. Ikut meregang begitu layar lebih lebar daripada rancangan.
 *
 * Dipakai hanya untuk POSISI mendatar dan untuk lebar bentuk yang memang boleh
 * meregang. Tidak untuk ukuran huruf, dan tidak untuk lebar bentuk yang punya
 * proporsi benar.
 */
/**
 * Kelebihan lebar layar terhadap lebar rancangan.
 *
 * BERNILAI TEPAT NOL PADA RASIO RANCANGAN — bukan mendekati nol, melainkan nol
 * secara aritmetika: pada rasio 1.6, 100vw sama persis dengan 160vh. Di atas
 * rasio itu nilainya tumbuh sebesar ruang lebih yang muncul. Di bawahnya, max()
 * menahannya di nol.
 *
 * Inilah alat untuk menyetel tampilan windowed tanpa bisa menyentuh fullscreen.
 * Apa pun yang dikalikan dengan nilai ini akan lenyap dengan sendirinya begitu
 * layarnya kembali ke rasio rancangan — jadi kesalahan setelan windowed
 * MUSTAHIL merembet ke layar penuh. Bukan karena hati-hati, melainkan karena
 * sukunya memang menjadi nol.
 */
const OVERFLOW_X = `max(0px, 100vw - ${CANVAS_WIDTH_IN_UNITS}vh)`;

/**
 * Menyusun satu nilai CSS: nilai dasar, ditambah simpangan yang hanya hidup
 * saat layar melebar.
 *
 * `drift` adalah seberapa jauh elemennya bergeser per satu piksel kelebihan
 * lebar. Positif searah sumbunya, negatif berlawanan. Nol berarti tidak ada
 * penyetelan windowed sama sekali, dan itulah nilai bawaannya — sehingga
 * seluruh pemanggilan lama tetap menghasilkan angka yang sama persis.
 */
const withDrift = (base: string, drift: number) =>
  drift === 0 ? base : `calc(${base} + ${OVERFLOW_X} * ${trim(drift)})`;

export const ux = (n: number, drift = 0) =>
  withDrift(`calc(${UNIT_X} * ${trim(n)})`, drift);

/**
 * Satuan TEGAK, dan satuan untuk SELURUH UKURAN.
 *
 * Tidak pernah meregang. Inilah yang menjaga dua hal sekaligus:
 *
 * - Tinggi komposisi selalu tepat setinggi layar, sehingga atas dan bawah tidak
 *   pernah terpotong pada rasio apa pun.
 * - Setiap benda yang punya proporsi benar — huruf, foto, tombol — tetap pada
 *   proporsinya. Ukuran huruf termasuk di sini, dan itu yang membedakan cara
 *   ini dari meregangkan seluruh kanvas: yang melebar hanya JARAK antar huruf,
 *   bukan bentuk hurufnya.
 */
export const uy = (n: number, drift = 0) =>
  withDrift(`calc(${UNIT_Y} * ${trim(n)})`, drift);

/**
 * Persentase terhadap induknya, dengan penyetelan windowed.
 *
 * Ada karena persen BOLEH dijumlahkan dengan panjang di dalam calc():
 * `calc(95% + 12px)` sah, sedangkan `calc(0.95 + 12px)` tidak. Inilah jalan
 * yang tersedia untuk membesar-mengecilkan sesuatu mengikuti lebar layar —
 * bukan lewat scale(), yang menuntut bilangan tanpa satuan dan karena itu
 * mustahil diturunkan dari ukuran layar.
 *
 * Dipakai pada width dan height, bukan pada transform.
 */
export const pct = (n: number, drift = 0) => withDrift(`${trim(n)}%`, drift);

/** Piksel kanvas menjadi posisi mendatar yang ikut meregang. */
export const toX = (px: number, drift = 0) => ux((px / CANVAS.height) * 100, drift);

/**
 * Piksel kanvas menjadi posisi tegak atau ukuran.
 *
 * Dibagi TINGGI kanvas, sama seperti toX. Itu yang membuat keduanya bernilai
 * sama persis pada rasio rancangan — dan karena itu pula tampilan layar penuh
 * tidak bergeser sedikit pun saat sistem ini dipasang.
 */
export const toY = (px: number, drift = 0) => uy((px / CANVAS.height) * 100, drift);

/**
 * Bentuk KAKU: letaknya ikut meregang, ukurannya tidak.
 *
 * Ini yang berlaku untuk hampir semua elemen — foto, bidang merah, tombol.
 * Letaknya mengikuti pelebaran supaya tetap berada di bagian komposisi yang
 * sama, tetapi bentuknya sendiri tidak boleh berubah proporsi.
 */
export const rectStyle = (
  rect: CanvasRect,
  drift?: { readonly x?: number; readonly y?: number },
): CSSProperties => ({
  left: toX(rect.x, drift?.x ?? 0),
  top: toY(rect.y, drift?.y ?? 0),
  width: toY(rect.w),
  height: toY(rect.h),
});

/**
 * Bentuk ELASTIS: lebarnya ikut meregang.
 *
 * Hanya untuk bentuk yang tidak punya proporsi benar yang bisa dibandingkan
 * mata. Lonjong yang diregangkan tetap lonjong — tidak ada yang bisa menyebutnya
 * salah karena tidak ada acuannya. Foto yang diregangkan langsung terlihat
 * salah, karena proporsi wajah dihafal semua orang.
 *
 * Inilah yang membuat komposisi bisa memenuhi layar tanpa memotong apa pun:
 * ruang lebihnya diserap oleh bidang warna, bukan oleh isi yang harus dibaca.
 */
export const elasticRectStyle = (rect: CanvasRect): CSSProperties => ({
  left: toX(rect.x),
  top: toY(rect.y),
  width: toX(rect.w),
  height: toY(rect.h),
});

/*
 * CATATAN — KENAPA TIDAK ADA `uScale` DI SINI.
 *
 * Menskala elemen mengikuti lebar layar terdengar seperti pasangan alami dari
 * penyetel di atas, tetapi CSS murni TIDAK BISA melakukannya. Alasannya bukan
 * soal dukungan browser melainkan soal tipe:
 *
 *   scale() menuntut BILANGAN TANPA SATUAN.
 *   OVERFLOW_X adalah PANJANG.
 *   calc() tidak boleh menjumlahkan bilangan dengan panjang.
 *
 * Jadi `calc(1 + max(0px, ...) * 0.001)` bukan sekadar salah nilai — ia tidak
 * sah, dan CSS membuang SELURUH deklarasi yang memuatnya. Itu sebabnya elemen
 * yang memakainya tampak tidak berubah sama sekali sekaligus kehilangan skew
 * dan rotasinya: propertinya memang tidak pernah dipakai.
 *
 * Dan tidak ada jalan memutar. Satu-satunya cara memperoleh bilangan dari
 * panjang adalah membagi panjang dengan panjang, dan calc() melarangnya.
 *
 * YANG BISA: jangan menskala, tetapi TAMBAHKAN pada ukurannya. font-size,
 * width, dan height semuanya panjang — dan `panjang + panjang x bilangan` sah.
 * Itulah yang dikerjakan argumen kedua pada ux(), uy(), toX(), dan toY().
 *
 * Untuk membesarkan satu gugus utuh yang terdiri dari banyak elemen, caranya
 * memasang font-size pada wadahnya lewat uy(base, drift), lalu seluruh isinya
 * memakai satuan `em`. Semua yang diukur dalam em akan ikut membesar dari satu
 * angka — dan itu skala sungguhan, tanpa scale() sama sekali.
 */
