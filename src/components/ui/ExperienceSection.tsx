'use client';

import { useRef, useState } from 'react';
import { SectionShell } from './shared';
import {
  ArcTitle,
  DesignFrame,
  DetailButton,
  EntryDetails,
  EntryNumber,
  EntryPager,
  EntrySlide,
  EXPERIENCES,
  SLIDE,
  useArcSwap,
  FIELD,
  FieldEllipse,
  PortraitTrack,
  RoleBanner,
  ArcMotionDebug,
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

  /*
   * Arah langkah disimpan di ref, bukan di state.
   *
   * Ia hanya dibaca saat merender dan tidak pernah menjadi alasan untuk
   * merender ulang — nilainya selalu ditetapkan tepat sebelum activeIndex
   * berubah, dan perubahan itulah yang memicu render. Menyimpannya sebagai
   * state hanya menambah satu putaran render tanpa satu pun perbedaan hasil.
   */
  const direction = useRef(1);

  const step = (delta: number) => {
    direction.current = delta > 0 ? 1 : -1;
    setActiveIndex((current) => (current + delta + total) % total);
  };

  /*
   * Isi entri ditahan sampai gerak keluarnya selesai, sehingga pergantian
   * teksnya terjadi ketika sedang tidak terlihat.
   */
  const { shown, phase } = useArcSwap(activeIndex, SLIDE.exit.duration);
  const entry = EXPERIENCES[shown];

  return (
    <SectionShell id="experience">
      {/* Alas penuh layar, SENGAJA DI LUAR kerangka. Ia satu-satunya bidang yang
          memang harus mengisi viewport apa pun rasionya; menaruhnya di dalam
          kerangka akan menyisakan pita putih di kedua tepi begitu layar lebih
          lebar daripada kanvasnya. */}
      <div aria-hidden className="absolute inset-0" style={{ backgroundColor: FIELD.background }} />

      {/* Kerangka acuan bersama: kotak sebesar kanvas rancangan, dipusatkan.
          Seluruh isinya memakai koordinat yang sama seperti sebelumnya — yang
          berubah hanya titik nolnya, dan berubah bersama-sama. */}
      <DesignFrame>
        {/* Dirender SEBELUM judulnya, jadi hurufnya berada di atas bidang ini. */}
        <FieldEllipse />
        <PortraitTrack imageSrc="/assets/experience/Experience_1.png" />
        <ArcTitle />
        <ArcMotionDebug />

        {/* Nomor urut SECTION pada halaman, bukan nomor entri — angkanya tetap
            saat panah ditekan. */}
        <EntryNumber sectionNumber={4} />

        {/* Seluruh isi entri dibungkus SATU pembungkus gerak. Bidang merah,
            ketiga baris teks, dan tombolnya masing-masing punya sudut dan poros
            sendiri; menganimasikannya satu per satu berarti tujuh gerakan yang
            harus dijaga sepakat, dan cukup satu yang berbeda kurvanya untuk
            membuat kelompoknya tampak terurai saat berpindah. */}
        <EntrySlide phase={phase} direction={direction.current}>
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

        </EntrySlide>

        <EntryPager
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          current={`${entry.role} di ${entry.company}`}
          busy={phase !== 'idle'}
        />
      </DesignFrame>

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
