#!/usr/bin/env bash
# Make every CLAUDE.md (and optional GEMINI.md) a symlink to its sibling AGENTS.md.
# Usage: sync.sh [root=.] [--force] [--gemini]
#   --force   back up a diverged CLAUDE.md to CLAUDE.md.bak, then link
#   --gemini  also link GEMINI.md
set -euo pipefail
root=.; force=0; names=(CLAUDE.md)
for a in "$@"; do
  case $a in --force) force=1 ;; --gemini) names+=(GEMINI.md) ;; *) root=$a ;; esac
done
prune=(-name node_modules -o -name .git -o -name dist -o -name build -o -name .venv)
status=0

# CLAUDE.md with no AGENTS.md: promote it to AGENTS.md first.
while IFS= read -r f; do
  d=$(dirname "$f")
  [ -L "$f" ] || [ -e "$d/AGENTS.md" ] && continue
  mv "$f" "$d/AGENTS.md"; echo "promoted $f -> $d/AGENTS.md"
done < <(find "$root" \( "${prune[@]}" \) -prune -o -name CLAUDE.md -print)

while IFS= read -r agents; do
  d=$(dirname "$agents")
  for n in "${names[@]}"; do
    t="$d/$n"
    if [ -L "$t" ] && [ "$(readlink "$t")" = AGENTS.md ]; then echo "ok       $t"; continue; fi
    if [ -e "$t" ] || [ -L "$t" ]; then
      if [ ! -L "$t" ] && cmp -s "$t" "$agents"; then rm "$t"
      elif [ $force = 1 ]; then mv "$t" "$t.bak"; echo "backup   $t.bak (merge anything unique into AGENTS.md)"
      else
        echo "DIVERGED $t differs from $agents. Merge unique lines into AGENTS.md, then rerun (or --force):"
        diff "$agents" "$t" || true; status=1; continue
      fi
    fi
    (cd "$d" && ln -s AGENTS.md "$n"); echo "linked   $t -> AGENTS.md"
  done
done < <(find "$root" \( "${prune[@]}" \) -prune -o -name AGENTS.md -print)
exit $status
