# Craft: the finish

The moves behind the sites people call premium. The working code is in the golds: copy it from
there, in your voice's shape, with your tokens.

## Where the code lives

| Move | Gold | Find it at |
|---|---|---|
| A scene from layered noise, a halftone over soft volume | `landing-sky` | `paint()`, `.stage canvas` |
| A pinned scene on one CSS variable: the words leave, the product rises | `landing-sky`, `landing-card` | `.scene`, `.stage`, `--p` |
| Glass panels of real UI over a drawn scene, as tiles | `landing-sky` | `.pic`, `.pane` |
| A nav that is clear over the hero and a material after it | `landing-sky` | `.nav[data-solid]` |
| An object sculpted in gradients: brushed metal, a knurled ring, a lit needle | `landing-object` | `.knob`, `.dial`, `.vu` |
| A control the visitor can turn, with a rolling value | `landing-object` | `pointermove` on `.knob` |
| Headline lines that rise from masks | `landing-object` | `h1 .l` |
| An object that leans toward the pointer; an engraved ground | `landing-card` | `.card`, `.engrave` |
| A diagram that draws itself along its paths | `landing-card` | `.wires`, `getTotalLength` |
| A scene whose every color is mixed from the time of day | `landing-night` | `.stage`, `--n`, `--d` |
| A landscape in layers: stars, moon, ridgelines, a viaduct, fog | `landing-night` | `.stars`, `.moon`, `.ridge`, `.viaduct` |
| A train in CSS whose windows go dark as the night deepens | `landing-night` | `.train`, `.car` |
| A paper object: grain, perforation, an ink stamp, a shadow, a second one under it | `landing-night` | `.ticket`, `.stamp`, `.under` |
| Illustrations as lit windows; pictures, a texture and a number as tiles | `landing-night` | `.coach`, `.glass`, `.tiles` |
| A serif headline with an italic turn; a ruled timetable | `landing-night` | `h1`, `.turn`, `.tt` |
| The entrance and the reveals | every landing gold | `.enter`, `[data-reveal]` |

## Grounds

The first screen stands on a ground with a reason, from the product's world:

- **A drawn scene:** rendered once per resize; scroll only moves its layers at different rates.
  Words over it get a soft shade of the scene's own deep color, and no dot or line runs behind
  a word.
- **A photograph,** graded to the palette and full-bleed, the words on its calm area with a
  scrim from their side (`visuals.md`).
- **Dark and empty:** a near-black warmed or cooled toward the accent, one soft radial light
  behind the object, and nothing else. The emptiness is the luxury; don't fill it.
- **Paper, a material or a color field:** flat, with rules or a little grain; text on it takes
  its own measured ink pair.

**One material, made once and reused.** Whatever the ground is made of returns down the page:
behind the product states, on the chosen plan, in the close. It is the page's one live canvas at
most, paused offscreen and still under reduced motion.

## Rhythm

- Heads align left over asymmetric grids (7/5, 1.4fr/1fr, 5fr/3fr/4fr). Center only statements:
  the promise, a privacy section, the close.
- Alternate density: the product, a grid of states, a quiet statement, facts as numbers,
  pricing, the close.
- The last frame holds: a closing line, the action with its risk line, a short footer.

## The last five percent

Small things nobody names and everybody feels.

- **Gradients without the gray middle:** `linear-gradient(in oklch, …)`.
- **No banding:** a dark or soft gradient steps into stripes on most screens. Lay a fine grain
  over it, or draw the ground on a canvas with one random level per pixel.

  ```css
  .grain::after { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .05; mix-blend-mode: overlay;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  ```

- **Optical edges:** big letters carry side bearing, so display type starts a hair right of the
  column. Pull it back about `-.04em`; hang opening quotes outside the edge.
- **Labels truly centered:** `text-box: trim-both cap alphabetic` on buttons and chips, with
  `line-height: 1` as the fallback.
- **The font's own features:** `tabular-nums` on numbers that change, the face's alternates
  where it has them, `font-optical-sizing: auto`, `font-synthesis: none` so a missing weight or
  italic is never faked.
- **Nested corners:** the inner radius is the outer one minus the padding between them.
- **Cards that line up inside:** a row of plans or tiles is a `subgrid`, so titles, prices and
  buttons share lines however long the copy runs.
- **The page's own selection and caret:** `::selection` in the accent's tint, `caret-color` and
  `accent-color` set to the accent.
- **Anchors that land right:** `scroll-margin-top` on every section a link jumps to;
  `scrollbar-gutter: stable` so a dialog never shifts the page.

## Built to hold still

- Every box knows its size before JavaScript runs: aspect ratios on windows and media, states
  that swap stacked in one grid cell, buttons as wide as their longest label.
- Class names don't collide with the project's own (`.field`, `.card` and `.page` often exist).
- One shared animation frame loop, started by an IntersectionObserver and stopped offscreen;
  canvases cap device pixel ratio at 2.
- Smooth values go to CSS variables; a framework re-renders only when a discrete state flips.
