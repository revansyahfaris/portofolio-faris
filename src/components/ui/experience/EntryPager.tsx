// File: src/components/ui/experience/EntryPager.tsx

'use client';

import { memo } from 'react';
import { toX, toY, uy } from './canvas';
import { XP } from './palette';
import { toOrigin, toTransform } from './transform';
import type { ShapeTransform } from './transform';

interface EntryPagerProps {
  readonly onPrev: () => void;
  readonly onNext: () => void;
  /** Nama entri yang sedang tampil, untuk label pembaca layar. */
  readonly current: string;
  /**
   * Perpindahan sedang berjalan.
   *
   * Tombolnya dinonaktifkan selama itu, dan ini bukan sekadar kerapian:
   * menekan lagi di tengah gerakan akan memulai perpindahan kedua sebelum yang
   * pertama sempat masuk tahap terakhirnya, sehingga isinya melompat tanpa
   * pernah menyusuri lintasannya. Menonaktifkan tombol menjadikan batasan itu
   * terlihat, alih-alih membiarkan pengguna menekan dan bingung kenapa
   * geraknya patah.
   */
  readonly busy?: boolean;
}

/** Detail bentuk untuk satu lapisan segitiga (SVG) */
interface TriangleLayer {
  readonly color: string;
  readonly scale: number;
  readonly x: number;
  readonly y: number;
  readonly rotate: number;
  readonly skewX: number;
  readonly skewY: number;
  readonly scaleX: number;
  readonly scaleY: number;
}

/** Konfigurasi mandiri untuk tiap tombol Pager */
interface PagerConfig extends ShapeTransform {
  /** Koordinat posisi tombol pada kanvas Photoshop */
  readonly x: number;
  readonly y: number;
  /** Ukuran dasar panah, dalam vh */
  readonly size: number;
  /** Jarak panah ke teks, dalam vh */
  readonly gap?: number;
  readonly facing: 'left' | 'right';
  readonly text: string;

  /** Layer segitiga independen */
  readonly layers: {
    readonly back: TriangleLayer;
    readonly front: TriangleLayer;
  };

  /** Penyetel teks independen */
  readonly labelRatio?: number;
  readonly labelOpacity?: number;
  readonly labelLetterSpacing?: string;
  /**
   * Geser teks label, dalam VH.
   *
   * Dulu piksel, dan itu cacat: panahnya berukuran vh sehingga ikut menyusut
   * saat layar mengecil, sementara geseran piksel tidak — labelnya merayap
   * menjauh dari panahnya. Nilainya dikonversi pada 1vh = 9px, jadi 8.667 di
   * sini sama persis dengan 78px pada viewport acuan.
   */
  readonly labelOffsetX?: number;
  /** Geser teks label tegak, dalam vh. Aturan yang sama. */
  readonly labelOffsetY?: number;
  readonly labelRotate?: number;
}

type PagerType = 'prev' | 'next';

/** Segitiga menghadap KANAN secara bawaan. Arah kiri diputar 180 deg. */
const TRIANGLE = '4,4 96,50 4,96';

/**
 * ================== KONFIGURASI MANDIRI PER-TOMBOL ==================
 *
 * Tidak ada lagi konfigurasi global LAYERS. Seluruh variabel (posisi,
 * bentuk segitiga front/back, hingga gaya teks) diatur terpisah total
 * untuk 'prev' dan 'next'.
 */
const PAGERS: Record<PagerType, PagerConfig> = {
  // 📍 1. KONFIGURASI LENGKAP TOMBOL PREV ("Back")
  prev: {
    x: 1483,
    y: 79,
    size: 5,
    gap: 1,
    rotate: -6,
    skewX: 0,
    skewY: 0,
    scaleX: 1,
    scaleY: 1,
    origin: '0 50%',
    facing: 'left',
    text: 'Back',

    // Segitiga Khusus Prev
    layers: {
      back: {
        color: XP.tealBright,
        scale: 2,
        x: -100,
        y: 0,
        rotate: -4,
        skewX: -25,
        skewY: 5,
        scaleX: 1.7,
        scaleY: 1,
      },
      front: {
        color: XP.teal,
        scale: 1.4,
        x: -120,
        y: 16,
        rotate: -4,
        skewX: -25,
        skewY: 5,
        scaleX: 1.7,
        scaleY: 1,
      },
    },

    // Teks Khusus Prev
    labelRatio: 0.62,
    labelOpacity: 0.5,
    labelLetterSpacing: '-0.1em',
    labelOffsetX: 8.667,
    labelOffsetY: 0,
    labelRotate: 5,
  },

  // 📍 2. KONFIGURASI LENGKAP TOMBOL NEXT ("Next")
  next: {
    x: 2045,
    y: 1325,
    size: 5,
    gap: 1,
    rotate: 16,
    skewX: 0,
    skewY: 0,
    scaleX: 1,
    scaleY: 1,
    origin: '0 50%',
    facing: 'right',
    text: 'Next',

    // Segitiga Khusus Next
    layers: {
      back: {
        color: XP.tealBright,
        scale: 2,
        x: 48,
        y: 62,
        rotate: 2,
        skewX: -10,
        skewY: 0,
        scaleX: 1.5,
        scaleY: 0.9,
      },
      front: {
        color: XP.teal,
        scale: 1,
        x: 16,
        y: 36,
        rotate: 2,
        skewX: -10,
        skewY: 0,
        scaleX: 1.5,
        scaleY: 0.9,
      },
    },

    // Teks Khusus Next
    labelRatio: 0.62,
    labelOpacity: 0.5,
    labelLetterSpacing: '-0.1em',
    labelOffsetX: 0,
    labelOffsetY: -1.778,
    labelRotate: -16,
  },
};

