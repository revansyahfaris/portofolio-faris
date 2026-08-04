'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Menandai satu kali saja ketika elemen mendekati viewport, lalu berhenti mengamati.
 *
 * Dipakai untuk menunda pekerjaan mahal — permintaan jaringan, pembuatan grafik —
 * sampai bagian halaman tersebut hampir terlihat. Berbeda dari useSectionReveal
 * yang bekerja lewat atribut CSS tanpa render ulang, hook ini memang mengembalikan
 * state React karena pemanggilnya perlu benar-benar mengubah apa yang dirender.
 *
 * rootMargin diberi jarak agak jauh (default 400px) supaya data sempat dimuat
 * sebelum pengguna benar-benar sampai, sehingga yang terlihat langsung isinya,
 * bukan kerangka pemuatan.
 */
export function useInViewOnce<T extends HTMLElement>(rootMargin = '400px') {
  const ref = useRef<T | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasEntered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasEntered(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, hasEntered]);

  return [ref, hasEntered] as const;
}
