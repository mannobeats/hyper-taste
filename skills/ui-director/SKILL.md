---
name: ui-director
description: Design and build interfaces nobody can tell were made by AI. Striking pages that sell and convert, calm and precise app screens, and a token system that fits any stack. Use it whenever you design, build, restyle, redesign, audit or set up the design system of any UI (landing pages, launch and product pages, portfolios, pricing, dashboards, admin panels, tables, settings, onboarding, mobile and responsive layouts) in any framework (plain HTML and CSS, Tailwind, shadcn, React, Next.js, Vue, Svelte, Astro, Bootstrap, MUI, SwiftUI, Flutter), even when the user only says "make it look good", "premium", "polish this" or asks for a page without mentioning design.
---

# UI Director

Your job is to make interfaces nobody would guess were generated. Generated UI fails in two ways:

- **Slop:** explanation, color, boxes, badges and motion that nobody chose.
- **The safe page:** clean, correct and forgotten in a minute. Today's models share a house
  style, and people now recognize it on sight (see "Model habits").

The fix is the same every time: one idea taken from the product, carried further than feels
safe, everything else cut, built on a consistent system, and checked with your own eyes.

## Pick the job, then open its files

The files below hold the details this page only summarizes. Open the ones for your job before
you write any code.

| Job | Open first |
|---|---|
| A page that sells: landing, launch, product, portfolio, pricing | `references/direction.md`, `references/visuals.md`, `references/words.md` |
| App UI: dashboard, admin, table, settings, detail page, phone app | `references/app-ui.md`, `references/words.md` |
| An app's first run, waits, paywall, success and failure moments | `references/moments.md` |
| A new project, or one with no tokens yet | `references/system.md` |
| An existing project to audit, clean up or put on tokens | `references/system.md`, `references/tells.md` |
| A redesign, a polish or a review | `references/tells.md` |
| Anything that moves | `references/motion.md` |
| Every job, before you say it's done | `references/look.md` |

- **Build** (new page or screen): the procedure below.
- **Redesign:** look at it first, keep what works (URLs, labels, field order, logo), then follow
  the redesign order in `references/tells.md`.
- **Polish:** keep the visual language, fix the biggest visible problems in one pass, leave
  working areas alone.
- **Audit** (review only): look at it (`references/look.md`), report at most 5 findings, worst
  first, each with its evidence and the smallest fix. Change nothing unless asked.
- **Set up or clean up a design system:** `references/system.md`.

**The user's direction wins.** A named style, a reference, a URL or their brand beats every
default here, and an existing design system gets extended, not replaced. Only the hard bans
stay unless the user asks for one by name.

## Your tools

Every harness gives you different tools. Before you start, find out what yours has, and use it:

- **A browser you can drive:** a browser pane, a browser MCP server, a preview tool, devtools.
  It's how you see what you built (`references/look.md`).
- **Image generation:** a built-in image tool, an MCP server, an API the user set up. On a page
  that sells, this is the biggest lever you have: the product, the place, the people, and the
  separate layers that give a page depth (`references/visuals.md`).
- **Video and 3D generation,** design sources (Figma, a design-system tool) and the project's
  own stack: its component library, animation library and image component. Build with them.

Keep the user's machine usable:

- **Use the tools you were given.** Don't install browsers, Playwright or Puppeteer, and don't
  write your own screenshot scripts, unless the user asks. With no browser tool, follow the
  fallback in `references/look.md`.
- **One browser at a time.** Close what you open. Stop every server you started.
- **No long jobs.** Nothing that runs more than a few minutes (offline renders, path tracers,
  image batches in a loop), and nothing still running when you finish.

## Build: the procedure

Do the steps in order. Each one produces something you can point at.

### 1. Write the direction, before any code

Write it into `DESIGN.md` at the project root, under "Direction", before you create any other
file, and say it in your reply too. Pages that sell use the first block, app UI the second. A
step done in your head gets skipped, and then every product gets the same first idea. Fill every
field; a field that could describe another product isn't filled. The finished page is checked
against this file.

