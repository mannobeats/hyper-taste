# SwiftUI

Copyable view code (sidebar, toolbar, inspector, quick panel, Settings, tables, undo, calm
windows): `swiftui-patterns.md`.

## Setup without Xcode

A Swift package an agent can read and edit end to end. Switch to an XcodeGen project (`project.yml`
in git, the generated `.xcodeproj` out of it) only when the app needs App Intents, widgets,
extensions or an asset catalog.

```swift
// swift-tools-version: 6.2
import PackageDescription
let package = Package(
    name: "Tasks",
    platforms: [.macOS(.v26)],
    targets: [
        .target(name: "TasksKit"),                       // rules and data, no SwiftUI: testable alone
        .executableTarget(name: "Tasks", dependencies: ["TasksKit"],
                          swiftSettings: [.defaultIsolation(MainActor.self)]),
        .testTarget(name: "TasksKitTests", dependencies: ["TasksKit"]),
    ]
)
```

A build script turns the binary into a real app:

1. `swift build -c release --scratch-path ~/Library/Developer/<App>/build` (build products
   outside the repo and outside Dropbox or iCloud).
2. Make `~/Applications/<App>.app/Contents/{MacOS,Resources}`, copy the binary, write
   `Info.plist` (`CFBundleIdentifier`, `CFBundleName`, `CFBundleExecutable`, `CFBundleIconName`,
   `CFBundlePackageType APPL`, `LSMinimumSystemVersion 26.0`, `NSPrincipalClass NSApplication`).
3. Copy the compiled icon (`app-icon` skill), `xattr -cr`, then `codesign --force --sign` with the
   first "Apple Development" identity from `security find-identity -v -p codesigning`, or `-`
   (ad hoc) without one. Ad hoc builds lose permission grants on every rebuild.
4. `--open`: quit the running copy, open the new one.

`swift build` can report success while an edited file failed: if any source file is newer than
the binary, treat the build as failed. `cannot find 'X' in scope` right after adding a file: run
`swift package clean` with the same scratch path.

## Concurrency

The package sets main-actor default isolation: every type and function runs
on the main actor unless you say otherwise. UI code needs no annotations.

| Work | Put it in |
| --- | --- |
| UI state, views, view models | Default (main actor) |
| CPU-heavy pure work (parsing, image work, diffing) | A `nonisolated` function marked `@concurrent` |
| Shared mutable state used off the main thread | An `actor` |
| A C callback (event tap, Carbon hotkey, CoreAudio listener) | A `nonisolated` static func that hops back with `Task { @MainActor in ... }` |

- Data that crosses actors is `Sendable`: structs and enums of `Sendable`
  values, or `final class` with only `let` properties.
- `MainActor.assumeIsolated { }` inside a callback you know runs on the main
  thread (a main run loop `Timer`, a main queue notification).
- `Task { }` inherits the actor. `Task.detached` only when it must not.
- Fix a concurrency error at its type, not with `@unchecked Sendable` or
  `nonisolated(unsafe)`. Those two are a last resort, with a comment why.
- **Runtime trap the compiler misses.** A closure created inside a
  `@MainActor` type and passed to an API without a `@Sendable` closure
  parameter (`DispatchSource.setEventHandler`, `DispatchWorkItem`,
  `addPeriodicTimeObserver`, CoreAudio listener blocks) inherits the main
  actor. When it runs on a background queue, Swift 6 crashes the app. Write
  it as `{ @Sendable in ... }`, and run every background path once after
  any concurrency change.

## State

- `@Observable` classes for models. `@State` in the view that owns one,
  `@Bindable` to bind to its properties, `.environment(model)` to share it.
- `@ObservationIgnored` on caches, timers, and handles, so they never
  trigger a redraw.
- `@State` for view-local values. `@AppStorage` for small preferences.
  Keychain for secrets.
- `ForEach(items)` over values, never `ForEach($items)` for data the user
  can delete: a row can read an index that no longer exists and crash. Get
  a binding by looking the item up by id.

## SwiftData

- `@Model` classes, `.modelContainer` on the scene, `@Query` in views,
  `@Environment(\.modelContext)` to insert and delete.
- Every new property has a default value, so existing stores still open.
- Store at `~/Library/Application Support/<AppName>/`. Allow an override
  (`APP_STORE`) so tests never touch the real data.
- Give every model its own `uid: UUID`. `persistentModelID` changes on the
  first save, so it breaks selection and lookups.
- Undo: register the reverse of each action on the window's undo manager.
  SwiftData's automatic undo is not reliable. Code: `swiftui-patterns.md`, "Undo with SwiftData".
- Need SQL, a CLI, or several processes on one file? Use SQLite with WAL
  through a small library target instead.

## Menu commands

SwiftUI `Commands` do not observe `@Observable` models, so a title or a
`.disabled(...)` that reads the model goes stale. In testing, neither
`@FocusedValue` (from `.focusedSceneValue`) nor an `@ObservedObject` inside
the commands updated reliably: the menu stayed disabled with a row
selected. What works: mirror the selection into a small `ObservableObject`,
observe it in the `App`, and pass the values into the commands. The App's
body then rebuilds the menus when they change.

