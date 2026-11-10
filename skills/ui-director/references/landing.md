# Landing: pages that sell

For landing, launch, product, pricing and event pages. The voice follows `voice.md`, the product
shot `product-shots.md`, the finish `craft.md`.

## The direction

Write it into `DESIGN.md` before any code, and say it in one short paragraph in your reply.

```
Product and visitor: <what it is, for whom>. They arrive asking: <their question>.
World: <the objects, places, rituals and materials around it>.
Voice: <Precise | Editorial | Technical | Loud | Soft | Still>, because this world is printed on <…>. Type: <family, where its files come from>.
Headline: <the one kept of ten, 3–8 words>. Under it: <one line, 14 words at most>. Action: "<1–3 words>" + <risk line, if true>.
Picture: <the one kept of three: what you will draw or show>. Signature: <the moment people would screenshot, and what moves>.
Composition: <from the table below>. Gold: <the example you start from>. Differs from it in: <four dials from voice.md>.
Palette: <2–4 colors> from <where in the world>. Leads <light | dark>, because <reason>.
Sample world: <one person and one situation every section shows>. Obvious version: <the page any model would build>.
```

## The first screen

Most of what reads as premium is decided here, and most of it is subtraction.

- **Few words, set very large.** A headline of 3–8 words on 2–3 lines, 64–112px on a desktop
  (`clamp()` down to about 48px on a phone), or the whole width when the type is the image.
  Weight, tracking and case come from the voice.
- **One line under it,** 14 words at most, saying how and for whom. No paragraph on the first
  screen, ever.
- **Two actions at most:** one primary button (48px, in the voice's shape, the highest-contrast
  thing on the page) and one quiet one. A risk line beside or under them ("Free for one inbox")
  only when it's true.
- **The nav:** the name on the left, 3–4 links, the one action on the right; on a phone, the
  name and the action. Heights in `svh` or `dvh`, never `vh`.
- **One chip at most** above the headline, carrying a fact or speaking in the product's voice.
  Many pages need none.
- **The picture is the largest thing.** A product window at 80% or more of the content width,
  rising from the fold; an object at about 40% of the screen; a phone at its real proportions;
  or the headline itself at 12–22vw. Small and boxed is the generated look.
- **Space:** the stack centered in the top half with 24–36px between its parts, or words on the
  left edge with one object of equal weight on the right. Everything else on the screen is quiet.
- **Nothing covers the headline or the action** (`covered`), and no word is cut by a crop.

## Headlines

- **Write ten, keep one:** a plain truth, a number, a situation, a promise, a turn. Keep the one
  only this product could say that still makes someone look twice. Never a slogan that could
  sell anything, never a category description ("The all-in-one platform for…").
- **Speak from the visitor's side,** in a voice that sounds like a person: "Analog warmth, minus
  the rack." beats "Professional channel strip plugin".
- **Set as lines.** Break where the meaning breaks, not where the width runs out; each line in
  its own span. A second line may turn the first in the voice's way (a quieter tone, italic, a
  block of color): a whole line, never one word. The turn belongs to the hero, its echo in the
  close, and one section head at most.
- **One metaphor from the product's world, lightly** (weather for mail, hardware for audio): the
  headline, the product's own labels, one section head, the closing line. Four places, not forty.
- **Section heads** are 2–6 words with at most one line under them, and their shapes vary: a
  statement, a number, a question.
- **The close echoes the hero** in the same voice.
- **A tile or card** gets one sentence: a bold lead and a quieter continuation.

## Compositions

