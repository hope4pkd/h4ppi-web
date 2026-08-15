import { ActionLink, ContentSection, EmptyState, FeatureGrid, FeatureItem, PageHero, SectionHeading } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About us", description: "Why Hope4PKD exists, what the initiative is building, and how governance and leadership information will be published responsibly.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <Layout>
      <PageHero eyebrow="About Hope4PKD" title="A support system built from lived experience." description="Hope4PKD Patients Initiative is building a coordinated, accountable pathway for people and families navigating polycystic kidney disease in Nigeria.">
        <HStack gap={3} flexWrap="wrap"><ActionLink href="/about/founder-story">Read the founder’s story</ActionLink><ActionLink href="/impact" variant="outline" surface="dark">How accountability works</ActionLink></HStack>
      </PageHero>
      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="Our purpose" title="Turn fragmented help into an organised pathway." />
          <VStack align="start" gap={5} color="navy.500" fontSize="lg" lineHeight="1.75">
            <Text>Hope4PKD was formed around a simple gap: families could find moments of goodwill, but not a consistent system to help them understand the journey, verify needs, coordinate support and follow through.</Text>
            <Text>Our mission is to connect patients to responsible guidance, verification, financial-access pathways, community, awareness and advocacy—with consent, privacy and transparency built in.</Text>
            <Text>Our vision is a Nigeria where no person with PKD has to navigate diagnosis, care and support alone.</Text>
          </VStack>
        </Grid>
      </ContentSection>
      <ContentSection tone="teal">
        <SectionHeading eyebrow="What guides us" title="Compassion with operational discipline." description="The work must feel human to patients and remain rigorous enough to deserve public trust." />
        <FeatureGrid columns={3}>
          <FeatureItem number="01" title="Dignity">Patients retain agency over their information, identity and participation.</FeatureItem>
          <FeatureItem number="02" title="Verification">Medical, cost and publication decisions follow documented review gates.</FeatureItem>
          <FeatureItem number="03" title="Transparency">Targets, verified results, allocations and reports are labelled and separated.</FeatureItem>
          <FeatureItem number="04" title="Privacy">Access follows least privilege; sensitive records never become public campaign data.</FeatureItem>
          <FeatureItem number="05" title="Continuity">Support planning includes safe updates, follow-up and clear closure or withdrawal.</FeatureItem>
          <FeatureItem number="06" title="Learning">Policies, content and programmes are reviewed as evidence and patient needs evolve.</FeatureItem>
        </FeatureGrid>
      </ContentSection>
      <ContentSection>
        <SectionHeading eyebrow="Governance & leadership" title="Profiles will be complete, attributable and approved." description="Current names and photographs remain source material until Hope4PKD approves biographies, roles, governance status and publication consent." />
        <Box mt={10}><EmptyState title="Leadership profiles are under organisational review" description="The site will not imply a constituted advisory board or publish incomplete biographies. Registration details, governance documents, declared conflicts and approved LinkedIn profiles will appear here when confirmed." actionLabel="See how decisions are governed" actionHref="/about/leadership" /></Box>
      </ContentSection>
    </Layout>
  );
}
