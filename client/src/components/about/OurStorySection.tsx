"use client";

import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export function OurStorySection() {
  return (
    <Box py={{ base: 16, md: 20 }} width="100%">
      <Container maxW="7xl">
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          gap={10}
        >
          <Box flex="1" maxW={{ lg: "50%" }}>
            <Image
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2670&auto=format&fit=crop"
              alt="Healthcare worker supporting a patient"
              borderRadius="lg"
              boxShadow="lg"
              objectFit="cover"
              width="100%"
            />
          </Box>
          <Stack flex="1" gap={5} maxW={{ lg: "50%" }}>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontFamily="Poppins, sans-serif"
              color="brand.500"
              lineHeight="1.2"
            >
              Our Story
            </Heading>
            <Text fontSize="md" fontFamily="Open Sans, sans-serif" lineHeight="1.8">
              Hope4PKD was born out of a painful reality: in Nigeria, a
              diagnosis of Polycystic Kidney Disease too often means facing a
              life-altering chronic condition alone. Patients and families
              confront delayed diagnosis, limited public awareness, expensive
              treatment pathways, and almost no structured guidance through the
              healthcare system.
            </Text>
            <Text fontSize="md" fontFamily="Open Sans, sans-serif" lineHeight="1.8">
              We saw that goodwill alone was not enough. Ad-hoc charity and
              one-off fundraising could not close the gap between patients and
              the care they need. What was missing was infrastructure — a
              trusted system that verifies cases, navigates patients through
              their journey, coordinates financial support transparently, and
              surrounds every patient with community.
            </Text>
            <Text fontSize="md" fontFamily="Open Sans, sans-serif" lineHeight="1.8">
              So we built one. Hope4PKD is a patient support ecosystem — more
              than a charity or fundraising platform — grounded in a simple
              belief: no individual should have to navigate PKD alone.
            </Text>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
