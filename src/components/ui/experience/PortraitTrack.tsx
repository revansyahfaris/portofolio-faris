// File: src/components/ui/experience/PortraitTrack.tsx

import { memo } from 'react';
import { pct, rectStyle, uy } from './canvas';
import { FIELD } from './palette';
import type { CanvasRect } from './canvas';

/** 📍 Lingkaran Pemotong (Cutout) tempat foto ditaruh */
const CUTTER: CanvasRect = {
  w: 3029,
  h: 1558,
  x: 1790,
  y: -340,
};

const ROTATION_ANGLE = -25;

interface PortraitTrackProps {
  /** URL foto karakter/diri */
  readonly imageSrc?: string;
  readonly scale?: number;
  /** Geser foto mendatar dasar, dalam VH */
  readonly offsetX?: number;
  /** Geser foto tegak dasar, dalam VH */
  readonly offsetY?: number;

  // ============ PENYETEL KHUSUS WINDOWED ============
  // Ketiganya dikalikan max(0px, 100vw - 160vh), yang bernilai nol pada rasio
  // rancangan. Angka berapa pun di sini karena itu tidak bisa menyentuh
  // tampilan layar penuh.

  /**
   * Geser LUBANG POTONGNYA saat layar melebar. Positif ke kanan.
   *
   * Diterapkan pada left/top, bukan pada transform. Lubangnya diputar -25
   * derajat; kalau geserannya ikut masuk ke rangkaian transform, ia akan
   * bergerak menyusuri arah miring itu alih-alih lurus ke kanan di layar.
   */
  readonly driftX?: number;
  /** Geser lubang potong tegak. Positif ke bawah. */
  readonly driftY?: number;
  /**
   * Pembesaran foto saat layar melebar, dalam PERSEN per piksel kelebihan lebar.
   *
   * Diterapkan pada lebar dan tinggi gambarnya, BUKAN lewat scale(). scale()
   * menuntut bilangan tanpa satuan, dan bilangan itu tidak bisa diturunkan dari
   * ukuran layar — menjumlahkan bilangan dengan panjang menghasilkan nilai tidak
   * sah, dan CSS membuang SELURUH deklarasi yang memuatnya. Kalau dipaksakan di
   * dalam transform, rotate dan translate di sebelahnya ikut mati.
   *
   * Lebar dan tinggi menerima persen, dan `calc(95% + 12px)` sah. Itu sebabnya
   * penyetelan ukuran dikerjakan di sana.
   */
  readonly sizeDrift?: number;
}

export const PortraitTrack = memo(function PortraitTrack({
  imageSrc,
  scale = 0.95,
  offsetX = -50,
  offsetY = 22.222,

  // 📍 SETEL DI SINI, atau lewat props dari ExperienceSection.
  driftX = 0.01,
  driftY = 0,
  sizeDrift = 0,
}: PortraitTrackProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute overflow-hidden"
      style={{
        ...rectStyle(CUTTER, { x: driftX, y: driftY }),
        borderRadius: '50%',
        /*
         * Diisi warna alas halaman. INI YANG MENGGANTIKAN mask di FieldEllipse.
         *
         * Karena latar di belakang bidang tosca memang putih, lingkaran putih di
         * atasnya menghasilkan gambar yang sama persis dengan lubang tembus —
         * tetapi lubangnya kini ditentukan SATU bentuk saja, bukan dua yang harus
         * dijaga sepakat di dua sistem koordinat yang berbeda.
         *
         * Syarat yang harus dijaga: jangan ada elemen lain dirender di antara
         * FieldEllipse dan komponen ini. Kalau ada, ia akan tertutup lingkaran
         * ini alih-alih terlihat lewat lubangnya.
         */
        backgroundColor: FIELD.background,
        transform: `rotate(${ROTATION_ANGLE}deg)`,
        transformOrigin: 'center',
      }}
    >
      {/* Jika ada foto, tampilkan di dalam lingkaran cutout ini */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Portrait"
          className="absolute object-contain object-center"
          style={{
            /*
             * Ukuran dinyatakan sebagai persen kotak pemotongnya, bukan lewat
             * scale() pada transform.
             *
             * Hasilnya sama persis: object-contain menyesuaikan gambar terhadap
             * kotaknya secara sebanding, jadi kotak 95 persen memberi gambar
             * seukuran kotak penuh yang diskala 0.95. Bedanya, persen boleh
             * dijumlahkan dengan panjang di dalam calc() — sehingga penyetelan
             * windowed bisa ikut masuk tanpa membuat nilainya tidak sah.
             */
            width: pct(scale * 100, sizeDrift),
            height: pct(scale * 100, sizeDrift),

            /*
             * Dipusatkan dengan inset nol dan margin auto, bukan dengan
             * translate(-50%, -50%).
             *
             * Alasannya: transform di bawah sudah dipakai untuk memutar dan
             * menggeser, dan menambahkan pemusatan ke rangkaian yang sama akan
             * membuat geserannya bekerja pada kerangka yang sudah berputar —
             * artinya offsetX tidak lagi berarti "ke kanan di layar". Pemusatan
             * lewat margin bekerja di luar transform, jadi keduanya tidak
             * saling mengganggu.
             */
            inset: 0,
            margin: 'auto',

            transform: `rotate(${-ROTATION_ANGLE}deg) translate(${uy(offsetX)}, ${uy(offsetY)})`,
            transformOrigin: 'center',
          }}
        />
      ) : null}
    </div>
  );
});