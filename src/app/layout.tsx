// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Gelasio } from 'next/font/google';
import './globals.css';
import { portofolioConfig } from '@/config/portofolioConfig';
import { FREEZE_IDLE_SECTIONS } from '@/config/motionFlags';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

/**
 * Cadangan untuk Georgia.
 *
 * Georgia adalah font rancangan situs ini dan sudah tersedia di hampir semua
 * Windows dan macOS, sehingga bagi mayoritas pengunjung Gelasio tidak akan pernah
 * benar-benar dipakai. Ia tetap disertakan karena Georgia tidak ada di Linux dan
 * Android, dan Gelasio dirancang metric-compatible dengan Georgia — lebar tiap
 * hurufnya sama persis, sehingga tata letaknya tidak bergeser sedikit pun.
 *
 * Hanya bobot 400 dan 700 yang diambil, sama seperti bobot yang benar-benar
 * dimiliki Georgia. Mengambil bobot lain hanya akan menambah berkas yang
 * pasangannya tidak ada saat Georgia yang dipakai.
 */
const gelasio = Gelasio({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-gelasio',
  display: 'swap',
});

const { personal, socials } = portofolioConfig;

/**
 * Alamat kanonik situs.
 *
 * Dibaca dari variabel lingkungan agar pratinjau (preview deployment) tidak ikut
 * mengklaim alamat produksi. Nilai cadangannya hanya dipakai saat pengembangan lokal.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const SITE_DESCRIPTION =
  'Portofolio Muhammad Faris Revansyah — mahasiswa Teknik Komputer Universitas Diponegoro yang mengerjakan pengembangan web full-stack, sistem tertanam, dan perancangan antarmuka.';

/**
 * Metadata halaman.
 *
 * Diisi lengkap, bukan sekadar judul dan deskripsi, karena tautan portofolio
 * hampir selalu dibagikan lewat pesan atau media sosial. Tanpa openGraph, tautannya
 * muncul sebagai teks polos tanpa pratinjau — dan itu menurunkan kemungkinan dibuka
 * jauh lebih besar daripada perbedaan desain halaman mana pun.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${personal.name} — ${personal.tagline}`,
    template: `%s | ${personal.nickname}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Muhammad Faris Revansyah',
    'Portofolio',
    'Frontend Developer',
    'Full-Stack Developer',
    'UI/UX Designer',
    'Embedded System',
    'Teknik Komputer UNDIP',
  ],
  authors: [{ name: personal.name, url: socials.github }],
  creator: personal.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: `${personal.name} — Portfolio`,
    title: `${personal.name} — ${personal.tagline}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personal.name} — ${personal.tagline}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Data terstruktur skema Person.
 *
 * Membantu mesin pencari mengenali halaman ini sebagai profil seseorang beserta
 * tautan resminya, bukan sekadar halaman biasa. Ditulis sebagai skrip JSON-LD
 * karena itu format yang direkomendasikan dan tidak memengaruhi tampilan sama sekali.
 */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personal.name,
  alternateName: personal.nickname,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  jobTitle: 'Software & Embedded Systems Engineer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: personal.location,
  },
  sameAs: [socials.github, socials.linkedin, socials.instagram],
};

/**
 * RootLayout
 *
 * Layout dasar Next.js App Router. Preconnect diarahkan ke Cloudinary karena
 * gambar hero (elemen Largest Contentful Paint halaman ini) dimuat dari domain
 * tersebut — membuka koneksi lebih awal memangkas waktu sebelum gambar mulai diunduh.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${gelasio.variable}`}
      // Sakelar diagnosis sementara; aturannya ada di globals.css. Dipasang
      // sebagai atribut dan bukan sebagai kelas supaya jelas terbaca sebagai
      // keadaan pengembangan, bukan sebagai bagian dari gaya rancangan.
      data-freeze-idle-sections={FREEZE_IDLE_SECTIONS ? '' : undefined}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          // Isi skema berasal sepenuhnya dari konfigurasi internal, bukan dari
          // masukan pengguna, sehingga penyisipan langsung di sini aman.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      {/* Warna dasar ditulis langsung, bukan lewat kelas Tailwind, karena nilainya
          berasal dari STAGE pada shared/stage/theme.ts — dan konstanta yang dibaca
          saat runtime tidak dapat dipakai sebagai nama kelas utilitas. */}
      <body
        className="font-sans antialiased selection:bg-[#FF3B2D] selection:text-white"
        style={{ backgroundColor: '#06100D', color: '#F2F7F4' }}
      >
        {/* Tautan lompat. Wajib menjadi elemen fokus pertama halaman: tanpa itu,
            pengguna papan ketik harus menelusuri seluruh menu Hero setiap kali
            memuat halaman hanya untuk mencapai isi utama. */}
        <a
          href="#profile"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-black focus:uppercase focus:text-[#06100D]"
        >
          Lompat ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
