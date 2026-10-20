# Visuals: images, depth and scenes

Read this for any page that sells. Imagery does more for a page than any amount of CSS, and it's
where generated pages give themselves away fastest: a gradient blob, three stock photos, a
product floating on a glow. Plan every visual with the direction, before you build.

## Give every visual a job

Show the product, set the mood, prove it's real, give context before anyone reads, or break a
long run of text. "It looked empty" is not a job. Plan the whole set at once: which image goes
where, its job, its ratio, and what the phone gets.

| Page | What works |
|---|---|
| Physical product | The product large and sharp, in use, from several sides, close up on its materials |
| Place, architecture, hotel, food, travel | Photography with one consistent grade, full-bleed, asymmetric crops |
| Software | The real interface as the proof, generated images only for mood and context |
| Playful brand | Illustrations, characters or objects placed around the message |
| App UI | Almost none: avatars, logos, file thumbnails, empty-state art |

## Where visuals come from, in order

1. **The user's assets:** their photos, brand library, real screenshots.
2. **The real product,** for software: screenshots of the real screens beat any picture of them.
3. **Generated images,** if you have any image tool. Check before deciding you don't.
4. **A 3D object,** when the product has a simple form (round, flat or boxy) and turning it
   sells it. See "Real 3D".
5. **Drawings in the subject's own language:** plans, sections and sun paths for architecture,
   exploded diagrams for hardware, maps for travel, notation for music. Line work in SVG, in the
   page's palette, is honest and can look superb.
6. **A labeled slot** that carries its prompt: `<img src="hero.jpg" data-prompt="…" alt="…">`,
   and tell the user which images to generate.

Never fake a photograph with code: rooms, buildings, landscapes, food and people built from 3D
primitives or CSS shapes look like a game from 2005. Never hot-link stock photos.

## Generating images

### Lock the style, then shoot the hero first

Write one style line for the whole set and repeat it in every prompt:

- **light:** soft window light from the left, overcast, low golden sun, studio softbox
- **lens and framing:** 35mm environmental, 50mm, 85mm tight, top-down, macro
- **palette:** 2–3 hex values from the page tokens
- **materials and texture:** matte ceramic, limewash, oak, linen, brushed steel
- **treatment:** natural grade with slight film grain, no HDR, no glow

