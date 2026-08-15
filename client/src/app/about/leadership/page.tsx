import { Grid, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ContentSection,
  EmptyState,
  FeatureGrid,
  FeatureItem,
  PageHero,
  SectionHeading,
  TextLink,
} from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Leadership & governance",
  description:
    "How Hope4PKD governs decisions about cases, money and publication — and what must be approved before leadership profiles and registration details are published.",
  alternates: { canonical: "/about/leadership" },
};

/**
 * Deliberately a short page. Naming a board or publishing biographies before Hope4PKD has approved them
 * would be exactly the invented credibility the content check exists to prevent, so this page publishes
 * the governance rules — which are real and already written down — and states plainly what is pending.
 */
export default function LeadershipPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Leadership & governance"
        title="Who decides, and what constrains them."
        description="Hope4PKD handles medical information, patient consent and other people’s money. Governance is not paperwork around that work — it is the work."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/impact">See the transparency framework</ActionLink>
          <TextLink href="/policies/privacy" surface="dark">
            Read the policy suite
          </TextLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="How decisions are made" title="No single person moves a case alone." />
          <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
            <Text>
              Eligibility, medical verification and financial approval are three separate decisions taken by
              different roles. Access follows least privilege and case assignment, so reviewing one part of a
              case does not open the rest of it.
            </Text>
            <Text>
              Sensitive actions generate append-only records with actor, reason and time. That trail is what
              makes a decision reviewable later — including by the patient it concerns.
            </Text>
          </VStack>
        </Grid>
      </ContentSection>

      <ContentSection tone="teal">
        <SectionHeading
          eyebrow="Standing rules"
          title="The constraints that do not move."
          description="These are in force now and shape everything the service will be allowed to do when it is built."
        />
        <FeatureGrid columns={3}>
          <FeatureItem title="Separation of duties">
            Medical and programme roles review different parts of a case, and neither approves the funding
            that follows.
          </FeatureItem>
          <FeatureItem title="Declared interests">
            Leaders, staff, reviewers and relevant volunteers declare actual, potential and perceived
            conflicts on appointment and whenever circumstances change.
          </FeatureItem>
          <FeatureItem title="Recusal">
            A conflicted person does not access, influence or approve the affected decision unless a
            documented lawful exception applies.
          </FeatureItem>
          <FeatureItem title="Consent before publication">
            Identity level, story approval and consent version are recorded for every published case, and
            public pages read from an approved projection rather than case records.
          </FeatureItem>
          <FeatureItem title="Financial separation">
            Donations, fees, allocations, disbursements and refunds are recorded separately, never as one
            number.
          </FeatureItem>
          <FeatureItem title="Policy gates">
            Donations, refunds, campaign surplus and public reporting stay switched off until their approved
            policies exist.
          </FeatureItem>
        </FeatureGrid>
      </ContentSection>

      <ContentSection>
        <SectionHeading
          eyebrow="What is still pending"
          title="Names come last, not first."
          description="Photographs and roles exist internally. They stay there until the people in them have approved how they are described publicly."
        />
        <EmptyState
          title="Leadership profiles are under organisational review"
          description="The site will not imply a constituted advisory board or publish incomplete biographies. Registration details, governance documents, declared conflicts and approved profiles will appear here when confirmed."
          actionLabel="Read the conflict of interest policy"
          actionHref="/conflict-of-interest"
        />
      </ContentSection>
    </Layout>
  );
}
