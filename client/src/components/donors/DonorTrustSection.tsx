"use client";

import {
  Box,
  Container,
  VStack,
  Text,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import {
  HiDocumentCheck,
  HiCalculator,
  HiBuildingOffice2,
  HiMagnifyingGlass,
} from "react-icons/hi2";

const VerificationCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <Box
    p={6}
    bg="white"
    rounded="xl"
    shadow="md"
    border="1px solid"
    borderColor="gray.200"
  >
    <VStack gap={4} align="start">
      <Box p={3} bg="brand.500" rounded="lg" color="white">
        <Icon as={icon} w={6} h={6} />
      </Box>
      <VStack align="start" gap={2}>
        <Text fontSize="lg" fontWeight="semibold" color="gray.900">
          {title}
        </Text>
        <Text color="gray.600" fontSize="sm">
          {description}
        </Text>
      </VStack>
    </VStack>
  </Box>
);

export function DonorTrustSection() {
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
              Verification Before Mobilisation
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
              Every patient case undergoes a structured medical verification
              process before support is mobilised — ensuring accountability,
              trust, and confidence for donors, partners, and the community.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
            <VerificationCard
              icon={HiDocumentCheck}
              title="Diagnosis Verification"
              description="Diagnosis and medical records are verified with medical professionals before a case moves forward"
            />
            <VerificationCard
              icon={HiCalculator}
              title="Cost Validation"
              description="Treatment plans and medical costs are validated, so funds raised reflect genuine treatment needs"
            />
            <VerificationCard
              icon={HiBuildingOffice2}
              title="Hospital Collaboration"
              description="We collaborate with hospitals and healthcare providers where necessary to confirm care pathways"
            />
            <VerificationCard
              icon={HiMagnifyingGlass}
              title="Case Authenticity Review"
              description="Every case passes an authenticity review before any fundraising or support campaign goes live"
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
