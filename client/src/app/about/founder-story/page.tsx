import { ActionLink, ContentSection, Eyebrow, MediaFrame, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Box, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import founderHospitalImage from "@public/assets/images/hospital.jpg";

export const metadata: Metadata = { title: "Founder’s story", description: "The family experience and caregiver perspective behind Hope4PKD Patients Initiative.", alternates: { canonical: "/about/founder-story" } };

export default function FounderStoryPage() {
  return (
    <Layout>
      <PageHero eyebrow="Founder’s story" title="The family experience behind Hope4PKD." description="Hope4PKD grew from Onyekachi Nwakaihe’s caregiver experience and a determination to create the coordinated support the family could not find." />
      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.72fr 1.28fr" }} gap={{ base: 8, lg: 16 }}>
          {/* Not sticky: with the figure in it this rail is as tall as the prose column, so a sticky
              rail would have no travel to move through and would simply never engage. */}
          <VStack align="start" gap={6} alignSelf="start">
            <VStack align="start" gap={4}>
              <Eyebrow>The founding commitment</Eyebrow>
              <Heading as="h2" textStyle="sectionTitle" color="navy.900">No one should navigate PKD alone.</Heading>
            </VStack>
            <Box as="figure" w="full" maxW={{ base: "420px", lg: "360px" }}>
              <MediaFrame src={founderHospitalImage} alt="Onyekachi Nwakaihe in a surgical gown, cap and mask during a hospital visit as a caregiver" ratio={4 / 5} objectPosition="50% 82%" />
              <Text as="figcaption" textStyle="bodySm" color="navy.400" pt={3}>Onyekachi Nwakaihe during a hospital visit as a caregiver.</Text>
            </Box>
          </VStack>
          <VStack align="start" gap={6} color="navy.600" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.8">
            <Text>Hope4PKD grew from the experiences of Margaret Toyin Nwakaihe and John Ifeanyi Nwakaihe, and from what Onyekachi encountered while supporting family through dialysis and transplantation.</Text>
            <Text>Caregiving showed how difficult it can be to find clear information, coordinate providers, understand costs and know who owns the next step.</Text>
            <Text>Families needed a trusted system that could connect compassion with medical verification, patient navigation, responsible funding and long-term follow-up.</Text>
            <Text>Hope4PKD’s goal is a patient support service that protects dignity, verifies needs, manages funding responsibly and follows up.</Text>
            <Text fontSize="sm" color="navy.400" borderTopWidth="1px" borderColor="navy.100" pt={5}>Founder and family details are limited to the facts approved in the restructuring brief. An extended biography and formal organisational history will be added only after Hope4PKD’s publication approval.</Text>
            <HStack gap={3} flexWrap="wrap"><ActionLink href="/support">Explore support</ActionLink><ActionLink href="/about" variant="outline">Back to About</ActionLink></HStack>
          </VStack>
        </Grid>
      </ContentSection>
    </Layout>
  );
}
