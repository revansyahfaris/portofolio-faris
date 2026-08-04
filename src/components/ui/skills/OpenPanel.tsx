import { memo } from 'react';
import type { RefObject } from 'react';
import { OpenCategoryLabel } from './OpenCategoryLabel';
import { OpenTechName } from './OpenTechName';
import { OpenRedBand, SkillsField } from './SkillsField';
import { StackWatermark } from './StackWatermark';
import { MOTION, transition } from './motion';
import type { LetterSpec } from './types';

interface OpenPanelProps {
  readonly ref?: RefObject<HTMLDivElement | null>;
  readonly isOpen: boolean;
  readonly label: string;
  readonly letters?: readonly LetterSpec[];
  readonly techName: string;
  /** Nama teknologi sedang menukik turun untuk digantikan. */
  readonly swappingTech: boolean;
}

/**
 * Seluruh keadaan terbuka sebagai SATU benda yang naik dari bawah layar.
 *
 * Ini keputusan penting dan sengaja diambil begitu. Bidang putih, watermark,
 * bidang merah, nama kategori, dan nama teknologi tidak dianimasikan
 * sendiri-sendiri — semuanya anak dari satu kotak setinggi layar yang bergeser
 * dari translateY(100%) ke nol. Akibatnya:
 *
 * - Teks benar-benar terbawa oleh bidangnya, bukan kebetulan bergerak bersamaan.
 *   Tidak ada peluang salah satunya tertinggal saat waktunya disetel ulang,
 *   karena memang hanya ada satu gerakan.
 * - Kipas tertutupi secara berangsur oleh tepi atas kotak ini, persis seperti
 *   air yang naik. Tidak perlu memudarkan kipasnya, dan tidak perlu satu pun
 *   penghitung waktu untuk melepasnya dari susunan.
 * - Batas putih-merah menyapu ke atas dengan sendirinya sebagai akibat dari
 *   gerakan kotaknya, bukan sebagai animasi kedua yang harus disamakan.
 *
 * Tetap terpasang meski sedang tertutup, hanya digeser keluar layar. Itu yang
 * membuat gerakan menutup menjadi gratis dan pasti simetris: tidak ada keadaan
 * peralihan yang perlu dijaga, tidak ada penghitung waktu yang bisa melenceng
 * dari durasi CSS-nya.
 */
export const OpenPanel = memo(function OpenPanel({
  ref,
  isOpen,
  label,
  letters,
  techName,
  swappingTech,
}: OpenPanelProps) {
  return (
    <div
      ref={ref}
      // tabIndex -1 membuatnya dapat difokus lewat kode tanpa masuk urutan Tab.
      // Fokus dipindahkan ke sini saat rincian dibuka, supaya pembaca layar
      // mengumumkan layar barunya dan Escape punya tempat berpijak — tetapi
      // panel itu sendiri bukan kendali, jadi ia tidak boleh ikut disinggahi Tab.
      tabIndex={-1}
      role="group"
      aria-label={`Rincian ${label}: ${techName}`}
      aria-hidden={!isOpen}
      className="absolute inset-0 focus:outline-none"
      style={{
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: transition('transform', MOTION.panel, isOpen),
      }}
    >
      {/* Urutan tumpuk keadaan terbuka, tetap seperti semula: putih, lalu
          watermark, lalu merah yang memotong watermark tepat di batasnya. */}
      <SkillsField state="open" />
      <StackWatermark />
      <OpenRedBand />
      <OpenCategoryLabel label={label} letters={letters} />
      <OpenTechName name={techName} swapping={swappingTech} />
    </div>
  );
});
