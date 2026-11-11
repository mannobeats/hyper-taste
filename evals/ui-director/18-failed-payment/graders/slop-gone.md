---
type: regex
target: { source: file, path: page.html }
pattern: 'card_declined|>Error!<'
flags: i
match: not_contains
---
