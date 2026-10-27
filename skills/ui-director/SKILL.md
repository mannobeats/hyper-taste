---
name: ui-director
description: Art direction for any UI, from the idea to a check in a real browser. Use when building a landing page, product site, dashboard or app screen, redesigning or polishing how one looks ("make it premium", "it looks off"), auditing a UI's design, matching a reference site, or setting up design tokens. Skip for UI logic, data or bugs that don't change the look.
---

# UI Director

You direct an interface, build it, and look at it before you call it done. The bar is what a
design studio ships: one idea taken from the product's own world, carried far, finished with
exact craft. Be bold in the idea and precise in the execution.

## Pick the job

| Job | What to do | Read now |
|---|---|---|
| A page that sells: landing, launch, product, pricing, portfolio, event | The loop below | `references/landing.md` |
| App UI: dashboard, table, settings, detail, phone app, onboarding, paywall | The loop below | `references/app-ui.md` |
| Redesign, polish, "it looks off" | Keep URLs, labels, field order and logo. Fix the biggest visible problems in one pass | `references/tells.md` |
| Audit (review only) | Look at it, report at most 5 findings worst first, each with its evidence and smallest fix. Change nothing unless asked | `references/look.md`, `references/tells.md` |
| Set up or clean up a design system | Tokens in the project's own format | `references/system.md` |

**The user's direction wins.** A named style, a reference, their brand or an existing design
system beats every default here. Extend what exists. Only "Never" below holds regardless.

Use the tools your harness gives you: a browser to look (`references/look.md`), image
generation for photographs, the project's own component and animation libraries. Install
nothing the user didn't ask for, run one browser at a time, and stop every server you start.

## The loop

Each step ends on something you can check.

1. **Direction.** Fill the direction block from your job's file and write it into `DESIGN.md`
   at the project root (add a section if one exists). Done when every field is filled and no
   line could describe another product.
2. **Tokens.** `references/system.md`. Done when components use only tokens for color, size,
   radius, shadow and duration, and the font files are in the project.
3. **Build all of it.** Every section and state the brief implies, with real copy
   (`references/words.md`) and one coherent sample world. Done when nothing is missing or
   placeholder.
4. **Make it the one.** Pages that sell: the signature and the finish from
   `references/craft.md`, starting with its backdrop (`references/visuals.md` for photography
   and 3D). App UI: the key
   object and the moments. Motion from `references/motion.md`. Done when you can point at the
   moment people would screenshot, on the first screen or the first scroll.
5. **Look.** `references/look.md`: 1440 and 390 wide, light and dark, the whole scroll, every
   control, the page check. Done when the page check is clean or each finding has a reason, the
   screen matches `DESIGN.md`, and you have fixed and looked again at least twice.
6. **Finish.** Stop servers, delete temporary files, and tell the user what you made, what you
   invented (numbers, names, quotes) and what to check.

## Craft numbers

These are the defaults. A blueprint or the user's system replaces them.

- **Type:** one family for UI and body; a display face only with a reason from the product's
  world. Its files go in the project (`fonts/` has Geist and Geist Mono as a fallback). Pages
  that sell: body 16–18px, display up to about 80px at line height .95–1.05, tracking −.035 to
  −.05em at 40px and up, −.01 to −.02em below. App UI: 12 / 13 / 14 / 16 / 20 / 24px, weights
  450 body, 500 UI, 600 headings. At most 10 sizes on a page. `tabular-nums` on numbers,
  `text-wrap: balance` on headings, sentence case everywhere.
- **Color:** neutrals do the structure (3 surfaces, 2 lines, 4 text levels). One brand color
  (or none: graphite, with light only on what glows), rationed to what acts, is selected or
  should glow. Red, amber and green carry state; red
  means failed, overdue or destructive, whatever the brand. Text is never pure black. Contrast 4.5:1 for reading text, 3:1 for large
  text and control edges, measured on the real background.
- **Space:** a 4px grid. 8px inside a group, 12–16px between related items, 24–32px between
  groups. Sections on pages that sell `clamp(96px, 12vw, 200px)` apart, in apps 48–64px (32–40px
  when a full-width hairline divides them).
  Content up to 1200px, gutter `clamp(20px, 4vw, 40px)`, reading text under 65ch, lists and
  forms 360–600px.
- **Shape:** one radius family, nested (inner radius = outer radius − padding). Edges are
  0.5–1px hairlines. Shadows are tinted to the ground and only lift raised or lit objects, three
  levels at most.
- **Controls:** 3–4 heights for the whole product: about 32px in app UI, 40–44px for fields and
  main buttons, 44–52px buttons on pages that sell, 44px touch targets. Labels at least 10px
  from their edge, centered on their height.

## Layout

- **Edges:** reading text, lists and forms align left; numbers, times and actions align
  right. Every block lines up with a line another block uses.
- **Group, then differentiate:** people get faces, categories get chips, numbers get tabular
  figures, the same thing gets the same mark everywhere.
- **Show, don't tell:** a bar, a face or the real interface instead of a sentence. Unclear UI
  gets redesigned, never rescued with a paragraph or an ⓘ.
- **Emphasis is a difference:** quiet the neighbors. Color only what changed, is selected, needs
  attention, or is the one primary action.
- **One surface,** split by lines and headings. Cards hold real objects (a message, a product
  state, a tile) and floating layers, never another card.

## Never

These read as generated in every style. Each has a better move.

- A dot inside a pill or badge. Status is a word, colored only when it needs action.
- An icon on a tinted circle or square heading a card, stat, dialog or empty state. The words
  carry it.
- Emoji in interface text, and greetings ("Welcome back, Sarah").
- Default AI color: violet-to-pink or blue glow gradients, blurred blobs, neon. Color comes from
  the product's world; a gradient on type is that world's light, on one headline at most.
- One word of a headline in another color, style or weight. A whole second clause in a quieter
  ink is a different move (`references/craft.md`).
- Uppercase tracked labels, numbered section labels ("01 /"), a small label over every section.
  One short label above the main headline at most, carrying a fact.
- Invented proof: testimonials, logo walls, ratings and user counts nobody gave you. Use real
  ones or a labeled slot.
- Placeholders: lorem, "Acme", "John Doe", round numbers, "View all →" on every panel.
- Fake UI: gray bars and fake charts standing in for the product. Rebuild the real interface or
  use a real screenshot.
- Photographs faked with 3D primitives or CSS shapes, and flat vector scenes standing in for the
  subject.
- Text symbols as icons (✦ ✳ ◐), two icon sets on one page, arrows on buttons.
- A live countdown. State the date.

The page check in `references/look.md` also flags the display faces models reach for by habit;
keep one only when the product's world gives the reason.

## The obvious version

What any model builds when nothing was chosen. Each piece is fine alone and on purpose; name the
obvious version in your direction, then leave it.

- A first screen on a flat white or black ground, with the headline left and the picture right,
  or a centered headline over a framed screenshot on a soft glow.
- Hero, logo strip, three feature cards, testimonials, pricing, FAQ, dark closing band, in that
  order.
- The category's stock palette: violet for AI, navy for finance, green for climate, cream and
  terracotta for anything warm, black with one orange for premium.
- Image and text swapping sides section after section; every headline in the same two-fragment
  shape ("Less noise. More sleep.").
- A strip of three vanity numbers; a giant clock for anything about time.
- App UI: a greeting, four stat cards with icons and green percentage pills, a gradient area
  chart, a sidebar of colored icons, every section in a card, a badge on every row.
