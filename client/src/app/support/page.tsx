import { ComingSoonAction, ContentSection, FeatureGrid, FeatureItem, PageHero, SectionHeading } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Get support", description: "Learn how the Hope4PKD support request, review, onboarding, assessment, and follow-up pathway works.", alternates: { canonical: "/support" } };

export default function SupportPage() {
  return (
    <Layout>
      <PageHero eyebrow="Get support" title="A careful first step toward the right support." description="Start with a short request. Hope4PKD will collect only the minimum information needed for an initial review—never medical files at this stage.">
        <HStack gap={3} flexWrap="wrap"><ComingSoonAction>Start a request</ComingSoonAction><ComingSoonAction>Check case status</ComingSoonAction></HStack>
      </PageHero>
      <ContentSection>
        <SectionHeading eyebrow="The pathway" title="What happens after you contact us." description="A request is not a promise of financial help. It is the beginning of a structured review that identifies a safe, realistic next step." />
        <FeatureGrid columns={3}>
          <FeatureItem number="01" title="Short request">Share contact details, your relationship to the patient, broad diagnosis status and the kind of help you are seeking.</FeatureItem>
          <FeatureItem number="02" title="Initial review">Authorised staff assess whether Hope4PKD is an appropriate pathway and communicate the next step.</FeatureItem>
          <FeatureItem number="03" title="Secure invitation">Eligible requests receive an expiring invitation for passwordless onboarding when that service is operational.</FeatureItem>
          <FeatureItem number="04" title="Consent & records">Patients can save progress and upload permitted documents only into private, quarantined storage.</FeatureItem>
          <FeatureItem number="05" title="Assessment">Medical and programme reviewers verify the case, costs and suitable support without exposing private records.</FeatureItem>
          <FeatureItem number="06" title="Support & follow-up">Approved plans move through safe status updates, delivery, follow-up, completion or withdrawal.</FeatureItem>
        </FeatureGrid>
      </ContentSection>
      <ContentSection tone="pink">
        <SectionHeading eyebrow="Before you begin" title="Safety, eligibility and expectations." />
        <VStack align="stretch" gap={4} mt={8}>
          {["Hope4PKD is not an emergency or clinical service. Seek qualified medical care for urgent needs.", "Eligibility rules and the realistic response window must be approved before production intake opens.", "Do not send medical records through the short request, contact form, social media or email.", "Cases may be declined, placed on hold or withdrawn internally; public status views never expose private reasons.", "Financial support, if available, follows verification and approval and is not guaranteed by submission."].map((item) => <Box key={item} borderTopWidth="1px" borderColor="pink.500" py={4}><Text color="navy.700">{item}</Text></Box>)}
        </VStack>
      </ContentSection>
    </Layout>
  );
}
