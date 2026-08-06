// File: src/components/ui/experience/motion.ts

/**
 * Gerak perpindahan antar entri pengalaman.
 *
 * Isinya menyusuri BUSUR, bukan garis lurus. Caranya bukan dengan menghitung
 * lintasan melengkung untuk tiap elemen, melainkan dengan memutar seluruh
 * kelompok isi pada satu titik poros di luar layar — titik pusat lengkungan
 * yang sama dengan yang membentuk tepi bidang tosca.
 *
 * Rotasi terhadap poros yang jauh menghasilkan lintasan yang nyaris tidak
 * terbaca sebagai putaran; yang terlihat justru geseran melengkung. Dan karena
 * seluruh isi diputar oleh satu transform yang sama, hubungan antarelemen di
 * dalamnya terjaga sempurna tanpa satu pun perhitungan tambahan.
 */

/**
 * Titik poros, dalam piksel kanvas Photoshop.
 *
 * Perkiraan pusat lengkungan tepi bidang tosca. Makin jauh titik ini, makin
 * landai lintasannya — dan makin kecil sudut yang dibutuhkan untuk jarak
 * geseran yang sama.
 */
export const PIVOT = { x:3300, y: -800 };

/**
 * Sudut putar saat masuk dan keluar, dalam derajat.
 *
 * Kecil, karena porosnya jauh. Pada poros sejauh ini, 6 derajat sudah
 * memindahkan isi cukup jauh untuk terbaca sebagai perpindahan.
 */
export const SWEEP_DEGREES = 75;

/**
 * Pengali ukuran pada ujung lintasan.
 *
 * Inilah yang menyatakan bahwa lintasannya menyempit ke satu arah: melangkah ke
 * entri BERIKUTNYA membawa isi ke bagian lintasan yang lebih kecil, sehingga ia
 * mengecil; melangkah MUNDUR membawanya ke bagian yang lebih besar.
 *
 * Diterapkan pada poros yang sama dengan rotasinya, jadi pembesarannya menjauhi
 * pusat lengkungan — bukan mengembang dari tengah layar. Itu yang membuatnya
 * terbaca sebagai "lintasannya yang melebar", bukan "isinya yang di-zoom".
 */
export const SWEEP_SCALE = 0.7;

const EASE = {
  /** Berangkat cepat lalu melambat. Untuk isi yang pergi. */
  out: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Melandai panjang. Untuk isi yang datang dan harus sempat terbaca. */
  in: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const SLIDE = {
  /** Isi lama pergi. */
  exit: { duration: 260, ease: EASE.out },
  /** Isi baru datang. */
  enter: { duration: 460, ease: EASE.in },
} as const;

export const DEBUG_ARC_MOTION = false;
