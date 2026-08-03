import { ActionLink, ContentSection, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Founder’s story", description: "The family experience and caregiver perspective behind Hope4PKD Patients Initiative.", alternates: { canonical: "/about/founder-story" } };

export default function FounderStoryPage() {
  return (
    <Layout>
      <PageHero eyebrow="Founder’s story" title="From a family’s pain to an organised promise." description="Hope4PKD grew from Onyekachi Nwakaihe’s caregiver experience and a determination to build the coordinated support system the family could not find." />
      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.72fr 1.28fr" }} gap={{ base: 8, lg: 16 }}>
          <VStack align="start" gap={4} position={{ lg: "sticky" }} top={{ lg: "120px" }} alignSelf="start">
            <Text color="action.700" fontWeight="800">The founding commitment</Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.05">No one should navigate PKD alone.</Heading>
          </VStack>
          <VStack align="start" gap={6} color="navy.600" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.8">
            <Text>The story of Hope4PKD is rooted in the experiences of Margaret Toyin Nwakaihe and John Ifeanyi Nwakaihe, and in the realities Onyekachi encountered while supporting family through the burden of dialysis and transplantation.</Text>
            <Text>Caregiving exposed more than the weight of treatment. It revealed how difficult it can be to find clear information, coordinate providers, understand costs and know which organisation or person owns the next step.</Text>
            <Text>The missing element was not compassion. It was a trusted system capable of connecting compassion to medical verification, patient navigation, responsible funding and long-term follow-up.</Text>
            <Text>Hope4PKD is the decision to transform that pain into organised impact: a patient-centred pathway built to protect dignity, earn trust and make support easier to navigate.</Text>
            <Text fontSize="sm" color="navy.400" borderTopWidth="1px" borderColor="navy.100" pt={5}>Founder and family details are limited to the facts approved in the restructuring brief. An extended biography and formal organisational history will be added only after Hope4PKD’s publication approval.</Text>
            <HStack gap={3} flexWrap="wrap"><ActionLink href="/support">Explore support</ActionLink><ActionLink href="/about" variant="outline">Back to About</ActionLink></HStack>
          </VStack>
        </Grid>
      </ContentSection>
    </Layout>
  );
}
