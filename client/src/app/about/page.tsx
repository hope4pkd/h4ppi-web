import { ActionLink, ContentSection, EmptyState, FeatureGrid, FeatureItem, Ledger, LedgerRow, PageHero, SectionHeading, TextLink } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { organisation } from "@/content/organisation";
import { Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description: "Why Hope4PKD exists, the five gaps it was founded to close, its mission and vision, and how it will publish leadership and governance information.",
  alternates: { canonical: "/about" },
};

// The founder's five recurring challenges, from the concept note. Laid beside the four kinds of help
// on /support, the fifth has no service behind it yet — advocacy is the answer, and /awareness carries it.
const challenges = [
  ["Low awareness", "Many Nigerians have never heard of PKD, do not know it runs in families, and do not recognise its symptoms, which leads to late diagnosis."],
  ["High costs", "Dialysis, medication, consultations, scans and transplantation place enormous financial strain on families."],
  ["No clear path through care", "Patients often do not know where to seek help or how to navigate treatment."],
  ["Isolation", "Patients and caregivers carry fear, uncertainty and exhaustion, often alone."],
  ["Little attention in policy", "The realities of PKD are rarely part of healthcare planning or policy discussion."],
] as const;

export default function AboutPage() {
  return (
    <Layout>
      <PageHero
        title="A support system for PKD patients in Nigeria, built by a family that needed one."
        description="Hope4PKD Patients Initiative supports people living with polycystic kidney disease, and the families who care for them, through guidance, financial assistance, community and advocacy."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/about/founder-story">Read the founder’s story</ActionLink>
          <ActionLink href="/impact" variant="outline">How accountability works</ActionLink>
        </HStack>
      </PageHero>

      <ContentSection tone="white" size="spacious">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 5fr) minmax(0, 7fr)" }} gap={{ base: 8, lg: 16 }} alignItems="start">
          <SectionHeading eyebrow="Our story" title="Hope4PKD began with loss." />
          <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
            <Text>
              Onyekachi Nwakaihe cared for his mother and his brother through their years with kidney disease, and lost both of them. As their caregiver, he saw how hard it is to find reliable information, pay for treatment, and cope with a chronic illness with little support.
            </Text>
            <Text>
              After their deaths he set out to understand why it had been so hard. People living with PKD in Nigeria, and the families who care for them, kept running into the same five problems.
            </Text>
            <TextLink href="/about/founder-story">Read the story in his own words</TextLink>
          </VStack>
        </Grid>
        <Ledger>
          {challenges.map(([title, text], index) => (
            <LedgerRow key={title} number={`0${index + 1}`} title={title}>
              {text}
            </LedgerRow>
          ))}
        </Ledger>
        <Text textStyle="lede" color="navy.700" maxW="measure">
          Hope4PKD was founded to close these five gaps.
        </Text>
      </ContentSection>

      <ContentSection tone="navy" id="mission">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 8, md: 12 }}>
          <VStack align="start" gap={4}>
            <Text textStyle="eyebrow" color="brightTeal.500">Mission</Text>
            <Heading as="h2" textStyle="sectionTitle" color="white" maxW="measureTight">
              To ensure no one in Nigeria has to navigate polycystic kidney disease alone.
            </Heading>
          </VStack>
          <VStack align="start" gap={4}>
            <Text textStyle="eyebrow" color="brightTeal.500">Vision</Text>
            <Text textStyle="lede" color="navy.100" maxW="measure">
              A Nigeria where every person affected by PKD is diagnosed early, understands their condition, and can access the care and support they need.
            </Text>
            {/* The concept note's 2030 reach and assistance targets are bracketed team decisions; they
                are published on /impact once the numbers and their method are agreed. */}
            <Text textStyle="bodySm" color="navy.200">
              Our numbered goals to 2030 will be published, with their method, once the team has agreed them.
            </Text>
          </VStack>
        </Grid>
      </ContentSection>

      <ContentSection tone="teal" size="spacious">
        <SectionHeading eyebrow="Our values" title="What we hold ourselves to" />
        <FeatureGrid columns={3}>
          <FeatureItem number="01" title="Dignity">Patients decide what is shared about them, whether their name is used, and whether they take part.</FeatureItem>
          <FeatureItem number="02" title="Verification">Medical details, costs and anything we publish are checked against a written process before we decide.</FeatureItem>
          <FeatureItem number="03" title="Transparency">When we publish numbers, targets are labelled as targets and kept apart from verified results.</FeatureItem>
          <FeatureItem number="04" title="Privacy">Staff see only the information their role needs. Medical records stay out of public campaigns.</FeatureItem>
          <FeatureItem number="05" title="Continuity">Every support plan includes follow-up, and a clear end point when support closes or is withdrawn.</FeatureItem>
          <FeatureItem number="06" title="Learning">We review our policies, content and programmes as the evidence and patients’ needs change.</FeatureItem>
        </FeatureGrid>
      </ContentSection>

      <ContentSection>
        <SectionHeading eyebrow="Team and advisors" title="Who runs Hope4PKD" />
        <Text color="navy.500" textStyle="lede" maxW="measure">
          Our legal name is {organisation.legalName}. We operate as {organisation.brandName}, or {organisation.shortName} for short.
        </Text>
        <EmptyState
          title="Leadership and advisor profiles are not published yet"
          description="Confirmed roles and approved biographies will appear here, with registration details, governance documents and declared conflicts, once each one is approved."
          actionLabel="See how decisions are governed"
          actionHref="/about/leadership"
        />
      </ContentSection>
    </Layout>
  );
}
