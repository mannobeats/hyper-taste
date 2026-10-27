# Visuals: photographs, scroll scenes and 3D

For pages where the subject is physical: a product you hold, a place, food, people, an event.
Software shows its real interface instead (`craft.md`). Plan every image with the direction:
its job, its ratio, its source and what the phone gets.

## Where images come from, in order

1. **The user's assets:** their photos, brand library, real screenshots.
2. **The real product,** for software: rebuilt in code or screenshotted.
3. **Generated images,** if your harness has any image tool. Check before deciding it doesn't.
4. **A free-licensed photograph** (Unsplash License or similar) downloaded into the project, its
   photographer credited in a comment and the README. The fastest beautiful backdrop when there's
   no image tool.
5. **A 3D object,** when the product's form is simple (round, flat, boxy) and turning it sells it.
6. **Drawings in the subject's own language:** plans and sections for architecture, exploded
   diagrams for hardware, maps for travel, notation for music. Line work in SVG, in the palette.
7. **A labeled slot** carrying its prompt: `<img src="hero.webp" data-prompt="…" alt="…">`, and
   tell the user which images to make.

Never hot-link stock photos.

## Generating images

- **One style line for the whole set,** repeated in every prompt: light (window light from the
  left, low sun, softbox), lens (35mm environmental, 85mm tight, macro, top-down), 2–3 hex values
  from the tokens, materials (oak, linen, brushed steel), treatment (natural grade, slight
  grain, no HDR, no glow).
- **The hero first,** two or three candidates, keep the best, then make the rest from it with the
  tool's reference input so the set looks like one shoot. Mix scales: one wide, one tight
  detail, one portrait. Each image generated alone at the ratio it's used.
