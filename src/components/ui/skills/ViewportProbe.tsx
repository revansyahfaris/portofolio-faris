'use client';

import { useEffect, useState } from 'react';

/**
 * SEMENTARA. Hapus begitu DESIGN_ASPECT sudah disetel.
 *
 * Menampilkan ukuran viewport yang sebenarnya beserta rasionya, langsung di
 * layar. Sengaja tidak diukur lewat DevTools: panel DevTools yang menempel ikut
 * mengecilkan viewport yang sedang diukur, sehingga angka yang terbaca justru
 * bukan angka yang dipakai saat menyetel rancangannya.
 */
export function ViewportProbe() {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const read = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, []);

  // null pada render pertama: server tidak punya window, dan menebaknya akan
  // membuat markup server berbeda dari klien.
  if (!size) return null;

  return (
    <div className="pointer-events-none absolute right-4 top-4 z-50 bg-black px-3 py-2 text-right font-mono text-xs font-bold leading-relaxed text-white">
      <div>
        {size.w} × {size.h}
      </div>
      <div className="text-[#7EE8D8]">rasio {(size.w / size.h).toFixed(4)}</div>
    </div>
  );
}
