import { ContentSection, PageHero } from "@/components/common/PublicPage";
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

export const metadata: Metadata = { title: "Help centre", description: "Answers about Hope4PKD support, privacy, campaigns, case status, medical information, and donations.", alternates: { canonical: "/help" } };

export default function HelpPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <Layout><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /><PageHero eyebrow="Help centre" title="Clear answers before you share information or take action." description="Start here for common questions about the patient pathway, safety, campaigns, donations and privacy." /><ContentSection><VStack align="stretch" gap={3}>{faqs.map(([question, answer]) => <Box as="details" key={question} bg="white" borderWidth="1px" borderColor="navy.100" borderRadius="xl" p={{ base: 5, md: 6 }}><Box as="summary" cursor="pointer"><Heading as="h2" display="inline" fontFamily="body" fontSize="lg">{question}</Heading></Box><Text color="navy.500" lineHeight="1.7" pt={4}>{answer}</Text></Box>)}</VStack></ContentSection></Layout>;
}
