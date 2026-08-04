import type {
  ContributionDay,
  GithubStats,
  LanguageShare,
  RepoSummary,
} from './types';

/**
 * Lapisan pengambil data GitHub.
 *
 * PENTING: modul ini hanya boleh diimpor dari kode server (route handler atau
 * Server Component). Isinya membaca process.env.GITHUB_TOKEN, dan token tersebut
 * tidak boleh sampai ikut terbundel ke browser. Satu-satunya pemakainya saat ini
 * adalah src/app/api/github/route.ts. Bila suatu saat perlu jaminan yang ditegakkan
 * compiler, pasang paket "server-only" lalu tambahkan import 'server-only' di baris
 * paling atas berkas ini — impor dari Client Component akan langsung gagal build.
 *
 * Dipilih GraphQL API v4, bukan REST, karena kalender kontribusi — grafik yang
 * paling ingin ditampilkan pada section ini — hanya tersedia lewat GraphQL.
 * REST API juga hanya memberi 60 permintaan per jam tanpa token, angka yang akan
 * habis dengan cepat begitu halaman ini dikunjungi banyak orang.
 */

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

/** Berapa lama hasil pengambilan data disimpan sebelum diambil ulang (detik). */
export const GITHUB_REVALIDATE_SECONDS = 3600;

