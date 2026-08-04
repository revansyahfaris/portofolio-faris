import { memo } from 'react';
import type { RefObject } from 'react';
import { CategoryLabel } from './CategoryLabel';
import { SKILLS } from './palette';
import { FAN_TURN_DEG, MOTION, SHEET_TRANSITION, transition } from './motion';
import {
  ACTIVE_SLOT,
  LABEL_SIZE,
  LABEL_TOP,
  SHEET_THICKNESS,
  SLOT_GEOMETRY,
  VISIBLE_SLOTS,
} from './slots';
import { boxWidthPercent, vw } from './units';
import type { Sheet } from './useSheetCarousel';

interface SkillsFieldProps {
  /**
   * Keadaan section.
   * - "closed" : daftar kategori. Tiga bidang memancar dari titik hilang.
   * - "open"   : bidang putih dasar layar rincian.
   */
  readonly state: 'closed' | 'open';
  /** Label kategori beserta slot yang sedang ditempatinya. */
  readonly sheets?: readonly Sheet[];
  /**
   * Sedang menuju keadaan terbuka. Memutar seluruh kipas sedikit berlawanan
   * arah jarum jam sesaat sebelum tertimbun bidang merah.
   */
  readonly isOpen?: boolean;
  /** Memilih kategori sejauh delta slot dari yang sedang aktif. */
  readonly onSelect?: (delta: number) => void;
  /** Membuka layar rincian kategori aktif. */
  readonly onOpen?: () => void;
  /** Tombol label kategori yang sedang aktif, untuk pengembalian fokus. */
  readonly activeButtonRef?: RefObject<HTMLButtonElement | null>;
}

/**
 * Tinggi bidang putih pada keadaan terbuka, sebagai persentase tinggi layar.
 *
 * Dipisah sebagai konstanta karena judul teknologi harus duduk tepat pada batas
 * ini — keduanya wajib membaca angka yang sama, bukan dua angka yang kebetulan
 * mirip dan bisa menyimpang saat salah satunya disetel.
 */
export const OPEN_SPLIT_PERCENT = 34;

/**
 * Titik hilang tempat ketiga bidang memancar.
 *
 * Diletakkan di luar layar supaya titik pertemuannya sendiri tidak pernah
 * terlihat. Bila titiknya berada di dalam layar, ketiga bidang akan tampak
 * bertemu di satu simpul — dan simpul itu langsung terbaca sebagai pusat
 * komposisi, padahal pusat perhatiannya seharusnya di tempat lain.
 *
 * `right` dialihkan ke satuan tinggi karena persen pada properti itu diukur
 * terhadap LEBAR. `top` dibiarkan: persen pada properti itu diukur terhadap
 * TINGGI, jadi sudah sejalan dengan sisanya sejak semula.
 */
const VANISHING_POINT = { right: boxWidthPercent(-14), top: '112%' };

/**
 * Kerangka satu slot pada kipas: kotak sepanjang bidang, berporos di titik
 * hilang, dan dimiringkan sesuai sudut slotnya.
 *
 * Dipakai DUA KALI dengan isi berbeda — sekali oleh bidang merahnya yang diam,
 * sekali oleh label yang berpindah. Keduanya karena itu memakai satu perhitungan
 * posisi yang sama persis, sehingga label tidak mungkin melenceng dari bidangnya
 * betapapun sudut atau jaraknya disetel ulang. Bila keduanya menghitung
 * sendiri-sendiri, angka yang sama harus ditulis dua kali dan cepat atau lambat
 * salah satunya tertinggal.
 */
const slotFrameStyle = (slot: number) => {
  const geometry = SLOT_GEOMETRY[slot];
  return {
    top: `${geometry.offset}vh`,
    // Lebar berlebih memastikan bidang tetap melintasi seluruh layar pada sudut
    // mana pun; sisanya terpotong oleh overflow induknya.
    width: '260vw',
    height: `${SHEET_THICKNESS}vh`,
    // Poros di ujung KANAN, tepat pada titik hilang. Rotasi searah jarum jam
    // menurunkan ujung kirinya, dan karena bidang memanjang jauh ke kiri,
    // hasilnya kemiringan yang menurun ke kanan sesuai rancangan.
    transformOrigin: '100% 0',
    transform: `rotate(${geometry.angle}deg)`,
  };
};

