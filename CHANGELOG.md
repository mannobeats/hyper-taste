# Changelog

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
