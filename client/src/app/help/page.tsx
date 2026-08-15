import { ContentSection, FeatureCard, FeatureGrid, PageHero, SectionHeading } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

const faqs = [
  ["What is Hope4PKD?", "Hope4PKD Patients Initiative is building a coordinated support pathway for people and families navigating polycystic kidney disease in Nigeria."],
  ["Is Hope4PKD a hospital or emergency service?", "No. Hope4PKD does not diagnose, prescribe or replace qualified medical care. Urgent needs should go to an appropriate healthcare provider or emergency service."],
  ["Does a support request guarantee financial assistance?", "No. A request begins an initial review. Eligibility, verification, operational capacity and approval determine any later support."],
  ["Should I attach medical records to the first request?", "No. The short request never accepts files. Invited patients can upload permitted documents only after protected onboarding and malware scanning are operational."],
  ["Can I check a case with only its reference?", "No. Status lookup also requires a time-limited one-time code sent to the email address on the case."],
  ["Why are there no public campaigns or impact figures?", "Hope4PKD has not yet approved verified cases, consented stories or sourced programme metrics for publication. The site does not substitute fictional data."],
  ["Can I donate now?", "Online donations remain inactive until the live payment account, settlement details, finance approvals and donation, fee, refund and surplus policies are complete."],
] as const;

export const metadata: Metadata = { title: "Patient & caregiver resources", description: "Where to start as a patient or caregiver: what to read about PKD, what Hope4PKD can and cannot do, and answers to the questions people ask before sharing information.", alternates: { canonical: "/help" } };

export default function HelpPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <Layout><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /><PageHero eyebrow="Patient & caregiver resources" title="Clear answers before you share information or take action." description="Start here for what to read about PKD, what Hope4PKD can and cannot do for you today, and the questions people ask most." /><ContentSection tone="teal" size="compact"><SectionHeading eyebrow="Where to start" title="Three things worth reading first." /><FeatureGrid columns={3}><FeatureCard title="Understand the condition" description="What PKD is, what people notice, how it is diagnosed and what treatment can do — in plain language, with its source named." href="/pkd" linkLabel="Learn about PKD" /><FeatureCard title="Know how support works" description="What gets decided at each stage of a case, what information is asked for and when, and what each decision means." href="/support/process" linkLabel="Read the support process" /><FeatureCard title="Know the limits" description="Hope4PKD does not diagnose, prescribe or replace qualified care, and nothing here is medical advice about your own situation." href="/medical-disclaimer" linkLabel="Read the medical disclaimer" /></FeatureGrid></ContentSection><ContentSection><SectionHeading eyebrow="Common questions" title="Answers before you act." /><VStack align="stretch" gap={3}>{faqs.map(([question, answer]) => <Box as="details" key={question} bg="white" borderWidth="1px" borderColor="navy.100" borderRadius="xl" p={{ base: 5, md: 6 }}><Box as="summary" cursor="pointer"><Heading as="h2" display="inline" fontFamily="body" fontSize="lg">{question}</Heading></Box><Text color="navy.500" lineHeight="1.7" pt={4}>{answer}</Text></Box>)}</VStack></ContentSection></Layout>;
}
