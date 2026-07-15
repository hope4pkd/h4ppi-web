"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Badge,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  HiCheckCircle,
  HiMap,
  HiCurrencyDollar,
  HiHeart,
} from "react-icons/hi2";

const supportPoints = [
  "Patient onboarding and support guidance",
  "Care navigation assistance",
  "Access to trusted healthcare information",
  "Guidance for caregivers and families",
  "Referrals and healthcare support pathways",
];

const PillarCard = ({
  icon,
  title,
  description,
  bg,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  bg: string;
  color: string;
}) => (
  <Box
    p={4}
    bg={bg}
    rounded="xl"
    shadow="md"
    border="1px solid"
    borderColor="gray.200"
  >
    <HStack gap={3} align="start">
      <Icon as={icon} color={color} w={6} h={6} mt={1} />
      <VStack align="start" gap={0}>
        <Text fontWeight="semibold" color="gray.900" fontSize="sm">
          {title}
        </Text>
        <Text color="gray.600" fontSize="sm">
          {description}
        </Text>
      </VStack>
    </HStack>
  </Box>
);

export function PatientHeroSection() {
  return (
    <Box bgGradient="linear(to-br, brand.50, white)" py={{ base: 16, md: 20 }}>
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12} alignItems="center">
          {/* Left Content */}
          <VStack align="start" gap={8}>
            <Badge
              colorPalette="green"
              size="lg"
              px={3}
              py={1}
              rounded="full"
              fontSize="sm"
            >
              For Patients &amp; Caregivers
            </Badge>

            <VStack align="start" gap={4}>
              <Text
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                lineHeight="1.1"
                color="gray.900"
              >
                You Don&apos;t Have to Face{" "}
                <Text as="span" color="brand.500">
                  PKD
                </Text>{" "}
                Alone
              </Text>

              <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="lg">
                A PKD diagnosis can feel overwhelming — and many patients are
                left unsure of what steps to take next. Hope4PKD walks with you
                and your family, with structured guidance, trusted information,
                and coordinated support at every stage of your journey.
              </Text>
            </VStack>

            <VStack align="start" gap={3} w="full">
              <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                How We Support You:
              </Text>
              <VStack align="start" gap={2}>
                {supportPoints.map((point) => (
                  <HStack key={point} gap={2} align="start">
                    <Icon as={HiCheckCircle} color="brand.500" w={5} h={5} mt={1} />
                    <Text color="gray.700">{point}</Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>

            <HStack gap={4} flexWrap="wrap">
              <Link href="#intake">
                <Button variant="solid" size="lg" rounded="full">
                  Request Support
                </Button>
              </Link>
              <Link href="#community">
                <Button variant="outline" size="lg" rounded="full">
                  Find Community
                </Button>
              </Link>
            </HStack>
          </VStack>

          {/* Right Content - Support Pillars */}
          <VStack gap={6} align="stretch">
            <Box
              p={6}
              bg="white"
              rounded="xl"
              shadow="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <VStack gap={3}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="gray.900"
                  textAlign="center"
                >
                  Our Commitment
                </Text>
                <Text color="gray.600" textAlign="center" fontSize="sm">
                  No patient should feel abandoned or confused after diagnosis.
                  Every support request is handled with care, confidentiality,
                  and medical responsibility.
                </Text>
              </VStack>
            </Box>

            <SimpleGrid columns={1} gap={4}>
              <PillarCard
                icon={HiMap}
                title="Care Navigation"
                description="Clear, structured guidance through your healthcare journey — from diagnosis onwards"
                bg="brand.50"
                color="brand.500"
              />
              <PillarCard
                icon={HiCurrencyDollar}
                title="Financial Access"
                description="Coordinated pathways to dialysis, transplant, and emergency medical support"
                bg="accent.50"
                color="accent.500"
              />
              <PillarCard
                icon={HiHeart}
                title="Community & Emotional Support"
                description="Patient and caregiver networks, peer encouragement, and safe spaces to share"
                bg="brand.50"
                color="brand.500"
              />
            </SimpleGrid>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
