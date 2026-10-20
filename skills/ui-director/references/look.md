# Look at it

Read this before you say any UI is done. Code that looks right can render wrong: a font that
never loaded, a section wider than the phone, gray text on a photo, a reveal that never fires.
Only looking finds these, so look like a visitor would, then measure what eyes miss.

## Which browser

Use the best one your harness gives you, in this order:

1. **The browser tool you were given:** a browser pane, a browser MCP server, a preview tool,
   the user's own tools. Use it to open, scroll, click, resize, read the console and run
   JavaScript in the page.
2. **What the project or user already set up:** a preview command in `AGENTS.md`, `CLAUDE.md`,
   the README or `package.json`, or a screenshot endpoint the task tells you about.
3. **One headless screenshot** from a Chrome that's already installed. It's one command that
   exits by itself:

   ```sh
   CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"   # Linux: google-chrome or chromium
   "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 --screenshot=shot.png "file://$PWD/index.html"
   ```

   Change `--window-size` for the phone (`390,844`). Add `--blink-settings=preferredColorScheme=0`
   for dark and `=1` for light; without it, the screenshot follows the system setting. Then open
   the image and look at it.
4. **None of these:** say so plainly, and tell the user exactly what to look at.

Don't install browsers, Playwright or Puppeteer, and don't write screenshot scripts, unless the
user asks. They eat memory, and several agents doing it at once can freeze the machine. Close the
browser when you're done, and stop any server you started.

## What to look at

Every pass, in this order:

- **Desktop 1440 wide,** the first screen, then the whole scroll so every reveal and scene plays.
  Scrolled scenes only show their real state while you scroll through them; a full-page
  screenshot can show them empty.
- **Phone 390 wide,** the same scroll. Nothing wider than the screen, the first screen still
  says what it is, tap targets comfortable.
- **Dark mode,** both widths.
- **Every control once:** hover it, click it, tab to it, type in it, drag it.
- **The console:** no errors, no failed requests, no missing images or fonts.
- **Reduced motion:** everything still shows, without movement.

Then judge it against the direction in `DESIGN.md` and the audit in `SKILL.md`. Measure
contrast after every reveal has finished: text that fades in (or stays dim until it's scrolled
to) must still reach 4.5:1 in its final state. Fix, and look again: two passes minimum.

## The page check