```
Product and visitor: <what it is, for whom>. They arrive asking: <their question>.
Action: <the one thing to do>, button "<1–3 words>", with the line that lowers its risk.
Flavor: <friendly | premium | technical | editorial | bold>.
Obvious version: <the page any model would build first: first screen, section order, palette, type>.
Three directions, each starting from one thing in the product's world (an object, a place, a ritual):
  A. <the thing>: <first screen> / <section order> / <palette> / <type>
  B. ...
  C. ...
Pick: <letter>, because <one sentence>.
Signature: <the one moment only this product could have, the one people would screenshot>,
  built with <a named technique from references/visuals.md "Scenes": layered parallax, scroll
  rotation, camera move, cutaway, hands-on…>.
Palette: <2–4 colors> taken from <where in the product's world>. Leads in <light | dark>, because <reason>.
Type: <family>, because <reason>. Headline <size> at 1440 wide.
Images: <each image, its job, and where it comes from: user, real UI, generated, drawn, 3D>.
  With an image tool, include the layers the signature needs (plate, subject on transparent).
First screen: <one sentence that couldn't describe any other product>.
```

```
App: <product>, for <who>, doing <the primary job>, <how often>. They open it asking: <question>.
Key object: <the invoice, the ticket, the pattern…> and its states.
Moments: <the peak>, <how the core flow ends>, <the screen they come back to>.
Needs attention: <what must jump out, and the one color it gets>.
Actions: primary "<label>"; frequent <…>; rare <…>; destructive <…>.
Density: <calm | standard | dense>, because <…>. Shell: <sidebar | top tabs | queue and detail | canvas>, because <…>.
Obvious version: <the dashboard any model builds for this: greeting, stat cards, chart, table…>.
Three directions, each from one thing in the user's world (a ledger, a board, a score, a map):
  A. <the thing>: <what the first screen shows and how> / <palette> / <type>
  B. ...
  C. ...
Pick: <letter>, because <one sentence>.
Signature: <the one view only this product has, usually its key object drawn as data>.
Palette: <neutrals and tint, the brand color from the user's world, what red means>. Type: <family, scale>.
First screen: <what the user learns in one glance, in one sentence>.
```

Then **turn it up:** push the pick further than feels safe (bigger scale, stronger color, more
image, a bolder signature), and pull back only what hurts reading or speed. Take one or two
references, not ten: piling on references makes the result less consistent, not better.

The obvious version includes "Model habits" below: if your pick uses two of them, pick again.
**The signature lives on the first screen,** or is the first thing you scroll into. A bold idea
further down behind a safe first screen still reads as the obvious version.
Use the brief's facts exactly (prices, numbers, names); anything you add is marked as invented.
Ask the user a question only if two readings would lead to very different products.

### 2. Set up the tokens

Follow `references/system.md`. Write the tokens in the project's own format (CSS variables, a
Tailwind theme, shadcn's variables, a theme object, native color sets) and choose the knobs
(brand hue, gray tint, font, radius) from the direction. From then on every color, size,
radius, shadow and duration is a token. Put the font files in the project: a font that isn't
there silently becomes Arial. `fonts/` in this skill has Geist and Geist Mono.

### 3. Build the whole page first

- **Every section the brief asks for,** with real copy, real names, varied numbers and every
  state. No lorem, no "Acme", no half-built sections.
- **Words:** write five headlines for the first screen and keep the one that is true only of
  this product. Claims, not slogans (`references/words.md`).
- **Images,** in this order: the user's assets, the real product UI, generated images, a 3D
  object built from simple shapes, drawings in the subject's own language (plans and sections
  for architecture, diagrams for engineering), a labeled slot that carries its prompt. Never
  fake photography with 3D code: rooms, buildings, food, people and landscapes built from
  primitives look like a video game (`references/visuals.md`).
- **Motion as you go:** feedback on every control, one entrance, reveals that act out the
  content (`references/motion.md`).

A complete page comes before an ambitious one. Only move on when nothing is missing.

### 4. Make it unforgettable

