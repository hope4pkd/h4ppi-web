import { ComingSoonAction, ContentSection, FeatureGrid, FeatureItem, PageHero, SectionHeading, TextLink } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Get support", description: "Learn how Hope4PKD plans to handle support requests, review, onboarding, assessment and follow-up.", alternates: { canonical: "/support" } };

export default function SupportPage() {
  return (
    <Layout>
      <PageHero eyebrow="Get support" title="Support will start with a short, private request." description="When intake opens, Hope4PKD will collect only the information needed for an initial review. The service will accept medical files only through protected onboarding.">
        <HStack gap={3} flexWrap="wrap"><ComingSoonAction>Start a request</ComingSoonAction><ComingSoonAction>Check case status</ComingSoonAction></HStack>
      </PageHero>
      <ContentSection>
        <SectionHeading eyebrow="The pathway" title="What happens after you contact us." description="A request begins a structured review. Financial help depends on eligibility, verification and available capacity." />
        <FeatureGrid columns={3}>
          <FeatureItem number="01" title="Short request">Share contact details, your relationship to the patient, broad diagnosis status and the kind of help you are seeking.</FeatureItem>
          <FeatureItem number="02" title="Initial review">Authorised staff assess whether Hope4PKD is an appropriate pathway and communicate the next step.</FeatureItem>
          <FeatureItem number="03" title="Secure invitation">Eligible requests receive a secure onboarding link that expires when the service is operational.</FeatureItem>
          <FeatureItem number="04" title="Consent & records">Patients can save progress and upload permitted documents to private storage that scans files before staff can access them.</FeatureItem>
          <FeatureItem number="05" title="Assessment">Medical and programme reviewers verify the case, costs and suitable support without exposing private records.</FeatureItem>
          <FeatureItem number="06" title="Support & follow-up">Approved plans move through safe status updates, delivery, follow-up, completion or withdrawal.</FeatureItem>
        </FeatureGrid>
        <TextLink href="/support/process">See what gets decided at each stage</TextLink>
      </ContentSection>
      <ContentSection tone="pink">
        <SectionHeading eyebrow="Before you begin" title="Safety, eligibility and expectations." />
        <VStack align="stretch" gap={4} mt={8}>
          {["For urgent needs, contact a qualified healthcare provider or an appropriate emergency service.", "Hope4PKD must approve eligibility rules and a realistic response window before intake opens.", "Do not send medical records through the short request, contact form, social media or email.", "Cases may be declined, placed on hold or withdrawn internally; public status views never expose private reasons.", "Submitting a request does not guarantee financial support. Any funding depends on verification and approval."].map((item) => <Box key={item} borderTopWidth="1px" borderColor="pink.500" py={4}><Text color="navy.700">{item}</Text></Box>)}
        </VStack>
      </ContentSection>
    </Layout>
  );
}
