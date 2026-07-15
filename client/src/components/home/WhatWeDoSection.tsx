"use client";

import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";

const pillars = [
  {
    title: "Verify & support patients",
    description:
      "Medical verification, then coordinated help with dialysis, medication and transplant costs.",
    bg: "brand.50",
  },
  {
    title: "Run transparent campaigns",
    description:
      "Verified costs, coordinated disbursement, monitored impact — donors see where money goes.",
    bg: "accent.50",
  },
  {
    title: "Grow awareness",
    description:
      "Education on PKD's hereditary nature and the value of early diagnosis, nationwide.",
    bg: "brand.50",
  },
];

export function WhatWeDoSection() {
  return (
    <Box as="section" py={{ base: 8, md: 10 }}>
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {pillars.map((pillar) => (
            <Box key={pillar.title} bg={pillar.bg} rounded="16px" p={6}>
              <Text fontWeight="700" fontSize="18px" color="brand.500">
                {pillar.title}
              </Text>
              <Text color="brand.400" fontSize="14px" mt={1.5} lineHeight="1.55">
                {pillar.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
