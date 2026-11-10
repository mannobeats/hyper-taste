---
name: product-brief
description: One-page brief (docs/BRIEF.md) for a new app or product, written before any code - what it is, who it is for, the main jobs, the data, the platform and stack, the look, what is out of scope, and how we will know it works. Use when the user has an idea, wants to replace an app they use, hands over a rough spec, or research is done.
argument-hint: "[idea in a few words]"
---
# Product brief

Write `docs/BRIEF.md` in a folder named after the product (`<parent>/<Name>/docs/BRIEF.md`; ask for the parent folder, default
`~/Developer`). Every later skill reads it. Keep it to one page. It says what to build and why, before anyone argues about how.

## 1. Name and read what exists

Pick the name first: one word (`Tasks`, `DailyLog`), not the name of an app the person already
uses, and for an app a reverse-DNS id (`com.<yourname>.<appname>`) in lowercase. The folder, the
research, and the project all use it.

If `docs/research/` or `docs/screens/INDEX.md` exist, read them first.
Skip every question they already answer.

If the user gives you a spec or PRD, it already answers most questions: copy what fits, keep
the rest as `docs/SPEC.md`, and ask only what is missing.

## 2. Interview

Ask one or a few questions at a time, each with your best guess, so "I don't know" still
moves things forward. Never ask what the code or the research already says. Ask what the
person actually needs, not only what they asked for: "a dashboard" is often "know which
clients pay late". If the user asked you to decide everything,
answer each question yourself from the research, write the choice in the
brief, and note "decided by the agent" next to it.

1. What do you do today, and which app or habit does it replace?
2. What are the three things you do most often? These become the main pages.
3. What data does it hold? Name the nouns: tasks, notes, recipes, invoices.
4. Is there a reference app you like? Then the `clone` skill comes next.
5. Where does it live: a Mac app (a window with a sidebar, a menu bar item,
   a quick-capture panel), a web app, a phone app, or a mix? Which stack
   (SwiftUI, Tauri, Electron, a web framework, Expo, native mobile)?
6. Does it need the internet? Default: no.
7. Which three things are out of scope for version one?
8. Should it look like the platform's own apps, or have its own look? Note a
   brand or accent color, and any app they name ("like Things"). No answer
   means native, with the system's accent color.
9. How will we know it works? One or two outcomes a person could check.

## 3. Cut scope

A personal app has one user. Remove what exists only for other users:
accounts, sharing, teams, sync servers, billing, onboarding, analytics. A product for many users keeps what they need, and nothing for the vendor's sake.

Version one is small enough to finish: two to five main pages, one data model with two to four types. Smart lists that filter one
model (Today, Upcoming, Someday) count as one page.

## 4. Write docs/BRIEF.md

```markdown
# <AppName>

One sentence: what it is and who it is for.

## Replaces
<app or habit>

## Main jobs
1. ...
2. ...
3. ...

## Data
- <Type>: <fields>

## Shape
<sidebar window / menu bar extra / web app / phone app>, <platform and stack, and why>. <Data: local or synced. Offline or not. Accounts or not.>

## System hooks
<global shortcut, menu bar, Share menu, Shortcuts, CLI, or "none">

## Reference
<app name, or "none">

## Look
<native with an accent color (name it, or "system"), its own look, or "like <app>", and why>

## Works when
- <an outcome a person can check>

## Not in version one
- ...
```

## 5. Hand off

Call the Skill tool with `user-stories`, For a product that agents will build over many sessions, also call it with `quality-bar`.

Done when `docs/BRIEF.md` exists, fits on one page, and has every section.
