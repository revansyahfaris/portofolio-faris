import { memo } from 'react';
import { FIELD } from './palette';

/**
 * Satu huruf pada busur, beserta simpangannya dari penempatan alaminya.
 *
 * Semua nilai bersifat RELATIF terhadap posisi yang sudah dihitung busurnya,
 * bukan koordinat mutlak. Alasannya sama seperti pada label kategori Skills:
 * dengan koordinat mutlak, setiap huruf harus ditentukan dari nol dan mengubah
 * jari-jari berarti menghitung ulang seluruh kata. Dengan simpangan relatif,
 * huruf yang tidak disetel tetap jatuh di tempat yang benar dengan sendirinya.
 */
export interface ArcLetter {
  /** Karakternya. */
  c: string;
  /**
   * Kedudukan pada busur, dalam derajat.
   *
   * Nol berarti tepat DI BAWAH titik pusat. Positif memutar berlawanan arah
   * jarum jam menuju sisi kiri, negatif searah jarum jam menuju sisi kanan.
   */
  angle: number;
  /** Simpangan jari-jari dari jari-jari dasar. Positif menjauh dari pusat. Dalam vh. */
  radius?: number;
  /**
   * Geser mendatar pada sumbu LAYAR. Positif ke kanan. Dalam vh.
   *
   * Berbeda maksud dari `angle` dan `radius`, dan perbedaannya menentukan
   * kapan memakai yang mana:
   *
   * - `angle` dan `radius` bergerak MENGIKUTI busur — menyusuri lengkungannya
   *   atau menjauh-mendekat dari pusatnya. Arahnya berubah bagi tiap huruf,
   *   karena tiap huruf duduk di sudut yang berbeda.
   * - `x` dan `y` bergerak lurus pada sumbu layar, arahnya sama bagi semua
   *   huruf, apa pun sudutnya.
   *
   * Pakai `angle`/`radius` selama hurufnya masih tunduk pada busur. Pakai
   * `x`/`y` untuk membetulkan satu huruf yang secara optis terasa meleset
   * meski secara hitungan sudah benar — jarak antarhuruf yang terlihat rata
   * jarang sama dengan jarak yang terukur rata.
   */
  x?: number;
  /** Geser tegak pada sumbu LAYAR. Positif ke bawah. Dalam vh. */
  y?: number;
  /** Putaran tambahan huruf itu sendiri, tanpa memindahkan kedudukannya. Dalam derajat. */
  spin?: number;
  /**
   * Kemiringan mendatar: sisi atas huruf condong ke kanan bila positif.
   *
   * Ini yang di Photoshop kamu kenal sebagai skew horizontal. Berbeda dari
   * `spin` yang memutar huruf utuh, skew MEMIRINGKAN bentuknya — garis tegaknya
   * menjadi miring sementara garis mendatarnya tetap.
   */
  skewX?: number;
  /** Kemiringan tegak, dengan aturan yang sama. Jarang dipakai, tetapi disediakan. */
  skewY?: number;
  /** Pengali ukuran untuk huruf ini saja. 1 = ukuran dasar. */
  scale?: number;

  stretchX?: number;
  stretchY?: number;
}

/**
 * Busur tempat seluruh huruf duduk.
 *
 * SELURUHNYA DALAM vh, termasuk kedudukan mendatar titik pusatnya.
 *
 * Ini disengaja dan berbeda dari Skills, yang harus diperbaiki belakangan.
 * Satuan vw dan vh bergerak mengikuti dua sumbu yang berdiri sendiri; begitu
 * rasio layar berubah, komposisi yang memakai keduanya akan melar ke satu arah.
 * Lingkaran adalah bentuk yang paling telanjang memperlihatkan hal itu — ia
 * langsung menjadi lonjong. Dengan satu satuan saja, seluruh komposisi terikat
 * pada tinggi dan tetap bulat pada rasio berapa pun.
 */
const ARC = {
  /** Jarak titik pusat busur dari tepi kiri, dalam vh. */
  centerX: 84,
  /** Jarak titik pusat busur dari tepi atas, dalam vh. */
  centerY: 0,
  /** Jari-jari busur, dalam vh. */
  radius: 89,
  /** Ukuran huruf dasar, dalam vh. */
  size: 22,
};

/**
 * Tatanan per huruf.
 *
 * Sudut awalnya dihitung merata dari 81.5° ke -10.4° — perkiraanku dari
 * rancanganmu, dengan titik pusat dan jari-jari yang dicocokkan melalui tiga
 * huruf terluarnya. Angka-angka ini memang untuk kamu setel; yang penting
 * mekanismenya sudah memungkinkan tiap huruf digeser sendiri-sendiri.
 */
