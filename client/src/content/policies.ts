import { organisation, registration } from "@/content/organisation";

export type PolicyKey = keyof typeof policies;

export const policies = {
  privacy: {
    title: "Privacy notice",
    summary: "What personal information Hope4PKD receives through this website and when you contact us, what we do with it, and the rights you have over it.",
    updated: "13 November 2026",
    sections: [
      ["Who we are", `${organisation.legalName}, operating as ${organisation.brandName}, is registered in ${registration.country} with the ${registration.registrar} as an ${registration.entityType} (Registration No: ${registration.number}). We decide how the personal information described in this notice is used. For any privacy question or request, email ${registration.email}.`],
      ["What this website collects", "The website has no forms, no accounts and no online payment, and it sets no cookies of its own. It does not ask you for personal information. As with any website, the service that hosts it receives the technical details your browser sends with each page request, such as your IP address and browser type, in order to deliver the page. Your answer to the cookie banner is saved in your own browser and is not sent to us. Two optional Google services, YouTube video and Google measurement, run only if you allow them."],
      ["When you contact us", "If you email or phone us, we receive what you choose to tell us: your name, your email address or phone number, and what you say. A message about PKD may also tell us something about your health or a family member’s. Please do not send medical records or identity documents by email."],
      ["How we use it", "We use what you send to answer you and to follow up on what you asked for. We do this on the basis of your consent, which you give by contacting us and can withdraw at any time by emailing us. We do not sell personal information, we do not use it for advertising, and we do not share your story without your written consent."],
      ["YouTube video", "Our videos are hosted on YouTube, a Google service. Nothing is requested from YouTube until you allow it and press play. When a video plays, YouTube receives your IP address and may store cookies or similar data on your device, and Google’s privacy policy applies to what it does with them. The cookies notice explains the choice and how to change it."],
      ["Google measurement", "If you choose “Accept all” in the cookie banner or on the cookies notice, the website loads Google Tag Manager, a Google service, which runs the measurement tags we have set up in it. Google then receives your IP address, the pages you visit on this website and details of your browser and device, and stores cookies that let it recognise a return visit and count visits that came from our ads. We see this only as totals and trends, not as information about you by name, and we do not use it to show you personalised advertising. Nothing is loaded from Google Tag Manager unless you allow it, and the cookies notice explains how to turn it off. Google’s privacy policy applies to what it does with this information."],
      ["How long we keep it", "We keep messages only for as long as they are needed to deal with what you asked and to meet legal obligations. The data retention policy sets out the approach. You can ask us to delete your messages at any time."],
      ["Your rights", `Under the Nigeria Data Protection Act 2023 you can ask for a copy of the information we hold about you, ask us to correct or delete it, ask us to restrict how we use it, object to its use, and withdraw your consent. Email ${registration.email} to do any of these. If you are not satisfied with our answer, you can complain to the Nigeria Data Protection Commission.`],
      ["Changes to this notice", "This notice describes the website as it is today. We will revise it, and change the date below, before the website collects anything it does not collect now."],
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
    summary: "What this website stores on your device, the two optional Google services, and how to change your choice.",
    updated: "13 November 2026",
    sections: [
      ["What this website stores", "This website sets no cookies of its own and has no social media trackers. It stores one item in your browser’s local storage: your answer to the cookie banner. Two optional Google services, YouTube video and Google measurement, can store cookies or similar data on your device. Each stays off until you allow it."],
      // The key below is CONSENT_STORAGE_KEY in lib/consent.ts. Keep the two in step.
      ["Register", "Name: hope4pkd-consent. Set by: this website. Purpose: remembers which optional services you allowed, so that you are not asked on every page. Type: local storage, essential. Duration: until you change your choice or clear your browser data. It stays in your browser and is not sent to us or to anyone else."],
      ["YouTube video (optional)", "Our videos are hosted on YouTube, a Google service, and play through YouTube’s privacy-enhanced player at youtube-nocookie.com. Nothing is loaded from YouTube until you allow it and press play. When a video plays, YouTube receives your IP address and may store cookies or similar data on your device. Google’s privacy policy covers what it does with them."],
      ["Google measurement (optional)", "We use Google Tag Manager, a Google service, to run the measurement tags we have set up in it. They count visits to the website and which of our ads brought people here. Nothing is loaded from Google Tag Manager until you choose “Accept all”. Once you do, Google receives your IP address and the pages you visit, and stores Google cookies on your device to recognise a return visit and to measure visits from our ads. They are not used to show you personalised advertising. Google’s privacy policy covers what it does with them."],
      ["Your choice", "Choosing “Decline all” does not block any page. Google measurement stays off, and a video asks before it plays, with the option to open it on YouTube instead. “YouTube video only” lets videos play without switching measurement on. You can change your choice at any time with the buttons at the top of this page. Turning measurement off stops it from then on; Google cookies already stored on your device stay until they expire or you clear them in your browser."],
      ["Changes to this notice", "If the website starts using any other optional technology, it will be listed here and will stay off unless you allow it."],
    ],
  },
} as const;
