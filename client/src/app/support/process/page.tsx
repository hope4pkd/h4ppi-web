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
      "Something needed for the decision is missing or the programme has no capacity right now. A hold is not a refusal, and it is communicated as what it is.",
  },
  {
    title: "Declined",
    description:
      "Hope4PKD is not an appropriate pathway for this need. Reasons stay internal and are communicated with safe, respectful wording, with a review route where one applies.",
  },
  {
    title: "Withdrawn",
    description:
      "A case can be withdrawn — by the patient, or internally. Public status views never expose the reason behind an internal decision.",
  },
];

export default function SupportProcessPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Get support"
        title="What happens at each stage."
        description="The six steps on the previous page are the shape of a case. This is what actually gets decided inside them, who decides it, and what each answer means."
      >
        <TextLink href="/support" surface="dark">
          Back to how we help
        </TextLink>
      </PageHero>

      <ContentSection>
        <SectionHeading
          eyebrow="Three decisions, not one"
          title="Being eligible, being verified and being funded are separate answers."
          description="Collapsing them is how a charity ends up promising what it cannot deliver. Keeping them apart is why a request can move forward even when money cannot."
        />
        <Ledger>
          <LedgerRow number="01" title="Eligibility">
            Whether Hope4PKD is an appropriate pathway at all — geographic scope, relationship to PKD,
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
          title="The minimum, in the right order."
          description="Information is collected at the point it is needed for a decision, not gathered up front in case it becomes useful."
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
            Permitted documents, into private quarantined storage after malware scanning. Never through the
            contact form, social media or email.
          </FeatureItem>
        </FeatureGrid>
      </ContentSection>

      <ContentSection tone="white">
        <SectionHeading
          eyebrow="What a decision means"
          title="Four answers, each said plainly."
          description="Whatever the outcome, it is communicated to you — a case does not go quiet."
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
          title="What has to exist before intake opens."
          description="Hope4PKD will not open a request form it cannot answer. Realistic eligibility rules, a realistic response window and a responsible programme owner are the gate on that decision, not the technology."
        />
        <HStack gap={3} flexWrap="wrap">
          <TextLink href="/patient-eligibility">Read the eligibility policy</TextLink>
          <TextLink href="/help">Patient and caregiver resources</TextLink>
        </HStack>
        <ComingSoonPanel
          title="Support requests are not open yet"
          description="The intake described on this page needs the operational service Hope4PKD is building. Nothing on this site accepts a case today — when it does, this page will say so."
        />
      </ContentSection>
    </Layout>
  );
}