- **Photographed, not generated:** ask for specific, slightly imperfect reality (worn edges, a
  crease, dust in the light, a neighbor's wall). Look at every image at full size; regenerate
  warped geometry, melted hands and garbled text. No words inside images.

```
[subject doing something specific], [setting], for [a full-bleed hero | a detail], [light], [lens],
palette [#hex #hex], [treatment], calm empty area in the [left third | lower 40%] for text,
no text, no logos, no watermark, [16:9 | 4:5 | 1:1 | 21:9]
```

**Layers for depth,** made from the hero with the same camera and light: the plate (the scene
without the subject, a little wider than the screen), the subject on a transparent background,
and an optional near layer (a leaf, a curtain edge). For transparency ask for it; otherwise
generate on pure white or black and blend (`multiply` over light, `screen` over dark), or key it
out with ImageMagick if it's already installed (`magick in.png -fuzz 6% -transparent white
out.png`). Check `file out.png` says RGBA and look at the edges over light and dark.

**Files:** saved into the project, never the tool's URL. WebP or JPEG with what's on the
machine (`sips`, `cwebp`, `magick`), about 2400px wide for full-bleed, 2× display size for the
rest, under ~400KB each. PNG only for layers that need alpha.

## On the page

```html
<picture>
  <source media="(max-width: 560px)" srcset="hero-phone.webp">
  <img src="hero.webp" width="2400" height="1500" alt="What the image shows, in one sentence"
       fetchpriority="high" style="object-fit: cover; object-position: 60% 40%">
</picture>
```

- The framework's image component when there is one (`next/image` with `priority`, Astro
  `<Image>`). Width and height always set; the hero `fetchpriority="high"`, the rest lazy.
- Phones get their own crop, not the desktop image shrunk.
- Text over an image sits on its calm area with a scrim from the text's side; measure contrast
  on the real pixels.
- Images are big: full-bleed, bleeding off an edge, overlapping the next section. A small boxed
  image in a column is the timid default.
- Backgrounds change only where the story changes, and come from one language: the hero's light,
  one texture from the product's world, or a whole page on one strong color from it.

## Scroll scenes

A scene is one technique given a whole section, chosen because it shows the product better.
One scene per screen; the buying section stays calm; every scene has a still version under
reduced motion; the first frame is an image, so the first screen loads fast.

- **Layered parallax:** plate, subject and near layer move at different rates (neighbors differ
  10–30%, total travel under about 200px). Words ride at 1×; the headline may sit between plate
  and subject if every word stays readable. Write the opening, middle and exit in one sentence
  each: the scroll reveals a relationship (outside becomes inside, the near detail passes).
- **Pin:** the frame holds about 1.2 screens or more while lines cross inside it, each line
  overlapping the next by about 15% so the stage is never empty.
- **Scrub:** a turntable or camera move tied to scroll, at most two per page. Video needs a
  keyframe on every frame (`ffmpeg -g 1`); ease the playhead toward the target instead of
  writing it directly; a still shows until the video paints.
- **Pan:** vertical scroll moves a rail sideways, for a range or a lineup. Measure that the
  rail overflows at every width; under reduced motion it becomes a native scroll region.
- **Wipe:** a clip-path reveal edge to edge on a big image, for a change of state.
- **Push:** the scroll scales a photograph from 1 to about 1.15 while words change beside it.

Check every in-between frame at opening, middle and exit, on desktop and phone: no dead scroll,
no line that never reaches full opacity, no cut line of a plane, contrast on the composited frame.

```html
<section class="depth">
  <div class="pin">
    <img class="layer" src="plate.webp" data-depth=".08" alt="">
    <h1 class="title">Tomorrow the sun rises in your bedroom.</h1>
    <img class="layer subject" src="lamp.png" data-depth=".22" alt="Lumo, glowing amber on a bedside table">
    <img class="layer" src="near.png" data-depth=".4" alt="">
  </div>
</section>
<style>
  .depth { height: 170vh; }
  .depth .pin { position: sticky; top: 0; height: 100dvh; overflow: hidden; display: grid; }
  .depth .pin > * { grid-area: 1 / 1; }
  .depth .layer { width: 100%; height: 110%; object-fit: cover; will-change: transform; }
  .depth .subject { object-fit: contain; align-self: end; height: 78%; z-index: 1; }
  .depth .layer:last-child { z-index: 1; }
  .depth .title { align-self: center; }
</style>
<script>
  const scene = document.querySelector('.depth'), layers = [...scene.querySelectorAll('[data-depth]')];
  let queued = false;
  const move = () => { queued = false;
    const r = scene.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    for (const l of layers) l.style.transform = `translate3d(0, ${-p * l.dataset.depth * innerHeight}px, 0)`; };
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(move); } }, { passive: true }); move(); }
</script>
```

On phones use shallower depths and one layer fewer. CSS can drive simple scenes where
supported; gate them on motion preference, since a scroll timeline ignores durations:

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .settle { animation: settle linear both; animation-timeline: view(); animation-range: entry 10% cover 45%; }
    @keyframes settle { from { transform: scale(.94) translateY(40px); opacity: .5; } }
  }
}
```

## Real 3D

Worth it when the product's form, finish or inside sells it and the form is simple: a lamp, a
speaker, a bottle, a watch case, a device. Never for places, rooms, people or food.

- **Build:** a turntable with preset views (Front, Side, Top), an exploded view that pulls apart
  on scroll, finishes that switch on the model. From a `.glb` the user gave you, or precise
  simple geometry (a lathe for round objects, extrusions, rounded boxes).
- **Make it expensive:** physical materials (roughness, clearcoat), an environment map, a soft
  contact shadow, filmic tone mapping, antialiasing, slow eased moves, the page's own background.
- **Tools:** three.js, `<model-viewer>`, react-three-fiber, TresJS or Threlte.
- **Keep it kind:** a still shows first and stays if WebGL fails; pixel ratio capped at 2; paused
  offscreen; no auto-rotation under reduced motion; words in HTML.
- **Photos and the model agree** (proportions, finish, light), or the 3D lives in its own staged
  scene. The scene fills about 70% of the screen's height, labels at body size beside their parts.
