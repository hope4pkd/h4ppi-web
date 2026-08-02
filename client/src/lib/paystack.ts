import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyPaystackSignature(payload: string, signature: string | null, secret = process.env.PAYSTACK_SECRET_KEY) {
  if (!secret || !signature || !/^[a-f0-9]{128}$/i.test(signature)) return false;
  const expected = createHmac("sha512", secret).update(payload).digest();
  const actual = Buffer.from(signature, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function initialisePaystackTransaction(input: { email: string; amountMinor: number; reference: string; callbackUrl: string; metadata: Record<string, string>; plan?: string }) {
  if (!process.env.PAYSTACK_SECRET_KEY) throw new Error("Paystack is not configured");
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ email: input.email, amount: input.amountMinor, reference: input.reference, callback_url: input.callbackUrl, metadata: input.metadata, plan: input.plan }),
    cache: "no-store",
  });
  const result = (await response.json()) as { status?: boolean; message?: string; data?: { authorization_url: string; access_code: string; reference: string } };
  if (!response.ok || !result.status || !result.data) throw new Error(result.message || "Paystack initialisation failed");
  return result.data;
}
