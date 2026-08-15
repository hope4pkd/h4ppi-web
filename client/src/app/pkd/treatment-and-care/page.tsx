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
        description="There is no cure for PKD yet. There is a great deal of care — and most of it works better the earlier it starts."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/support">Get support</ActionLink>
          <TextLink href="/pkd/symptoms-and-diagnosis" surface="dark">
            Symptoms and diagnosis
          </TextLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="Treatment" title="Not a cure. Still worth everything." />
          <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
            <Text>
              Treatment for PKD works on two fronts at once: slowing the damage, and dealing with the
              complications as they come. Neither removes the cysts, and both change how many good years the
              kidneys have.
            </Text>
            <Text>
              None of this is self-prescribed. Doses, diets and painkiller choices depend on how the kidneys
              are working right now, which only monitoring can tell you.
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
          title="What care watches for."
          description="Not everyone gets all of these, and several are treatable — which is exactly why ongoing monitoring matters more than waiting for something to go wrong."
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
            The most common everyday mistake is reaching for an anti-inflammatory painkiller. Many of them can
            worsen kidney function, so pain relief, blood pressure medicines, diet changes, pregnancy plans,
            dialysis and transplantation are all conversations to have with a qualified professional who knows
            your results — not decisions to take from a web page, including this one.
          </Text>
          <TextLink href="/medical-disclaimer">Read our medical disclaimer</TextLink>
        </VStack>
      </ContentSection>

      <ContentSection size="compact">
        <SourceNote publisher={pkdSource.publisher} title={pkdSource.title} href={pkdSource.href} />
      </ContentSection>

      <StatementBand
        eyebrow="What Hope4PKD is solving"
        statement="Knowing the treatment exists is not the same as being able to reach it."
      >
        <Text textStyle="lede" color="navy.100" maxW="measure">
          Monitoring, medicines, dialysis and transplantation all assume a system around the patient:
          somewhere to ask questions, someone to verify a need, and a way to fund care that does not collapse
          on one family. Hope4PKD is building that pathway in Nigeria — with consent, verification and
          transparency built in rather than promised later.
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
