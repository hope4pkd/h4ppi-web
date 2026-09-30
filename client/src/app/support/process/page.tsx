import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ComingSoonPanel,
  ContentSection,
  FeatureGrid,
  FeatureItem,
  Ledger,
  LedgerRow,
  PageHero,
  SectionHeading,
  TextLink,
} from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Patient support process",
  description:
    "What happens at each stage of a Hope4PKD support case: how eligibility, medical verification and financial approval are decided separately, what information is asked for, and what a decision means.",
  alternates: { canonical: "/support/process" },
};

const decisions = [
  {
    title: "Approved",
    description:
      "A support plan is agreed, delivered through the case pathway, and followed up after the support has been provided.",
  },
  {
    title: "On hold",
    description:
      "The case stays open while Hope4PKD waits for missing information or programme capacity. The person who submitted it is told why it is on hold.",
  },
  {
    title: "Declined",
    description:
      "Hope4PKD cannot meet this need through its programme. Reasons stay internal and are communicated with safe, respectful wording, with a review route where one applies.",
  },
  {
    title: "Withdrawn",
    description:
      "The patient or Hope4PKD can withdraw a case. Public status views never expose the reason behind an internal decision.",
  },
];

export default function SupportProcessPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Get support"
        title="What happens at each stage."
        description="The six stages describe how a case moves. This page explains the decision made at each stage, who makes it and what the outcome means."
      >
        <TextLink href="/support">
          Back to how we help
        </TextLink>
      </PageHero>

      <ContentSection>
        <SectionHeading
          eyebrow="Three separate decisions"
          title="Eligibility, verification and funding are decided separately."
          description="Separating them prevents a request from becoming a funding promise. A case can still receive navigation or guidance when financial support is unavailable."
        />
        <Ledger>
          <LedgerRow number="01" title="Eligibility">
            Whether Hope4PKD is an appropriate pathway at all, based on geographic scope, relationship to PKD,
            evidence requirements, programme capacity and any exclusions. A request may be appropriate for
            navigation and guidance even when financial support is unavailable.
          </LedgerRow>
          <LedgerRow number="02" title="Medical verification">
            A qualified review of the clinical picture, carried out separately from the programme decision and
            without exposing private records to anyone who does not need them.
          </LedgerRow>
          <LedgerRow number="03" title="Financial approval">
            Costs are validated, then allocation and disbursement are recorded separately. Submitting a
            request never creates a funding commitment, and neither does passing the first two gates.
          </LedgerRow>
        </Ledger>
      </ContentSection>

      <ContentSection tone="teal">
        <SectionHeading
          eyebrow="What we ask for, and when"
          title="Collect only what each decision needs."
          description="Hope4PKD requests information only when it is needed for a decision."
        />
        <FeatureGrid columns={3}>
          <FeatureItem number="01" title="At the first request">
            Contact details, your relationship to the patient, broad diagnosis status and the kind of help you
            are seeking. No files, and no medical records.
          </FeatureItem>
          <FeatureItem number="02" title="After a secure invitation">
            Consent records and case details through a protected onboarding flow, where progress can be saved
            rather than completed in one sitting.
          </FeatureItem>
          <FeatureItem number="03" title="Only once invited">
            Permitted documents go into private storage that scans files before staff can access them.
            Hope4PKD will not accept documents through the contact form, social media or email.
          </FeatureItem>
        </FeatureGrid>
      </ContentSection>

      <ContentSection tone="white">
        <SectionHeading
          eyebrow="What a decision means"
          title="Four possible outcomes."
          description="Hope4PKD communicates each outcome directly."
        />
        <VStack align="stretch" gap={0}>
          {decisions.map((decision) => (
            <Box key={decision.title} layerStyle="hairline" py={5}>
              <VStack align="start" gap={2} maxW="measure">
                <Text textStyle="featureTitle" color="navy.900">
                  {decision.title}
                </Text>
                <Text textStyle="body" color="navy.500">
                  {decision.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </VStack>
      </ContentSection>

      <ContentSection tone="pink">
        <SectionHeading
          eyebrow="Still being approved"
          title="Requirements before intake can open."
          description="Intake requires approved eligibility rules, response standards and a named programme owner before the form can open."
        />
        <HStack gap={3} flexWrap="wrap">
          <TextLink href="/patient-eligibility">Read the eligibility policy</TextLink>
          <TextLink href="/help">Patient and caregiver resources</TextLink>
        </HStack>
        <ComingSoonPanel
          title="Support requests are not open yet"
          description="The intake described on this page needs an operational service. No case submission is available on this site today. This page will say when intake opens."
        />
      </ContentSection>
    </Layout>
  );
}
