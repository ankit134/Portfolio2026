---
name: cleanup-test-debug
description: Removes provably-unused code, runs existing tests, reviews the diff, and debugs any failures with a brief root-cause summary. Use after finishing a feature, bug fix, or refactor — not for trivial one-line edits.
disable-model-invocation: true
---

# Cleanup, Test, and Debug

## Instructions

1. **Cleanup**: Identify code that is provably unreachable or unused — unused imports,
   dead variables, dead branches. Before removing anything, check for dynamic or
   string-based references, exports used outside the current file, and side-effect-only
   code. If unsure whether something is unused, flag it in the response instead of
   deleting it.

2. **Test**: Run the project's existing test suite if one exists. If no relevant tests
   cover the changed code, state that explicitly — never claim tests passed without
   running them.

   When there is no test suite, fall back to the checks the project does have and name
   which ones you ran:

   ```bash
   npm run lint    # ESLint — catches unused bindings and broken references
   npm run build   # Vite build — catches bad imports, syntax, and module resolution
   ```

   Report these as lint/build verification, not as tests.

3. **Review**: Re-read the diff for logic errors, edge cases, and consistency with
   surrounding code style before presenting the change as complete.

4. **Debug on failure**: If a test fails or an error surfaces, fix it. Then give a
   short summary covering what broke, the root cause, and the fix applied — a few
   sentences, not a full changelog.

## Examples

**Example 1 — clean run**
> User: "Add a debounce to the search input."
> Agent implements the change, removes an unused `useRef` left over from a prior
> attempt, runs the test suite (3/3 pass), and reports: "Added debounce, removed an
> unused ref, tests pass."

**Example 2 — failure and fix**
> User: "Refactor the checkout total calculator."
> Agent refactors, runs tests, 1 of 12 fails. Agent fixes a rounding bug introduced by
> the refactor and reports: "Fixed — the refactor dropped a `toFixed(2)` call, causing
> a rounding mismatch in the tax line. Re-ran tests, all 12 pass now."