/**
 * Bidang dasar Skills section beserta label kategorinya.
 *
 * BIDANGNYA DIAM, LABELNYA YANG BERJALAN. Ketiga bidang merah tidak pernah
 * bergerak maupun berganti warna — sudut, jarak, dan tumpukannya persis seperti
 * yang sudah dikunci. Yang berpindah saat panah ditekan hanyalah nama kategori,
 * yang meluncur menyusuri busur dari slot satu ke slot tetangganya sambil
 * berganti warna dan peredupan.
 *
 * Karena itu label dirender sebagai LAPISAN TERSENDIRI di atas ketiga bidang,
 * bukan sebagai anak dari bidangnya. Sesuatu yang berpindah antarbidang tidak
 * bisa menjadi milik salah satu bidang — menjadikannya anak berarti ia harus
 * dilepas dari satu induk dan dipasang ke induk lain di tengah gerakan, dan
 * elemen yang dipasang ulang kehilangan transisinya.
 *
 * Tiap label adalah <button>: yang di tengah membuka rinciannya, yang di atas
 * dan di bawah memilih dirinya sendiri. Klik pada tetangga karena itu berlaku
 * sebagai "naik satu" atau "turun satu" tanpa perlu satu pun panah — panahnya
 * tetap disediakan, tetapi sebagai pelengkap, bukan sebagai satu-satunya jalan.
 */
