---
name: build
description: How to write code in any project so it stays one coherent system - read the code first, reuse what exists, build in thin tested slices, check the official docs, and finish every part a change touches. Use when implementing a feature or story, fixing a bug, refactoring, adding an API, or choosing a library or dependency.
---

# Build

The outcome: code that looks like one careful person wrote the whole codebase. Every rule lives in
one place, every helper exists once, every change is complete and proven. Agents fail the other
way: they write a second version of what already exists, stop at the file they were asked about,
and call it done because it compiles.

## 1. Read before you write

- Read the task and the code it touches, then trace the real flow end to end: where data comes
  in, where it is stored, what reads it.
- Read the project's `AGENTS.md`, `CONSTRAINTS.md`, `DESIGN-SYSTEM.md` and the story. They win
  over your habits.
- List every place the change must reach: callers, tests, fixtures, types, config, exports, docs.
  That list is the scope. Features nobody asked for are not.

## 2. Reuse before you add

Search before you write. Take the first option that fully works:

1. **Already in this codebase?** A helper, component, hook, service, type, token or pattern.
   Use it the way the surrounding code does. Writing a second one is the most common way agents
   turn code into spaghetti.
2. **Almost in the codebase?** Extend the existing piece so both callers share it, instead of
   copying it. Two near-copies that must change together become one.
3. **The standard library or the platform?** Use it, unless the project has its own wrapper.
4. **An installed dependency?** Use it. Add a new dependency only when it does real work a few
   lines can't, and say why.
5. **Only then:** new code, in the project's existing structure, layers and naming.

When you do add something reusable, put it where the next person will look for it, and make
the old ad-hoc copies use it.

## 3. Keep it one system

- **One home per rule.** A business rule, a format, a magic number or a style lives in one place
  and everything else refers to it.
- **No abstraction nobody needs:** no interface with one implementation, no factory for one
  product, no wrapper that only passes calls through, no option or config for a value that never
  changes, no "for later" scaffolding. Abstractions come from the second real caller.
- **Consistent everywhere:** the same thing has the same name, the same shape and the same error
  handling in every file. Follow the codebase's conventions even where you'd choose otherwise.
- **Simple, not lazy:** the shortest correct solution, once you know everything it must touch.
  A clever one-liner that needs decoding is not simple.
- **Comments say why**, in one line, only where the code can't.

## 4. Build in thin slices

Each slice goes through every layer it needs (data, logic, UI) and works on its own:

1. Write the test that proves the slice: it fails first. Logic, parsers, money, security and
   data writes always get one; trivial changes don't need one.
2. Make it pass with the simplest code that fits the system.
3. Run the whole relevant suite, the type checker and the linter. Then look at the running
   result if the slice has UI (`ui-director`, `mac-app`).
4. Commit with a message that says what someone can now do.

Never leave the codebase broken between slices. If a slice grows past what you can verify in one
go, split it.

## 5. Ground it in the docs

APIs change. Before you use a framework feature, a config key or a library call you are not sure
about, read the official docs or the installed version's source, and use what they say for the
version this project has. Say which source you used when it matters. Never invent an API.

## 6. Design interfaces on purpose

For an API, a module boundary or a component's props: design the contract before the code.
Name things for what they mean to the caller, keep inputs and outputs small, validate at the
boundary, return errors the caller can act on, and keep it stable once others use it (add, don't
break). Expect callers to depend on everything observable, not only what you documented.

## 7. Finish the change

- **Every caller:** grep every use of what you changed, and update each one. A bug fix goes in
  the shared code, once, not in the one caller the report named.
- **Every test, fixture and type** your change breaks is fixed, not skipped or deleted.
- **Code you move keeps** its validation, error handling and edge cases.
- **Never cut:** validation at trust boundaries, error handling that prevents data loss,
  security, accessibility, anything the user asked for.
- **A known limit** gets a one-line comment: `limit: <what>, <when to revisit>`.

## Done when

- You searched before writing, and nothing new duplicates something that existed.
- Every place on the scope list is updated, and the tests, types and linter pass.
- The change was seen working (tests, and the running app for anything visible).
- Each slice is its own commit, and anything you couldn't check is named in your report.

Reuse rules adapted from Ponytail by Dietrich Gebert (MIT); slices, tests and source-driven work
adapted from Agent Skills by Addy Osmani (MIT).
