'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CLIP, STAGE, TYPE } from '../shared/stage';

/**
 * Tombol menyalin alamat email ke papan klip.
 *
 * Disediakan berdampingan dengan tautan mailto, bukan menggantikannya. Sebagian
 * pengguna membuka email lewat peramban dan tidak punya aplikasi surel bawaan yang
 * tertaut, sehingga menekan mailto justru tidak menghasilkan apa-apa — dan mereka
 * biasanya menyerah alih-alih menyalin alamatnya manual.
 *
 * Konfirmasi "tersalin" ditampilkan lewat teks, bukan hanya perubahan ikon, agar
 * hasilnya juga tersampaikan kepada pembaca layar.
 */
export function CopyEmailButton({ email }: { readonly email: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Timer dibersihkan saat komponen dilepas agar tidak memanggil setState pada
  // komponen yang sudah tidak ter-mount.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Akses papan klip bisa ditolak (konteks tidak aman atau izin dicabut).
      // Tautan mailto dan alamat yang tertulis di layar tetap menjadi jalan keluar,
      // jadi kegagalan di sini tidak perlu ditampilkan sebagai kesalahan.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 py-2 pl-3 pr-5 font-mono font-black uppercase tracking-widest transition-opacity hover:opacity-80"
      style={{
        fontSize: TYPE.micro,
        backgroundColor: 'rgba(25,227,177,0.16)',
        color: STAGE.primary,
        clipPath: CLIP.arrow,
      }}
    >
      {copied ? <Check aria-hidden size={13} /> : <Copy aria-hidden size={13} />}
      {copied ? 'Tersalin' : 'Salin Email'}
    </button>
  );
}
