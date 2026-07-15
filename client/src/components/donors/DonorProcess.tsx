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
  HiHandRaised,
  HiUserGroup,
  HiBanknotes,
  HiChartBar,
} from "react-icons/hi2";

const ProcessStep = ({
  icon,
  title,
  description,
  step,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  step: number;
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
      <HStack justify="space-between" w="full">
        <Box p={3} bg="accent.500" rounded="lg" color="accent.900">
          <Icon as={icon} w={6} h={6} />
        </Box>
        <Box
          w={8}
          h={8}
          bg="brand.500"
          rounded="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="sm"
          fontWeight="bold"
        >
          {step}
        </Box>
      </HStack>

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

export function DonorProcess() {
  return (
    <Box py={{ base: 16, md: 20 }}>
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
            >
              How Your Support Works
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
              From the moment you give to the moment a patient receives care,
              every step is coordinated and accounted for.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
            <ProcessStep
              icon={HiHandRaised}
              title="Choose How to Give"
              description="Make a one-time gift, become a monthly sponsor, support a specific campaign, or partner through corporate CSR"
              step={1}
            />
            <ProcessStep
              icon={HiUserGroup}
              title="We Match Your Support"
              description="Your giving is matched to medically verified patients through donor sponsorship matching and coordinated pathways"
              step={2}
            />
            <ProcessStep
              icon={HiBanknotes}
              title="Funds Reach Treatment"
              description="Support is mobilised toward dialysis, transplant initiatives, medication, and emergency medical needs"
              step={3}
            />
            <ProcessStep
              icon={HiChartBar}
              title="You See the Impact"
              description="Patient progress and outcomes are monitored and reported back — transparency at every step"
              step={4}
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
