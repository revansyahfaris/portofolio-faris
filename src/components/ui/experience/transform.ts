// File: src/components/ui/experience/transform.ts

/**
 * Penyetel bentuk yang berlaku sama untuk seluruh elemen di Experience.
 *
 * Dikumpulkan menjadi satu tipe supaya tiap elemen disetel dengan cara yang
 * sama. Kalau tiap komponen merangkai transform-nya sendiri, urutan
 * fungsinya cepat atau lambat berbeda — dan urutan itu MENGUBAH hasilnya:
 * memutar lalu meregangkan tidak sama dengan meregangkan lalu memutar.
 * Perbedaannya paling terasa justru saat sudutnya besar, dan paling sulit
 * dilacak karena kodenya terlihat setara.
 */
export interface ShapeTransform {
  /** Putar, dalam derajat. Positif searah jarum jam. */
  readonly rotate?: number;
  /** Miringkan mendatar: sisi atas condong ke kanan bila positif. Derajat. */
  readonly skewX?: number;
  /** Miringkan tegak, dengan aturan yang sama. Derajat. */
  readonly skewY?: number;
  /**
   * Regangkan mendatar. 1 = ukuran asli.
   *
   * Meregangkan satu sumbu saja itulah yang di Photoshop kamu kenal sebagai
   * stretch. Menyamakan scaleX dan scaleY menghasilkan pembesaran biasa.
   */
  readonly scaleX?: number;
  /** Regangkan tegak. 1 = ukuran asli. */
  readonly scaleY?: number;
  /**
   * Titik tumpu seluruh penyetelan di atas.
   *
   * Menentukan apa yang DIAM saat nilainya diubah. Dengan 'center', bentuknya
   * mengembang ke segala arah dan titik tengahnya tidak bergerak. Dengan
   * '0 0', sudut kiri atasnya yang terpaku dan bentuknya tumbuh ke kanan
   * bawah. Ini yang paling sering menjelaskan kenapa sebuah elemen "ikut
   * bergeser" padahal yang diubah cuma ukurannya.
   */
  readonly origin?: string;
}

/**
 * Merangkai satu string transform CSS dari penyetel di atas.
 *
 * URUTANNYA TETAP: putar, miringkan, regangkan — dan karena CSS menerapkan
 * daftar transform dari kanan ke kiri terhadap elemennya, itu berarti bentuknya
 * diregangkan dulu, baru dimiringkan, baru diputar. Urutan ini dipilih supaya
 * `rotate` selalu berarti "seberapa miring benda ini di layar", tidak peduli
 * berapa pun regangan dan kemiringannya. Dengan urutan terbalik, mengubah
 * scaleX akan diam-diam mengubah sudut yang terlihat.
 */
export const toTransform = (t: ShapeTransform = {}): string =>
  [
    `rotate(${t.rotate ?? 0}deg)`,
    `skew(${t.skewX ?? 0}deg, ${t.skewY ?? 0}deg)`,
    `scale(${t.scaleX ?? 1}, ${t.scaleY ?? 1})`,
  ].join(' ');

/** Titik tumpu, dengan nilai bawaan yang sama untuk semua elemen. */
export const toOrigin = (t: ShapeTransform = {}): string => t.origin ?? 'center';
