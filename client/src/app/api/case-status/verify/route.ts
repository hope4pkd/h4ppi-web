import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { consumeRateLimit } from "@/lib/request-security";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({ challengeId: z.string().uuid(), code: z.string().regex(/^\d{6}$/) });

function matches(challengeId: string, code: string, expected: string) {
  const actual = createHmac("sha256", process.env.REQUEST_HASH_SECRET!).update(`${challengeId}:${code}`).digest();
  const expectedBuffer = Buffer.from(expected, "hex");
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

export async function POST(request: NextRequest) {
  if (!process.env.REQUEST_HASH_SECRET) return NextResponse.json({ message: "Status lookup is not configured." }, { status: 503 });
  if (!(await consumeRateLimit(request, "case-status-verify", 8, 30))) return NextResponse.json({ message: "Too many attempts. Please wait before trying again." }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Enter the six-digit code." }, { status: 422 });
  const admin = getSupabaseAdminClient();
  if (!admin) return NextResponse.json({ message: "Status lookup is not configured." }, { status: 503 });

  const { data: challenge } = await admin.from("case_status_challenges").select("id, case_id, code_hash, expires_at, consumed_at, attempts").eq("id", parsed.data.challengeId).maybeSingle();
  const expired = !challenge || challenge.consumed_at || new Date(challenge.expires_at).getTime() <= Date.now() || challenge.attempts >= 5;
  if (expired || !matches(parsed.data.challengeId, parsed.data.code, challenge.code_hash)) {
    if (challenge) await admin.from("case_status_challenges").update({ attempts: challenge.attempts + 1 }).eq("id", challenge.id);
    return NextResponse.json({ message: "The code is invalid or expired." }, { status: 401, headers: { "cache-control": "no-store" } });
  }

  const { data: safeStatus, error } = await admin.from("public_case_status").select("label, status_date, next_step, contact_guidance").eq("case_id", challenge.case_id).single();
  if (error || !safeStatus) return NextResponse.json({ message: "A safe status is not available yet." }, { status: 404 });
  await admin.from("case_status_challenges").update({ consumed_at: new Date().toISOString() }).eq("id", challenge.id);
  return NextResponse.json({ status: { label: safeStatus.label, date: safeStatus.status_date, nextStep: safeStatus.next_step, contactGuidance: safeStatus.contact_guidance } }, { headers: { "cache-control": "no-store, max-age=0" } });
}
