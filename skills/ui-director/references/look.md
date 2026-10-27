# Look at it

Code that looks right can render wrong: a font that never loaded, a section wider than the
phone, gray text on a photo, a reveal that never fires. Look like a visitor, then measure what
eyes miss.

## Which browser

1. **The browser tool your harness gives you:** a browser pane, a browser MCP server, a preview
   tool. Open, scroll, click, resize, read the console, run JavaScript in the page.
2. **What the project already has:** a preview command in `AGENTS.md` or `package.json`, or
   Playwright already installed. On a real site you'll iterate on, a small screenshot script per
   section (rest state, desktop and phone) is worth keeping in the project.
3. **One headless screenshot** from an installed Chrome, a command that exits by itself:

   ```sh
   CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"   # Linux: google-chrome or chromium
   "$CHROME" --headless=new --hide-scrollbars --window-size=1440,900 --screenshot=shot.png "file://$PWD/index.html"
   ```

   `--window-size=390,844` for the phone; `--blink-settings=preferredColorScheme=0` for dark, `=1`
   for light; `--virtual-time-budget=2000` lets entrances finish first. Then open the image and
   look.
4. **None of these:** say so, and tell the user exactly what to look at.

Install no browser or Playwright the project doesn't have, unless the user asks: several agents
doing it at once can freeze a machine. Close the browser and stop servers when done.

## What to look at

Every pass, in order: desktop 1440 (the first screen, then the whole scroll so every reveal and
scene plays; a full-page screenshot can show scenes empty); phone 390, the same scroll; dark mode
at both widths; every control once (hover, click, tab, type, drag); the console (no errors,
missing fonts or images); reduced motion (everything shows, nothing travels).

Then judge it against `DESIGN.md` and your job's "Done means". Fix, and look again: two passes
at least. A first render always has problems.

## The page check

