'use client';

import { memo } from 'react';
import { SKILLS } from './palette';
import { MOTION, SHEET_TRANSITION, transition } from './motion';
import { vw } from './units';

interface SkillsPagerProps {
  readonly isOpen: boolean;
  readonly onPrev: () => void;
  readonly onNext: () => void;
  readonly onClose: () => void;
  /** Nama yang sedang tampil, untuk label pembaca layar. */
  readonly current: string;
}

/**
 * Penempatan kendali arah pada kedua keadaan.
 *
 * Nilai mendatar ditulis dalam satuan vw lalu dilewatkan vw() saat dipakai,
 * seperti seluruh nilai mendatar lain di section ini — supaya jaraknya ikut
 * tinggi dan tidak melar sendiri saat rasio layar berubah.
 *
 * Pada keadaan terbuka, kendalinya MENGAPIT daftar Core Skills: kembali di
 * kirinya, maju-mundur di kanannya. Penempatan itu menyatakan hubungannya tanpa
 * satu kata pun — yang di kanan mengganti isi daftar, yang di kiri meninggalkan
 * daftarnya sama sekali. Menumpuk ketiganya di satu sudut akan membuat
 * "kembali" terbaca sebagai saudara dari "berikutnya", padahal keduanya
 * berbeda tingkat.
 */
const PLACEMENT = {
  closed: {
    arrows: { right: 2, top: 40 },
    /** Pengali terhadap PLACEMENT.size. */
    scale: 1,
  },
  open: {
    arrows: { right: 49, top: 45.5 },
    back: { right: 110, top: 45.5 },
    /**
     * Sengaja lebih kecil daripada gugus keadaan tertutup.
     *
     * Di layar daftar, panah itu kendali utama seluruh section — tidak ada hal
     * lain untuk ditekan. Di layar rincian, yang utama adalah daftar Core Skills
     * itu sendiri dan panahnya turun pangkat menjadi pelengkap. Perbedaan ukuran
     * itu yang menyatakan pergantian peran tanpa satu kata pun, sekaligus
     * menegaskan bahwa keduanya benda yang BERBEDA — bukan satu panah yang
     * berpindah tempat.
     */
    scale: 0.78,
  },
  /** Jarak antar segitiga maju-mundur, dalam vh. */
  gap: 3.5,
  /** Panjang sisi segitiga, dalam vh. */
  size: 5.5,
};

/** Geseran bayangan kuning di belakang segitiga, dalam satuan viewBox. */
const YELLOW_OFFSET = { x: 9, y: 0 };

const PREV_YELLOW_OFFSET = { x: -9, y: 0 };

/** Segitiga kecil tosca sebagai aksen pada tombol "berikutnya". */
const ACCENT_SCALE = 0.7;

/** Segitiga menghadap ke atas. Arah lain didapat dengan memutarnya. */
const TRIANGLE = '50,4 96,92 4,92';

const ROTATION = { up: 270, down: 90, back: 270 } as const;

/**
 * Satu segitiga.
 *
 * Dua ragam, dan perbedaannya disengaja: maju-mundur PEJAL dengan bayangan
 * kuning, kembali hanya BERGARIS tanpa bayangan. Keduanya tetap bentuk yang
 * sama supaya masih terbaca satu keluarga, tetapi bobotnya berbeda jauh —
 * yang pejal mengubah isi, yang bergaris meninggalkan layar. Membedakannya
 * lewat berat, bukan lewat bentuk atau warna, membuat perbedaannya terbaca
 * bahkan pada penglihatan yang tidak membedakan warna.
 *
 * Bayangannya digambar sebagai poligon KEDUA yang digeser, bukan drop-shadow.
 * Alasannya bukan selera: drop-shadow melunakkan tepinya, dan seluruh bahasa
 * visual layar ini bertepi tegas tanpa satu pun sudut membulat.
 *
 * Semua arah berasal dari SATU bentuk yang diputar. Menggambar empat daftar
 * koordinat berarti empat kesempatan agar salah satunya sedikit berbeda
 * proporsinya, dan perbedaan sekecil itu paling mengganggu justru ketika dua di
 * antaranya berdampingan.
 */
const Triangle = memo(function Triangle({
  facing,
  color,
  variant,
  scale = 1,
  withAccent = false,
}: {
  readonly facing: keyof typeof ROTATION;
  readonly color: string;
  readonly variant: 'solid' | 'outline';
  readonly scale?: number;
  readonly withAccent?: boolean;
}) {
  const side = PLACEMENT.size * scale;
  const isSolid = variant === 'solid';

  const offset = facing === 'up' ? PREV_YELLOW_OFFSET : YELLOW_OFFSET;

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      style={{
        width: `${side}vh`,
        height: `${side}vh`,
        display: 'block',
        transform: `rotate(${ROTATION[facing]}deg)`,
        // overflow terlihat supaya goresan tepi tidak terpotong separuh.
        overflow: 'visible',
      }}
    >
      {isSolid && (
        <polygon
          points={TRIANGLE}
          fill={SKILLS.starBack}
          transform={`translate(${offset.x} ${offset.y})`}
        />
      )}

      <polygon
        points={TRIANGLE}
        fill={isSolid ? color : 'none'}
        stroke={isSolid ? 'none' : color}
        strokeWidth={isSolid ? 0 : 9}
        strokeLinejoin="miter"
        style={{ transition: SHEET_TRANSITION }}
      />

      {withAccent && (
        <polygon
          points={TRIANGLE}
          fill={SKILLS.teal}
          // Diperkecil dari titik tengah, jadi ia duduk di dalam segitiga
          // induknya tanpa perlu satu pun koordinat baru dihitung tangan.
          transform={`translate(50 50) scale(${ACCENT_SCALE}) translate(-50 -50)`}
        />
      )}
    </svg>
  );
});

