'use client';

import { useState } from 'react';
import { SectionShell } from './shared';
import {
  SKILL_CATEGORIES,
  SkillsField,
  SkillsFurniture,
  SkillsStars,
  StackWatermark,
  OpenRedBand,
  OpenCategoryLabel,
  OpenTechName,
  OpenCoreSkills,
} from './skills';
import type { FieldSlot } from './skills';

/**
 * Mengambil tiga kategori yang menempati slot atas, tengah, dan bawah.
 *
 * Indeksnya dibuat melingkar dengan modulo, sehingga kategori pertama tetap punya
 * tetangga di atasnya (yaitu kategori terakhir) dan tidak pernah ada slot kosong.
 * Penambahan panjang daftar sebelum modulo diperlukan karena operator % di
 * JavaScript mengembalikan nilai negatif untuk bilangan negatif — tanpa itu,
 * indeks -1 tidak menghasilkan entri terakhir melainkan kesalahan diam-diam.
 */
function getSlots(activeIndex: number): readonly [FieldSlot, FieldSlot, FieldSlot] {
  const total = SKILL_CATEGORIES.length;
  const at = (offset: number): FieldSlot => {
    const category = SKILL_CATEGORIES[(activeIndex + offset + total) % total];
    return { label: category.bannerLabel, letters: category.letters };
  };
  return [at(-1), at(0), at(1)];
}

/**
 * SkillsSection.
 *
 * SEDANG DIBANGUN ULANG, satu elemen setiap kali.
 *
 * Sudah ada: bidang warna (elemen 2) dan label kategori (elemen 3).
 *
 * Belum ada, urut dari lapisan belakang ke depan:
 *   4. Penomoran besar "02" dan wordmark "Skills"
 *   5. Bintang dan segitiga
 *   6. Interaksi sebenarnya — panah atas/bawah, klik untuk membuka
 *   7. Isi keadaan terbuka (nama teknologi, daftar Core Skills)
 *   8. Sapuan transisi antar keadaan
 *
 * Tombol-tombol di bawah bersifat sementara, hanya untuk meninjau. Nanti
 * digantikan navigasi papan ketik dan klik pada bidangnya langsung.
 */
export default function SkillsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [techIndex, setTechIndex] = useState(0);

  const category = SKILL_CATEGORIES[activeIndex];
  const total = SKILL_CATEGORIES.length;
  const techTotal = category.techs.length;

  /**
   * Berpindah kategori SEKALIGUS mengembalikan teknologi ke yang pertama.
   *
   * Keduanya wajib berjalan bersamaan: nomor teknologi milik kategori lama tidak
   * berlaku di kategori baru yang jumlah teknologinya bisa lebih sedikit. Tanpa
   * pengembalian ini, berpindah dari kategori berisi lima teknologi ke kategori
   * berisi tiga akan menunjuk entri yang tidak ada.
   */
  const step = (delta: number) => {
    setActiveIndex((current) => (current + delta + total) % total);
    setTechIndex(0);
  };

  const stepTech = (delta: number) =>
    setTechIndex((current) => (current + delta + techTotal) % techTotal);

  return (
    <SectionShell id="skills">
      <SkillsField
        state={isOpen ? 'open' : 'closed'}
        slots={getSlots(activeIndex)}
      />

      {/* URUTAN TUMPUK KEADAAN TERBUKA — diatur murni oleh urutan render di sini,
          bukan oleh z-index. Yang dirender belakangan berada di atas.

            1. SkillsField  -> bidang putih penuh
            2. StackWatermark -> watermark abu, menembus batas ke bawah
            3. OpenRedBand  -> bidang merah, MENUTUP watermark tepat di batasnya

          Bidang merah dipisah dari putihnya justru untuk ini: dengan keduanya
          menjadi satu elemen gradasi, tidak ada celah untuk menyisipkan apa pun
          di antaranya, dan watermark hanya bisa berada di atas keduanya atau di
          bawah keduanya. Cara ini juga menghapus kebutuhan clip-path — merahnya
          sendiri yang memotong, sehingga batasnya dijamin sama persis. */}
      {isOpen && (
        <>
          <StackWatermark />
          <OpenRedBand />

          {/* Setelah OpenRedBand, jadi berada DI ATAS bidang merah. Nama kategori
              dan tatanan hurufnya dibaca dari kategori yang sedang aktif, sehingga
              selalu sama persis dengan yang tampil di layar daftar. */}
          <OpenCategoryLabel label={category.bannerLabel} letters={category.letters} />

          {/* Duduk di atas bidang merah, bukan di atasnya secara tumpukan:
              posisinya dihitung dari OPEN_SPLIT_PERCENT sehingga selalu menempel
              pada batas putih-merah berapa pun batas itu digeser. */}
          <OpenTechName name={category.techs[techIndex].name} />

          {/* key berisi identitas teknologi yang sedang dibuka. Begitu teknologi
              atau kategori berganti, key ikut berganti, React memasang ulang
              komponennya, dan butir terpilih kembali ke yang pertama dengan
              sendirinya — tanpa perlu satu keadaan tambahan di sini yang harus
              diingat untuk dikembalikan di setiap tempat perpindahan. */}
          <OpenCoreSkills
            key={`${category.bannerLabel}-${techIndex}`}
            items={category.techs[techIndex].coreSkills}
          />
        </>
      )}

      {/* Urutan render menentukan urutan tumpuk, dan itu menentukan apa yang bisa
          dibaurkan mix-blend-mode: tiap lapisan hanya membaur dengan yang dirender
          SEBELUMNYA. Bintang ditaruh setelah bidang agar bisa membaur dengannya,
          dan sebelum perabot tipografi agar angka serta wordmark tetap di depan. */}
      <SkillsStars state={isOpen ? 'open' : 'closed'} />

      {/* Nomor di sini adalah nomor urut SECTION pada halaman, bukan nomor
          kategori yang sedang aktif — angkanya tetap saat panah ditekan. */}
      <SkillsFurniture sectionNumber={3} state={isOpen ? 'open' : 'closed'} />

      {/* PERANCAH SEMENTARA — dihapus begitu interaksi sebenarnya dipasang. */}
      <div className="absolute bottom-4 left-4 z-50 flex gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          className="bg-black px-3 py-2 font-mono text-xs font-bold uppercase text-white"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          className="bg-black px-3 py-2 font-mono text-xs font-bold uppercase text-white"
        >
          ▼
        </button>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="bg-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white"
        >
          {isOpen ? 'Tertutup' : 'Terbuka'}
        </button>
        <span className="bg-black px-3 py-2 font-mono text-xs font-bold uppercase text-white">
          {category.bannerLabel}
        </span>

        {isOpen && (
          <>
            <button
              type="button"
              onClick={() => stepTech(-1)}
              className="bg-black px-3 py-2 font-mono text-xs font-bold uppercase text-white"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => stepTech(1)}
              className="bg-black px-3 py-2 font-mono text-xs font-bold uppercase text-white"
            >
              ▶
            </button>
            <span className="bg-black px-3 py-2 font-mono text-xs font-bold uppercase text-white">
              {category.techs[techIndex].name} · {techIndex + 1}/{techTotal}
            </span>
          </>
        )}
      </div>
    </SectionShell>
  );
}
