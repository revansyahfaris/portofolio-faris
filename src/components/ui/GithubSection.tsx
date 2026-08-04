'use client';

import { AlertTriangle } from 'lucide-react';
import { SectionShell, GithubIcon } from './shared';
import { CLIP, Panel, PERSPECTIVE_PARENT, STAGE, StageBackdrop, StageTitle, TYPE } from './shared/stage';
import {
  ContributionGraph,
  GithubSkeleton,
  LanguageBar,
  RepoCard,
  StatBar,
  useGithubStats,
} from './github';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { portofolioConfig } from '@/config/portofolioConfig';

/** Format tanggal singkat untuk menandai kapan data terakhir diambil. */
const TIME_FORMATTER = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

/** Jumlah kartu repositori yang ditampilkan. Dibatasi agar seluruh isi tetap muat satu layar. */
const VISIBLE_REPOS = 3;

/**
 * Nilai acuan tiap statistik.
 *
 * Batang statistik memerlukan pembanding, dan tanpa acuan yang ditetapkan, batang
 * apa pun akan selalu tampak penuh atau selalu tampak kosong. Angka di bawah ini
 * adalah patokan "aktivitas yang layak disebut konsisten" untuk seorang mahasiswa,
 * bukan perbandingan terhadap pengembang profesional penuh waktu — perbandingan
 * semacam itu tidak akan informatif maupun jujur.
 */
const STAT_BASELINE = {
  contributions: 800,
  repos: 30,
  stars: 40,
  streak: 30,
} as const;

/**
 * Bentuk khas latar GitHub: bidang diagonal besar dan bingkai plat identitas.
 *
 * Arahnya sengaja dipindahkan dari "monitor perangkat keras" menjadi "berkas
 * identitas". Garis pindai dan vignette CRT dibuang seluruhnya — keduanya membuat
 * bagian ini terbaca sebagai alat ukur, padahal isinya adalah pernyataan tentang
 * siapa orang ini sebagai pengembang.
 */
function GithubShapes() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polygon points="0,0 40,0 22,100 0,100" fill={STAGE.primaryDeep} opacity="0.42" />
      <polygon points="38,0 39.6,0 21.6,100 20,100" fill={STAGE.primary} opacity="0.7" />
      <polygon points="43,0 43.8,0 25.8,100 25,100" fill={STAGE.accent} opacity="0.55" />
      <polygon points="100,62 100,100 66,100" fill={STAGE.primary} opacity="0.06" />
    </svg>
  );
}

/**
 * GithubSection — layar "Developer Identity".
 *
 * Satu-satunya section yang isinya diambil dari sistem luar saat runtime. Bentuknya
 * kini menyerupai lembar identitas dan atribut karakter, bukan panel instrumen:
 * plat identitas di kiri, batang statistik bergaya lembar status di kanan, dan
 * kalender kontribusi sebagai pita tanda tangan di bawah.
 *
 * Perubahan itu penting karena angka-angka di sini bukan pembacaan sensor melainkan
 * pernyataan tentang kebiasaan kerja seseorang. Bentuk lembar status menyampaikan
 * maksud itu; bentuk monitor justru menyembunyikannya di balik nuansa teknis.
 *
 * Tiga keadaan ditangani sepenuhnya:
 * - memuat: kerangka berbentuk hasil akhir, agar tinggi elemen tidak berubah
 * - gagal : pesan jujur beserta tautan langsung ke profil GitHub, sehingga
 *           kegagalan memuat data tidak membuat pengunjung kehilangan jalan
 * - kosong: bagian daftar tidak dirender alih-alih menampilkan kisi kosong
 *
 * Permintaan jaringan baru dimulai ketika section mendekati viewport. Section ini
 * berada jauh di bawah halaman; memanggilnya saat halaman baru dibuka hanya akan
 * merebut bandwidth dari konten yang sedang benar-benar dilihat pengguna.
 */
