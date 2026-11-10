# Product shots: the product, rebuilt in code

The picture on most software pages is the product itself: a window, a phone, a faceplate,
rebuilt in HTML and CSS at its real size with the product's own tokens, icons and sample world.
Sharper than a screenshot, it follows the theme, it can move, and it can be composed.

## The window

- **Real size.** Every number inside is the app's own pixels: 13–14px text, 32px controls, rows
  of 44–56px. Text inside a product shot is never under 11px at any width.
- **Big.** On the first screen, 80% or more of the content width, up to about 1180px, centered
  under the headline stack and rising from the fold. Below the fold, a window fills its section.
- **Two ways to build it:** absolutely placed at real size inside a section whose
  `overflow: hidden` is the crop (`examples/landing-sky.html`), or designed once at about 1120
  wide with every size written as `calc(N * var(--u))`, `--u: calc(100cqw / 1120)` on a
  `container-type: inline-size` box, so it scales as one picture.
- **Glass where the product has it:** a sidebar at 40% white with a blurred, saturated backdrop
  over the scene reads as a real Mac app; a solid reading pane beside it keeps the words crisp.
- `role="img"` with a one-sentence label and the inside `aria-hidden` while it only shows; real,
  labeled controls when the visitor can use it.

## The pinned scene

The words drift up and fade while the product rises and grows until it fills the screen: one
sticky stage, one CSS variable from scroll progress, no library. The code is in
`examples/landing-sky.html` (`.scene`, `.stage`, `--p`). What makes it hold:

- At progress 0 the first screen is complete: the words, the actions, and the top of the window
  one gap under them, measured from the copy's real bottom on load and resize.
- The window enters on `translate`, never on the `transform` that places it.
- On tall screens the next section rises over what is left of the scene, so no band is empty.
- Under reduced motion and on phones the scene is the same picture at rest, in flow.

## Framing

1. **One hero object,** at most one satellite (a notification, a receipt) with a job.
2. **Keep what identifies the product:** a title, the real chrome, the rows that give the action
   a reason.
3. **Never over the words.** The window starts under the actions; a satellite covers chrome or
   empty screen, never a row, the headline or a button (`covered`).
4. **Crop only filler.** Real words, the action and the result stay whole; a crop falls between
   rows or across empty space (`cut by the crop`).
5. **Small shots bleed with intent:** in a tile, a window may run off the right or bottom edge by
   10–40%, the top-left whole. Crossing an edge by under 24px reads as a mistake.
6. **No void:** a pane whose content stops well above its bottom, or rows spread to fill it,
   reads unfinished. Crop under the content, or put more product in.
7. **Depth:** shadows tinted to the ground, long and soft; on dark, depth from a lighter surface
   and an inner top highlight, not a black shadow.

## Restraint

- **At hero scale,** real content throughout. **In a small shot,** count the real strings,
  usually 3–7: the title, the thing acted on, the result.
- **One number gets to be big;** the heaviest marks sit on what the story is about.
- **Keep the domain's signature content:** faces, album art, a map, a route. Generic rows are
  the generated look.
- **Say it once:** one signal for a feature, not in the header, the panel and every row.
- **Spacing inside:** words 12px from any edge; a title over its subtitle 3–6px of ink apart;
  rows padded 12px.

## Moving it

- **The film:** 5–8 chapters, each a state of the window and a one-line caption in the present
  tense, each changing one or two things; step bars to pick one, and Pause. The captions read as
  one story on their own. Chapter 0 is complete without JavaScript.
- **Something to try:** a real control on the page that changes the product: a knob that turns,
  keys that light, a night you can drag. Values roll; nothing swaps in one frame.
- **Draw it on:** a route or a chart draws along its own length once; a meter breathes only
  while on screen.

## Product states, as a grid

The section after the hero shows more of the product as one picture made of tiles.

1. **One hero tile,** two columns, with the richest picture.
2. **A UI tile shows one thing,** not a whole window: the menu, the list, the setting, as a
   panel over a drawn scene, at real size.
3. **Neighbors contrast:** a picture next to a number, dense next to calm.
4. **Big type is a tile:** one real number at 112–270px with a one-line label.
5. **One frame family:** shared radius, gap and padding; the variety lives inside. Each thing
   is said once across the set.

## Phones

- **Real proportions:** a 390 × 844 screen in a 10px bezel, screen corners about 54px, the island
  124 × 36 near the top; nothing under it. Scale the whole phone as one picture.
- **Cropped:** at the bottom, under the content and above the tab bar; at the top, the status
  bar and nav go together.
- **A notification** keeps its true proportion: one bold line, the message, an app icon, a time.

**On a phone-width page** every shot gets its own composition: the key panel alone at a
360–400px design width, two-line rows, the side panels gone, the pinned scene at rest. A desktop
window scaled into a phone column fails every reader (`tiny text`).
