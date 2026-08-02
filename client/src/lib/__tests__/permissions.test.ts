import { describe, expect, it } from "vitest";
import { roleCan } from "@/lib/permissions";
import { publicCaseStatusLabel } from "@/lib/case-status";

describe("role permissions", () => {
  it("prevents finance staff from medical documents", () => expect(roleCan("finance_officer", "access_medical_documents")).toBe(false));
  it("prevents communications staff from case management", () => expect(roleCan("communications_officer", "manage_assigned_case")).toBe(false));
  it("allows an auditor to view audit events without finance mutation", () => { expect(roleCan("read_only_auditor", "view_audit")).toBe(true); expect(roleCan("read_only_auditor", "manage_finance")).toBe(false); });
});

describe("public case labels", () => {
  it("does not expose a decline reason", () => expect(publicCaseStatusLabel("declined")).toBe("Review complete"));
  it("does not expose an internal hold", () => expect(publicCaseStatusLabel("on_hold")).toBe("Assessment in progress"));
});
