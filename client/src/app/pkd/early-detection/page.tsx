import { HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ContentSection,
  DirectoryList,
  DirectoryRow,
  FeatureGrid,
  FeatureItem,
  Ledger,
  LedgerRow,
  PageHero,
  SectionHeading,
  StatementBand,
  TextLink,
} from "@/components/common/PublicPage";
import { SourceNote } from "@/components/common/SourceNote";
import { Layout } from "@/components/layout/Layout";
import { pkdAppointmentPrep, pkdSource } from "@/content/pkd";

export const metadata: Metadata = {
  title: "Early detection and family testing",
  description:
    "What a family history of polycystic kidney disease means for relatives, how to prepare for the appointment where you ask about it, and what a scan can and cannot settle.",
  alternates: { canonical: "/pkd/early-detection" },
};

export default function PkdEarlyDetectionPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Learn about PKD"
        title="Early detection and family testing"
        description="When someone in a family is diagnosed with PKD, their relatives are often the last people anyone thinks about. This page is for them."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/pkd/symptoms-and-diagnosis">What to look out for</ActionLink>
          <TextLink href="/pkd" surface="dark">
            Back to what PKD is
          </TextLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <SectionHeading
          eyebrow="What a family history means"
          title="Three facts that decide whether this page applies to you."
          description="PKD is inherited far more often than not, and the numbers are not small. Knowing them is what turns “someone in the family has kidney trouble” into a question worth taking to a clinician."
        />
        <Ledger>
          <LedgerRow number="01" title="One parent with ADPKD means a one-in-two chance">
            ADPKD is the most common inherited kidney disease. When one parent has it, each child has a 50%
            chance of inheriting it. That is a coin toss for every sibling, independently.
          </LedgerRow>
          <LedgerRow number="02" title="Two carrier parents means a one-in-four chance">
            ARPKD is rarer and usually more serious, and it needs a changed gene from both parents. Where both
            carry it, each child has a 25% chance. Symptoms can appear shortly after birth, in childhood or
            during the teenage years.
          </LedgerRow>
          <LedgerRow number="03" title="Signs often begin between 30 and 40">
            Someone can live with ADPKD for years without knowing. Waiting for a symptom to announce itself is
            what leaves the condition undetected through the decade when blood pressure could have been
            treated.
          </LedgerRow>
        </Ledger>
      </ContentSection>

      <ContentSection tone="teal" size="spacious">
        <SectionHeading
          eyebrow="Before your appointment"
          title="What to take with you."
          description="Hope4PKD cannot arrange a scan or interpret one. What we can do is make sure the appointment you pay for is not wasted on questions you could have answered at home."
        />
        <FeatureGrid columns={3}>
          {pkdAppointmentPrep.map((item) => (
            <FeatureItem key={item.title} title={item.title}>
              {item.description}
            </FeatureItem>
          ))}
        </FeatureGrid>
      </ContentSection>

      <ContentSection tone="white">
        <SectionHeading eyebrow="How it gets confirmed" title="A scan, read against your age and family history." />
        <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
          <Text>
            Ultrasound is usually the first scan, and it needs no radiation or injection. CT can detect smaller
            cysts, and MRI can measure total kidney volume, which helps a clinician track how quickly the
            condition is progressing. A clinician weighs the number and size of cysts against your age and your
            family history — the same scan does not mean the same thing at 20 as at 50.
          </Text>
          <Text>
            Controlling blood pressure is one of the most important parts of PKD care, and it protects kidney
            function over time. That is the practical reason for asking early rather than the abstract one.
          </Text>
          <TextLink href="/pkd/symptoms-and-diagnosis">Read about symptoms and the three scans</TextLink>
        </VStack>
        <SourceNote publisher={pkdSource.publisher} title={pkdSource.title} href={pkdSource.href} />
      </ContentSection>

      <StatementBand eyebrow="Be clear about what we are" statement="Hope4PKD does not test anyone.">
        <Text textStyle="lede" color="navy.100" maxW="measure">
          We do not run scans, read results, order genetic tests or tell you whether you have PKD. Everything on
          this page is meant to get you to a qualified healthcare professional better prepared than you would
          otherwise have been.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/find-care" surface="dark">
            Finding care
          </ActionLink>
          <ActionLink href="/support" variant="outline" surface="dark">
            How we help
          </ActionLink>
        </HStack>
      </StatementBand>

      <ContentSection size="compact">
        <SectionHeading eyebrow="Keep reading" title="Where to go next." />
        <DirectoryList>
          <DirectoryRow href="/pkd" title="What is PKD?">
            What the cysts do to the kidneys, why the condition runs in families, and the difference between
            the two inherited forms.
          </DirectoryRow>
          <DirectoryRow href="/pkd/symptoms-and-diagnosis" title="Symptoms and diagnosis">
            The symptoms people notice, when to raise them with a professional, and the scans that confirm an
            answer.
          </DirectoryRow>
          <DirectoryRow href="/pkd/treatment-and-care" title="Treatment and care">
            What care can do about cyst growth, blood pressure and kidney failure, and the complications it
            watches for.
          </DirectoryRow>
          <DirectoryRow href="/for/everyone" title="Why this matters beyond one family">
            PKD is inherited, so a single diagnosis reaches across siblings, children and cousins who have
            never been told to ask.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>
    </Layout>
  );
}
