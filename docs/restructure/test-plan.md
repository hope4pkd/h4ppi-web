# Verification and test plan

> **Implementation status, 2026-08-02 — this document describes the target platform, not what is built.**
> `client/` is currently a **front-end-only** application: Supabase, the `/api` route handlers, the admin
> console, Paystack, Resend, Turnstile and all forms were deleted (recoverable from git at `cacf25b`). The
> operational service will be rebuilt in a separate top-level `server/` folder, and this spec is what it
> must satisfy. In the meantime every backend-dependent affordance is a non-navigating "Coming soon"
> marker. See [PLAN.md](../../PLAN.md) for per-phase status.

> The integration, RLS, OTP, invitation, outbox and Paystack cases below have nothing to run against today.
> Current automated coverage is: `src/lib/__tests__/navigation.test.ts` (vitest) and `e2e/public.spec.ts`
> (Playwright — homepage, coming-soon markers, nav shape, and 404s for the deleted routes).

Version: `1.0.0-draft`

## Automated layers

- Vitest: references, Zod schemas, consent requirements, public status mapping, staff permissions, publication gates, allocation arithmetic and webhook signature/idempotency helpers.
- Supabase integration: RLS denial by every role, AAL1 denial, assignment boundaries, OTP expiry, invitation expiry, autosave, consent versioning, quarantine state, clean-file access logging, outbox retries, campaign gates and Paystack fixtures.
- Playwright: public navigation, gated intake, support request/confirmation, onboarding, status OTP, contact categories, campaign and donation states, medical publication and each staff role.
- Content integrity: prohibited placeholder/unverified strings and legacy dead routes.
- Negative security: IDOR, reference enumeration, forged webhooks, malicious files, MIME mismatch, expired signed URLs, spam, rate limits, role escalation and medical access by finance/comms/auditor roles.

## Accessibility

Target WCAG 2.2 AA. Run axe plus manual keyboard and screen-reader checks for focus order, header menu, forms, labels, errors, status messages, colour contrast, zoom/reflow, reduced motion and authenticated workspaces. Test at 200% and 400% zoom where practical.

## Responsive matrix

| Width | Purpose |
| --- | --- |
| 360px | Narrow Android and reflow stress |
| 390px | Current mobile baseline |
| 768px | Tablet transition |
| 1280px | Standard desktop |
| 1440px | Wide editorial layout |

Run public and patient journeys under throttled mobile network and CPU conditions. Confirm inputs are 16px, interactive targets are at least 44px and no form loses state unexpectedly.

## Performance gates

Lighthouse CI targets: performance above 85, accessibility above 95, SEO above 90 and best practices above 90 at mobile and desktop widths. Inspect LCP hero optimisation, font loading, client bundle size, hydration boundaries and authenticated no-store responses.

## Release evidence

Each production gate records the commit, migration, environment, approvers, test results, known limitations and rollback build. Failed or skipped tests require an owner and explicit risk acceptance; sensitive features remain off until blocking evidence is complete.
