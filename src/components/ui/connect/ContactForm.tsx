'use client';

import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { CONTACT_TOPICS } from '@/lib/contact/validateContactPayload';
import { CLIP, STAGE, TYPE } from '../shared/stage';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_FORM = {
  name: '',
  email: '',
  topic: CONTACT_TOPICS[0] as string,
  message: '',
};

const INPUT_CLASS =
  'w-full px-2.5 py-1.5 font-mono outline-none transition-colors disabled:opacity-60';
const LABEL_CLASS = 'block font-mono uppercase tracking-widest mb-0.5';

/**
 * Gaya bidang isian dan labelnya.
 *
 * Ditulis sebagai objek gaya, bukan kelas Tailwind, karena warnanya berasal dari
 * palet section yang disimpan sebagai konstanta — dan nilai yang baru terbentuk
 * saat runtime tidak dapat dipakai sebagai kelas utilitas.
 *
 * Ukuran huruf memakai clamp() berbasis satuan vh agar formulir ikut menyusut
 * mengikuti tinggi jendela; pada tata letak satu layar, formulir yang tidak bisa
 * mengecil akan memaksa munculnya gulir.
 */
const inputStyle = {
  fontSize: TYPE.small,
  backgroundColor: 'rgba(6,16,13,0.72)',
  border: `1.5px solid rgba(25,227,177,0.35)`,
  color: STAGE.paper,
};

const labelStyle = {
  fontSize: TYPE.micro,
  color: STAGE.primary,
  opacity: 0.75,
};

/**
 * Formulir kontak yang benar-benar terkirim ke server.
 *
 * Beberapa keputusan yang perlu dipertahankan bila komponen ini diubah:
 *
 * - Isian tidak dikosongkan ketika pengiriman gagal. Memaksa pengguna mengetik
 *   ulang pesan panjang setelah gangguan jaringan adalah cara tercepat kehilangan
 *   calon kontak yang sudah bersedia menulis.
 * - Setiap input punya <label> yang benar-benar tertaut lewat htmlFor/id, bukan
 *   sekadar placeholder. Placeholder hilang begitu pengguna mulai mengetik dan
 *   tidak dibacakan sebagai nama bidang oleh sebagian pembaca layar.
 * - Umpan balik status dibungkus role="status" dengan aria-live, sehingga
 *   perubahan hasil pengiriman diumumkan tanpa perlu memindahkan fokus.
 * - Tombol kirim dinonaktifkan selama proses berjalan untuk mencegah pengiriman
 *   ganda akibat klik berulang.
 */
export function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  /** Bidang umpan bot. Disembunyikan dari pengguna, tetapi akan diisi pengirim otomatis. */
  const [honeypot, setHoneypot] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, honeypot }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Pesan gagal dikirim.');
      }

      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Pesan gagal dikirim.');
    }
  }

  const isSubmitting = status === 'submitting';

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex h-full min-h-0 flex-col items-start justify-center gap-3 p-6"
        style={{
          backgroundColor: 'rgba(6,16,13,0.78)',
          clipPath: CLIP.cut,
        }}
      >
        <div>
          <CheckCircle2 aria-hidden size={28} style={{ color: STAGE.primary }} />
          <h3
            className="mt-2 font-serif font-black uppercase tracking-tight"
            style={{ fontSize: TYPE.h3, color: STAGE.paper }}
          >
            Pesan terkirim.
          </h3>
          <p
            className="mt-1.5 leading-snug"
            style={{ fontSize: TYPE.small, color: STAGE.paper, opacity: 0.7 }}
          >
            Terima kasih sudah menghubungi. Balasan biasanya dikirim dalam 1×24 jam ke alamat email
            yang Anda tuliskan.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-3 px-3 py-2 font-mono font-black uppercase tracking-widest transition-opacity hover:opacity-80"
            style={{
              fontSize: TYPE.micro,
              border: `1.5px solid ${STAGE.primary}`,
              color: STAGE.primary,
            }}
          >
            Kirim pesan lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative flex h-full min-h-0 flex-col p-4 sm:p-5"
      style={{
        backgroundColor: 'rgba(6,16,13,0.78)',
        clipPath: CLIP.cut,
      }}
    >
      <div className="flex h-full min-h-0 flex-col">
      <h3
        className="font-serif font-black uppercase leading-none tracking-tight"
        style={{ fontSize: TYPE.h3, color: STAGE.paper }}
      >
        Kirim Pesan Langsung
      </h3>
      <p
        className="mt-1 font-mono uppercase tracking-wider"
        style={{ fontSize: TYPE.micro, color: STAGE.primary, opacity: 0.7 }}
      >
        Sebutkan konteksnya sesingkat mungkin — pesan yang jelas dibalas lebih cepat.
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={LABEL_CLASS} style={labelStyle}>
            Nama
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={80}
            disabled={isSubmitting}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={INPUT_CLASS}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={LABEL_CLASS} style={labelStyle}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={160}
            disabled={isSubmitting}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={INPUT_CLASS}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="mt-2">
        <label htmlFor="contact-topic" className={LABEL_CLASS} style={labelStyle}>
          Topik
        </label>
        <select
          id="contact-topic"
          name="topic"
          disabled={isSubmitting}
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className={INPUT_CLASS}
            style={inputStyle}
        >
          {CONTACT_TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col">
        <label htmlFor="contact-message" className={LABEL_CLASS} style={labelStyle}>
          Pesan
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={3}
          minLength={20}
          maxLength={2000}
          disabled={isSubmitting}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          aria-describedby="contact-message-hint"
          className={`${INPUT_CLASS} min-h-0 flex-1 resize-none`}
          style={inputStyle}
        />
        <p
          id="contact-message-hint"
          className="mt-0.5 font-mono uppercase tracking-wider"
          style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.45 }}
        >
          {form.message.length}/2000 karakter · minimal 20
        </p>
      </div>

      {/* Bidang umpan bot. Disembunyikan lewat posisi dan aria-hidden, bukan lewat
          display:none — sebagian bot mengabaikan input yang benar-benar tersembunyi
          namun tetap mengisi input yang berada di luar layar. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company-site">Jangan isi bidang ini</label>
        <input
          id="contact-company-site"
          name="company_site"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 flex w-full items-center justify-center gap-2 py-2.5 font-mono font-black uppercase tracking-widest transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          fontSize: TYPE.tiny,
          backgroundColor: STAGE.primary,
          color: STAGE.ink,
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden size={15} className="animate-spin" />
            Mengirim
          </>
        ) : (
          <>
            <Send aria-hidden size={15} />
            Kirim Pesan
          </>
        )}
      </button>

      {/* Wadah pengumuman selalu dirender agar pembaca layar sudah memantaunya
          sebelum isinya muncul. Wadah yang baru dibuat bersamaan dengan pesannya
          sering kali tidak terbaca. */}
      <div role="status" aria-live="polite" className="mt-2 min-h-[0.9rem]">
        {status === 'error' && errorMessage && (
          <p
            className="flex items-start gap-2 font-mono"
            style={{ fontSize: TYPE.micro, color: STAGE.primary }}
          >
            <AlertTriangle aria-hidden size={12} className="mt-[1px] shrink-0" />
            {errorMessage}
          </p>
        )}
      </div>
      </div>
    </form>
  );
}
