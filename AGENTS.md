# AGENTS.md — Master Anchor

Read this file first, every session. It is the entry point for all AI models and developers on this repo.

## Project summary

Hope4PKD Patients Initiative (hope4pkd.org): a support platform for people navigating polycystic kidney
disease in Nigeria. Public information site — support pathway, donations explainer, campaigns, knowledge
centre, legal/policy pages — built on Next.js + Chakra UI v3.

**Current phase: front-end only.** As of 2026-08-02 the client carries **no backend**. Supabase, the six
`/api` route handlers, the staff admin console, Paystack, Resend, Turnstile and all forms were deleted
(owner decision; recoverable from git at `cacf25b`). The operational service will be rebuilt later in a
separate top-level `server/` folder. Anything that needs a server is now a non-navigating **"Coming soon"**
marker. See [PLAN.md](PLAN.md) for exact status.

## Stack (exact versions from client/package.json)

| Layer | Package | Version |
|---|---|---|
| Framework | next | 15.5.20 (App Router) |
| UI runtime | react / react-dom | 19.2.4 |
| Components | @chakra-ui/react | ^3.24.0 (v3 — NOT v2) |
| Icons | lucide-react | ^0.536.0 |
| Language | typescript | ^5 |
| Tests | vitest ^4.1.10, @playwright/test ^1.61.1 | |

Installed but **unused and forbidden** (removal candidates, do not adopt): tailwindcss ^4,
clsx, tailwind-merge (`cn()` in `lib/utils.ts` has zero call sites), react-icons, next-themes.

All commands run from `client/`:

```bash
npm run dev          # dev server
npm run check        # lint + typecheck + vitest + content check + build — THE merge gate
npm run test:e2e     # Playwright
```

## Do-not-deviate contract

1. **No new libraries.** Do not add a dependency without flagging first and recording it in DECISIONS.log.
2. **No folder restructuring.** The layout in CONVENTIONS.md is fixed. New code goes into existing dirs.
3. **No pattern changes without flagging.** New pages compose the existing `PublicPage.tsx` kit.
4. **No backend in `client/`.** No API route handlers, no `'use server'` actions, no database or email SDK,
   no `middleware.ts`. Server work belongs in the future top-level `server/` folder. If a feature needs one,
   ship the front end with a `ComingSoon*` marker and flag it.
5. **Chakra props are the only styling mechanism.** No Tailwind utility classes, no `cn()`, no CSS-in-JS
   additions, no react-icons (lucide-react only), no next-themes. (Owner decision, 2026-07-19.)
6. **Be honest about what does not work yet.** A control that cannot function must not navigate or submit.
   Use `ComingSoonAction` / `ComingSoonPanel` / `ComingSoonTag` from `components/common/PublicPage.tsx`, or
   `EmptyState` where there is simply nothing to show yet. Never fake success.
7. **Append to DECISIONS.log before any meaningful change.**
8. **Do not invent facts in user-facing copy.** `client/scripts/check-content.mjs` blocks known offenders
   (fake phone numbers, unverified claims, placeholder bank accounts, dead legacy routes) and will fail CI.

## Source-of-truth rules

- **Design tokens** live in `client/src/lib/theme.ts` (Chakra system). `client/src/app/globals.css` holds
  only five mirrored `--hope-*` CSS vars plus base/a11y styles — if you change a color, change both.
  Never hardcode hex values in components; use theme tokens (`navy.900`, `teal.500`, `action.600`, …).
- **Navigation** is `client/src/lib/navigation.ts`. Items are `NavItem = NavLink | ComingSoonNavItem`;
  a destination that needs the missing service carries `comingSoon: true` and **no** `href`. Header and
  Footer branch on `isNavLink()`. Guarded by `src/lib/__tests__/navigation.test.ts`.
- **Legal/policy copy** is data in `client/src/content/policies.ts`, rendered by `components/legal/`.
- **Clinical copy** is data in `client/src/content/pkd.ts`, rendered by the `/pkd` routes. Every page built
  from it ends with `SourceNote` — the external source is named and linked, and the page states that
  Hope4PKD has not medically reviewed it. Do not add clinical claims without a named source.
- **Copy constraints** are `client/scripts/check-content.mjs` — read it before writing user-facing text.

## Document map — when to read what

| Doc | Read when |
|---|---|
| [AGENTS.md](AGENTS.md) | Always, first. |
| [CONVENTIONS.md](CONVENTIONS.md) | Before writing or moving any code. |
| [DESIGN_SPEC.md](DESIGN_SPEC.md) | Before touching UI, styling, or adding a page/section. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Before touching page structure, navigation, or anything backend-shaped. |
| [PLAN.md](PLAN.md) | Before starting a task — know what is done, stubbed, or gated off. |
| [DECISIONS.log](DECISIONS.log) | Before and after any meaningful change (append-only). |
| [CLAUDE.md](CLAUDE.md) | Claude Code specifics only; it defers to this file. |

## Open questions (do not guess — ask the owner)

- Shape and stack of the future `server/` folder, and which deleted features return first.
- When to physically remove the remaining unused deps (tailwindcss, clsx, tailwind-merge, react-icons,
  next-themes) and the leftover `client/fix-components.js` migration script.
- Whether `/privacy` → `/policies/privacy` (and similar alias redirects) are permanent.
