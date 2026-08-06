// File: src/components/ui/experience/palette.ts

/**
 * Palet Experience section.
 *
 * MASIH SEMENTARA — seluruh nilai di bawah adalah perkiraan dari gambar
 * rancangan, bukan angka yang kamu tetapkan. Gambar yang dikirim lewat chat
 * sudah melewati kompresi, jadi warna yang terbaca darinya hampir pasti
 * meleset beberapa digit. Ganti dengan hex aslimu.
 *
 * Dikumpulkan di satu berkas seperti palette.ts milik Skills, dengan alasan yang
 * sama: satu warna dipakai di banyak tempat, dan warna yang ditulis ulang di
 * tiap tempat pasti akan tertinggal saat salah satunya diganti.
 */
export const XP = {
  /** Hijau tosca latar penuh layar. */
  teal: '#009689',

  /** Merah bidang segitiga tempat nama jabatan. */
  red: '#ff0000',

  /** Kuning tombol Detail, lapisan atas. */
  yellow: '#f7ff23',

  /**
   * Kuning lapisan bawah tombol Detail.
   *
   * PERKIRAAN — kuturunkan dari `yellow` dengan menurunkan terangnya, bukan
   * diambil dari rancanganmu. Ganti kalau meleset.
   */
  yellowDeep: '#b8c400',

  /** Tosca terang untuk panah navigasi. */
  tealBright: '#1defcf',

  /** Putih untuk teks besar dan lingkaran trek. */
  white: '#FFFFFF',

  /** Hitam untuk teks pada tombol Detail. */
  ink: '#0B0B0B',

  /** Merah muda samar untuk angka besar di sudut. */
  numberTint: '#e2dfdf',
} as const;

/**
 * Pasangan warna bidang dan huruf raksasa.
 *
 * Dipisah dari XP dan dijadikan pasangan karena keduanya HANYA bermakna bersama:
 * huruf sewarna bidangnya tidak akan terlihat sama sekali. Membalik tampilannya
 * karena itu berarti menukar dua nilai di satu tempat, bukan mengubah warna di
 * dua berkas yang berbeda dan berharap keduanya tetap berlawanan.
 */
export const FIELD = {
  /** Warna alas penuh layar, yang tampak di LUAR bidang lonjong. */
  background: XP.white,
  /**
   * Warna bidang lonjong.
   *
   * Toscanya kini sebuah BENTUK, bukan latar. Tepi kanannya yang melengkung
   * itulah yang memisahkannya dari alas putih, dan lengkungan itu tulang
   * punggung seluruh komposisi — busur judul, lingkaran trek, dan letak foto
   * semuanya mengikuti arah yang sama.
   */
  ellipse: XP.teal,
  /** Warna huruf EXPERIENCE. */
  arcLetters: XP.teal,
} as const;
