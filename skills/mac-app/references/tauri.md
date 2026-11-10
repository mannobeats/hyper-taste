# Tauri on the Mac

A web UI in the system WebView (WKWebView) with a Rust shell. Small and fast, and the WebView is
Safari's, so test in Safari, not only Chrome. Check the current Tauri 2 docs for an option before
you rely on it; config keys change between versions.

## The window

In `tauri.conf.json`, under `app.windows`:

```json
{
  "title": "", "width": 1100, "height": 720, "minWidth": 720, "minHeight": 480,
  "titleBarStyle": "Overlay", "hiddenTitle": true,
  "transparent": true,
  "windowEffects": { "effects": ["sidebar"], "state": "followsWindowActiveState" }
}
```

- `transparent` needs `"macOSPrivateApi": true` under `app` (fine for apps outside the App Store).
- **Dragging:** `data-tauri-drag-region` on the top bar, and the window drag permission in the
  capability file. Controls inside the bar must not carry the attribute.
- **Sidebar material:** the sidebar's background stays transparent so the effect shows; the
  content area gets an opaque surface. This is the system's vibrancy, not Liquid Glass.
- **State:** save and restore window size and position (the window-state plugin), the selection
  and the scroll position.

## The menu bar and system hooks

- Build the menu in Rust (`MenuBuilder`, `SubmenuBuilder`, `PredefinedMenuItem` for About,
  Services, Hide, Quit, Undo, Copy, Paste, Select All, Minimize, Zoom) in Apple's order
  (`mac-design` references/menus.md), with `CmdOrCtrl+…` accelerators. Handle clicks in
  `on_menu_event` and send them to the frontend as events. Disable items that do not apply.
- Settings: an app-menu item "Settings…" with `Cmd+,` that opens a second, fixed-size window.
- Global shortcuts, a tray item, notifications, autostart: the official plugins. Every plugin
  needs its permission in the capability file.
- Deep system APIs (Accessibility, screen capture): a Rust command, using the API and permission
  from `os-integrations.md`.

## Feel native

The same rules as Electron (`electron.md`, Feel native): system font at 13px, macOS sizes,
`user-select: none` and `cursor: default` on chrome, no rubber-band scrolling on chrome, system
scroll bars, 22–28px controls, the media queries for dark, reduced motion, reduced transparency
and contrast. For the accent, try the CSS `AccentColor` keyword in WKWebView first; if it does
not follow the Mac, read it in a small Rust command and pass it to a CSS variable.

## Verify

- **Logic:** `cargo test` for the Rust side, the frontend's own unit tests.
- **The UI in a browser:** the dev server with Playwright using WebKit, at the window sizes you
  care about, light and dark. This covers most of what people see.
- **The real app:** there is no WebDriver for the macOS WebView, so look at the running app with
  `screencapture -l <windowID>` or computer use: the frame, the traffic lights, the material, the
  menu bar. Check menus through Accessibility or computer use.
- Point the app at a test data folder with an environment variable.

## Ship

`npm run tauri build` writes the `.app` and `.dmg` under `src-tauri/target/release/bundle/`. Sign
with a Developer ID and notarize before giving it to anyone else.
