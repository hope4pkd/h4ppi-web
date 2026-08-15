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
import { Layout } from "@/components/layout/Layout";
import { pkdInBrief, pkdSource, pkdTypes } from "@/content/pkd";

export const metadata: Metadata = {
  title: "What is PKD?",
  description:
    "Polycystic kidney disease explained in plain language: what the cysts do, why it runs in families, the two inherited forms, and what Hope4PKD is building around the gaps it leaves.",
  alternates: { canonical: "/pkd" },
};

export default function AboutPkdPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Learn about PKD"
        title="Polycystic kidney disease, in plain language."
        description="Most people meet this condition through a relative, a scan result or a word on a hospital form. Start here, then follow it as far as you need to."
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
          <SectionHeading eyebrow="The short answer" title="Cysts crowd out working kidney." />
          <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
            <Text>{pkdInBrief}</Text>
            <Text>
              Kidneys filter waste and extra fluid out of the blood, and they help control blood pressure. As
              cysts fill more of the organ, less of it is doing that work — which is why blood pressure often
              rises long before anything hurts.
            </Text>
            <Text>
              PKD is lifelong and there is no cure yet. That is not the whole picture: blood pressure control,
              monitoring and prompt treatment of complications change how the years ahead go, and they work
              best when they start early.
            </Text>
          </VStack>
        </Grid>
      </ContentSection>

      <ContentSection tone="teal">
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="Why it happens" title="A change in a gene, almost always inherited." />
          <VStack align="start" gap={5} color="navy.600" textStyle="lede" maxW="measure">
            <Text>
              PKD is caused by a change in a gene. In most cases that change is passed down from a parent, so
              the disease follows families through generations. Occasionally it appears on its own in someone
              with no family history of it.
            </Text>
            <Text>
              That inheritance is also the main risk factor: what raises a person’s chance of PKD is having a
              parent — or, for the recessive form, two parents — carrying the gene change. It is not something
              anyone brought on themselves, and nothing about diet or lifestyle causes it.
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
        eyebrow="Why this matters here"
        statement="A diagnosis is rarely about one person. It is about everyone who shares the family tree."
      >
        <Text textStyle="lede" color="navy.100" maxW="measure">
          Inherited means siblings, parents and children carry a real chance of the same condition. That is
          also the opening: a family that knows can ask about screening, get blood pressure treated, and stop
          finding out at the point of kidney failure.
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
        <SectionHeading eyebrow="Keep reading" title="Follow it as far as you need to." />
        <FeatureGrid columns={3}>
          <FeatureCard
            title="Symptoms and diagnosis"
            description="What people actually notice, when to ask a professional about it, and the scans that confirm an answer."
            href="/pkd/symptoms-and-diagnosis"
            linkLabel="Read symptoms and diagnosis"
          />
          <FeatureCard
            title="Treatment and care"
            description="What care can do about cyst growth, blood pressure, pain and kidney failure — and what it watches for."
            href="/pkd/treatment-and-care"
            linkLabel="Read treatment and care"
          />
          <FeatureCard
            title="Knowledge Centre"
            description="Longer articles, each naming its author and qualified reviewer, its sources and its next review date."
            status="The Knowledge Centre is in medical review"
            href="/knowledge"
            linkLabel="Visit the Knowledge Centre"
          />
        </FeatureGrid>
        <SourceNote publisher={pkdSource.publisher} title={pkdSource.title} href={pkdSource.href} />
      </ContentSection>
    </Layout>
  );
}
