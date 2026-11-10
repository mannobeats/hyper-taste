---
name: design-system
description: One small design system per product, in the project's own stack (CSS, Tailwind, SwiftUI, Compose, React Native) - tokens for color, type, space, radius and motion, a set of parts in every state, a spacing grid, and one page that says which token to use when. Use when starting a product's look, when screens drift apart or values are hard-coded, when the user wants a brand or accent color, custom components, or the look of an app they name.
---

# Design system

The outcome: every screen is built from a short list of named tokens and parts, so one change in
one place changes the whole product, and any agent can review a screen against one page. The
system serves the direction from `ui-director` or `mac-design`; it does not replace it.

## 1. Read before you write

- **Existing project:** list every raw value in the code (colors, opacities, radii, paddings,
  widths, durations, curves, custom controls). Most products have 3–5 of each where 1–2 are
  meant. Extend what exists in its own format; never add a second system beside it.
- **New project:** write the tokens before the first screen.
- **The look of an app the user names:** look at its screens (screenshots from the user, a
  browser, or computer use), measure sizes, spacing, type, radii and colors from them, and write
  those numbers down as tokens. Take the craft, never its logo, icons, text or name.

## 2. Tokens in three layers

1. **Palette:** raw values, named by hue and step (`gray-50`, `blue-600`). Only the token file
   reads it.
2. **Meaning:** `text`, `text-2`, `text-3`, `surface`, `surface-2`, `line`, `accent`, `on-accent`,
   `accent-text`, `danger`, each with a light and a dark value (and a stronger one for Increase
   Contrast on native platforms). Every part reads only this layer.
3. **Scales:** type roles (`title`, `body`, `label`, `meta`, named by role, never by size),
   space, radius, control heights, motion intents (`hover`, `press`, `appear`, `dismiss`).

A rebrand changes the palette. A dark mode fix changes the meaning layer. Neither touches a part.

Rules that hold across products:

- **Accent text** uses a deep shade in light mode and a light shade in dark mode. Text on an
  accent fill uses `on-accent`, never a fixed white (white fails on yellow and green).
- **Native apps** follow the person's system accent by default; a brand color shows only where
  it means something (the icon, an empty state, one hero element).
- **Dark** is its own palette with more distance between tones, not an inversion.
- **Never copy a platform's semantic colors' values**; they change per release. Reference them.
- **One family for UI text,** a display face for headings only with a reason, and every custom
  face has a bold weight.

## 3. The grid

- A 4px (or 4pt) scale: 4, 8, 12, 16, 20, 24, 32, and the section spacing. Raw numbers are 0, 1,
  2 or a multiple of 4.
- Related items 8 apart, groups 20–24, sections 32 or more. One page margin.
- Each column has one leading edge. Indent on purpose, by a step of the scale.
- Let layout containers align things (grid, form layouts, baseline alignment, tabular numbers),
  not manual offsets. Offsets are for motion only.
- Nested corners are concentric: inner radius = outer radius minus the padding.
- Long text truncates with its full value in a tooltip. Nothing clips.

## 4. Parts

Build a part only when the platform's own control won't do. Each part:

- **Is a real control:** a styled button, toggle or field from the platform, never a shape with a
  click handler (it loses the keyboard, focus and screen readers).
- **Has every state:** rest, hover, pressed, selected, focused, disabled, in light and dark, and
  each state can be forced so it can be seen.
- **Reads only tokens.** One icon set at one size and stroke, named through the system so the
  whole set can change in one place.

Keep a gallery: one page or screen that shows every part in every state, light and dark. Review a
new part there before it goes into a screen.

## 5. The page that says when

`DESIGN-SYSTEM.md` (under 100 lines): one section per token group and part family, saying which
token to use when. Then one line in the project's `AGENTS.md`: "Design rules: DESIGN-SYSTEM.md.
Use its tokens; never raw colors, radii or durations."

## 6. Migrate

Existing screens move to tokens one screen per commit. Each screen looks the same or better after,
never worse: look at it before and after.

## Done when

- No raw color, radius, spacing or duration outside the token files (search the code for them).
- Every part a screen needs exists with all its states, and the gallery shows them in light and dark.
- `DESIGN-SYSTEM.md` covers every token group and the project's `AGENTS.md` points to it.
