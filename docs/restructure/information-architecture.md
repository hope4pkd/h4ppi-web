# Information architecture

> **Implementation status, 2026-08-02 — this document describes the target platform, not what is built.**
> `client/` is currently a **front-end-only** application: Supabase, the `/api` route handlers, the admin
> console, Paystack, Resend, Turnstile and all forms were deleted (recoverable from git at `cacf25b`). The
> operational service will be rebuilt in a separate top-level `server/` folder, and this spec is what it
> must satisfy. In the meantime every backend-dependent affordance is a non-navigating "Coming soon"
> marker. See [PLAN.md](../../PLAN.md) for per-phase status.

> The Internal (`/admin/*`) routes and the detail routes `/campaigns/[slug]`, `/knowledge/[slug]`,
> `/support/request`, `/case-status`, `/onboarding/[token]` and both `/confirmation` pages do not exist in
> `client/` right now — they 404.

Version: `1.0.0-draft`

## Navigation model

The desktop header presents four grouped dropdowns — About, Get Support, Learn and Get Involved — then Contact and the visually restrained Donate action. A group label is a menu trigger only; the group's landing page is the first item in its menu. Home is represented by the logo. The mobile drawer shows the same four groups as a collapsible accordion, with the group containing the current page expanded on load. Remaining destinations appear in the footer.

| Group | Routes |
| --- | --- |
| About | `/about`, `/about/founder-story`, `/impact` |
| Get Support | `/support`, `/support/request`, `/case-status`, `/help` |
| Learn | `/knowledge`, `/events` |
| Get Involved | `/campaigns`, `/volunteer`, `/partner` |
| Standalone | `/` (logo), `/contact`, `/donate` |
| Patient | `/support/confirmation`, `/onboarding/[token]`, `/case/[reference]` |
| Content | `/knowledge/[slug]`, `/campaigns/[slug]`, `/events/[slug]` |
| Footer only | `/complaints` |
| Legal | `/policies/privacy`, `/terms`, `/medical-disclaimer`, `/accessibility`, `/safeguarding`, `/patient-eligibility`, `/donations`, `/conflict-of-interest`, `/whistleblowing`, `/data-retention`, `/refunds`, `/campaign-surplus`, `/cookies` |
| Internal | `/admin`, `/admin/cases`, `/admin/cases/[id]`, `/admin/campaigns`, `/admin/donations`, `/admin/content`, `/admin/reports`, `/admin/audit`, `/admin/settings` |

Legacy `/patients`, `/donors` and `/privacy` routes redirect to their replacement destinations so existing links do not strand visitors.

## Homepage sequence

The sequence is fixed because it moves from emotional orientation to evidence and then to action:

1. Full-bleed patient/caregiver hero and three actions.
2. Four-item trust strip.
3. Five PKD journey problems.
4. Six-pillar ecosystem around the patient.
5. Five-stage support timeline.
6. Founder preview.
7. Verified campaign gate or empty state.
8. Four real support pathways.
9. Verified results separated from year-one targets.
10. Medically reviewed Knowledge Centre or review-state explanation.
11. Confirmed partners or partnership-building state.
12. Request, partner and donate closing actions.

## Visibility rules

- Empty campaign, event, partner, report and team categories use explicit approved empty states.
- Patient, medical and finance records never power public pages directly.
- A public campaign is a deliberately limited projection created only after verification and consent.
- Draft legal routes are available for review but marked `noindex` until legal/DPO approval.
- Private and transactional routes are excluded from search indexing and the public sitemap.
