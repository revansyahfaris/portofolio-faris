import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/ui/HeroSection';
import ProfileSection from '@/components/ui/ProfileSection';

// 📍 Dynamic Import tanpa opsi 'ssr' agar valid di Server Component
const ResultPlaneSection = dynamic(() => import('@/components/ui/ResultPlaneSection'));
const ProjectsSection = dynamic(() => import('@/components/ui/ProjectsSection'));
const ExperienceSection = dynamic(() => import('@/components/ui/ExperienceSection'));
const GithubSection = dynamic(() => import('@/components/ui/GithubSection'));

// Skeleton Loader Fallback
function SectionSkeleton() {
  return (
    <div className="w-full h-[600px] bg-zinc-900/40 animate-pulse rounded-xl border border-zinc-800/60 my-6" />
  );
}

export default function Home() {
  return (
    <main className="relative bg-zinc-950 h-[100dvh] w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth text-white custom-persona-scroll">
      
      {/* 1. HERO SECTION */}
      <section className="w-full h-[100dvh] snap-start snap-always shrink-0">
        <HeroSection />
      </section>

      {/* 2. PROFILE SECTION */}
      <section id="profile" className="w-full h-[100dvh] snap-start snap-always shrink-0 style-boundary">
        <ProfileSection />
      </section>

      {/* 3. DOWNSTREAM SECTIONS */}
      <Suspense fallback={<SectionSkeleton />}>
        <section className="w-full max-w-6xl mx-auto px-6 py-12 snap-start style-boundary">
          <ResultPlaneSection />
        </section>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <section id="projects" className="w-full snap-start style-boundary">
          <ProjectsSection />
        </section>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <section id="experience" className="w-full snap-start style-boundary">
          <ExperienceSection />
        </section>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <section id="github" className="w-full snap-start style-boundary">
          <GithubSection />
        </section>
      </Suspense>

      {/* 4. FOOTER */}
      <footer className="w-full border-t-2 border-white/20 bg-zinc-950 py-8 text-center text-xs font-mono text-zinc-500 snap-end">
        © 2026 MUHAMMAD FARIS REVANSYAH. ALL RIGHTS RESERVED.
      </footer>

    </main>
  );
}