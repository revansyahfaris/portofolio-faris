'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { SectionShell } from './shared';
import {
  SKILL_CATEGORIES,
  SkillsField,
  SkillsFurniture,
  SkillsStars,
  OpenPanel,
  OpenCoreSkills,
  SkillsPager,
  MOTION,
  useSwap,
  useSheetCarousel,
} from './skills';

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
  const [techIndex, setTechIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const activeButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const shouldMoveFocus = useRef(false);
  const followFocus = useRef(false);

  /*
   * Kipas dikelola sebagai ban berjalan lembar demi lembar, bukan sebagai tiga
   * bidang tetap yang teksnya ditukar. Bedanya menentukan: hanya benda yang
   * mempertahankan identitasnya yang bisa dianimasikan berpindah tempat.
   */
  const { activeIndex, sheets, step: stepSheet } = useSheetCarousel();

  const category = SKILL_CATEGORIES[activeIndex];
  const techTotal = category.techs.length;

  /**
   * Berpindah kategori SEKALIGUS mengembalikan teknologi ke yang pertama.
   *
   * Hanya berlaku dari layar daftar. Teknologi adalah BAGIAN DARI kategorinya,
   * jadi berpindah kategori selagi rinciannya terbuka berarti mengganti isi
   * sebuah layar dengan isi milik layar lain — dan tidak ada gerakan yang bisa
   * membuat itu terbaca masuk akal. Untuk berpindah, tutup dulu.
   *
   * Ditegakkan di sini, bukan sekadar dengan menyembunyikan tombolnya. Tombol
   * yang disembunyikan tetap bisa terpanggil lewat papan ketik atau lewat jalan
   * lain yang ditambahkan kemudian; aturannya harus dijaga di tempat perpindahan
   * itu benar-benar terjadi.
   *
   * Pengembalian nomor teknologi wajib berjalan bersamaan: nomor milik kategori
   * lama tidak berlaku di kategori baru yang jumlah teknologinya bisa lebih
   * sedikit. Tanpa itu, berpindah dari kategori berisi lima teknologi ke
   * kategori berisi tiga akan menunjuk entri yang tidak ada.
   */
  const step = (delta: number) => {
    if (isOpen) return;
    // Fokus mengikuti pilihan, tetapi HANYA bila memang sudah berada di dalam
    // section ini. Tanpa syarat itu, menekan panah di tempat lain — atau
    // perpindahan yang dipicu dari mana pun kelak — akan merebut fokus dari
    // bagian halaman yang sedang dipakai orang.
    followFocus.current = sectionRef.current?.contains(document.activeElement) ?? false;
    stepSheet(delta);
    setTechIndex(0);
  };

  const stepTech = (delta: number) =>
    setTechIndex((current) => (current + delta + techTotal) % techTotal);

  /*
   * Pergantian isi layar rincian berbentuk serah terima berurutan, bukan tukar
   * seketika: yang lama menukik turun dan memudar dulu, baru yang baru naik.
   * useSwap yang menahan nilainya sampai gerak turun itu selesai, sehingga
   * teksnya berganti persis ketika sedang tidak terlihat.
   *
   * Cukup nomor teknologi. Kategori tidak perlu ikut ditahan karena step()
   * menolak berpindah selagi terbuka — jadi kategori mustahil berubah pada saat
   * layar rincian sedang terlihat.
   *
   * Math.min menjaga nomor yang tertahan tetap sah. Saat kategori berganti,
   * nomor teknologi dikembalikan ke 0 tetapi nilai lamanya masih tertahan
   * selama gerak turun; bila kategori barunya berisi lebih sedikit teknologi,
   * nomor lama itu menunjuk entri yang tidak ada. Tidak terlihat karena
   * seluruhnya terjadi selagi tertutup, tetapi tetap saja galat.
   */
  const { shown: shownTechIndex, leaving: leavingTech } = useSwap(
    techIndex,
    MOTION.techSwap.exit.duration,
  );
  const shownTech = category.techs[Math.min(shownTechIndex, techTotal - 1)];

  /*
   * FOKUS.
   *
   * Membuka memindahkan fokus ke panel rincian; menutup mengembalikannya ke
   * tombol kategori yang tadi ditekan. Tanpa pengembalian itu, menutup akan
   * melempar fokus ke awal halaman — dan pengguna papan ketik kehilangan
   * tempatnya sepenuhnya, harus menekan Tab berkali-kali untuk kembali ke titik
   * yang baru saja ia tinggalkan.
   *
   * Dijaga dengan penanda supaya hanya berlaku pada perpindahan yang DISEBABKAN
   * pengguna. Efek yang memindahkan fokus setiap kali dirender ulang akan
   * merebut fokus dari tempat lain di halaman tanpa ada yang memintanya.
   */
  useEffect(() => {
    if (!shouldMoveFocus.current) return;
    shouldMoveFocus.current = false;
    /*
     * preventScroll WAJIB, dan ketiadaannya persis yang membuat seluruh layar
     * melompat saat rincian dibuka.
     *
     * focus() bawaannya menggulirkan elemen yang difokus ke dalam pandangan.
     * Panel ini absolute inset-0 di dalam section yang memakai scroll snap, dan
     * pada saat fokus dipindahkan ia masih berada satu layar penuh di bawah —
     * jadi browser menggulirkan halaman untuk "mengejarnya", berlawanan dengan
     * animasi yang sedang berjalan. Yang terlihat adalah lompatan sekali di
     * seluruh section, bukan gerak yang tersendat.
     */
    (isOpen ? panelRef.current : activeButtonRef.current)?.focus({ preventScroll: true });
  }, [isOpen]);

  /*
   * Roving tabindex menuntut fokus ikut berpindah ke pilihan yang baru, karena
   * hanya kategori aktif yang dapat difokus. Tanpa ini, fokus tertinggal pada
   * tombol yang barusan menjadi tetangga — masih bercincin fokus, tetapi sudah
   * bukan lagi yang dipilih, dan tombol berikutnya tidak akan menanggapi panah.
   */
  useEffect(() => {
    if (!followFocus.current) return;
    followFocus.current = false;
    // preventScroll dengan alasan yang sama: label kategori berada di bidang
    // miring yang sebagian besarnya menjulur keluar layar, dan menggulirkannya
    // ke dalam pandangan akan menggeser seluruh halaman.
    activeButtonRef.current?.focus({ preventScroll: true });
  }, [activeIndex]);

  const open = useCallback(() => {
    shouldMoveFocus.current = true;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    shouldMoveFocus.current = true;
    setIsOpen(false);
  }, []);

  /**
   * Panah, Enter, dan Escape.
   *
   * Dipasang pada pembungkus section dan bukan pada window. Pendengar global
   * akan menyita panah untuk seluruh halaman — dan pada halaman satu lembar
   * bergulir seperti ini, panah atas-bawah adalah cara orang berpindah antar
   * section. Menyitanya berarti pengguna terperangkap di Skills tanpa tahu
   * caranya keluar.
   *
   * Karena bergantung pada fokus, panahnya baru hidup setelah pengguna menekan
   * atau menyorot sesuatu di dalam section ini — dan pada saat itu niatnya sudah
   * jelas tertuju ke sini.
   *
   * Enter dan Spasi sengaja TIDAK ditangani: elemennya sudah <button>, dan
   * tombol sungguhan menanggapi keduanya sendiri. Menanganinya di sini akan
   * membuat satu penekanan terhitung dua kali.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const move = isOpen ? stepTech : step;

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        move(-1);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        move(1);
        break;
      case 'Escape':
        if (!isOpen) return;
        close();
        break;
      default:
        return;
    }

    // Hanya untuk tombol yang benar-benar ditangani — cabang default sudah
    // keluar lebih dulu. Tanpa ini, panah tetap menggulirkan halaman sekaligus
    // memindahkan pilihan, dan keduanya terjadi bersamaan.
    event.preventDefault();
  };

  return (
    <SectionShell id="skills">
      {/* Pembungkus penangkap tombol. Panah dan Escape ditangani di sini karena
          peristiwa papan ketik menggelembung dari elemen yang sedang difokus —
          jadi satu pendengar cukup untuk seluruh kendali di dalamnya, tanpa
          perlu memasangnya satu per satu di tiap tombol. */}
      <div
        ref={sectionRef}
        onKeyDown={handleKeyDown}
        className="absolute inset-0"
        role="group"
        aria-label="Daftar kemampuan"
      >
      {/* URUTAN LAPISAN, dari belakang ke depan. Ditentukan murni oleh urutan
          render, bukan z-index — dan urutan itu sekaligus yang mengatur seluruh
          transisinya, tanpa satu pun penghitung waktu di JavaScript:

            1. Kipas          -> berputar sedikit, lalu TERTIMBUN
            2. Bintang tutup  -> membaur dengan kipas, ikut tertimbun
            3. OpenPanel      -> naik dari bawah, menimbun keduanya
            4. Core Skills    -> mengambang naik menyusul, lebih lambat
            5. Bintang buka   -> muncul tepat saat bidang merah mendarat
            6. Perabot        -> selalu paling depan

          Seluruh lapisan tetap terpasang di kedua keadaan. Bintang keadaan
          tertutup tidak dilepas melainkan ditimbun, sehingga tidak ada kedipan
          saat susunannya berganti — dan gerakan menutup menjadi kebalikan yang
          persis, karena memang tidak ada yang perlu dipasang ulang. */}
      <SkillsField
        state="closed"
        sheets={sheets}
        isOpen={isOpen}
        onSelect={step}
        onOpen={open}
        activeButtonRef={activeButtonRef}
      />

      {/* Membaur dengan kipas karena dirender sesudahnya — mix-blend-mode hanya
          membaur dengan yang sudah tergambar sebelumnya. Ditaruh SEBELUM
          OpenPanel supaya ikut tertimbun saat bidang merah naik. */}
      <SkillsStars layer="buried" />

      {/* Nama kategori sengaja TIDAK ikut menukik saat teknologi berganti.
          Teknologi adalah bagian dari kategorinya, jadi yang berganti hanya
          isinya; judulnya diam justru untuk menyatakan bahwa kita masih berada
          di kategori yang sama. */}
      <OpenPanel
        ref={panelRef}
        isOpen={isOpen}
        label={category.bannerLabel}
        letters={category.letters}
        techName={shownTech.name}
        swappingTech={leavingTech}
      />

      <OpenCoreSkills
        items={shownTech.coreSkills}
        isOpen={isOpen}
        swapping={leavingTech}
      />

      {/* Kelompok kanan bawah, letaknya sama di kedua keadaan — jadi tidak
          dianimasikan sama sekali, sebagaimana wordmark "Skills". Yang berubah
          cukup apa yang ada di belakangnya, dan mix-blend-mode mengurusnya
          sendiri karena selalu membaca lapisan di bawahnya. */}
      <SkillsStars layer="persistent" />

      {/* Sengaja dirender SESUDAH bintang, jadi berada di atasnya. */}
      <SkillsPager
        isOpen={isOpen}
        onPrev={() => (isOpen ? stepTech(-1) : step(-1))}
        onNext={() => (isOpen ? stepTech(1) : step(1))}
        onClose={close}
        current={isOpen ? shownTech.name : category.bannerLabel}
      />

      {/* Nomor di sini adalah nomor urut SECTION pada halaman, bukan nomor
          kategori yang sedang aktif — angkanya tetap saat panah ditekan. */}
      <SkillsFurniture sectionNumber={3} state={isOpen ? 'open' : 'closed'} />

      {/* Pengumuman untuk pembaca layar. Seluruh perubahan di section ini
          bersifat visual — bidang bergeser, teks berpindah — dan tidak satu pun
          di antaranya terdengar. Baris ini yang menyuarakannya, disembunyikan
          dari mata tetapi tetap dibacakan. Bukan display:none, karena yang
          disembunyikan dengan cara itu tidak dibacakan sama sekali. */}
      <p role="status" aria-live="polite" className="sr-only">
        {isOpen
          ? `${category.bannerLabel}, ${shownTech.name}, ${techIndex + 1} dari ${techTotal}`
          : `${category.bannerLabel} terpilih`}
      </p>
      </div>
    </SectionShell>
  );
}