```swift
@MainActor final class MenuState: ObservableObject {
    static let shared = MenuState()
    @Published private(set) var selection: Set<UUID> = []
    func update(_ s: Set<UUID>) { if selection != s { selection = s } }
}
// AppModel: var selection: Set<UUID> = [] { didSet { MenuState.shared.update(selection) } }

struct MyApp: App {
    @ObservedObject private var menu = MenuState.shared
    var body: some Scene {
        Window("App", id: "main") { ContentView() }
            .commands { AppCommands(model: model, selectedIDs: menu.selection) }
    }
}
```

Disable items with `.disabled(selectedIDs.isEmpty)` and resolve the target
again when the item fires. Never ship items that stay enabled and do
nothing. Check the menu from outside the app (see "Testing" below).

A menu shortcut also fires while a text field has focus. Never use Delete,
Command-Delete, arrows, or Return as menu shortcuts. Handle them on the
list with `.onDeleteCommand` and `.onKeyPress`.

## Names Swift already uses

Never name a type `Task`, `View`, `Color`, `Image`, `Text`, `Section`,
`Label`, `Menu`, `Group`, or `Settings`. `Task` breaks every `Task { }`.
Use `Todo`, `TaskItem`, `NoteSection`.

## AppKit bridges

SwiftUI covers windows, lists, and forms. AppKit is still the answer for:

- Floating panels that do not steal focus: `NSPanel` with
  `.nonactivatingPanel` hosting a SwiftUI view (`NSHostingView`, with
  `sizingOptions = []` for a fixed frame).
- Text views with custom behavior: `NSViewRepresentable` around `NSTextView`.
- Status items with custom click handling: `NSStatusItem`.
- Key and mouse monitors: `NSEvent.addLocalMonitorForEvents`. Remove the
  monitor when the view goes away.

For system hooks (hotkeys, Accessibility, screen capture), read `os-integrations.md`.

## Compiler errors

| Error | Fix |
| --- | --- |
| `cannot find 'X' in scope` right after adding a file | `swift package clean --scratch-path ~/Library/Developer/<AppName>/build` |
| `Main actor-isolated ... from a nonisolated context` | Make the caller main-actor, or `await` the call |
| `Sending 'x' risks causing data races` | Make the type `Sendable`, or keep it on one actor |
| `The compiler is unable to type-check this expression` | Split the view into smaller subviews or `let` constants |
| `ambiguous use of 'Task'` | A type in your code is named `Task`; rename it |

Fix the first error first. Later errors often come from it.

## Swift 6 errors

Moving an existing Swift 5 app? Expect several build rounds, then hunt the runtime trap above.

| Error | Fix |
| --- | --- |
| Static `let` of a non-Sendable type (formatter, `NSFont`, `CFString`) | `@MainActor` on the enclosing type, a computed `var`, or a commented `nonisolated(unsafe)` |
| `sending 'note' risks causing data races` in a main-queue observer | Copy the Sendable parts (an id, a pid) out of the notification before `MainActor.assumeIsolated` |
| Observer token captured before it is assigned | Keep the token in a small `@MainActor` class |
| "pattern that the region-based isolation checker does not understand" in a task group | Use an array of `Task { @MainActor in ... }` and await each one |
| Vars changed from `OperationQueue` blocks under `NSLock` | `OSAllocatedUnfairLock(initialState:)` |
| `@objc` action on an `NSMenuItem` subclass | `@MainActor @objc func` |

## Testing

- **Unit tests** on the library target (`swift test` with its own scratch path). Fix the clock and
  the store path in every test. A parser needs table tests, including 20+ negative rows of real
  input that only looks like a match.
- **Self-test:** `--selftest` runs the functions the UI calls against a store in `/tmp`, prints
  PASS or FAIL per step, exits 0 or 1. Worth adding to any app: every page's New creates a visible,
  focused row; after a delete, selection moves to the next row; every SF Symbol name exists; every
  URL action round-trips; a smoke step that runs every timer and observer for a few seconds.
- **Keys:** send real key events through `NSApp.sendEvent` with the flags a keyboard sends (arrows
  carry `.numericPad` and `.function`), after making the window key. Test typing by typing, never
  by setting the model's text.
- **Menus** from outside, through Accessibility or computer use, on a seeded test copy: with
  nothing selected the item is disabled; with a row selected it acts.
- **Snapshots:** a launch mode that walks every sidebar page and Settings tab in light and dark,
  captures the window with `screencapture -l <windowID>` (it needs Screen Recording for the
  terminal), and quits. An inactive window (gray traffic lights) does not count as reviewed.
- **Runs that never hang:** delete `~/Library/Saved Application State/<bundle id>.savedState` and
  the test store with its `-wal` and `-shm` files first; quit through `NSApp.terminate`; print
  line-buffered. Debug lines go to stderr behind an environment flag.
