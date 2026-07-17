"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import {
  HiShieldCheck,
  HiCalculator,
  HiBanknotes,
  HiChartBar,
} from "react-icons/hi2";

const commitments = [
  {
    icon: HiShieldCheck,
    title: "Verified Before Launch",
    description:
      "No campaign goes live until the patient's diagnosis, medical records, and case authenticity have been verified",
  },
  {
    icon: HiCalculator,
    title: "Validated Costs",
    description:
      "Treatment plans and medical costs are reviewed so every fundraising goal reflects genuine treatment needs",
  },
  {
    icon: HiBanknotes,
    title: "Coordinated Disbursement",
    description:
      "Funds are mobilised through coordinated pathways toward treatment — not isolated, untracked interventions",
  },
  {
    icon: HiChartBar,
    title: "Monitored Impact",
    description:
      "Patient progress and outcomes are followed up and reported, ensuring transparency and measurable impact",
  },
];

export function CampaignTransparency() {
  return (
    <Box py={{ base: 16, md: 20 }} bg="gray.50">
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
            >
              Every Campaign Is Verified
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
              Transparency and credibility are central to how Hope4PKD runs
              campaigns. Here is what we commit to on every single one.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
            {commitments.map((item) => (
              <Box
                key={item.title}
                p={6}
                bg="white"
                rounded="xl"
                shadow="md"
                border="1px solid"
                borderColor="gray.200"
              >
                <VStack gap={4} align="start">
                  <HStack gap={3}>
                    <Box p={3} bg="brand.500" rounded="lg" color="white">
                      <Icon as={item.icon} w={6} h={6} />
                    </Box>
                  </HStack>
                  <VStack align="start" gap={2}>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                      {item.title}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {item.description}
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
