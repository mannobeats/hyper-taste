# Changelog

## Unreleased

- **ui-director, a fourth landing gold, staged.** `landing-night` is a night train in the
  Editorial voice, every picture drawn in code. The first screen is a train crossing a viaduct
  at dusk: a sky mixed from three palettes, stars, a moon, ridgelines in atmospheric
  perspective. Scrolling is the night: the sky turns, the moon crosses, the lit windows go dark
  and a clock says where you are, until dawn. A paper ticket with grain, perforation and an ink
  stamp lies across the scene's edge; the cabins are four lit carriage windows; the bar, the
  blanket and breakfast are drawn tiles; the page ends on Madrid's skyline at sunrise. Source
  Serif 4 and its italic ship in `fonts/` (OFL).
- **ui-director, "Stage it".** The skill asked for subtraction and got tasteful, empty pages.
  `landing.md` now asks for a scene with one light, three layers of depth and one overlap, a
  real object in its material, small instruments, and a picture per section in a different
  form; "the tasteful empty page" is listed under the obvious version.
- **ui-director, lines that collide.** A new Fix line fails a headline whose descenders reach
  the line below (a serif at a line height under 1), and the Editorial voice's numbers say so.
- **ui-director, trimmed.** The prose went from 115 KB to 91 KB, and what a landing job reads
  from about 17,700 tokens to about 12,600 (6,800 before it starts, the rest when it reaches the
  product shot, the motion and the look), with no rule dropped that the check
  or a gold doesn't already carry. One home per rule: the first screen, headlines and pictures
  live in `landing.md` only; `SKILL.md` keeps what every job needs (space, craft numbers, words,
  "Never", the obvious version) and its job table says what to read now and what to open later.
  `words.md`, `review.md` and `tells.md` are folded into `SKILL.md` and `look.md`; "Faults that
  come back" is gone, since each fault was already a rule elsewhere. Recipes that duplicated the
  golds are out of `craft.md`, `product-shots.md` and `motion.md`; `craft.md` now says where each
  move lives in a gold, and every gold opens with a map of its parts. Stack adapters and the
  audit moved to `stacks.md`, read only for that job. Direction blocks are shorter.
- **ui-director, fewer fingerprints.** The chip, button, wordmark and lit-plate recipes every
  page used to paste are gone, "Built with ui-director" is out of the `DESIGN.md` template, and
  the direction asks for three pictures and ten headlines with the first idea dropped.
- **ui-director, a voice per product.** Every gold spoke in one voice (Geist at 640, a comma
  headline with a gray second line, capsules, a chip), and the first-screen rules wrote that
  voice down as law, so pages built from different golds still came out as one page. The new
  `references/voice.md` has six voices (Precise, Editorial, Technical, Loud, Soft, Still), each
  a full set of dials: display type, the headline's turn, shape, color and motion. It says how to
  get a typeface into the project, and asks that four of eight dials differ from the gold. The
  direction block names the voice and the signature, and the skill lists its own default look
  under "The obvious version".
- **ui-director, compositions with no gold** (type as the image, the photograph, editorial,
  gallery, split stage) now say which gold's skeleton to borrow and what replaces its first
  screen. Before, "never start from a blank file" left five of eight compositions unreachable.
- **ui-director, the check sees the scroll.** A full-page screenshot shows a pinned scene as an
  empty band and a fixed bar in the middle of the page. The check now also writes a `-scroll`
  sheet per width: frames taken as a visitor scrolls. The dark passes set `class="dark"` or
  `data-theme="dark"` when the page's CSS switches on one, so Tailwind and shadcn projects are
  no longer checked in light twice. A new Fix line, `the example's world`, catches a gold's
  names and headlines left in a page built from it.
- **ui-director, rules that disagreed.** One section spacing instead of two; the tracking lead
  matches the numbers in the skill; type sizes are counted under 30px (8 at most), since every
  gold broke "10 sizes"; motion no longer bans animating height and asks for it in the same
  file; the area chart ban names the chart that answers no question; four eval rubrics no longer
  fail the split hero that `landing-object` uses.
- **ui-director, the golds.** The big halftone dots lift from behind Cirrus's words (the line
  under the headline was read through them). Section heads no longer all take the two-tone
  turn, and one that colored a single word is one tone.
- **ui-director, craft.** "The last five percent" in `craft.md`: gradients in OKLCH, grain
  against banding, optical edges, `text-box` trimming, subgrid for cards that line up inside,
  selection and caret colors, anchors that clear the nav. A focus ring and an icon set in the
  craft numbers; layers that enter and leave with `@starting-style`.
- **ui-director, lighter teaching pairs.** The pairs share one `teaching/tokens.css`; each page
  went from 23 KB to about 5 KB, and the skill folder from 1.1 MB to 0.7 MB.

## [3.0.0] - 2026-11-07

- **ui-director, teaching pairs at the gold bar.** All fourteen pairs were redrawn on one upgraded
  base: tinted, layered shadows with a lit top edge, a lit studio ground, 11px avatar initials,
  44px touch targets on phones, and real buttons. Each "before" is now the same screen with the
  same tokens and one fault, so a pair teaches one thing. Every "after" passes the check (eight
  failed it before), and the gate in `AGENTS.md` now covers them.