Run it in the page (your browser tool's JavaScript, or the devtools console) at each width and
mode. It measures what's easy to miss: sideways scroll, fonts that didn't load, contrast,
tracking, all caps, labels above headlines, arrows on buttons, tap targets, cramped, clipped and
off-center labels, control heights, type sizes, two-fragment lines, and the slop from "Never":
dots in pills, icons on tinted circles, emoji, buzzwords, habit fonts, gradient type.

```js
(() => {
  const out = new Set(), W = innerWidth, css = (e, p) => getComputedStyle(e)[p];
  const say = (rule, msg, e) => out.add(`${rule}: ${msg}${e ? ` [${e.tagName.toLowerCase()} "${(e.innerText || e.alt || '').trim().slice(0, 40)}"]` : ''}`);
  const all = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && !e.closest('[aria-hidden="true"]') && css(e, 'visibility') !== 'hidden' && css(e, 'opacity') !== '0'; });
  const texts = all.filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
  const ctx = Object.assign(document.createElement('canvas'), { width: 1, height: 1 }).getContext('2d', { willReadFrequently: true });
  const rgba = c => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lum = ([r, g, b]) => { const f = v => (v /= 255) <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const behind = e => { for (let p = e; p; p = p.parentElement) { if (css(p, 'backgroundImage') !== 'none' || /^(IMG|VIDEO|CANVAS|PICTURE)$/.test(p.tagName)) return null; const c = rgba(css(p, 'backgroundColor')); if (c[3] > .5) return c; } return rgba(css(document.documentElement, 'backgroundColor')); };
  const clipText = e => /text/.test(css(e, 'backgroundClip') + css(e, 'webkitBackgroundClip'));
  const pill = e => { const r = e.getBoundingClientRect(); return r.height <= 44 && r.width - r.height > 4 && parseFloat(css(e, 'borderTopLeftRadius')) >= r.height / 2 - 1 && (rgba(css(e, 'backgroundColor'))[3] > .05 || parseFloat(css(e, 'borderTopWidth')) > 0 || css(e, 'boxShadow') !== 'none'); };

  if (document.documentElement.scrollWidth > W + 1) for (const e of all.filter(e => e.getBoundingClientRect().right > W + 1).slice(0, 3)) say('sideways scroll', `ends at ${Math.round(e.getBoundingClientRect().right)}px on a ${W}px screen`, e);
  const loaded = new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '')));
  for (const f of new Set(texts.map(e => css(e, 'fontFamily').split(',')[0].trim().replace(/["']/g, ''))))
    if (!loaded.has(f) && !/^(system-ui|ui-|-apple|sans-serif|serif|monospace|inherit)/.test(f)) say('font', `"${f}" isn't loaded by the page, so a fallback shows`);
  for (const h of document.querySelectorAll('h1, h2, h3')) { const f = css(h, 'fontFamily');
    if (/Fraunces|Instrument Serif|Playfair|Newsreader|DM Serif|Cormorant|EB Garamond|Libre Baskerville|Lora|Crimson|Young Serif|Georgia|Palatino|Space Grotesk|Syne|Bricolage|Clash Display|Cabinet Grotesk/i.test(f)) { say('habit font', `${f.split(',')[0]}: keep it only with a reason from the product's world`, h); break; } }

  let photo = 0;
  for (const e of texts) {
    const size = parseFloat(css(e, 'fontSize')), bold = +css(e, 'fontWeight') >= 700, bg = behind(e), fg = rgba(css(e, 'color'));
    if (!bg || clipText(e) || fg[3] === 0) { photo++; continue; }
    const seen = fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]));
    const [a, b] = [lum(seen), lum(bg)].sort((x, y) => y - x), ratio = (a + .05) / (b + .05), need = size >= 24 || (bold && size >= 18.6) ? 3 : 4.5;
    if (ratio < need) say('contrast', `${ratio.toFixed(2)}:1, needs ${need}:1`, e);
    const track = parseFloat(css(e, 'letterSpacing')) / size;
    if (size >= 20 && track < (size >= 40 ? -.055 : -.04)) say('tracking', `${track.toFixed(3)}em at ${Math.round(size)}px; −.05em at most on display type, −.035em below 40px`, e);
    if (!/mono/i.test(css(e, 'fontFamily')) && !e.closest('code, pre, kbd, samp') && (css(e, 'textTransform') === 'uppercase' || (/[A-Z]{4}/.test(e.innerText) && e.innerText === e.innerText.toUpperCase())) && size < 20) say('all caps', 'sentence case instead', e);
  }
  if (photo) out.add(`contrast: ${photo} text elements sit on an image, a gradient or clipped type; check them on the pixels`);

  const labels = [...document.querySelectorAll('h1, h2')].map(h => { const p = h.previousElementSibling; return p && p.innerText && p.innerText.length < 80 && parseFloat(css(p, 'fontSize')) < parseFloat(css(h, 'fontSize')) * .5 ? p : null; }).filter(Boolean);
  if (labels.length > 1) say('labels above headlines', `${labels.length} of them; one at most, above the main headline`, labels[1]);
  const isButton = e => e.tagName === 'BUTTON' || rgba(css(e, 'backgroundColor'))[3] > .1 || parseFloat(css(e, 'borderTopWidth')) > 0;
  for (const e of [...document.querySelectorAll('a, button, [role=button]')].filter(e => /[→↗↘↓➜»]\s*$/.test(e.innerText || '') && isButton(e))) say('arrow', 'no arrows on buttons', e);
  if (W < 500) for (const e of document.querySelectorAll('a, button, input, select, [role=button]')) { const r = e.getBoundingClientRect(), min = e.tagName === 'A' && css(e, 'display') === 'inline' ? 24 : 44; if (r.width && r.height < min) say('tap target', `${Math.round(r.height)}px tall, needs ${min}`, e); }
  const shown = new Set(all), frag = [...document.querySelectorAll('h1, h2, h3, p, blockquote')].filter(e => shown.has(e)).filter(e => { const t = (e.innerText || '').trim(), parts = t.split(/(?<=[.!?])\s+/);
    return t.length < 90 && parts.length === 2 && parts.every(x => /[.!?]$/.test(x) && x.split(/\s+/).length <= 4); });
  if (frag.length > 2) say('two-fragment lines', `${frag.length} lines like "${frag[0].innerText.trim().replace(/\s+/g, ' ')}"; vary the shape`, frag[1]);

  for (const e of texts.filter(pill)) { const r = e.getBoundingClientRect(), g = document.createRange(); g.selectNodeContents(e); const t = g.getBoundingClientRect(), gap = Math.min(t.left - r.left, r.right - t.right);
    if (t.width && gap < 8) say('cramped', `text ${Math.round(gap)}px from the edge of its pill or button, keep 10px`, e); }
  for (const e of all.filter(pill)) { const dot = [...e.children].find(c => { const r = c.getBoundingClientRect(); return r.width <= 10 && Math.abs(r.width - r.height) < 1 && parseFloat(css(c, 'borderTopLeftRadius')) >= r.width / 2 - .5 && rgba(css(c, 'backgroundColor'))[3] > .3; });
    if (dot || /^[●•◉]/.test((e.innerText || '').trim()) || /^[●•◉]/.test(css(e, 'content'))) { say('dot in a pill', 'status is a word, no dot', e); break; } }
  const circles = all.filter(e => { const r = e.getBoundingClientRect(); return r.width >= 24 && r.width <= 72 && Math.abs(r.width - r.height) <= 2 && parseFloat(css(e, 'borderTopLeftRadius')) >= r.width * .3 && rgba(css(e, 'backgroundColor'))[3] > .05 && e.querySelector('svg, i, img') && !(e.innerText || '').trim() && !e.closest('a, button, [role=button]'); });
  if (circles.length >= 3) say('icons on tinted shapes', `${circles.length} of them; let the words carry it`, circles[0]);
  const emoji = texts.find(e => /\p{Emoji_Presentation}/u.test(e.innerText));
  if (emoji) say('emoji', 'no emoji in interface text', emoji);
  const buzz = [...new Set((document.body.innerText.match(/\b(elevate|seamless(ly)?|unleash|revolutioni[sz]e|next-gen|cutting-edge|game-changer|empower|supercharge|unlock|robust|leverage|delve|curated|all-in-one)\b/gi) || []).map(w => w.toLowerCase()))];
  if (buzz.length) say('words', `${buzz.join(', ')}: say what it does instead`);
  const lit = texts.filter(clipText);
  if (lit.length > 1) say('gradient type', `${lit.length} elements with gradient text; one headline at most`, lit[1]);

  for (const e of texts) { const s = parseFloat(css(e, 'fontSize'));
    if (css(e, 'overflowX') !== 'visible' && css(e, 'textOverflow') !== 'ellipsis' && e.scrollWidth > e.clientWidth + 1) say('clipped', 'text cut off at the side', e);
    else if (css(e, 'overflowY') !== 'visible' && parseFloat(css(e, 'lineHeight')) < s * 1.15) say('clipped', 'line height under 1.15 inside a box that clips: descenders get cut', e); }
  for (const e of texts) { const s = parseFloat(css(e, 'fontSize')), lh = css(e, 'lineHeight') === 'normal' ? s * 1.3 : parseFloat(css(e, 'lineHeight')), h = e.getBoundingClientRect().height;
    if (/flex|grid/.test(css(e, 'display')) && h <= 60 && h >= lh + 2 && lh > s * 1.2) say('off-center label', `line-height ${Math.round(lh)}px on a ${Math.round(h)}px control; set line-height: 1`, e); }
  const heights = new Set(all.filter(e => (/^(BUTTON|SELECT|INPUT)$/.test(e.tagName) || pill(e)) && e.getBoundingClientRect().height >= 16).map(e => Math.round(e.getBoundingClientRect().height)));
  if (heights.size > 4) say('control heights', `${heights.size} pill and button heights: ${[...heights].sort((a, b) => a - b).join(', ')}px; keep 3–4`);
  const sizes = new Set(texts.filter(e => !e.closest('[role=img]')).map(e => css(e, 'fontSize')));
  if (sizes.size > 10) say('type sizes', `${sizes.size} sizes: ${[...sizes].map(parseFloat).sort((a, b) => a - b).join(', ')}px; 10 at most`);
  return out.size ? [...out].join('\n') : 'No findings.';
})()
```

Findings are leads, not verdicts: an intentional exception is fine when you can say why. The
check skips `aria-hidden` parts, so run it once with a playing product window's `aria-hidden`
removed to check its contrast. On the
phone, also check every image with text over it: the words sit on a calm area, never across the
subject. What it can't measure is still yours to see: the obvious version, image quality,
whether the signature lands.
