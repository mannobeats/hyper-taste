# Craft: the finish

The moves behind the software sites people call premium. A kit, not a template: tokens and
content come from your direction, and you use the pieces your grammar needs. Variables below
are the roles from `system.md`; with no brand hue (graphite, light only on what glows), use the
ink at low alpha where they use `--brand-*`. Motion timings are in `motion.md`.

## The backdrop

The first screen stands on a backdrop, never a flat color: a photograph from the product's
world, graded to the palette, large and full-bleed. A sky for a browser, a kitchen at the pass
for an inventory tool, a motorway at night for write traffic. The words sit on its calm area
(add a scrim from their side), the product window rises across its lower edge, and the
photograph breaks into halftone dots that fade into the page, so the hero and the page are one
surface. Without a photograph, the brand material below plays the same part as a live field.

```html
<section class="hero">
  <img class="photo" src="kitchen.jpg" width="2000" height="1333" alt="" fetchpriority="high">
  <canvas class="dissolve" aria-hidden="true"></canvas>
  <!-- nav, chip, headline, line, action -->
</section>
<div class="film">…the window, pulled up across the seam with a negative margin…</div>
```
```css
.hero { position: relative; isolation: isolate; height: 880px; overflow: hidden; }
.hero .photo, .hero .dissolve { position: absolute; inset: 0; z-index: -2; width: 100%; height: 100%; }
.hero .photo { object-fit: cover; object-position: 50% 40%;
  -webkit-mask: linear-gradient(#000 50%, transparent 76%); mask: linear-gradient(#000 50%, transparent 76%); }
.hero .dissolve { z-index: -1; }
.hero::before { content: ""; position: absolute; inset: 0; z-index: -1; /* scrim behind the words */
  background: radial-gradient(52% 42% at 50% 34%, oklch(.14 .02 55 / .55), transparent),
              linear-gradient(180deg, oklch(.16 .02 55 / .7), transparent 74%); }
.film { position: relative; z-index: 1; margin-top: -330px; }
```
```js
// The photograph breaks into dots: each cell takes the photo's color and shrinks toward the page,
// bright cells holding on longest. Serve the page over http: a file:// image can't be read back.
const hero = document.querySelector('.hero'), photo = hero.querySelector('.photo'), cv = hero.querySelector('.dissolve');
const grain = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
function dissolve() {
  const W = hero.clientWidth, H = hero.clientHeight, dpr = Math.min(2, devicePixelRatio), cell = 7, from = H * .44;
  cv.width = W * dpr; cv.height = H * dpr; const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
  const cols = Math.ceil(W / cell), rows = Math.ceil(H / cell), iw = photo.naturalWidth, ih = photo.naturalHeight, k = Math.max(W / iw, H / ih);
  const o = Object.assign(document.createElement('canvas'), { width: cols, height: rows }).getContext('2d', { willReadFrequently: true });
  o.drawImage(photo, (W - iw * k) * .5 / cell, (H - ih * k) * .4 / cell, iw * k / cell, ih * k / cell); // match object-position
  const px = o.getImageData(0, 0, cols, rows).data;
  for (let j = Math.floor(from / cell); j < rows; j++) {
    const p = (j * cell + cell / 2 - from) / (H - from);
    for (let i = 0; i < cols; i++) {
      const q = (j * cols + i) * 4, lum = (px[q] * .3 + px[q + 1] * .59 + px[q + 2] * .11) / 255;
      const r = cell * .5 * Math.min(1, p * 4) * Math.max(0, 1 - p * (1.2 - lum * .7) - grain(i, j) * .25 * p);
      if (r < .45) continue;
      c.fillStyle = `rgb(${px[q]} ${px[q + 1]} ${px[q + 2]})`; c.beginPath(); c.arc(i * cell + cell / 2, j * cell + cell / 2, r, 0, 7); c.fill();
    }
  }
}
if (photo.complete && photo.naturalWidth) dissolve(); else photo.addEventListener('load', dissolve);
addEventListener('resize', dissolve);
```

- Choose the photograph for its calm area and its light: a dark or open sky above, the subject
  low or to the side, the light from the product's world. Look at the first screen and move the
  photo (`object-position`, an offset) until no line of text crosses a busy part.
- Light text over dark photos: the hero sets its own ink, the primary button turns light, the
  quiet clause at about 60% white.
