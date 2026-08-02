// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Muhammad Faris Revansyah | Portfolio',
  description: 'An Engineer with Art in Mind',
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
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-zinc-950 text-white font-sans antialiased selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}