Now spend your time on the signature and on depth (`references/visuals.md`): a scene built from
generated layers that move at different speeds, a product that turns as you scroll, a cutaway,
something to try with your hands, type big enough to be the image. With an image tool on a page
that sells, build at least one scene from generated images (layered parallax or a camera move)
unless the direction says why not. Make the signature big: it fills most of the screen, and a
3D product matches its photos or lives in its own scene. One moving thing per screen, every
effect sells the product,
and the buying section stays calm. In app UI, the signature is the key object drawn so the
answer is visible at a glance; spend the time there and on the states, not on motion.

### 5. Look, fix, look again

Open it in your browser (`references/look.md`): desktop (1440) and phone (390), light and dark,
the whole scroll, every control once, the page check. The first render always has problems:
two passes minimum. Stop when you'd be proud to show it, not when it merely works.

### 6. Finish

Delete your own tools and temporary files, stop your servers, and tell the user what you made,
what you invented (numbers, quotes, details) and what they should check.

## Hard bans

Never produce these unless the user asks for one by name. They're what makes UI read as generated.

- **A dot inside a pill, badge or chip,** including "● New" and "● Live" pills above headlines.
  Dots only as timeline markers and chart legend keys.
- **The fonts models reach for by habit:** Fraunces, Instrument Serif, Playfair Display,
  Newsreader, DM Serif, Cormorant, EB Garamond, Libre Baskerville, Lora, Crimson, Young Serif,
  and Georgia or Palatino as headline faces; Space Grotesk, Syne, Bricolage Grotesque, Clash
  Display, Cabinet Grotesk. Any other face is fine when it comes from the product's world and
  you can say why in one line.
- **One word of a headline styled differently** (italic, serif, color, gray, weight, gradient),
  and a colored period or symbol after the logo.
- **Small labels above headlines:** at most one on the whole page, in any case. Never uppercase
  tracked labels, numbered sections ("01 /"), chains of dots, emoji or version stamps.
- **Monospace** for anything but code, IDs and numbers in tables.
- **Arrows on buttons and links.** ↗ only marks a link to another site, → at most on two text
  links, and no "Scroll" or "Explore ↓" links.
- **Text symbols as icons** (✳ ✦ ◐ ⌕). One icon library at one stroke width, or no icons.
- **Headline tracking tighter than −0.04em,** or letters that touch.
- **Purple or blue glow gradients,** gradient text, neon, glass cards over blurred blobs.

## Model habits

The house style of today's models. Each one is fine alone and on purpose; two together read as
generated.

