'use client';

import { useEffect, useRef } from 'react';

/**
 * Menambahkan/menghapus kelas CSS "fx-paused" pada elemen yang di-ref sesuai
 * apakah elemen tersebut sedang berada di dalam viewport atau tidak.
 *
 * Dipakai untuk menjeda animasi CSS bertenaga GPU (grunge-jitter, dsb.) ketika
 * elemen berada di luar layar, sehingga layer compositing yang dipakainya bisa
 * dilepas dan memori GPU tidak terus terpakai untuk konten yang tidak terlihat.
 * rootMargin diberi jarak 200px agar animasi berhenti sedikit sebelum benar-benar
 * keluar layar, menghindari efek "kedutan" saat batas viewport tepat terlewati.
 */
export function useViewportPresence<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      el.classList.toggle('fx-paused', !entry.isIntersecting);
    }, { rootMargin: '200px', ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}