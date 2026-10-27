# Tells: reviewing and redesigning

For reviews, redesigns and "it looks off". Look at the page first (`look.md`), then read it
against "Never" and "The obvious version" in `SKILL.md`, and this list of what to do instead.

## Layout

- **Everything centered** → left-align what people read in order; center only a short headline
  with its line and action, or a statement section.
- **Sections in cards, cards in cards** → one surface split by lines and headings.
- **Three equal feature cards** → product states on lit plates, sized by importance (`craft.md`).
- **The same composition section after section** → change form and pace: full-bleed, a tight
  list, one huge number, a quiet pause.
- **A crowded first screen** (label, headline, paragraph, three buttons, stats, logos) → headline,
  one line, one action and a link, one visual.
- **Stretched rows** (a label far left, its value far right at 1400px) → natural widths, more
  columns.
- **Nav with 7 links and 2 buttons** → 3–4 links and one action.
- **`100vh` heroes that jump on phones** → `min-height: 100dvh`.

## Safe and forgettable

- **Nothing bigger than a polite headline** → scale the one thing you're proudest of until it
  feels too big, then pull back a little.
- **White page, gray text, one blue button** → the palette from the product's world.
- **Images small, boxed and centered** → full-bleed, bleeding off an edge, overlapping.
- **A screenshot in a frame on a glow** → the product window, playing (`craft.md`).
- **Only fade-ups** → motion that acts out the product: the film, a scene, something to try.
- **The signature is a chart or a list** → something only this product can show.

## Color and type

- **The category's stock palette** → one specific thing from the product's world.
- **Categories as shades of one color** → different hues at one lightness.
- **Every card and icon in a different color** → neutral by default, color for meaning.
- **Pure black text, `#fff` on black, dark borders** → gray text levels, dark surfaces at
  L .13–.21, hairline rings.
- **Warm and cool grays mixed; an accent that drifts** → one gray family, one accent token.
- **Dark mode by inverting** → designed dark (`system.md`).
- **Title Case, only weights 400 and 700, proportional digits, orphans** → sentence case,
  weights on purpose, `tabular-nums`, `text-wrap: balance` and `pretty`.
- **A font named in CSS but never shipped** → the files in the project.

## Components and code

- **Two equal buttons everywhere** → one primary per view.
- **A modal for everything** → popovers, drawers, inline editing.
- **"Are you sure?" centered** → left-aligned, naming what's lost, a red button naming the action.
- **A library's default look** → its variables mapped to the tokens.
- **The stat card grid** → a row with dividers: muted label, 600 value, context line.
- **Motion everywhere, bouncy hovers, cursor followers, scroll-jacking** → `motion.md`.
- **Labels touching their pill, off-center text, five pill heights** → `app-ui.md` "Controls
  that hold their shape".
- **`z-index: 9999`, raw hex in components, div soup, links to `#`, `alert()`, `// TODO`** → a
  small z scale, tokens, semantic elements, real handlers, finished sections.

## Redesign order

1. **Look at it** at desktop and phone widths and list every tell and missing state.
2. **Keep** URLs, nav labels, field names and order, the logo, legal copy and analytics hooks.
3. **Fix in this order,** looking after each step: tokens, spacing and edges, emphasis, cards to
   layout, states, copy, motion.
4. **Stop when the brief is met.** Improve what's there before inventing new sections.
