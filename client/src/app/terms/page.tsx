import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Hope4PKD Initiative",
  description:
    "The terms that govern use of the Hope4PKD Initiative website and patient support services in Nigeria.",
};

// TODO: These terms are a template pending legal review — have them reviewed
// by counsel before launch.
const sections: LegalSection[] = [
  {
    heading: "Acceptance of These Terms",
    body: [
      "These Terms of Service govern your use of the Hope4PKD Initiative website and services. By accessing the website, registering as a patient, or supporting a patient, you agree to be bound by these terms. If you do not agree, please do not use our services.",
    ],
  },
  {
    heading: "Nature of Our Service",
    body: [
      "Hope4PKD is a patient support ecosystem. We coordinate patient navigation, medical verification, financial access, community support, awareness, and advocacy for individuals living with Polycystic Kidney Disease (PKD) in Nigeria.",
      "Hope4PKD does not provide medical advice, diagnosis, or treatment. Nothing on this website is a substitute for professional medical care. Always seek the advice of a qualified healthcare provider with any questions about a medical condition, and never delay seeking care because of something you read here.",
    ],
  },
  {
    heading: "Eligibility & Registration",
    body: [
      "Patient support is available to individuals living with PKD in Nigeria and their families. When registering, you agree to provide accurate, complete, and current information. Providing false or misleading information — particularly medical information — may result in removal from the programme.",
    ],
  },
  {
    heading: "Patient Verification",
    body: [
      "All patient cases go through our medical verification process before support is coordinated. By registering as a patient, you consent to the review of the medical information you provide by our verified healthcare partners for the purpose of confirming your case and assessing the support you need.",
    ],
  },
  {
    heading: "Support Contributions",
    body: [
      "Contributions made through Hope4PKD are coordinated transparently toward verified patient cases and programme operations. Contributions are voluntary and, except where required by law, non-refundable. We are committed to accounting for how support is used and will share impact updates with supporters.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Hope4PKD and its volunteers, staff, and partners are not liable for indirect, incidental, or consequential damages arising from your use of the website or services. We coordinate support in good faith but cannot guarantee specific medical or financial outcomes.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from them are subject to the exclusive jurisdiction of the Nigerian courts.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may update these terms from time to time. When we do, we will revise the “Last updated” date at the top of this page. Continued use of our services after changes take effect constitutes acceptance of the updated terms.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "Questions about these terms? Reach out through our Contact page or write to us at hello@hope4pkd.org.",
    ],
  },
];

export default function TermsPage() {
  return (
    <Layout>
      <LegalPage
        title="Terms of Service"
        lastUpdated="July 2026"
        intro="Please read these terms carefully — they explain what Hope4PKD does, what we ask of you, and the commitments we make in return."
        sections={sections}
      />
    </Layout>
  );
}
