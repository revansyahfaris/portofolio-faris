import { NextResponse } from 'next/server';

// Set revalidate di level route (cache selama 1 jam / 3600 detik)
export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(
      'https://api.github.com/repos/revansyahfaris/portofolio-faris/commits',
      {
        headers: {
          // GitHub API Wajib menyertakan User-Agent
          'User-Agent': 'portofolio-faris-app',
          
          // Header Authorization opsional (jika token ada)
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        // Cache fetch di Next.js selama 1 jam
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}