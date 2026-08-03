# CONVENTIONS.md

Each rule has a one-line reason. When a rule blocks you, flag it — don't silently deviate.

## Repository & folders (fixed — do not restructure)

- All app code lives in `client/`; run every command from there. *(Reason: monorepo slot reserved for future services.)*
- `src/app/` — routes only (pages, layout/error/loading, robots/sitemap/manifest). **No API route handlers** — `client/` is front-end only. *(App Router owns this tree; server work belongs in the future `server/` folder.)*
- `src/components/` — `common/` (public page kit), `layout/`, `legal/`, `home/`, `ui/` (provider). New components go in the existing bucket that matches their consumer. *(Predictable discovery. `forms/` and `admin/` were deleted with the backend, 2026-08-02.)*
- `src/lib/` — shared non-UI logic: `env.ts` (`siteUrl()` only), `navigation.ts`, `theme.ts`. *(Single home for non-UI logic.)*
- `src/content/` — structured copy data (policies). *(Copy is data, not JSX scattered in pages.)*
- `client/scripts/` — repo checks. `client/e2e/` — Playwright specs. `src/lib/__tests__/` — vitest unit tests. *(Tests sit next to what they test.)*

## Naming

- Components/files: `PascalCase.tsx` exporting named functions (no default exports outside `app/`). *(Grep-ability; App Router requires defaults only for routes.)*
- Routes: kebab-case directories (`case-status`, `medical-disclaimer`); dynamic segments `[slug]`, `[id]`, `[token]`. *(URL = folder name.)*
- Lib modules: kebab-case (`navigation.ts`, `theme.ts`); functions camelCase. *(Matches existing files.)*

## Imports

- Use `@/*` for `src/*` and `@public/*` for `public/*`; never deep relative paths (`../../`). *(Aliases are configured; relative paths break on moves.)*
- Order observed: external packages first, then `@/` imports, then types — alphabetical-ish; `import "server-only"` always first where used. *(Consistency; server-only must lead to fail fast.)*
- Icons come from `lucide-react` only. *(react-icons is unused and forbidden — see AGENTS.md contract.)*

## Components & styling

- Pages are server components unless they need state; put `"use client"` on the smallest leaf possible. *(Keeps bundles small; metadata export requires server components.)*
- Every page exports `Metadata` with `title`, `description`, and `alternates.canonical`. *(SEO baseline enforced by pattern.)*
- Public pages compose `Layout` + the `PublicPage.tsx` kit (PageHero, ContentSection, …); do not fork new hero/section variants without flagging. *(One visual system across ~45 routes.)*
- Style with Chakra v3 props and theme tokens (`navy.900`, `action.600`, `teal.50`, …). Never hardcode hex, never write Tailwind classes, never call `cn()`. *(theme.ts is the token source of truth; owner decision 2026-07-19.)*
- Chakra **v3** only — these v2 imports do not exist: Card, FormControl, FormLabel, Stepper, Radio, RadioGroup, Checkbox, Avatar, Progress, Alert, List, Select, InputLeftElement. Card = styled Box (`borderWidth="1px" borderColor="navy.100" borderRadius="2xl" bg="white"`); form fields = `Field.Root/Field.Label`; selects = native `<select className="hope-native-select">`. *(v3 removed them; the codebase has replacements.)*
- Nothing to show yet → `EmptyState`. Needs a server we do not have → `ComingSoonPanel` (in place of a form), `ComingSoonAction` (in place of an `ActionLink`), `ComingSoonTag` (inline pill). Never placeholder data that looks real, and never a CTA that navigates to a dead end. *(check-content.mjs will fail the build; trust posture — ADR-3b.)*

## Navigation

- Nav items are `NavItem = NavLink | ComingSoonNavItem` in `src/lib/navigation.ts`. A destination needing the missing service carries `comingSoon: true` and **no** `href`. *(Makes "cannot be linked" unrepresentable-as-a-link rather than an empty string.)*
- Header and Footer branch on `isNavLink(item)` and key their maps on `label`, not `href`. *(Coming-soon items have no href to key on.)*
- Desktop dropdown renders coming-soon entries as `Menu.Item disabled`; mobile drawer and footer render plain text with `ComingSoonTag`. *(Keyboard navigation must skip what cannot be activated.)*
- `src/lib/__tests__/navigation.test.ts` guards the invariant and blocks links to deleted routes. Update it when adding routes. *(The only unit test in the repo.)*

## Forms & API routes

- **There are none, by design.** `client/` ships zero forms and zero route handlers as of 2026-08-02. *(Front-end only — see AGENTS.md contract rule 4.)*
- When the `server/` folder exists, forms return as `"use client"` + native `FormData` → JSON → `fetch`, server-side validation as the single validator, no form libraries. *(ADR-6 constraint carried forward.)*
- Inputs, when they return: `minH 48px`, `fontSize 16px`, proper `autoComplete`/`inputMode`. *(a11y + iOS zoom.)*

## TypeScript

- `tsc --noEmit` must pass (`npm run typecheck`); no `any`, no `@ts-ignore`. *(It's in the merge gate.)*
- Derive types from const objects (`as const satisfies`) rather than duplicating. *(See navigation.ts.)*
- Note `as const satisfies` produces narrow tuple literals; widen to the interface type (e.g. `readonly NavGroup[]`) before `flatMap` or inference degrades to `unknown`. *(Bit the navigation test.)*
- `import "server-only"` in any module reading `process.env`. *(Build-time leak protection; currently just `env.ts`.)*

## Forbidden patterns (hard no)

- New dependencies without owner sign-off + DECISIONS.log entry. *(Contract rule 1.)*
- Tailwind utilities, `cn()`, react-icons, next-themes. *(Unused deps pending removal.)*
- Any backend in `client/`: API route handlers, `'use server'` actions, `middleware.ts`, database/email/payment SDKs. *(Front-end only until the `server/` folder exists.)*
- A control that cannot function yet being rendered as a live link, a submit button, or `<button disabled>`. *(ADR-3b — use the ComingSoon primitives.)*
- Faking success, or linking a CTA to a page whose only content is "not configured". *(Trust posture.)*
- Invented facts in copy: phone numbers, prices, locations, bank accounts, event details, medical claims. *(check-content.mjs + charity trust.)*
- Links to legacy `/patients/*` or `/donors/*` subroutes. *(Dead routes; content check blocks them.)*
- Raw IP addresses stored or logged, if request handling ever returns. *(Only HMAC fingerprints.)*

## Verification before "done"

- Run `npm run check` from `client/` (lint + typecheck + vitest + content check + build). E2e: `npm run test:e2e`. *(This is the definition of done.)*
