"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import {
  HiMap,
  HiShieldCheck,
  HiCurrencyDollar,
  HiHeart,
  HiAcademicCap,
  HiScale,
} from "react-icons/hi2";

interface CoreFocusCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  bgColor: string;
}

const CoreFocusCard = ({
  title,
  description,
  icon,
  bgColor,
}: CoreFocusCardProps) => {
  return (
    <VStack
      bg="white"
      p={8}
      borderRadius="lg"
      boxShadow="md"
      gap={4}
      align="center"
      textAlign="center"
      transition="transform 0.3s"
      _hover={{
        transform: "translateY(-5px)",
      }}
    >
      <Box p={4} bg={bgColor} rounded="xl" color="white" shadow="lg">
        <Icon as={icon} boxSize={12} h={7} w={7} />
      </Box>

      <Heading as="h3" size="lg" fontWeight="bold" color={bgColor}>
        {title}
      </Heading>
      <Text fontFamily="Open Sans, sans-serif">{description}</Text>
    </VStack>
  );
};
export function CoreFocusSection() {
  return (
    <Box py={16} bg="gray.50" width="100%" position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="-50px"
        right="-50px"
        w="200px"
        h="200px"
        bg="brand.100"
        rounded="full"
        opacity={0.3}
        blur="3xl"
      />
      <Box
        position="absolute"
        bottom="-30px"
        left="-30px"
        w="150px"
        h="150px"
        bg="accent.100"
        rounded="full"
        opacity={0.4}
        blur="2xl"
      />
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading
              as="h2"
              fontSize={{
                base: "2xl",
                md: "3xl",
              }}
              color="brand.500"
            >
              What We Do
            </Heading>
            <Text
              maxW="2xl"
              fontSize={{
                base: "md",
                md: "lg",
              }}
              fontFamily="Open Sans, sans-serif"
            >
              Hope4PKD operates through a six-pillar ecosystem model designed
              to support the full patient journey.
            </Text>
          </VStack>
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            gap={10}
            width="100%"
          >
            <CoreFocusCard
              title="Patient Care & Navigation"
              description="Structured guidance for patients and caregivers — onboarding, care navigation, trusted health information, and referral pathways — so no one feels abandoned or confused after diagnosis."
              icon={HiMap}
              bgColor="brand.500"
            />
            <CoreFocusCard
              title="Medical Verification & Trust"
              description="Every patient case undergoes structured medical verification — diagnosis, records, treatment plans, and costs — before support is mobilised, ensuring accountability for donors and partners."
              icon={HiShieldCheck}
              bgColor="accent.500"
            />
            <CoreFocusCard
              title="Financial Access & Support"
              description="Coordinated pathways to critical financial support: emergency medical coordination, dialysis and transplant initiatives, fundraising campaigns, and donor sponsorship matching."
              icon={HiCurrencyDollar}
              bgColor="brand.500"
            />
            <CoreFocusCard
              title="Community & Emotional Support"
              description="Patient and caregiver support networks, survivor stories, peer encouragement, and safe spaces for shared experiences — because healing is emotional and communal, not only medical."
              icon={HiHeart}
              bgColor="accent.500"
            />
            <CoreFocusCard
              title="Awareness & Education"
              description="Awareness campaigns, educational resources, public engagement, and family and genetic awareness conversations that help more people understand PKD and seek help earlier."
              icon={HiAcademicCap}
              bgColor="brand.500"
            />
            <CoreFocusCard
              title="Advocacy & Healthcare Access"
              description="Advocating for improved patient support systems, engaging healthcare institutions and stakeholders, and driving long-term systemic improvement for kidney health support in Nigeria."
              icon={HiScale}
              bgColor="accent.500"
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