- In dark mode the dots fade into the dark page; check both.
- No photograph and no image tool: the brand material as a canvas field of dots shaped by the
  product's own data (a waveform, a week of stock, a map), in 2–3 inks from the palette, over soft
  radial light.

## Type set like a studio

```css
h1 { font: 600 clamp(2.5rem, 1rem + 3.9vw, 5rem)/.98 var(--font); letter-spacing: -.045em; text-wrap: balance; }
h2 { font: 600 clamp(2rem, 1.2rem + 2.6vw, 3.5rem)/1.04 var(--font); letter-spacing: -.035em; max-width: 19ch; text-wrap: balance; }
.lede { font-size: clamp(1.0625rem, 1rem + .3vw, 1.25rem); line-height: 1.5; color: color-mix(in oklch, var(--ink) 64%, var(--bg)); max-width: 38ch; text-wrap: pretty; }
```

- A variable font's in-between weights (550, 650) set the exact color of a line.
- **Two-tone headline:** the claim in ink, then a second clause in a quieter ink that finishes
  the thought. A whole clause, never one word, and it stays at 3:1 or better (it's large text).
  As an h1 the pair runs 3–4 lines, so set it smaller (about 60px) to keep the visual's start on
  a 1280×720 first screen.

  ```html
  <h2>Hear it on your own voice. <span class="quiet">Before you sign up for anything.</span></h2>
  ```
  ```css
  .quiet { color: color-mix(in oklch, var(--ink) 46%, var(--bg)); }
  ```

- **Light on the hero line:** the hero's second clause may carry the brand's own light as a
  gradient. Once per page, in the brand's hue, never violet-to-pink.

  ```css
  .lit { background: linear-gradient(180deg, var(--brand-400), var(--brand-700)); -webkit-background-clip: text;
         background-clip: text; color: transparent; padding-bottom: .12em; margin-bottom: -.12em; } /* keeps descenders lit */
  ```

## The chip

One short line above the main headline, carrying a fact: availability, the free tier, "no
account needed". A capsule with a hairline, `›` only when it links.

```css
.chip { display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 14px; border-radius: 999px;
        font: 500 14px/1 var(--font); color: var(--ink-2); background: color-mix(in oklch, var(--surface) 70%, transparent);
        box-shadow: inset 0 0 0 .5px var(--line-strong); }
```

Optional, as one of the page's ambient touches: a beam travelling round its edge.

```css
@property --beam { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.chip { position: relative; }
.chip::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none;
  background: conic-gradient(from var(--beam), transparent 75%, var(--brand) 88%, transparent);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); }
@media (prefers-reduced-motion: no-preference) { .chip::before { animation: beam 4.5s linear infinite; } }
@keyframes beam { to { --beam: 360deg; } }
```

## Buttons

Capsules about 48px tall. The primary is the highest-contrast thing on the page (`--strong`:
dark on light, light on dark); the secondary a soft fill. An icon from the product may lead the label (a mic, the visitor's OS); no arrows.

```css
.btn { display: inline-flex; align-items: center; gap: 8px; height: 48px; padding: 0 22px; border: 0; border-radius: 999px;
       font: 550 15.5px/1 var(--font); transition: background-color var(--t-fast), transform var(--t-fast) var(--ease); }
.btn:active { transform: scale(.98); }
.btn.primary { background: var(--strong); color: var(--on-strong); }
.btn.soft { background: var(--fill); color: var(--ink); box-shadow: inset 0 0 0 .5px var(--line-strong); }
```

## Hairlines and nested corners

Edges are half-pixel rings drawn inside, not borders. Corners nest: the inner radius is the
outer one minus the padding between them.

```css
:root { --hair: inset 0 0 0 .5px color-mix(in oklch, var(--ink) 12%, transparent); }
.card { border-radius: 28px; padding: 8px; box-shadow: var(--hair); }
.card > .shot { border-radius: 20px; } /* 28 − 8 */
```

## The product window

The product rebuilt in HTML and CSS at its real size, with its own tokens, icons and the sample
world, scaled as one picture. Sharper than a screenshot, it follows the theme, and it can act.

```html
<figure class="window" role="img" aria-label="Pantry's week: basil runs out tonight, the next truck is Tuesday">
  <div class="window-ui" aria-hidden="true"><!-- the real screen, every size in design pixels --></div>
</figure>
```
```css
.window { container-type: inline-size; aspect-ratio: 1120 / 700; border-radius: 18px; overflow: hidden; background: var(--surface);
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--ink) 10%, transparent),
              0 50px 120px -40px color-mix(in oklch, var(--brand-900) 45%, transparent); }
.window-ui { --u: calc(100cqw / 1120); height: 100%; font-size: calc(14 * var(--u)); }
.window-ui .row { height: calc(40 * var(--u)); padding-inline: calc(16 * var(--u)); } /* every size: N × --u */
```

- Measure it from the real product, or design the screen once at 1120×700, and write every
  size inside as `calc(N * var(--u))`. It scales with no JavaScript and no layout shift. The
  container is the box with no padding: a glass ring or plate around it is a separate wrapper.
- Phones get their own composition (the key panel alone, about 400×780), not the desktop window
  shrunk past reading.
- `role="img"` with a one-sentence label and the inside `aria-hidden` while it only plays; real
  controls when the visitor can use it. A thin bar with the product's address is fine for a web
  app.
- It shows the sample world: the same person, real-sounding names, varied numbers.

## The film

The window plays the product's core job in 5–8 chapters: each a state of the window and a
one-line caption. The caption and step bars sit under the window, inside its plate or just
below it; a step can be picked, and Pause stops it. It runs on its own
clock, so skimming the page never breaks the story.

```html
<section class="film" data-film style="--hold: 4200ms">
  <figure class="window" …>…</figure>
  <div class="captions"><p>Drop in any recording.</p><p>The room falls away. You stay.</p>…</div>
  <div class="steps"><button data-step aria-label="Drop in any recording"></button>…<button data-pause>Pause</button></div>
</section>
```
```css
.captions { display: grid; } .captions > p { grid-area: 1 / 1; opacity: 0; transition: opacity 500ms var(--ease); }
.film:not([data-chapter]) .captions > :first-child, .captions > [data-on] { opacity: 1; } /* first line shows without JS */
.steps [data-step] { position: relative; width: 32px; height: 44px; border: 0; background: none; }
.steps [data-step]::before, .steps [data-step]::after { content: ""; position: absolute; inset: 20px 0; border-radius: 2px; background: var(--line-strong); }
.steps [data-step]::after { background: var(--ink); transform: scaleX(0); transform-origin: left; }
.steps [aria-current="step"]::before { background: color-mix(in oklch, var(--ink) 35%, transparent); }
.steps [aria-current="step"]::after { transform: none; }
.film[data-playing] .steps [aria-current="step"]::after { animation: fill var(--hold) linear; }
@keyframes fill { from { transform: scaleX(0); } }
```
```js
const film = document.querySelector('[data-film]'), steps = [...film.querySelectorAll('[data-step]')], caps = [...film.querySelectorAll('.captions > p')];
const toggle = film.querySelector('[data-pause]'), hold = parseFloat(getComputedStyle(film).getPropertyValue('--hold'));
let at = 0, timer = 0, seen = false, paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
const show = (n) => { at = n; film.dataset.chapter = n; caps.forEach((c, i) => c.toggleAttribute('data-on', i === n));
  steps.forEach((s, i) => s.setAttribute('aria-current', i === n ? 'step' : 'false')); }; // the window's CSS reads [data-chapter]
const run = () => { clearInterval(timer); const on = seen && !paused; film.toggleAttribute('data-playing', on);
  toggle.textContent = paused ? 'Play' : 'Pause'; if (on) timer = setInterval(() => show((at + 1) % steps.length), hold); };
steps.forEach((s, i) => s.addEventListener('click', () => { show(i); run(); }));
toggle.addEventListener('click', () => { paused = !paused; run(); });
new IntersectionObserver(([e]) => { seen = e.isIntersecting; run(); }, { threshold: .3 }).observe(film);
show(0); run();
```

- Chapter 0 is the window's default state; later chapters override it
  (`.film[data-chapter="2"] .toast { … }`), so the first frame is complete without JavaScript.
- Each chapter changes one or two things in the window (a panel opens, a value drops, a toast
  lands), moving for about a second, then holding about three to read. Elements that change
  transition opacity and transform over 500–700ms.
- Reduced motion starts paused on the first chapter; picking a step shows it at rest.
- Driving it by scroll instead: pin the window for about one screen per chapter, spend 70% of
  each chapter moving and 30% holding, follow the target with a damped ease
  (`cur += (target - cur) * (1 - Math.exp(-7 * dt))`), and run the loop only while on screen.

## The brand material

One material from the product's world, made once and reused: the backdrop, the plates behind
product states, the film's poster, the footer. A halftone field drawn from a voice's
waveform, the product's own wallpaper photograph zoomed to a different point for each card, a
blueprint grid, paper grain. It may drift as the page's one live canvas (paused offscreen,
still under reduced motion), and it can share a value with the film: the grain falls away as
the window's noise slider drops.

## Lit plate and glass

Product states on a selling page sit on a plate lit from one side in the brand's hue, the real
UI floating on it as glass.

```css
.plate { position: relative; isolation: isolate; overflow: hidden; border-radius: 28px; padding: 8px; box-shadow: var(--hair);
  background: radial-gradient(80% 60% at 15% 0%, color-mix(in oklch, var(--brand-300) 40%, transparent), transparent 70%),
              radial-gradient(60% 50% at 100% 100%, color-mix(in oklch, var(--brand-600) 16%, transparent), transparent 70%),
              var(--panel); }
.plate::after { content: ""; position: absolute; inset: 0; z-index: -1; opacity: .3; mix-blend-mode: soft-light; pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
.glass { border-radius: 20px; background: color-mix(in oklch, var(--surface) 72%, transparent);
  -webkit-backdrop-filter: blur(20px) saturate(1.4); backdrop-filter: blur(20px) saturate(1.4);
  box-shadow: inset 0 0 0 .5px color-mix(in oklch, var(--ink) 18%, transparent),
              0 24px 60px -24px color-mix(in oklch, var(--brand-900) 40%, transparent); }
```

Vary the light's position and hue a little per plate, inside one family. In dark mode the
plate is `--panel` and the lights drop to about half.

## Product states, not feature cards

```css
.states { display: grid; gap: 16px; grid-template-columns: 1.4fr 1fr; }
.states > .wide { grid-column: 1 / -1; display: grid; grid-template-columns: 5fr 7fr; gap: 16px; }
@media (max-width: 720px) { .states, .states > .wide { grid-template-columns: 1fr; } }
```

Each cell is a plate holding one state of the real product (the excerpt strip, the level per
platform, the saved preset), then one line led by a bold claim: "**The room, gone.** Hum, echo
and traffic come out; your voice stays." Cells are sized by importance, and the sample world
runs through all of them.

## Nav

Name on the left, 3–4 links in the middle, actions on the right (theme, sign in, the one
action). Clear over the hero, a material once the page scrolls.

```css
.nav { position: sticky; top: 0; z-index: 10; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
       height: 64px; padding-inline: var(--gutter); transition: background-color var(--t-base), box-shadow var(--t-base); }
.nav > :last-child { justify-self: end; }
.nav[data-scrolled] { background: color-mix(in oklch, var(--bg) 75%, transparent); -webkit-backdrop-filter: blur(20px);
                      backdrop-filter: blur(20px); box-shadow: 0 .5px 0 var(--line); }
```
```js
const nav = document.querySelector('.nav');
addEventListener('scroll', () => nav.toggleAttribute('data-scrolled', scrollY > 8), { passive: true });
```

## The close

The last frame holds: a two-tone closing line, the action with its risk line, and the footer
under the product's name drawn large and faint.

```html
<p class="wordmark" aria-hidden="true">pantry</p> <!-- a drawing of the logo, outside the type rules -->
```
```css
.wordmark { margin: 0; text-align: center; font: 600 clamp(64px, 16vw, 260px)/.9 var(--font); letter-spacing: -.06em;
  background: linear-gradient(180deg, color-mix(in oklch, var(--ink) 14%, transparent), transparent 90%);
  -webkit-background-clip: text; background-clip: text; color: transparent; user-select: none; }
```

## Rhythm

- Sections at the spacing in `SKILL.md`, a little more toward the end so the page slows.
- Heads align left over asymmetric grids (7/5 then 12, 1.4fr/1fr, 5fr/7fr, 0.8fr/1.2fr for
  questions). Center only statements: the promise, a privacy section, the close.
- Alternate density: the film, a try strip, product states, a quiet statement, product facts as
  numbers, pricing, questions, the close.

## Built to hold still

- Every box knows its size before JavaScript runs: aspect ratios on windows and media, states
  that swap stacked in one grid cell, buttons as wide as their longest label.
- One shared animation frame loop, started by an IntersectionObserver and stopped offscreen;
  canvases cap device pixel ratio at 2.
- Smooth values go to CSS variables; a framework re-renders only when a discrete state flips.
