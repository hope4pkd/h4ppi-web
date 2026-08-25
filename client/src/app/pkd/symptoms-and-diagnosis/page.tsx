import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ContentSection,
  FeatureGrid,
  FeatureItem,
  PageHero,
  SectionHeading,
  TextLink,
} from "@/components/common/PublicPage";
import { SourceNote } from "@/components/common/SourceNote";
import { Layout } from "@/components/layout/Layout";
import { pkdDiagnosis, pkdSource, pkdSymptoms } from "@/content/pkd";

export const metadata: Metadata = {
  title: "PKD symptoms and diagnosis",
  description:
    "Symptoms people with polycystic kidney disease may notice, when to speak with a healthcare professional and the scans used for diagnosis.",
  alternates: { canonical: "/pkd/symptoms-and-diagnosis" },
};

export default function PkdSymptomsAndDiagnosisPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Learn about PKD"
        title="Symptoms and diagnosis"
        description="PKD can develop for years without obvious symptoms. This page covers what people may notice and the scans clinicians use to diagnose it."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/pkd/treatment-and-care">Treatment and care</ActionLink>
          <TextLink href="/pkd" surface="dark">
            Back to what PKD is
          </TextLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <SectionHeading
          eyebrow="Symptoms"
          title="Symptoms people may notice."
          description="Cysts can grow for years before anything is obvious, so several of these turn up at a routine appointment rather than being reported. Having one of them does not mean you have PKD."
        />
        {/* Two continuous hairline lists rather than a gapped grid: the rule between rows is the list. */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={0} columnGap={{ base: 0, md: 12 }}>
          {pkdSymptoms.map((symptom) => (
            <Box key={symptom} layerStyle="hairline" py={4}>
              <Text textStyle="body" color="navy.700">
                {symptom}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </ContentSection>

      <ContentSection tone="pink">
        <SectionHeading eyebrow="When to ask" title="When to speak with a healthcare professional." />
        <VStack align="start" gap={5} color="navy.700" textStyle="lede" maxW="measure">
          <Text>
            Book an appointment for symptoms such as persistent pain in the side or back, blood in the urine,
            or blood pressure that stays high.
          </Text>
          <Text>
            Ask about screening if a parent, brother, sister or child has been diagnosed with PKD, even when
            you have no symptoms.
          </Text>
          <Text textStyle="bodySm" color="navy.500">
            Hope4PKD is not a clinical or emergency service. For urgent symptoms, contact a qualified
            healthcare provider or an appropriate local emergency service.
          </Text>
        </VStack>
      </ContentSection>

      <ContentSection tone="white">
        <SectionHeading
          eyebrow="Diagnosis"
          title="Scans help confirm PKD."
          description="A clinician considers the number and size of kidney cysts alongside your age and family history. Ultrasound is usually the first scan."
        />
        <FeatureGrid columns={3}>
          {pkdDiagnosis.map((test) => (
            <FeatureItem key={test.title} title={test.title}>
              {test.description}
            </FeatureItem>
          ))}
        </FeatureGrid>
        <SourceNote publisher={pkdSource.publisher} title={pkdSource.title} href={pkdSource.href} />
      </ContentSection>

      <ContentSection tone="navy">
        <SectionHeading
          eyebrow="The support gap"
          title="A diagnosis still leaves practical questions."
          description="After diagnosis, families may still need help finding information, coordinating providers, verifying costs and following through. Hope4PKD is developing that support pathway in Nigeria."
          surface="dark"
        />
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/support" surface="dark">
            See the support pathway
          </ActionLink>
          <ActionLink href="/pkd/treatment-and-care" variant="outline" surface="dark">
            Treatment and care
          </ActionLink>
        </HStack>
      </ContentSection>
    </Layout>
  );
}
