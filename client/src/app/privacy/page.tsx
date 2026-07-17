import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Hope4PKD Initiative",
  description:
    "How the Hope4PKD Initiative collects, uses, and protects the personal and health information of patients, supporters, and partners in Nigeria.",
};

// TODO: This policy is a template pending legal review — have it reviewed by
// counsel familiar with the NDPR before launch.
const sections: LegalSection[] = [
  {
    heading: "Introduction",
    body: [
      "The Hope4PKD Initiative (\"Hope4PKD\", \"we\", \"us\") is a patient support ecosystem for individuals living with Polycystic Kidney Disease (PKD) in Nigeria. We are committed to protecting the privacy and dignity of every patient, family member, supporter, and partner who interacts with us.",
      "This Privacy Policy explains what information we collect, how we use it, who we share it with, and the choices you have. By using our website or services, you agree to the practices described here.",
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "Contact information: your name, email address, phone number, and location when you register, contact us, or support a patient.",
      "Health information: if you register as a patient, we collect medical information — including diagnosis details, medical records, and treatment history — solely to verify your case and coordinate appropriate support. Health information is treated as sensitive personal data and handled with heightened care.",
      "Support information: records of contributions, partnership enquiries, and campaign participation.",
      "Technical information: standard log data such as browser type and pages visited, used to keep the website secure and improve it.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "We use personal information to verify patient cases through our medical verification process, coordinate care navigation and financial support, respond to enquiries, keep supporters informed about the impact of their contributions, and meet our legal obligations.",
      "We do not sell personal information, and we do not use patient health information for marketing.",
    ],
  },
  {
    heading: "Data Protection & the NDPR",
    body: [
      "We process personal data in line with the Nigeria Data Protection Regulation (NDPR) and the Nigeria Data Protection Act. We apply appropriate technical and organisational safeguards — including access controls and confidentiality obligations for everyone who handles patient information — to protect data against unauthorised access, loss, or misuse.",
      "We retain personal information only for as long as needed to provide support, satisfy legal requirements, or resolve disputes.",
    ],
  },
  {
    heading: "Sharing with Verified Medical Partners",
    body: [
      "To verify cases and coordinate care, we may share relevant patient information with verified healthcare institutions and medical professionals we partner with. We share only what is necessary for verification and care coordination, and our partners are required to protect it.",
      "We may also disclose information where required by law or to protect the safety of a patient or the public.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "Under the NDPR you have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion where we no longer have a lawful basis to keep it, object to or restrict certain processing, and withdraw consent at any time.",
      "To exercise any of these rights, contact us using the details below. We will respond within the timelines required by law.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have questions about this Privacy Policy or how your information is handled, please reach out through our Contact page or write to us at hello@hope4pkd.org.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <Layout>
      <LegalPage
        title="Privacy Policy"
        lastUpdated="July 2026"
        intro="Your trust matters to us. This policy describes how Hope4PKD collects, uses, and protects your personal and health information."
        sections={sections}
      />
    </Layout>
  );
}