export default function GithubSection() {
  const [triggerRef, isNearViewport] = useInViewOnce<HTMLDivElement>();
  const { status, data, error } = useGithubStats(isNearViewport);

  const repos = data ? (data.pinned.length > 0 ? data.pinned : data.topRepos) : [];
  const isPinned = Boolean(data && data.pinned.length > 0);
  const topLanguage = data?.languages[0]?.name;

  return (
    <SectionShell id="github">
      <StageBackdrop glyph="記録" glyphCorner="br" ticker="Developer Identity">
        <GithubShapes />
      </StageBackdrop>

      <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-3 px-5 pb-8 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <StageTitle
          eyebrow="Developer Identity"
          title="GitHub"
          hint="Diambil langsung dari GitHub, disegarkan setiap jam."
          jitter={false}
        />

        <div ref={triggerRef} className="min-h-0">
          {status === 'success' && data ? (
            <div className="flex h-full min-h-0 flex-col gap-3">
              <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12">
                {/* Plat identitas. Nama pengguna diperlakukan sebagai nama karakter,
                    bahasa utama sebagai kelasnya. */}
                <div style={PERSPECTIVE_PARENT}>
                  <Panel
                    clip={CLIP.cut}
                    fill={STAGE.inkSoft}
                    shadow={STAGE.primary}
                    offset={14}
                    className="h-full min-h-0"
                    style={{ transform: 'rotateY(8deg)' }}
                    innerClassName="flex h-full min-h-0 flex-col justify-between p-5"
                  >
                    <div>
                      <span
                        className="font-mono font-black uppercase tracking-[0.3em]"
                        style={{ fontSize: TYPE.micro, color: STAGE.accent }}
                      >
                        Handle
                      </span>
                      <h3
                        className="mt-1 break-all font-serif font-black uppercase leading-[0.88] tracking-tighter"
                        style={{ fontSize: TYPE.h3, color: STAGE.primary }}
                      >
                        @{data.login}
                      </h3>

                      {topLanguage && (
                        <p
                          className="mt-2 font-mono uppercase tracking-wider"
                          style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.6 }}
                        >
                          Bahasa utama · {topLanguage}
                        </p>
                      )}
                    </div>

                    {data.languages.length > 0 && <LanguageBar languages={data.languages} />}

                    <a
                      href={data.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 px-3 py-2 font-mono font-black uppercase tracking-widest transition-opacity hover:opacity-80"
                      style={{
                        fontSize: TYPE.micro,
                        backgroundColor: STAGE.primary,
                        color: STAGE.ink,
                        clipPath: CLIP.arrow,
                      }}
                    >
                      <GithubIcon size={12} />
                      Buka profil
                    </a>
                  </Panel>
                </div>

                {/* Batang statistik bergaya lembar atribut karakter. */}
                <div className="flex min-h-0 flex-col justify-center gap-3">
                  <StatBar
                    label="Contribution"
                    value={String(data.totalContributions)}
                    ratio={data.totalContributions / STAT_BASELINE.contributions}
                  />
                  <StatBar
                    label="Repository"
                    value={String(data.publicRepos)}
                    ratio={data.publicRepos / STAT_BASELINE.repos}
                    color={STAGE.warm}
                  />
                  <StatBar
                    label="Stars"
                    value={String(data.totalStars)}
                    ratio={data.totalStars / STAT_BASELINE.stars}
                    color={STAGE.highlight}
                  />
                  <StatBar
                    label="Streak"
                    value={`${data.currentStreak}h`}
                    ratio={data.currentStreak / STAT_BASELINE.streak}
                    color={STAGE.accent}
                  />

                  {repos.length > 0 && (
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {repos.slice(0, VISIBLE_REPOS).map((repo) => (
                        <RepoCard key={repo.name} repo={repo} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Kalender kontribusi sebagai pita tanda tangan di dasar layar. */}
              <div className="shrink-0">
                <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
                  <span
                    className="font-mono font-black uppercase tracking-[0.24em]"
                    style={{ fontSize: TYPE.micro, color: STAGE.primary, opacity: 0.7 }}
                  >
                    Jejak setahun terakhir
                  </span>
                  <span
                    className="font-mono uppercase tracking-wider"
                    style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.45 }}
                  >
                    {isPinned ? 'Repositori tersemat' : 'Repositori teratas'} · rentetan terpanjang{' '}
                    {data.longestStreak} hari · diambil {TIME_FORMATTER.format(new Date(data.fetchedAt))}
                  </span>
                </div>
                <ContributionGraph days={data.contributions} total={data.totalContributions} />
              </div>
            </div>
          ) : status === 'error' ? (
            <div className="flex h-full min-h-0 items-center">
              <Panel
                clip={CLIP.cut}
                fill={STAGE.inkSoft}
                shadow={STAGE.accent}
                offset={10}
                innerClassName="flex flex-col items-start gap-3 p-6"
              >
                <div role="status">
                  <AlertTriangle aria-hidden size={22} style={{ color: STAGE.warm }} />
                  <p
                    className="mt-2 font-serif font-black uppercase tracking-tight"
                    style={{ fontSize: TYPE.h3, color: STAGE.primary }}
                  >
                    Berkas identitas tidak terbaca
                  </p>
                  <p
                    className="mt-1 font-mono"
                    style={{ fontSize: TYPE.small, color: STAGE.paper, opacity: 0.7 }}
                  >
                    {error}
                  </p>
                  <a
                    href={portofolioConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 px-3 py-2 font-mono font-black uppercase tracking-widest transition-opacity hover:opacity-80"
                    style={{
                      fontSize: TYPE.micro,
                      backgroundColor: STAGE.primary,
                      color: STAGE.ink,
                      clipPath: CLIP.arrow,
                    }}
                  >
                    <GithubIcon size={12} />
                    Buka profil langsung
                  </a>
                </div>
              </Panel>
            </div>
          ) : (
            <GithubSkeleton />
          )}
        </div>

        {/* Baris status menggantikan penomoran halaman: section ini tidak punya
            daftar pilihan, sehingga tidak ada halaman untuk dinomori. */}
        <footer
          className="flex items-center gap-3 font-mono uppercase tracking-[0.24em]"
          style={{ fontSize: TYPE.micro, color: STAGE.primary }}
        >
          <span
            aria-hidden
            className="stage-blink inline-block h-[9px] w-[9px]"
            style={{ backgroundColor: STAGE.primary, clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
          />
          <span>
            {status === 'success'
              ? 'Data terverifikasi'
              : status === 'error'
                ? 'Verifikasi gagal'
                : 'Memverifikasi'}
          </span>
          <span aria-hidden className="h-px flex-1" style={{ backgroundColor: 'rgba(25,227,177,0.28)' }} />
          <span style={{ opacity: 0.55 }}>cache 1 jam</span>
        </footer>
      </div>
    </SectionShell>
  );
}
