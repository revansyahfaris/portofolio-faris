'use client';

import { Mail, MessageCircle, Clock, Globe } from 'lucide-react';
import { SectionShell, GithubIcon, LinkedinIcon } from './shared';
import { CLIP, Panel, STAGE, StageBackdrop, StageTitle, TYPE } from './shared/stage';
import { ContactForm, CopyEmailButton } from './connect';
import { portofolioConfig } from '@/config/portofolioConfig';

const { socials, contact, personal } = portofolioConfig;
const { availability } = contact;

/** Jumlah gelombang sinyal pada latar. */
const SIGNAL_RINGS = 5;

/**
 * Tautan kontak langsung.
 *
 * Diurutkan berdasarkan seberapa kecil hambatan bagi pengirimnya, bukan berdasarkan
 * preferensi penerima. Perekrut hampir selalu memakai email, klien lokal hampir
 * selalu memakai WhatsApp, dan keduanya harus menemukan jalurnya masing-masing
 * tanpa perlu mencari.
 */
const DIRECT_CHANNELS = [
  {
    key: 'email',
    label: 'Email',
    value: contact.emailAddress,
    href: `mailto:${contact.emailAddress}`,
    Icon: Mail,
    primary: true,
    external: false,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: 'Pesan langsung',
    href: `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
      `${contact.whatsappGreeting} `
    )}`,
    Icon: MessageCircle,
    primary: true,
    external: true,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: 'Profil profesional',
    href: socials.linkedin,
    Icon: LinkedinIcon,
    primary: false,
    external: true,
  },
  {
    key: 'github',
    label: 'GitHub',
    value: 'Kode & aktivitas',
    href: socials.github,
    Icon: GithubIcon,
    primary: false,
    external: true,
  },
] as const;

/**
 * Bentuk khas latar Connect: gelombang sinyal sepusat dan bidang miring hangat.
 *
 * Cincin gelombangnya statis kecuali satu lapisan terluar. Gelombang yang benar-
 * benar beranimasi memuai akan menarik perhatian terus-menerus dan bersaing dengan
 * formulir — satu-satunya elemen di layar ini yang benar-benar ingin
 * ditindaklanjuti pengunjung.
 */
function ConnectShapes() {
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,58 48,40 42,100 0,100" fill={STAGE.primaryDeep} opacity="0.35" />
        <polygon points="0,56 48,38 48,40 0,58" fill={STAGE.warm} opacity="0.75" />
        <polygon points="54,0 55.6,0 35.6,100 34,100" fill={STAGE.accent} opacity="0.5" />
      </svg>

      <div className="absolute -right-[24vh] -top-[28vh] h-[105vh] w-[105vh]">
        <svg className="h-full w-full" viewBox="0 0 200 200">
          {Array.from({ length: SIGNAL_RINGS }, (_, i) => (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={30 + i * 17}
              fill="none"
              stroke={i % 2 === 0 ? STAGE.primary : STAGE.warm}
              strokeWidth="1.2"
              opacity={0.26 - i * 0.04}
            />
          ))}
          <g className="stage-spin-rev">
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke={STAGE.primary}
              strokeWidth="1.6"
              strokeDasharray="18 12"
              opacity="0.24"
            />
          </g>
        </svg>
      </div>
    </>
  );
}

/**
 * ConnectSection — layar "Dispatch Terminal".
 *
 * Section terakhir sekaligus satu-satunya yang punya tujuan konversi: mengubah
 * pembaca menjadi orang yang benar-benar menghubungi.
 *
 * Susunannya mengikuti hambatan yang menghentikan orang menghubungi:
 * 1. Status ketersediaan paling atas — banyak orang membatalkan niat karena
 *    mengira yang bersangkutan sedang tidak menerima pekerjaan.
 * 2. Jalur langsung (email, WhatsApp) mendahului formulir, karena sebagian orang
 *    lebih percaya mengirim dari kotak masuknya sendiri dan enggan mengisi formulir
 *    yang tidak jelas akan sampai ke mana.
 * 3. Formulir tetap disediakan bagi yang ingin menulis di tempat, dengan perkiraan
 *    waktu balas yang dinyatakan terbuka agar tidak ada yang menunggu tanpa kepastian.
 *
 * Section ini sengaja tidak memakai satu tombol ajakan tunggal. Pembacanya terdiri
 * dari dua kelompok dengan kebiasaan berbeda, dan memaksa keduanya lewat satu jalur
 * akan kehilangan salah satunya.
 */
