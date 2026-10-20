# Motion

Read this for any page or screen that moves: hover and press states, entrances, scroll reveals,
charts, tabs, dialogs, theme switches. Tasteful motion is a big part of what makes an interface
feel finished. It makes cause and effect visible, and it leads the eye. The goal is a page that
feels alive in the hand and calm to look at.

## The rules

- **Every animation has a job:** confirm an action, show where something came from or went, show
  a change in the data, or lead the eye to the next thing. "It looked static" is not a job.
- **Fast for responses, slower for arrivals.** State changes take 140–220ms (`--t-fast`,
  `--t-base`). Entrances take 400–700ms. Nothing in app UI takes over 800ms; on a page
  that sells, a number counting up or a scroll scene may run longer (`scroll.md`).
- **Ease out** (`--ease`) for things arriving, leaving and responding; ease in-out for something
  already on screen moving to a new place. Never ease-in in UI: it feels slow even at the same
  duration. Linear only for progress and loops. Native apps use springs.
- **Things come from where they live.** A menu grows from its button, a sheet rises from its
  edge, a panel slides from its side, a detail grows out of its row, and each goes back the same
  way. This is how people learn where things are.
- **Interruptible.** State changes use transitions or springs that can reverse midway, never
  keyframes that have to finish first.
- **Personality is a setting, chosen once.** Tools for repeated work are fast and rigid.
  Friendly products may overshoot a little on their own moments. Premium runs slightly longer,
  in-out. No bounce in work tools.
- **Move a little in UI and reveals.** Rise 8–16px, scale from .96–.98, blur 4–8px at most. Big
  travel on every element looks cheap. The signature moment is the exception: go big there.
  Scroll-driven scenes (`visuals.md`) follow the scroll, so they can travel further.
- **One scene at a time.** Each effect owns its section and never competes with another. A
  hero's planes moving together are one scene.
- **Animate `transform` and `opacity`** (plus colors and `filter`). Never width, height, top,
  left or margin.
- **Once.** Entrances and reveals play one time. Loops are only for loading states and one
  ambient background scene, paused offscreen.
- **Content never waits for motion.** Text is readable within about 300ms of load, and all
  content shows without JavaScript and under reduced motion.

## What to animate, in order

1. **Feedback on every control.** Buttons, links, tabs, rows and inputs transition their color
   and background over `--t-fast`. Buttons get a pressed state (`scale(.98)` or a darker fill).
   Focus rings appear without delay. This is the minimum. A page without it feels broken.
2. **One entrance for the first screen of a page that sells.** The hero's parts arrive in
   reading order: headline, line, actions, visual. Each rises 12px and fades in over 600ms, about 70ms apart. The
   headline enters as one piece.
3. **Reveals that act out the content,** when a section scrolls into view. Bars grow from the
   baseline, a line draws itself, a number counts up to its value, a list fills in one row at a
   time (40–60ms apart), a demo plays through its steps. Reveal the one thing that shows the
   point of each section, not every paragraph.
4. **State changes in place.** A filter or tab change crossfades or reflows the items (FLIP, or
   `document.startViewTransition` where supported) instead of snapping. A segmented control's
   highlight slides to the new option. A saved item's icon fills with a quick scale.
5. **Layers.** Dialogs, popovers and menus fade and scale from .96 toward their trigger in
   160–200ms, and leave faster (120ms). The backdrop fades.
6. **One signature moment** on every page that sells: motion that acts out what the product does
   (a lock's bolt sliding shut as you scroll, a search narrowing thousands of results to three).
   Make it the most ambitious thing on the page, one or two per page at most. Scroll-driven
   product scenes are in `visuals.md`.

## When not to animate

Knowing what stays still matters as much. Animation teaches something the first time; by the
hundredth it only makes people wait.

- **No entrance on app screens people open often.** Dashboards, lists, tables, settings,
  inboxes, profile cards and a phone app's home screen are on screen the moment they load: no
  fade or rise on load, no cards staged 100ms apart, no numbers counting up. Their motion is
  feedback on controls (≤220ms) and layers that open from their trigger. Entrances are for
  pages that sell and moments people see once (onboarding, a success).
- **Instant** for anything people do many times a day or start from the keyboard: command
  menus, context menus, switching tabs and sidebar sections, opening folders. They already know
  what will happen.
- **A small exit is enough:** the chosen item flashes once, then the menu fades out in about
  100ms.
- **Tooltips:** the first waits about 500ms; while the pointer moves along the toolbar, the
  next ones show at once.
- **Real waiting gets motion:** an upload shows live progress, a slow load a skeleton.
- **Too fast to believe** (money moved, a long job done at once): a short confirming moment
  closes the gap between done and felt done.

## Recipes

The tokens (`references/system.md`): `--ease` (an ease-out curve), `--t-fast` (140ms), `--t-base` (220ms).

```css
/* feedback */
.btn { transition: background-color var(--t-fast), color var(--t-fast), transform var(--t-fast) var(--ease); }
.btn:active { transform: scale(.98); }

/* entrance and reveals: gated on a class that JavaScript adds, so content shows without it */
.js .reveal { opacity: 0; transform: translateY(12px); }
.js .reveal.in { opacity: 1; transform: none;
  transition: opacity 600ms var(--ease), transform 600ms var(--ease);
  transition-delay: calc(var(--i, 0) * 70ms); }

/* data: bars grow from the baseline */
.js .bar { transform: scaleY(0); transform-origin: bottom; }
.js .in .bar { transform: none; transition: transform 700ms var(--ease) calc(var(--i, 0) * 40ms); }

/* layers */
dialog[open] { animation: pop 180ms var(--ease); }
@keyframes pop { from { opacity: 0; transform: scale(.96); } }
```

```js
document.documentElement.classList.add('js');
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}, { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal, [data-reveal]').forEach(el => io.observe(el));

// count up once, and skip it when the visitor asked for less motion
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
function countUp(el, to, ms = 1500) {
  if (calm) return (el.textContent = to.toLocaleString());
  const t0 = performance.now();
  const tick = t => { const p = Math.min(1, (t - t0) / ms), k = 1 - (1 - p) ** 3;
    el.textContent = Math.round(to * k).toLocaleString(); if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
```

Mark the elements in the hero `.reveal` too, and add `in` on load (after `document.fonts.ready`)
so the entrance plays without waiting for a scroll. Numbers that count use `tabular-nums` so
they don't jitter.

## Reduced motion

The token file shortens every CSS animation and transition to nothing under
`prefers-reduced-motion: reduce`, so CSS reveals land on their final state. JavaScript motion
(count-ups, scroll-linked effects, `animate()`) must check the media query itself and show the
final state. Keep color and opacity feedback. Drop movement.

What makes motion look generated is listed in `tells.md`.

## In a framework

The recipes are plain DOM so they work anywhere. In React, Vue or Svelte, keep the same timings
and rules but wire them the framework's way:

- Run the observer inside the component (a small `useReveal` hook, `onMounted`, a Svelte action),
  so content that mounts later, after a route change or a fetch, still reveals.
- If the project has an animation library (Motion, GSAP, Vue `<Transition>`, Svelte
  transitions), use it instead of adding another one.
- With server rendering, add the `js` class in the document head, before the page paints, so
  content never flashes hidden.

## Check it

Scroll through the whole page in your browser so every reveal fires. A section that stays blank
means its trigger never fires: fix it. Then emulate `prefers-reduced-motion: reduce` and check
that everything still shows, without movement.
