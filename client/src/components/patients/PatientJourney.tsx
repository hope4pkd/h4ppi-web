"use client";

import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  HiUserPlus,
  HiShieldCheck,
  HiClipboardDocumentList,
  HiHandRaised,
  HiChartBar,
} from "react-icons/hi2";

const JourneyStep = ({
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
        <Box p={3} bg="brand.500" rounded="lg" color="white">
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

export function PatientJourney() {
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
              Your Support Journey
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
              Every support request passes through a structured, transparent
              process — so the help you receive is responsible, credible, and
              suited to your needs.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
            <JourneyStep
              icon={HiUserPlus}
              title="Patient Intake"
              description="You share your medical information and support request through our structured onboarding process"
              step={1}
            />
            <JourneyStep
              icon={HiShieldCheck}
              title="Medical Verification"
              description="Our team reviews and verifies medical records, diagnosis, treatment plans, and estimated costs"
              step={2}
            />
            <JourneyStep
              icon={HiClipboardDocumentList}
              title="Case Assessment"
              description="Your needs are assessed to determine the most suitable support pathway for your situation"
              step={3}
            />
            <JourneyStep
              icon={HiHandRaised}
              title="Support Coordination"
              description="Support is coordinated through financial mobilisation, referrals, donor sponsorship, advocacy, or community-based interventions"
              step={4}
            />
            <JourneyStep
              icon={HiChartBar}
              title="Follow-Up & Monitoring"
              description="We stay with you — monitoring progress and outcomes to ensure continuity and real impact"
              step={5}
            />
          </SimpleGrid>

          {/* Call to Action */}
          <Box
            p={8}
            bg="brand.50"
            w="full"
            textAlign="center"
            rounded="xl"
            shadow="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <VStack gap={4}>
              <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                Ready to Take the First Step?
              </Text>
              <Text color="gray.600" maxW="md" mx="auto">
                Submit your details below and our patient support team will
                reach out to guide you through onboarding.
              </Text>
              <Link href="#intake">
                <Button variant="solid" size="lg" rounded="full">
                  Begin Patient Intake
                </Button>
              </Link>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
