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

## ADR-12: Every published page and control works; placeholders are removed *(supersedes ADR-3b, 2026-11-11)*

- **Decision:** the public site renders no "Coming soon" marker and no "not open yet" panel. A feature
  that needs the missing service is handled one of three ways: (1) an **email route** — `EmailPanel` in
  the kit, a mailto to the registered address with the subject filled in (`/support`, `/volunteer`,
  `/partner`, `/complaints`, `/donate`, `/for/health-professionals`); (2) **left out** — the control or
  box is deleted and the explanation stays as plain copy (`/find-care`, `/community`); (3) **unpublished**
  — the route becomes a redirect and leaves the nav, footer, sitemap and all in-page links (`/shop`,
  `/events`, `/campaigns` → `/get-involved`; `/knowledge` → `/pkd`). These four are HTTP 307
  redirects declared in `redirects()` in `client/next.config.ts` and have no `page.tsx`: a `redirect()`
  call in a page streams a 200 with an empty shell under the root `loading.tsx` and only forwards in the
  browser, so a crawler without JavaScript sees nothing.
- **Donations:** there is no Donate button in the header, drawer, footer lead block or homepage, and
  `donateLink` is gone. `/donate` ("Give") says the site takes no online payment and offers the email
  route. Bank details may appear only for an account in the organisation's registered name.
- **Why:** a Google for Nonprofits readiness crawl flagged twelve placeholder pages; Google's website
  policy rejects pages and controls that do not work, and names dead donation buttons specifically.
- **Consequences:** the three `ComingSoon*` primitives and the `ComingSoonNavItem` type stay in the code
  with no call sites, for when `server/` exists; do not render them without the owner's say-so.
  `navigation.test.ts` fails on a coming-soon footer entry or a link to an unpublished route, and the e2e
  spec asserts no "Coming soon" text and a correct mailto on each enquiry page. `EmptyState` is unchanged
  and still used on `/about`, `/about/leadership`, `/impact` and `/awareness`.

## ADR-3b: Backend-dependent affordances are non-navigating "Coming soon" markers *(SUPERSEDED 2026-11-11 by ADR-12)*

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

## ADR-11: Flat five-link nav, two persistent buttons, hub pages underneath *(supersedes ADR-10)*

- **Decision (2026-09-28):** the header is one row: the logo, five flat links — About `/about`,
  Understanding PKD `/pkd`, Get Support `/support`, Get Involved `/get-involved`, Transparency `/impact` —
  and two buttons that stay visible on every page (outline "Get support", solid "Donate"). There are no
  dropdowns and no audience bar. `lib/navigation.ts` exports `primaryLinks`, `supportLink`, `donateLink`
  and six `footerGroups`; the `NavGroup.columns`/`featured` machinery and `isActiveGroup` are gone.
  Built from the owner's desktop mockups (Home, Get Support), themselves built from a five-audience table.
- **Why:** every top-level item now answers one visitor question (who are you / what is PKD / can you help
  me / how can I help / can I trust you), and each lands on a hub page that lists its own sub-pages, so the
  header carries no second level. Audience routing moved onto the page: Home opens with a "Where would you
  like to start?" `DirectoryList` of the five audiences, and the footer's "Start here" column repeats it.
- **Consequences:**
  - The `/for/*` hubs stay as pages and keep their sitemap priority; they are reached from Home and the
    footer, not the header. `Contact` lives in the drawer and the footer.
  - Every sub-page must appear in a `footerGroups` column or it becomes unreachable from the chrome —
    `navigation.test.ts` asserts every primary href is mirrored there, and the e2e footer test spot-checks.
  - The two `comingSoon` support entries (Request Support, Check Case Status) now live only in the footer's
    Get Support column; the header has nothing that cannot be clicked.
  - `/get-involved` is new (a hub). `/advocacy` is a redirect alias to `/awareness`, which carries the
    advocacy section. Stories & News is deliberately absent until there is content.
  - The mockups' palette (cream/amber, Public Sans) was **not** adopted; layout, IA and copy were. Their
    bracketed placeholders and unverifiable claims (medical review, direct-to-hospital payment, response
    window, phone/email, RC number, report date) render as `SourceNote`, `ComingSoon*` or `EmptyState`.

## ADR-10: Audience-first IA — an audience bar above the nav, mega panels inside it *(SUPERSEDED 2026-09-28 by ADR-11)*

- **Decision (2026-08-25):** the header carries two rows. A slim `<nav aria-label="Audience navigation">`
  routes by *who the reader is* — `/for/patients`, `/for/caregivers`, `/for/health-professionals`,
  `/for/everyone` — plus Contact. Below it the sticky primary row holds five dropdown triggers whose
  panels render sub-headed columns (`NavGroup.columns`) and an optional featured card (`NavGroup.featured`).
  Modelled on pkdcure.org at the owner's request.
- **Why:** with one entry point, every visitor had to work out which of four menus was theirs, and there
  was no route at all for "I am a caregiver, where do I start". Columns also lift the cap on destinations
  per group: `Get Support` now carries five links plus its two coming-soon entries without becoming a
  fourteen-item list.
- **Consequences:**
  - `Contact` moved to the audience bar and `Home` off the desktop row entirely (it stays at the top of
    the mobile drawer). Five triggers plus the Donate pill is the whole width budget at `lg` — measured at
    1440px, the row occupies one line with no wrap. Adding a sixth trigger means removing something.
  - The audience bar sits **outside** the sticky `<header>`, so it scrolls away. Keeping it pinned would
    cost 44px of every screen; collapsing it on scroll would leave focusable links inside a zero-height
    box. Scrolling away needs no transition and traps nothing.
  - The bar is hidden below `lg`. The drawer opens with a "Find your starting point" block carrying the
    same four routes, and `footerGroups[0]` ("Start here") carries them a second time, so a phone never
    loses them.
  - `NavGroup.items` is **derived** from `columns` by `columnedGroup()`. The footer, `sitemap.ts` and
    `navigation.test.ts` all read the flat list; maintaining a second hand-written copy would drift.
    A group with no `columns` (About) still renders as the plain list it always did — that path is live,
    not vestigial.
  - Audience routes are `/for/*`. `scripts/check-content.mjs` fails the build on hrefs under the old
    top-level patients/donors segments, and `/patients` is already a redirect to `/support`.

## Data flow summary

There is no data flow. Every route in `client/` is statically prerendered from source; the only runtime
input is the URL. Nothing is read from or written to any store, and no request leaves the origin.

## Open questions

- Stack, hosting and API shape of the future top-level `server/` folder.
- Which deleted capability returns first (support intake, enquiries, or donations), and whether the client
  calls it directly or through a BFF layer.
- Whether the deleted migration (`client/supabase/migrations/202607180001_operational_mvp.sql` at commit
  `cacf25b`) is the starting point for that service's schema or gets redesigned.
