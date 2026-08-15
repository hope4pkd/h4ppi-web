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
    "What people with polycystic kidney disease actually notice, when to ask a healthcare professional about it, and the scans that confirm a diagnosis.",
  alternates: { canonical: "/pkd/symptoms-and-diagnosis" },
};

export default function PkdSymptomsAndDiagnosisPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Learn about PKD"
        title="Symptoms and diagnosis"
        description="PKD is quiet for a long time, and then it is not. This is what people notice, and how a clinician turns that into an answer."
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
          title="What people actually notice."
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
        <SectionHeading eyebrow="When to ask" title="Two reasons to book an appointment." />
        <VStack align="start" gap={5} color="navy.700" textStyle="lede" maxW="measure">
          <Text>
            The first is symptoms — particularly persistent pain in the side or back, blood in the urine, or
            blood pressure that keeps reading high.
          </Text>
          <Text>
            The second needs no symptoms at all. If a parent, brother, sister or child has been diagnosed with
            PKD, ask a healthcare professional about screening. That conversation is the single most useful
            thing a family can do after one member is diagnosed.
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
          title="Imaging is what confirms it."
          description="A clinician looks for the number and size of cysts in the kidneys, read against your age and family history. Ultrasound is usually where that starts."
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
          eyebrow="What Hope4PKD is solving"
          title="Knowing is not the same as being able to act."
          description="Understanding the condition is where the journey starts. What families in Nigeria then run into is a scattered path — goodwill in moments, but no consistent system to verify a need, coordinate help and follow through. That gap is the work."
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
