import { ActionLink, ContentSection, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { isCaseReference, normaliseCaseReference } from "@/lib/case-reference";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Request confirmation", robots: { index: false, follow: false } };

export default async function ConfirmationPage({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const params = await searchParams;
  const reference = normaliseCaseReference(params.reference || "");
  const valid = isCaseReference(reference);
  return (
    <Layout>
      <PageHero eyebrow="Request confirmation" title={valid ? "Your request has been received." : "No valid request reference was supplied."} description={valid ? "Keep your reference safe. An acknowledgement has been sent to the email address used in the request." : "This page only confirms a request after the secure form returns a valid reference."} />
      <ContentSection>
        {valid && <VStack align="start" gap={5} maxW="2xl"><Box bg="teal.50" borderWidth="1px" borderColor="teal.200" borderRadius="2xl" p={7} w="full"><Text color="action.700" fontWeight="800">Your reference</Text><Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="800" letterSpacing="0.04em" mt={2}>{reference}</Text></Box><Text color="navy.500">Do not share this reference publicly. Status access also requires a time-limited code sent to your email; the reference alone never reveals case information.</Text><HStack gap={3} flexWrap="wrap"><ActionLink href="/case-status">Check case status</ActionLink><ActionLink href="/support" variant="outline">Return to support</ActionLink></HStack></VStack>}
      </ContentSection>
    </Layout>
  );
}
