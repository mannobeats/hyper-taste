---
name: start-here
description: Start here to build software with Hyper Taste - picks the next skill for where the work is, from idea to shipped app (Mac, web or phone), and says which comes after.
disable-model-invocation: true
---

# Hyper Taste

Find where the work is, call the Skill tool with the skill for that step, and tell the user which
skill comes after it. One owner per job: each skill points to the others instead of repeating
them.

```text
idea -> research -> clone (optional) -> product-brief -> user-stories -> quality-bar
     -> design (ui-director / mac-design + design-system + ux-design + app-icon)
     -> improve-loop (build each story, review each milestone) -> repeat
```

## Plan

| The user has | Skill |
|---|---|
| A vague idea, or asks "what should I build" | `research`, then `product-brief` |
| An app they want to replace or learn from | `clone` |
| An idea or a rough spec, no brief | `product-brief` |
| A brief, no backlog | `user-stories` |
| No written quality bar, or agents will run unattended | `quality-bar` |

## Design

| The user wants | Skill |
|---|---|
| A landing page, web app, dashboard or phone app that doesn't look generated | `ui-director` |
| A Mac app that looks and behaves native (SwiftUI, Electron, Tauri) | `mac-design`, plus `ui-director` for the content |
| Tokens, components, a brand or accent color, the look of an app they name | `design-system` |
| Names, flow, modals, states, words, accessibility for one feature | `ux-design` |
| A Mac app icon | `app-icon` |

## Build

| The user wants | Skill |
|---|---|
| Write code for a feature or story | `build` |
| Start, run, test or speed up a Mac app | `mac-app` |
| Fix a bug, a failing test or a broken build | `debug` |
| A Dockerfile, image, Compose stack or container build to write or speed up | `docker-optimize` |
| Review a diff or audit a codebase | `review` |
| Restructure, simplify or de-bloat existing code | `review` to find what to fix, then `refactor` |
| Work through the backlog on its own | `improve-loop` |
| A quick call when work goes in circles: is it ready, what's next | `stop-overthinking` |
| Keep `AGENTS.md` / `CLAUDE.md` small and in sync | `agents-md` |

## Done when

You named the step, called its skill, and told the user which skill comes after it.
