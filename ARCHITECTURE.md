# ARCHITECTURE.md — key decisions (mini ADRs)

Decisions read from the code of the `restructure` working tree. Reasons marked
**(inferred — confirm with owner)** were not documented anywhere; treat them as best-guess rationale.

> **2026-08-02: `client/` is front-end only.** ADR-3 through ADR-8 described a Supabase/Paystack/Resend
> backend that has been deleted. They are kept below as **superseded**, because the service will be rebuilt
> in a separate top-level `server/` folder and these are the constraints it must honour. Nothing in
> `client/` may implement them today.

## ADR-1: Next.js App Router, server-first pages, Chakra at the leaves

- **Decision:** Pages under `client/src/app/` are server components by default; `"use client"` appears only
  on interactive leaves (currently only the header nav and the error boundary). Chakra v3 renders via a
  single `ChakraProvider` in `components/ui/provider.tsx`, mounted once in `app/layout.tsx`.
- **Why:** SEO/metadata per route and minimal client JS for a content-heavy NGO site. *(inferred — confirm with owner)*
- **Consequences:** Every page exports `Metadata` with a canonical URL. New interactivity must be pushed
  into a small client component, not by converting a whole page. Since the backend was removed every route
  prerenders statically — no route sets `dynamic = "force-dynamic"`, and none should without a reason.

## ADR-2: Shared page kit instead of per-page section components

- **Decision:** The old `components/<page-name>/` section dirs were deleted. Public pages compose the
  primitives in `components/common/PublicPage.tsx` inside `components/layout/Layout.tsx` (Header/main/Footer).
  Legal pages render data from `content/policies.ts` through `components/legal/`.
- **Why:** ~45 routes with one visual system; per-page components caused drift. *(inferred — confirm with owner)*
- **Consequences:** A new page is mostly composition + copy. Extending the kit changes every page — flag first.

## ADR-3: Env-readiness feature gating, fail closed *(SUPERSEDED 2026-08-02)*

- **Was:** every operational feature was gated by a readiness function in `lib/env.ts` checking its env-var
  set; missing config meant a 503 and an honest `EmptyState`.
- **Now:** there is no config to check. `lib/env.ts` retains only `siteUrl()`. Features that need the
  service render a `ComingSoonPanel`/`ComingSoonAction` unconditionally (ADR-3b).
- **If the service returns:** re-introduce readiness gating rather than defaulting a feature to "on".

## ADR-3b: Backend-dependent affordances are non-navigating "Coming soon" markers

- **Decision:** a control that cannot work does not navigate, submit, or exist as a disabled button. Three
  primitives in `components/common/PublicPage.tsx`: `ComingSoonTag` (pill), `ComingSoonPanel` (card, replaces
  a form) and `ComingSoonAction` (replaces an `ActionLink`). Nav entries use `comingSoon: true` with no
  `href` (see `lib/navigation.ts`); Header renders them as `Menu.Item disabled`, Footer as plain text.
- **Why:** a CTA that navigates only to a "not configured" page wastes the click and reads as broken. The
  marker states the truth in place. `ComingSoonAction` is a styled `<span>`, not `<button disabled>`,
  because the button recipe in `theme.ts` defines no `_disabled` state and a dead button advertises an
  affordance that never fires; a span also stays out of the tab order and the a11y tree as a control.
- **Consequences:** `EmptyState` still means "this list is legitimately empty"; `ComingSoonPanel` means
  "this needs a server we do not have". Do not use `EmptyState` with a dead `actionHref` for the latter.
- **Distinguishing rule used when the backend was removed:** a route with real static content was kept and
  stays linked (`/support`, `/donate`, `/contact`, `/partner`, `/volunteer`, `/complaints`, `/campaigns`,
  `/knowledge`). A route whose entire body was a gate was deleted (`/support/request`, `/case-status`,
  `/onboarding/[token]`, both `/confirmation` pages, the `[slug]` detail routes, `/admin/**`, `/api/**`).

## ADR-4: Three Supabase clients with strict separation *(SUPERSEDED 2026-08-02 — deleted)*

- **Was:** `lib/supabase/client.ts` (browser anon), `server.ts` (SSR cookie session), `admin.ts`
  (service-role, `server-only`); all returned `null` when unconfigured.
- **Constraint to carry forward:** the service-role key must never reach a client bundle. In the new
  `server/` folder that separation is enforced by the process boundary rather than by import discipline.

## ADR-5: One API-route pipeline for public intake *(SUPERSEDED 2026-08-02 — deleted)*

- **Was:** readiness gate → JSON parse → honeypot (`website`) → HMAC-fingerprinted rate limit → Turnstile
  verify → Zod parse → service-role insert → Resend email → `email_outbox` row with dedup key.
- **Constraint to carry forward:** this order, and hashing IPs rather than storing them, for any intake
  endpoint the new service exposes. Email failure must not fail the request.

## ADR-6: Uncontrolled forms posting JSON to API routes *(SUPERSEDED 2026-08-02 — deleted)*

- **Was:** `components/forms/` used native `FormData` → JSON → `/api/*`, server-side Zod as the single
  validator, redirect to `/confirmation?reference=`.
- **Constraint to carry forward:** no form library (react-hook-form/formik); the server stays the validator.
  `client/` currently ships **zero** forms.

## ADR-7: Payments via Paystack initialize + signed webhook *(SUPERSEDED 2026-08-02 — deleted)*

- **Was:** server-initialised checkout, amounts in NGN minor units, `x-paystack-signature` verified,
  webhook the only path to "confirmed".
- **Constraint to carry forward:** never trust a client callback for payment status. `/donate` currently
  states this intent in copy and ends in a `ComingSoonPanel`; `content/policies.ts` still commits to it.

## ADR-8: Admin console behind a server-side auth chain *(SUPERSEDED 2026-08-02 — deleted)*

- **Was:** session → MFA `aal2` → active `staff_profiles` row → `AdminShell`; 7-role map in `lib/permissions.ts`.
- **Constraint to carry forward:** staff handle sensitive case data, so MFA and a role check are minimums.
  There is no `/admin` route in `client/` today and none should be added there.

## ADR-9: Content integrity enforced by script

- **Decision:** `scripts/check-content.mjs` regex-scans `src/` for forbidden copy (fake phone numbers,
  Unsplash hotlinks, unverified prices/locations/claims, organ-donor registration copy, dead legacy
  `/patients/*`–`/donors/*` links, placeholder bank accounts) and fails `npm run check`.
- **Why:** A health charity's credibility dies on invented facts; automation catches regressions.
- **Consequences:** Placeholder content must be an `EmptyState`, not plausible-looking fake data.

## Data flow summary

There is no data flow. Every route in `client/` is statically prerendered from source; the only runtime
input is the URL. Nothing is read from or written to any store, and no request leaves the origin.

## Open questions

- Stack, hosting and API shape of the future top-level `server/` folder.
- Which deleted capability returns first (support intake, enquiries, or donations), and whether the client
  calls it directly or through a BFF layer.
- Whether the deleted migration (`client/supabase/migrations/202607180001_operational_mvp.sql` at commit
  `cacf25b`) is the starting point for that service's schema or gets redesigned.
