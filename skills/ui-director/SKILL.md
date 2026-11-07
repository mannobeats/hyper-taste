---
name: ui-director
description: Art direction for any UI, from the idea to a check in a real browser. Use when building a landing page, product site, dashboard, app screen or phone app, redesigning or polishing how one looks ("make it premium", "it looks off"), auditing a UI's design, matching a reference site, or setting up design tokens. Skip for UI logic, data or bugs that don't change the look.
---

# UI Director

You direct an interface, build it, and look at it before you call it done. The bar is what the
best product studios ship: few words set very large, one picture that could only be this
product, generous space, exact craft. Bold in the idea, quiet everywhere else.

## How hard to press

The gold examples in `examples/` are the bar, not a reference. If yours is the wordier, smaller,
flatter or more generic one beside the closest gold, that is the first fix. Then look at your
screenshots the way the most exacting designer you know would, the one who screenshots the single
wrong thing and sends it back with "what is this?": a paragraph where a line belongs, a headline
that could sell anything, a product shot too small to read, a label touching its pill. If you can
picture that screenshot, you have found the next fix.

## Pick the job

| Job | Read now |
|---|---|
| A page that sells: landing, launch, product, pricing, event | `references/landing.md`, `references/product-shots.md` |
| App UI on a screen: dashboard, table, settings, detail, admin | `references/app-ui.md` |
| A phone app: home, list, detail, onboarding, paywall, native screens | `references/mobile.md`, `references/app-ui.md` |
| Redesign, polish, "it looks off": keep URLs, labels, field order and logo; fix the biggest visible problems in one pass | `references/tells.md` |
| Audit only: at most 5 findings worst first, each with its screenshot and smallest fix; change nothing unless asked | `references/look.md`, `references/tells.md` |
| Set up or clean up a design system, in the project's own format | `references/system.md` |

**The user's direction wins.** A named style, a reference, their brand or an existing design
system beats every default here. Extend what exists. Only "Never" below holds regardless.

## Start from gold

Every job starts from the closest finished page, never from a blank file. Serve the skill folder
(`python3 -m http.server` in it) and open the gold at 1440, 820 and 390 wide. Copy its structure and
its craft: the spacing, the type scale, the way the product is shown, the motion. Then replace
its world with the product's: the idea, the words, the picture, the colors, the sample data.
**A copy that only changes the name is not done**; it should read as this product, not the
gold's.

| Gold | What it is | Copy from it |
|---|---|---|
| `landing-sky` | Light page. A centered five-word promise over a sky drawn in code; the app rises out of it and fills the screen as you scroll | The centered stack, the pinned scene, a halftone sky from noise, glass panels over drawn scenes, one metaphor carried from chip to close, keys that light |
| `landing-object` | Dark page. Three lines of type on the left, one machined object on the right that you can turn | Lines that rise from masks, a CSS-only sculpted object, a faceplate as the product shot, specs one line at a time, a price that is the headline |
| `landing-card` | Light page, everything centered. A graphite card drawn in CSS that leans toward the pointer | One spacing token between sections and one between blocks, a satellite over empty space, a close that echoes the hero |
| `app-dashboard` | Sidebar shell. A deploy platform's overview, light and dark | The answer as the title, only what needs you, every item as a cell in its state, one accent for one action, a rail on tablets, freshness said precisely |
| `app-analytics` | Inset shell: a rounded sidebar and sheet floating on a tinted ground | A sentence for the week, numbers in one strip with their trends, a chart whose labels sit under their points, lists with inline bars |
| `app-finance` | Top-nav shell, one centered column | The balance as the headline, its month drawn under it, accounts, what's coming and what happened |
| `phone-app` | A running app after the run, at 390 | The answer first, the key object drawn (a route colored by pace), the same scale reused, a glass tab bar |

`teaching/` holds small before and after pairs (edges, grouping, emphasis, icons, color, dark,
tables, timelines, destructive actions, phone rows) for diagnosing one problem. Each pair is the
same screen twice with one fault changed, and every right half passes the check. They teach one fix
at a time; never start a page from `teaching/`, start it from gold.

## The first screen

Most of what reads as premium is decided here, and most of it is subtraction.

