# Deployment and rollback

> **Implementation status, 2026-08-02 — this document describes the target platform, not what is built.**
> `client/` is currently a **front-end-only** application: Supabase, the `/api` route handlers, the admin
> console, Paystack, Resend, Turnstile and all forms were deleted (recoverable from git at `cacf25b`). The
> operational service will be rebuilt in a separate top-level `server/` folder, and this spec is what it
> must satisfy. In the meantime every backend-dependent affordance is a non-navigating "Coming soon"
> marker. See [PLAN.md](../../PLAN.md) for per-phase status.

> None of the provisioning steps below have been performed, and `client/.env.example` now contains only
> `NEXT_PUBLIC_SITE_URL`. Treat this file as the runbook for standing the service up, not a description of it.

Version: `1.0.0-draft`

## Environments

Use separate Supabase projects and Paystack test/live modes. Vercel preview deployments point only to staging services. Production secrets must never be copied into preview environments.

## Required variables

The canonical list is `client/.env.example`. Public feature flags default to `false`. Server-only values include the Supabase service role, Resend key and routing, Turnstile secret, request-HMAC secret, Paystack secret, optional approved monthly plan and scanner webhook secret.

## Staging deployment

1. Review dependency and secret scans.
2. Create the London staging Supabase project after the cross-border design review.
3. Review and apply `client/supabase/migrations/202607180001_operational_mvp.sql`.
4. Create the first super administrator out of band; require TOTP.
5. Configure verified Resend sender, operations route and Turnstile.
6. Deploy a Vercel preview with all patient, upload, campaign and donation flags off.
7. Run unit, content-integrity, build, browser, accessibility and negative-security checks.
8. Test backup creation and restore into a disposable project.
9. Enable one staging feature at a time only after its gate checklist is signed.

## Production gate

- Legal/DPO approval and official organisation/controller details.
- DPIA, DPAs and cross-border safeguards.
- Approved response window, eligibility, safeguarding and complaints owners.
- Staff invitation, role and MFA test.
- Monitoring for email, payment, scanning, webhook and backup failures.
- Paystack live verification, settlement account, fee, refund, surplus and finance approval.
- Real consented cases and campaigns; no copied staging records.
- Migration review and rollback notes.
- Content integrity and dead-link check.

## Rollback

The immediate safe rollback is to turn the affected public feature flag off and redeploy the last known-good Vercel build. Do not roll back a database migration destructively. Create a forward repair migration, preserve audit and finance records, and restore from backup only under the incident procedure. Payment webhooks must continue to return deterministic responses during a public checkout rollback.

## Monitoring

Alert on repeated form failures, email outbox retries, scanner errors, rejected document signatures, webhook forgery, payment amount mismatches, backup failures, elevated unauthorised access and feature-flag changes. Logs use record IDs and provider references only where needed; they do not contain medical or form text.
