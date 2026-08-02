import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryAcknowledgement, sendSafeOperationsAlert } from "@/lib/email";
import { enquiryReadiness } from "@/lib/env";
import { consumeRateLimit, verifyTurnstile } from "@/lib/request-security";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { enquirySchema } from "@/lib/validation";

export const runtime = "nodejs";

const responseHeaders = { "cache-control": "no-store, max-age=0" };

export async function POST(request: NextRequest) {
  if (!enquiryReadiness().enabled) return NextResponse.json({ message: "Secure messaging is not active yet." }, { status: 503, headers: responseHeaders });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "The request body is invalid." }, { status: 400, headers: responseHeaders });
  }

  if (typeof body.website === "string" && body.website.length > 0) return NextResponse.json({ message: "Message received." }, { headers: responseHeaders });
  if (!(await consumeRateLimit(request, "enquiry", 5, 20))) return NextResponse.json({ message: "Too many attempts. Please wait before trying again." }, { status: 429, headers: responseHeaders });
  if (!(await verifyTurnstile(String(body.turnstileToken || ""), request))) return NextResponse.json({ message: "Please complete the spam-protection check." }, { status: 400, headers: responseHeaders });

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "Check the form and try again." }, { status: 422, headers: responseHeaders });

  const admin = getSupabaseAdminClient();
  if (!admin) return NextResponse.json({ message: "Secure messaging is not configured." }, { status: 503, headers: responseHeaders });

  const input = parsed.data;
  const { data, error } = await admin.from("enquiries").insert({
    name: input.name,
    email: input.email.toLowerCase(),
    organisation: input.organisation || null,
    category: input.category,
    message: input.message,
    privacy_consent: input.privacyConsent,
    consent_version: "privacy-2026-07",
  }).select("id, reference").single();

  if (error || !data) return NextResponse.json({ message: "We could not store your message. No submission was completed." }, { status: 500, headers: responseHeaders });

  const [acknowledgement, alert] = await Promise.all([
    sendEnquiryAcknowledgement({ to: input.email, name: input.name, reference: data.reference, enquiryId: data.id }),
    sendSafeOperationsAlert({ subject: `New ${input.category} enquiry — ${data.reference}`, reference: data.reference, id: data.id, kind: "enquiry" }),
  ]);

  await admin.from("email_outbox").insert([
    { deduplication_key: `enquiry-acknowledgement/${data.id}`, kind: "enquiry_acknowledgement", record_id: data.id, recipient: input.email.toLowerCase(), status: acknowledgement.queued ? "sent" : "pending", last_error: acknowledgement.error || null },
    { deduplication_key: `enquiry-operations-alert/${data.id}`, kind: "operations_alert", record_id: data.id, recipient: process.env.OPERATIONS_EMAIL!, status: alert.queued ? "sent" : "pending", last_error: alert.error || null },
  ]);

  return NextResponse.json({ reference: data.reference }, { status: 201, headers: responseHeaders });
}
