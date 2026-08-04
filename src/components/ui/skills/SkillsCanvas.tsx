import { memo } from 'react';
import type { ReactNode } from 'react';
import { u, uw } from './responsive';

/**
 * Kanvas berrasio tetap tempat seluruh komposisi keadaan tertutup diletakkan.
 *
 * Ini bagian yang tidak bisa diselesaikan oleh satuan saja. Satuan menyeragamkan
 * UKURAN, kanvas menyeragamkan TITIK ACUAN. Tanpanya, kipas yang ditambatkan ke
 * tepi kanan layar dan bintang yang ditambatkan ke tepi kiri akan tetap saling
 * menjauh saat lebar layar berubah — masing-masing setia pada tepinya sendiri.
 *
 * Dengan kanvas, keduanya menjadi anak dari satu kotak yang rasionya selalu
 * 1.6, sehingga jarak antarkeduanya terkunci. Kotaknya diletakkan di tengah dan
 * dibiarkan meluber ke luar layar; tepi section yang memotongnya.
 *
 * Efek sampingnya menguntungkan: nilai persen di dalam kanvas kembali bermakna
 * tepat, karena diukur terhadap kotak yang rasionya sama dengan rasio rancangan.
 * VANISHING_POINT karena itu tidak perlu diubah sama sekali.
 */
export const SkillsCanvas = memo(function SkillsCanvas({ children }: { children: ReactNode }) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: uw(100),
        height: u(100),
        transform: 'translate(-50%, -50%)',
      }}
    >
      {children}
    </div>
  );
});