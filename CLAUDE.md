# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

All application code lives in `client/` — a Next.js 15 (App Router) site for the Hope4PKD Initiative (patient support for Polycystic Kidney Disease in Nigeria). Run all commands from `client/`.

## Commands

```bash
cd client
npm run dev     # dev server at http://localhost:3000
npm run build   # production build
npm run lint    # ESLint (next lint)
```

There is no test framework configured.

## Architecture

- **Pages** (`src/app/*/page.tsx`) are thin server components: each wraps a list of page-specific section components in the shared `Layout` (Header + main + Footer) from `src/components/layout/`.
- **Section components** live in `src/components/<page-name>/` (home, patients, donors, campaigns) and are marked `"use client"` since they use Chakra UI.
- **Theming**: Chakra UI v3 custom system in `src/lib/theme.ts` — `brand.*` (health green, primary) and `accent.*` (hope orange) color tokens, Poppins fonts, light-mode-only semantic tokens, and a custom button recipe (`variant="solid" | "outline"`). The system is provided app-wide via `src/components/ui/provider.tsx`, mounted in `src/app/layout.tsx`.
- **Path aliases**: `@/*` → `src/*`, `@public/*` → `public/*`.

## Chakra UI v3 (not v2)

This project uses Chakra UI **v3**, which removed many v2 components. Do not import Card, FormControl, FormLabel, Stepper, Radio, RadioGroup, Checkbox, Avatar, Progress, Alert, List, Select, or InputLeftElement from `@chakra-ui/react` — they don't exist in v3. The codebase replaces Card with a styled `Box` (`rounded="xl" shadow="md" border="1px solid" borderColor="gray.200"`). Prefer brand/accent theme tokens over hardcoded colors. (`client/fix-components.js` is a one-off v2→v3 migration script, not part of the app.)
