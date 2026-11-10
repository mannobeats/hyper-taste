# Electron on the Mac

The goal is a Mac app built with web tech, not a website in a window. Check the current Electron
docs for an option before you rely on it; names change between major versions.

## The window

```js
new BrowserWindow({
  width: 1100, height: 720, minWidth: 720, minHeight: 480,
  titleBarStyle: 'hiddenInset',          // traffic lights over your content
  trafficLightPosition: { x: 16, y: 18 }, // line them up with your top bar's center
  vibrancy: 'sidebar',                    // the system's sidebar material (not Liquid Glass)
  visualEffectState: 'followWindow',      // material dims when the window is inactive
  backgroundColor: '#00000000',
  show: false,                            // show on 'ready-to-show': no white flash
  webPreferences: { preload, contextIsolation: true, sandbox: true },
})
```

- **Dragging:** `-webkit-app-region: drag` on the top bar, `no-drag` on every control inside it.
- **Sidebar material:** leave the sidebar's background transparent so the vibrancy shows; give
  the content area an opaque surface.
- **State:** save and restore window bounds, the selection and the scroll position. Show the
  window on `ready-to-show`.
- **Settings:** its own small `BrowserWindow`, opened by an app-menu item "Settings…" with
  `accelerator: 'Cmd+,'`, sized to its content, not resizable.

## The menu bar

Build it with `Menu.buildFromTemplate` in Apple's order (`mac-design` references/menus.md). Use
roles for standard items (`appMenu`, `editMenu`, `windowMenu`, `undo`, `copy`, `paste`,
`selectAll`, `togglefullscreen`), so they behave natively. Your own items get `CmdOrCtrl+…`
accelerators. Rebuild or update `enabled` when the selection changes, so items that do not apply
are disabled. Context menus are native: `Menu.popup`, not an HTML menu.

## Feel native

- **Type:** `font-family: -apple-system, system-ui`; body 13px, nothing under 10px; the macOS
  scale in `mac-design` references/rules.md, rule 29.
- **Colors:** dark mode from `prefers-color-scheme` (`nativeTheme` in the main process); the
  accent from `systemPreferences.getAccentColor()` passed to a CSS variable, refreshed when the
  window regains focus.
- **Chrome is not a page:** `user-select: none` and `cursor: default` on chrome and buttons (no
  hand cursor), `overscroll-behavior: none` on the body, no browser zoom
  (`setVisualZoomLevelLimits(1, 1)`), system scroll bars left alone.
- **Controls** 22–28px tall, focus ring on `:focus-visible` only, in the accent.
- **Keyboard:** Return, Escape, Delete, Space, arrows work in lists; shortcuts live in the menu.
- **Respect** `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast`.

## Verify

- **Playwright drives the real app:** `const app = await _electron.launch({ args: ['.'] })`,
  `const win = await app.firstWindow()`, then click, type, and `win.screenshot()` at the window
  sizes you care about, light and dark (`colorScheme` or `nativeTheme.themeSource`).
- `app.evaluate(({ Menu }) => …)` reads the real menu: titles, accelerators, enabled state.
- Point the app at a test data folder with an environment variable.
- The look of the frame (traffic lights, vibrancy) only shows in a capture of the real window:
  `screencapture -l <windowID>` or computer use.

## Ship

Electron Forge or electron-builder makes the `.app`. Sign with a Developer ID and notarize before
giving it to anyone else; unsigned apps are blocked by Gatekeeper.