- **ui-director, the Tally landing rebuilt.** Its ground is a guilloche drawn in code, the
  engraved rings of a banknote, radiating from the card and lifted from behind the headline. The
  card, the tax reserve and the chosen plan wear the same engraving, and it returns behind the
  close. The signature is the sort: a pinned scene where a €9,400 payment lands and splits into
  tax, equipment and spending as you scroll, balances rolling, with a phone version at rest. The
  Tally app's tax reserve wears the same plate.
- **ui-director, three rules back.** Editorial, gallery and split-stage compositions; one peak per
  page; and one material, made once and reused down the page.
- **ui-director, a steadier check.** The scroll pass waits for rendered frames, so reveals are not
  missed on a busy machine, and words behind a modal (`inert`) no longer count as covered.

- **ui-director, start from gold.** The skill ships seven finished pages in `examples/`, each at
  the bar it asks for: three landing pages, three dashboards in three shells (sidebar, inset
  sidebar, top nav), and a phone app. Among them: a light landing (a five-word promise centered over a sky drawn in code,
  the app rising out of it in a pinned scroll scene), a dark landing (three lines of type and a
  machined knob you can turn, a faceplate with a live VU meter), a deploy platform's dashboard in
  light and dark, and a running app's phone screen. Every picture is drawn in code. Every job
  starts from the closest gold: copy its structure and craft, replace its world. Fourteen small
  before and after pairs live in `teaching/`.
- **ui-director, the first screen.** A word budget (a headline of 3–8 words on 2–3 lines, one
  line under it, two actions, one chip), the picture as the largest thing, ten headlines written
  and one kept, one metaphor carried lightly from the chip to the close, and "Make the pictures
  yourself" (scenes from noise, objects in CSS, the data as the hero). The obvious version no
  longer bans a centered headline over the product; it bans the generated version of it.
- **ui-director, space and balance.** Two spacing tokens per page (between sections, between
  blocks), centered columns that center every block, balanced cards, a sidebar that folds to a
  rail on tablets, and a nav that stays pinned and adapts to what's under it. The check now looks
  at 1440, 820 and 390 and catches empty bands between sections, off-center columns and button
  groups, unbalanced cards, empty panes, cards touching their section's edge, and words spilling
  out of their panel.
- **ui-director, `scripts/check.mjs`.** Headless Chrome with no dependencies: screenshots at
  1440 and 390, light and dark, reduced motion; Fix lines (never intentional) and Judge lines
  (leads); `check passed` only when no Fix line is left. It catches words covered by another
  box, words cut by a crop, the desktop shrunk onto a phone, reveals that never fire, invented
  logos, AI sparkles and violet gradients, mixed icon styles and clipped glyphs, and measures
  contrast on what is really painted under the words. `scripts/page-check.js` is the same check
  for a browser tool's console.
