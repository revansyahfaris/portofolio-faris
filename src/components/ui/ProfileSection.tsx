'use client';

import { useState, useEffect, useCallback } from 'react';
import { portofolioConfig } from '../../config/portofolioConfig';
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
import { useViewportPresence } from '@/hooks/useViewportPresence';

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState<TabType>('status');
  const [commitCount, setCommitCount] = useState<number | null>(null);
  const [loadingCommits, setLoadingCommits] = useState<boolean>(true);

  const sectionRef = useViewportPresence<HTMLElement>();

  const handleSelectTab = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handlePrevTab = useCallback(() => {
    setActiveTab((prev) => {
      const currentIndex = TABS.indexOf(prev);
      return TABS[(currentIndex - 1 + TABS.length) % TABS.length];
    });
  }, []);

  const handleNextTab = useCallback(() => {
    setActiveTab((prev) => {
      const currentIndex = TABS.indexOf(prev);
      return TABS[(currentIndex + 1) % TABS.length];
    });
  }, []);

  // Auto fetch GitHub commit counter — AbortController & Memory Leak Safe
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
      ref={sectionRef}
      id="profile"
      className="relative min-h-[100dvh] h-[100dvh] w-full bg-zinc-950 text-white overflow-hidden font-sans select-none flex flex-col justify-between p-4 sm:p-6 md:p-10 border-t-2 border-emerald-500/40"
      style={{ 
        contentVisibility: 'auto',
        containIntrinsicSize: '100vh',
      }}
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

      {/* Keyframe animations & GPU Optimizations */}
      
    </section>
  );
}