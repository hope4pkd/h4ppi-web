import { ContentSection, FaqList, FeatureCard, FeatureGrid, PageHero, SectionHeading, type Faq } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";

const faqs = [
  {
    question: "What is Hope4PKD?",
    answer: "Hope4PKD Patients Initiative is developing coordinated support for people and families navigating polycystic kidney disease in Nigeria.",
  },
  {
    question: "Is Hope4PKD a hospital or emergency service?",
    answer: "No. Hope4PKD does not diagnose, prescribe or replace qualified medical care. Urgent needs should go to an appropriate healthcare provider or emergency service.",
  },
  {
    question: "Does a support request guarantee financial assistance?",
    answer: "No. A request begins an initial review. Eligibility, verification, operational capacity and approval determine any later support.",
  },
  {
    question: "Should I attach medical records to the first request?",
    answer: "No. The short request never accepts files. Invited patients can upload permitted documents only after protected onboarding and malware scanning are operational.",
  },
  {
    question: "Can I check a case with only its reference?",
    answer: "No. Status lookup also requires a time-limited one-time code sent to the email address on the case.",
  },
  {
    question: "Why are there no public campaigns or impact figures?",
    answer: "Hope4PKD has not yet approved verified cases, consented stories or sourced programme metrics for publication. The site publishes only verified information.",
  },
  {
    question: "Can I donate now?",
    answer: "Online donations remain inactive until the live payment account, settlement details, finance approvals and donation, fee, refund and surplus policies are complete.",
  },
] as const satisfies readonly Faq[];

export const metadata: Metadata = {
  title: "Patient & caregiver resources",
  description: "PKD information, the Hope4PKD support process, medical limits and answers to common questions about sharing personal information.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <PageHero
        eyebrow="Patient & caregiver resources"
        title="Know what Hope4PKD can do before you share personal information."
        description="Read about PKD, the planned support process, Hope4PKD’s medical limits and the questions patients and caregivers ask most often."
      />

      <ContentSection tone="teal" size="compact">
        <SectionHeading eyebrow="Where to start" title="Read about PKD, support and medical limits." />
        <FeatureGrid columns={3}>
          <FeatureCard
            title="Understand the condition"
            description="What PKD is, what people notice, how clinicians diagnose it and what treatment can do, with the source named."
            href="/pkd"
            linkLabel="Learn about PKD"
          />
          <FeatureCard
            title="Know how support works"
            description="What gets decided at each stage of a case, what information is requested and what each decision means."
            href="/support/process"
            linkLabel="Read the support process"
          />
          <FeatureCard
            title="Know the limits"
            description="Hope4PKD does not diagnose, prescribe or replace qualified care. A healthcare professional should advise you about your own situation."
            href="/medical-disclaimer"
            linkLabel="Read the medical disclaimer"
          />
        </FeatureGrid>
      </ContentSection>

      <ContentSection>
        <SectionHeading eyebrow="Common questions" title="Questions about support, privacy and donations." />
        <FaqList items={faqs} />
      </ContentSection>
    </Layout>
  );
}
