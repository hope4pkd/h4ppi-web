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
    "How Hope4PKD governs decisions about cases, money and publication, and which governance documents are still to be published.",
  alternates: { canonical: "/about/leadership" },
};

/**
 * Deliberately a short page. The team is named on /about, from content/team.ts. Naming a board or
 * publishing biographies before Hope4PKD has approved them would be exactly
 * the invented credibility the content check exists to prevent, so this page publishes the governance
 * rules — which are real and already written down — and states plainly what is pending.
 */
export default function LeadershipPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Leadership & governance"
        title="How Hope4PKD separates authority."
        description="Governance determines who can access medical information, approve patient stories and authorise the use of donated money."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/impact">See the transparency framework</ActionLink>
          <TextLink href="/policies/privacy">
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
              different roles. Staff can access only the part of a case their role and assignment require.
            </Text>
            <Text>
              Sensitive actions create a permanent record of who acted, why and when. The record allows later
              review, including by the patient the decision concerns.
            </Text>
          </VStack>
        </Grid>
      </ContentSection>

      <ContentSection tone="teal">
        <SectionHeading
          eyebrow="Standing rules"
          title="Rules that apply to every decision."
          description="These rules apply now and will constrain the service when it is built."
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
          title="Documents and biographies still to come."
          description="The leadership team is named on the About page. A biography is added once the person it describes has approved the wording."
        />
        <EmptyState
          title="Governance documents are not published yet"
          description="Governance documents, declared conflicts and advisor profiles will appear here when confirmed."
          actionLabel="Read the conflict of interest policy"
          actionHref="/conflict-of-interest"
        />
        <TextLink href="/about#team">Meet the team</TextLink>
      </ContentSection>
    </Layout>
  );
}
