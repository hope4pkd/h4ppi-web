import { describe, expect, it } from "vitest";
import { formatCaseReference, isCaseReference, normaliseCaseReference } from "@/lib/case-reference";

describe("case references", () => {
  it("formats a fixed-width annual reference", () => expect(formatCaseReference(2026, 42)).toBe("H4P-2026-00042"));
  it("normalises references before validation", () => expect(isCaseReference(" h4p-2026-00042 ")).toBe(true));
  it("rejects an enumerable or malformed reference", () => expect(isCaseReference("H4P-26-42")).toBe(false));
  it("normalises without changing the identifier", () => expect(normaliseCaseReference(" h4p-2026-00042 ")).toBe("H4P-2026-00042"));
});
