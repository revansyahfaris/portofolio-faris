'use client';

import { useState, useEffect, useCallback } from 'react';
import { portofolioConfig } from '../../config/portofolioConfig';
import { sfx } from '../../lib/sfx';
import {
  FlameBackground,
  Banner3D,
  CharacterPhoto,
  FlameFlareForeground,
  BackgroundWatermark,
  SectionFooter,
  TopNav,
  IdentityCard,
  TabContentCard,
  DegreeCard,
  MetricsCard,
} from './profile';
import { TABS, DEFAULT_GITHUB_USERNAME, FALLBACK_COMMIT_COUNT } from './profile/constants';
import type { TabType } from './profile/types';
import type { GithubCommitSearchResponse } from './profile/types';

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState<TabType>('status');
  const [commitCount, setCommitCount] = useState<number | null>(null);
  const [loadingCommits, setLoadingCommits] = useState<boolean>(true);

  const handleSelectTab = useCallback((tab: TabType) => {
    sfx.playSelect();
    setActiveTab(tab);
  }, []);

  const handlePrevTab = useCallback(() => {
    sfx.playSelect();
    setActiveTab((prev) => {
      const currentIndex = TABS.indexOf(prev);
      return TABS[(currentIndex - 1 + TABS.length) % TABS.length];
    });
  }, []);

  const handleNextTab = useCallback(() => {
    sfx.playSelect();
    setActiveTab((prev) => {
      const currentIndex = TABS.indexOf(prev);
      return TABS[(currentIndex + 1) % TABS.length];
    });
  }, []);

  // Auto fetch GitHub commit counter — dengan AbortController agar tidak
  // menyebabkan memory leak / setState setelah komponen unmount.
  useEffect(() => {
    const controller = new AbortController();

    async function fetchGithubCommits() {
      try {
        const githubUrl = portofolioConfig.socials.github;
        const username = githubUrl.split('/').pop() || DEFAULT_GITHUB_USERNAME;

        const res = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
          headers: {
            Accept: 'application/vnd.github.cloak-preview+json',
          },
          signal: controller.signal,
        });

        if (res.ok) {
          const data: GithubCommitSearchResponse = await res.json();
          setCommitCount(data.total_count);
        } else {
          setCommitCount(FALLBACK_COMMIT_COUNT);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // Komponen sudah unmount sebelum request selesai — abaikan.
          return;
        }
        console.error('Failed to fetch GitHub commits:', err);
        setCommitCount(FALLBACK_COMMIT_COUNT);
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCommits(false);
        }
      }
    }

    fetchGithubCommits();

    return () => controller.abort();
  }, []);

  return (
    <section
      id="profile"
      className="relative min-h-[100dvh] h-[100dvh] w-full bg-zinc-950 text-white overflow-hidden font-sans select-none flex flex-col justify-between p-4 sm:p-6 md:p-10 border-t-2 border-emerald-500/40"
    >
      {/* 1A. Background flame base */}
      <FlameBackground />

      {/* 1D. Persona-style 3D text banners */}
      <Banner3D />

      {/* 1B. Character profile photo */}
      <CharacterPhoto />

      {/* 1C. Foreground amber flare */}
      <FlameFlareForeground />

      {/* 2. Background diagonal watermark */}
      <BackgroundWatermark />

      {/* 3. Top nav / tab switcher */}
      <TopNav activeTab={activeTab} onSelectTab={handleSelectTab} onPrev={handlePrevTab} onNext={handleNextTab} />

      {/* 4. Main status arena — individual 3D perspective card bars */}
      <div
        className="relative z-20 w-full my-auto -translate-y-8 sm:-translate-y-12 md:-translate-y-24 translate-x-12 sm:translate-x-32 md:translate-x-48 py-2 flex flex-col justify-center items-start overflow-visible"
        style={{ transform: 'translateY(32px)' }}
      >
        <div className="w-[95vw] sm:w-[85vw] lg:w-[70vw] -ml-12 sm:-ml-20 md:-ml-28 flex flex-col gap-4">
          <IdentityCard
            name={portofolioConfig.personal.name}
            tagline={portofolioConfig.personal.tagline || 'AN ENGINEER WITH ART IN MIND'}
          />
          <TabContentCard activeTab={activeTab} />
          <DegreeCard />
          <MetricsCard commitCount={commitCount} loadingCommits={loadingCommits} />
        </div>
      </div>

      {/* 5. Footer prompt */}
      <SectionFooter />

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes grunge-jitter-a {
          0%, 100% { transform: translate3d(0, 0, 0) scaleY(1); }
          25%  { transform: translate3d(-2px, 3px, 0) scaleY(0.94); }
          50%  { transform: translate3d(3px, -2px, 0) scaleY(1.06); }
          75%  { transform: translate3d(-1px, -3px, 0) scaleY(0.97); }
        }
        @keyframes grunge-jitter-b {
          0%, 100% { transform: translate3d(0, 0, 0) scaleY(1) skewX(0deg); }
          33%  { transform: translate3d(2px, -3px, 0) scaleY(1.08) skewX(2deg); }
          66%  { transform: translate3d(-3px, 2px, 0) scaleY(0.9) skewX(-3deg); }
        }
        @keyframes grunge-jitter-c {
          0%, 100% { transform: translate3d(0, 0, 0) scaleY(1); }
          33%  { transform: translate3d(-3px, 2px, 0) scaleY(1.1); }
          66%  { transform: translate3d(2px, -3px, 0) scaleY(0.9); }
        }

        .grunge-jitter-a { animation: grunge-jitter-a 1.8s steps(4, jump-end) infinite; }
        .grunge-jitter-b { animation: grunge-jitter-b 1.4s steps(3, jump-end) infinite; }
        .grunge-jitter-c { animation: grunge-jitter-c 1.1s steps(3, jump-end) infinite; }

        /* 📍 "THROWN BOX" ENTRANCE — animasi kartu terlempar maju dari arah kanan belakang */
        @keyframes fly-in-name {
          0%   { opacity: 0; transform: translate3d(300px, -200px, -200px) rotateY(-50deg) rotateZ(35deg) scale(0.5); }
          55%  { opacity: 1; }
          100% { opacity: 1; transform: rotateY(-28deg) rotateX(8deg) rotateZ(-3deg) translateZ(80px) translateX(-30px); }
        }
        @keyframes fly-in-degree {
          0%   { opacity: 0; transform: translate3d(340px, -160px, -200px) rotateY(-50deg) rotateZ(45deg) scale(0.5); }
          55%  { opacity: 1; }
          100% { opacity: 1; transform: rotateY(-24deg) rotateX(6deg) rotateZ(-2deg) translateZ(60px) translateX(-20px); }
        }
        @keyframes fly-in-capabilities {
          0%   { opacity: 0; transform: translate3d(380px, -140px, -200px) rotateY(-50deg) rotateZ(-35deg) scale(0.5); }
          55%  { opacity: 1; }
          100% { opacity: 1; transform: rotateY(-20deg) rotateX(4deg) rotateZ(-1deg) translateZ(30px) translateX(0px); }
        }

        .animate-fly-in-name {
          animation: fly-in-name 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.05s;
        }
        .animate-fly-in-degree {
          animation: fly-in-degree 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.25s;
        }
        .animate-fly-in-capabilities {
          animation: fly-in-capabilities 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.45s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fly-in-name,
          .animate-fly-in-degree,
          .animate-fly-in-capabilities {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
