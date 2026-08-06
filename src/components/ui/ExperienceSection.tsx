'use client';

import { useState } from 'react';
import { SectionShell } from './shared';
import {
  ArcTitle,
  DetailButton,
  EntryDetails,
  EntryNumber,
  EntryPager,
  EXPERIENCES,
  FIELD,
  FieldEllipse,
  PortraitTrack,
  RoleBanner,
} from './experience';

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

      {/* Isi entri, dirender paling depan supaya tidak pernah tertutup bentuk
          mana pun di belakangnya. */}
      {/* Nomor urut SECTION pada halaman, bukan nomor entri — angkanya tetap
          saat panah ditekan. */}
      <EntryNumber sectionNumber={4} />

      <RoleBanner role={entry.role} />
      <EntryDetails company={entry.company} project={entry.project} period={entry.period} />

      <DetailButton
        label={`${entry.role} di ${entry.company}`}
        onOpen={() => {
          // Layar rincian belum dirancang. Dibiarkan kosong dengan sengaja,
          // bukan dihubungkan ke tujuan sementara — tautan yang membawa ke
          // tempat yang salah lebih merugikan daripada tombol yang belum
          // membawa ke mana-mana.
        }}
      />

      <EntryPager
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        current={`${entry.role} di ${entry.company}`}
      />

      {/* Pengumuman untuk pembaca layar. Seluruh perubahan di section ini
          bersifat visual dan tidak satu pun terdengar; baris ini yang
          menyuarakannya, disembunyikan dari mata tetapi tetap dibacakan. */}
      <p role="status" aria-live="polite" className="sr-only">
        {`${entry.role}, ${entry.company}, ${entry.project}, ${entry.period}. Entri ${
          activeIndex + 1
        } dari ${total}.`}
      </p>
    </SectionShell>
  );
}
