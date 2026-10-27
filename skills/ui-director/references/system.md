# The system: tokens for any stack

For a new project, one with no tokens, or one to audit and make consistent. Consistency is most
of what reads as quality, and tokens are how it survives the next hundred changes.

A token names a job, never a look: `--ink-3` is secondary text, `--gray-500` is a color. Components
use roles only, which is what lets a theme, a brand change or dark mode change everything at once.

There is no stylesheet to copy. Write the tokens below in the project's own format and names, so
nothing clashes with its framework and no two products look the same.

## The roles

Every product needs these roles. The values are the starting point for a neutral, untinted
system; the knobs below move them.

| Role | Job | Light (OKLCH L, hex) | Dark (OKLCH L, hex) |
|---|---|---|---|
| `bg` | the page | .985 #fafafa | .17 #0f0f0f |
| `panel` | the app frame: sidebar, tray, well | .97 #f5f5f5 | .15 #0b0b0b |
| `surface` | raised things: cards, popovers, inputs | 1 #ffffff | .21 #181818 |
| `fill` | neutral chip, secondary button | .955 #f0f0f0 | .245 #202020 |
| `hover` | hover fill | .935 #e9e9e9 | .28 #292929 |
| `press` | pressed fill | .905 #dfdfdf | .32 #333333 |
| `line` | every divider and border | .92 #e4e4e4 | .29 #2b2b2b |
| `line-strong` | inputs, focusable edges | .86 #d1d1d1 | .37 #404040 |
| `ink` | headings, key numbers | .21 #181818 | .95 #eeeeee |
| `ink-2` | body text | .33 #353535 | .84 #cacaca |
| `ink-3` | labels, meta, secondary text | .53 #6c6c6c | .66 #929292 |
| `ink-4` | placeholders, axes, disabled text only | .70 #9e9e9e | .50 #636363 |
| `strong` / `on-strong` | the primary neutral button and its text | .22 / .99 | .96 / .17 |
| `ok` / `warn` / `bad` | success, warning, destructive | #0e8c41 #e38f00 #db2c2b | #53be70 #f2af48 #f05653 |

Plus:

- **One brand color as a ramp** (50–950 at fixed lightness steps, one hue). Light mode uses 600
  as the color, 700 for hover, 50–100 as the tint behind selected values. Dark mode uses 400,
  300 for hover, and a deep low-chroma tint. It goes on the primary action, selection, focus
  rings and links. Nothing else in app UI.
- **Soft and ink pairs for states:** a pale tint behind dark same-hue text (`bad-soft` behind
  `bad-ink`) for chips and inline messages.
- **Charts:** 6 colors at the same OKLCH lightness and chroma, hue stepped by 30 from the brand.
  A comparison series is a light tint of the main series' hue.
- **Type, space, shape and controls:** the scales in `SKILL.md` "Craft numbers", as tokens.
  **Radius:** one family from the direction (tight: 6 / 8 / 12; round: 10 / 14 / 20 / 28 and
  capsules), nested. **Shadows:** three levels, a hairline ring plus a soft tinted lift.
  **Motion:** the tokens in `motion.md`.

## The knobs

Choose them from the direction, write them down in one line with the reason, and never ship the
defaults untouched.

- **Brand hue and chroma,** from one specific thing in the product's world, not the category.
- **Gray tint:** none, barely there (chroma .004–.008 toward the brand hue, warmth without
  color), or themed (chroma .02 and lightness .03 lower). One gray family everywhere.
- **Font:** a family you can say why, with its files in the project. Geist from `fonts/` when
  the product has no face of its own.
- **Radius:** one family, tight (6–12px) or round (20–28px cards with capsule buttons); the
  blueprint and the product's objects decide, not the flavor.
- **Lead mode:** light or dark, on purpose. The other one is still designed, not inverted.

Rules the values follow:

- **Text is gray, not black.** Hierarchy through lightness, not only size.
- **Dark mode doubles the distances** between steps, gets lighter as surfaces rise, brightens the
  lines and dims the text. Never `#000` with `#fff` text.
