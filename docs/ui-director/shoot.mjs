// Screenshots every pair from its HTML into gallery/, in light and dark.
// Usage (from docs/ui-director): npm install && npm run shoot [-- 01-edges 08-landing]
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { chromium } from 'playwright-core';

const here = resolve(import.meta.dirname);
const repo = resolve(here, '../..');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2' };

// A static server for the repo, so the pages load the fonts in skills/ and fetch pairs.json.
const server = createServer(async (req, res) => {
  const path = normalize(join(repo, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
  if (!path.startsWith(repo)) return res.writeHead(403).end();
  const body = await readFile(path).catch(() => null);
  if (!body) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' }).end(body);
}).listen(0, '127.0.0.1');
await new Promise((ok) => server.once('listening', ok));
const base = `http://127.0.0.1:${server.address().port}/docs/ui-director`;

const pairs = JSON.parse(await readFile(join(here, 'pairs.json'), 'utf8'));
const only = process.argv.slice(2);
await mkdir(join(here, 'gallery'), { recursive: true });

const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL ?? 'chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
for (const p of pairs.filter((p) => !only.length || only.includes(p.id))) {
  for (const theme of p.dark ? ['light'] : ['light', 'dark']) {
    await page.goto(`${base}/compare.html?id=${p.id}&theme=${theme}`);
    await page.waitForSelector('body[data-ready]');
    const file = join(here, 'gallery', `${p.id}${theme === 'dark' ? '-dark' : ''}.png`);
    await page.locator('#compare').screenshot({ path: file });
    console.log(`✓ gallery/${p.id}${theme === 'dark' ? '-dark' : ''}.png`);
  }
}
await browser.close();
server.close();
