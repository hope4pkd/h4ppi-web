import { Grid, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ContentSection,
  FeatureCard,
  FeatureGrid,
  PageHero,
  SectionHeading,
  StatementBand,
  TextLink,
} from "@/components/common/PublicPage";
import { SourceNote } from "@/components/common/SourceNote";
import { KidneyComparison } from "@/components/pkd/KidneyComparison";
import { Layout } from "@/components/layout/Layout";
import { pkdInBrief, pkdSource, pkdTypes } from "@/content/pkd";

export const metadata: Metadata = {
  title: "What is PKD?",
  description:
    "A plain-language guide to what polycystic kidney disease does to the kidneys, why it runs in families, and the difference between ADPKD and ARPKD.",
  alternates: { canonical: "/pkd" },
};

export default function AboutPkdPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Learn about PKD"
        title="Polycystic kidney disease in plain language."
        description="Most people meet this condition through a relative, a scan result or a word on a hospital form. This page explains what PKD does and why it runs in families."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/pkd/symptoms-and-diagnosis">Symptoms and diagnosis</ActionLink>
          <ActionLink href="/pkd/treatment-and-care" variant="outline" surface="dark">
            Treatment and care
          </ActionLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="What PKD does" title="As cysts grow, the kidneys work less well." />
          <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
            <Text>{pkdInBrief}</Text>
            <Text>
              Kidneys remove waste and extra fluid from the blood and help control blood pressure. As cysts
              take up more space, less healthy kidney tissue can do that work. High blood pressure is common
              in PKD and can damage the kidneys further if it is not treated.
            </Text>
            <Text>
              PKD is lifelong and there is no cure yet. Treatment and lifestyle changes can help protect the
              kidneys and prevent some complications, especially when high blood pressure is managed.
            </Text>
          </VStack>
        </Grid>
        <KidneyComparison />
      </ContentSection>

      <ContentSection tone="teal">
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="Why PKD happens" title="PKD starts with a changed gene, usually inherited." />
          <VStack align="start" gap={5} color="navy.600" textStyle="lede" maxW="measure">
            <Text>
              Gene changes cause PKD. Most people inherit one from a parent, so the condition can run through
              several generations of a family. Sometimes the change happens on its own in a child whose
              parents do not carry it.
            </Text>
            <Text>
              Family history is the biggest risk factor. One parent can pass on the dominant form; both
              parents must carry gene changes for the recessive form. Diet, lifestyle and personal choices do
              not cause PKD.
            </Text>
          </VStack>
        </Grid>
        <FeatureGrid columns={2}>
          {pkdTypes.map((type) => (
            <FeatureCard key={type.title} eyebrow={type.eyebrow} title={type.title} description={type.description} />
          ))}
        </FeatureGrid>
      </ContentSection>

      <StatementBand
        eyebrow="What it means for families"
        statement="A PKD diagnosis can affect the whole family."
      >
        <Text textStyle="lede" color="navy.100" maxW="measure">
          Parents, siblings and children may have inherited the same gene change. Knowing the family history
          gives them a reason to ask a healthcare professional about screening and blood pressure checks
          before kidney function declines.
        </Text>
        <HStack gap={3} flexWrap="wrap" pt={2}>
          <ActionLink href="/support" surface="dark">
            How Hope4PKD helps
          </ActionLink>
          <TextLink href="/pkd/symptoms-and-diagnosis" surface="dark">
            What to look out for
          </TextLink>
        </HStack>
      </StatementBand>

      <ContentSection>
        <SectionHeading eyebrow="Keep reading" title="Read about symptoms, diagnosis and care." />
        <FeatureGrid columns={3}>
          <FeatureCard
            title="Symptoms and diagnosis"
            description="Which symptoms PKD can cause, when to speak with a healthcare professional and how scans help diagnose it."
            href="/pkd/symptoms-and-diagnosis"
            linkLabel="Read symptoms and diagnosis"
          />
          <FeatureCard
            title="Treatment and care"
            description="How care can slow cyst growth, control blood pressure, manage pain and respond when kidney function declines."
            href="/pkd/treatment-and-care"
            linkLabel="Read treatment and care"
          />
          <FeatureCard
            title="Knowledge Centre"
            description="The planned collection will include longer PKD articles with named authors, qualified reviewers, sources and review dates."
            status="Medical review in progress"
            href="/knowledge"
            linkLabel="Visit the Knowledge Centre"
          />
        </FeatureGrid>
        <SourceNote publisher={pkdSource.publisher} title={pkdSource.title} href={pkdSource.href} />
      </ContentSection>
    </Layout>
  );
}
