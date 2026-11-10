# Stacks: the tokens in a project's own format, and auditing one

The roles and the plain CSS version are in `system.md`. Write the same roles into whatever the
project already uses, in its names, and never add a second set beside it.

## Tailwind

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

## shadcn and other kits with their own variable names

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

## Bootstrap, MUI, CSS-in-JS

- **Bootstrap:** set its Sass variables (`$body-bg`, `$body-color`, `$primary`, `$border-color`,
  `$border-radius`, `$font-family-sans-serif`) or its `--bs-*` properties, for light and for
  `[data-bs-theme="dark"]`.
- **MUI:** `createTheme` with `palette.background.default/paper`, `text.primary/secondary`,
  `primary.main`, `error.main`, `divider`, `shape.borderRadius`, `typography.fontFamily`, and
  `colorSchemes` for dark.
- **CSS-in-JS:** the theme object holds `'var(--ink)'` strings, so one CSS file stays the source.

## Native (SwiftUI, Flutter, Compose, React Native)

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
