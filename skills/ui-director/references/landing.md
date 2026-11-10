# Landing: pages that sell

For landing, launch, product, pricing and event pages.

## Direction, for a page

Add to the block in `DESIGN.md`:

```
Headline: <the one kept of ten, 3–8 words>. Under it: <one line, 14 words at most>. Action: "<1–3 words>" + <risk line, if true>.
Picture: <the one kept of three: what you will draw or show>. Composition: <from the table below>.
Palette: <2–4 colors> from <where in the world>. Leads <light | dark>, because <reason>.
```

## The voice

Pick one from the product's world: what it is printed, stamped or lit on, how it speaks, and who
it must not be mistaken for. A law firm, a skate shop and a database never share a typeface, a
radius or a button. The user's brand, when there is one, is the voice.

| Voice | Fits | Display type | Shape | Color | Motion |
|---|---|---|---|---|---|
| **Precise** | Software, tools, fintech | Modern grotesk 600–650, tight tracking, line height .92–1 | Capsules, 20–32px tiles, hairlines | Neutrals and one accent | Lines rise from a mask, about 1s |
| **Editorial** | Publishing, research, law, hotels, anything with a story | Serif with optical sizes 400–500, line height 1.02–1.1 | 6–10px buttons or underlined links, 1px rules | Paper, ink, one spot color | Slow fades, nothing bounces |
| **Technical** | Developer tools, infrastructure, hardware, data | Grotesk 500 with a mono for labels and numbers, or the mono as display | 0–6px, a visible hairline grid | Near-black or paper-white, one signal color | Instant or stepped: lines type, counters tick |
| **Loud** | Events, music, sport, streetwear, launches | Heavy or condensed 800–900 at 14–22vw | 0–4px or full circles, 2px rules | Two saturated colors with black and white | Hard cuts, wipes, one big change of scale |
| **Soft** | Consumer apps, health, families, community | Humanist or rounded sans 500–600 | Capsules, 24–40px tiles, tinted shadows | Warm tinted neutrals, two friendly hues | Gentle springs |
| **Still** | Fashion, architecture, interiors, quiet hospitality | Grotesk or serif 300–400, line height 1.05–1.15 | 0–2px, text links instead of buttons | Monochrome and one material | Long fades, one slow push on a photograph |

One voice per product, set once as tokens. A mix of two reads as none. Self-host the face (the
brand's files, the bundler's font package, or a saved variable file); never a runtime font host.

## The first screen

Most of what reads as premium is decided here, and most of it is subtraction.

- **Few words, set large:** a headline of 3–8 words on 2–3 lines, about 64–112px on desktop, or
  the full width when the type is the image. One line under it, 14 words at most. No paragraph.
- **Two actions at most:** one primary, the highest-contrast thing on the page, and one quiet. A
  risk line ("Free for one inbox") only when true.
- **The picture is the largest thing:** the product at 80% of the content width rising from the
  fold, an object at about 40% of the screen, a phone at its real proportions, or the headline
  itself. Small and boxed is the generated look.
- **The nav:** the name, 3–4 links, the action. On a phone, the name and the action. Heights in
  `svh`/`dvh`, never `vh`.

## Headlines

- **Write ten, keep one:** a plain truth, a number, a situation, a promise, a turn. Keep the one
  only this product could say. Never a slogan that could sell anything, never a category line
  ("The all-in-one platform for…").
- **Speak from the visitor's side:** "Analog warmth, minus the rack." beats "Professional channel
  strip plugin".
- **Set as lines:** break where the meaning breaks. A second line may turn the first (quieter tone,
  italic, a block of color): a whole line, never one word.
- **One metaphor from the product's world, lightly:** the headline, the product's labels, one
  section head, the close. Four places, not forty.
- Section heads are 2–6 words and vary in shape. The close echoes the hero.

## Compositions

| Composition | First screen | Fits |
|---|---|---|
| Centered over a scene | A drawn or photographed scene full-bleed; the product rising from the fold | Software with a screen |
| Centered on one object | The stack centered, one object drawn under it that reacts to the pointer | A card, a device, one thing you hold |
| Words and an object | Type on one side, one sculpted object at about 40% on the other | Hardware, plugins, anything held or heard |
| Words over a staged scene | A layered scene with one light; scrolling changes its time or state | Travel, places, things in use |
| Type as the image | The promise at 12–22vw; the picture arrives on the first scroll | Events, launches, a name worth showing |
| Editorial | Large type in a measured column, rules instead of cards, a price list | A method, a story, a service |
| The photograph is the product | A full-bleed photo, words on its calm side, the one useful fact by the action | Food, places, a local business |
| Split stage | A sticky stage holds one half while the story scrolls in the other | Before and after, then and now |

## Stage it

Clean pages pass every check and nobody saves them. The pages people collect are scenes:

- **A scene with one light** every layer agrees on: where it glows, what it rims, where shadows
  fall.
- **Depth and one overlap:** things pass behind and in front of each other, and one object lies
  across an edge (a ticket over the next section, a window rising past the fold).
- **A real object in its material:** paper with grain, brushed metal, glass, wool, with its shadow.
- **Small instruments:** a clock, a dial, a stamp, a label: thumbnail-sized details true to the scene.
- **A picture per section, each in a different form:** a scene, an object, illustrations, a
  texture, a number.

Fewer than three made things on the page means it is still a document. Drawn in code (canvas,
CSS, SVG) or real photographs from the user or a free-licensed source. Never a gradient blob,
stock illustration, or CSS shapes pretending to be a photo.

**The product itself** is rebuilt in code at its real size, playing its job (a list filling, a
waveform cleaning up), never a screenshot in a frame on a glow.

## Order by the visitor's questions

Each section answers the next question in its own form, with almost no prose:

- software: what it does (the product playing), what else (a grid of states), one fact that earns
  trust, what it costs
- a thing people hold or hear: the object, in use, the specs one line at a time, the price
- a service or trip: the experience hour by hour, the options as a price list, what it leaves out
- a phone app: the moment it helps, two or three screens, what it never does, the download
- an event: when, where, who, how much

Never the same composition three times in a row. One peak: the best asset at its biggest, with a
quieter section before it. The ending holds still.

## Make it convert

- One action, one label, everywhere, nav included. Say what clicking costs, in one quiet line.
- Let them try it on the page when the product allows.
- Proof that is real: named customers, real numbers, product facts ("0 tracking pixels").
- Pricing: one or two plans, the recommended one with the firmer edge, not a glow or a "Most
  popular" pill. Or one price as a headline.
- Footer: a few links and legal on one line. Title, description, Open Graph image, favicon.

## Motion

Motion acts out the product (the film, a scene, something to try), never decoration. Things move
from where they live and go back the same way. One entrance per page at most; scroll scenes keep
working with Reduce Motion as a still state.

## Done when

- The first screen has a headline, one line, two actions at most, and the picture as its largest thing.
- The headline could only be this product; the metaphor carries to the close.
- At least three made things, each section's picture in a different form.
- The phone has its own composition.
