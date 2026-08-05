'use client';

import { useState } from 'react';
import { SectionShell } from './shared';
import { ArcTitle, EXPERIENCES, FIELD, FieldEllipse, PortraitTrack } from './experience';

/**
 * ExperienceSection.
 *
 * SEDANG DIBANGUN ULANG mengikuti rancangan barumu, satu elemen setiap kali.
 *
 * Sudah ada:
 *   1. Latar tosca penuh layar
 *   2. Judul EXPERIENCE yang melengkung, disusun per huruf
 *
 * Belum ada, urut dari lapisan belakang ke depan:
 *   3. Lingkaran trek putih beserta lingkaran pemotongnya
 *   4. Foto diri di dalam potongan itu
 *   5. Bidang segitiga merah berisi nama jabatan
 *   6. Nama perusahaan, nama proyek, dan rentang waktu
 *   7. Tombol Detail kuning
 *   8. Panah navigasi di atas tengah dan kanan bawah
 *   9. Angka besar di sudut kanan bawah
 *
 * Komponen rancangan lama (RankCard, ExperienceDetail, StageBackdrop, dan
 * kawan-kawannya) sengaja dilepas dari sini, bukan dihapus dari berkasnya —
 * supaya kalau arah barunya ternyata perlu diputar balik, yang lama masih utuh.
 * Hapus setelah rancangan ini selesai dan kamu setujui.
 *
 * Tombol di bawah bersifat sementara, hanya untuk meninjau perpindahan entri.
 */
export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = EXPERIENCES.length;
  const entry = EXPERIENCES[activeIndex];
  const step = (delta: number) => setActiveIndex((current) => (current + delta + total) % total);

  return (
    <SectionShell id="experience">
      <div aria-hidden className="absolute inset-0" style={{ backgroundColor: FIELD.background }} />

      {/* Dirender SEBELUM judulnya, jadi hurufnya berada di atas bidang ini. */}
      <FieldEllipse />
      <PortraitTrack imageSrc="/assets/experience/Experience_1.png" />
      <ArcTitle />

      {/* Dirender SESUDAH judulnya, jadi fotonya menimpa huruf yang lewat di
          belakangnya — sesuai rancangan, tempat huruf terpotong oleh trek. */}
      <PortraitTrack />

      {/* PERANCAH SEMENTARA — dihapus begitu navigasi sungguhannya dipasang. */}
      <div className="absolute bottom-4 left-4 z-50 flex gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          className="bg-black px-3 py-2 font-mono text-xs font-bold uppercase text-white"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          className="bg-black px-3 py-2 font-mono text-xs font-bold uppercase text-white"
        >
          ▶
        </button>
        <span className="bg-black px-3 py-2 font-mono text-xs font-bold uppercase text-white">
          {entry.company} · {entry.project} · {activeIndex + 1}/{total}
        </span>
      </div>
    </SectionShell>
  );
}
