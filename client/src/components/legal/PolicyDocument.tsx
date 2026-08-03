import { ContentSection, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { policies, type PolicyKey } from "@/content/policies";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

export function PolicyDocument({ policyKey }: { policyKey: PolicyKey }) {
  const policy = policies[policyKey];
  return (
    <Layout>
      <PageHero eyebrow="Policy suite" title={policy.title} description={policy.summary} />
      <ContentSection>
        <HStack align="start" bg="pink.50" borderWidth="1px" borderColor="pink.200" borderRadius="xl" p={5} mb={10}>
          <Box><Text color="pink.800" fontWeight="800">Publication status: draft operational policy</Text><Text color="navy.600" mt={1}>This route documents the intended control framework. It is not effective until Hope4PKD’s legal/DPO review, responsible owner, dates and official organisation details are approved.</Text></Box>
        </HStack>
        <VStack align="stretch" gap={0} maxW="4xl">
          {policy.sections.map(([title, body], index) => (
            <Box key={title} borderTopWidth="1px" borderColor="navy.100" py={7}>
              <Text color="action.700" fontSize="sm" fontWeight="800">{String(index + 1).padStart(2, "0")}</Text>
              <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} mt={2}>{title}</Heading>
              <Text color="navy.500" fontSize="lg" lineHeight="1.75" mt={3}>{body}</Text>
            </Box>
          ))}
        </VStack>
      </ContentSection>
    </Layout>
  );
}
