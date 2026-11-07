# Product shots: the product, rebuilt in code

The picture on most software pages is the product itself: a window, a phone, a faceplate,
rebuilt in HTML and CSS at its real size with the product's own tokens, icons and sample world.
Sharper than a screenshot, it follows the theme, it can move, and it can be composed.

## The window

- **Real size.** Every number inside is the app's own pixels: 13–14px text, 32px controls,
  rows of 44–56px. Text inside a product shot is never under 11px at any width.
- **Big.** On the first screen the window is 80% or more of the content width, up to about
  1180px, centered under the headline stack and rising from the fold. Below the fold, a window
  fills its section.
- **Two ways to build it:** absolutely placed at real size inside a section whose
  `overflow: hidden` is the crop (`examples/landing-sky.html`), or designed once at about 1120
  wide with every size written as `calc(N * var(--u))`, `--u: calc(100cqw / 1120)` on a
  `container-type: inline-size` box, so it scales as one picture.
- **Glass where the product has it:** a sidebar at 40% white with `backdrop-filter: blur(40px)
  saturate(1.6)` over the scene behind the window reads as a real Mac app; a solid reading pane
  beside it keeps the words crisp.
- `role="img"` with a one-sentence label and the inside `aria-hidden` while it only shows; real,
  labeled controls when the visitor can use it.

## The pinned scene

The first screen's motion: the words drift up and fade while the product rises and grows until
it fills the screen, and the scene's layers part at different speeds. One sticky stage, one CSS
variable, no library (`examples/landing-sky.html`):

```css
.scene { height: 230svh; margin-bottom: calc(-1 * max(0px, 100svh - 864px)); } /* the next section rises over leftover sky on tall screens */
.stage { --p: 0; position: sticky; top: 0; height: 100svh; overflow: hidden; }
.copy  { opacity: calc(1 - var(--p) * 2.2); transform: translate(-50%, calc(var(--p) * -90px)); }
.window { height: min(720px, calc(100svh - 144px)); /* starts one gap under the actions (--top0, measured), ends one gap under the nav */
  transform: translate(-50%, calc(var(--top0) - var(--p) * (var(--top0) - 96px))) scale(calc(.94 + var(--p) * .06)); }
.window { animation: in 1.3s both; } @keyframes in { from { opacity: 0; translate: 0 56px; } } /* enter on translate, never on the transform that places it */
.far  { transform: translateY(calc(var(--p) * -40px)); }      /* each layer a different rate */
.near { transform: translateY(calc(var(--p) * -170px)) scale(calc(1 + var(--p) * .12)); }
@media (prefers-reduced-motion: reduce), (max-width: 860px) { .scene { height: auto; } .stage { position: relative; height: auto; } /* the same picture, at rest, in flow */ }
```
```js
const tick = () => { const r = scene.getBoundingClientRect();
  stage.style.setProperty('--p', Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)))); };
addEventListener('scroll', () => requestAnimationFrame(tick), { passive: true });
```

At `--p: 0` the first screen is complete: the words, the actions, and the top of the window one
gap under them. Set `--top0` from the copy's real bottom (`copy.offsetTop + copy.offsetHeight + 64`)
on load and resize. The nav stays pinned over the scene and turns solid once the window rises
under it.

## Framing

1. **One hero object,** at most one satellite (a notification, a receipt) with a job.
2. **Keep what identifies the product:** a title, the real chrome, the rows that give the action
   a reason.
3. **Never over the words.** The window starts under the actions; a satellite covers chrome or
   empty screen, never a row, the headline or a button (`covered`).
4. **Crop only filler.** Real words, the action and the result stay whole; a crop falls between
   rows or across empty space (`cut by the crop`). The fold of a pinned scene is not a crop: the
   scroll brings the rest into view.
5. **Small shots bleed with intent:** in a tile or a card, a window may run off the right or
   bottom edge by 10–40%, the top-left whole. Crossing an edge by under 24px reads as a mistake.
