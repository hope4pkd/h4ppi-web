import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackSignature } from "@/lib/paystack";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type PaystackEvent = {
  event: string;
  data: {
    reference?: string;
    amount?: number;
    currency?: string;
    fees?: number;
    paid_at?: string;
    subscription_code?: string;
    status?: string;
    metadata?: Record<string, string>;
  };
};

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!verifyPaystackSignature(rawBody, request.headers.get("x-paystack-signature"))) return new NextResponse("Invalid signature", { status: 401 });
  const event = JSON.parse(rawBody) as PaystackEvent;
  const admin = getSupabaseAdminClient();
  if (!admin) return new NextResponse("Not configured", { status: 503 });

  if (event.event === "charge.success" && event.data.reference) {
    const { data: donation } = await admin.from("donations").select("id, amount_minor, currency, status").eq("provider_reference", event.data.reference).maybeSingle();
    if (donation && donation.amount_minor === event.data.amount && donation.currency === event.data.currency) {
      await admin.from("donations").update({ status: "confirmed", fee_minor: event.data.fees || 0, confirmed_at: event.data.paid_at || new Date().toISOString(), provider_payload: event.data }).eq("id", donation.id).neq("status", "confirmed");
      await admin.from("audit_events").insert({ event_type: "payment.confirmed", entity_type: "donation", entity_id: donation.id, metadata: { provider: "paystack", reference: event.data.reference } });
    }
  }

  if ((event.event === "subscription.disable" || event.event === "subscription.not_renew") && event.data.subscription_code) {
    await admin.from("subscriptions").update({ status: "inactive" }).eq("provider_subscription_code", event.data.subscription_code);
  }

  return new NextResponse("OK", { status: 200 });
}
