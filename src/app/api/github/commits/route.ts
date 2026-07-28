import { NextResponse } from 'next/server';
import { portofolioConfig } from '@/config/portofolioConfig';

// Revalidate cache setiap 1 jam (3600 detik)
export const revalidate = 3600;

export async function GET() {
  try {
    const githubUrl = portofolioConfig.socials.github;
    const username = githubUrl.split('/').pop() || 'revansyahfaris';

    const res = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
      headers: {
        Accept: 'application/vnd.github.cloak-preview+json',
        'User-Agent': 'Portfolio-App',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { total_count: 1250, source: 'fallback', cached: true },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json(
      { total_count: data.total_count ?? 1250, source: 'github', cached: true },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { total_count: 1250, source: 'error-fallback', cached: true },
      { status: 200 }
    );
  }
}