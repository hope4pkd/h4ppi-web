export type PolicyKey = keyof typeof policies;

export const policies = {
  privacy: {
    title: "Privacy notice",
    summary: "How Hope4PKD intends to collect, use, protect and respect personal information across public enquiries and the patient pathway.",
    sections: [
      ["Scope", "This notice covers website enquiries, support requests, onboarding, case operations, donations and public-content consent. Hope4PKD must publish verified registration, controller and data protection officer contact details before processing begins."],
      ["Information collected", "The initial support request is limited to identity and contact details, state, relationship to the patient, broad diagnosis status, support need, a short summary and consent records. Medical records are collected only after protected onboarding is operational."],
      ["Purpose and lawful basis", "Information is used to review requests, manage consent, verify cases, coordinate approved support, prevent abuse, meet legal obligations and send safe service messages. A final lawful-basis schedule requires data protection and legal approval."],
      ["Access and sharing", "Access follows staff role and case assignment. Healthcare, payment, email, hosting, scanning and other vendors may process limited data only under approved contracts and data-processing terms. Public campaign data comes from a separate record approved through consent."],
      ["Retention and rights", "Hope4PKD will honour applicable access, correction, deletion, restriction, objection and consent-withdrawal rights. The retention schedule, request contact and approved cross-border safeguards must be published before launch."],
    ],
  },
  terms: {
    title: "Website terms",
    summary: "The rules for using Hope4PKD’s public information, support, campaign and donation services.",
    sections: [
      ["Using the website", "Visitors must use the website lawfully, provide information they are authorised to share and avoid interfering with security or other people’s access."],
      ["Support is not guaranteed", "Submitting a request does not create a clinical relationship, establish eligibility or guarantee financial or other assistance."],
      ["Information and availability", "Hope4PKD aims to keep approved information accurate but may correct, withdraw or pause content and services where verification, consent, safety or operations require it."],
      ["Campaigns and donations", "Published cases, payment services, allocations, refunds and campaign surplus remain subject to separate approved policies and provider terms."],
      ["Legal completion", "Governing law, organisational identity, liability wording, dispute route and effective date require legal approval before these terms take effect."],
    ],
  },
  "medical-disclaimer": {
    title: "Medical disclaimer",
    summary: "Hope4PKD information and navigation do not replace diagnosis, treatment or emergency care from qualified professionals.",
    sections: [
      ["Not medical advice", "Website content is general education and patient navigation. It is not a diagnosis, prescription, treatment recommendation or substitute for a clinician who knows the patient."],
      ["Emergencies", "Do not wait for a Hope4PKD response in an emergency. Contact an appropriate local emergency service or qualified healthcare provider."],
      ["Reviewed content", "A medically reviewed label will appear only with the reviewer’s name, qualification, review date, references and next-review date."],
      ["Individual decisions", "Patients should discuss symptoms, medicines, tests, diet, pregnancy, dialysis, transplantation and other clinical decisions with qualified professionals."],
    ],
  },
  accessibility: {
    title: "Accessibility statement",
    summary: "Hope4PKD’s commitment to an inclusive WCAG 2.2 AA service across content, forms and patient operations.",
    sections: [
      ["Our target", "The website is designed toward WCAG 2.2 Level AA, including keyboard operation, visible focus, labelled forms, error announcements, contrast, reflow and reduced motion."],
      ["Known limitations", "Secure onboarding, document upload and administrative workflows require accessibility testing before their production flags are enabled."],
      ["Alternative access", "Hope4PKD must approve a contact channel and ownership process for requesting content or support in an alternative format."],
      ["Review", "Automated checks are supplemented by keyboard, screen-reader and mobile testing. The statement will list its review date and unresolved issues before launch."],
    ],
  },
  safeguarding: {
    title: "Safeguarding policy",
    summary: "The principles for protecting patients, caregivers, children, vulnerable adults, volunteers and staff from harm.",
    sections: [
      ["Zero tolerance", "Abuse, exploitation, harassment, retaliation and misuse of patient access are not accepted in Hope4PKD activities or partnerships."],
      ["Safer roles", "Roles involving patient or vulnerable-person contact require defined scope, screening, training, supervision and reporting boundaries."],
      ["Reporting and escalation", "A named safeguarding lead, confidential reporting route, emergency escalation procedure and response times must be approved before relevant services launch."],
      ["Information handling", "Safeguarding information is restricted to authorised roles and shared only where necessary for safety, lawful reporting and fair investigation."],
    ],
  },
  "patient-eligibility": {
    title: "Patient eligibility policy",
    summary: "How Hope4PKD will make fair, documented and reviewable decisions about access to programme support.",
    sections: [
      ["Eligibility factors", "The final policy must define geographic scope, PKD relationship, evidence requirements, programme capacity, exclusions and any prioritisation criteria."],
      ["Assessment", "Eligibility is separate from medical verification and financial approval. A request may be appropriate for navigation even when funding is unavailable."],
      ["Decisions", "Decline, hold and withdrawal reasons remain internal and are communicated with safe, respectful wording and a clear review route where applicable."],
      ["Approval gate", "Production intake remains blocked until Hope4PKD approves realistic eligibility rules, response times and a responsible programme owner."],
    ],
  },
  donations: {
    title: "Donations policy",
    summary: "How one-time and recurring donations will be accepted, recorded, acknowledged and allocated.",
    sections: [
      ["Payment method", "Online payments will be initialised on the server and completed through Paystack-hosted checkout. Hope4PKD will not store card data."],
      ["Designations", "Donors may choose an approved public campaign or approved general fund. A designation does not bypass case, allocation or disbursement controls."],
      ["Confirmation", "Only a signature-verified payment-provider message can confirm payment, and the same message cannot record a donation twice. Receipts identify the donation and permitted allocation without disclosing patient medical details."],
      ["Fees and recurring support", "The approved policy must state fee treatment, subscription management, failed payments, cancellations, settlement and financial reporting before checkout opens."],
    ],
  },
  "conflict-of-interest": {
    title: "Conflict of interest policy",
    summary: "How decisions will be protected when personal, professional or financial interests could affect impartiality.",
    sections: [
      ["Disclosure", "Trustees, leaders, staff, reviewers and relevant volunteers must declare actual, potential and perceived conflicts when appointed and when circumstances change."],
      ["Management", "A conflicted person does not access, influence or approve the affected decision unless a documented lawful exception applies."],
      ["Records", "Declarations, recusals, mitigations and approval decisions are retained in the governance record with appropriate privacy."],
      ["Publication", "Hope4PKD must approve the conflict register owner, review cadence and public disclosure level before this policy takes effect."],
    ],
  },
  whistleblowing: {
    title: "Whistleblowing policy",
    summary: "A protected route for raising serious concerns about wrongdoing, safety, fraud, privacy or retaliation.",
    sections: [
      ["Who may report", "Staff, volunteers, contractors, partners, patients and members of the public may raise serious concerns in good faith."],
      ["Protection", "Retaliation is not accepted. Confidentiality is protected as far as possible while enabling a fair and lawful investigation."],
      ["Independent escalation", "The final policy must name an internal owner, alternative independent route, urgent escalation path and feedback standard."],
      ["Records", "Reports and investigations are access-restricted, logged and retained under a legally approved schedule."],
    ],
  },
  "data-retention": {
    title: "Data retention policy",
    summary: "How long Hope4PKD will keep different records and how secure deletion, legal holds and consent withdrawal will work.",
    sections: [
      ["Purpose limitation", "Records are retained only while needed for the stated programme, legal, safeguarding, audit or financial purpose."],
      ["Record schedule", "Separate periods must be approved for enquiries, declined requests, active and closed cases, medical documents, consent, donations, audit logs, complaints, staff access and backups."],
      ["Deletion", "Expiry triggers controlled deletion or irreversible anonymisation across primary data, storage and recoverable backups, subject to lawful holds."],
      ["Launch gate", "Medical uploads remain disabled until data protection and legal reviewers approve the retention schedule and deletion evidence process."],
    ],
  },
  refunds: {
    title: "Refund policy",
    summary: "How refund requests, payment errors, fraud concerns and completed allocations will be handled.",
    sections: [
      ["Requests", "The approved policy must define the request channel, evidence, time window and responsible finance role."],
      ["Review", "Duplicate or erroneous payments, suspected fraud, chargebacks and restricted donations require different review and recordkeeping."],
      ["Limitations", "Funds already allocated or disbursed may not be refundable except where law or the approved policy requires it."],
      ["Payment records", "Approved refunds are linked to the original provider reference and recorded separately from donations and fees."],
    ],
  },
  "campaign-surplus": {
    title: "Campaign surplus policy",
    summary: "How restricted campaign funds will be handled if needs change, a case closes or more is raised than the approved cost.",
    sections: [
      ["Before launch", "Each campaign must disclose the approved treatment of surplus, changed costs, withdrawal and inability to disburse before accepting donations."],
      ["Decision controls", "Surplus is not reassigned informally. Programme and finance owners document the permitted option under consent, donor terms and applicable law."],
      ["Public update", "Material changes are explained through an approved campaign update without disclosing private medical reasons."],
      ["Launch gate", "Campaign donations remain disabled until this policy and donor-facing wording receive legal and finance approval."],
    ],
  },
  cookies: {
    title: "Cookies notice",
    summary: "How essential session technology and any future privacy-safe analytics will be controlled.",
    sections: [
      ["Essential technology", "Secure authentication and form protection may require essential cookies or similar storage. These are limited to providing and protecting the requested service."],
      ["Analytics", "No form values, medical information, case references or one-time codes may enter analytics. Optional analytics remain off until configured and lawfully disclosed."],
      ["Choice", "A consent mechanism will be added before any non-essential technology is enabled. Refusing optional cookies must not block core public content."],
      ["Register", "The final notice will list each cookie or storage key, provider, purpose and duration."],
    ],
  },
} as const;
