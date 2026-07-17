"use client"

import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Icon
} from "@chakra-ui/react"
import {
  HiUserPlus,
  HiShieldCheck,
  HiClipboardDocumentList,
  HiHandRaised,
  HiChartBar
} from "react-icons/hi2"

const ProcessCard = ({
  icon,
  title,
  description,
  step
}: {
  icon: any;
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
    position="relative"
  >
    <VStack gap={4} align="start">
      <HStack justify="space-between" w="full">
        <Box
          p={3}
          bg="brand.500"
          rounded="lg"
          color="white"
        >
          <Icon as={icon} w={6} h={6} />
        </Box>
        <Box
          w={8}
          h={8}
          bg="accent.500"
          rounded="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="accent.900"
          fontSize="sm"
          fontWeight="bold"
        >
          {step}
        </Box>
      </HStack>

      <VStack align="start" gap={2}>
        <Text fontSize="xl" fontWeight="semibold" color="gray.900">
          {title}
        </Text>
        <Text color="gray.600">
          {description}
        </Text>
      </VStack>
    </VStack>
  </Box>
)

export function HowItWorksSection() {
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
              How Hope4PKD Operates
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              maxW="2xl"
            >
              We follow a patient-first model where every support request
              passes through a structured, transparent process — ensuring
              support is responsible, credible, and impactful.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
            <ProcessCard
              icon={HiUserPlus}
              title="Patient Intake"
              description="Patients submit medical information and support requests through a structured onboarding process"
              step={1}
            />
            <ProcessCard
              icon={HiShieldCheck}
              title="Medical Verification"
              description="Medical records, diagnoses, treatment plans, and estimated costs are reviewed and verified"
              step={2}
            />
            <ProcessCard
              icon={HiClipboardDocumentList}
              title="Case Assessment"
              description="The patient's needs are assessed to determine the most suitable support pathway"
              step={3}
            />
            <ProcessCard
              icon={HiHandRaised}
              title="Support Coordination"
              description="Support is provided through financial mobilisation, referrals, donor matching, advocacy, or community-based interventions"
              step={4}
            />
            <ProcessCard
              icon={HiChartBar}
              title="Follow-Up & Impact Monitoring"
              description="Patient progress and outcomes are monitored to ensure transparency, continuity, and measurable impact"
              step={5}
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}