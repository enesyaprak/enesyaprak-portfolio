/**
 * GitHub katkı ızgarası verisi. Build anında github.com'daki herkese açık
 * katkı grafiği çekilir (token gerekmez); çekilemezse src/data/contributions.json
 * yedeği kullanılır. Yedeği tazelemek için: npm run contrib:snapshot
 */
import snapshot from '../data/contributions.json';
import activitySnapshot from '../data/github-activity.json';

export interface ContribDay {
  date: string;
  level: number;
  count: number;
}
export interface Contributions {
  days: ContribDay[];
  total: number;
  fetchedAt: string;
}

const USER = 'enesyaprak';
/** Son hareketlerde gösterilmeyecek repolar. */
const HIDDEN = new Set(['viralyorum-studio']);

export function parseContributions(html: string): Contributions {
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>\s*(No|\d+) contributions?/g)) {
    counts.set(m[1], m[2] === 'No' ? 0 : Number(m[2]));
  }
  const days: ContribDay[] = [];
  for (const m of html.matchAll(/<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*data-level="(\d)"/g)) {
    days.push({ date: m[1], level: Number(m[3]), count: counts.get(m[2]) ?? 0 });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  const total = days.reduce((s, d) => s + d.count, 0);
  return { days, total, fetchedAt: new Date().toISOString() };
}

export async function fetchContributions(): Promise<Contributions> {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, {
    headers: { 'user-agent': 'enesyaprak.com build' },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  const data = parseContributions(await res.text());
  if (data.days.length < 300) throw new Error('GitHub yanıtı beklenen biçimde değil');
  return data;
}

export async function getContributions(): Promise<Contributions & { live: boolean }> {
  try {
    return { ...(await fetchContributions()), live: true };
  } catch (err) {
    console.warn('[contrib] GitHub çekilemedi, yedek kullanılıyor:', (err as Error).message);
    return { ...(snapshot as Contributions), live: false };
  }
}

/* ---------- Son hareketler (sol sütun) ---------- */

export interface ActivityItem {
  name: string;
  url: string;
  pushedAt: string;
}
export interface Activity {
  items: ActivityItem[];
  repoCount: number;
  fetchedAt: string;
}

export async function fetchActivity(limit = 4): Promise<Activity> {
  const headers = { 'user-agent': 'enesyaprak.com build', accept: 'application/vnd.github+json' };
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}`, { headers, signal: AbortSignal.timeout(10_000) }),
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers, signal: AbortSignal.timeout(10_000) }),
  ]);
  if (!userRes.ok || !reposRes.ok) throw new Error(`GitHub ${userRes.status}/${reposRes.status}`);
  const user = (await userRes.json()) as { public_repos: number };
  const repos = (await reposRes.json()) as { name: string; html_url: string; pushed_at: string; fork: boolean }[];
  const items = repos
    .filter((r) => !r.fork && !HIDDEN.has(r.name))
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, limit)
    .map((r) => ({ name: r.name, url: r.html_url, pushedAt: r.pushed_at }));
  return { items, repoCount: user.public_repos, fetchedAt: new Date().toISOString() };
}

export async function getActivity(): Promise<Activity & { live: boolean }> {
  try {
    return { ...(await fetchActivity()), live: true };
  } catch (err) {
    console.warn('[activity] GitHub çekilemedi, yedek kullanılıyor:', (err as Error).message);
    return { ...(activitySnapshot as Activity), live: false };
  }
}
