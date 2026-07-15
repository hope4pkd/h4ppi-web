"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiEye, HiFlag } from "react-icons/hi2";
import type { IconType } from "react-icons";

const statements: {
  icon: IconType;
  title: string;
  statement: string;
  supporting: string;
  accent: boolean;
}[] = [
  {
    icon: HiEye,
    title: "Our Vision",
    statement:
      "A future where every individual living with PKD in Nigeria has access to the support, care, resources, and community needed to live healthier, longer, and more dignified lives.",
    supporting:
      "We imagine a Nigeria where a PKD diagnosis comes with a clear path forward — not confusion, isolation, or financial ruin.",
    accent: false,
  },
  {
    icon: HiFlag,
    title: "Our Mission",
    statement:
      "To provide a transparent, structured, and accessible patient support ecosystem through patient navigation, medical verification, financial access, awareness, advocacy, and strategic healthcare partnerships.",
    supporting:
      "Every part of our work — from intake to follow-up — is designed to make that ecosystem trustworthy, accountable, and within reach of the patients who need it.",
    accent: true,
  },
];

export function VisionMissionSection() {
  return (
    <Box bg="gray.50" py={{ base: 16, md: 20 }} width="100%">
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
          {statements.map((item) => (
            <Stack
              key={item.title}
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
              p={{ base: 6, md: 10 }}
              gap={5}
            >
              <Box
                p={4}
                bg={item.accent ? "accent.500" : "brand.500"}
                rounded="xl"
                color="white"
                alignSelf="flex-start"
              >
                <Icon as={item.icon} boxSize={6} />
              </Box>
              <Heading
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
                fontFamily="Poppins, sans-serif"
                color="brand.500"
              >
                {item.title}
              </Heading>
              <Text
                fontSize="md"
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.8"
                color="gray.800"
                fontWeight="medium"
              >
                {item.statement}
              </Text>
              <Text
                fontSize="md"
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.8"
                color="gray.600"
              >
                {item.supporting}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
