"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  HiHeart,
  HiEye,
  HiHandRaised,
  HiShieldCheck,
  HiUserGroup,
  HiMegaphone,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

const values: { icon: IconType; title: string; description: string }[] = [
  {
    icon: HiHeart,
    title: "Compassion",
    description:
      "Every patient is a person first. We meet people where they are — with empathy, patience, and care at every step of their journey.",
  },
  {
    icon: HiEye,
    title: "Transparency",
    description:
      "Support is coordinated openly. Patients, supporters, and partners can trust that every contribution is accounted for.",
  },
  {
    icon: HiHandRaised,
    title: "Dignity",
    description:
      "Needing help should never cost anyone their dignity. We design our support so patients are empowered, not exposed.",
  },
  {
    icon: HiShieldCheck,
    title: "Trust & Verification",
    description:
      "Every case is medically verified before support flows. Trust is not assumed — it is built into how we operate.",
  },
  {
    icon: HiUserGroup,
    title: "Community",
    description:
      "PKD is easier to face together. We connect patients and families to a community that understands the journey.",
  },
  {
    icon: HiMegaphone,
    title: "Advocacy",
    description:
      "We speak up for better awareness, earlier diagnosis, and improved healthcare access for PKD patients across Nigeria.",
  },
];

export function CoreValuesSection() {
  return (
    <Box py={{ base: 16, md: 20 }} width="100%">
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontFamily="Poppins, sans-serif"
              color="brand.500"
            >
              Our Core Values
            </Heading>
            <Text
              maxW="2xl"
              fontSize={{ base: "md", md: "lg" }}
              fontFamily="Open Sans, sans-serif"
              color="gray.600"
            >
              The principles that shape every decision we make and every
              patient interaction we have.
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} width="100%">
            {values.map((value, index) => (
              <VStack
                key={value.title}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                border="1px solid"
                borderColor="gray.200"
                p={8}
                gap={4}
                align="flex-start"
                transition="transform 0.2s ease"
                _hover={{ transform: "translateY(-5px)" }}
              >
                <Box
                  p={3}
                  bg={index % 2 === 0 ? "brand.500" : "accent.500"}
                  rounded="xl"
                  color="white"
                >
                  <Icon as={value.icon} boxSize={6} />
                </Box>
                <Heading
                  as="h3"
                  fontSize="lg"
                  fontFamily="Poppins, sans-serif"
                  color="gray.900"
                >
                  {value.title}
                </Heading>
                <Text
                  fontSize="sm"
                  fontFamily="Open Sans, sans-serif"
                  color="gray.600"
                  lineHeight="1.7"
                >
                  {value.description}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
