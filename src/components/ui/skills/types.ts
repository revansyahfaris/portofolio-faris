/**
 * Satu huruf pada label kategori, beserta simpangannya dari posisi alaminya.
 *
 * Nilai simpangan bersifat RELATIF terhadap posisi normal huruf itu, bukan
 * koordinat mutlak. Alasannya: dengan koordinat mutlak, setiap huruf harus
 * ditentukan posisinya satu per satu dari nol, dan mengubah ukuran huruf berarti
 * menghitung ulang seluruh kata. Dengan simpangan relatif, huruf yang tidak
 * disetel tetap jatuh pada posisi yang benar dengan sendirinya, dan kamu cukup
 * menyentuh huruf yang memang ingin digeser.
 *
 * Satuan x, y, dan gap adalah `em` — relatif terhadap ukuran huruf itu sendiri.
 * Ini penting karena slot tengah memakai ukuran lebih besar daripada slot atas
 * dan bawah: dengan satuan em, tatanan yang sama terlihat sebanding di ketiganya
 * tanpa perlu dua set angka.
 */
export interface LetterSpec {
  /** Karakternya. Spasi ditulis sebagai ' '. */
  c: string;
  /** Geser mendatar; positif ke kanan. Dalam em. */
  x?: number;
  /** Geser tegak; positif ke bawah. Dalam em. */
  y?: number;
  /** Putar huruf dan kotak; positif searah jarum jam. Dalam derajat. */
  r?: number;
  /**Putar kotak */
  boxR?: number;
  /**miringkan kotak */
  skew?: number;
  /** Perbesar/perkecil huruf ini saja. 1 = ukuran normal. */
  s?: number;
  /** Rapatkan atau renggangkan jarak ke huruf BERIKUTNYA. Negatif merapatkan. Dalam em. */
  gap?: number;
  /**
   * Balik warnanya: huruf ini diberi kotak berwarna teks, dan hurufnya sendiri
   * memakai warna bidang di bawahnya — sehingga terlihat seperti dilubangi.
   *
   * Warna bidangnya tidak ditulis di sini melainkan diteruskan komponen dari
   * bidang tempat label itu menempel. Menuliskannya di data akan berarti warna
   * yang sama disimpan di dua tempat, dan begitu warna bidang diubah, huruf
   * terbalik ini akan tertinggal memakai warna lama tanpa ada yang menyadarinya.
   */
  invert?: boolean;
  /** Jarak kotak ke huruf, mendatar. Hanya berlaku bila invert aktif. Dalam em. */
  padX?: number;
  /** Jarak kotak ke huruf, tegak. Hanya berlaku bila invert aktif. Dalam em. */
  padY?: number;
}

/** Satu teknologi di dalam kategori kemampuan, dengan rincian fitur intinya. */
export interface SkillTech {
  /** Nama teknologi, ditampilkan besar saat dibuka. */
  name: string;
  /**
   * Fitur/konsep inti teknologi ini. Item pertama ditandai sebagai sorotan
   * (dijadikan pil berwarna) di layar rincian.
   */
  coreSkills: readonly string[];
}

/** Satu kategori kemampuan pada Skills section, berisi kumpulan teknologi terkait. */
export interface SkillCategory {
  /** Nomor urut ditampilkan sebagai angka romawi pada layar rincian. */
  roman: string;
  /**
   * Label singkat untuk pita diagonal pada layar daftar, mis. "FRONTEND".
   *
   * Tetap menjadi sumber kebenaran untuk nama kategori: dipakai pembaca layar,
   * dan dipakai apa adanya bila letters belum diisi.
   */
  bannerLabel: string;
  /**
   * Tatanan per huruf untuk bannerLabel.
   *
   * Opsional. Bila kosong, labelnya dirender rata seperti teks biasa. Bila diisi,
   * urutan dan isinya HARUS mengeja bannerLabel — komponen memakai bannerLabel
   * sebagai nama yang dibacakan, dan letters hanya untuk tampilannya.
   */
  letters?: readonly LetterSpec[];
  /** Nama lengkap kategori. */
  name: string;
  /** Deskripsi singkat konteks kategori ini dipakai untuk apa. */
  description: string;
  /** Daftar teknologi pada kategori ini. */
  techs: readonly SkillTech[];
}
