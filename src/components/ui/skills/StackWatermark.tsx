import { memo } from 'react';
import { SKILLS } from './palette';
import { OPEN_SPLIT_PERCENT } from './SkillsField';

/**
 * Ruang koordinat internal SVG.
 *
 * Angkanya sendiri tidak penting — yang penting hanya PERBANDINGANNYA, karena
 * seluruh isinya nanti diregangkan mengisi kotak yang sebenarnya. Lebar dibuat
 * bulat 1000 supaya textLength bisa memakai angka yang sama persis.
 */
const VIEWBOX = { width: 1000, height: 210 };

/**
 * Ukuran dan garis dasar teks di dalam ruang koordinat di atas.
 *
 * baseline diletakkan di dekat bagian bawah kotak sehingga bagian atas huruf
 * menembus tepi atas dan terpotong, sesuai rancangan.
 */
const TEXT = { size: 200, baseline: 172 };

/**
 * Penempatan kotak watermark terhadap section, dalam persen.
 *
 * `height` sengaja dibuat sedikit lebih besar daripada tinggi bidang putih, dan
 * `top` sedikit negatif, supaya hurufnya benar-benar terpotong tepi atas alih-alih
 * pas menyentuhnya. OPEN_SPLIT_PERCENT dibaca dari sumber yang sama dengan bidang
 * putihnya, jadi begitu batas putih-merah digeser, watermark ikut menyesuaikan
 * tanpa perlu disetel ulang.
 */
/**
 * CARA MENYETEL DISTORSINYA.
 *
 * Teks ini SELALU tepat memenuhi kotaknya — itu yang dikerjakan textLength. Jadi
 * tidak ada satu pun angka yang bernama "seberapa melar". Yang ada hanya kotaknya,
 * dan derajat kemelaran muncul sendiri dari perbandingan lebar terhadap tingginya.
 *
 * Melebarkan huruf  -> kecilkan `left` dan `right` (makin negatif, kotak makin
 *                      lebar melewati tepi layar, huruf ikut meregang)
 * Merampingkan huruf-> besarkan `left` dan `right`, atau naikkan `height`
 * Menaikkan tinggi  -> `height`
 * Mengatur potongan -> `top` (makin negatif, makin dalam huruf terpotong tepi atas)
 *
 * Perlu diingat saat menyetel: mengubah `height` juga mengubah kesan kemelarannya,
 * karena yang terbaca mata adalah perbandingan lebar-tinggi, bukan lebarnya saja.
 * Kalau ingin melebarkan tanpa mengubah kesan tebal-tipis hurufnya, ubah keduanya
 * dengan perbandingan yang sama.
 */
const BOX = {
  top: -8.25,
  height: OPEN_SPLIT_PERCENT + 17.5,
  /** Tepi kiri kotak terhadap section, dalam persen. Negatif = keluar layar. */
  left: -2,
  /** Tepi kanan kotak terhadap section, dalam persen. Negatif = keluar layar. */
  right: 17,
};

/**
 * Watermark "Tech Stack" pada keadaan terbuka.
 *
 * Dirender sebagai teks SVG, bukan teks HTML, karena yang dibutuhkan adalah huruf
 * yang MELAR MENGISI kotaknya — bukan huruf besar yang kebetulan hampir selebar
 * layar. Bedanya nyata: dengan pengali tetap seperti scaleX(1.18), teksnya hanya
 * pas pada satu lebar layar dan akan kurang atau kelebihan di lebar lain.
 *
 * Dua atribut yang mengerjakannya:
 *
 * - textLength + lengthAdjust="spacingAndGlyphs" memaksa teks menempati lebar
 *   yang ditentukan secara tepat, dengan cara meregangkan bentuk hurufnya sendiri,
 *   bukan sekadar merenggangkan jaraknya. Inilah padanan menarik pegangan kotak
 *   teks di Photoshop.
 * - preserveAspectRatio="none" melepaskan kunci rasio, sehingga tinggi dan lebar
 *   kotak dapat diatur sendiri-sendiri. Tanpa itu, SVG akan mempertahankan
 *   proporsi aslinya dan tidak ada distorsi yang terjadi.
 *
 * Hasilnya: teks selalu tepat memenuhi bidang putih pada lebar layar berapa pun,
 * tanpa satu pun angka yang perlu ditebak ulang.
 *
 * Miring dan TIDAK tebal — berbeda dari seluruh tipografi lain di layar ini yang
 * tebal dan tegak. Perbedaan itu yang menjaganya tetap terbaca sebagai lapisan
 * latar meskipun ukurannya paling besar di antara semuanya.
 */
export const StackWatermark = memo(function StackWatermark() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Kotak perentang. WAJIB berupa <div>, bukan langsung <svg>.

          <svg> adalah replaced element — sekelas dengan <img>. Untuk elemen jenis
          itu, `left` dan `right` yang dipasang bersamaan TIDAK merentangkannya:
          selama lebarnya `auto`, CSS mengambil ukuran intrinsik elemen dan
          mengabaikan `right` sepenuhnya. Akibatnya menyetel tepi kanan tidak
          menghasilkan apa pun, tanpa error dan tanpa petunjuk.

          <div> bukan replaced element, jadi ia benar-benar merentang mengikuti
          pasangan left-right. SVG di dalamnya cukup diminta mengisi penuh. */}
      <div
        className="absolute"
        style={{
          top: `${BOX.top}%`,
          left: `${BOX.left}%`,
          right: `${BOX.right}%`,
          height: `${BOX.height}%`,
        }}
      >
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          preserveAspectRatio="none"
        >
          <text
            // Kelas font-serif dipakai agar teks SVG ini memakai Georgia yang sama
            // dengan seluruh halaman; SVG tidak mewarisi font dari induk HTML-nya
            // secara otomatis pada semua browser.
            className="font-serif"
            x={0}
            y={TEXT.baseline}
            fontSize={TEXT.size}
            fontStyle="italic"
            fontWeight={400}
            fill={SKILLS.ghost}
            textLength={VIEWBOX.width}
            lengthAdjust="spacingAndGlyphs"
          >
            TECH STACK
          </text>
        </svg>
      </div>
    </div>
  );
});
