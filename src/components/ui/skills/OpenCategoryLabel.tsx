import { memo } from 'react';
import { CategoryLabel } from './CategoryLabel';
import { SKILLS } from './palette';
import type { LetterSpec } from './types';

interface OpenCategoryLabelProps {
  readonly label: string;
  readonly letters?: readonly LetterSpec[];
}

/**
 * Penempatan nama kategori pada keadaan terbuka.
 *
 * Ditambatkan ke tepi KANAN, bukan kiri: yang dikunci posisinya adalah ujung
 * kanan teks, dan teksnya tumbuh ke kiri dari sana.
 *
 * Konsekuensinya perlu disadari — nama kategori yang panjangnya berbeda akan
 * MULAI di titik yang berbeda. "FRONTEND" menjulur lebih jauh ke kiri daripada
 * "DESIGN". Di sini justru itu yang diinginkan: label ini bertetangga dengan
 * wordmark "Skills" di kanannya, dan jarak ke tetangga itulah yang harus tetap,
 * bukan jaraknya ke tepi kiri layar yang tidak ada apa-apanya.
 *
 * (Berbeda dari label pada layar daftar, yang justru ditambatkan ke kiri karena
 * di sana yang harus rata adalah titik mulainya.)
 */
const PLACEMENT = {
  bottom: '0vh',
  right: '41vw',
  size: 15,
};

/**
 * Nama kategori di bagian bawah pada keadaan terbuka.
 *
 * Memakai komponen CategoryLabel yang sama persis dengan layar daftar, dan tatanan
 * per hurufnya dibaca dari data kategori yang sedang aktif — bukan disalin ulang
 * di sini. Ini yang menjaga hurufnya tertata sama di kedua layar: kalau nanti
 * tatanan "FRONTEND" disetel lagi di constants.ts, keduanya ikut berubah bersamaan.
 * Menyalinnya berarti dua tatanan yang harus diingat untuk disamakan setiap kali,
 * dan cepat atau lambat salah satunya akan tertinggal.
 *
 * isActive selalu true: kategori yang layar rinciannya sedang dibuka memang
 * kategori terpilih, jadi warnanya putih penuh tanpa peredupan.
 *
 * surfaceColor diisi merah terang karena label ini menimpa bidang merah bawah.
 * Nilainya dipakai huruf ber-invert sebagai warna teksnya, sehingga huruf "O"
 * yang berkotak tampil merah persis sewarna bidang di belakangnya.
 */
export const OpenCategoryLabel = memo(function OpenCategoryLabel({
  label,
  letters,
}: OpenCategoryLabelProps) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ bottom: PLACEMENT.bottom, right: PLACEMENT.right }}
    >
      <CategoryLabel
        text={label}
        letters={letters}
        isActive
        size={PLACEMENT.size}
        surfaceColor={SKILLS.redBright}
      />
    </div>
  );
});
