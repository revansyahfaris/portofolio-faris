'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
// Import sebagai default import (tanpa { })
import HeroSection from '@/components/ui/HeroSection';
import ProfileSection from '@/components/ui/ProfileSection';

// Non-critical background canvas (Disable SSR)
const StarsBackground = dynamic(
  () => import('@/components/ui/StarsBackground'),
  { ssr: false }
);

const SmoothScroll = dynamic(
  () => import('@/components/ui/SmoothScroll'),
  { ssr: false }
);

const GithubSection = dynamic(
  () => import('@/components/ui/GithubSection'),
  { ssr: false }
);

const QuestModal = dynamic(
  () => import('@/components/ui/QuestModal'),
  { ssr: false }
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="relative bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden">
        {/* <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="w-full h-full relative hero-breathe scale-110">
            <StarsBackground />
          </div>
        </div> */}

        {/* Above-the-fold critical UI */}
        <HeroSection />
        <ProfileSection />

        {/* Below-the-fold dynamic chunks */}
        <GithubSection />

        {/* Passing required props to QuestModal */}
        <QuestModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </main>
    </SmoothScroll>
  );
}