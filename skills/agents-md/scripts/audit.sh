#!/usr/bin/env bash
# Report bloat in every AGENTS.md under root. Usage: audit.sh [root=.]
set -uo pipefail
root=${1:-.}
find "$root" \( -name node_modules -o -name .git -o -name dist -o -name build -o -name .venv \) -prune -o -name AGENTS.md -print |
while IFS= read -r f; do
  lines=$(wc -l < "$f" | tr -d ' '); tokens=$(( $(wc -c < "$f") / 4 ))
  echo "== $f  lines=$lines  ~tokens=$tokens"
  [ "$lines" -gt 60 ] && echo "  WARN >60 lines: move task-specific sections to docs/ and link them"
  [ "$tokens" -gt 1500 ] && echo "  WARN >1500 tokens: paid on every request"
  grep -niE '^#+ .*(getting started|setup|installation|install|prerequisites|quick ?start)' "$f" | sed 's/^/  WARN onboarding section (drop it): line /'
  grep -niE '^#+ .*\b(prs?|pull requests?|commits?|delivery|release|review|test(s|ing)?|styl(e|es|ing)|css|react|api|typescript|auth(entication)?|database)\b' "$f" | sed 's/^/  HINT task-specific section (move to docs\/ + link): line /'
  awk '/^#+ /{if(h&&n>15)printf "  WARN section \"%s\" is %d lines\n",h,n; h=$0;n=0;next}{n++}END{if(h&&n>15)printf "  WARN section \"%s\" is %d lines\n",h,n}' "$f"
  grep -noE '[A-Za-z0-9_./-]+/[A-Za-z0-9_.-]+\.[a-z]{1,5}\b' "$f" | while IFS=: read -r ln p; do
    [ -e "$(dirname "$f")/$p" ] || echo "  WARN line $ln: path '$p' does not exist (stale or too granular)"
  done
  d=$(dirname "$f")
  for n in CLAUDE.md GEMINI.md; do
    [ -e "$d/$n" ] || [ -L "$d/$n" ] || continue
    [ -L "$d/$n" ] && [ "$(readlink "$d/$n")" = AGENTS.md ] || echo "  WARN $d/$n is not a symlink to AGENTS.md: run sync.sh"
  done
done
