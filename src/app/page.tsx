'use client';

import HeroSection from '@/components/ui/HeroSection';
import ResultPlaneSection from '@/components/ui/ResultPlaneSection';
import ProjectsSection from '@/components/ui/ProjectsSection';
import ExperienceSection from '@/components/ui/ExperienceSection';
import GithubSection from '@/components/ui/GithubSection';

export default function Home() {
  return (
    <main className="relative bg-zinc-950 min-h-screen overflow-x-hidden">
      <HeroSection />
      
      {/* 2.5D PSEUDO 3D RESULT PLANE */}
      <div className="max-w-6xl mx-auto px-6">
        <ResultPlaneSection />
      </div>

      <ProjectsSection />
      <ExperienceSection />
      <GithubSection />

      <footer className="border-t-2 border-white/20 bg-zinc-950 py-8 text-center text-xs font-mono text-zinc-500">
        © 2026 MUHAMMAD FARIS REVANSYAH. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}