6. **No void:** a pane whose content stops well above its bottom, or rows spread to fill it,
   reads unfinished. Crop under the content, or put more product in.
7. **Depth:** shadows tinted to the ground, long and soft (`0 50px 100px -30px`); on dark, depth
   from a lighter surface and an inner top highlight, not a black shadow.

## Compositions

| Composition | How it sits | Gold |
|---|---|---|
| **Rising from the fold** | Centered under the headline stack, full content width, growing as you scroll | `landing-sky` |
| **An object beside the words** | One sculpted thing at about 40% of the screen, lit from above, that responds to the hand | `landing-object` |
| **One object under the words** | Centered under the headline stack on a light ground, drawn in CSS, leaning toward the pointer | `landing-card` |
| **The faceplate** | The whole product as one plate, centered, wide, every control at real size | `landing-object` |
| **Glass over a scene** | A floating panel of the real UI over a drawn sky, field or texture, inside a tile | `landing-sky` |
| **The data as the picture** | The product's own drawing (a route, a fleet of cells, a meter) is the hero | `phone-app`, `app-dashboard` |
| **Device pair** | A desktop window and a phone straddling its edge, telling one event | |
| **Close-up** | One control at 1.3–1.6× with its chrome, for a feature about one setting | |
| **Row of screens** | Two or three phones at one height, each cropped under its content | |

## Restraint

- **At hero scale,** real content throughout. **In a small shot** (a tile, a satellite), count
  the real strings, usually 3–7: the title, the thing acted on, the result.
- **One number gets to be big;** the heaviest marks sit on what the story is about.
- **Keep the domain's signature content:** faces, album art, a map, a route. Generic rows are
  the generated look.
- **Say it once:** one signal for a feature, not in the header, the panel and every row.
- **No invented logos** inside the shot; a plain wordmark or the account's name.
- **Spacing inside:** words 12px from any edge; a title over its subtitle 3–6px of ink apart;
  rows padded 12px; a centered amount centers its digits.
- **Icons** from one set, one stroke, one size per shot; the current tab may be the one filled.

## Moving it

- **The film:** 5–8 chapters, each a state of the window and a one-line caption, each changing
  one or two things; step bars to pick one, and Pause. Chapter 0 complete without JavaScript.
- **Something to try:** a real control on the page that changes the product: a knob that turns,
  keys that light, a date that moves every deadline. Values roll; nothing swaps in one frame.
- **Draw it on:** a route or a chart draws along its own length once (`stroke-dashoffset` from
  `getTotalLength()`); a meter breathes only while on screen.

## Product states, as a grid

The section after the hero shows more of the product as one picture made of tiles.

1. **One hero tile,** two columns, with the richest picture.
2. **A UI tile shows one thing,** not a whole window: the menu, the list, the setting, as a glass
   panel over a drawn scene, at real size.
3. **Neighbors contrast:** a picture next to a number, dense next to calm.
4. **Big type is a tile:** one real number at 112–270px with a one-line label.
5. **Copy is short and outside the picture:** a bold lead and a quieter continuation, one
   sentence, at 17–22px.
6. **One frame family:** shared radius, gap and padding; the variety lives inside.
7. **Say each thing once** across the set.

## Phones in a page

- **Real proportions:** a 390 × 844 screen in a 10px bezel, screen corners about 54px, the island
  124 × 36 near the top; nothing under it. Scale the whole phone as one picture.
- **Cropped:** at the bottom, the crop falls under the content and above the tab bar; at the top,
  the status bar and nav go together.
- **A notification** keeps its true proportion: one bold line, the message, an app icon, a time.

## On a phone-width page

Every shot gets a phone composition: the key panel alone at a 360–400px design width, two-line
rows, the side panels gone, the pinned scene replaced by the same picture at rest. A desktop
window scaled into a phone column fails every reader (`tiny text`).
