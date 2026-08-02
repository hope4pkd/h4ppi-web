export const internalCaseStatuses = ["request_received", "initial_review", "onboarding_invited", "onboarding_in_progress", "medical_verification", "case_assessment", "support_planning", "support_in_progress", "follow_up", "completed", "declined", "withdrawn", "on_hold"] as const;
export type InternalCaseStatus = (typeof internalCaseStatuses)[number];

const labels: Record<InternalCaseStatus, string> = {
  request_received: "Request received",
  initial_review: "Initial review",
  onboarding_invited: "Onboarding invitation sent",
  onboarding_in_progress: "Onboarding in progress",
  medical_verification: "Medical verification",
  case_assessment: "Case assessment",
  support_planning: "Support planning",
  support_in_progress: "Support in progress",
  follow_up: "Follow-up",
  completed: "Completed",
  declined: "Review complete",
  withdrawn: "Case closed",
  on_hold: "Assessment in progress",
};

export function publicCaseStatusLabel(status: InternalCaseStatus) {
  return labels[status];
}
