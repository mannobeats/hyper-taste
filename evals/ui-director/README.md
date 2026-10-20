# ui-director evals

One case per before/after pair in [`docs/ui-director/pairs`](../../docs/ui-director/pairs). Each
case copies the pair's `before.html` into an empty workspace as `page.html`, asks for the fix the
way a user would (without naming the skill), and grades the edited file:

- `result.md`: a judge model checks the rubric taken from the pair's "after".
- `slop-gone.md` (some cases): a regex that fails if a specific tell is still in the file.
- `skill-fired.md`: whether the agent opened ui-director. Reported, not scored.

Each run also has a baseline arm without the skill, so `Δ` is what the skill adds.

## Run

From the repo root, with [Claude Code](https://code.claude.com/docs/en/plugin-evals):

```bash
claude plugin eval . --eval-dir evals/ui-director --scaffold --allow-tools Write Edit --runs 1 -j 4
```

Add `--case 08-landing-product` for one case. `--scaffold` is needed because each case copies its
starting page with `scaffold.sh`. A full run costs model usage on your account (roughly $0.30 to
$1.50 per case and arm), so it isn't part of CI.

## Add a case

Add the pair to `docs/ui-director/pairs.json` and its folder first, then copy a case folder here,
change the pair id in `scaffold.sh`, and write the prompt and rubric. Write the rubric as concrete
PASS and FAIL conditions about the file, so a judge reading the HTML can decide.
