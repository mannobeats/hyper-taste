---
name: mac-design
description: How a desktop app looks and behaves like a real Mac app on macOS 26 and later, in SwiftUI, Electron or Tauri: Apple's principles, the window, sidebar, toolbar, menus, keyboard, type, color, Liquid Glass and dark mode. Use when building or reviewing any Mac window, sidebar, toolbar, menu, panel or Settings screen, or when the user asks for a more native or Apple-like app.
---

# Mac design

The outcome: people use the app for a minute and forget it wasn't made by Apple. Every shortcut
they know works, every menu is where they look, and the app still has a character of its own.

**Native chrome, creative content.** The window frame, menus, keyboard, focus and Settings
follow the platform exactly. The content area (what the app is for) is where the product's own
voice lives: color story, type for headings, how the key object is drawn, motion, empty states.
For the content's direction, use `ui-director`. For a fully custom set of parts, use
`design-system`.

The rules here are the same in every stack. How to build them in SwiftUI, Electron or Tauri is in
the `mac-app` skill. The full checklist with sources: `references/rules.md`.

## Apple's eight principles

The review lens for every screen:

1. **Purpose:** each feature costs people time, attention and trust. Cut what does not earn it.
2. **Agency:** people choose their path. Undo forgives mistakes. No forced tours.
3. **Responsibility:** ask for permissions at first use, keep data private, guard AI output.
4. **Familiarity:** things that look the same work the same. Standard parts, standard symbols.
5. **Flexibility:** keyboard, pointer and resizing all work. People customize what they use daily.
6. **Simplicity:** simple is not minimal. Hierarchy comes from order, space and contrast.
7. **Craft:** instant response, smooth scrolling, aligned edges, layouts that survive resizing.
8. **Delight:** the sum of the other seven, aimed at one feeling. Never decoration added at the end.

Every screen answers: Where am I? What can I do? Where can I go?

## Design plan

Before views, write in `docs/BRIEF.md` (or `docs/DESIGN.md`):

1. **Archetype:** sidebar window, single-window document, menu bar extra, or quick-capture panel.
   Most personal apps are a sidebar window plus one quick-capture entry point.
2. **Pages:** the sidebar, at most two levels.
3. **Command map:** every action, its menu, its shortcut.
4. **Empty states:** what each page shows before there is data.
5. **Feeling:** the one feeling the app aims for (calm, quick, confident). Motion, words and color
   reinforce it.

## Entry points first

A Mac app is used through its small entry points: a global shortcut, the menu bar, a quick panel,
drag and drop, the Share menu. Design those first. A to-do app lives in its quick-add panel.
Quick capture is one floating panel, one input, opened by a global shortcut, closed by Escape or
Return. On Return, close and show the result at once, save in the background, offer Undo.

## The window

- Sidebar, content, detail (inspector). Global actions in the toolbar. No sidebar when
  navigation is one level. Keep the top area free for dragging the window.
- Toolbar items sit over the column they act on; at most three groups; monochrome symbols, each
  with a tooltip; at most one prominent action (Done, Send). Details: `references/toolbars.md`.
- Window titles name the content ("Today"), not the app.
- Nothing is focused when a window or sheet opens: no focus ring, no cursor, no selected text.
  Only a window whose one job is typing focuses its field.
- Sheets, popovers and Settings tabs size to their content and scroll only when taller than the
  screen allows. System scroll bars, never restyled.
- Relaunch restores windows, selection and scroll position. Quit never asks unless typed work
  would be lost. No splash screen, no onboarding tour.

## Menus and keyboard

- Every toolbar button and feature also lives in the menu bar with a shortcut, in Apple's menu
  order and labels (`references/menus.md`). Items that do not apply are disabled, not hidden.
- Standard shortcuts keep their meaning: Command-C, V, X, Z, W, Q, N, comma (Settings).
- Return is the default action, Escape cancels, Delete removes, Space previews, arrows move.
- Every shortcut shows feedback in the same frame. Teach shortcuts in menus and tooltips.
- A context menu on everything people can act on. Undo for every destructive or bulk action.

## Look

- **Text:** macOS sizes, not iOS or web sizes. Body 13 pt, nothing under 10 pt. Headline is bold
  13 pt. Full scale: `references/rules.md`, rule 29. The system font for UI text; a custom face
  for headings only, with a reason.
- **Controls** are 22 to 28 pt tall, not 44. Window margins 20 pt, related controls 8 apart,
  groups 20.
- **Color:** semantic text colors (primary, secondary, tertiary) and system backgrounds. One
  accent, by default the one the person chose for their Mac. Status color always with an icon or
  a word. Text on an accent fill uses an on-accent color, never a fixed white.
- **Dark mode** is its own palette with more distance between tones. Check both.
- **Glass and materials** belong to the navigation and control layer (toolbar, sidebar, floating
  controls), never to rows, cards or documents. Never glass on glass. Electron and Tauri get the
  system's vibrancy materials, not real Liquid Glass: use them for the sidebar and say so.
- **Icons:** one set (SF Symbols in SwiftUI; a matching outline set on the web), standard symbols
  for standard actions (`references/rules.md`, rule 65).
- Respect Reduce Motion, Reduce Transparency and Increase Contrast. Label icon-only buttons.

## Settings

Command-comma from the app menu. Tabs by topic, one grouped form per tab, applied at once, sized
to its content. Few options. Details: `references/settings.md`.

## When to customize

Custom chrome is fine when it makes the app clearly better at its one job: a quick-add field, a
calendar grid, a timeline, a mixer. Match the system around it: concentric radii, system fonts,
system spacing, the traffic lights where people expect them.

## Done when

Every surface (each page, the menu bar, each panel, sheet, popover and Settings tab) has been
seen in light and dark, as the key window, and every rule in `references/rules.md` holds or has a
comment saying why not. Look especially for focus rings nobody asked for, scroll bars with
nothing to scroll, and empty bands under short content.
