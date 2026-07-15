"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiCheckCircle } from "react-icons/hi2";

const differences: { title: string; description: string }[] = [
  {
    title: "Verification before support",
    description:
      "Every patient case is confirmed with verified healthcare partners before any support is coordinated — protecting both patients and supporters.",
  },
  {
    title: "End-to-end patient navigation",
    description:
      "We walk with patients through the full journey: intake, medical verification, case assessment, support coordination, and long-term follow-up.",
  },
  {
    title: "Transparent fund coordination",
    description:
      "We are not an open fundraising platform. Support is structured, directed to verified cases, and its impact is monitored and reported.",
  },
  {
    title: "Community & emotional support",
    description:
      "Beyond medical and financial help, we connect patients and families to a community that understands life with PKD.",
  },
  {
    title: "Strategic healthcare partnerships",
    description:
      "We work hand-in-hand with hospitals, renal centres, and medical professionals so support translates into real, quality care.",
  },
  {
    title: "Advocacy built in",
    description:
      "We push for earlier diagnosis, greater awareness, and better healthcare access for PKD patients across Nigeria — not just case by case.",
  },
];

export function DifferenceSection() {
  return (
    <Box bg="gray.50" py={{ base: 16, md: 20 }} width="100%">
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontFamily="Poppins, sans-serif"
              color="brand.500"
            >
              What Makes Us Different
            </Heading>
            <Text
              maxW="2xl"
              fontSize={{ base: "md", md: "lg" }}
              fontFamily="Open Sans, sans-serif"
              color="gray.600"
            >
              Hope4PKD is not another donation page. It is a patient-first
              support infrastructure built on trust, structure, and
              accountability.
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} width="100%">
            {differences.map((item) => (
              <HStack key={item.title} align="flex-start" gap={4}>
                <Icon
                  as={HiCheckCircle}
                  boxSize={7}
                  color="brand.500"
                  flexShrink={0}
                  mt={0.5}
                />
                <Stack gap={1}>
                  <Heading
                    as="h3"
                    fontSize="lg"
                    fontFamily="Poppins, sans-serif"
                    color="gray.900"
                  >
                    {item.title}
                  </Heading>
                  <Text
                    fontSize="sm"
                    fontFamily="Open Sans, sans-serif"
                    color="gray.600"
                    lineHeight="1.7"
                  >
                    {item.description}
                  </Text>
                </Stack>
              </HStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