const QUERY = /* GraphQL */ `
  query PortfolioStats($login: String!) {
    user(login: $login) {
      login
      url
      followers {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        privacy: PUBLIC
        isFork: false
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        totalCount
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          updatedAt
          primaryLanguage {
            name
            color
          }
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            updatedAt
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

interface RawRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  primaryLanguage: { name: string; color: string | null } | null;
}

interface RawResponse {
  data?: {
    user: {
      login: string;
      url: string;
      followers: { totalCount: number };
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
      repositories: { totalCount: number; nodes: RawRepo[] };
      pinnedItems: { nodes: RawRepo[] };
    } | null;
  };
  errors?: { message: string }[];
}

/** Kesalahan yang sudah dikenali penyebabnya, agar antarmuka bisa menampilkan pesan yang tepat. */
export class GithubFetchError extends Error {
  constructor(
    message: string,
    readonly reason: 'missing-token' | 'unauthorized' | 'rate-limited' | 'not-found' | 'unknown'
  ) {
    super(message);
    this.name = 'GithubFetchError';
  }
}

function toRepoSummary(repo: RawRepo): RepoSummary {
  return {
    name: repo.name,
    description: repo.description,
    url: repo.url,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage?.name ?? null,
    languageColor: repo.primaryLanguage?.color ?? null,
    updatedAt: repo.updatedAt,
  };
}

/**
 * Mengubah jumlah kontribusi harian menjadi tingkat 0-4.
 *
 * Ambang batas dihitung relatif terhadap hari tersibuk, bukan angka mutlak. Skala
 * mutlak akan membuat grafik milik pengguna yang jarang commit terlihat kosong
 * seluruhnya, sehingga pola konsistensinya justru tidak terbaca — padahal pola
 * itulah yang ingin ditunjukkan.
 */
function toLevel(count: number, max: number): ContributionDay['level'] {
  if (count === 0) return 0;
  if (max <= 1) return 4;
  const ratio = count / max;
  if (ratio > 0.66) return 4;
  if (ratio > 0.33) return 3;
  if (ratio > 0.12) return 2;
  return 1;
}

/** Menghitung rentetan hari aktif saat ini dan yang terpanjang sepanjang tahun. */
function calculateStreaks(days: readonly ContributionDay[]) {
  let longest = 0;
  let running = 0;

  for (const day of days) {
    running = day.count > 0 ? running + 1 : 0;
    if (running > longest) longest = running;
  }

  // Rentetan berjalan dihitung mundur dari hari terakhir. Hari terakhir yang masih
  // kosong tidak langsung memutus rentetan, karena hari itu memang belum selesai.
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      current++;
      continue;
    }
    if (i === days.length - 1) continue;
    break;
  }

  return { currentStreak: current, longestStreak: longest };
}

/** Menyusun komposisi bahasa berdasarkan bahasa utama tiap repositori. */
function calculateLanguages(repos: readonly RepoSummary[]): LanguageShare[] {
  const counter = new Map<string, { color: string | null; count: number }>();

  for (const repo of repos) {
    if (!repo.language) continue;
    const existing = counter.get(repo.language);
    if (existing) {
      existing.count++;
    } else {
      counter.set(repo.language, { color: repo.languageColor, count: 1 });
    }
  }

  const total = [...counter.values()].reduce((sum, item) => sum + item.count, 0);
  if (total === 0) return [];

  return [...counter.entries()]
    .map(([name, item]) => ({
      name,
      color: item.color,
      repoCount: item.count,
      percentage: Math.round((item.count / total) * 1000) / 10,
    }))
    .sort((a, b) => b.repoCount - a.repoCount)
    .slice(0, 6);
}

/**
 * Mengambil dan menormalisasi statistik GitHub.
 *
 * Hasilnya di-cache oleh Next selama GITHUB_REVALIDATE_SECONDS. Data kontribusi
 * tidak berubah dalam hitungan detik, sehingga menyegarkan tiap permintaan hanya
 * akan memperlambat halaman dan mempercepat habisnya kuota API tanpa manfaat.
 */
export async function fetchGithubStats(login: string): Promise<GithubStats> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new GithubFetchError(
      'Variabel lingkungan GITHUB_TOKEN belum diatur.',
      'missing-token'
    );
  }

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portfolio-faris',
    },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
    next: { revalidate: GITHUB_REVALIDATE_SECONDS },
  });

  if (response.status === 401) {
    throw new GithubFetchError('Token GitHub ditolak.', 'unauthorized');
  }
  if (response.status === 403 || response.status === 429) {
    throw new GithubFetchError('Kuota permintaan GitHub habis.', 'rate-limited');
  }
  if (!response.ok) {
    throw new GithubFetchError(`GitHub membalas dengan status ${response.status}.`, 'unknown');
  }

  const payload: RawResponse = await response.json();

  if (payload.errors?.length) {
    throw new GithubFetchError(payload.errors[0].message, 'unknown');
  }

  const user = payload.data?.user;
  if (!user) {
    throw new GithubFetchError(`Pengguna "${login}" tidak ditemukan.`, 'not-found');
  }

  const calendar = user.contributionsCollection.contributionCalendar;
  const rawDays = calendar.weeks.flatMap((week) => week.contributionDays);
  const maxCount = rawDays.reduce((max, day) => Math.max(max, day.contributionCount), 0);

  const contributions: ContributionDay[] = rawDays.map((day) => ({
    date: day.date,
    count: day.contributionCount,
    level: toLevel(day.contributionCount, maxCount),
  }));

  const allRepos = user.repositories.nodes.map(toRepoSummary);
  const pinned = user.pinnedItems.nodes.filter(Boolean).map(toRepoSummary);
  const { currentStreak, longestStreak } = calculateStreaks(contributions);

  return {
    login: user.login,
    profileUrl: user.url,
    followers: user.followers.totalCount,
    publicRepos: user.repositories.totalCount,
    totalStars: allRepos.reduce((sum, repo) => sum + repo.stars, 0),
    totalForks: allRepos.reduce((sum, repo) => sum + repo.forks, 0),
    totalContributions: calendar.totalContributions,
    currentStreak,
    longestStreak,
    contributions,
    pinned,
    // Bila belum ada repositori yang di-pin, daftar teratas berdasarkan bintang
    // dipakai sebagai gantinya agar bagian ini tidak pernah tampil kosong.
    topRepos: allRepos.slice(0, 6),
    languages: calculateLanguages(allRepos),
    fetchedAt: new Date().toISOString(),
  };
}
