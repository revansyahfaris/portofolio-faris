// File: src/components/ui/experience/EntryNumber.tsx

import { memo } from 'react';
import { toVh } from './canvas';
import { XP } from './palette';

interface EntryNumberProps {
  /**
   * Nomor urut SECTION ini pada halaman, bukan nomor entri pengalaman.
   *
   * Angkanya karena itu tidak berubah saat panah ditekan. Ia penanda posisi di
   * dalam situs — sama seperti "03" pada Skills — dan menautkannya ke nomor
   * entri akan membuatnya berkedip mengikuti isi yang sedang dilihat, sehingga
   * artinya berubah dari "kamu ada di section keempat" menjadi sesuatu yang
   * tidak jelas menghitung apa.
   */
  readonly sectionNumber?: number;
}

/** Penempatan angka besar di sudut kanan bawah. Angka sementara. */
const PLACEMENT = {
  x: 2150,
  y: 1325,
  /** Ukuran huruf dalam vh. */
  size: 28,
  rotate: -48,
};

/**
 * Nomor urut section, besar dan samar di sudut.
 *
 * aria-hidden, dan itu disengaja. Angka ini penanda tempat bagi mata, bukan
 * keterangan yang berdiri sendiri. Dibacakan pembaca layar, "nol empat" muncul
 * tanpa konteks apa pun di antara nama jabatan dan nama perusahaan, dan justru
 * mengaburkan.
 *
 * Nol di depan dibubuhkan padStart, bukan ditulis sebagai teks "04". Menuliskan
 * teksnya langsung berarti angka itu berhenti menjadi angka — dan nomor section
 * kesepuluh nanti akan menjadi "010" tanpa ada yang menyadarinya.
 */
export const EntryNumber = memo(function EntryNumber({
  sectionNumber = 4,
}: EntryNumberProps) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute block font-serif font-bold leading-none tabular-nums"
      style={{
        left: toVh(PLACEMENT.x),
        top: toVh(PLACEMENT.y),
        fontSize: `${PLACEMENT.size}vh`,
        color: XP.numberTint,
        transform: `rotate(${PLACEMENT.rotate}deg)`,
        transformOrigin: '0 0',
        mixBlendMode: 'luminosity',
      }}
    >
      {String(sectionNumber).padStart(2, '0')}
    </span>
  );
});