export const SkillsField = memo(function SkillsField({
  state,
  sheets,
  isOpen = false,
  onSelect,
  onOpen,
  activeButtonRef,
}: SkillsFieldProps) {
  if (state === 'open') {
    // Hanya bidang PUTIH yang digambar di sini. Bidang merahnya dipisah menjadi
    // OpenRedBand di bawah, supaya ada tempat untuk menyisipkan elemen di antara
    // keduanya — watermark harus berada di atas putih tetapi di bawah merah.
    return <div aria-hidden className="absolute inset-0" style={{ backgroundColor: SKILLS.white }} />;
  }

  return (
    // TIDAK lagi aria-hidden: lapisan ini kini memuat tombol kategori yang
    // sungguhan. Yang disembunyikan dari pembaca layar hanya bidang merahnya,
    // yang memang murni hiasan.
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: SKILLS.white }}>
      {/* Perputaran saat membuka dipasang di JANGKARNYA, bukan di tiap bidang.
          Jangkar ini berukuran nol, sehingga transform-origin bawaannya jatuh
          tepat pada titik hilang — poros yang sama dengan poros susunan
          kipasnya. Bidang dan label karena itu berputar sebagai satu benda. */}
      <div
        className="absolute h-0 w-0"
        style={{
          ...VANISHING_POINT,
          transform: `rotate(${isOpen ? FAN_TURN_DEG : 0}deg)`,
          transition: transition('transform', MOTION.fan, isOpen),
        }}
      >
        {/* Lapisan 1 — ketiga bidang merah. Diam sepenuhnya, murni hiasan. */}
        {VISIBLE_SLOTS.map((slot) => (
          <div
            key={slot}
            aria-hidden
            className="absolute right-0"
            style={{
              ...slotFrameStyle(slot),
              backgroundColor: SLOT_GEOMETRY[slot].color,
            }}
          />
        ))}

        {/* Lapisan 2 — label yang berpindah, di atas seluruh bidang.
            Kerangkanya tidak berlatar, jadi yang terlihat berjalan hanya
            teksnya. */}
        {sheets?.map((sheet) => {
          const geometry = SLOT_GEOMETRY[sheet.slot];
          if (!geometry) return null;

          /*
           * Slot parkiran tidak punya bidang merah, dan nama kategori yang
           * melayang di atas putih kosong terbaca sebagai cacat, bukan sebagai
           * bagian rancangan.
           *
           * Disembunyikan lewat opacity dan bukan dengan tidak merendernya:
           * elemen yang tidak dirender tidak bisa berpindah, sehingga label yang
           * datang akan muncul begitu saja di slot 2 alih-alih meluncur ke sana.
           * Dengan opacity, ia tetap menempuh jaraknya — hanya saja pudar
           * sepanjang bagian perjalanan yang tidak beralas.
           */
          const hasSheetBeneath = VISIBLE_SLOTS.includes(
            sheet.slot as (typeof VISIBLE_SLOTS)[number],
          );

          const isTheActiveOne = sheet.slot === ACTIVE_SLOT;

          /*
           * Label di parkiran dan seluruh label saat layar rincian terbuka tidak
           * boleh bisa ditekan maupun dijangkau Tab. Yang tak terlihat tetap
           * dapat difokus kalau tidak dinyatakan sebaliknya, dan tombol tak
           * kasatmata yang tiba-tiba menerima Enter adalah cacat aksesibilitas
           * yang tidak akan pernah terlihat saat mencoba dengan tetikus.
           */
          const isInteractive = hasSheetBeneath && !isOpen;

          return (
            <div
              key={sheet.id}
              className="absolute right-0"
              style={{
                ...slotFrameStyle(sheet.slot),
                opacity: hasSheetBeneath ? 1 : 0,
                transition: SHEET_TRANSITION,
              }}
            >
              {/* Yang ditambatkan adalah TEPI KIRI label. Kalau memakai `right`,
                  teks tumbuh ke kiri dari titik tambatan sehingga letaknya ikut
                  bergantung pada panjang katanya — "FRONTEND" akan terdorong
                  jauh lebih ke kiri daripada "DESIGN" meski angkanya sama.

                  Elemennya <button>, bukan <div> berpendengar klik. Tombol
                  sungguhan sudah membawa serta hal-hal yang mudah terlupakan
                  bila dibuat sendiri: dapat dijangkau Tab, menanggapi Enter dan
                  Spasi, dibacakan sebagai kendali oleh pembaca layar, dan punya
                  cincin fokus. Kotak sentuhnya sengaja hanya sebesar teksnya —
                  kerangka di sekelilingnya selebar 260vw dan akan menjadi sasaran
                  klik raksasa yang menutupi separuh layar. */}
              <button
                type="button"
                ref={isTheActiveOne ? activeButtonRef : undefined}
                onClick={() => (isTheActiveOne ? onOpen?.() : onSelect?.(sheet.slot - ACTIVE_SLOT))}
                // Roving tabindex: hanya kategori aktif yang dapat dijangkau Tab.
                // Tanpa ini, Tab harus ditekan berkali-kali untuk melewati satu
                // daftar — dan daftar ini justru dijelajahi dengan panah.
                tabIndex={isInteractive && isTheActiveOne ? 0 : -1}
                aria-hidden={!isInteractive}
                disabled={!isInteractive}
                aria-label={
                  isTheActiveOne ? `Buka rincian ${sheet.label}` : `Pilih ${sheet.label}`
                }
                className="group absolute block cursor-pointer"
                style={{
                  right: vw(geometry.labelStart),
                  top: `${LABEL_TOP}vh`,
                  transition: SHEET_TRANSITION,
                }}
              >
                {/* Sentuhan kecil saat disentuh tetikus: label bergeser sedikit
                    menyusuri bidangnya, ke arah yang sama dengan arah geraknya
                    saat berpindah slot. Isyaratnya karena itu terbaca sebagai
                    "benda ini bisa digerakkan", bukan sekadar sebagai kilau. */}
                <span className="block transition-transform duration-200 ease-out group-hover:-translate-x-[0.6vh]">
                  <CategoryLabel
                    text={sheet.label}
                    letters={sheet.letters}
                    isActive={isTheActiveOne}
                    size={LABEL_SIZE}
                    // Warna bidang yang SEDANG ditempati, bukan warna tetap dari
                    // data huruf. Huruf ber-invert memakainya sebagai warna teks
                    // agar tampak dilubangi, jadi nilainya harus ikut berpindah
                    // bersama labelnya.
                    surfaceColor={geometry.color}
                  />
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

/**
 * Bidang merah bawah pada keadaan terbuka.
 *
 * Dipisahkan dari bidang putih supaya urutan tumpuknya bisa diatur: apa pun yang
 * dirender di antara keduanya akan tertutup rapi oleh merah ini pada batas
 * putih-merah, tanpa perlu clip-path maupun mask.
 */
export const OpenRedBand = memo(function OpenRedBand() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0"
      style={{ top: `${OPEN_SPLIT_PERCENT}%`, backgroundColor: SKILLS.redBright }}
    />
  );
});