const LETTERS: readonly ArcLetter[] = [
  { c: 'E', angle: 116.6, scale: 2.16, x: -25.5, y: 24.5, spin: 5, skewX: 21, stretchX: 1.05, stretchY: 1.18 },
  { c: 'X', angle: 84, scale: 1.78, x: -8.8, y: 21.5, spin: 2, skewX: 2, skewY: 0.9, stretchX: 1.08, stretchY: 1.57 },
  { c: 'P', angle: 75.1, scale: 1.52, x: 3, y: 35, spin: 0, skewX: 0, skewY: -30, stretchX: 1, stretchY: 2.2 },
  { c: 'E', angle: 65.9, scale: 2, x: 5, y: 45, spin: 0, skewX: 0, skewY: -35, stretchX: 1, stretchY: 2.1 },
  { c: 'R', angle: 57.5, scale: 1.45, x: 43.5, y: 45.5, spin: 0, skewX: 0, skewY: -38, stretchX: 1.2, stretchY: 1.85 },
  { c: 'I', angle: 42.5, scale: 1.25, x: 61.5, y: 26.3, spin: 0, skewX: 0, skewY: -30, stretchX: 1.1, stretchY: 1.15 },
  { c: 'E', angle: 25.3, scale: 1, x: 60, y: 14.5, spin: 0, skewX: 0, skewY: -20, stretchX: 1, stretchY: 1 },
  { c: 'N', angle: 8.1, scale: 0.95, x: 55, y: 6.7, spin: 0, skewX: 0, skewY: 0, stretchX: 1, stretchY: 1 },
  { c: 'C', angle: -0.1, scale: 0.82, x: 57, y: 5 },
  { c: 'E', angle: -10.3, scale: 0.9, x: 56, y: 4.4 },
];

/**
 * Judul EXPERIENCE yang melengkung mengikuti busur.
 *
 * Dibuat per huruf, bukan dengan SVG textPath. Keduanya sama-sama bisa
 * melengkungkan teks, tetapi textPath menyerahkan penempatan tiap huruf kepada
 * mesin rendering — jaraknya rata dan tidak ada yang bisa digeser sendiri.
 * Rancanganmu justru memerlukan kebalikannya.
 *
 * Penempatannya memakai satu rangkaian transform, dan URUTANNYA menentukan:
 *
 *   rotate(sudut) translateY(jari-jari) rotate(putaran) translate(-50%, -50%)
 *
 * Dibaca dari kanan: huruf dipusatkan pada titiknya sendiri lebih dulu, baru
 * didorong keluar sejauh jari-jari, lalu seluruhnya diputar ke kedudukannya.
 * Karena pemusatan dikerjakan paling akhir dalam rangkaian, ia bekerja pada
 * kerangka huruf yang SUDAH ikut berputar — sehingga huruf tetap terpusat pada
 * titiknya berapa pun sudutnya. Menaruh translate(-50%,-50%) di depan akan
 * menggeser huruf sejauh setengah ukurannya ke arah yang tetap, dan hurufnya
 * akan tampak melayang menjauh dari busur begitu sudutnya membesar.
 *
 * Huruf berdiri tegak lurus terhadap busur dengan sendirinya, tanpa perlu
 * dihitung: rotate yang menempatkannya juga memutar hurufnya.
 */
export const ArcTitle = memo(function ArcTitle() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute h-0 w-0"
        style={{ left: `${ARC.centerX}vh`, top: `${ARC.centerY}vh` }}
      >
        {LETTERS.map((letter, index) => (
          <span
            key={`${letter.c}-${index}`}
            className="absolute block font-serif uppercase leading-none"
            style={{
              fontSize: `${ARC.size * (letter.scale ?? 1)}vh`,
              color: FIELD.arcLetters,
              transform: [
                `translate(${letter.x ?? 0}vh, ${letter.y ?? 0}vh)`,
                `rotate(${letter.angle}deg)`,
                `translateY(${ARC.radius + (letter.radius ?? 0)}vh)`,
                `rotate(${letter.spin ?? 0}deg)`,
                'translate(-50%, -50%)',
              ].join(' '),
            }}
          >
            {/* 📍 PERBAIKAN SINTAKSIS BACTICK TEMPLATE LITERAL */}
            <span
              className="block"
              style={{
                transform: [
                  `skewX(${letter.skewX ?? 0}deg)`,
                  `skewY(${letter.skewY ?? 0}deg)`,
                  `scaleX(${letter.stretchX ?? 1})`,
                  `scaleY(${letter.stretchY ?? 1})`,
                ].join(' '),
              }}
            >
              {letter.c}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
});
