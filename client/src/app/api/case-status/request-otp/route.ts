import { createHmac, randomInt, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { sendCaseStatusCode } from "@/lib/email";
import { hasSupabaseAdminConfig } from "@/lib/env";
import { consumeRateLimit } from "@/lib/request-security";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { statusLookupSchema } from "@/lib/validation";

export const runtime = "nodejs";

function codeHash(challengeId: string, code: string) {
  return createHmac("sha256", process.env.REQUEST_HASH_SECRET!).update(`${challengeId}:${code}`).digest("hex");
}

export async function POST(request: NextRequest) {
  if (!hasSupabaseAdminConfig() || !process.env.REQUEST_HASH_SECRET || !process.env.RESEND_API_KEY) return NextResponse.json({ message: "Status lookup is not configured." }, { status: 503 });
  if (!(await consumeRateLimit(request, "case-status-request", 5, 30))) return NextResponse.json({ message: "Too many attempts. Please wait before trying again." }, { status: 429 });
  const parsed = statusLookupSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "Check the details and try again." }, { status: 422 });

  const challengeId = randomUUID();
  const admin = getSupabaseAdminClient()!;
  const { data: caseRecord } = await admin.from("cases").select("id, patient_email").eq("reference", parsed.data.reference).eq("patient_email", parsed.data.email.toLowerCase()).maybeSingle();

  if (caseRecord) {
    const code = randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const { error } = await admin.from("case_status_challenges").insert({ id: challengeId, case_id: caseRecord.id, email: caseRecord.patient_email, code_hash: codeHash(challengeId, code), expires_at: expiresAt });
    if (!error) await sendCaseStatusCode({ to: caseRecord.patient_email, code, challengeId });
  }

  return NextResponse.json({ challengeId, message: "If the details match an active case, a code has been sent." }, { status: 202, headers: { "cache-control": "no-store" } });
}
