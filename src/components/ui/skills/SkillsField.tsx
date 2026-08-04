import { memo } from 'react';
import { CategoryLabel } from './CategoryLabel';
import { SKILLS } from './palette';
import type { LetterSpec } from './types';

/** Isi satu slot: nama kategori beserta tatanan per hurufnya. */
export interface FieldSlot {
  readonly label: string;
  readonly letters?: readonly LetterSpec[];
}

interface SkillsFieldProps {
  /**
   * Keadaan section.
   * - "closed" : daftar kategori. Tiga bidang memancar dari titik hilang.
   * - "open"   : rincian satu teknologi. Bidang terbelah mendatar, putih di atas.
   */
  readonly state: 'closed' | 'open';
  /**
   * Isi ketiga slot, urut dari atas ke bawah:
   * [kategori sebelumnya, kategori aktif, kategori berikutnya].
   * Hanya dipakai pada keadaan tertutup.
   */
  readonly slots?: readonly [FieldSlot, FieldSlot, FieldSlot];
}

/**
 * Tinggi bidang putih pada keadaan terbuka, sebagai persentase tinggi layar.
 *
 * Dipisah sebagai konstanta karena judul teknologi nanti harus duduk tepat pada
 * batas ini — keduanya wajib membaca angka yang sama, bukan dua angka yang
 * kebetulan mirip dan bisa menyimpang saat salah satunya disetel.
 */
export const OPEN_SPLIT_PERCENT = 34;

/**
 * Indeks slot yang menampung kategori terpilih.
 *
 * Slot tengah, karena kategori aktif harus punya tetangga di atas dan di bawahnya
 * — itulah yang memberi tahu pengguna bahwa daftarnya bisa digulir dua arah tanpa
 * perlu petunjuk tertulis.
 */
export const ACTIVE_SLOT = 1;

/**
 * Titik hilang tempat ketiga bidang memancar.
 *
 * Diletakkan di luar layar supaya titik pertemuannya sendiri tidak pernah
 * terlihat. Bila titiknya berada di dalam layar, ketiga bidang akan tampak
 * bertemu di satu simpul — dan simpul itu langsung terbaca sebagai pusat
 * komposisi, padahal pusat perhatiannya seharusnya di tempat lain.
 */
const VANISHING_POINT = { right: '-14%', top: '112%' };

/**
 * Ketiga bidang pada keadaan tertutup.
 *
 * Jumlahnya tetap tiga berapa pun banyaknya kategori: ketiganya adalah JENDELA
 * yang bergeser, bukan satu bidang untuk tiap kategori. Panah atas/bawah hanya
 * mengganti kategori mana yang menempati ketiga slot ini, sehingga menambah
 * kategori tidak pernah mengubah komposisinya.
 *
 * Sudutnya sengaja BERBEDA-BEDA. Bidang sejajar akan terbaca sebagai garis-garis
 * latar; bidang yang sudutnya merenggang seperti kipas tangan memberi kesan ruang
 * dan arah. Karena sudutnya berbeda, ketiganya tidak mungkin dibuat dengan satu
 * linear-gradient — gradasi hanya punya satu arah untuk seluruh pitanya.
 *
 * Semua rotasi memakai poros yang sama (titik hilang), sehingga mengubah satu
 * sudut tidak pernah membuat bidangnya lepas dari susunan kipas.
 *
 * - angle      : derajat menurun ke kanan; makin besar makin curam
 * - offset     : jarak bidang dari titik hilang, dalam vh, sebelum diputar
 * - thickness  : tebal bidang dalam vh
 * - labelStart : jarak TEPI KIRI label dari titik hilang, diukur menyusuri bidang,
 *                dalam vw. Makin besar, makin ke kiri letak awal teksnya.
 * - labelTop   : posisi label dari tepi atas bidang, dalam vh
 * - labelSize  : ukuran huruf label, dalam vh
 *
 * Nilai labelStart yang dibutuhkan berbeda-beda meski letaknya di layar mirip,
 * karena jarak diukur MENYUSURI bidang yang miring, bukan mendatar. Makin curam
 * sudutnya, makin jauh jarak yang harus ditempuh untuk mencapai posisi mendatar
 * yang sama — kira-kira sebesar pembagian dengan kosinus sudutnya.
 */
const FAN_SHAPES: readonly {
  angle: number;
  offset: number;
  thickness: number;
  color: string;
  labelStart: number;
  labelTop: number;
  labelSize: number;
}[] = [
  { angle: 42, offset: -25, thickness: 75, color: SKILLS.red, labelStart: 42, labelTop: 1.5, labelSize: 20 },
  { angle: 29, offset: -13, thickness: 75, color: SKILLS.redBright, labelStart: 52, labelTop: 1.5, labelSize: 20 },
  { angle: 16, offset: -9, thickness: 75, color: SKILLS.red, labelStart: 57, labelTop: 1.5, labelSize: 20 },
];

