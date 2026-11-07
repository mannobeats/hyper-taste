# Craft: the finish

The moves behind the software sites people call premium. A kit, not a template: tokens and
content come from your direction, and you use the pieces your composition needs. Variables are
the roles from `system.md`; with no brand hue (graphite, light only on what glows), use the ink
at low alpha where these use `--brand-*`. Timings are in `motion.md`; the product shot is in
`product-shots.md`.

## Grounds

The first screen stands on a ground with a reason, from the product's world:

- **A drawn scene:** a sky, a field, a texture, from layered value noise on a canvas: a soft,
  blurred volume under a halftone of dots sized by the same noise, two or three layers that move
  at different rates on scroll (`examples/landing-sky.html`). It renders once per resize; scroll
  only moves it. Over it, the words get a soft radial shade of the scene's own deep color.
- **A photograph,** from the user, an image tool or a free-licensed source, graded to the
  palette and full-bleed, the words on its calm area with a scrim from their side. It may break
  into the same halftone dots where it meets the page.
- **Dark and empty:** a near-black warmed or cooled toward the accent, one soft radial light
  behind the object, and nothing else (`examples/landing-object.html`). The emptiness is the
  luxury; don't fill it.
- **A material or a color field:** paper, linen, steel, or one saturated color from the world,
  flat with a little grain; text on it takes its own measured ink pair.

**One material, made once and reused.** Whatever the ground is made of returns down the page: the
plates behind product states, the film's poster frame, the close, the footer. A halftone drawn
from the product's own data, its wallpaper zoomed to a new point per card, a blueprint grid, paper
grain. It is the page's one live canvas at most, paused offscreen and still under reduced motion.

## Type set like a studio

```css
h1 { font: 640 clamp(3rem, 1.2rem + 5.4vw, 6.4rem)/.94 var(--font); letter-spacing: -.055em; text-wrap: balance; }
h1 .line { display: block; }            /* each line of the headline is its own span */
h1 .quiet { color: color-mix(in oklch, currentColor 62%, transparent); }
h2 { font: 640 clamp(2.25rem, 1.3rem + 2.8vw, 3.75rem)/1.02 var(--font); letter-spacing: -.04em; text-wrap: balance; }
.lede { font-size: clamp(1.0625rem, 1rem + .3vw, 1.25rem); line-height: 1.5; color: color-mix(in oklch, var(--ink) 64%, var(--bg)); max-width: 38ch; text-wrap: pretty; }
```

- A variable font's in-between weights (550, 620, 650) set the exact color of a line.
- **Lines, not paragraphs.** Break the headline where its meaning breaks and give each line its
  own span. A quieter second (or middle) line turns or finishes the first; a whole line, never one
  word, at 3:1 or better.
- **Lines that rise:** each line in an `overflow: hidden` box, its text rising from 105% below
  over about 1.1s, 90ms apart (`examples/landing-object.html`). The page's one entrance.

- **Light on the hero line:** the hero's second clause may carry the brand's own light as a
  gradient, once per page, in the brand's hue, never violet-to-pink.

  ```css
  .lit { background: linear-gradient(180deg, var(--brand-400), var(--brand-700)); -webkit-background-clip: text;
         background-clip: text; color: transparent; padding-bottom: .12em; margin-bottom: -.12em; }
  ```

## The chip

At most one short line above the main headline, carrying a fact: availability, the free tier,
what it reads. A capsule with a hairline, `›` only when it links. Many pages need none.

```css
.chip { display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 14px; border-radius: 999px;
        font: 500 14px/1 var(--font); color: var(--ink-2); background: color-mix(in oklch, var(--surface) 70%, transparent);
        box-shadow: inset 0 0 0 .5px var(--line-strong); }
```

Optional, as one of the page's ambient touches: a beam travelling round its edge (a conic
gradient on `::before`, masked to the border, turning over about 4.5s, still under reduced
motion).

## Buttons

Capsules about 48px tall (44px in the nav on a phone). The primary is the highest-contrast thing
on the page (`--strong`: dark on light, light on dark, or the field's own ink on a color field);
the secondary a soft fill. An icon from the product may lead the label (a phone, a mic); no
arrows.

```css
.btn { display: inline-flex; align-items: center; gap: 8px; height: 48px; padding: 0 22px; border: 0; border-radius: 999px;
       font: 550 15px/1 var(--font); transition: background-color var(--t-fast), transform var(--t-fast) var(--ease); }
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

## Lit plate and glass

Product states may sit on a plate lit from one side in the brand's hue, the real UI floating on
it as glass. One option for a states grid, not a uniform.

```css
.plate { border-radius: 28px; padding: 8px; box-shadow: var(--hair);
  background: radial-gradient(80% 60% at 15% 0%, color-mix(in oklch, var(--brand-300) 40%, transparent), transparent 70%), var(--panel); }
.glass { border-radius: 20px; background: color-mix(in oklch, var(--surface) 72%, transparent);
  -webkit-backdrop-filter: blur(20px) saturate(1.4); backdrop-filter: blur(20px) saturate(1.4);
  box-shadow: inset 0 0 0 .5px color-mix(in oklch, var(--ink) 18%, transparent), 0 24px 60px -24px color-mix(in oklch, var(--brand-900) 40%, transparent); }
```

In dark mode the plate is `--panel` and the lights drop to about half.

## Nav

Name on the left (a plain wordmark, or the real logo), 3–4 links, actions on the right (sign in,
the one action). Clear over the hero, a material once the page scrolls. On a phone: the name and
the action, each 44px tall.

```css
.nav { position: sticky; top: 0; z-index: 10; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; height: 64px; }
.nav > :last-child { justify-self: end; }
.nav[data-scrolled] { background: color-mix(in oklch, var(--bg) 75%, transparent); backdrop-filter: blur(20px); box-shadow: 0 .5px 0 var(--line); }
```

## The close

The last frame holds: a closing line, the action with its risk line, and a short footer. One
good last frame is the product's name drawn large and faint (`aria-hidden`, a drawing of the
logo outside the type rules):

```css
.wordmark { font: 600 clamp(64px, 16vw, 260px)/.9 var(--font); letter-spacing: -.06em; text-align: center;
  background: linear-gradient(180deg, color-mix(in oklch, var(--ink) 14%, transparent), transparent 90%);
  -webkit-background-clip: text; background-clip: text; color: transparent; user-select: none; }
```

## Rhythm

- Sections at the spacing in `SKILL.md`, a little more toward the end so the page slows.
- Heads align left over asymmetric grids (7/5 then 12, 1.4fr/1fr, 5fr/7fr). Center only
  statements: the promise, a privacy section, the close.
- Alternate density: the product, a grid of states, a quiet statement, facts as numbers,
  pricing, questions, the close.

## Built to hold still

- Every box knows its size before JavaScript runs: aspect ratios on windows and media, states
  that swap stacked in one grid cell, buttons as wide as their longest label.
- Class names don't collide with the project's or the token file's own (`.field`, `.card` and
  `.page` often exist already).
- One shared animation frame loop, started by an IntersectionObserver and stopped offscreen;
  canvases cap device pixel ratio at 2.
- Smooth values go to CSS variables; a framework re-renders only when a discrete state flips.
