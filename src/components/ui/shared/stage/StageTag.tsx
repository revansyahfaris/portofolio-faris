import { memo } from 'react';
import { STAGE, TYPE } from './theme';

interface StageTagProps {
  readonly label: string;
  /**
   * Cara tag digambar.
   * - "ghost" : hanya garis tepi, untuk daftar panjang yang tidak boleh berisik
   * - "solid" : bidang penuh, untuk penanda tunggal yang harus menonjol
   */
  readonly variant?: 'ghost' | 'solid';
  /** Warna dasar. Diperlukan karena tag bisa berada di atas bidang terang maupun gelap. */
  readonly on?: 'light' | 'dark';
}

/** Siluet tag: sudut kiri atas dan kanan bawah dipangkas kecil. */
const TAG_CLIP = 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)';

/**
 * Tag miring untuk nama teknologi dan kata kunci.
 *
 * Siluetnya dipangkas di dua sudut berseberangan, bukan persegi. Elemen sekecil ini
 * tidak akan diperhatikan satu per satu, tetapi tag muncul puluhan kali di seluruh
 * halaman — dan puluhan persegi kecil itulah yang paling menentukan apakah halaman
 * terbaca sebagai antarmuka permainan atau sebagai dasbor.
 *
 * Kemiringan diterapkan pada bidang lalu dibalik pada teks, sehingga hurufnya tetap
 * tegak. Daftar teknologi justru ingin dipindai cepat, dan huruf miring memperlambat
 * pembacaan tanpa menambah apa pun secara visual.
 */
export const StageTag = memo(function StageTag({
  label,
  variant = 'ghost',
  on = 'dark',
}: StageTagProps) {
  const base = on === 'light' ? STAGE.ink : STAGE.primary;

  return (
    <span
      className="inline-block px-2 py-[3px] font-mono font-bold uppercase tracking-wider"
      style={{
        fontSize: TYPE.micro,
        clipPath: TAG_CLIP,
        backgroundColor: variant === 'solid' ? base : on === 'light' ? 'rgba(6,16,13,0.1)' : 'rgba(25,227,177,0.14)',
        color: variant === 'solid' ? (on === 'light' ? STAGE.paper : STAGE.ink) : base,
        transform: 'skewX(-9deg)',
      }}
    >
      <span className="block skew-x-[9deg]">{label}</span>
    </span>
  );
});
