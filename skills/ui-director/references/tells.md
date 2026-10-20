# Tells: what makes UI read as generated

Read this when you review, redesign or audit UI, and scan it once before shipping anything. Each
line is a pattern people now recognize as generated, then what to do instead. The hard bans and
"Model habits" in `SKILL.md` come first and aren't repeated here.

## Layout

- **Everything centered** → Left-align what people read in order. A short headline with its line
  and button can center.
- **Every section in a card, cards in cards** → One surface, split by lines, headings and space.
  Cards only for real objects and floating layers.
- **Three equal feature cards with an icon in a circle** → A real piece of UI per feature, one
  wide row plus two, or unequal cells with the most important one biggest.
- **The same composition section after section** → Change the form and the pace: full-bleed, a
  tight list, one huge number, a quiet pause.
- **A crowded first screen** (label, headline, paragraph, three buttons, stats, logos, avatars) →
  Headline, one sentence, one button and a text link, one visual.
- **Stretched rows** (a label far left, its value far right on a 1400px screen) → Natural widths,
  more columns.
- **Nav with 7 links and 2 buttons** → 3–4 links and one action.
- **`100vh` heroes that jump on phones** → `min-height: 100dvh`.
- **Floating buttons and wrapped button rows** → Lock every element to an edge or a line.

## Safe and forgettable

Clean, correct, and nobody remembers it. On a page that sells, this is a failure too.

- **Nothing bigger than a polite headline** → Scale the one thing you're proudest of (the
  product, an image, a number, a word) until it feels too big, then pull back a little.
- **One weight and size of headline on every section** → Type as art direction: vary scale hard,
  choose weight and width on purpose.
- **White page, gray text, one blue button** → The palette from the direction.
- **Images small, boxed and centered** → Full-bleed, bleeding off an edge, overlapping sections.
- **The only motion is fade-ups** (on a page that sells) → A scroll-linked scene: layered hero,
  a pin whose content advances, a sideways rail, a big wipe (`scroll.md`).
- **The signature is a chart or a list** → Something only this product can show: a scene, a
  transformation, a thing to try.

## Color

- **The category's stock palette** → One specific thing from the product's world, or against the
  competition.
- **Gradient page backgrounds, glows, neon, violet by default** → A base from the product's world,
  color with a reason.
- **Categories in a chart or stacked bar as shades of one color** → Different hues at the same
  lightness; shades only for an ordered scale.
- **Every card and icon in a different color, every stat in a colored circle** → Neutral by
  default; color only for meaning and for what changed.
- **Pure black text, `#fff` on black, thin dark borders** → Gray text levels, dark surfaces at
  L .15–.21, light lines or a hairline ring.
- **Warm and cool grays mixed** → One gray family.
- **A destructive action in the brand color** → Red, with a label naming the action.
- **The accent drifts** (a different blue in section 5) → One token, everywhere.
- **Dark mode made by inverting** → Designed dark (`system.md`).

## Type

- **Title Case Headings** → Sentence case.
- **A five-line headline squeezed into a narrow column** → Two or three lines at `clamp()` sizes.
- **Only weights 400 and 700** → 450 body, 500 UI, 600 headings in app UI; weights on purpose on
  selling pages.
- **Proportional digits in tables and stats** → `tabular-nums`.
- **Orphaned last words** → `text-wrap: balance` on headings, `pretty` on paragraphs.
- **A centered heading over left-aligned text in the same block** → One alignment per block;
  left-align anything longer than three lines.
- **A display face with no reason** → The sans, or a face from the product's world you can
  justify in one line.
- **A font named in CSS but never shipped** → The files in the project, or a system stack on
  purpose.

## Imagery

- **Fake product UI made of gray divs, fake charts** → A real screenshot, real components with
  real data, or nothing.
- **A hero that's text plus a blob** → A real visual (`visuals.md`).
- **Stock clichés, one avatar reused, a random landscape behind a B2B headline** → Specific,
  consistent imagery of the product, its context or its people.
- **Images from three different shoots or styles** → One style line for the set, the hero first.
- **Too-perfect generated images:** smooth, symmetric, saturated, glowing → Ask for worn,
  specific reality; regenerate what looks rendered.
- **3D built from primitives where a photo belongs** → A photo, a drawing, or a labeled slot.
- **Glossy 3D shapes with no meaning, robots for "AI"** → An object from the product's world.
- **Hand-drawn icons mixed with a library** → One library, one stroke width.
- **Clichéd icons** (rocket for launch, shield for security, lightbulb for idea) → The most
  literal symbol, or no icon.

## Components

- **Two equal buttons side by side everywhere** → One primary per view; the rest secondary, ghost
  or a link.
- **A pricing tier highlighted by height or glow** → Same size, darker button.
- **A modal for everything** → Popovers, drawers, inline editing.
- **A centered destructive dialog that says "Are you sure?"** → Left-aligned, naming what will
  be lost, with a red button that names the action.
- **Missing tooltips, empty, loading and error states** → Design them all (`app-ui.md`).
- **A component library's default look, untouched** → Map the tokens: radius, colors, shadows, type.
- **A live countdown** ticking days, hours, minutes and seconds → State the date (and the time
  and place when they matter). A ticking clock is urgency nobody believes, and it never stops
  moving.
- **The stat card grid** (icon circle, uppercase label, huge number, green pill, "View details
  →") → A stats row with dividers, a muted label, a 600-weight value, a context line.

## Motion

- **Everything fades up on scroll, infinite loops, bouncy hovers** → Motion only where it
  explains or leads the eye, once, eased out, off under reduced motion.
- **A hover lift on everything** → Feedback on controls only.
- **App screens that fade in, cards that arrive one after another** → App screens appear at
  once; entrances belong to pages that sell.
- **Parallax on text, scroll-jacking, a smooth-scroll library** → Parallax on images only, native
  scrolling.
- **Slow reveals that hide the first screen** → Readable within about 300ms.
- **Cursor followers, tilt on every card, magnetic buttons** → At most one pointer effect per
  screen (`scroll.md`).
- **Nothing responds** → Feedback on every control, one entrance, reveals that act out the content.
- **Animated command menus, context menus and tab switches** → Instant; motion for what people
  do once, not a thousand times a day.
- **A dialog that pops from the center when it was opened from a button** → It grows from its
  trigger and goes back there.

## Fit

- **A label touching the edge of its pill or highlight, a label sitting higher than its icon, a
  chevron jammed in a corner, cut-off descenders, five pill heights, a button that resizes when its label changes** → `app-ui.md`
  "Controls that hold their shape". These are what make careful users say it looks off.

## Code that shows in the UI

- **`z-index: 9999`** → A small scale (dropdown, sticky, drawer, modal, toast).
- **Raw hex in components** → Tokens only.
- **Div soup** → `nav`, `main`, `section`, `button`, `table`, `dl`.
- **Links to `#`, `alert()` errors, `// TODO`, half-built sections** → Real handlers, or finish
  every section you start.

## Redesigning existing UI

1. **Look at it first,** at desktop and phone widths (`look.md`), and list every tell from this
   file and every missing state.
2. **Keep** URLs, nav labels, form field names and order, the logo, legal copy and analytics
   hooks, unless asked.
3. **Fix in this order,** looking again after each step: tokens (color, type), spacing and edges,
   emphasis, cards to layout, states, copy, motion.
4. **Stop when the brief is met.** Improve what's there before inventing new sections.
