import "server-only";

import { createHmac } from "node:crypto";
import type { NextRequest } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

function requestAddress(request: NextRequest) {
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function requestFingerprint(request: NextRequest) {
  const secret = process.env.REQUEST_HASH_SECRET;
  if (!secret) throw new Error("REQUEST_HASH_SECRET is not configured");
  return createHmac("sha256", secret).update(requestAddress(request)).digest("hex");
}

export async function verifyTurnstile(token: string, request: NextRequest) {
  if (!process.env.TURNSTILE_SECRET_KEY || !token) return false;
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: requestAddress(request),
    }),
    cache: "no-store",
  });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function consumeRateLimit(request: NextRequest, scope: string, limit = 5, windowMinutes = 15) {
  const admin = getSupabaseAdminClient();
  if (!admin) return false;
  const { data, error } = await admin.rpc("consume_rate_limit", {
    p_fingerprint: requestFingerprint(request),
    p_scope: scope,
    p_limit: limit,
    p_window_minutes: windowMinutes,
  });
  return !error && data === true;
}
