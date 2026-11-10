#!/usr/bin/env node
// Looks at a page the way the skill asks, in headless Chrome, with no dependencies (Node 22+).
// It screenshots the first screen and the whole page at 1440, 820 and 390, light and dark, then once
// with reduced motion; scrolls so every reveal fires, keeping a sheet of frames from the scroll; runs page-check.js on each; and prints what
// to fix. The last line is "check passed" only when nothing is left to fix.
//
//   node scripts/check.mjs http://localhost:4321/ [--out shots] [--widths 1440,820,390] [--light-only]
//
// Open every screenshot it writes. A passing check is necessary, not sufficient.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i < 0 ? d : args[i + 1]; };
const url = args.find((a) => /^(https?|file):/.test(a));
if (!url) { console.log('Usage: node scripts/check.mjs <http url> [--out shots] [--widths 1440,820,390] [--light-only]'); process.exit(2); }
if (url.startsWith('file:')) console.log('note: serve the page over http; a file:// page breaks canvases, modules and some fonts quietly');
if (typeof WebSocket === 'undefined') { console.log('check: needs Node 22 or later (global WebSocket). Use the page check in your browser tool instead.'); process.exit(2); }
const out = resolve(opt('--out', 'shots')), widths = opt('--widths', '1440,820,390').split(',').map(Number);
const darkToo = !args.includes('--light-only');
mkdirSync(out, { recursive: true });

const candidates = [process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/snap/bin/chromium', '/usr/bin/microsoft-edge',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'];
const chrome = candidates.find((p) => p && existsSync(p));
if (!chrome) { console.log('check: no Chrome, Chromium, Edge or Brave found; set CHROME_PATH, or use the page check in your browser tool'); process.exit(2); }

const profile = mkdtempSync(join(tmpdir(), 'ui-check-'));
const proc = spawn(chrome, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', '--disable-extensions', '--mute-audio', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
const endpoint = await new Promise((ok, no) => { let buf = ''; const t = setTimeout(() => no(new Error('Chrome did not start')), 15000);
  proc.stderr.on('data', (d) => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); ok(m[1]); } }); });

const ws = new WebSocket(endpoint); await new Promise((ok) => ws.addEventListener('open', ok, { once: true }));
let seq = 0; const pending = new Map(), listeners = new Set();
ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const [ok, no] = pending.get(d.id); pending.delete(d.id); d.error ? no(new Error(d.error.message)) : ok(d.result); } else for (const l of listeners) l(d); });
const send = (method, params = {}, sessionId) => new Promise((ok, no) => { const id = ++seq; pending.set(id, [ok, no]); ws.send(JSON.stringify({ id, method, params, sessionId })); });
const once = (method, ms) => new Promise((ok) => { const t = setTimeout(() => { listeners.delete(l); ok(false); }, ms); const l = (d) => { if (d.method === method) { clearTimeout(t); listeners.delete(l); ok(true); } }; listeners.add(l); });
const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId: s } = await send('Target.attachToTarget', { targetId, flatten: true });
const errors = new Set();
listeners.add((d) => { if (d.sessionId !== s) return;
  if (d.method === 'Runtime.exceptionThrown') errors.add(`console: ${d.params.exceptionDetails.exception?.description?.split('\n')[0] ?? d.params.exceptionDetails.text}`);
  if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errors.add(`console: ${d.params.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 160)}`);
  if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error' && !/favicon/.test(d.params.entry.url ?? '')) errors.add(`load: ${d.params.entry.text.slice(0, 120)} ${d.params.entry.url ?? ''}`); });
for (const m of ['Page.enable', 'Runtime.enable', 'Log.enable']) await send(m, {}, s);
const evaluate = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, s); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text); return r.result.value; };
const shot = async (file, clip) => { const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!clip, ...(clip ? { clip: { ...clip, scale: 1 } } : {}) }, s); writeFileSync(join(out, file), Buffer.from(data, 'base64')); return join(out, file); };
const check = readFileSync(new URL('./page-check.js', import.meta.url), 'utf8');
// The scroll sheet is drawn in the same tab once a pass is over (a second tab would send this one to the background, where frames stop).
const sheet = async (file, frames, w, h) => { const cols = w < 500 ? 6 : 3, tile = w < 500 ? 240 : 480, th = Math.round(tile * h / w), rows = Math.ceil(frames.length / cols);
  const width = cols * tile + (cols + 1) * 8, height = rows * th + (rows + 1) * 8;
  const blank = once('Page.loadEventFired', 5000); await send('Page.navigate', { url: 'about:blank' }, s); await blank;
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false }, s);
  await send('Runtime.evaluate', { expression: `document.body.style.cssText = 'margin:0;padding:8px;background:#777;display:grid;gap:8px;grid-template-columns:repeat(${cols},${tile}px)'; document.body.innerHTML = ${JSON.stringify(frames)}.map((d) => '<img width="${tile}" height="${th}" src="data:image/jpeg;base64,' + d + '">').join(''); Promise.all([...document.images].map((i) => i.decode())).then(() => true)`, awaitPromise: true }, s);
  const { data } = await send('Page.captureScreenshot', { format: 'png' }, s); writeFileSync(join(out, file), Buffer.from(data, 'base64')); return join(out, file); };

