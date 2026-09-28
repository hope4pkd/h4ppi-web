import { ContentSection, DirectoryList, DirectoryRow, EmptyState, FeatureGrid, FeatureItem, PageHero, SectionHeading } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Grid, Heading, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparency",
  description: "How Hope4PKD raises and uses funds, how patients are selected for assistance, how results are separated from targets, and when reports will be published.",
  alternates: { canonical: "/impact" },
};

export default function ImpactPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Transparency"
        title="Trust you can check."
        description="PKD support involves people’s health and people’s money. This page sets out how funds are raised and used, how patients are selected for assistance, and what Hope4PKD will report, with the reporting period, definition, method and approval beside every figure."
      />

      <ContentSection size="spacious">
        <SectionHeading eyebrow="How the money moves" title="How funds are raised and used." description="No percentage split is quoted here, because none has been audited. When one is, it will appear with its reporting period and method rather than as a slogan." />
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
          <VStack layerStyle="panelDark" align="start" gap={4}>
            <Text textStyle="eyebrow" color="brightTeal.500">Raised</Text>
            <Heading as="h3" textStyle="cardTitle" color="white">Donations and campaigns</Heading>
            <Text textStyle="body" color="navy.100">
              Funds come from individual donations and verified patient campaigns. Online donations open once payment, finance, fee, refund and surplus controls are approved; until then no bank details or checkout appear on this site.
            </Text>
          </VStack>
          <VStack layerStyle="panelTeal" align="start" gap={4}>
            <Text textStyle="eyebrow" color="action.700">Used</Text>
            <Heading as="h3" textStyle="cardTitle" color="navy.900">Patient support, recorded case by case</Heading>
            <Text textStyle="body" color="navy.700">
              Financial assistance is paid against a verified case and recorded with the provider it was paid for. Allocations and disbursements are recorded separately from donations, so the two can be reconciled and reported.
            </Text>
          </VStack>
        </Grid>
      </ContentSection>

      <ContentSection tone="white" size="spacious">
        <SectionHeading eyebrow="How patients are selected" title="Assistance follows a documented review, not a queue." />
        <DirectoryList>
          <DirectoryRow href="/patient-eligibility" title="Eligibility">
            Who can ask, how requests are prioritised, and the grounds on which a case can be declined or put on hold.
          </DirectoryRow>
          <DirectoryRow href="/support/process" title="The support process">
            What is assessed at each stage of a case, who assesses it, and what a decision at that stage means.
          </DirectoryRow>
          <DirectoryRow href="/campaigns" title="Campaign publication standard">
            Why a patient campaign goes public only after medical and cost checks and with the patient’s consent.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>

      <ContentSection tone="teal" size="spacious">
        <SectionHeading eyebrow="Control framework" title="How support and funding will be governed." />
        <FeatureGrid columns={3}>
          <FeatureItem title="Case verification">Medical and programme staff review different parts of a case. Each role can access only the information it needs.</FeatureItem>
          <FeatureItem title="Public campaign record">Campaign pages use a separate, approved record. Private medical and case data stay private.</FeatureItem>
          <FeatureItem title="Financial records">Donations, fees, allocations, disbursements, refunds and subscription status are recorded separately.</FeatureItem>
          <FeatureItem title="Consent record">Each publication keeps the approved identity level, story consent and consent version.</FeatureItem>
          <FeatureItem title="Decision record">Sensitive actions record who acted, why and when.</FeatureItem>
          <FeatureItem title="Policy approval">Donations, refunds, campaign surplus and reporting stay off until approved policies exist.</FeatureItem>
        </FeatureGrid>
      </ContentSection>

      <ContentSection>
        <SectionHeading eyebrow="Results and reports" title="Every published result needs evidence." description="Reports will separate verified results from targets, and each figure will carry its source and reporting period." />
        <EmptyState
          title="No approved public reports yet"
          description="No programme totals have been approved for publication. Registration details, governance records, independently reviewed financial reports, impact data and confirmed partners will be linked here after approval, and the first report will say whether it is annual or quarterly."
          actionLabel="Read our policy suite"
          actionHref="/policies/privacy"
        />
      </ContentSection>
    </Layout>
  );
}
