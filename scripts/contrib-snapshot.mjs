// GitHub katkı grafiğini çekip src/data/contributions.json yedeğini tazeler.
import { writeFile } from 'node:fs/promises';
const USER = 'enesyaprak';
const html = await (await fetch(`https://github.com/users/${USER}/contributions`)).text();
const counts = new Map();
for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>\s*(No|\d+) contributions?/g))
  counts.set(m[1], m[2] === 'No' ? 0 : Number(m[2]));
const days = [];
for (const m of html.matchAll(/<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*data-level="(\d)"/g))
  days.push({ date: m[1], level: Number(m[3]), count: counts.get(m[2]) ?? 0 });
days.sort((a, b) => a.date.localeCompare(b.date));
const total = days.reduce((s, d) => s + d.count, 0);
await writeFile(new URL('../src/data/contributions.json', import.meta.url), JSON.stringify({ days, total, fetchedAt: new Date().toISOString() }));
console.log(`${days.length} gün, ${total} katkı → src/data/contributions.json`);

// Son hareketler yedeği
const h = { 'user-agent': 'enesyaprak.com build', accept: 'application/vnd.github+json' };
const user = await (await fetch(`https://api.github.com/users/${USER}`, { headers: h })).json();
const repos = await (await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers: h })).json();
const items = repos.filter((r) => !r.fork && r.name !== 'viralyorum-studio').sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)).slice(0, 4)
  .map((r) => ({ name: r.name, url: r.html_url, pushedAt: r.pushed_at }));
await writeFile(new URL('../src/data/github-activity.json', import.meta.url), JSON.stringify({ items, repoCount: user.public_repos, fetchedAt: new Date().toISOString() }, null, 2));
console.log(`${items.length} hareket, ${user.public_repos} repo → src/data/github-activity.json`);
