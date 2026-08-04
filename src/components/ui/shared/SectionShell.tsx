'use client';

import type { ReactNode } from 'react';
import { useContentVisibilityPreload } from '@/hooks/useContentVisibilityPreload';

interface SectionShellProps {
  /** Anchor id section, harus cocok dengan targetId pada menu HeroSection. */
  readonly id: string;
  /**
   * Bentuk section.
   *
   * Saat ini hanya ada satu nilai, "stage": tepat satu layar penuh, tanpa gulir di
   * dalamnya, tanpa gaya bawaan apa pun. Properti ini dipertahankan sebagai
   * penanda niat yang eksplisit di tiap pemanggilnya — membacanya di berkas section
   * langsung memberi tahu bahwa isi section itu wajib muat dalam satu layar.
   */
  readonly variant?: 'stage';
  /** Kelas tambahan untuk elemen <section> (latar, warna teks, dan sejenisnya). */
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Kerangka standar untuk seluruh section di bawah Hero.
 *
 * Tanggung jawabnya sengaja dipersempit hanya pada hal yang tidak terlihat:
 * anchor id, titik scroll snap, dan strategi render. Latar, tata letak, dan palet
 * ditentukan sepenuhnya oleh masing-masing section — justru perbedaan ketiganya
 * yang membuat tiap section terasa seperti layar tersendiri, bukan satu templat
 * yang diulang dengan warna berbeda.
 *
 * Yang ditegakkan di sini:
 *
 * - h-[100dvh] dan overflow-hidden. Ini yang menjadikan aturan "satu section =
 *   satu layar" berlaku secara struktural, bukan sekadar disepakati. Section yang
 *   isinya melebihi layar akan terpotong dan langsung terlihat saat pengembangan,
 *   alih-alih diam-diam menambah panjang halaman.
 * - contentVisibility "auto" yang dikelola useContentVisibilityPreload. Sembilan
 *   layar penuh dalam satu halaman akan sangat mahal bila semuanya di-layout sejak
 *   awal; hook tersebut memaksa tiap section selesai dirender tepat sebelum masuk
 *   viewport, sehingga hematnya didapat tanpa lonjakan kerja saat digulir.
 * - scrollSnapAlign, dipasang di sini agar seluruh section punya titik snap yang
 *   persis sejajar dengan batas atasnya.
 */
export function SectionShell({ id, className = '', children }: SectionShellProps) {
  const sectionRef = useContentVisibilityPreload<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative h-[100dvh] w-full overflow-hidden font-sans ${className}`}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '100vh',
        scrollSnapAlign: 'start',
      }}
    >
      {children}
    </section>
  );
}
