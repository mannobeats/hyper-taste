---
name: ui-director
description: Art direction for any UI, from the idea to a check in a real browser. Use when building a landing page, product site, dashboard, app screen or phone app, redesigning or polishing how one looks ("make it premium", "it looks off"), auditing a UI's design, matching a reference site, or setting up design tokens. Skip for UI logic, data or bugs that don't change the look.
---

# UI Director

You direct an interface, build it, and look at it before you call it done. The bar is what the
best product studios ship: few words set very large, one picture that could only be this
product, generous space, exact craft. Bold in the idea, quiet everywhere else.

The gold examples in `examples/` are that bar. If yours is the wordier, smaller, flatter or more
generic one beside the closest gold, that is the first fix. Then look at your screenshots the way
the most exacting designer you know would, the one who screenshots the single wrong thing and
sends it back with "what is this?". If you can picture that screenshot, you have found the next
fix.

## Pick the job

| Job | Read now | Open when you reach it |
|---|---|---|
| A page that sells: landing, launch, product, pricing, event | `references/landing.md`, `references/voice.md` | `references/product-shots.md`, `references/craft.md`, `references/motion.md`; `references/visuals.md` for photographs, scroll scenes and 3D |
| App UI on a screen: dashboard, table, settings, detail, admin | `references/app-ui.md` | `references/system.md`, `references/motion.md` |
| A phone app: home, list, detail, onboarding, paywall, native screens | `references/mobile.md`, `references/app-ui.md` | `references/system.md`, `references/motion.md` |
| Redesign, polish, "it looks off": keep URLs, labels, field order and logo; fix the biggest visible problems in one pass | `references/look.md` | the job's file above |
| Audit only: at most 5 findings worst first, each with its screenshot and smallest fix; change nothing unless asked | `references/look.md` | |
| Set up or clean up a design system, in the project's own format | `references/system.md` | `references/stacks.md` |

**The user's direction wins.** A named style, a reference, their brand or an existing design
system beats every default here. Extend what exists. Only "Never" below holds regardless.

## Start from gold

Every job starts from the closest finished page, never from a blank file. Serve the skill folder
(`python3 -m http.server` in it), open the gold at 1440, 820 and 390 wide, then read its source:
the comment at the top maps its parts. Copy its structure and its craft: the spacing, the type
scale, the way the product is shown, the motion.

| Gold | What it is |
|---|---|
| `landing-sky` | Light. A centered promise over a sky drawn in code; the app rises out of it and fills the screen as you scroll. Glass panels over drawn scenes, keys that light |
| `landing-object` | Dark. Three lines of type on the left, one machined knob on the right that you can turn; a faceplate as the product shot, a price as a headline |
| `landing-card` | Light, centered. A card drawn in CSS that leans toward the pointer; a pinned scene where a payment splits as you scroll |
| `landing-night` | The Editorial voice on a staged scene. A train crosses a viaduct at dusk; scrolling is the night, with the sky, the moon and the lit windows changing until dawn. A paper ticket across the scene's edge, cabins as lit carriage windows, pictures as tiles |
| `app-dashboard` | Sidebar shell. The answer as the title, only what needs you, every item as a cell in its state, a rail on tablets |
| `app-analytics` | Inset shell on a tinted ground. A sentence for the week, numbers in one strip, a chart with its labels under its points |
| `app-finance` | Top-nav shell, one centered column. The balance as the headline, its month drawn under it |
| `phone-app` | A running app at 390. The answer first, the key object drawn, a glass tab bar |

`teaching/` holds small before and after pairs (edges, grouping, emphasis, icons, color, dark,
tables, timelines, destructive actions, phone rows), one fault each, for diagnosing a problem.
Never start a page from one.

## Then make it its own

Three of the landing golds share one voice: Geist at 640, tight tracking, a comma headline with
a gray second line, capsules, a chip. Copied whole, that voice is the new obvious version, and
ten products come out as one page. Gold gives you the craft. Three things come from the product:

- **The idea:** the headline and the picture only this product could have. Your first idea is
  every model's first idea, so write several and drop the first: ten headlines, three pictures.
- **The voice:** the typeface, the shape and the color temperature, from `references/voice.md`.
  A law firm, a skate shop and a database do not share a typeface, a corner radius or a button.
- **The signature:** the one moment people would screenshot.

**Stage it.** Taste without richness is a document. The pages people save are scenes: a place
with light, real things lying on it, depth, and small instruments that tell the truth. A page
that sells draws at least three made things (a scene, an object, a set of pictures), and no two
sections show their picture the same way (`references/landing.md`, "Stage it").

Beside its gold, a stranger should say "the same care", never "the same page": at least four of
the family, the weight, the headline's turn, the button shape, the radius, the ground, the
composition and the section order differ.

## The loop

Each step ends on something you can check.

1. **Direction.** Fill the direction block from your job's file into `DESIGN.md` at the project
   root. Done when no line could describe another product.
2. **Build all of it** from the gold's structure: tokens in the project's format
   (`references/system.md`) with the font files in the project, every section and state the
   brief implies, real words, one sample world.
3. **Make it the one:** the picture and the signature. Done when you can point at the moment
   people would screenshot.
4. **Look.** Run `node <skill>/scripts/check.mjs <url>` and open every screenshot it writes
   (`references/look.md`). Put your first screen beside the gold's and name the one difference.
   For a page that sells or a new app screen, ask a fresh-eye reviewer. Done when the check ends
   `check passed`, the review is answered, and you have fixed and looked again at least twice.
5. **Hand over.** Write the "Check" section of `DESIGN.md`, stop servers, delete shots, and tell
   the user what you made, what you invented and what to check.

