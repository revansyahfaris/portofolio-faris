'use client';

import { useEffect, useRef } from 'react';

/**
 * Mengatur properti CSS "content-visibility" pada elemen yang di-ref secara proaktif:
 * dipaksa ke "visible" begitu elemen mendekati viewport (rootMargin besar), lalu
 * dikembalikan ke "auto" saat elemen sudah jauh di luar layar.
 *
 * Latar belakang masalah: "content-visibility: auto" menghemat memori dengan melewati
 * layout & paint konten yang sedang di luar layar, tapi konsekuensinya adalah "burst"
 * kerja rendering besar yang mendadak begitu section itu baru masuk viewport — inilah
 * yang menyebabkan jank saat scroll dari section sebelumnya (Hero -> Profile).
 *
 * Dengan hook ini, "visible" dipaksa lebih awal (sebelum section benar-benar terlihat
 * di layar), sehingga proses render besar itu sudah selesai duluan saat section masih
 * di luar viewport, dan tidak ada lagi burst saat section benar-benar discroll masuk.
 * Manfaat hemat memori dari "auto" tetap didapat saat section benar-benar jauh dari
 * viewport — termasuk efek sampingnya: contain: paint yang implisit dari "auto" turut
 * mencegah elemen statis di dalam section (misalnya footer) ke-promote jadi layer GPU
 * terpisah akibat dianggap "overlap" dengan layer lain yang beranimasi di sekitarnya.
 *
 * Dipisah dari useViewportPresence karena rootMargin yang dibutuhkan jauh lebih besar
 * (perlu dipicu jauh sebelum section terlihat, bukan sesaat sebelum/sesudah).
 */
export function useContentVisibilityPreload<T extends HTMLElement>(
  rootMargin = '150% 0px'
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.contentVisibility = entry.isIntersecting ? 'visible' : 'auto';
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}
