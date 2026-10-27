# Motion

Every timing in this skill lives here. Motion makes cause and effect visible and leads the
eye; on a page that sells it also shows what the product does.

## Rules

- **Every animation has a job:** confirm an action, show where something came from, show a
  change in the data, lead the eye, or act out the product. "It looked static" is not a job.
- **Responses are fast:** hover, press, toggle and tab 140–220ms (`--t-fast`, `--t-base`).
- **Arrivals are slower, once:** a selling page's entrance and reveals 0.9–1.3s; app layers
  160–200ms in, 120ms out. Nothing in app UI runs past 800ms.
- **Ease out** (`--ease: cubic-bezier(.16, 1, .3, 1)`) for arriving and responding; ease in-out
  for something on screen moving to a new place; linear for progress and loops; springs on
  native.
- **Things come from where they live:** a menu grows from its button, a sheet from its edge, a
  detail from its row, and goes back the same way. Transitions, not keyframes, so they reverse
  midway.
- **Only `transform`, `opacity` and `filter`** (plus colors). Never width, height, top or margin.
- **Loops** only for loading, the film, and at most two ambient touches (a chip's beam, the brand
  material's drift), all paused offscreen and still under reduced motion.
- **Content never waits:** everything shows without JavaScript, the headline is legible within
  about 400ms, and reduced motion keeps color and opacity feedback and drops movement.

## Pages that sell

1. **Feedback on every control,** a pressed state at `scale(.98)`.
2. **One entrance for the first screen, the only motion that starts hidden:** headline first,
   then line, actions and the visual. Each rises 16–28px from a blur of up to 12px, opacity over
   about 600ms and transform over about 1s, 40–80ms apart. The headline may rise word by word
   (each word a span with its `--i`); never letter by letter.
3. **Reveals once, below the fold:** rise about 24px from an 8px blur, opacity over 1s and
   transform over 1.2s, children 60–80ms apart. Scroll reveals never hide what is on screen at
   load.
4. **Reveals that act out the content** where they explain it: bars grow from the baseline, a
   line types itself (2 characters per 25ms), a list fills a row at a time, a number counts up
   once over 1.2–1.8s in tabular figures (real numbers only).
5. **The signature:** the film or scene (`craft.md`, `visuals.md`), the most ambitious motion on
   the page. Pointer effects: at most one per screen, eased toward the pointer, fine pointers
   only.

## App UI

- **No entrance** on screens people open often (dashboards, lists, settings, inboxes, a phone
  app's home): on screen the moment they load, no staged cards, no counting numbers.
- **Instant** for what people do many times a day: command menus, context menus, tab and
  sidebar switches.
- **State changes in place:** a filter reflows (FLIP or `document.startViewTransition`), a
  segmented highlight slides, a saved icon fills.
- **Layers** fade and scale from .96 toward their trigger; tooltips wait about 500ms the first
  time, then show at once along a toolbar.
- **Real waits** get progress or a skeleton; a result too fast to believe gets a short
  confirming moment. Entrances belong to moments people see once: onboarding, a success.

## Recipes

```css
:root { --ease: cubic-bezier(.16, 1, .3, 1); --t-fast: 140ms; --t-base: 220ms; }
.btn { transition: background-color var(--t-fast), color var(--t-fast), transform var(--t-fast) var(--ease); }
.btn:active { transform: scale(.98); }

/* the first screen's entrance: pure CSS, so it plays without JavaScript */
@media (prefers-reduced-motion: no-preference) {
  .enter { animation: enter-fade .6s var(--ease) both, enter-rise 1s var(--ease) both; animation-delay: calc(var(--i, 0) * 60ms); }
  @keyframes enter-fade { from { opacity: 0; filter: blur(12px); } }
  @keyframes enter-rise { from { transform: translateY(.3em); } }
}

/* reveals below the fold: only elements JavaScript marks pending are hidden */
[data-reveal] { transition: opacity 1s var(--ease), transform 1.2s var(--ease), filter 1s var(--ease);
                transition-delay: calc(var(--i, 0) * 70ms); }
[data-reveal].pending { opacity: 0; transform: translateY(24px); filter: blur(8px); }

/* layers */
dialog[open] { animation: pop 180ms var(--ease); }
@keyframes pop { from { opacity: 0; transform: scale(.96); } }
```

```js
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!calm) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.remove('pending'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -12% 0px' });
  for (const el of document.querySelectorAll('[data-reveal]'))
    if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pending'); io.observe(el); }
}

function countUp(el, to, ms = 1500) {
  if (calm) return (el.textContent = to.toLocaleString());
  const t0 = performance.now(), tick = (t) => { const p = Math.min(1, (t - t0) / ms);
    el.textContent = Math.round(to * (1 - (1 - p) ** 3)).toLocaleString(); if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
```

In a framework, run the observer inside the component (a `useReveal` hook, `onMounted`, a
Svelte action) so content that mounts later still reveals, and use the project's animation
library (Motion, GSAP, Vue `<Transition>`) with these timings instead of adding another.

## Check it

Scroll the whole page so every reveal fires; a section that stays blank has a trigger that
never fires. Then emulate `prefers-reduced-motion: reduce`: everything shows, nothing travels,
the film is paused.
