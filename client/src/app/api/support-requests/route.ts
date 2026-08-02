import { NextRequest, NextResponse } from "next/server";
import { sendSafeOperationsAlert, sendSupportAcknowledgement } from "@/lib/email";
import { supportIntakeReadiness } from "@/lib/env";
import { consumeRateLimit, verifyTurnstile } from "@/lib/request-security";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { supportRequestSchema } from "@/lib/validation";

export const runtime = "nodejs";

const responseHeaders = { "cache-control": "no-store, max-age=0" };

export async function POST(request: NextRequest) {
  const readiness = supportIntakeReadiness();
  if (!readiness.enabled) return NextResponse.json({ message: "Support intake is not active yet." }, { status: 503, headers: responseHeaders });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "The request body is invalid." }, { status: 400, headers: responseHeaders });
  }

  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ message: "Request received." }, { status: 200, headers: responseHeaders });
  }

  const allowed = await consumeRateLimit(request, "support-request", 4, 30);
  if (!allowed) return NextResponse.json({ message: "Too many attempts. Please wait before trying again." }, { status: 429, headers: responseHeaders });

  const turnstileValid = await verifyTurnstile(String(body.turnstileToken || ""), request);
  if (!turnstileValid) return NextResponse.json({ message: "Please complete the spam-protection check." }, { status: 400, headers: responseHeaders });

  const parsed = supportRequestSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "Check the form and try again." }, { status: 422, headers: responseHeaders });

  const admin = getSupabaseAdminClient();
  if (!admin) return NextResponse.json({ message: "Support intake is not configured." }, { status: 503, headers: responseHeaders });

  const input = parsed.data;
  const { data, error } = await admin
    .from("support_requests")
    .insert({
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email.toLowerCase(),
      phone: input.phone,
      state: input.state,
      relationship: input.relationship,
      diagnosis_status: input.diagnosisStatus,
      support_need: input.supportNeed,
      summary: input.summary,
      contact_consent: input.contactConsent,
      privacy_consent: input.privacyConsent,
      consent_version: "privacy-2026-07",
      source: "website",
    })
    .select("id, reference")
    .single();

  if (error || !data) return NextResponse.json({ message: "We could not store your request. No submission was completed." }, { status: 500, headers: responseHeaders });

  const [acknowledgement, alert] = await Promise.all([
    sendSupportAcknowledgement({ to: input.email, firstName: input.firstName, reference: data.reference, requestId: data.id }),
    sendSafeOperationsAlert({ subject: `New support request — ${data.reference}`, reference: data.reference, id: data.id, kind: "support" }),
  ]);

  await admin.from("email_outbox").insert([
    { deduplication_key: `support-acknowledgement/${data.id}`, kind: "support_acknowledgement", record_id: data.id, recipient: input.email.toLowerCase(), status: acknowledgement.queued ? "sent" : "pending", last_error: acknowledgement.error || null },
    { deduplication_key: `support-operations-alert/${data.id}`, kind: "operations_alert", record_id: data.id, recipient: process.env.OPERATIONS_EMAIL!, status: alert.queued ? "sent" : "pending", last_error: alert.error || null },
  ]);

  return NextResponse.json({ reference: data.reference }, { status: 201, headers: responseHeaders });
}
