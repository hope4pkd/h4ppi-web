import { Grid, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ContentSection,
  FeatureCard,
  FeatureGrid,
  FeatureItem,
  PageHero,
  SectionHeading,
  StatementBand,
  TextLink,
} from "@/components/common/PublicPage";
import { SourceNote } from "@/components/common/SourceNote";
import { Layout } from "@/components/layout/Layout";
import { pkdComplications, pkdSource, pkdTreatments } from "@/content/pkd";

export const metadata: Metadata = {
  title: "PKD treatment and care",
  description:
    "What treatment can do about cyst growth, blood pressure, pain, infection and kidney failure in polycystic kidney disease, and the complications ongoing care watches for.",
  alternates: { canonical: "/pkd/treatment-and-care" },
};

export default function PkdTreatmentAndCarePage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Learn about PKD"
        title="Treatment and care"
        description="PKD has no cure yet, but treatment can slow kidney damage and manage complications. Starting care early matters."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/support">Get support</ActionLink>
          <TextLink href="/pkd/symptoms-and-diagnosis">
            Symptoms and diagnosis
          </TextLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="Treatment" title="Protect kidney function and manage complications." />
          <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
            <Text>
              Treatment aims to slow kidney damage and manage complications as they appear. It does not
              remove the cysts, but it can help the kidneys work for longer.
            </Text>
            <Text>
              A healthcare professional should guide medicines, diet and pain relief using current kidney
              test results.
            </Text>
          </VStack>
        </Grid>
        <FeatureGrid columns={2}>
          {pkdTreatments.map((treatment) => (
            <FeatureCard key={treatment.title} title={treatment.title} description={treatment.description} />
          ))}
        </FeatureGrid>
      </ContentSection>

      <ContentSection tone="teal">
        <SectionHeading
          eyebrow="Ongoing care"
          title="Complications that ongoing care monitors."
          description="People experience different complications. Regular monitoring helps a healthcare professional find and treat them earlier."
        />
        <FeatureGrid columns={3}>
          {pkdComplications.map((complication) => (
            <FeatureItem key={complication.title} title={complication.title}>
              {complication.description}
            </FeatureItem>
          ))}
        </FeatureGrid>
      </ContentSection>

      <ContentSection tone="pink" size="compact">
        <VStack align="start" gap={5} maxW="measure">
          <SectionHeading eyebrow="Before you change anything" title="Check the painkillers." />
          <Text textStyle="lede" color="navy.700">
            Some anti-inflammatory painkillers can worsen kidney function. Ask a qualified professional who
            knows your results about pain relief, blood pressure medicines, diet changes, pregnancy plans,
            dialysis and transplantation.
          </Text>
          <TextLink href="/medical-disclaimer">Read our medical disclaimer</TextLink>
        </VStack>
      </ContentSection>

      <ContentSection size="compact">
        <SourceNote publisher={pkdSource.publisher} title={pkdSource.title} href={pkdSource.href} />
      </ContentSection>

      <StatementBand
        eyebrow="The access gap"
        statement="Access to treatment depends on the system around the patient."
      >
        <Text textStyle="lede" color="navy.100" maxW="measure">
          Monitoring, medicines, dialysis and transplantation require somewhere to ask questions, someone to
          verify a need and a way to fund care without placing the full burden on one family. Hope4PKD is
          developing that pathway in Nigeria with consent, verification and transparent reporting.
        </Text>
        <HStack gap={3} flexWrap="wrap" pt={2}>
          <ActionLink href="/support" surface="dark">
            See the support pathway
          </ActionLink>
          <ActionLink href="/donate" variant="outline" surface="dark">
            Support the work
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