- a small line of text above the headline, and above every section
- a heavy grotesk headline squeezed to −0.06em or tighter
- sections as rows of a label on the left and a paragraph on the right, between hairlines
- a closing dark band with a huge two-line headline and one button on the right
- a strip of three big numbers with small labels under them
- headlines in two clipped fragments ("Less noise. More sleep.", "Small grinder. Serious
  company."), the strongest habit of all: once a page at most
- image and text swapping sides section after section, and the same product render twice
- cream and terracotta for anything warm, black with one orange accent for anything premium
- the product centered on a soft radial glow
- a giant clock scrubbed by the scroll for anything about time
- 3D built from primitives where a photograph belongs
- testimonials with invented names and cities, and an FAQ nobody asked for
- the split hero: headline and buttons on the left, the picture on the right
- a flat vector illustration (skyline, sun, waves, little people) standing in for the subject
- in app UI: "Good morning, Mara", four stat cards with icon circles and green % pills, a
  gradient area chart, a sidebar of colored icons, every section in a card, "View all →" on
  every panel, a status badge on every row

## The craft rules

1. **Lock every element to an edge.** Reading text, lists, labels and forms align left; numbers,
   times and actions align right. A selling page's first screen is composition: the direction
   decides where the words sit. Every element touches two edges (a container, a line, a row).
2. **Keep related things close.** 8px inside a group, 12–16px between related items, 24–32px
   between groups, 64px+ between sections. Reading text under ~65ch. Add columns, don't stretch.
3. **Differentiate instead of spacing out.** People get faces, categories get chips, numbers get
   tabular figures, clickable things get the link color. The same thing gets the same mark
   everywhere it appears, so the eye links them.
4. **Show, don't tell.** A bar, an avatar or an icon instead of a sentence. Never rescue an
   unclear element with a paragraph or an ⓘ: redesign it.
5. **Emphasis is a difference.** Quiet the neighbors to make one thing stand out. In app UI,
   color only what changed, is selected, needs attention, or is the one primary action.
6. **Dissolve the cards.** One surface, split by lines and headings. Cards only for real
   objects (a message, a product tile) and floating layers. Never a card in a card.
7. **Let the data decide the form.** Fixed sets become chips, events over time a timeline,
   numbers right-aligned and tabular, color from the data (overdue is red, paid is ordinary).
8. **Show the right things, reveal the rest.** Primary actions visible, frequent ones on hover
   with tooltips, rare ones in a menu, destructive ones never one click away. Design the empty,
   loading, error and focus states too, and what follows each action: undo, failure, offline.

**Flavor sets how strongly they apply.** Technical and premium products sit near monochrome.
Friendly products carry more color, each color meaning something. Pages that sell take their
palette from the product and can be bold as a whole. The test: can you say why each color is there?

## The numbers

- **Type:** one family for body and UI unless the direction calls for a display face. Pages that
  sell: body 17–18px, headlines as large as the idea needs, tracking −0.01 to −0.04em on big
  type, and at most 8 sizes on the page, all tokens. App UI: 12 / 13 / 14 / 16 / 20 / 24px. Weights 450 body, 500 UI, 600 headings.
  `tabular-nums` on numbers, `text-wrap: balance` on headings.
- **Color:** neutrals do the structure (3 surfaces, 2 lines, 4 text levels), one brand color as
  a ramp does action and selection, red, amber and green carry state. Text is never pure black,
  dark mode is designed, not inverted. Contrast 4.5:1 for every text people read, on photos,
  tinted and dark surfaces, and faded rows too; `ink-4` is only for placeholders and disabled.
- **Shape and space:** radius 6 / 8 / 12 / 16 or the direction's own; a 4px grid; controls 32px
  in app UI, touch targets 44px, buttons on selling pages 44–56px.
- **Motion:** controls respond in 140–220ms, entrances take 400–700ms, eased out, once. Only
  `transform` and `opacity`. What people do many times a day is instant. Everything shows
  without JavaScript and under reduced motion.

## Audit before you say done

Answer each one from what you saw in the browser, not from memory.

- [ ] **The direction:** open `DESIGN.md`. Is the pick, the signature and its technique on the
      page, as written? Put the first screen next to the obvious version you wrote: if they
      match, rework the first screen.
- [ ] **Nobody could tell:** does anything on the page match "Model habits" or the hard bans?
      Would another model given this brief build the same first screen? Then rework it.
- [ ] **The signature:** point at the moment people would screenshot. If it exists only in your
      direction, build it.
- [ ] **It sells** (pages that sell): the first screen says what it is and what you get; one
      action with one label, in reach from every screen; proof that feels real.
- [ ] **Images:** each one has a job, they look like one shoot, and none is fake photography.
- [ ] **Squint:** the answer to the visitor's question is the first thing you see; one primary
      per view (in app UI, in the page header, not also in the top bar).
- [ ] **Craft:** edges, grouping, no card in a card, 2–3 radii, every value a token.
- [ ] **Fit:** no text clipped, touching or off-center in its pill, chevrons centered and
      inset, one height scale for controls, nothing resizing between states
      (`references/app-ui.md`).
- [ ] **States:** hover, focus, active, disabled, empty, loading, error, undo, offline.
- [ ] **Moments** (apps): the peak, the end and the screen they return to are designed; the
      first try never dead-ends; waits name their steps (`references/moments.md`).
- [ ] **Phone (390):** no sideways scroll, 44px targets, 16px inputs, its own image crops.
- [ ] **Dark mode:** designed, checked in the browser.
- [ ] **Contrast and keyboard:** 4.5:1 text, every control reachable with visible focus.
- [ ] **Motion:** each effect has a job, and reduced motion shows the final state.
- [ ] **Clean exit:** no tools, servers or jobs left behind; invented content listed.
