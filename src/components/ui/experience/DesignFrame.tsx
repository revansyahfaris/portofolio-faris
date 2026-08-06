// File: src/components/ui/experience/DesignFrame.tsx

import { memo } from 'react';
import type { ReactNode } from 'react';
import { CANVAS } from './canvas';

/**
 * Perbandingan lebar terhadap tinggi kanvas rancangan. 2880 / 1800 = 1.6.
 */
const ASPECT = CANVAS.width / CANVAS.height;

/**
 * Kerangka acuan bersama untuk seluruh komposisi Experience.
 *
 * MASALAH YANG DISELESAIKANNYA
 *
 * Setiap elemen di section ini sudah memakai satuan vh pada kedua sumbunya,
 * sehingga bentuk dan jarak antarelemen sudah sebangun di rasio layar mana pun.
 * Yang belum beres bukan ukurannya, melainkan TITIK NOLNYA: semua `left` diukur
 * dari tepi kiri viewport, sementara `EntryDetails` diukur dari tepi kanannya.
 *
 * Pada rasio 1.6 kedua tepi itu kebetulan berimpit dengan tepi kanvas, sehingga
 * keduanya memberi jawaban yang sama dan perbedaannya tidak pernah terlihat.
 * Begitu rasionya berubah, keduanya bergerak berlawanan.
 *
 * CARA KERJANYA
 *
 * Kotak ini berukuran tepat sebesar kanvas rancangan dalam satuan tinggi layar:
 * 160vh x 100vh. Karena ia yang menjadi induk berposisi, seluruh `left`, `top`,
 * dan `right` anak-anaknya kini diukur terhadap kotak ini — bukan terhadap
 * viewport.
 *
 * Nilai vh anak-anaknya TIDAK berubah artinya; vh selalu berarti tinggi
 * viewport, di mana pun elemennya berada. Jadi tidak ada satu pun ukuran atau
 * jarak yang bergeser. Yang berpindah hanya titik nolnya, dan berpindah
 * bersama-sama.
 *
 * Efek sampingnya yang menyelesaikan cacat kedua: tepi kanan kotak ini selalu
 * berjarak 160vh dari tepi kirinya, jadi menambatkan sesuatu dari kanan menjadi
 * setara dengan menambatkannya dari kiri. `EntryDetails` ikut sembuh tanpa satu
 * baris pun disentuh.
 *
 * KENAPA TIDAK MENGUBAH TAMPILAN LAYAR PENUH
 *
 * Pada rasio 1.6, 160vh sama persis dengan lebar viewport dan 100vh sama persis
 * dengan tingginya. Pemusatan mendatar karena itu menaruh tepi kirinya tepat di
 * nol, dan kotak ini berimpit sempurna dengan section. Setiap anak jatuh di
 * piksel yang sama seperti sebelumnya — bukan kira-kira, melainkan karena
 * pergeserannya memang nol.
 *
 * Dipusatkan MENDATAR SAJA. Tingginya selalu sama dengan tinggi viewport,
 * sehingga tidak ada sisa ruang tegak yang perlu dibagi; menambahkan pemusatan
 * tegak hanya akan menjadi perhitungan yang selalu menghasilkan nol.
 */
export const DesignFrame = memo(function DesignFrame({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <div
      className="absolute top-0"
      style={{
        width: `${ASPECT * 100}vh`,
        height: '100vh',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </div>
  );
});
