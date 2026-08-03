# User and operational flows

> **Implementation status, 2026-08-02 — this document describes the target platform, not what is built.**
> `client/` is currently a **front-end-only** application: Supabase, the `/api` route handlers, the admin
> console, Paystack, Resend, Turnstile and all forms were deleted (recoverable from git at `cacf25b`). The
> operational service will be rebuilt in a separate top-level `server/` folder, and this spec is what it
> must satisfy. In the meantime every backend-dependent affordance is a non-navigating "Coming soon"
> marker. See [PLAN.md](../../PLAN.md) for per-phase status.

Version: `1.0.0-draft`

## Patient request and case flow

```text
Get Support
  → short request (no files)
  → server Zod validation + honeypot + Turnstile + database rate limit
  → H4P-YYYY-##### reference
  → database record + safe acknowledgement + staff alert
  → staff initial review
  → expiring, hashed onboarding invitation
  → invited-email OTP session
  → TOTP-protected staff operations
  → consent + save-and-continue onboarding
  → private resumable upload to quarantine
  → MIME, magic-byte, checksum and malware result
  → medical verification + case assessment
  → support plan, delivery, follow-up, completion or withdrawal
```

The initial form contains contact details, state, relationship, broad diagnosis status, support need, a short summary and consent. It does not accept documents. Submission does not guarantee eligibility or funding.

## Status lookup

```text
Reference + case email
  → rate-limited lookup
  → identical response whether a case matches or not
  → six-digit code delivered only for a match
  → 10-minute expiry + five-attempt maximum
  → one-time verification
  → safe label, update date, next step and contact guidance only
```

Declined, withdrawn and on-hold reasons are internal. Their public labels do not reveal the underlying decision.

## Content publication

```text
Draft → review → published → archived
```

Medical articles also require a different approved reviewer account, reviewer qualification, references, disclaimer, review date and next-review date. A database trigger rejects incomplete publication.

## Campaign publication

```text
Verified case
  + current public-story consent
  + approved identity level
  + validated cost items
  + programme approval
  + finance approval
  → limited public campaign projection
```

The trigger rejects publication if any required gate is absent.

## Donation flow

```text
Approved allocation choice
  → server validates donor input and campaign state
  → server creates local initialised donation
  → server initialises Paystack-hosted checkout
  → browser completes provider checkout
  → browser return shows pending state
  → signature-verified webhook confirms exact reference, amount and currency
  → idempotent donation update + audit event
  → receipt and acknowledgement outbox
```

The browser callback never confirms a donation. Card data never enters Hope4PKD systems.

## Enquiries

Contact, partnership, volunteer, complaint and privacy messages share validation and spam protection but retain separate categories and operational routing. Email alerts contain only the reference and secure workspace link—not the message body.
