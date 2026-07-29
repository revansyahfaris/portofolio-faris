// src/app/page.tsx
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/ui/HeroSection';
import ProfileSection from '@/components/ui/ProfileSection';

// 📍 Dynamic Import: Section bawah dikeluarkan dari chunk hidrasi awal
const ResultPlaneSection = dynamic(() => import('@/components/ui/ResultPlaneSection'), {
  ssr: true,
});
const ProjectsSection = dynamic(() => import('@/components/ui/ProjectsSection'), {
  ssr: true,
});
const ExperienceSection = dynamic(() => import('@/components/ui/ExperienceSection'), {
  ssr: true,
});
const GithubSection = dynamic(() => import('@/components/ui/GithubSection'), {
  ssr: false, // Section ini di-render murni di client saat dibutuhkan
});

// Skeleton Loader Sederhana untuk Smooth Hydration Fallback
function SectionSkeleton() {
  return (
    <div className="w-full h-[600px] bg-zinc-900/40 animate-pulse rounded-xl border border-zinc-800/60 my-6" />
  );
}

// src/app/page.tsx
export default function Home() {
  return (
    <main className="relative bg-zinc-950 h-[100dvh] w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth text-white custom-persona-scroll">
      
      {/* 1. HERO SECTION */}
      <section className="w-full h-[100dvh] snap-start snap-always shrink-0 style-boundary">
        <HeroSection />
      </section>

      {/* 2. PROFILE SECTION */}
      <section id="profile" className="w-full h-[100dvh] snap-start snap-always shrink-0 style-boundary">
        <ProfileSection />
      </section>

      {/* 3. DOWNSTREAM SECTIONS */}
      <div className="w-full style-boundary">
        <Suspense fallback={<SectionSkeleton />}>
          <section className="max-w-6xl mx-auto px-6 py-12 snap-start">
            <ResultPlaneSection />
          </section>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <section id="projects" className="style-boundary snap-start">
            <ProjectsSection />
          </section>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <section id="experience" className="style-boundary snap-start">
            <ExperienceSection />
          </section>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <section id="github" className="style-boundary snap-start">
            <GithubSection />
          </section>
        </Suspense>

        <footer className="border-t-2 border-white/20 bg-zinc-950 py-8 text-center text-xs font-mono text-zinc-500 snap-end">
          © 2026 MUHAMMAD FARIS REVANSYAH. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </main>
  );
}