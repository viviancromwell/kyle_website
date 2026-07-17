---
name: polish
description: Run deslop + simplify on changed code before committing. Use as a pre-commit cleanup pass to remove AI slop and tighten code quality.
---

# Polish

Run two cleanup passes on all code changed in this branch (diff against main):

1. **Deslop** — remove AI-generated slop: unnecessary comments, excessive defensive checks, `as any` casts, style inconsistencies with surrounding code
2. **Simplify** — improve clarity, reduce duplication, tighten logic without changing behavior

## Steps

1. Get the diff against main (`git diff main --name-only`) filtered to code files (skip docs, configs, generated files)
2. For each changed file, read it and apply deslop fixes
3. Then apply simplify fixes on the same files
4. Report a 1-3 sentence summary of what changed