Run this in the page (your browser tool's JavaScript, or the devtools console) at each width
and mode. It measures what's easy to miss and hard to see: sideways scroll, fonts that didn't
load, text contrast, crushed tracking, labels above headlines, all-caps, arrows, small tap
targets, text cramped, cut off or off-center in its control, too many control heights, too many type sizes,
and headlines written as two clipped fragments.

```js
(() => {
  const out = new Set(), W = innerWidth, css = (e, p) => getComputedStyle(e)[p];
  const say = (rule, msg, e) => out.add(`${rule}: ${msg}${e ? ` [${e.tagName.toLowerCase()} "${(e.innerText || e.alt || '').trim().slice(0, 40)}"]` : ''}`);
  const all = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && css(e, 'visibility') !== 'hidden' && css(e, 'opacity') !== '0'; });
  const texts = all.filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
  const ctx = Object.assign(document.createElement('canvas'), { width: 1, height: 1 }).getContext('2d', { willReadFrequently: true });
  const rgba = c => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lum = ([r, g, b]) => { const f = v => (v /= 255) <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const behind = e => { for (let p = e; p; p = p.parentElement) { if (css(p, 'backgroundImage') !== 'none' || /^(IMG|VIDEO|CANVAS|PICTURE)$/.test(p.tagName)) return null; const c = rgba(css(p, 'backgroundColor')); if (c[3] > .5) return c; } return rgba(css(document.documentElement, 'backgroundColor')); };

  if (document.documentElement.scrollWidth > W + 1) for (const e of all.filter(e => e.getBoundingClientRect().right > W + 1).slice(0, 3)) say('sideways scroll', `ends at ${Math.round(e.getBoundingClientRect().right)}px on a ${W}px screen`, e);
  const loaded = new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '')));
  for (const f of new Set(texts.map(e => css(e, 'fontFamily').split(',')[0].trim().replace(/["']/g, ''))))
    if (!loaded.has(f) && !/^(system-ui|ui-|-apple|sans-serif|serif|monospace|inherit)/.test(f)) say('font', `"${f}" isn't loaded by the page: it's a system font or a fallback, so check it's the face you chose`);
  let photo = 0;
  for (const e of texts) {
    const size = parseFloat(css(e, 'fontSize')), bold = +css(e, 'fontWeight') >= 700, bg = behind(e), fg = rgba(css(e, 'color'));
    if (!bg) { photo++; continue; }
    const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x), ratio = (a + .05) / (b + .05), need = size >= 24 || (bold && size >= 18.6) ? 3 : 4.5;
    if (ratio < need) say('contrast', `${ratio.toFixed(1)}:1, needs ${need}:1`, e);
    const track = parseFloat(css(e, 'letterSpacing')) / size;
    if (size >= 24 && track < -.045) say('tracking', `${track.toFixed(3)}em on ${Math.round(size)}px, keep it at -0.04em or looser`, e);
    if ((css(e, 'textTransform') === 'uppercase' || (/[A-Z]{4}/.test(e.innerText) && e.innerText === e.innerText.toUpperCase())) && size < 20) say('all caps', 'sentence case instead', e);
  }
  if (photo) out.add(`contrast: ${photo} text elements sit on an image or gradient; check them on the pixels`);
  const labels = [...document.querySelectorAll('h1, h2')].map(h => { const p = h.previousElementSibling; return p && p.innerText && p.innerText.length < 80 && parseFloat(css(p, 'fontSize')) < parseFloat(css(h, 'fontSize')) * .5 ? p : null; }).filter(Boolean);
  if (labels.length > 1) say('labels above headlines', `${labels.length} of them; keep one at most`, labels[0]);
  for (const e of document.querySelectorAll('a, button')) if (/[→↗↘↓➜›»]\s*$/.test(e.innerText || '')) say('arrow', 'no arrows on buttons and links', e);
  if (W < 500) for (const e of document.querySelectorAll('a, button, input, select, [role=button]')) { const r = e.getBoundingClientRect(), min = e.tagName === 'A' && css(e, 'display') === 'inline' ? 24 : 40; if (r.width && r.height < min) say('tap target', `${Math.round(r.height)}px tall`, e); }
  const frag = [...document.querySelectorAll('h1, h2, h3, p, blockquote')].filter(e => { const t = (e.innerText || '').trim(), parts = t.split(/(?<=[.!?])\s+/);
    return t.length < 90 && parts.length === 2 && parts.every(x => /[.!?]$/.test(x) && x.split(/\s+/).length <= 6); });
  if (frag.length > 1) say('two-fragment lines', `${frag.length} lines like "${frag[0].innerText.trim().replace(/\s+/g, ' ')}"; use that shape once at most`, frag[1]);
  const boxed = texts.filter(e => (rgba(css(e, 'backgroundColor'))[3] > .1 || parseFloat(css(e, 'borderTopWidth')) > 0) && parseFloat(css(e, 'borderTopLeftRadius')) > 0 && (r => r.height <= 60 && r.width - r.height > 4)(e.getBoundingClientRect()));
  for (const e of boxed) { const r = e.getBoundingClientRect(), g = document.createRange(); g.selectNodeContents(e); const t = g.getBoundingClientRect(), gap = Math.min(t.left - r.left, r.right - t.right);
    if (t.width && gap < 6) say('cramped', `text ${Math.round(gap)}px from the edge of its pill or button, keep 10px`, e); }
  for (const e of texts) { const s = parseFloat(css(e, 'fontSize'));
    if (css(e, 'overflowX') !== 'visible' && css(e, 'textOverflow') !== 'ellipsis' && e.scrollWidth > e.clientWidth + 1) say('clipped', 'text cut off at the side', e);
    else if (css(e, 'overflowY') !== 'visible' && parseFloat(css(e, 'lineHeight')) < s * 1.15) say('clipped', 'line height under 1.15 inside a box that clips: descenders get cut', e); }
  for (const e of texts) { const s = parseFloat(css(e, 'fontSize')), lh = css(e, 'lineHeight') === 'normal' ? s * 1.3 : parseFloat(css(e, 'lineHeight')), h = e.getBoundingClientRect().height;
    if (/flex|grid/.test(css(e, 'display')) && h <= 60 && h >= lh + 2 && lh > s * 1.2) say('off-center label', `line-height ${Math.round(lh)}px on a ${Math.round(h)}px control; set line-height: 1 so the text centers`, e); }
  const heights = new Set(all.filter(e => { const r = e.getBoundingClientRect(); return (/^(BUTTON|SELECT|INPUT)$/.test(e.tagName) || parseFloat(css(e, 'borderTopLeftRadius')) >= r.height / 2 - 1) && rgba(css(e, 'backgroundColor'))[3] > .1 && Math.abs(r.width - r.height) > 2 && r.height >= 16 && r.height <= 60; }).map(e => Math.round(e.getBoundingClientRect().height)));
  if (heights.size > 4) say('control heights', `${heights.size} different pill and button heights: ${[...heights].sort((a, b) => a - b).join(', ')}px; keep 3–4`);
  const sizes = new Set(texts.map(e => css(e, 'fontSize')));
  if (sizes.size > 10) say('type sizes', `${sizes.size} different sizes: ${[...sizes].map(parseFloat).sort((a, b) => a - b).join(', ')}px`);
  return out.size ? [...out].join('\n') : 'No findings.';
})()
```

On the phone, also look at every image with text over it: the words must sit on a calm area,
never across the subject. Findings are leads, not verdicts: an intentional exception is fine when you can say why. Things
it can't measure are still yours to see: the hard bans, model habits, image quality, whether the
signature lands.