/** Tombol pembungkus segitiga. Sentuhan tetikus menggeser sedikit ke arah tujuannya. */
const PagerButton = memo(function PagerButton({
  label,
  onClick,
  facing,
  color,
  variant = 'solid',
  scale,
  withAccent,
}: {
  readonly label: string;
  readonly onClick: () => void;
  readonly facing: keyof typeof ROTATION;
  readonly color: string;
  readonly variant?: 'solid' | 'outline';
  readonly scale?: number;
  readonly withAccent?: boolean;
}) {
  /*
   * Nama kelasnya ditulis UTUH di tiap cabang, bukan dirangkai dari potongan.
   * Tailwind memindai kode sumber sebagai teks biasa dan tidak menjalankannya,
   * jadi `hover:${nudge}` menghasilkan kelas yang tidak pernah ikut tergenerasi —
   * gagal diam-diam, tanpa error, dan baru ketahuan saat melihat hasilnya.
   */
  const nudge =
    facing === 'up'
      ? 'hover:-translate-y-[0.5vh]'
      : facing === 'down'
        ? 'hover:translate-y-[0.5vh]'
        : 'hover:-translate-x-[0.5vh]';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`block cursor-pointer transition-transform duration-200 ease-out ${nudge}`}
    >
      <Triangle
        facing={facing}
        color={color}
        variant={variant}
        scale={scale}
        withAccent={withAccent}
      />
    </button>
  );
});

export const SkillsPager = memo(function SkillsPager({
  isOpen,
  onPrev,
  onNext,
  onClose,
  current,
}: SkillsPagerProps) {
  const subject = isOpen ? 'teknologi' : 'kategori';

  /*
   * Warna isi mengikuti latar yang ada DI BALIKNYA, dan latar itu berganti
   * bersama keadaan section.
   *
   * Saat tertutup, gugus ini duduk di sekitar 40vh — dan pada garis bujur itu
   * bidang merah teratas baru mulai jauh di bawahnya, jadi latarnya putih dan
   * segitiga putih akan lenyap sepenuhnya kecuali bayangan kuningnya. Saat
   * terbuka, batas putih-merah ada di 34% sehingga titik yang sama sudah berada
   * di atas bidang merah, dan justru hitam yang lenyap.
   */
  const color = isOpen ? SKILLS.white : SKILLS.ink;

  return (
    <>
      {/* DUA GUGUS TERPISAH, bukan satu gugus yang berpindah tempat.
          Sebelumnya keduanya satu elemen dengan `right` yang ditransisikan, dan
          hasilnya terbaca sebagai panah yang sama meluncur menyeberangi layar —
          padahal yang dikendalikannya berganti sama sekali, dari kategori
          menjadi teknologi. Benda yang bergerak menyatakan "aku masih aku";
          yang perlu dinyatakan di sini justru sebaliknya. */}

      {/* Gugus keadaan tertutup — berpindah kategori. */}
      <div
        className="absolute flex flex-row items-center"
        style={{
          right: vw(PLACEMENT.closed.arrows.right),
          top: `${PLACEMENT.closed.arrows.top}vh`,
          gap: `${PLACEMENT.gap}vh`,
          opacity: isOpen ? 0 : 1,
          transition: transition('opacity', MOTION.panel, !isOpen),
          pointerEvents: isOpen ? 'none' : 'auto',
        }}
        aria-hidden={isOpen}
      >
        <PagerButton
          label={`Kategori sebelum ${current}`}
          onClick={onPrev}
          facing="up"
          color={color}
          scale={PLACEMENT.closed.scale}
          withAccent
        />
        <PagerButton
          label={`Kategori setelah ${current}`}
          onClick={onNext}
          facing="down"
          color={color}
          scale={PLACEMENT.closed.scale}
        />
      </div>

      {/* Gugus keadaan terbuka — berpindah teknologi. */}
      <div
        className="absolute flex flex-row items-center"
        style={{
          right: vw(PLACEMENT.open.arrows.right),
          top: `${PLACEMENT.open.arrows.top}vh`,
          gap: `${PLACEMENT.gap}vh`,
          opacity: isOpen ? 1 : 0,
          transition: transition('opacity', MOTION.core, isOpen),
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        aria-hidden={!isOpen}
      >
        <PagerButton
          label={`${subject} sebelum ${current}`}
          onClick={onPrev}
          facing="up"
          color={color}
          scale={PLACEMENT.open.scale}
          withAccent
        />
        <PagerButton
          label={`${subject} setelah ${current}`}
          onClick={onNext}
          facing="down"
          color={color}
          scale={PLACEMENT.open.scale}
        />
      </div>

      {/* Kembali. Hanya bermakna pada keadaan terbuka, jadi hanya tampak di
          sana — tetapi tetap terpasang dan sekadar dipudarkan, supaya gerak
          keluarnya ada dan tidak sekadar lenyap. */}
      <div
        className="absolute"
        style={{
          right: vw(PLACEMENT.open.back.right),
          top: `${PLACEMENT.open.back.top}vh`,
          opacity: isOpen ? 1 : 0,
          transition: transition('opacity', MOTION.core, isOpen),
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        aria-hidden={!isOpen}
      >
        <PagerButton
          label="Kembali ke daftar kemampuan"
          onClick={onClose}
          facing="back"
          color={color}
          variant="outline"
          scale={0.85}
        />
      </div>
    </>
  );
});