- **Red means failed, overdue or destructive,** whatever the brand. Status is a tinted chip with words, never a
  saturated block.
- **After you tint anything, measure the text again.** `ink-3` on a tinted `bg` often drops under
  4.5:1. Body text needs 4.5:1, large text and UI edges 3:1.

## Writing it in the project's format

### Plain CSS, or any framework without a theme

One file of custom properties. `light-dark()` follows the system setting with no JavaScript, and
`color-scheme` on any element (the `.dark` class Tailwind, shadcn and next-themes toggle) switches
it by hand.

```css
@font-face { font-family: "<family>"; src: url("fonts/<family>.woff2") format("woff2"); font-weight: 100 900; font-display: swap; }

:root {
  color-scheme: light dark;
  --hue: 60; --tint: .006;            /* gray tint toward the brand, from the direction */
  --brand-h: 45; --brand-c: 1;        /* brand hue; chroma 1 = normal, .6 calmer, 1.2 louder */

  --bg:          light-dark(oklch(.985 var(--tint) var(--hue)), oklch(.17 var(--tint) var(--hue)));
  --panel:       light-dark(oklch(.970 var(--tint) var(--hue)), oklch(.15 var(--tint) var(--hue)));
  --surface:     light-dark(oklch(1 0 0),                      oklch(.21 var(--tint) var(--hue)));
  --fill:        light-dark(oklch(.955 var(--tint) var(--hue)), oklch(.245 var(--tint) var(--hue)));
  --hover:       light-dark(oklch(.935 var(--tint) var(--hue)), oklch(.28 var(--tint) var(--hue)));
  --line:        light-dark(oklch(.920 var(--tint) var(--hue)), oklch(.29 var(--tint) var(--hue)));
  --line-strong: light-dark(oklch(.860 var(--tint) var(--hue)), oklch(.37 var(--tint) var(--hue)));
  --ink:         light-dark(oklch(.21 var(--tint) var(--hue)),  oklch(.95 var(--tint) var(--hue)));
  --ink-2:       light-dark(oklch(.33 var(--tint) var(--hue)),  oklch(.84 var(--tint) var(--hue)));
  --ink-3:       light-dark(oklch(.53 var(--tint) var(--hue)),  oklch(.66 var(--tint) var(--hue)));
  --ink-4:       light-dark(oklch(.70 var(--tint) var(--hue)),  oklch(.50 var(--tint) var(--hue)));
  --strong:      light-dark(oklch(.22 var(--tint) var(--hue)),  oklch(.96 0 0));
  --on-strong:   light-dark(oklch(.99 0 0),                     oklch(.17 0 0));

  --brand-50:  oklch(.97 calc(.018 * var(--brand-c)) var(--brand-h));
  --brand-100: oklch(.94 calc(.040 * var(--brand-c)) var(--brand-h));
  --brand-300: oklch(.81 calc(.115 * var(--brand-c)) var(--brand-h));
  --brand-400: oklch(.715 calc(.16 * var(--brand-c)) var(--brand-h));
  --brand-600: oklch(.55 calc(.20 * var(--brand-c)) var(--brand-h));
  --brand-700: oklch(.48 calc(.18 * var(--brand-c)) var(--brand-h));
  --brand-900: oklch(.33 calc(.11 * var(--brand-c)) var(--brand-h));
  --brand:       light-dark(var(--brand-600), var(--brand-400));
  --brand-hover: light-dark(var(--brand-700), var(--brand-300));
  --brand-soft:  light-dark(var(--brand-50), oklch(.30 calc(.07 * var(--brand-c)) var(--brand-h)));

  --ok:  light-dark(oklch(.56 .15 150), oklch(.72 .15 150));
  --warn: light-dark(oklch(.72 .16 70), oklch(.80 .14 75));
  --bad: light-dark(oklch(.58 .21 27), oklch(.66 .19 25));

  --font: "<family>", system-ui, sans-serif;   /* the direction's face, or Geist from fonts/ */
  --text-body: 17px;                  /* 14px in app UI */
  --radius-sm: 6px; --radius: 8px; --radius-lg: 12px;
  --shadow-sm: 0 0 0 1px oklch(0 0 0 / .06), 0 2px 4px oklch(0 0 0 / .04), 0 12px 24px oklch(0 0 0 / .05);
  --ease: cubic-bezier(.16, 1, .3, 1); --t-fast: 140ms; --t-base: 220ms;
}
.dark, [data-theme="dark"] { color-scheme: dark; }
.light, [data-theme="light"] { color-scheme: light; }
body { background: var(--bg); color: var(--ink-2); font: 450 var(--text-body)/1.5 var(--font); }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; } }
/* transitions stay, so color and opacity feedback survive; put big movement inside (prefers-reduced-motion: no-preference) */
```

