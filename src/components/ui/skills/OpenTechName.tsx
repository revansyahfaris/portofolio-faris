import { memo } from 'react';
import { SKILLS } from './palette';
import { OPEN_SPLIT_PERCENT } from './SkillsField';

interface OpenTechNameProps {
  /** Nama teknologi yang sedang ditampilkan, mis. "Next.js". */
  readonly name: string;
}

/**
 * Penempatan nama teknologi pada keadaan terbuka.
 *
 * Ditambatkan ke tepi KIRI, bukan kanan: nama teknologi panjangnya berbeda-beda
 * ("React" lima huruf, "Tailwind CSS" dua belas), dan yang harus diam saat
 * berpindah ke teknologi berikutnya atau sebelumnya adalah titik MULAInya.
 * Dengan tambatan kanan, setiap pergantian akan menggeser huruf pertamanya —
 * mata membaca itu sebagai teks yang melompat, bukan teks yang berganti.
 *
 * Sisi tegaknya tidak ditulis sebagai angka tetap, melainkan dihitung dari
 * OPEN_SPLIT_PERCENT — sumber yang sama dengan bidang merah dan watermark. Jadi
 * begitu batas putih-merah digeser, teks ini ikut pindah sendiri dan tetap
 * menempel pada batasnya. Menuliskannya sebagai angka sendiri berarti tiga
 * tempat yang harus diingat untuk disetel bersamaan.
 */
const PLACEMENT = {
  /**
   * Jarak dasar teks ke garis batas putih-merah, dalam persen tinggi section.
   *
   * Positif = mengambang di atas batas. Negatif = turun menembus bidang merah.
   */
  gapFromSplit: -2.5,
  left: '-0.5vw',
  /** Ukuran huruf dalam vh. */
  size: 14,
};

/**
 * Nama teknologi yang sedang dibuka, duduk tepat di atas bidang merah.
 *
 * Warnanya putih di atas bidang yang juga putih — itu disengaja. Yang membuatnya
 * terbaca adalah watermark "TECH STACK" abu di belakangnya: huruf ini melubangi
 * watermark itu, sehingga bentuknya muncul dari kontras terhadap abu, bukan
 * terhadap latar. Konsekuensinya perlu diingat saat menyetel — memindahkannya ke
 * bagian bidang putih yang tidak tertimpa watermark akan membuatnya lenyap.
 * Kalau nanti ingin aman, ganti `color` di bawah ke SKILLS.ink.
 *
 * Huruf besar semua dilakukan lewat CSS, bukan dengan menulis "NEXT.JS" di data.
 * Datanya tetap "Next.js" sebagaimana nama resminya, sehingga tetap benar bila
 * kelak dipakai di tempat lain — pembaca layar, judul halaman, atau meta tag —
 * yang tidak menginginkan huruf besar semua.
 */
export const OpenTechName = memo(function OpenTechName({ name }: OpenTechNameProps) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        bottom: `${100 - OPEN_SPLIT_PERCENT + PLACEMENT.gapFromSplit}%`,
        left: PLACEMENT.left,
      }}
    >
      <span
        className="block whitespace-nowrap font-serif font-bold uppercase leading-none"
        style={{
          fontSize: `${PLACEMENT.size}vh`,
          color: SKILLS.redBright,
        }}
      >
        {name}
      </span>
    </div>
  );
});
