import { ActionLink, ContentSection, EmptyState, FeatureGrid, FeatureItem, PageHero, SectionHeading } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About us", description: "Why Hope4PKD exists, how it plans to support families and how it will publish governance and leadership information.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <Layout>
      <PageHero eyebrow="About Hope4PKD" title="A support service shaped by lived experience." description="Hope4PKD Patients Initiative is developing coordinated, accountable support for people and families navigating polycystic kidney disease in Nigeria.">
        <HStack gap={3} flexWrap="wrap"><ActionLink href="/about/founder-story">Read the founder’s story</ActionLink><ActionLink href="/impact" variant="outline" surface="dark">How accountability works</ActionLink></HStack>
      </PageHero>
      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="Our purpose" title="Organise the help families struggle to coordinate." />
          <VStack align="start" gap={5} color="navy.500" fontSize="lg" lineHeight="1.75">
            <Text>Hope4PKD began because families could find moments of goodwill without a consistent way to understand what happens after diagnosis, verify needs, coordinate support and follow through.</Text>
            <Text>Our mission is to connect patients with clear guidance, verified support planning, responsible funding pathways and community. We also work on public awareness and evidence-led advocacy with consent, privacy and clear public reporting.</Text>
            <Text>Our vision is a Nigeria where no person with PKD has to navigate diagnosis, care and support alone.</Text>
          </VStack>
        </Grid>
      </ContentSection>
      <ContentSection tone="teal">
        <SectionHeading eyebrow="What guides us" title="Compassion and operational discipline." description="Hope4PKD pairs humane patient support with documented controls for verification, privacy and public reporting." />
        <FeatureGrid columns={3}>
          <FeatureItem number="01" title="Dignity">Patients retain agency over their information, identity and participation.</FeatureItem>
          <FeatureItem number="02" title="Verification">Medical, cost and publication decisions follow documented review gates.</FeatureItem>
          <FeatureItem number="03" title="Transparency">Targets, verified results, allocations and reports are labelled and separated.</FeatureItem>
          <FeatureItem number="04" title="Privacy">Staff can access only the information their role requires. Sensitive records stay out of public campaigns.</FeatureItem>
          <FeatureItem number="05" title="Continuity">Support planning includes safe updates, follow-up and clear closure or withdrawal.</FeatureItem>
          <FeatureItem number="06" title="Learning">Policies, content and programmes are reviewed as evidence and patient needs evolve.</FeatureItem>
        </FeatureGrid>
      </ContentSection>
      <ContentSection>
        <SectionHeading eyebrow="Governance & leadership" title="Profiles will be published only after approval." description="Current names and photographs remain source material until Hope4PKD approves biographies, roles, governance status and publication consent." />
        <Box mt={10}><EmptyState title="Leadership profiles are under organisational review" description="Leadership pages will include only confirmed roles and approved biographies. Registration details, governance documents, declared conflicts and approved LinkedIn profiles will appear here when confirmed." actionLabel="See how decisions are governed" actionHref="/about/leadership" /></Box>
      </ContentSection>
    </Layout>
  );
}