Add the other roles (soft and ink pairs, charts, more shadows) the same way when the product
needs them. A landing page needs about 3–5 neutrals, not all 13.

### Tailwind

v4: keep the file above and expose the roles in `@theme inline`, then use `bg-surface
text-ink border-line`. Clear the stock palette and radii (`--color-*: initial;
--radius-*: initial;` in `@theme`) so `bg-gray-50` and stray values can't creep back:

```css
@theme inline {
  --color-bg: var(--bg); --color-panel: var(--panel); --color-surface: var(--surface);
  --color-fill: var(--fill); --color-hover: var(--hover); --color-line: var(--line);
  --color-ink: var(--ink); --color-ink-2: var(--ink-2); --color-ink-3: var(--ink-3); --color-ink-4: var(--ink-4);
  --color-brand: var(--brand); --color-ok: var(--ok); --color-warn: var(--warn); --color-bad: var(--bad);
  --font-sans: var(--font); --radius-md: var(--radius);
}
```

v3: the same names in `theme.extend.colors` as `'var(--ink)'` strings.

### shadcn and other kits with their own variable names

Don't add a second set of names next to theirs. Write the values into their variables:

| Their variable | Gets the value of |
|---|---|
| `--background` | `bg` |
| `--card`, `--popover` | `surface` |
| `--foreground`, `--card-foreground`, `--popover-foreground` | `ink` |
| `--primary` / `--primary-foreground` | `strong` / `on-strong`, or `brand` / white |
| `--secondary`, `--muted` | `fill` |
| `--muted-foreground` | `ink-3` |
| `--accent` / `--accent-foreground` | `hover` / `ink` (in shadcn, accent is a hover fill) |
| `--destructive` | `bad` |
| `--border` / `--input` / `--ring` | `line` / `line-strong` / `brand` |
| `--radius` | the radius knob |

### Bootstrap, MUI, CSS-in-JS

- **Bootstrap:** set its Sass variables (`$body-bg`, `$body-color`, `$primary`, `$border-color`,
  `$border-radius`, `$font-family-sans-serif`) or its `--bs-*` properties, for light and for
  `[data-bs-theme="dark"]`.
- **MUI:** `createTheme` with `palette.background.default/paper`, `text.primary/secondary`,
  `primary.main`, `error.main`, `divider`, `shape.borderRadius`, `typography.fontFamily`, and
  `colorSchemes` for dark.
- **CSS-in-JS:** the theme object holds `'var(--ink)'` strings, so one CSS file stays the source.

### Native (SwiftUI, Flutter, Compose, React Native)

Use the hex values in the table as named colors with a light and a dark value (an asset catalog
color set, a `ThemeData` pair, a `ColorScheme` pair, a theme object). For tinted or brand
values, convert OKLCH to hex:

```js
const hex = (L, C = 0, H = 0) => { const h = H * Math.PI / 180, a = C * Math.cos(h), b = C * Math.sin(h);
  const l = (L + .3963377774 * a + .2158037573 * b) ** 3, m = (L - .1055613458 * a - .0638541728 * b) ** 3, s = (L - .0894841775 * a - 1.291485548 * b) ** 3;
  return '#' + [4.0767416621 * l - 3.3077115913 * m + .2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - .3413193965 * s, -.0041960863 * l - .7034186147 * m + 1.707614701 * s]
    .map(x => { x = Math.min(1, Math.max(0, x)); x = x <= .0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - .055; return Math.round(x * 255).toString(16).padStart(2, '0'); }).join(''); };
```

