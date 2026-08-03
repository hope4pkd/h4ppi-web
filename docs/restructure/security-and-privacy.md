# Security and privacy model

> **Implementation status, 2026-08-02 — this document describes the target platform, not what is built.**
> `client/` is currently a **front-end-only** application: Supabase, the `/api` route handlers, the admin
> console, Paystack, Resend, Turnstile and all forms were deleted (recoverable from git at `cacf25b`). The
> operational service will be rebuilt in a separate top-level `server/` folder, and this spec is what it
> must satisfy. In the meantime every backend-dependent affordance is a non-navigating "Coming soon"
> marker. See [PLAN.md](../../PLAN.md) for per-phase status.

> With no backend, no personal data is collected, transmitted or stored by the site today. The vendor
> controls below become live obligations only when the `server/` folder exists.

Version: `1.0.0-draft`

## Core boundary

Public Server Components read only approved projections. Mutations validate on the server, use service credentials only in server-only modules and fail closed when configuration is incomplete. Browser data is never trusted to confirm payment, role, case access or publication state.

## Data tiers

1. Public: approved pages, published articles, public campaign projections and aggregate reports.
2. Operational: requests, contact details, assignments, support plans, safe status and enquiries.
3. Sensitive health: medical details, provider evidence, cost reviews and case documents.
4. Financial: donations, fees, allocations, disbursements, refunds and receipts—without card data.
5. Security/audit: authentication, MFA, invitations, signed access, audit events and incident records.

Each tier has separate tables and role policies. Communications staff cannot read health records. Finance staff can operate financial records without medical-document access. Read-only auditors do not receive medical documents by default.

## Identity and roles

- Staff accounts are invite-only.
- Passwordless email proves the invited account; TOTP MFA raises the session to AAL2.
- Server layouts reject sessions below AAL2.
- Postgres RLS independently checks `aal2` and the active staff profile.
- Assignment rules further narrow case-manager access.

## Patient access

Onboarding invitations contain high-entropy tokens; only SHA-256 hashes are stored. Invitations expire and are single-use. Case-status lookup requires reference, matching email and a six-digit code. The lookup response is identical whether or not a case exists, codes expire after ten minutes and attempts are limited.

## Documents

- PDF, JPEG and PNG only.
- 10 MB per file; planned maximum 20 files and 100 MB per case.
- Sanitised names, declared MIME, magic-byte validation, SHA-256 checksum and private paths.
- New files enter a private quarantine bucket.
- No patient or staff storage-object policy is enabled in Release 1.
- Production upload stays off until a DPA-approved scanner, DPIA, retention schedule, backup test and staff MFA are operational.
- Clean staff previews use five-minute signed URLs, `no-store`, safe download headers and an access-log event.

## External services

- Supabase: separate staging and production projects; London is the default candidate subject to cross-border DPIA and approved transfer safeguards.
- Resend: safe transactional messages with references and next steps, never medical details.
- Turnstile: spam challenge paired with a database rate-limit bucket keyed by HMAC-derived address fingerprints.
- Paystack: hosted checkout, server initialisation and signature-verified idempotent webhooks.
- Malware scanner: webhook must be authenticated; documents remain unavailable until an explicit clean result.

## Required governance before sensitive processing

Complete an NDPA/NDPC-aligned DPIA, vendor DPAs, cross-border assessment, breach plan, incident contacts, backup and restore test, retention/deletion schedule, consent withdrawal process, data-subject request route, safeguarding escalation and legal review. Structured logs must exclude PII, medical summaries, one-time codes and form values.
