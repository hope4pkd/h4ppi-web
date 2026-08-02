import { describe, expect, it } from "vitest";
import { supportRequestSchema } from "@/lib/validation";

const valid = { firstName: "Ada", lastName: "Okafor", email: "ada@example.com", phone: "+234 800 123 4567", state: "Lagos", relationship: "self", diagnosisStatus: "confirmed", supportNeed: "navigation", summary: "I need help understanding the support pathway.", contactConsent: true, privacyConsent: true, website: "" };

describe("support request validation", () => {
  it("accepts the minimal support request", () => expect(supportRequestSchema.safeParse(valid).success).toBe(true));
  it("requires both consent acknowledgements", () => expect(supportRequestSchema.safeParse({ ...valid, privacyConsent: false }).success).toBe(false));
  it("rejects honeypot content", () => expect(supportRequestSchema.safeParse({ ...valid, website: "spam.example" }).success).toBe(false));
  it("limits the initial summary", () => expect(supportRequestSchema.safeParse({ ...valid, summary: "x".repeat(1201) }).success).toBe(false));
});