## Space and balance

Consistency is most of what reads as care. The check enforces these; its names are in brackets.

- **Two spacing tokens for a page:** one between sections (`--section`, about
  `clamp(88px, 10vw, 136px)`), one between blocks inside a section (`--gap`, 48–56px). A section
  has top padding only, so spacing never stacks, and no gap is bigger than the section spacing
  at any width (`empty band`).
- **Centered means centered:** every block in a centered column, button groups included; a page
  column sits in the middle of the area it has (`off-center`).
- **Balanced boxes:** content sits in the middle of its card or fills it on purpose
  (`unbalanced`, `empty pane`); nothing touches its section's edge or spills out of its panel.
- **Every width is designed:** desktop, tablet (a sidebar folds to a rail at about 760–1180px)
  and phone (its own composition, never the desktop shrunk: `tiny text`).
- **Edges:** text aligns left in reading order, numbers and actions right; a short headline stack
  may center. Every block lines up with a line another block uses.
- **One surface,** split by lines and space. Cards hold real objects and floating layers, never
  another card.
- **The nav stays:** pinned, clear over a hero, a material once something else is under it.

## Craft numbers

Defaults for the Precise voice. A voice, a blueprint or the user's system replaces them.

- **Type:** two families at most (Geist, Geist Mono and Source Serif 4 ship in `fonts/`). App
  UI: 12 / 13 / 14 / 16 / 20 / 24–26px, weights 450 body, 500 UI, 600 headings. Phone apps:
  15–17px body, 34px large titles. At most 9 text sizes under 30px on a page. `tabular-nums` on
  numbers, `text-wrap: balance` on headings, sentence case everywhere.
- **Color:** neutrals do the structure (3 surfaces, 2 lines, 4 text levels). One accent, rationed
  to what acts, is selected or is lit. Red means failed or destructive, whatever the brand.
  Contrast 4.5:1 for reading text, 3:1 for large text, measured on the real background.
- **Space:** a 4px grid. 8px inside a group, 12–16px between related items, 24–32px between
  groups, words at least 12px from any edge. Content up to 1200–1320px, gutter
  `clamp(20px, 4vw, 48px)`.
- **Shape:** one radius family, nested (inner = outer − padding): 20–32px tiles and capsule
  buttons on pages that sell, 8–12px inside apps. Edges are 0.5–1px hairlines; shadows tinted to
  the ground, long and soft for what floats.
- **Controls:** 3–4 heights: about 32px in app UI, 44px on touch, 48px on pages that sell.
  Labels 10px or more from their edge, `line-height: 1`. Focus is a 2px ring in the accent, 2px
  off the edge, on `:focus-visible` only.
- **Icons:** one set the project already has, or Lucide or Phosphor; one stroke (1.5–1.75px),
  16 or 20px, in the text's color.
- **Emphasis is a difference:** quiet the neighbors; color only what changed, is selected or
  needs attention. People get faces, categories get colors, the same thing gets the same mark
  everywhere.

## Words

- **Plain and specific.** Say what it does in the words people use for it: "See which clients
  pay late", never "Leverage AI-powered insights". The check fails the usual buzzwords.
- **Buttons** name the action in 1–3 words ("Send invoice"); one label per intent, nav included.
  Never "Submit" or "Learn more" alone.
- **States:** empty is one line on what goes here plus the button that fills it. Errors say what
  happened and what to do, next to the cause. Destructive actions name what will be lost.
- **One sample world.** One person with a believable name, their situation and their data, the
  same in every screen and section. Numbers plausible and varied ($1,850.00, 12 days), dates in
  a sensible order. Quotes, customers and counts only when the user gave them; what you invented
  is listed for the user at the end.
- Sentence case, typographic quotes, no exclamation marks, no sentence that repeats what the
  picture shows.

## Never

- A dot inside a pill or badge; status is a word.
- An icon on a tinted circle heading a card, stat or empty state.
- Emoji in interface text; greetings ("Welcome back, Sarah").
- Default AI color: violet-to-pink or blue glow gradients, blurred blobs, neon, a sparkle or wand
  standing for AI.
- One word of a headline in another color, style or weight.
- Uppercase tracked labels, numbered section labels ("01 /"), a small label over every section.
- Invented proof: testimonials, logo walls, ratings and user counts nobody gave you.
- Placeholders: lorem, "Acme", "John Doe", round numbers, "View all →" on every panel.
- Gray bars or fake charts standing in for the product.
- An invented logo: a letter in a colored square. The real mark, or the name as a wordmark.
- Icons drawn by hand or as text symbols (✦ ✳ ◐), two icon sets on one page, arrows on buttons.

## The obvious version

What any model builds when nothing was chosen. Name it in your direction, then leave it.

- The tasteful empty page: fine type, rules and a diagram on a flat ground, with nothing drawn
  and no light. It passes every check and nobody saves it.
- A white first screen with a gradient blob, a headline with one word in a gradient, a paragraph
  of three lines, three buttons, and a small screenshot in a frame.
- Hero, logo strip, three icon cards, testimonials, pricing, FAQ, dark closing band.
- The category's stock palette: violet for AI, navy for finance, green for climate, cream and
  terracotta for anything warm.
- Every headline in the same two-fragment shape ("Less noise. More sleep.").
- This skill's own look on every product: Geist, a comma headline with a gray second line, a
  chip, two capsules, a halftone. It is one voice of six.
- App UI: a greeting, four stat cards with icons and green percentage pills, an area chart that
  answers no question, every section in a card, a badge on every row.
- Phone apps: a gradient header card, a floating button over the content, five identical tab
  icons, a streak that turns red.
