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
- [Done] Learn About PKD section (2026-08-15): `/pkd`, `/pkd/symptoms-and-diagnosis`, `/pkd/treatment-and-care`,
  copy in `content/pkd.ts`, each page closing with `SourceNote` (external source named, no reviewed label).
- [Done] Navbar restructured to the owner's IA (2026-08-15): Home | About | Learn About PKD | Get Support |
  Get Involved | Contact | Donate. New pages `/about/leadership` and `/support/process`; `/help` relabelled
  "Patient & Caregiver Resources". Not in the nav and not yet written: **Our Ecosystem**, **Living With PKD**
  — both need source material from the owner (see DECISIONS.log 2026-08-15).
- [Done] **Audience-first IA (2026-08-25).** Header gained an audience bar (`/for/patients`,
  `/for/caregivers`, `/for/health-professionals`, `/for/everyone`) and five column-grouped mega panels
  (About | Learn About PKD | Get Support | Get Involved | Campaigns); Contact moved to the bar, Home to
  the drawer. Nine new routes: the four audience hubs plus `/pkd/early-detection`, `/find-care`,
  `/community`, `/awareness`, `/shop`. See ADR-10 and DECISIONS.log 2026-08-25.
- [Done] **Flat IA from the owner's mockups (2026-09-28).** Header is five flat links (About | Understanding
  PKD | Get Support | Get Involved | Transparency) plus persistent Get support + Donate buttons; the audience
  bar and mega panels are gone (ADR-11 supersedes ADR-10). Home rebuilt to the mockup order (hero, "Where
  would you like to start?", What is PKD + SourceNote, four kinds of help, how it works, our story, trust
  you can check, donate band). `/support` rebuilt to the Get Support mockup with the request form as a
  `ComingSoonPanel`. New `/get-involved` hub; `/about` carries the five challenges and mission/vision;
  `/impact` is titled Transparency; `/awareness` is "Awareness & Advocacy" with `/advocacy` as an alias.
  Stories & News deferred until content exists.
- [Done] **UI refinement and copy pass (2026-09-28).** Light default `PageHero` without blooms,
  sentence-case eyebrows, no icon chips, hover lifts or card shadows, serif step numerals, button radius
  `lg`, footer white logo. Home hero rebuilt with the photo as a landscape band. Copy on Home, /support,
  /about, /get-involved, SourceNote and the footer edited for AI-slop patterns; no facts added.
- [In Progress] **Team profiles (2026-11-11).** `/about#team` names the five-person leadership team from
  `content/team.ts` (name, role, photo). Still owed by the owner: biographies, a photograph for the one
  member shown as a monogram, and advisors — the `advisors` list is empty, so that block is an EmptyState.
  `/about/leadership` links to the team and lists the governance documents still pending.
- [Done] Legal/policy suite driven by `content/policies.ts` (privacy, terms, refunds, safeguarding,
  whistleblowing, complaints, cookies, data-retention, medical disclaimer, conflict-of-interest, surplus policy).
- [Done] **Cookie banner and present-tense privacy and cookies notices (2026-11-13).** `CookieBanner` (root
  layout) asks once whether YouTube video may load; the answer is in localStorage (`lib/consent.ts`), gates
  `VideoEmbed`, and can be changed on `/cookies`. The site still sets no cookies. Still owed by the owner:
  legal review of the privacy notice (the consent basis in particular), a data protection officer contact
  if one is appointed, and retention periods.
- [Done] **Google Tag Manager behind consent (2026-11-13).** `GoogleTag` loads container GTM-N54HQ7XR only
  after "Accept all", with Consent Mode defaults denied first; the in-video prompt grants video only. Still
  owed by the owner: the cookies notice names no specific Google cookies, because the container's tags are
  managed in Tag Manager — list them once the tags are set up, and confirm no tag needs ad_personalization.
- [Done] Alias redirects for legacy routes (e.g. `/privacy` → `/policies/privacy`, `/donors` → `/donate`).
- [Done] **Placeholders removed for Google for Nonprofits readiness (2026-11-11, ADR-12).** No page shows
  "Coming soon". `/contact` lists email, phone and registered address; `/support`, `/volunteer`, `/partner`,
  `/complaints`, `/donate` and `/for/health-professionals` take requests by email (`EmailPanel`); `/shop`,
  `/events`, `/campaigns` and `/knowledge` are unpublished redirects; the Donate button is gone from the
  header, footer and homepage. Still owed by the owner: a reply time, whether the phone number is on
  WhatsApp, and bank details for an account in the organisation's name if transfers are to be accepted.
  The site's email address is info@hope4pkd.org since 2026-11-12 (was the Gmail address).