/** Komponen panah SVG yang merender layer dari config tombol terkait */
const Arrow = memo(function Arrow({
  layers,
  facing,
  size,
}: {
  readonly layers: PagerConfig['layers'];
  readonly facing: 'left' | 'right';
  readonly size: number;
}) {
  const layerTransform = (layer: TriangleLayer) =>
    [
      `translate(${layer.x} ${layer.y})`,
      `rotate(${layer.rotate} 50 50)`,
      'translate(50 50)',
      `scale(${layer.scale})`,
      'translate(-50 -50)',
      `skewX(${layer.skewX ?? 0})`,
      `skewY(${layer.skewY ?? 0})`,
      `scale(${layer.scaleX ?? 1} ${layer.scaleY ?? 1})`,
    ].join(' ');

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      style={{
        width: uy(size),
        height: uy(size),
        display: 'block',
        transform: facing === 'left' ? 'rotate(180deg)' : undefined,
        overflow: 'visible',
      }}
    >
      <polygon
        points={TRIANGLE}
        fill={layers.back.color}
        transform={layerTransform(layers.back)}
      />
      <polygon
        points={TRIANGLE}
        fill={layers.front.color}
        transform={layerTransform(layers.front)}
      />
    </svg>
  );
});

/** Satu tombol arah (Prev / Next) */
const PagerButton = memo(function PagerButton({
  type,
  ariaLabel,
  onClick,
  busy = false,
}: {
  readonly type: PagerType;
  readonly ariaLabel: string;
  readonly onClick: () => void;
  readonly busy?: boolean;
}) {
  const cfg = PAGERS[type];

  /*
   * Sentuhan tetikus menggeser tombol ke ARAH TUJUANNYA, bukan sekadar
   * membesarkannya. Isyaratnya karena itu ikut memberi tahu ke mana isinya akan
   * berpindah — "Back" condong ke kiri, "Next" ke kanan — sebelum tombolnya
   * ditekan sama sekali.
   *
   * Nama kelasnya ditulis UTUH di tiap cabang. Tailwind memindai kode sumber
   * sebagai teks dan tidak menjalankannya, jadi kelas yang dirangkai dari
   * potongan tidak akan pernah ikut tergenerasi — gagal diam-diam, tanpa error.
   */
  const nudge =
    cfg.facing === 'left'
      ? 'group-hover:-translate-x-[0.8vh] group-active:-translate-x-[1.4vh]'
      : 'group-hover:translate-x-[0.8vh] group-active:translate-x-[1.4vh]';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={busy}
      className="group absolute flex items-center cursor-pointer disabled:cursor-default"
      style={{
        left: toX(cfg.x),
        top: toY(cfg.y),
        gap: uy(cfg.gap ?? 1),
        transform: toTransform(cfg),
        transformOrigin: toOrigin(cfg),

        /*
         * Peredupan saat sedang berpindah dipasang di SINI, bukan lewat kelas
         * disabled:opacity — transform di atas sudah menempati properti yang
         * sama sekali berbeda, jadi keduanya tidak bertabrakan, dan menuliskan
         * opacity di satu tempat membuatnya terbaca berdampingan dengan
         * transisinya.
         */
        opacity: busy ? 0.4 : 1,
        transition: 'opacity 200ms ease-out',
      }}
    >
      {/*
        Geseran sentuhan dipasang pada pembungkus TERSENDIRI, bukan pada
        tombolnya. Tombolnya sudah memakai transform untuk penempatan, sudut,
        dan regangannya; menambahkan geseran ke rangkaian yang sama berarti
        menyusunnya ulang setiap kali salah satu penyetel berubah — dan
        geserannya akan ikut miring mengikuti sudut tombolnya.
      */}
      <span className={`flex items-center transition-transform duration-200 ease-out ${nudge}`} style={{ gap: uy(cfg.gap ?? 1) }}>
      {/* Panah SVG */}
      <Arrow layers={cfg.layers} facing={cfg.facing} size={cfg.size} />

      {/* Teks Label */}
      <span
        aria-hidden
        className="font-serif leading-none"
        style={{
          fontSize: uy(cfg.size * (cfg.labelRatio ?? 0.62)),
          color: XP.white,
          opacity: cfg.labelOpacity ?? 1,
          letterSpacing: cfg.labelLetterSpacing ?? 'normal',
          transform: `translate(${uy(cfg.labelOffsetX ?? 0)}, ${uy(cfg.labelOffsetY ?? 0)}) rotate(${cfg.labelRotate ?? 0}deg)`,
          transformOrigin: 'center',
        }}
      >
        {cfg.text}
      </span>
      </span>
    </button>
  );
});

export const EntryPager = memo(function EntryPager({
  onPrev,
  onNext,
  current,
  busy = false,
}: EntryPagerProps) {
  return (
    <>
      <PagerButton
        type="prev"
        ariaLabel={`Pengalaman sebelum ${current}`}
        onClick={onPrev}
        busy={busy}
      />
      <PagerButton
        type="next"
        ariaLabel={`Pengalaman setelah ${current}`}
        onClick={onNext}
        busy={busy}
      />
    </>
  );
});