- **Few words, set very large.** A headline of 3–8 words on 2–3 lines, 64–112px on a desktop
  (`clamp()` down to about 48px on a phone), weight 600–650, tracking −.045 to −.055em, line
  height .92–1. A second line may sit in a quieter tone; a whole line, never one word.
- **One line under it,** 14 words at most, saying how and for whom. No paragraph on the first
  screen, ever.
- **Two actions at most:** one primary capsule (48px) and one quiet one. A risk line beside or
  under them ("Free for one inbox") only when it's true.
- **One chip at most** above the headline, carrying a fact or speaking in the product's voice
  (a mail app's "Today's forecast: 4 from people, 12 to skim").
- **The picture is the largest thing.** A product window at 80% or more of the content width,
  rising from the fold; an object at about 40% of the screen; a phone at its real proportions.
  Small and boxed is the generated look.
- **Space:** the stack centered in the top half with 24–36px between its parts, or words in the
  left half and the object in the right. Everything else on the screen is quiet.

**Headlines are the design, so write ten and keep one.** Say the product's truth in the
visitor's words, in a voice that sounds like a person: "Your inbox, mostly clear." "Analog
warmth, minus the rack." "23 of 24 apps are running." Pick one metaphor from the product's world
(weather for mail, hardware for audio) and carry it through the chip, the product's own labels
and the closing line, lightly. Never a slogan that could sell anything ("Supercharge your
workflow"), never a category description ("The all-in-one platform for…").

## Space and balance

Consistency is most of what reads as care. Every gold follows these, and the check enforces them.

- **Two spacing tokens for a page:** one between sections (`--section`, about
  `clamp(88px, 10vw, 136px)`) and one between blocks inside a section (`--gap`, 48–56px). Use
  them once: a section has top padding only, so two sections never stack their spacing.
- **No band of nothing.** No gap between two pieces of content is bigger than the section
  spacing, at any width or height, including after a scroll scene (`empty band`).
- **Centered means centered.** A centered column centers every block in it, button groups and
  short paragraphs included (`margin-inline: auto`); a page column sits in the middle of the
  area it has, never hugging the left of a wide screen (`off-center`).
- **Balanced boxes.** Content sits in the middle of its card or fills it on purpose; the space
  above equals the space below (`unbalanced`); no card ends in an empty pane (`empty pane`) or
  touches its section's edge (`touches the edge`); words never spill out of their panel.
- **Every width is designed:** desktop, tablet (a sidebar folds to a rail of icons at about
  760–1180px) and phone (one column, the same spacing scale). The check looks at 1440, 820
  and 390.
- **The nav stays.** It pins to the top and adapts: clear over a dark or photographic hero, a
  frosted bar with ink text once something light is under it. Never a nav that scrolls away.

## Make the pictures yourself

You can draw almost anything a page needs in code, and drawn pictures always match the page:

- **A scene:** a sky, a field, a texture, from layered noise on a canvas: soft volume under a
  halftone of dots (`landing-sky`, `references/craft.md`). Layers that move at different rates as you scroll.
- **An object:** metal, glass, plastic, paper in CSS gradients and shadows: a brushed cap is a
  `conic-gradient` of light and dark steps over a fine `repeating-radial-gradient`
  (`landing-object`).
- **The data as the hero:** a route, a waveform, a fleet of cells, a meter, drawn in SVG from
  real-looking numbers (`phone-app`, `app-dashboard`).
- **The product itself,** rebuilt at its real size (`references/product-shots.md`).

Photographs come from the user, an image tool, or a free-licensed photo saved into the project
(`references/visuals.md`). Never a gradient blob, a stock illustration or CSS shapes pretending
to be a photo.

## The loop

Each step ends on something you can check.

1. **Direction.** Fill the direction block from your job's file and write it into `DESIGN.md`
   at the project root. It names the gold, the headline you kept and the picture you will make.
   Done when no line could describe another product.
2. **Gold and tokens.** Copy the gold's structure; write the tokens in the project's format
   (`references/system.md`), with the font files in the project.
3. **Build all of it.** Every section and state the brief implies, with real copy
   (`references/words.md`) and one sample world.
4. **Make it the one.** The picture and the signature motion (`references/product-shots.md`,
   `references/motion.md`). Done when you can point at the moment people would screenshot.
5. **Look.** Run `node <skill>/scripts/check.mjs <url>` and open every screenshot it writes. Put
   your first screen beside the gold's and name the one difference. For a page that sells or a
   new app screen, ask a fresh-eye reviewer (`references/review.md`). Done when the check ends
   `check passed`, the review is answered, and you have fixed and looked again at least twice.
6. **Finish.** Write the "Check" section of `DESIGN.md`, stop servers, delete shots, and tell
   the user what you made, what you invented and what to check.

## Faults that come back

- **Too many words:** a paragraph under the headline, a sentence on every tile, a label over
  every section. Cut until it hurts, then cut one more line.
- **A headline that could sell anything,** or one in the category's voice.
- **The picture too small,** boxed in a card, or a gray placeholder where the product belongs.
- **Off-balance placement:** a headline pushed to one side with nothing holding the other, a
  button floating away from its line, a window cut at a random edge. Center the stack, or pair
  the words with one object of equal weight.
- **The phone is the desktop shrunk:** every page has its own phone composition (`tiny text`).
- **Words covered or cut:** a window over the headline, a status sliced by a crop
  (`covered`, `cut by the crop`).
- **Contrast on quiet text and links;** the second tone of a headline at 3:1 or better.
- **Stock AI:** sparkles, violet gradients, a letter in a colored square, emoji as icons.

## Craft numbers

The defaults. A blueprint or the user's system replaces them.

- **Type:** one family (Geist and Geist Mono ship in `fonts/`), a display face only with a reason.
  Pages that sell: display as above; section heads 36–64px at −.04em; body 16–18px; ledes
  17–20px at line height 1.45. App UI: 12 / 13 / 14 / 16 / 20 / 24–26px, weights 450 body, 500
  UI, 600 headings. Phone apps: 15–17px body, 34px large titles. At most 10 sizes on a page.
  `tabular-nums` on numbers, `text-wrap: balance` on headings, sentence case everywhere.
- **Color:** neutrals do the structure (3 surfaces, 2 lines, 4 text levels). One accent, rationed
  to what acts, is selected or is lit. Red means failed or destructive, whatever the brand.
  Contrast 4.5:1 for reading text, 3:1 for large text, measured on the real background.
- **Space:** a 4px grid. 8px inside a group, 12–16px between related items, 24–32px between
  groups, words at least 12px from any edge. Sections on pages that sell
  `clamp(96px, 12vw, 176px)` apart. Content up to 1200–1320px, gutter `clamp(20px, 4vw, 48px)`.
- **Shape:** one radius family, nested (inner = outer − padding): 20–32px for tiles and windows,
  capsules for buttons, 8–12px inside apps. Edges are 0.5–1px hairlines; shadows tinted to the
  ground, long and soft for what floats.
- **Controls:** 3–4 heights: about 32px in app UI, 44px on touch, 48px buttons on pages that
  sell. Labels 10px or more from their edge, `line-height: 1`.

## Layout

- **Edges:** text aligns left in reading order, numbers and actions right; a short headline stack
  may center. Every block lines up with a line another block uses.
- **Group, then differentiate:** people get faces, categories get colors, numbers get tabular
  figures, the same thing gets the same mark everywhere.
- **Show, don't tell:** the product, a bar, a face instead of a sentence.
- **Emphasis is a difference:** quiet the neighbors; color only what changed, is selected or
  needs attention.
- **One surface,** split by lines and space. Cards hold real objects and floating layers, never
  another card.

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

- A white first screen with a gradient blob, a headline with one word in a gradient, a paragraph
  of three lines, three buttons, and a small screenshot in a frame.
- Hero, logo strip, three icon cards, testimonials, pricing, FAQ, dark closing band.
- The category's stock palette: violet for AI, navy for finance, green for climate, cream and
  terracotta for anything warm.
- Every headline in the same two-fragment shape ("Less noise. More sleep.").
- App UI: a greeting, four stat cards with icons and green percentage pills, a gradient area
  chart, every section in a card, a badge on every row.
- Phone apps: a gradient header card, a floating button over the content, five identical tab
  icons, a streak that turns red.
