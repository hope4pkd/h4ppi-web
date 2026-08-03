# PLAN.md — phase status

Status pulled from the working tree on 2026-08-02. Update markers as work lands.
Legend: **Done** = built and passing `npm run check` · **In Progress** = built but partial or unversioned ·
**Not Started** = stub, EmptyState/ComingSoon placeholder, or absent.

> **2026-08-02 — the backend was deleted.** `client/` is now a strictly front-end application. Supabase,
> the six `/api` routes, the admin console, Paystack, Resend, Turnstile and all forms are gone (recoverable
> from git at `cacf25b`). Phases 2–5 below are therefore **Not Started in `client/`** and blocked on a new
> service that will live in a separate top-level `server/` folder. Anything needing a server renders a
> non-navigating "Coming soon" marker.

## Phase 0 — Foundation & rebrand — **Done**

- [Done] "Warm Sky Editorial" rebrand: theme tokens, Gabarito/Newsreader fonts, new logo assets.
- [Done] Shared page kit (`PublicPage.tsx`), Layout/Header/Footer, skip link, a11y base styles.
- [Done] Old brochure architecture removed (per-page component dirs deleted, dead routes redirected).
- [Done] Security headers, robots/sitemap/manifest, per-page metadata with canonicals.
- [Done] Quality gates: eslint, typecheck, vitest (navigation), content-integrity script, Playwright e2e.
  `npm run check` runs them all. Every route prerenders statically.

## Phase 1 — Public information site — **Done** (content caveats below)

- [Done] 34 public routes: home, about (+ founder story), help, contact, donate, support, campaigns,
  events, impact, knowledge, volunteer, partner, complaints, accessibility.
- [Done] Legal/policy suite driven by `content/policies.ts` (privacy, terms, refunds, safeguarding,
  whistleblowing, complaints, cookies, data-retention, medical disclaimer, conflict-of-interest, surplus policy).
- [Done] Alias redirects for legacy routes (e.g. `/privacy` → `/policies/privacy`, `/donors` → `/donate`).
- [Done] Backend-dependent affordances marked "Coming soon" and navigating nowhere: Request Support and
  Check Case Status (nav + `/support` hero), and the enquiry/donation panels on `/donate`, `/contact`,
  `/partner`, `/volunteer`, `/complaints`.

## Phase 2 — Operational intake — **Not Started** (blocked on `server/`)

- [Not Started] Support request flow. Form, `/api/support-requests`, acknowledgement/ops email and outbox
  all deleted 2026-08-02. `/support` explains the six-step pathway and marks the action "Coming soon".
- [Not Started] Enquiry flow. `/contact`, `/partner`, `/volunteer`, `/complaints` keep their guidance copy
  above a `ComingSoonPanel`.
- [Not Started] Case-status lookup with OTP. Route deleted; `/support` marks it "Coming soon".
- [Not Started] Database schema. The migration is available at commit `cacf25b` as a starting point.
- [Not Started] Secure document uploads — no UI, no route, no gate.

## Phase 3 — Donations & campaigns — **Not Started** (blocked on `server/`)

- [Not Started] Payments. Paystack initialize + webhook deleted. `/donate` states the intended controls
  (server-initialised, webhook-confirmed, no card storage) and ends in a `ComingSoonPanel`. The header and
  footer Donate buttons still link there.
- [Not Started] Live campaigns: `/campaigns` renders the publication standard plus "No verified campaigns
  are public yet" (e2e asserts this). The `[slug]` detail route was deleted.
- [Not Started] Events: page is an EmptyState — "no confirmed public events".
- [Not Started] Impact reporting: page shows "Pilot reporting state" placeholder posture.

## Phase 4 — Admin console — **Not Started** (deleted 2026-08-02)

- [Not Started] The whole console — auth chain, MFA, `staff_profiles` check, AdminShell, 7-role permission
  map, cases list/detail and the six stub workspaces — was removed. It was unreachable from any public page
  and entirely Supabase-dependent. Rebuild against the new service; do not re-add `/admin` to `client/`.

## Phase 5 — Knowledge centre — **Not Started**

- [Not Started] Articles: `/knowledge` lists planned collections only; "Medical review is being established".
  No article content, no reviewer accounts, no review workflow. The `[slug]` shell route was deleted.

## Cross-cutting / housekeeping

- [In Progress] **Commit the restructure.** The rebuild is still largely uncommitted. Highest-risk item in the repo.
- [Not Started] Stand up the top-level `server/` folder — stack, hosting and API shape all undecided.
- [Not Started] Remove remaining unused deps: tailwindcss, clsx, tailwind-merge (+ `cn()` in `lib/utils.ts`),
  react-icons, next-themes (owner-confirmed removal candidates, 2026-07-19). Also delete `fix-components.js`.
  *(`@supabase/*`, `resend`, `@react-email/render` and `zod` were removed 2026-08-02.)*
