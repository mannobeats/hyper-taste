---
type: regex
target: { source: file, path: page.html }
pattern: 'background-clip:\s*text|SECONDS'
flags: i
match: not_contains
---
