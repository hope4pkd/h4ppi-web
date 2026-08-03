# Hope4PKD operational MVP restructure

> **Implementation status, 2026-08-02 — this document describes the target platform, not what is built.**
> `client/` is currently a **front-end-only** application: Supabase, the `/api` route handlers, the admin
> console, Paystack, Resend, Turnstile and all forms were deleted (recoverable from git at `cacf25b`). The
> operational service will be rebuilt in a separate top-level `server/` folder, and this spec is what it
> must satisfy. In the meantime every backend-dependent affordance is a non-navigating "Coming soon"
> marker. See [PLAN.md](../../PLAN.md) for per-phase status.

Version: `1.0.0-draft`  
Last updated: 2026-07-18  
Owner: Hope4PKD Patients Initiative  
Status: implementation foundation complete; production approvals and external services pending

This package is the versioned operating record for the Hope4PKD website restructure. It documents the information architecture, journeys, responsive layouts, visual system, security boundary, deployment gates, verification plan and content still required from Hope4PKD.

The application stays on Next.js App Router, TypeScript, Chakra UI v3, GitHub and Vercel. Supabase, Resend, Cloudflare Turnstile, Paystack and a DPA-approved malware-scanning service are integrated behind feature gates. No gate should be enabled merely because code exists.

## Documents

- [Information architecture](./information-architecture.md)
- [User and operational flows](./user-flows.md)
- [Responsive wireframes](./responsive-wireframes.md)
- [Design system](./design-system.md)
- [Security and privacy model](./security-and-privacy.md)
- [Deployment and rollback](./deployment.md)
- [Test plan](./test-plan.md)
- [Outstanding content and approvals](./content-needs.md)

## Release map

1. Credibility and working intake: public restructure, secure minimal-data forms, initial admin queue, content/legal gates and SEO.
2. Secure patient operations: invitation-only onboarding, consent, quarantine uploads, case operations, status verification, role enforcement and audit.
3. Funding and transparency: verified campaigns, Paystack, receipts, allocations, disbursements, reports and finance controls.
4. Growth and content operations: medical publishing, events, volunteer/partnership operations, advanced reporting and privacy-safe analytics.

The repository currently fails closed when a service, policy, owner or approval is missing. See `content-needs.md` before any production flag change.