## Phase 2 — Operational intake — **Not Started** (blocked on `server/`)

- [Not Started] Support request flow. Form, `/api/support-requests`, acknowledgement/ops email and outbox
  all deleted 2026-08-02. `/support` explains the pathway and takes requests by email in the interim.
- [Not Started] Enquiry flow. `/contact`, `/partner`, `/volunteer`, `/complaints` keep their guidance copy
  and take enquiries by email in the interim.
- [Not Started] Case-status lookup with OTP. Route deleted; no longer mentioned on the site.
- [Not Started] Database schema. The migration is available at commit `cacf25b` as a starting point.
- [Not Started] Secure document uploads — no UI, no route, no gate.

## Phase 3 — Donations & campaigns — **Not Started** (blocked on `server/`)

- [Not Started] Payments. Paystack initialize + webhook deleted. `/donate` states the intended controls
  (server-initialised, webhook-confirmed, no card storage) in the superseded ADR-7 only. `/donate` is now
  "Give": no online payment, an email route, and links to the money policies. No Donate button anywhere.
> **2026-11-11:** `/campaigns`, `/events`, `/shop` and `/knowledge` are unpublished redirects (ADR-12), and the
> placeholder boxes on `/find-care` and `/community` are gone. The entries below describe the pages as they
> were at HEAD `1835a0a`, which is where to restore them from.

- [Not Started] Live campaigns. `/campaigns` states the intended loop — a vetted provider nominates, a consented profile shows a photo, a short story, the approved cost and the amount raised, donors are told after an approved treatment update, and the payment goes to the provider — and still ends on "No verified campaigns are public yet". No profile card, progress bar, amount, or `[slug]` route until a real approved record exists.
- [Not Started] Events: page is an EmptyState — "no confirmed public events".
- [Not Started] **Merchandise.** `/shop` shows the six design mock-ups with no price, size or checkout and
  a `ComingSoonPanel`. Two blockers, both owner decisions: the payment service, and a **merchandise policy**
  — `content/policies.ts` covers donations, refunds and campaign surplus but not merchandise, so the page
  currently cannot state where proceeds go and deliberately says so.
- [Not Started] **Verified care directory.** `/find-care` publishes the six-point verification standard and
  an EmptyState; no facility has been verified, and no clinic name, city or facility may appear until one is.
- [Not Started] **Community channels.** `/community` publishes the five ground rules and a `ComingSoonPanel`;
  opening a channel is blocked on named moderators, a reporting route and safeguarding escalation.
- [Not Started] **Awareness materials.** `/awareness` carries the four no-budget actions and an EmptyState for
  the kit; posters and the explainer need the same medical review as the Knowledge Centre. The page quotes no
  Nigerian prevalence figure, because none is sourced.
- [Not Started] Impact reporting. `/impact` names what the first transparency document will list (each care payment, operating costs kept apart, a provider only after vetting, a link to the approved update) and still shows "No approved public reports yet".

## Phase 4 — Admin console — **Not Started** (deleted 2026-08-02)

- [Not Started] The whole console — auth chain, MFA, `staff_profiles` check, AdminShell, 7-role permission
  map, cases list/detail and the six stub workspaces — was removed. It was unreachable from any public page
  and entirely Supabase-dependent. Rebuild against the new service; do not re-add `/admin` to `client/`.

## Phase 5 — Knowledge centre — **Not Started**

- [Not Started] Articles: `/knowledge` lists planned collections only; "Medical review is being established".
  No article content, no reviewer accounts, no review workflow. The `[slug]` shell route was deleted. It now
  links out to the Learn About PKD pages so the page is not a dead end — those carry an external source and
  explicitly claim no medical review, which is what the missing workflow would grant.

## Cross-cutting / housekeeping

- [In Progress] **Commit the restructure.** The rebuild is still largely uncommitted. Highest-risk item in the repo.
- [Not Started] Stand up the top-level `server/` folder — stack, hosting and API shape all undecided.
- [Not Started] Remove remaining unused deps: tailwindcss, clsx, tailwind-merge (+ `cn()` in `lib/utils.ts`),
  react-icons, next-themes (owner-confirmed removal candidates, 2026-07-19). Also delete `fix-components.js`.
  *(`@supabase/*`, `resend`, `@react-email/render` and `zod` were removed 2026-08-02.)*
