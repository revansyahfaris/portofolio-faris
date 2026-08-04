import { memo } from 'react';
import { ExternalLink, FileText, PenTool } from 'lucide-react';
import { GithubIcon } from '../shared';
import { CLIP, STAGE, StageTag, TYPE } from '../shared/stage';
import type { Quest } from './types';

/**
 * Definisi tombol tautan.
 *
 * Urutannya menentukan urutan tampil dan itu disengaja: demo yang bisa langsung
 * dicoba adalah bukti terkuat bahwa proyeknya nyata, sedangkan kode sumber baru
 * diperiksa oleh sebagian kecil pembaca dan biasanya setelah demo meyakinkan.
 *
 * Ikon GitHub diambil dari SVG inline sendiri karena lucide-react v1 menghapus
 * seluruh ikon merek. Untuk tautan berkas desain dipakai PenTool, bukan logo Figma,
 * sebab berkas desain tidak selalu berada di Figma.
 */
const LINK_DEFINITIONS = [
  { key: 'demo', label: 'Coba Demo', Icon: ExternalLink, primary: true },
  { key: 'repository', label: 'Kode Sumber', Icon: GithubIcon, primary: false },
  { key: 'caseStudy', label: 'Studi Kasus', Icon: FileText, primary: false },
  { key: 'design', label: 'Berkas Desain', Icon: PenTool, primary: false },
] as const;

/**
 * Batas jumlah fitur yang ditampilkan.
 *
 * Diturunkan dari tiga menjadi dua secara sadar. Panel ini sebelumnya memuat tagline,
 * masalah, solusi, tiga fitur, daftar teknologi, dan tautan sekaligus — tujuh blok
 * yang saling berebut perhatian, sehingga tidak ada satu pun yang benar-benar
 * menonjol. Fitur adalah bagian yang paling bisa diringkas tanpa kehilangan inti
 * ceritanya: masalah dan solusi sudah menjelaskan proyeknya, sedangkan daftar fitur
 * hanya memperinci.
 */
const MAX_FEATURES = 2;

export const QuestDetail = memo(function QuestDetail({ quest }: { readonly quest: Quest }) {
  const { code, tagline, problem, solution, features, technologies, links } = quest;
  const availableLinks = LINK_DEFINITIONS.filter((definition) => links[definition.key]);

  const headingStyle = { fontSize: TYPE.micro, color: STAGE.accent };
  const bodyStyle = { fontSize: TYPE.body, color: STAGE.paper, opacity: 0.75 };

  return (
    <div
      id={`quest-panel-${code}`}
      role="tabpanel"
      className="flex h-full min-h-0 flex-col justify-center overflow-hidden"
    >
      {/* Tagline naik menjadi pernyataan utama panel dan dibuat jauh lebih besar
          dari sebelumnya. Satu kalimat inilah yang menentukan apakah pembaca
          melanjutkan ke bagian masalah dan solusi. */}
      <p
        className="font-serif font-black uppercase leading-[0.92] tracking-tight"
        style={{ fontSize: TYPE.h2, color: STAGE.paper }}
      >
        {tagline}
      </p>

      <span
        aria-hidden
        className="mt-4 block h-[5px] w-24"
        style={{ backgroundColor: STAGE.accent, clipPath: CLIP.blade }}
      />

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <div>
          <h4 className="font-mono font-black uppercase tracking-[0.26em]" style={headingStyle}>
            Masalah
          </h4>
          <p className="mt-1.5 leading-relaxed" style={bodyStyle}>
            {problem}
          </p>
        </div>
        <div>
          <h4 className="font-mono font-black uppercase tracking-[0.26em]" style={headingStyle}>
            Solusi
          </h4>
          <p className="mt-1.5 leading-relaxed" style={bodyStyle}>
            {solution}
          </p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-1.5">
        {features.slice(0, MAX_FEATURES).map((feature) => (
          <li key={feature} className="flex gap-2.5 leading-snug" style={bodyStyle}>
            <span
              aria-hidden
              className="mt-[6px] h-[8px] w-[8px] shrink-0"
              style={{ backgroundColor: STAGE.primary, clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {technologies.map((tech) => (
          <StageTag key={tech} label={tech} on="dark" />
        ))}
      </div>

      <div className="mt-5">
        {availableLinks.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {availableLinks.map(({ key, label, Icon, primary }) => (
              <a
                key={key}
                href={links[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2 pl-4 pr-6 font-mono font-black uppercase tracking-widest transition-opacity hover:opacity-80"
                style={{
                  fontSize: TYPE.tiny,
                  backgroundColor: primary ? STAGE.accent : 'rgba(25,227,177,0.16)',
                  color: primary ? STAGE.paper : STAGE.primary,
                  clipPath: CLIP.arrow,
                }}
              >
                <Icon aria-hidden size={13} />
                {label}
                <span className="sr-only">(membuka di tab baru)</span>
              </a>
            ))}
          </div>
        ) : (
          /* Menyatakan ketiadaan tautan secara terbuka lebih baik daripada memasang
             tombol yang mengarah ke halaman tidak relevan: pembaca yang menekan
             "Demo" lalu mendarat di halaman profil umum akan menyimpulkan proyeknya
             tidak benar-benar ada. */
          <p
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.35 }}
          >
            Tautan publik belum tersedia untuk proyek ini.
          </p>
        )}
      </div>
    </div>
  );
});