Native apps follow the platform's own type and components; the roles, the numbers and the rules
still apply.

## Components own their look

- **Use the project's component library** when it has one. Restyle it through the tokens, never
  page by page. With none, write a small set of primitives: button, input, select, checkbox,
  chip, avatar, tooltip, menu, dialog, table, tabs, empty state.
- **Variants are named and closed:** size `sm` / `md` / `lg`; variant `strong`, `default`,
  `ghost`, `brand`, `danger`. No free-form color props.
- **Components own the inside** (padding, height, radius, color, font). **Pages own the
  outside** (margin, width, placement). A new look is a new variant in the component file.
- **Every interactive primitive ships its states:** hover, focus-visible, active, selected,
  disabled, loading. Icon-only buttons get a label and a tooltip.
- **Buttons: the more important, the darker.** Ghost, default (surface with a hairline ring),
  soft fill, strong, brand. One primary per view. Destructive is red with a label that names
  what's lost.

## Auditing an existing project

The goal is fewer, named values that every screen shares, and proof that it happened.

1. **Find what exists:** custom properties on `:root`, a Tailwind theme, a theme object, a
   components folder, the fonts in use. Extend it; keep its names.
2. **Take stock** with commands that work in any stack (use `rg` if it's installed):

   ```sh
   S=src   # the source folder
   grep -rhoiE '#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)' $S | sort | uniq -c | sort -rn   # colors
   grep -rhoE 'font-size:\s*[^;"]+' $S | sort | uniq -c | sort -rn                                              # font sizes
   grep -rhoE 'border-radius:\s*[^;"]+' $S | sort | uniq -c | sort -rn                                          # radii
   grep -rhoE 'box-shadow:\s*[^;"]+' $S | sort | uniq -c | sort -rn                                             # shadows
   grep -rhoE '\b(bg|text|border|ring|from|to)-(\[[^]]+\]|(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]+)' $S | sort | uniq -c | sort -rn   # Tailwind colors
   ```

3. **Report the mess as numbers:** "47 colors (11 grays from 3 families), 19 font sizes, 8
   radii, 14 shadows, 23 arbitrary Tailwind values."
4. **Group into roles:** cluster near-identical values, give each cluster a role from the table
   above, and write the tokens in the project's format.
5. **Replace, a screen at a time,** and look at each screen after the change (`look.md`). Keep
   URLs, labels, field order and behavior.
6. **Lock it in:** DESIGN.md (below), and a lint rule if the stack has one (stylelint's
   `color-no-hex` outside the token file, the Tailwind rule against arbitrary values).
7. **Report before and after:** "47 colors → 16 tokens, 19 font sizes → 7."

## DESIGN.md: the contract future agents read

Put it at the project root, and one line in `AGENTS.md` (or `CLAUDE.md`, `.cursorrules`):
"Before any UI change, read DESIGN.md."

```md
# <Product> design system

<Who uses it and what they come to do, in one line.> Flavor: <…>. Built with ui-director.

## Direction
The direction block from landing.md or app-ui.md, kept as written and updated when the design
changes: the obvious version, the blueprint, the directions, the pick, the signature, palette,
type, images, the sample world, first screen.

## Tokens
Source: `<path>`. Components never use raw colors, sizes, fonts or shadows.
Knobs: brand hue <n> (<why>), gray tint <…>, font <family> (<why>), radius <n>px.

## Components
Where: `<folder>`. Variants: <list>. Pages own margin, width and placement; components own the rest.

## Rules
ui-director's "Never" list holds. Approved exceptions: none yet.

## Done means
Looked at in a browser at 1440 and 390 wide, light and dark; the page check is clean or explained.
```

List only the exceptions the user approved.