| Composition | First screen | Fits | Gold |
|---|---|---|---|
| **Centered over a scene** | A drawn or photographed scene full-bleed; the stack centered in the top half; the product window rising from the fold and filling the screen as you scroll | Software with a screen | `landing-sky` |
| **Centered on one object** | A light ground, the stack centered, one object drawn in CSS under it, leaning toward the pointer | A card, a device, one thing you hold | `landing-card` |
| **Words and an object** | Three lines of type on the left, one sculpted object on the right at about 40% of the screen, the rest dark and empty | Hardware, plugins, anything held or heard | `landing-object` |
| **Words over a staged scene** | A full-bleed scene drawn in layers with one light; large type on its calm side; scrolling changes the scene's time or state | Travel, places, hardware in use, anything with an atmosphere | `landing-night` |
| **Type as the image** | The promise at 12–22vw across the gutter; the line, a fact and the action in a ruled row under it; the picture arrives on the first scroll | Events, launches, a name worth showing | `landing-card` without the card |
| **Editorial** | Large type in a measured column, rules instead of cards, a price list instead of plan cards | A method, a story, a service | `landing-night`'s type, timetable and tiles |
| **The photograph is the product** | The photo full-bleed, the words on its calm side over a scrim, the one useful fact (an address, today's menu) beside the action | Food, places, a local business | `landing-sky` with a `<picture>` where the canvases are and no window (`visuals.md`) |
| **Gallery** | Images lead in one frame family, a headline of a few words above, captions at 13–14px | Work, places, collections | `landing-card`'s tiles as the first screen |
| **Split stage** | A sticky stage holds one half at 100svh while the story scrolls in the other; one column on a phone, the stage first | Before and after, then and now | `landing-sky`'s stage |

## Stage it

What separates the pages people collect from clean ones is staging. Give the page all five:

- **A scene with one light.** A ground, something far, the subject, something near, and one
  light source every layer agrees on: where it glows, what it rims, where the shadows fall.
  Mix every color in the scene from that light (`landing-night` mixes dusk, night and dawn from
  two numbers), so changing the time changes the whole picture.
- **Three layers of depth, and one overlap.** Things pass behind and in front of each other,
  and one object lies across an edge: a ticket over the end of the scene, a window rising past
  the fold, a card over the next section.
- **A real object in its material.** One thing from the product's world, made the way it is
  made: paper with grain, perforation and an ink stamp; brushed metal; glass; wool. Shadows
  under it, a second one behind it.
- **Small instruments.** A clock, a dial, a meter, a stamp, a label: details the size of a
  thumbnail that are true to the scene and reward a second look.
- **A picture per section, each in another form:** a scene, an object, a row of illustrations,
  a texture, a number. A section whose picture is a list or a diagram gets a drawn one beside it.

Then count: fewer than three made things on the page means it is still a document.

## The pictures

You can draw almost anything a page needs in code, and drawn pictures always match the page:

- **A scene:** a sky, a field, a texture, from layered noise on a canvas (`landing-sky`).
- **An object:** metal, glass, plastic, paper in CSS gradients and shadows (`landing-object`,
  `landing-card`).
- **A landscape in layers:** ridgelines from summed sines, a viaduct from one path, stars as
  box-shadows, a train from CSS boxes with windows that are a repeating gradient
  (`landing-night`). Flat silhouettes with atmosphere read as illustration, not clip art.
- **Small illustrations in one palette:** interiors, a still life seen from above, bottles on a
  lit shelf, each from ten or twenty flat shapes and one glow (`landing-night`).
- **The data as the hero:** a route, a waveform, a fleet of cells, drawn from real-looking
  numbers (`phone-app`, `app-dashboard`).
- **The product itself,** rebuilt at its real size (`product-shots.md`).

Photographs come from the user, an image tool, or a free-licensed photo saved into the project
(`visuals.md`). Never a gradient blob, a stock illustration or CSS shapes pretending to be a
photo.

## Order by the visitor's questions

Each section answers the next question, in its own form, with almost no prose:

- software: what it does (the product rising, playing or to try), what else it does (a grid of
  states), one fact that earns trust, what it costs
- a thing people hold or hear: the object, the product in use, the specs one line at a time, the
  price
- a service or a trip: the experience hour by hour, the options as a price list, what it leaves
  out
- a phone app: the moment it helps, two or three screens, what it never does, the download
- an event: when, where, who, how much

Never the same composition three times in a row. **One peak:** the best asset at its biggest,
with a quieter section before it so it lands; two neighbors with the same feeling means one is
filler. Specs, pricing and questions are short, ordinary sections, and the ending holds still.

## Make it convert

- One action, one label, everywhere, nav included.
- Say what clicking costs, in one quiet line by the button.
- Let them try it on the page when the product allows: a key that lights, a knob that turns, a
  night you can drag.
- Proof that is real: named customers, real numbers, product facts ("0 tracking pixels").
- Pricing: one or two plans, the recommended one with the firmer edge or the darker button, not a
  glow or a "Most popular" pill. Or one price as a headline, or a ruled price list.
- Footer: a few links and legal on one line. Meta: title, description, Open Graph image, favicon.

## Done means

- [ ] The first screen has at most a headline, one line, two actions, one chip, and the picture.
- [ ] The headline could only be this product; the metaphor carries to the close.
- [ ] The picture is the largest thing on the first screen and was made for this product.
- [ ] Beside the gold: as sparse, as large, as finished, and clearly not the gold. Four dials
      differ, and none of its world is left.
- [ ] Phone (390): its own composition, no sideways scroll, 44px targets.
- [ ] `scripts/check.mjs` ends `check passed`, and the reviewer's findings are answered.
