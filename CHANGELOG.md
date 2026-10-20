# Changelog

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
