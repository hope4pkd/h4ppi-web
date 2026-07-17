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
  HiEyeSlash,
  HiCurrencyDollar,
  HiMapPin,
  HiUserMinus,
  HiMegaphone,
} from "react-icons/hi2";

interface ProblemCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const ProblemCard = ({ title, description, icon }: ProblemCardProps) => (
  <VStack
    bg="white"
    p={6}
    borderRadius="lg"
    boxShadow="md"
    gap={3}
    align="start"
    textAlign="left"
    transition="transform 0.3s"
    _hover={{
      transform: "translateY(-5px)",
    }}
  >
    <Box p={3} bg="brand.500" rounded="xl" color="white" shadow="lg">
      <Icon as={icon} h={6} w={6} />
    </Box>
    <Heading as="h3" size="md" fontWeight="bold" color="gray.900">
      {title}
    </Heading>
    <Text fontSize="sm" color="gray.600">
      {description}
    </Text>
  </VStack>
);

export function ProblemSection() {
  return (
    <Box py={16} bg="gray.50" width="100%" position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="-50px"
        left="-50px"
        w="200px"
        h="200px"
        bg="brand.100"
        rounded="full"
        opacity={0.3}
        blur="3xl"
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
              The Problem We&apos;re Solving
            </Heading>
            <Text
              maxW="2xl"
              fontSize={{
                base: "md",
                md: "lg",
              }}
            >
              Individuals living with Polycystic Kidney Disease in Nigeria
              often face a fragmented healthcare journey.
            </Text>
          </VStack>
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            gap={8}
            width="100%"
          >
            <ProblemCard
              title="Limited Awareness"
              description="Many Nigerians are unaware of PKD, its hereditary nature, symptoms, and long-term health implications — often leading to delayed diagnosis and poor disease management."
              icon={HiEyeSlash}
            />
            <ProblemCard
              title="Financial Burden"
              description="The cost of dialysis, medication, consultations, diagnostic procedures, and kidney transplantation places significant strain on patients and families."
              icon={HiCurrencyDollar}
            />
            <ProblemCard
              title="Lack of Structured Support"
              description="Patients often struggle to understand where to seek help, how to navigate treatment, or how to access credible information and support systems."
              icon={HiMapPin}
            />
            <ProblemCard
              title="Emotional Isolation"
              description="Many patients and caregivers experience fear, uncertainty, and emotional exhaustion with little access to community-based support."
              icon={HiUserMinus}
            />
            <ProblemCard
              title="Limited Advocacy & Access"
              description="There is insufficient attention to the realities faced by PKD patients in healthcare discussions, policy conversations, and patient-centered care systems."
              icon={HiMegaphone}
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
