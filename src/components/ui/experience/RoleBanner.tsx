// File: src/components/ui/experience/RoleBanner.tsx

import { memo } from 'react';
import { rectStyle, toX, toY, uy } from './canvas';
import type { CanvasRect } from './canvas';
import { XP } from './palette';

interface RoleBannerProps {
  /** Nama jabatan, mis. "UI/UX Designer & Frontend Dev". */
  readonly role: string;
}

/**
 * Kotak pembatas bidang merah, dari panel Transform.
 *
 * Angka sementara — perkiraanku dari gambar rancanganmu.
 */
const WEDGE: CanvasRect = {
  w: 1361,
  h: 483,
  x: 864,
  y: 14,
};

/**
 * Titik sudut bidangnya, dalam PERSEN terhadap kotak pembatas di atas.
 *
 * Persen, bukan piksel, supaya bentuknya ikut menyesuaikan begitu kotak
 * pembatasnya digeser atau diubah ukurannya. Menuliskannya dalam piksel berarti
 * setiap kali WEDGE disetel, kesepuluh angka di bawah harus dihitung ulang satu
 * per satu — dan bentuknya akan diam-diam melenceng kalau ada satu yang
 * terlewat.
 *
 * Urutannya searah jarum jam dari sudut kiri atas: pangkal atas, ujung runcing
 * di kanan, lalu pangkal bawah.
 */
const WEDGE_POINTS = [
  { x: 0, y: 0 },
  { x: 100, y: 77 },
  { x: 5.3, y: 100 },
];

/**
 * Penempatan nama jabatan.
 *
 * Sengaja BUKAN anak dari bidang merahnya. clip-path memotong seluruh isi
 * elemen yang dikenainya, termasuk teks — dan pada rancanganmu baris kedua
 * memang menjulur sedikit keluar dari bidangnya. Sebagai saudara, teksnya bebas
 * melewati tepi bidang tanpa satu pun pengecualian yang perlu ditulis.
 */
const ROLE = {
  x: 1000,
  y: 100,
  /** Lebar kotak teks, menentukan di mana barisnya patah. */
  w: 980,
  /** Ukuran huruf, dalam vh. */
  size: 8.5,
  /** Kemiringan mengikuti sudut bidangnya, dalam derajat. */
  rotate: 10,
};

/**
 * Bidang merah runcing beserta nama jabatan di atasnya.
 *
 * Bentuknya digambar dengan clip-path dan bukan sebagai SVG. Keduanya sanggup,
 * tetapi clip-path membiarkan elemennya tetap berupa div biasa — warnanya
 * ditentukan background, ukurannya oleh kotak pembatas yang sama seperti bentuk
 * lain di section ini, dan tidak ada viewBox kedua yang harus dijaga tetap
 * sejalan dengan koordinat kanvas.
 */
export const RoleBanner = memo(function RoleBanner({ role }: RoleBannerProps) {
  const clipPath = `polygon(${WEDGE_POINTS.map((p) => `${p.x}% ${p.y}%`).join(', ')})`;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{ ...rectStyle(WEDGE), backgroundColor: XP.red, clipPath }}
      />

      <p
        className="pointer-events-none absolute font-serif leading-tight"
        style={{
          left: toX(ROLE.x),
          top: toY(ROLE.y),
          width: toY(ROLE.w),
          fontSize: uy(ROLE.size),
          color: XP.white,
          transform: `rotate(${ROLE.rotate}deg)`,
          // Titik putarnya di ujung KIRI ATAS, bukan di tengah. Dengan poros di
          // tengah, memanjangkan teks akan menggeser kedua ujungnya sekaligus
          // dan pangkalnya ikut berpindah — padahal yang harus tetap menempel
          // pada pangkal bidang merah justru ujung kirinya.
          transformOrigin: '0 0',
          lineHeight: 1,
          letterSpacing: '-0.1em',
        }}
      >
        {role}
      </p>
    </>
  );
});