const passes = [];
for (const w of widths) for (const dark of darkToo ? [false, true] : [false]) passes.push({ w, dark, reduced: false });
passes.push({ w: widths[0], dark: false, reduced: true });

const found = new Map(), shots = []; let toggled = '';
const note = (set, line, label) => { const k = `${set}\u0000${line}`; if (!found.has(k)) found.set(k, new Set()); found.get(k).add(label); };
try {
  for (const p of passes) {
    const label = `${p.w}${p.dark ? ' dark' : ''}${p.reduced ? ' reduced-motion' : ''}`, name = `${p.w}${p.dark ? '-dark' : ''}${p.reduced ? '-reduced' : ''}`;
    const h = p.w < 500 ? 844 : 900;
    await send('Emulation.setDeviceMetricsOverride', { width: p.w, height: h, deviceScaleFactor: p.w < 500 ? 2 : 1, mobile: p.w < 500 }, s);
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: p.dark ? 'dark' : 'light' }, { name: 'prefers-reduced-motion', value: p.reduced ? 'reduce' : 'no-preference' }] }, s);
    const loaded = once('Page.loadEventFired', 20000);
    await send('Page.navigate', { url }, s);
    if (!(await loaded)) { errors.add(`load: ${url} did not finish loading in 20s`); }
    await evaluate('document.fonts.ready.then(() => true)');
    if (p.dark) { // a project that switches dark with a class or an attribute, not the system setting
      const how = await evaluate(`(() => { const d = document.documentElement, uses = (re) => [...document.styleSheets].some((s) => { try { return [...s.cssRules].some((r) => re.test(r.cssText)); } catch { return false; } }), did = [];
        if (!d.classList.contains('dark') && uses(/\\.dark[\\s,{.:>)]/)) { d.classList.add('dark'); d.classList.remove('light'); did.push('class="dark"'); }
        if (d.dataset.theme !== 'dark' && uses(/\\[data-theme=["']?dark/)) { d.dataset.theme = 'dark'; did.push('data-theme="dark"'); }
        return did.join(' and '); })()`);
      if (how) toggled = how; }
    await sleep(1400);
    shots.push(await shot(`${name}-first-screen.png`));
    const top = await evaluate(check);
    for (const line of top.fix) note('fix', line, label);
    for (const line of top.judge) note('judge', line, label);
    // Scroll the way a visitor does, so every reveal fires. On the light passes, keep a frame of
    // each stop: the page shot below can't show a pinned scene mid-play or where a fixed bar sits.
    const total = await evaluate('document.documentElement.scrollHeight'), step = h * .6, stops = Math.ceil(total / step), every = Math.ceil(stops / 18), frames = [];
    for (let i = 0; i <= stops; i++) {
      await evaluate(`(async () => { const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); scrollTo(0, ${Math.round(i * step)}); await frame(); await new Promise((r) => setTimeout(r, 180)); await frame(); return true; })()`);
      if (!p.dark && !p.reduced && i && i % every === 0 && frames.length < 18) { await sleep(700); frames.push((await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 }, s)).data); } // a moment for reveals to settle, so a frame isn't caught mid-blur
    }
    await sleep(1300);
    const result = await evaluate(`window.__uiScrolled = true; ${check}`);
    await evaluate('scrollTo(0, 0), new Promise((r) => setTimeout(r, 500))');
    const height = Math.min(await evaluate('document.documentElement.scrollHeight'), 16000);
    shots.push(await shot(`${name}-page.png`, { x: 0, y: 0, width: p.w, height }));
    for (const line of result.fix) note('fix', line, label);
    for (const line of result.judge) note('judge', line, label);
    if (frames.length) shots.push(await sheet(`${name}-scroll.png`, frames, p.w, h));
  }
} catch (e) { errors.add(`check: ${e.message.split('\n')[0]}`); }
for (const e of errors) note('fix', e, 'load');
await send('Browser.close').catch(() => {}); proc.kill(); await sleep(300); rmSync(profile, { recursive: true, force: true });

const list = (set) => [...found].filter(([k]) => k.startsWith(set)).map(([k, where]) => `  ${k.split('\u0000')[1]}  (${[...where].join(', ')})`);
const fixes = list('fix'), leads = list('judge');
console.log(`Screenshots (open every one; a -scroll sheet is the page as a visitor scrolls it, pinned scenes and fixed bars included):\n${shots.map((f) => `  ${f}`).join('\n')}\n`);
if (toggled) console.log(`note: the dark passes set ${toggled} on <html>, since the page's CSS switches on it\n`);
if (leads.length) console.log(`Judge (keep one only with a reason from the product's world):\n${leads.join('\n')}\n`);
if (fixes.length) console.log(`Fix (never intentional):\n${fixes.join('\n')}\n`);
console.log(fixes.length ? `check failed: ${fixes.length} to fix` : 'check passed');
process.exit(fixes.length ? 1 : 0);
