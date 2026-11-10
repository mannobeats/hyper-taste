# Voice: the type, shape and color of one product

Gold gives you the craft. The voice is what makes the page this product's and not the gold's.
Pick it before any code, write it into the direction, and let it set the dials below. One voice
per product: its landing page, its app and its emails share it.

**The user's brand is the voice.** Their typeface, colors and corners win; skip the menu and
measure what they have.

## Pick from the product's world

Three questions, answered in the direction. Your first answer is every model's first answer:
write three and drop the first.

- **What is this world printed, stamped or lit on?** A boarding pass, a receipt, a field guide,
  a mixing desk, a jersey, a menu board. Its letters, edges and colors are your material.
- **How does the product speak?** Like a manual, a headline, a friend, a whisper.
- **Who must it not be mistaken for?** The category's leader, and the last page you built.

## The voices

Six that hold together. Each replaces the gold's dials as a set; a mix of two reads as none.

| Voice | Fits | Display type | The turn | Shape | Color | Motion |
|---|---|---|---|---|---|---|
| **Precise** (`landing-sky`, `landing-object`, `landing-card`) | Software, tools, fintech | A modern grotesk at 600–650, −.045 to −.055em, line height .92–1 | A quieter gray line | Capsules, 20–32px tiles, .5px hairlines | Neutrals and one accent | Lines rise from masks or a soft blur, about 1s |
| **Editorial** (`landing-night`) | Publishing, research, law, wine, hotels, anything with a story | A serif with optical sizes at 400–500, −.02 to −.04em, line height 1.02–1.1 (a serif's descenders reach the next line below that: `lines collide`) | The second line in italic | 6–10px buttons or underlined links, 1px rules, 0–12px tiles | Paper, ink, one spot color | Slow fades of 1.2s, no blur, nothing bounces |
| **Technical** | Developer tools, infrastructure, hardware, data, security | A grotesk at 500, −.02 to −.03em, with a mono for every label and number; or the mono itself as display | A dimmer line, or a line in mono | 0–6px, a visible hairline grid, corner marks | Near-black or paper-white, one signal color | Instant or stepped: lines type, counters tick, nothing floats |
| **Loud** | Events, music, sport, streetwear, launches, food with attitude | A heavy or condensed face at 800–900, 14–22vw, line height .82–.9, tracking 0 to −.02em; capitals allowed in display | A block of flat color behind a line | 0–4px or full circles, 2px rules | Two saturated colors with black and white | Hard cuts, wipes, one big change of scale |
| **Soft** | Consumer apps, health, families, community | A humanist or rounded sans at 500–600, −.02 to −.03em, line height 1.05 | A second line in the accent's ink step | Capsules, 24–40px tiles, tinted shadows and no lines | Warm tinted neutrals (chroma .01–.02), two friendly hues | Gentle springs, things settle |
| **Still** | Fashion, architecture, interiors, jewelry, quiet hospitality | A grotesk or serif at 300–400, −.01 to −.02em, line height 1.05–1.15 | A second line indented or set smaller | 0–2px, hairlines, text links instead of buttons | Monochrome and one material (stone, brass, linen) | Fades of 1.4s, one slow push on the photograph |

What never changes with the voice: the word budget, the picture as the largest thing, the two
spacing tokens, balance, contrast, and "Never" in `SKILL.md`.

## The voice as tokens

Write the voice once, at the top of the tokens, and build every component from it. Changing
these values is how the gold's structure comes to speak differently.

```css
:root {
  --display: "Source Serif 4", Georgia, serif;   /* the display face; --font stays the text face */
  --display-weight: 440; --display-track: -.025em; --display-lh: 1.03;
  --btn-radius: 8px; --radius-card: 12px; --edge: 1px;   /* capsule 999px and .5px in Precise; 0 and 2px in Loud */
  --ground: oklch(.972 .012 85); --ink: oklch(.24 .02 60); --accent: oklch(.52 .16 28);
}
h1, h2 { font: var(--display-weight) var(--h-size)/var(--display-lh) var(--display); letter-spacing: var(--display-track); font-optical-sizing: auto; }
h1 .turn { font-style: italic; }   /* the turn: a gray line, italic, a color block, an indent; one way per product */
```

## Getting the typeface

A voice with the wrong face is a costume. In order:

1. **The brand's own files,** from the user or their site.
2. **A project with a bundler:** `npm i @fontsource-variable/<id>` and import it, or the
   framework's font loader (`next/font`, Astro fonts), which self-hosts at build.
3. **A single page with no bundler:** save the variable file into the project, then an
   `@font-face` with `font-weight: 100 900`. Never link a font host at runtime.

   ```sh
   curl -L -o fonts/source-serif-4.woff2 "https://cdn.jsdelivr.net/fontsource/fonts/source-serif-4:vf@latest/latin-wght-normal.woff2"
   ```

   Open-licensed faces that carry these voices and are not worn out: Instrument Sans, Hanken
   Grotesk (Precise); Source Serif 4, Literata (Editorial); JetBrains Mono, Geist Mono
   (Technical); Big Shoulders, Archivo at 800–900 (Loud); Figtree (Soft).
4. **No network:** `fonts/` has Geist and Geist Mono (Precise, Technical and, at 300 set large,
   Still) and Source Serif 4 with its italic (Editorial). Say in the handover which face the
   voice wants.

Two families at most: a display face with a text face, or one face with a mono. The check's
`font` line fails a family that is named but never loaded, and its `habit font` line asks why:
the reason is a sentence about the product's world, never "it looks premium".

## Beside the gold

Eight dials: the family, the weight and tracking, the turn, the button shape, the radius, the
ground and color temperature, the composition, the order of sections. **At least four differ
from the gold you started from.** A stranger shown both pages should say "the same care", never
"the same page". If they would, change the voice first, then the composition.

## In app UI

The voice is quieter inside an app: the family, the radius, the accent and the density carry
it. Sizes, rows and controls keep the numbers in `app-ui.md`; a display face appears only in
the page's answer line and in empty and success states.
