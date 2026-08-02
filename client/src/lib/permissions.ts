export const staffRoles = ["super_administrator", "case_manager", "medical_verifier", "finance_officer", "programme_manager", "communications_officer", "read_only_auditor"] as const;
export type StaffRole = (typeof staffRoles)[number];

const permissions = {
  manage_settings: ["super_administrator"],
  assign_cases: ["super_administrator", "programme_manager"],
  manage_assigned_case: ["super_administrator", "programme_manager", "case_manager"],
  verify_medical: ["super_administrator", "medical_verifier"],
  access_medical_documents: ["super_administrator", "medical_verifier"],
  manage_finance: ["super_administrator", "finance_officer"],
  approve_campaign_programme: ["super_administrator", "programme_manager"],
  approve_campaign_finance: ["super_administrator", "finance_officer"],
  manage_public_content: ["super_administrator", "programme_manager", "communications_officer"],
  review_medical_content: ["super_administrator", "medical_verifier"],
  view_audit: ["super_administrator", "read_only_auditor"],
} as const satisfies Record<string, readonly StaffRole[]>;

export type Permission = keyof typeof permissions;

export function roleCan(role: StaffRole, permission: Permission) {
  return (permissions[permission] as readonly StaffRole[]).includes(role);
}
