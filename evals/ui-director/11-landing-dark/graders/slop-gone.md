---
type: regex
target: { source: file, path: page.html }
pattern: 'backdrop-filter|background-clip:\s*text'
flags: i
match: not_contains
---