- **ui-director, new references:** `product-shots.md` (the product at real size, the pinned
  scene, framing, the faceplate, glass over a scene, state grids, phones), `mobile.md`,
  `review.md` (a fresh-eye reviewer). Some framing rules, the review brief and several detectors
  are adapted from [Stageshow](https://github.com/benjitaylor/skills/tree/main/stageshow) by
  Benji Taylor (MIT).
- **ui-director, cut:** the mandatory photo backdrop, the corner-bleed hero, the long recipes in
  `craft.md`, and the old pair pages as examples. The skill folder went from 280 KB to under
  1 MB with no photographs.
- **Pairs:** the live-product, dark and dashboard pages got phone layouts, and three phone
  screens got links and tabs that pass contrast.

## [2.2.0] - 2026-10-27

ui-director 2.2.0. agents-md is unchanged at 1.1.0.

- **ui-director, agents look at their work again.** The skill's first words about tools were
  three prohibitions ("install nothing", "one browser", "stop every server"), `look.md` offered
  "say so" as an easy exit, and nothing said that browser tools are often deferred and only
  appear after a tool search. Agents concluded they had no browser and skipped the look. Now
  `SKILL.md` opens with "You look at everything you build, in a real browser", tells the agent to
  search for its browser, counts running the project's own install and dev commands as part of
  the job, and step 5 isn't done until the screenshots were seen ("Unseen is unfinished").
  `look.md` starts with finding the browser, serves pages over http (a `file://` page breaks
  canvases and modules quietly), and only allows giving up after naming what was tried.
- **ui-director, the backdrop recipe:** the dots map from the photo's real `object-position`, sit
  under the photo so they show only where it fades, taper out at the end, and on a light page
  take an ink from the palette. A photo that is the product gets its live piece (today's shelf,
  the booking form) across the seam, and a short sky can be continued with its own color.
- **ui-director, page check:** text over a sibling photo or canvas is now caught and sent to a
  look on the screenshot instead of being measured against the plain page.
- **Pairs:** all four landing pages stand on photographs that dissolve into the page: the type
  conference under Porto's Chapel of Souls and the bakery's loaf on its floured board join the
  kitchen and the motorway.

## [2.1.0] - 2026-10-27

ui-director 2.1.0. agents-md is unchanged at 1.1.0.

- **ui-director, the backdrop:** a page that sells now stands on a backdrop with depth and light,
  the way the reference sites do: a photograph from the product's world, full-bleed and graded,
  breaking into halftone dots that fade into the page while the product window rises across the
  seam. `craft.md` carries the recipe (scrim, mask, a canvas dissolve that samples the photo),
  `landing.md` checks for it, and a flat first screen joins the obvious version.
- **ui-director, images:** a free-licensed photograph, saved into the project and credited, is a
  source for backdrops when there's no image tool.
- **Pairs:** the Pantry landing stands in a working kitchen and the Seam landing on a motorway at
  night, both dissolving into the page.

## [2.0.0] - 2026-10-27

ui-director 2.0.0 and agents-md 1.1.0.

- **ui-director, rebuilt around what works.** Two landing pages people call premium (one built
  with this skill) broke about ten of its rules, and the first version that followed its scroll
  quotas was thrown away. The skill now teaches the moves behind those pages instead of fighting
  them:
  - A new `references/craft.md`: type set like a studio, the two-tone headline, the chip that
    carries a fact, hairlines and nested corners, the product rebuilt in code as the hero, a film
    of chapters with captions, step bars and Pause, one brand material, lit plates and glass,
    product states instead of feature cards, the nav and the close.
  - The landing direction gains a **Blueprint** (one reference at the bar, what to take, what
    stays ours) and a **sample world**. Software starts from the live product grammar.
  - Gone: the parallax and scroll-technique quotas, "image generation is the biggest lever" for
    software, and bans that the best pages break with craft (−0.05em display tracking, a whole
    quieter clause, one chip with a fact, round radii, longer blurred reveals, a window frame).
  - "Never" keeps only real slop, each with the better move. The obvious version replaces model
    habits.
- **ui-director, half the reading.** `SKILL.md` is a router and the loop, with every number in
  one place. `direction.md` and `scroll.md` became `landing.md`; `moments.md` joined
  `app-ui.md`. Each step ends on a check. About 28% fewer words overall; a landing page now reads
  45% less before the first line of code, an app screen 31% less.
- **ui-director, page check:** detects dots in pills, icons on tinted shapes, emoji, buzzwords,
  habit fonts and gradient type; measures semi-transparent text over its background; skips the
  decorative wordmark; tap targets at 44px and tracking limits that match the rules.
- **ui-director, fixes:** the CSS scroll-scene recipe now respects reduced motion, the parallax
  recipe queues one frame per scroll, and the token file's reduced-motion rule keeps color and
  opacity feedback.
- **ui-director, pairs:** the landing and dashboard examples rebuilt to the new bar, and a
  brief-to-page eval case for a landing built from scratch.
- **agents-md:** a description that triggers before a rule is added, the `@AGENTS.md` import as
  the fallback to a symlink, how to write a line, `.claude/rules/` for Claude Code, and
  `audit.sh` now audits a repo with only a CLAUDE.md and flags `@` imports.

## [1.2.0] - 2026-10-20

ui-director 1.2.0. agents-md is unchanged at 1.0.0.

- **ui-director:** a new `references/scroll.md` for pages that sell: pick a page grammar and keep
  its bans, write the feeling curve with one peak, build the hero from planes that move at
  different rates, vary what the scroll does from section to section, and check every
  in-between frame. Landing directions now name the grammar, the curve, the peak and the hero
  layers.
- **ui-director:** clearer routing. Each job lists the files to read whole, a fix or "it feels
  off" opens `tells.md`, and onboarding opens `moments.md` and `app-ui.md`.
- **ui-director:** contradictions resolved: the split hero, signature and peak, one scene per
  screen, count-up and reveal timings, kinetic type, arrows in the page check, status chips,
  pointer effects, touch targets and truncation on phones.
- **Evals:** four new phone cases (home, failed payment, paywall, onboarding) with before and
  after pairs, an Opus judge, and `viewer.html` with `collect.mjs` to compare each run with and
  without the skill.

## [1.1.0] - 2026-10-20

ui-director 1.1.0. agents-md is unchanged at 1.0.0.

- **ui-director:** a new `references/moments.md` for the parts of an app people remember: the
  peak and the end, first run, waits, paywalls, progress and rewards, rethinking a screen from
  first principles, and native feel. App directions now name their moments, and the audit
  checks them.
- **ui-director:** copy doesn't repeat what's already on screen, one alignment per block, the
  same mark for the same thing, and one or two references instead of ten.

## [1.0.0] - 2026-10-19

First release.

- **ui-director 1.0.0**: design and build interfaces that don't look generated, with a token
  system for any stack and `/ui-director:setup`, `/ui-director:audit` and `/ui-director:match`
  commands for Claude Code.
- **agents-md 1.0.0**: keep AGENTS.md small and CLAUDE.md and GEMINI.md in sync with it.
- Install every skill with `hyper-taste@hyper-taste`, or one at a time with
  `ui-director@hyper-taste` and `agents-md@hyper-taste`.
