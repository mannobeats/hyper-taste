# UI Director

An agent skill that makes your coding agent work like a UI director: interfaces that look
designed, not generated. Calm and precise in dashboards and app screens, bold and memorable on
landing pages, consistent everywhere.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="gallery/18-dashboard-dark.png">
  <img src="gallery/18-dashboard.png" alt="Before and after: a generated dashboard and the same screen cleaned up" width="100%">
</picture>

**[See all 19 pairs live](https://mannobeats.github.io/hyper-taste/docs/ui-director/)**: every pair is real HTML, with a slider to compare.

AI agents fail at UI in two ways: they add too much (explanations, colors, cards, badges, all-caps
labels, gradients, motion), or they play it safe and ship the house style every model shares,
which people now recognize on sight. UI Director fixes both: the agent writes a direction from
the product's world before any code, builds the whole page, then pushes one signature moment, and
looks at the result with its own browser before calling it done.

There are no example pages and no stylesheet to copy, on purpose. Agents reproduce whatever page
they see, and a shared stylesheet makes every product look alike and clashes with frameworks.
The skill teaches rules, numbers and a token recipe, and the agent writes the tokens in the
project's own format. Every product gets its own page, and every page stays consistent.

Works with any stack: plain HTML and CSS, Tailwind, shadcn, Bootstrap, MUI, CSS-in-JS, React,
Vue, Svelte, Astro, and native apps (SwiftUI, Flutter, Compose) through the token values. Works
with any harness: it uses the browser, image and 3D tools the agent already has, and never
installs its own.

## What's inside

```
skills/ui-director/
├── SKILL.md              the procedure, hard bans, model habits, craft rules and audit
├── references/           opened for the job at hand
│   ├── direction.md      the idea, the first screen, page order, conversion, flavor, type
│   ├── visuals.md        image generation, layers and transparency, parallax, scenes, real 3D
│   ├── system.md         token recipe, stack adapters, auditing a project, DESIGN.md
│   ├── app-ui.md         dashboards, tables, states, phones and responsive layouts
│   ├── words.md          headlines that sell, plain copy, real content
│   ├── motion.md         what to animate, timings, recipes, reduced motion
│   ├── tells.md          what reads as generated, and the redesign order
│   └── look.md           which browser to use, what to check, a page check to run
└── fonts/                Geist and Geist Mono (OFL), so the default font works offline
commands/ui-director/     setup, audit and match slash commands for Claude Code
docs/ui-director/         before/after pairs for humans: live HTML, screenshots and evals source
```

## Install

```bash
npx skills add mannobeats/hyper-taste --skill ui-director
```

```
/plugin marketplace add mannobeats/hyper-taste
/plugin install ui-director@hyper-taste
```

See the [main README](../../README.md#install) for every other way.

## Use

The skill triggers on its own for UI work ("build a dashboard for…", "make this landing page look
premium", "clean up this settings screen"). You can also ask for it by name: *"use ui-director"*.

What the agent does:

1. Writes a direction into `DESIGN.md` before any code: the obvious version (the house style of
   today's models included), three directions from the product's world, the pick, a signature
   that lives on the first screen, the palette, the type and every image's job. Dashboards and
   app screens get their own direction: the key object, what needs attention, the density and
   the shell.
2. Opens the references for the job.
3. Writes the tokens in the project's own format (CSS variables, Tailwind, shadcn, Bootstrap,
   MUI, native), or audits an existing project and puts it on tokens.
4. Builds the whole page with real content, then spends its time on the signature: generated
   images, layered parallax, scroll scenes, real 3D where it sells.
5. Looks at the result with the browser its harness provides, at desktop and phone widths, in
   light and dark, runs the page check, and fixes what it sees, two passes at least.

In Claude Code you can also call the modes directly (the prefix is `hyper-taste:` when you
installed the bundle):

```
/ui-director:setup [brand URL]        set up tokens, components and DESIGN.md
/ui-director:audit [page] [fix]       review a page in the browser and report (or fix) what's wrong
/ui-director:match <url>              match the look of a website
```

## Preview

| | |
|---|---|
| ![Before and after: a landing page with the product standing in a kitchen](gallery/08-landing-product.png) | ![Before and after: a landing page with the bread as a still life](gallery/10-landing-photo.png) |
| ![Before and after: dissolving nested cards](gallery/07-dissolve.png) | ![Before and after: a table on a phone](gallery/19-phone.png) |

## The pairs

Each pair in [`pairs/`](pairs) is two standalone pages, `before.html` and `after.html`, about one
rule from the skill. The "after" pages share [`pairs/tokens.css`](pairs/tokens.css), the token
system from `references/system.md` written as CSS; the "before" pages have no system on purpose.
[`pairs.json`](pairs.json) holds each pair's title, rule and captions, and feeds the live page,
the screenshots and the [evals](../../evals/ui-director).

The pairs live here, outside the skill folder, on purpose: agents copy whatever page they're shown.

To regenerate the screenshots in [`gallery/`](gallery) after changing a pair (uses your installed
Chrome):

```bash
cd docs/ui-director
npm install
npm run shoot                     # every pair, light and dark
npm run shoot -- 08-landing-product   # one pair
```

Photographs from Unsplash: the kitchen in pair 08 by
[Nicolas J Leclercq](https://unsplash.com/photos/KBjDo_QA1lY), the loaf in pair 10 by
[Robert Stump](https://unsplash.com/photos/DNqwLdfo0b8). All names, businesses and numbers in the
pairs are made up.
