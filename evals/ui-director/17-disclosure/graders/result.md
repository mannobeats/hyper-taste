---
type: llm
focus: { source: file, path: page.html }
---

PASS if rows show the report name and meta (such as edited time) by default, frequent actions appear only on hover or focus (icons with tooltips or labels), rare actions move to a menu, and Delete is no longer a visible button on every row.
FAIL if every row still shows Edit, Duplicate, Share and Delete buttons at all times.
