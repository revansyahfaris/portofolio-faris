'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
// Import sebagai default import (tanpa { })
import HeroSection from '@/components/ui/HeroSection';
import ProfileSection from '@/components/ui/ProfileSection';
import SmoothScroll from '@/components/ui/SmoothScroll';

// // Non-critical background canvas (Disable SSR)
// const StarsBackground = dynamic(
//   () => import('@/components/ui/StarsBackground'),
//   { ssr: false }
// );

// const GithubSection = dynamic(
//   () => import('@/components/ui/GithubSection'),
//   { ssr: false }
// );

const QuestModal = dynamic(
  () => import('@/components/ui/QuestModal'),
  { ssr: false }
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="relative bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden">

        {/* Above-the-fold critical UI */}
        <HeroSection />
        <ProfileSection />

        {/* Below-the-fold dynamic chunks */}
        {/* <GithubSection /> */}

        {/* Passing required props to QuestModal */}
        <QuestModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </main>
    </SmoothScroll>
  );
}