export default function ConnectSection() {
  return (
    <SectionShell id="contact">
      <StageBackdrop glyph="連絡" glyphCorner="bl" ticker="Dispatch Terminal" tickerColor={STAGE.warm}>
        <ConnectShapes />
      </StageBackdrop>

      <div className="relative z-10 grid h-full grid-rows-[auto_auto_1fr_auto] gap-3 px-5 pb-8 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <StageTitle
          eyebrow="Dispatch Terminal"
          title="Connect"
          hint="Terbuka untuk peluang kerja, proyek freelance, maupun kolaborasi."
        />

        {/* Status ketersediaan. Titik berkedip hanya penguat; keterangannya tetap
            ditulis sebagai teks agar informasinya tidak bergantung pada warna
            maupun gerak. */}
        <Panel
          clip={CLIP.banner}
          fill="rgba(25,227,177,0.14)"
          innerClassName="flex flex-wrap items-center gap-x-5 gap-y-2 px-7 py-2"
        >
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className={availability.isOpen ? 'stage-blink inline-block' : 'inline-block'}
              style={{
                height: '10px',
                width: '10px',
                backgroundColor: availability.isOpen ? STAGE.primary : 'rgba(242,247,244,0.3)',
                clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
              }}
            />
            <span
              className="font-serif font-black uppercase tracking-tight"
              style={{ fontSize: TYPE.lead, color: STAGE.paper }}
            >
              {availability.label}
            </span>
          </span>

          <span
            className="font-mono uppercase tracking-wider"
            style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.55 }}
          >
            {availability.detail}
          </span>

          <span
            className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1 font-mono uppercase tracking-wider"
            style={{ fontSize: TYPE.micro, color: STAGE.warm }}
          >
            <span className="flex items-center gap-1.5">
              <Clock aria-hidden size={11} />
              {availability.responseTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe aria-hidden size={11} />
              {availability.timezone}
            </span>
          </span>
        </Panel>

        <div className="grid min-h-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          {/* Jalur kontak langsung. Tiap baris berbentuk anak panah menghadap kanan,
              memberi arah baca sekaligus menegaskan bahwa ini tautan keluar. */}
          <div className="flex min-h-0 flex-col justify-center gap-2">
            {DIRECT_CHANNELS.map(({ key, label, value, href, Icon, primary, external }) => (
              <a
                key={key}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-3 py-2.5 pl-4 pr-8 transition-transform duration-200 hover:translate-x-1.5"
                style={{
                  backgroundColor: primary ? 'rgba(25,227,177,0.18)' : 'rgba(242,247,244,0.06)',
                  clipPath: CLIP.arrow,
                }}
              >
                <Icon
                  aria-hidden
                  size={17}
                  style={{ color: primary ? STAGE.primary : STAGE.paper }}
                />
                <span className="min-w-0">
                  <span
                    className="block font-serif font-black uppercase tracking-tight"
                    style={{ fontSize: TYPE.lead, color: STAGE.paper }}
                  >
                    {label}
                  </span>
                  <span
                    className="block truncate font-mono uppercase tracking-wider"
                    style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.45 }}
                  >
                    {value}
                  </span>
                </span>
                {external && <span className="sr-only">(membuka di tab baru)</span>}
              </a>
            ))}

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <CopyEmailButton email={contact.emailAddress} />
              <span
                className="font-mono uppercase tracking-wider"
                style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.4 }}
              >
                Berbasis di {personal.location}
              </span>
            </div>
          </div>

          <div className="min-h-0">
            <ContactForm />
          </div>
        </div>

        <footer
          className="flex items-center gap-3 font-mono uppercase tracking-[0.24em]"
          style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.4 }}
        >
          <span>{personal.name}</span>
          <span aria-hidden className="h-px flex-1" style={{ backgroundColor: 'rgba(242,247,244,0.18)' }} />
          <span>Next.js · Tailwind CSS</span>
        </footer>
      </div>
    </SectionShell>
  );
}