Generate the hero image first, two or three candidates, and pick the best. Then make every other
image from it (with the tool's reference or edit input when it has one) so the set looks like one
shoot: same light and grade, different shots. Mix crop scales on a page: one wide, one tight
detail, one portrait. Never the same framing twice. Generate each image on its own, at the ratio it
will be used; never crop tiles out of one image of several views.

```
[subject doing something specific], [setting], for [a full-bleed hero | a section image beside text |
a tight detail], [light], [lens], palette [#hex #hex], [treatment], calm empty area in the
[left third | lower 40%] for text, no text, no logos, no watermark, [16:9 | 4:5 | 1:1 | 21:9]
```

### Make it look photographed, not generated

- Ask for specific, slightly imperfect reality: worn edges, a crease in the linen, dust in the
  light, an uneven wall. Generated images give themselves away by being too smooth, too
  symmetric, too saturated and too glowing.
- Real places have context: a neighbor's wall, a cable, a chair out of place. Real products
  have seams, screws and texture.
- Look at every image at full size before using it. Warped geometry, melted hands, garbled
  text, impossible shadows: regenerate or crop them out.
- No words inside generated images. Every word lives in HTML.

### Layers for depth

A page gets depth from separate layers that move at different speeds as you scroll. Generate
them from the hero, with the same camera, light and framing:

- **the plate:** the scene without the subject (the room without the lamp, the coast without
  the house), a little wider than the screen
- **the subject:** the product or building alone, **on a transparent background**
- **optional foreground:** something close to the lens (a leaf, a curtain edge, steam), also
  transparent, used sparingly

Getting transparency:

1. Ask the tool for a transparent background when it offers one (many image APIs have a
   `background: transparent` option; the prompt says "isolated on a transparent background, no
   ground shadow"). Check the file really has alpha: `file subject.png` says `RGBA`, or draw it
   over a colored background in the browser.
2. Otherwise generate it on flat pure white or pure black and blend it: `mix-blend-mode:
   multiply` over a light plate, `screen` over a dark one.
3. Otherwise, if ImageMagick is already installed, key it out:
   `magick in.png -fuzz 6% -transparent white subject.png`, then check the edges for a halo.

The same trick makes other effects: 24–36 frames of the product turning for a scroll rotation,
the outside and a cutaway at the same framing for a hover reveal, the eyes on their own layer
for a character that watches the pointer.

### Files

Save every image into the project, never the tool's URL. Convert big PNGs to WebP or JPEG with
what's already on the machine (`sips` on macOS, `cwebp`, `magick`); about 2400px wide for
full-bleed, 2× display size for the rest, and under ~400KB each where you can. Keep PNG only for
layers that need transparency.

## Putting images on the page

```html
<picture>
  <source media="(max-width: 560px)" srcset="hero-phone.webp">
  <img src="hero.webp" width="2400" height="1500" alt="What the image shows, in one sentence"
       fetchpriority="high" style="object-fit: cover; object-position: 60% 40%">
</picture>
```

- In a framework, use its image component (`next/image` with `priority`, `<NuxtImg>`, Astro
  `<Image>`).
- Always set `width` and `height` (or `aspect-ratio`) so nothing jumps while loading.
- The hero gets `fetchpriority="high"`; everything below the first screen `loading="lazy"`.
- Phones get their own crop through `<picture>`, not the desktop image shrunk.
- **Text over an image** sits on a calm area with a scrim: a gradient from the text's side, or a
  tint. Measure the contrast on the real pixels.
- **Let images be big:** full-bleed, bleeding off an edge, overlapping the next section. A small
  boxed image in the middle of a column is the timid default.
- **Frame screenshots once:** one radius, one soft shadow. No fake browser chrome.

## Backgrounds

Every background has a job (stage the product, open a chapter, set the mood), comes from one
language across the site (the hero's palette and light), and changes only where the story
changes. Kinds:

- a full-bleed photo or video, text on its calm side
- a stage for the product: light from one side in the page's own palette, a real shadow under
  it, the product off-center or cropped (a centered product on a round glow is a model habit)
- a colored page: the whole site on one strong color from the product's world
- a dark or colored chapter where the story changes (night, detail, film), reused, not reinvented
- one faint texture from the product's world: paper, fabric, contour lines, a blueprint grid
- a live canvas that reacts to the scroll or pointer, one per page, paused offscreen

## Scenes: the menu

The grammar, the hero's layer contract and the scroll techniques with their rules are in
`scroll.md`; this is the short menu. Name the technique you're using. "Make it dynamic" produces a gradient; a named technique
produces that technique.

- **Layered parallax:** plate, subject and foreground move at different speeds. The headline can
  sit between the plate and the subject, so the product stands in front of the words.
- **Scroll rotation or morph:** the scroll turns the product or changes it (a finish, a flavor),
  from an image sequence, a turntable video or a 3D model.
- **A camera move:** the scroll slowly pushes into a photograph (scale 1 to 1.15) while the
  words change beside it.
- **Kinetic type:** a statement assembles line by line from behind a mask (`scroll.md`).
- **Hover cutaway:** the inside shows through a circle that follows the pointer.
- **Stacking sections:** each section slides over the last one. Good for a sequence.
- **Hands-on:** drag to turn, presets ("Front", "Side", "Top"), a zoom into a detail, a control
  that works like the real one.

Keep them honest: one scene per screen; every effect makes the visitor understand or want
the product more; the buying section stays calm; every scene has a still version under
`prefers-reduced-motion`; the first frame is an image, so the first screen loads fast.

### Recipe: layered parallax with a pinned scene

```html
<section class="depth">
  <div class="pin">
    <img class="layer" src="plate.webp" data-depth=".08" alt="">
    <h1 class="title">Tomorrow the sun rises in your bedroom.</h1>
    <img class="layer subject" src="lamp.png" data-depth=".22" alt="Lumo, glowing amber on a bedside table">
    <img class="layer" src="foreground.png" data-depth=".4" alt="">
  </div>
</section>
<style>
  .depth { height: 170vh; }
  .depth .pin { position: sticky; top: 0; height: 100dvh; overflow: hidden; display: grid; }
  .depth .pin > * { grid-area: 1 / 1; }                       /* every layer in one cell */
  .depth .layer { width: 100%; height: 110%; object-fit: cover; will-change: transform; }
  .depth .subject { object-fit: contain; align-self: end; height: 78%; }
  .depth .title { align-self: center; z-index: 0; }           /* plate below, subject above the words */
  .depth .subject, .depth .layer:last-child { z-index: 1; }
</style>
<script>
  const scene = document.querySelector('.depth'), layers = [...scene.querySelectorAll('[data-depth]')];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const move = () => {
    const r = scene.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    for (const l of layers) l.style.transform = `translate3d(0, ${-p * l.dataset.depth * innerHeight}px, 0)`;
  };
  if (!calm) { addEventListener('scroll', () => requestAnimationFrame(move), { passive: true }); move(); }
</script>
```

The words never move with parallax; only images do. On phones use shallower depths and one
fewer layer. For a scroll rotation, draw frame `Math.round(p * (frames.length - 1))` of a
preloaded image sequence onto a canvas in the same pinned section. Scrubbed video needs a
keyframe on every frame (`ffmpeg -g 1`), or it stutters.

CSS alone can drive simple scenes where supported, with a still elsewhere:

```css
@supports (animation-timeline: view()) {
  .settle { animation: settle linear both; animation-timeline: view(); animation-range: entry 10% cover 45%; }
  @keyframes settle { from { transform: scale(.9) translateY(40px); opacity: .5; } }
}
```

## Real 3D

Worth it when the product's form, materials or inside sell it and the form is simple: a lamp, a
speaker, a watch case, a bottle, a sole, a device. Not for places, rooms, people, food or
anything that should look photographed.

- **What to build:** a turntable the visitor drags with preset views, an exploded view whose
  parts pull apart as you scroll, finishes that switch on the model.
- **Where the model comes from:** one the user gave you, a 3D tool (`.glb`), or simple precise
  geometry in code: a lathe for round objects, extrusions for flat parts, rounded boxes. A clean
  stylized object beats a lumpy copy of a real one.
- **Make it look expensive:** physical materials (roughness, clearcoat), an environment map for
  reflections, a soft contact shadow, filmic tone mapping, antialiasing, slow eased moves. The
  scene's background is the page's, so the object sits in the page, not in a box.
- **Tools:** three.js for a custom scene (saved into the project when the page must work
  offline), `<model-viewer>` for a `.glb`, react-three-fiber, TresJS or Threlte in a framework.
- **Keep it kind:** a still image shows first and stays if WebGL fails; one live scene per
  screen; pixel ratio capped at 2; paused offscreen and in a hidden tab; no auto-rotation under
  reduced motion; words in HTML, never in the canvas.
- **Photos and 3D of the same product must agree,** or be clearly different scenes. Match the
  model to the hero photo (proportions, finish, the knob or the seam people will compare) and
  light it the way the photo is lit. If they can't match, stage the 3D somewhere else on
  purpose (a studio, a drawing, an x-ray) so nobody compares them side by side, and never
  cross-fade a photo straight into a render.
- **The signature fills the stage:** a 3D scene or an exploded view takes most of the screen
  (about 70% of the height on desktop, the full width on phones), with its labels at body size
  and next to their parts, not small captions floating in empty space.
- **Rendered stills** of your model are fine for posters and thumbnails. Real-time render them
  from the same scene; don't write an offline renderer.
