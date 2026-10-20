---
type: llm
focus: { source: file, path: page.html }
---

PASS if the nested boxes are gone: fields are laid out as label/value rows or a definition list on one surface, sections are separated by headings or thin lines, there is no card inside a card, and the all-caps tracked field labels are gone.
FAIL if the layout still has field boxes inside a box inside a card, or uppercase letter-spaced labels.
