'use client';

import HeroSection from '@/components/ui/HeroSection';
import ResultPlaneSection from '@/components/ui/ResultPlaneSection';
import ProjectsSection from '@/components/ui/ProjectsSection';
import ExperienceSection from '@/components/ui/ExperienceSection';
import GithubSection from '@/components/ui/GithubSection';
import ProfileSection from '@/components/ui/ProfileSection';

export default function Home() {
  return (
    /* 
      📍 1. snap-y snap-mandatory -> MEMAKSA scroll SELALU terkunci sempurna (100% snappy, gak bakal gantung di tengah)
      📍 2. custom-persona-scroll -> Mengganti scrollbar abu-abu kaku dengan scrollbar merah tipis
    */
    <main className="relative bg-zinc-950 h-[100dvh] w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth text-white custom-persona-scroll">
      
      {/* 📍 SECTION 1: HERO (SNAP MANDATORY) */}
      <section className="w-full h-[100dvh] snap-start snap-always shrink-0">
        <HeroSection />
      </section>

      {/* 📍 SECTION 2: PROFILE (SNAP MANDATORY) */}
      <section id="profile" className="w-full h-[100dvh] snap-start snap-always shrink-0">
        <ProfileSection />
      </section>

      {/* 📍 SECTION 3 DSK: CONTINUOUS FLOW */}
      <div className="snap-start snap-always w-full">
        {/* 2.5D PSEUDO 3D RESULT PLANE */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <ResultPlaneSection />
        </div>

        <ProjectsSection />
        <ExperienceSection />
        <GithubSection />

        <footer className="border-t-2 border-white/20 bg-zinc-950 py-8 text-center text-xs font-mono text-zinc-500">
          © 2026 MUHAMMAD FARIS REVANSYAH. ALL RIGHTS RESERVED.
        </footer>
      </div>

    </main>
  );
}