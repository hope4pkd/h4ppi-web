import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { donationReadiness, siteUrl } from "@/lib/env";
import { initialisePaystackTransaction } from "@/lib/paystack";
import { consumeRateLimit } from "@/lib/request-security";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { donationInitialisationSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!donationReadiness().enabled) return NextResponse.json({ message: "Online donations are not active." }, { status: 503 });
  if (!(await consumeRateLimit(request, "payment-initialise", 6, 30))) return NextResponse.json({ message: "Too many attempts. Please wait before trying again." }, { status: 429 });
  const parsed = donationInitialisationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "Check the donation details." }, { status: 422 });

  const admin = getSupabaseAdminClient()!;
  const input = parsed.data;
  if (input.recurring && !process.env.PAYSTACK_MONTHLY_PLAN_CODE) {
    return NextResponse.json({ message: "Monthly donations are not configured." }, { status: 422 });
  }
  let campaignId: string | null = null;
  if (input.allocationKind === "campaign") {
    const { data } = await admin.from("public_campaigns").select("id").eq("slug", input.campaignSlug!).maybeSingle();
    if (!data) return NextResponse.json({ message: "That campaign is not available for donations." }, { status: 422 });
    campaignId = data.id;
  }

  const providerReference = `H4P-DON-${randomUUID()}`;
  const amountMinor = input.amountNaira * 100;
  const { data: donation, error } = await admin.from("donations").insert({
    provider_reference: providerReference,
    donor_email: input.email.toLowerCase(),
    donor_name: input.name,
    campaign_id: campaignId,
    allocation_kind: input.allocationKind,
    amount_minor: amountMinor,
    currency: "NGN",
    status: "initialised",
    provider_payload: { recurring_requested: input.recurring },
  }).select("id").single();
  if (error || !donation) return NextResponse.json({ message: "The donation could not be initialised." }, { status: 500 });

  try {
    const transaction = await initialisePaystackTransaction({
      email: input.email.toLowerCase(),
      amountMinor,
      reference: providerReference,
      callbackUrl: `${siteUrl()}/donate/confirmation?reference=${encodeURIComponent(providerReference)}`,
      metadata: { donation_id: donation.id, allocation_kind: input.allocationKind, campaign_id: campaignId || "" },
      plan: input.recurring ? process.env.PAYSTACK_MONTHLY_PLAN_CODE : undefined,
    });
    return NextResponse.json({ authorizationUrl: transaction.authorization_url }, { status: 201, headers: { "cache-control": "no-store" } });
  } catch {
    await admin.from("donations").update({ status: "failed" }).eq("id", donation.id);
    return NextResponse.json({ message: "The payment provider could not start checkout." }, { status: 502 });
  }
}