/**
 * Bidang dasar Skills section beserta label kategorinya.
 *
 * Label dijadikan ANAK dari bidangnya, bukan lapisan terpisah. Dengan begitu
 * rotasinya diwarisi begitu saja — sudut bidang dan sudut teks tidak mungkin
 * menyimpang, karena memang hanya ada satu angka. Bila keduanya dipisah, `angle`
 * harus ditulis dua kali, dan dua sumber kebenaran untuk satu hubungan visual
 * pasti akan lepas sinkron begitu salah satunya disetel.
 *
 * Perbedaan mendasar antara kedua keadaan bukan warna, melainkan ARAH: keadaan
 * tertutup sepenuhnya diagonal dan tidak punya satu pun garis mendatar, sedangkan
 * keadaan terbuka justru dibelah garis mendatar tegas.
 *
 * CATATAN AKSESIBILITAS: seluruh lapisan ini masih ditandai aria-hidden karena
 * belum ada interaksi. Saat panah dan klik dipasang nanti, label harus pindah ke
 * dalam elemen <button> agar namanya terbaca pembaca layar — jangan biarkan nama
 * kategori selamanya tinggal di lapisan dekoratif.
 */
export const SkillsField = memo(function SkillsField({ state, slots }: SkillsFieldProps) {
  if (state === 'open') {
    // Hanya bidang PUTIH yang digambar di sini. Bidang merahnya dipisah menjadi
    // OpenRedBand di bawah, supaya ada tempat untuk menyisipkan elemen di antara
    // keduanya — watermark harus berada di atas putih tetapi di bawah merah,
    // dan itu mustahil bila keduanya satu elemen gradasi.
    return <div aria-hidden className="absolute inset-0" style={{ backgroundColor: SKILLS.white }} />;
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: SKILLS.white }}
    >
      {/* Jangkar tak berdimensi yang menandai titik hilang. Ketiga bidang menjadi
          anaknya dan berputar pada poros yang sama, sehingga memindahkan titik
          hilang cukup dengan mengubah satu konstanta. */}
      <div className="absolute h-0 w-0" style={VANISHING_POINT}>
        {FAN_SHAPES.map((shape, index) => (
          <div
            key={shape.angle}
            className="absolute right-0"
            style={{
              top: `${shape.offset}vh`,
              // Lebar berlebih memastikan bidang tetap melintasi seluruh layar
              // pada sudut mana pun; sisanya terpotong oleh overflow induknya.
              width: '260vw',
              height: `${shape.thickness}vh`,
              backgroundColor: shape.color,
              // Poros berada di ujung KANAN bidang, tepat pada titik hilang.
              // Rotasi positif (searah jarum jam) menurunkan ujung kirinya, dan
              // karena bidang memanjang jauh ke kiri, hasilnya adalah kemiringan
              // yang menurun ke kanan sesuai rancangan.
              transformOrigin: '100% 0',
              transform: `rotate(${shape.angle}deg)`,
            }}
          >
            {slots && (
              /* Yang ditambatkan adalah TEPI KIRI label, bukan tepi kanannya.
                 Kalau memakai `right`, teks tumbuh ke kiri dari titik tambatan,
                 sehingga letak tampaknya ikut bergantung pada panjang katanya —
                 "FRONTEND" akan terdorong jauh lebih ke kiri daripada "DESIGN"
                 meski angkanya sama. Dengan menambatkan tepi kiri, teks selalu
                 mulai di titik yang sama dan tumbuh ke kanan, berapa pun
                 panjangnya. Kelebihannya dibiarkan terpotong tepi layar. */
              <div
                className="absolute"
                style={{
                  right: `${shape.labelStart}vw`,
                  top: `${shape.labelTop}vh`,
                }}
              >
                <CategoryLabel
                  text={slots[index].label}
                  letters={slots[index].letters}
                  isActive={index === ACTIVE_SLOT}
                  size={shape.labelSize}
                  // Warna bidang diteruskan, bukan ditulis ulang di data huruf.
                  // Huruf ber-invert memakainya sebagai warna teks agar tampak
                  // dilubangi, dan dengan meneruskannya dari sini warnanya tidak
                  // mungkin tertinggal saat warna bidang diubah.
                  surfaceColor={shape.color}
                />
              </div>
            )}
          </div>
        ))}
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
 *
 * Batas atasnya membaca OPEN_SPLIT_PERCENT yang sama dengan bidang putihnya,
 * sehingga keduanya tidak mungkin bergeser sendiri-sendiri.
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
