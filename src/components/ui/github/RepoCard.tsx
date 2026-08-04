import { memo } from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { CLIP, Panel, STAGE, TYPE } from '../shared/stage';
import type { RepoSummary } from '@/lib/github/types';

/**
 * Kartu satu repositori publik.
 *
 * Seluruh kartu dibungkus satu <a>, bukan sekadar judulnya, sehingga target kliknya
 * besar dan mudah dijangkau pada layar sentuh. Tautan diberi rel "noopener
 * noreferrer" karena membuka tab baru tanpa itu memberi halaman tujuan akses ke
 * objek window halaman ini.
 */
export const RepoCard = memo(function RepoCard({ repo }: { readonly repo: RepoSummary }) {
  const { name, description, url, stars, forks, language, languageColor } = repo;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transition-transform duration-200 hover:-translate-y-1"
    >
      <Panel
        clip={CLIP.cutTR}
        fill="rgba(25,227,177,0.09)"
        innerClassName="flex h-full flex-col p-3"
      >
        <div className="flex items-start justify-between gap-2">
          <h4
            className="break-all font-mono font-bold"
            style={{ fontSize: TYPE.small, color: STAGE.primary }}
          >
            {name}
          </h4>
          <ExternalLink
            aria-hidden
            size={13}
            className="mt-0.5 shrink-0"
            style={{ color: STAGE.paper, opacity: 0.4 }}
          />
        </div>

        <p
          className="mt-1 grow leading-snug"
          style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.6 }}
        >
          {description ?? 'Belum ada deskripsi pada repositori ini.'}
        </p>

        <div
          className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono"
          style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.55 }}
        >
          {language && (
            <span className="flex items-center gap-1.5">
              {/* Titik warna hanya penguat; nama bahasa tetap ditulis agar
                  informasinya tidak bergantung pada kemampuan membedakan warna. */}
              <span
                aria-hidden
                className="inline-block h-2 w-2"
                style={{
                  backgroundColor: languageColor ?? STAGE.primary,
                  clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
                }}
              />
              {language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star aria-hidden size={11} />
            {stars}
            <span className="sr-only">bintang</span>
          </span>
          <span className="flex items-center gap-1">
            <GitFork aria-hidden size={11} />
            {forks}
            <span className="sr-only">fork</span>
          </span>
        </div>
      </Panel>
    </a>
  );
});
