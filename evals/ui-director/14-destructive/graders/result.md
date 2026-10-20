---
type: llm
focus: { source: file, path: page.html }
---

PASS if the button that removes the workspace is red (or uses a red/danger color token), its label names the action (for example "Remove workspace", not "Yes"), the cancel option is a neutral button, and the dialog says what will be lost.
FAIL if the remove button still uses the brand purple, is labeled "Yes", or the dialog still asks a yes/no question without saying what is lost.
