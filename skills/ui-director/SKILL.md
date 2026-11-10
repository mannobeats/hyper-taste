---
name: ui-director
description: Art direction for web and phone interfaces, from the idea to a result checked in a real browser or simulator. Use when building or redesigning a landing page, product site, dashboard, app screen or phone app, when the user says "make it premium" or "it looks off", or when auditing a UI's design. Native macOS windows (SwiftUI, Electron, Tauri) follow mac-design for their chrome; this skill still directs their content.
---

# UI Director

The outcome: an interface a demanding designer would ship. It is clearly this product, every
width and mode works, and nothing about it looks generated. Bold in the idea, exact in the craft.

You have the tools to see your work (a browser, screenshots, a simulator, subagents). Use them.
This skill tells you what good is; how you check it is yours to choose.

## Pick the job

| Job | Also read |
|---|---|
| A page that sells: landing, launch, product, pricing, event | `references/landing.md` |
| App UI: dashboard, table, settings, detail, admin, every app's states | `references/app-ui.md` |
| A phone app: home, list, detail, onboarding, paywall | `references/mobile.md`, `references/app-ui.md` |
| Redesign, polish, audit, "it looks off" | `references/look.md`, then the job's file |
| Tokens and components for a whole product | the `design-system` skill |
| A desktop app's window, sidebar, toolbar, menus | the `mac-design` skill for the chrome; this skill for the content |

**The user's direction wins.** Their brand, a reference they name, or an existing design system
beats every default here. Extend what exists. Only the hard rules below hold regardless.

## 1. Direction before code

Your first idea is every model's first idea. Do the thinking a studio would:

1. **Study the world.** Look at 2–3 real products the audience already admires, in this category
   and outside it. Note what each does that nothing else does. Never copy one.
2. **Write three directions** that differ in kind, not in shade: each from something in the
   product's world (a ledger, a tide chart, a mixing desk, a boarding pass). Drop the most obvious.
3. **Pick one and write it down** in `DESIGN.md` at the project root:

```
Product and person: <what it is, for whom>. They arrive asking: <their question>.
World: <the objects, places, materials around it>.
Voice: <type, shape, color temperature, motion>, because <a reason from the world>.
Signature: <the one moment people would screenshot>.
Obvious version: <what any model would build here, named so you can leave it>.
Sample world: <one person, their situation and real-looking data, used everywhere>.
```

Done when no line could describe another product.

## 2. Build all of it

Tokens first (the `design-system` skill), then every screen, section and state the brief implies:
empty, loading, error, success, long names, a thousand rows, dark. Real words and one sample
world, never placeholders. Then make the signature: the picture or interaction only this product
could have.

## 3. Look, and fix from what you saw

Code that looks right renders wrong: a font that never loaded, a layout shrunk onto a phone, words
cut by a crop, a reveal that never fires. Open it and look, as a visitor would:

- Desktop, tablet and phone widths (about 1440, 820, 390), light and dark, reduced motion.
- Every control once: hover, focus, click, type, the keyboard path. The console stays clean.
- The largest problem first: composition, then hierarchy, then craft, then polish. Look again
  after each round. A first render always has problems.

Then get a fresh eye: a subagent that sees only the screenshots and a one-line brief, with the
review prompt in `references/look.md`. Answer every finding: fix it, or write why it stands.

## 4. Hand over

Tell the user what you made, what you invented (names, numbers, copy), what you looked at, and
what you could not check. Stop the servers you started.

## Hard rules

These hold for every product and every voice.

- **Readable:** text contrast 4.5:1 (3:1 for 24px+ or bold 18.6px+), measured on the real
  background, in light and dark. Text 11px or larger for reading, 10px floor for chart axes.
- **Usable:** touch targets 44px, inputs 16px on phones, every interactive element has hover,
  focus-visible, active and disabled states, and the whole flow works by keyboard.
- **Whole:** no sideways scroll, nothing covered, no words cut by a crop or spilling from a box,
  at any width. Every width gets its own composition; the phone is never the desktop shrunk.
- **Honest:** no invented proof (testimonials, logos, ratings, user counts) unless the user gave
  it. No placeholders: lorem, "Acme", "John Doe", round fake numbers, gray bars as charts.
- **Calm by default:** respects Reduce Motion and Reduce Transparency. Nothing animates on a
  screen people open many times a day except the moment that earns it.

## Defaults

Good starting points. Break any of them when the direction gives a reason from the product's world.

- **Space:** a 4px grid. Two spacing values for a page: one between sections, one between blocks.
  Everything aligns to an edge another block uses. Centered means centered.
- **Type:** two families at most. A display face only with a reason. Tabular numbers, balanced
  headings, sentence case. At most about 9 text sizes under 30px.
- **Color:** neutrals do the structure, one accent goes to what acts or is selected, red means
  failed or destructive. Dark mode is its own palette, not an inversion.
- **Shape:** one radius family, nested corners concentric (inner = outer minus padding). Hairline
  edges, shadows tinted to the ground.
- **Emphasis is a difference:** quiet the neighbors. Color only what changed, is selected or
  needs attention. One primary action per view.
- **Words:** say what it does in the words people use. Buttons name the action in 1–3 words.
  Errors say what happened and what to do, next to the cause.

## Slop

What reads as generated. Each one tells the viewer nobody chose anything.

- Violet-to-pink or blue glow gradients, blurred blobs, neon, a sparkle or wand meaning "AI".
- One word of a headline in a gradient or another color.
- Icons on tinted circles heading cards; a dot inside a status pill; emoji as icons.
- A letter in a colored square as a logo. Use the real mark or the name as a wordmark.
- Hero, logo strip, three icon cards, testimonials, pricing, FAQ, dark closing band.
- The dashboard template: a greeting, four stat cards with green percentage pills, an area chart
  that answers no question, every section in a card.
- Uppercase tracked labels over every section, "01 /" numbering, arrows on every button.
- Buzzwords: elevate, seamless, unleash, empower, supercharge, leverage, effortless.
- The category's stock palette: violet for AI, navy for finance, green for climate.
- The tasteful empty page: fine type and rules on a flat ground, nothing drawn, nothing to save.

## Done when

- The direction in `DESIGN.md` could only describe this product, and the result matches it.
- You looked at every width and mode and every control, and fixed what you saw.
- Nothing from Slop, and every hard rule holds.
- A fresh eye found nothing serious, or each finding is answered.
