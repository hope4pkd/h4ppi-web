# CLAUDE.md

**Read [AGENTS.md](AGENTS.md) first — it is the primary anchor.** Then follow the document map there:
[CONVENTIONS.md](CONVENTIONS.md) before writing code, [DESIGN_SPEC.md](DESIGN_SPEC.md) before touching UI,
[ARCHITECTURE.md](ARCHITECTURE.md) before touching page structure or navigation, [PLAN.md](PLAN.md) for
status, and append to [DECISIONS.log](DECISIONS.log) before any meaningful change.

**`client/` is front-end only (since 2026-08-02).** No Supabase, no `/api` routes, no forms, no admin
console, no `middleware.ts`, no `'use server'`. The service will be rebuilt in a separate top-level
`server/` folder. Do not add a backend here — if a feature needs one, give it an email route
(`EmailPanel`) or leave it unpublished, and flag it. No "Coming soon" markers on the public site (ADR-12).

## Commands (always from `client/`)

```bash
cd client
npm run dev       # dev server at http://localhost:3000
npm run check     # lint + typecheck + vitest + content check + build — run before declaring done
npm run test:e2e  # Playwright
```

## Claude-specific notes

- **Chakra UI v3, not v2.** Do not import Card, FormControl, FormLabel, Stepper, Radio, RadioGroup,
  Checkbox, Avatar, Progress, Alert, List, Select, or InputLeftElement from `@chakra-ui/react` — they
  don't exist in v3 and this is the most common hallucination in this repo. Replacements are in
  CONVENTIONS.md ("Components & styling").
- Style only with theme tokens from `client/src/lib/theme.ts` (`navy.*`, `teal.*`, `action.*`, `pink.*`,
  `canvas.50`). Tailwind/`cn()`/react-icons/next-themes are installed but forbidden (see AGENTS.md contract).
- Never write plausible-looking placeholder facts (phone numbers, prices, event details, bank accounts) —
  `client/scripts/check-content.mjs` fails the build on them. Use `EmptyState` instead.
- `EmptyState` = "this list is legitimately empty". `EmailPanel` = "the form is not built, email us
  instead". `ComingSoonPanel` / `ComingSoonAction` / `ComingSoonTag` still exist but have no call sites
  since 2026-11-11 and must not be rendered — see ARCHITECTURE.md ADR-12. No Donate button anywhere.
- The `restructure` branch working tree is canonical and largely uncommitted — do not "clean up" deleted
  files or revert working-tree changes based on git history.
