---
type: llm
focus: { source: file, path: page.html }
---

PASS if on narrow screens the table is replaced or transformed into stacked rows (customer and amount on one line, details and status on another), text is at least 14–16px, nothing requires sideways scrolling, and nothing important is hover-only.
FAIL if the page still renders a wide table that scrolls sideways on a phone, or keeps 11px text.
