'use client';

import { memo, useEffect, useState } from 'react';
import { SKILLS } from './palette';
import { CORE_DIP_VH, CORE_RISE_VH, MOTION, transition } from './motion';
import { OPEN_SPLIT_PERCENT } from './SkillsField';

interface OpenCoreSkillsProps {
  /** Daftar kemampuan inti milik teknologi yang sedang dibuka. */
  readonly items: readonly string[];
  /** Keadaan section, dipakai untuk gerak masuk dan keluarnya. */
  readonly isOpen: boolean;
  /** Teknologi sedang berganti; daftar ikut menukik turun dan memudar. */
  readonly swapping: boolean;
}

/**
 * Penempatan blok "Core Skills" terhadap section.
 */
const PLACEMENT = {
  topFromSplit: 7,
  left: '12vw',
  maxWidth: '52vw',
};

/** Ukuran dan warna judul. */
const HEADING = {
  size: 12,
  coreColor: SKILLS.yellow,
  gapBelow: 2.5,
};
const HEADING_2 = {
  size: 6,
  skillsColor: SKILLS.orange,
  gapBelow: 2.5,
};

/** Ukuran dan jarak antar butir daftar. */
const LIST = {
  size: 4.5,
  columnGap: '4vw',
  rowGap: '1.3vh',
  color: SKILLS.yellow,
  selectedColor: '#ffffff',
};

/** Bentuk penanda pilihan (kotak tosca miring). */
const SELECTION = {
  skew: -9,
  rotate: -1,
  padX: 0.4,
  padY: 0.14,
  color: '#138d7b',
};

export const OpenCoreSkills = memo(function OpenCoreSkills({
  items,
  isOpen,
  swapping,
}: OpenCoreSkillsProps) {
  const [selected, setSelected] = useState(0);

  /*
   * Butir terpilih dikembalikan ke yang pertama setiap kali daftarnya berganti.
   *
   * Dulu ini dikerjakan prop `key` di tempat pemakaian, dan itu lebih rapi —
   * tetapi `key` MEMASANG ULANG komponennya, dan komponen yang dipasang ulang
   * kehilangan posisi transisinya di tengah jalan. Sejak ada gerak pergantian
   * teknologi, pemasangan ulang berarti daftarnya melompat alih-alih naik.
   */
  useEffect(() => {
    setSelected(0);
  }, [items]);

  const rows = Math.ceil(items.length / 2);

  return (
    /* Sengaja BUKAN bagian dari OpenPanel yang naik.
     *
     * Kalau ikut di dalamnya, teks ini akan tiba bersamaan dengan bidang
     * merahnya dan seluruh layar berhenti bergerak di satu saat yang sama —
     * rapi, tapi mati. Dengan berdiri sendiri, ia berangkat dari titik yang jauh
     * lebih dekat (CORE_RISE_VH di bawah tempat akhirnya, kira-kira setengah
     * layar) dan bergerak lebih lambat, sehingga masih mengambang naik ketika
     * bidang merahnya sudah mengendap. Perbedaan kecepatan itulah yang memberi
     * kesan kedalaman: yang jauh bergerak lebih pelan daripada yang dekat.
     *
     * Peleburan opacity di sini aman — tidak ada mix-blend-mode di dalamnya,
     * berbeda dari lapisan bintang.
     */
    <div
      className="absolute"
      style={{
        top: `${OPEN_SPLIT_PERCENT + PLACEMENT.topFromSplit}%`,
        left: PLACEMENT.left,
        maxWidth: PLACEMENT.maxWidth,
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : `translateY(${CORE_RISE_VH}vh)`,
        transition: [
          transition('opacity', MOTION.core, isOpen),
          transition('transform', MOTION.core, isOpen),
        ].join(', '),
        // Tombol butir tidak boleh bisa ditekan saat section masih tertutup;
        // elemennya tetap terpasang, hanya tidak terlihat.
        pointerEvents: isOpen && !swapping ? 'auto' : 'none',
      }}
    >
      {/* Lapisan kedua khusus gerak pergantian teknologi.
       *
       * Terpisah dari pembungkus di atasnya karena keduanya memakai transform
       * DAN opacity dengan waktu yang berbeda: yang luar untuk buka-tutup
       * section, yang dalam untuk ganti teknologi. Satu elemen tidak bisa
       * memegang dua nilai transform sekaligus — yang belakangan ditulis
       * menghapus yang lain. Menumpuk dua elemen membuat keduanya berlipat
       * dengan sendirinya, dan itu memang yang diinginkan: saat section baru
       * membuka sambil teknologi berganti, kedua gerakan menjumlah tanpa satu
       * baris kode pun yang mengurusnya. */}
      <div
        style={{
          transform: swapping ? `translateY(${CORE_DIP_VH}vh)` : 'translateY(0)',
          opacity: swapping ? 0 : 1,
          transition: [
            transition('transform', MOTION.coreSwap, !swapping),
            transition('opacity', MOTION.coreSwap, !swapping),
          ].join(', '),
        }}
      >
      <h3 className="font-serif leading-none">
        <span
          className="font-bold"
          style={{
            fontSize: `${HEADING.size}vh`,
            marginBottom: `${HEADING.gapBelow}vh`,
            color: HEADING.coreColor,
          }}
        >
          Core
        </span>{' '}
        <span
          className="italic"
          style={{
            fontSize: `${HEADING_2.size}vh`,
            marginBottom: `${HEADING_2.gapBelow}vh`,
            color: HEADING_2.skillsColor,
          }}
        >
          Skills
        </span>
      </h3>

      <ul
        className="list-none"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateRows: `repeat(${rows}, auto)`,
          columnGap: LIST.columnGap,
          rowGap: LIST.rowGap,
          justifyItems: 'start',
        }}
      >
        {items.map((item, index) => {
          const isSelected = index === selected;

          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                className="relative block whitespace-nowrap font-serif leading-none"
                style={{
                  fontSize: `${LIST.size}vh`,
                  color: isSelected ? LIST.selectedColor : LIST.color,
                }}
              >
                {/* 📍 KOTAK PENANDA BACKGROUND (Membungkus di belakang teks tanpa -z-10 yang tenggelam) */}
                {isSelected && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute block z-0"
                    style={{
                      backgroundColor: SELECTION.color,
                      transform: `rotate(${SELECTION.rotate}deg) skewX(${SELECTION.skew}deg)`,
                      transformOrigin: 'center',
                      top: `${-SELECTION.padY}em`,
                      bottom: `${-SELECTION.padY}em`,
                      left: `${-SELECTION.padX}em`,
                      right: `${-SELECTION.padX}em`,
                    }}
                  />
                )}

                {/* 📍 TEKS UTAMA (Berada di z-10 di atas kotak penanda) */}
                <span className="relative z-10">{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
});