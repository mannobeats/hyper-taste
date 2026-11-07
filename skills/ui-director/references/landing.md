# Landing: pages that sell

For landing, launch, product, pricing and event pages. Start from `examples/landing-sky.html`
(light, a product with a screen) or `examples/landing-object.html` (dark, a product people hold,
hear or install). The product shot follows `product-shots.md`, the finish `craft.md`.

## The direction block

Write it into `DESIGN.md` before any code, and say it in one short paragraph in your reply.

```
Product and visitor: <what it is, for whom>. They arrive asking: <their question>.
World: <the objects, places, rituals and materials around it>.
Metaphor: <one thing from that world the page speaks in, lightly: weather, hardware, a ledger>.
Headlines tried: <ten, one per line>. Kept: <one, 3–8 words>.
Under it: <one line, 14 words at most>. Action: "<1–3 words>" + <risk line, if true>.
Composition: <centered over a scene | words and an object | type as the image | the photo is the product>.
Gold: <the example you start from>. Picture: <what you will draw or show, and how>.
Palette: <2–4 colors> from <where in the world>. Leads <light | dark>, because <reason>.
Type: <family>, because <reason>.
Sample world: <one person and one situation every screen shows>.
Obvious version: <the page any model would build>.
```

## Compositions

| Composition | First screen | Fits | Gold |
|---|---|---|---|
| **Centered over a scene** | A drawn or photographed scene full-bleed; the chip, headline, line and actions stacked in the center of the top half; the product window rising from the fold and filling the screen as you scroll | Software with a screen | `landing-sky` |
| **Centered on one object** | A light ground, the stack centered, one object drawn in CSS centered under it and leaning toward the pointer | A card, a device, one thing you hold | `landing-card` |
| **Words and an object** | Three lines of type on the left, one sculpted object on the right at about 40% of the screen, the rest dark and empty | Hardware, plugins, anything held or heard | `landing-object` |
| **Type as the image** | The name or promise set enormous over a color or a photo; the picture arrives on the first scroll | Events, launches, a name worth showing | |
| **The photograph is the product** | The photo full-bleed, the words on its calm side, the one useful fact (an address, today's menu) beside the action | Food, places, a local business | |
| **Editorial** | Large type in a measured column, photographs with one grade, the action as running text | A method, a story, research | |
| **Gallery** | Images lead, captions small, an index or a filter for the rest | Work, places, collections | |
| **Split stage** | The stage fills the first screen, then holds one side while the story scrolls beside it | Two things in dialogue: before and after, then and now | |

Two rules hold in all of them: the picture is the largest thing on the screen, and nothing
covers the headline or the action.

## Headlines

- **Write ten, keep one.** A plain truth, a number, a situation, a promise, a turn. Keep the one
  only this product could say that still makes someone look twice.
- **Speak from the visitor's side:** "Your inbox, mostly clear." beats "Intelligent email
  management". "Analog warmth, minus the rack." beats "Professional channel strip plugin".
- **Two or three lines, set as lines.** Break where the meaning breaks, not where the width
  runs out; put each line in its own span. A quieter second line finishes or turns the first.
- **Carry the metaphor lightly:** the chip, the product's own labels, one section head, the
  closing line. Four places, not forty.
- **Section heads are short too:** 2–6 words, a statement and its quiet turn ("People first.
  Everything else, later.").
- **The close echoes the hero** in the same voice ("Clear skies by nine.").

## Order by the visitor's questions

Each section answers the next question, in its own form, with almost no prose:

- software: what it does (the product rising, playing or to try), what else it does (a grid of
  states, `product-shots.md`), one fact that earns trust, what it costs
- a thing people hold or hear: the object, the product in use (a faceplate, a screen, a photo),
  the specs one line at a time, the price
- a phone app: the moment it helps, two or three screens, what it never does, the download
- an event: when, where, who, how much

A section is a heading of a few words, at most one line under it, and the picture. Never the
same composition three times in a row; one section per screen is enough.

**One peak.** Two neighbors with the same feeling means one is filler. The page has one peak, the
best asset at its biggest, with a quieter section before it so it lands. Specs, pricing and
questions are short, ordinary sections, and the ending resolves and holds still.

## Make it convert

- One action, one label, everywhere, nav included.
- Say what clicking costs, in one quiet line by the button.
- Let them try it on the page when the product allows: a key that lights, a knob that turns, a
  date that moves everything.
- Proof that is real: named customers, real numbers, product facts ("0 tracking pixels"). Never
  invented quotes or logos.
- Pricing: one or two plans; the recommended one gets the firmer edge or the darker button, not a
  glow or a "Most popular" pill. Or one price set as a headline ("$89. Yours.").

## Finishing

- Footer: a few links and legal on one line, or the close's echo.
- Meta: title, description, Open Graph image, favicon. A 404 in the product's voice.

## Done means

- [ ] The first screen has at most a headline, one line, two actions, one chip, and the picture.
- [ ] The headline could only be this product; the metaphor carries to the close.
- [ ] The picture is the largest thing on the first screen and was made for this product.
- [ ] Beside the gold you started from: as sparse, as large, as finished, and clearly not the gold.
- [ ] Phone (390): its own composition, no sideways scroll, 44px targets.
- [ ] `scripts/check.mjs` ends `check passed`, and the reviewer's findings are answered.
