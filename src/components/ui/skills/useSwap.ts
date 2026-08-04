'use client';

import { useEffect, useState } from 'react';

/**
 * Menahan sebuah nilai agar berganti hanya SESUDAH gerak keluarnya selesai.
 *
 * Dipakai untuk pergantian teknologi, yang bentuknya serah terima berurutan:
 * yang lama menukik turun dan memudar dulu, baru yang baru naik. CSS sendirian
 * tidak bisa melakukan ini — begitu isi elemen diganti, isinya berganti saat
 * itu juga, dan tidak ada cara menyatakan "tunggu sampai transisi selesai".
 *
 * Satu-satunya penghitung waktu di seluruh Skills section, dan sengaja
 * dikurung di sini. Durasinya dibaca dari MOTION yang sama dengan yang dipakai
 * CSS-nya, jadi tidak mungkin ada dua angka yang lepas sinkron.
 *
 * Pola yang dihasilkannya rapi: `leaving` bernilai true selama gerak turun.
 * Begitu nilai barunya masuk, `leaving` kembali false PADA RENDER YANG SAMA —
 * sehingga elemennya, yang saat itu sudah berada di titik bawah dan tembus
 * pandang, langsung mulai bergerak naik dengan isi yang sudah berganti. Tidak
 * perlu keadaan ketiga, dan tidak ada kedipan di titik serah terimanya.
 */
export function useSwap<T>(value: T, exitDuration: number) {
  const [shown, setShown] = useState(value);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (value === shown) return;

    setLeaving(true);
    const timer = window.setTimeout(() => {
      setShown(value);
      setLeaving(false);
    }, exitDuration);

    // Pembersihan penting kalau panah ditekan berkali-kali dengan cepat:
    // penghitung yang lama dibatalkan dan diganti yang baru, sehingga tidak ada
    // dua penghitung yang saling mendahului dan menampilkan nilai yang salah.
    return () => window.clearTimeout(timer);
  }, [value, shown, exitDuration]);

  return { shown, leaving };
}
