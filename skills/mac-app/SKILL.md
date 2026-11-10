---
name: mac-app
description: Build, run and verify a desktop app for the Mac in SwiftUI, Electron or Tauri, so it behaves like a native Mac app - project setup, the native window and menu bar, system integrations (hotkeys, menu bar items, permissions), testing, snapshots and performance. Use when starting a Mac app, writing its code, hooking into macOS, making it fast, or checking that a change works in the running app.
---

# Mac app

The outcome: an app that opens from `/Applications` like any other, behaves like a native Mac
app in every stack, and has been seen working (not just compiled) after every change. How it
should look and behave is the `mac-design` skill; this skill is how to build and prove it.

## 1. Pick the stack

| Stack | Pick when | Read |
|---|---|---|
| **SwiftUI** | Mac-only, deep system hooks (hotkeys, Accessibility, screen capture), smallest and fastest app | `references/swiftui.md` |
| **Tauri** | A web UI with a small, fast native shell (Rust); Mac first, other platforms later | `references/tauri.md` |
| **Electron** | A web UI that must match on Mac, Windows and Linux, or reuse a large web codebase | `references/electron.md` |

Write the choice and the reason in `docs/BRIEF.md`. Whatever the stack, the window, menu bar,
shortcuts, Settings and focus rules in `mac-design` apply in full.

## 2. Set it up so it is real from day one

The first build proves the toolchain, before feature code. From the first commit the app has:

- A name, a reverse-DNS bundle id, and an install path that never changes (macOS keeps
  permission grants per signature and path).
- The native window: traffic lights, a draggable top area, a sidebar that can fold away.
- A real menu bar in Apple's order (`mac-design` references/menus.md) with standard shortcuts,
  and Settings on Command-comma.
- Light and dark mode that follow the Mac, and the person's accent color.
- Its data in `~/Library/Application Support/<App>/`, with an override (an environment variable)
  so tests and snapshots never touch real data.
- An icon (the `app-icon` skill).

## 3. Write the code

- Follow the stack's reference, the story's acceptance lines and the project's design system.
- System hooks (global shortcuts, menu bar items, Accessibility, screen capture, launch at login,
  Shortcuts, notifications): pick the API and its permission from `references/os-integrations.md`.
  Prefer the API with no permission. Ask for a permission at the moment of use, and show the
  state of every permission on one Settings page.
- Every feature is reachable three ways: a menu item with a shortcut, a URL scheme
  (`<app>://action/<name>`), and (SwiftUI) an App Intent. One action list backs all three.
- Keep files small enough to read in one go (about 300 lines).

## 4. Verify in the running app

A change is done when you have seen it work, not when it compiles. Code that builds can still
show an empty sidebar, clipped text, unreadable dark mode, or a menu item that does nothing.

- **Build** with zero warnings, install to the same path, open it.
- **Look:** capture your own window (never the full screen, it shows the person's other windows)
  for every page you touched, light and dark, with sample data in a test store. The app can have
  a snapshot mode that walks its pages and saves one image each. Look at every image.
- **Behavior:** every acceptance line maps to a unit test, a self-test step (a launch flag that
  runs the same functions the UI calls and prints PASS or FAIL), or a named manual check. Logic
  lives where it can be tested without the UI.
- **Menus and keys:** check the real menu bar from outside the app (computer use or
  Accessibility) on a test copy: items disable when nothing is selected, and do what they say.
- **Background paths:** run every timer, observer and background queue once after a concurrency
  change. That is where Swift 6 apps crash at runtime.
- **Fast:** a key press shows its result in the next frame (under 100 ms), and nothing blocks the
  main thread for more than 50 ms. Measure the release build before and after a fix
  (`references/performance.md`; audio, video and GPU work: `references/media.md`).

Use computer use only for what nothing else can reach: a real key press in another app, drag and
drop from Finder, a permission prompt.

## 5. Commit

Commit as `build` says, one change per commit.

## Done when

The app builds with zero warnings, opens from its install path, every page you touched was seen
in light and dark, every acceptance line passes its check, and the change is committed.
