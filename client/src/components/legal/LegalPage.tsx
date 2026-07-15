"use client";

import React from "react";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}

export function LegalPage({ title, lastUpdated, intro, sections }: LegalPageProps) {
  return (
    <Box width="100%">
      <Box bg="gray.50" py={{ base: 12, md: 16 }}>
        <Container maxW="4xl">
          <Stack gap={3}>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontFamily="Poppins, sans-serif"
              color="brand.500"
              lineHeight="1.2"
            >
              {title}
            </Heading>
            <Text fontSize="sm" color="gray.500" fontFamily="Open Sans, sans-serif">
              Last updated: {lastUpdated}
            </Text>
            {intro && (
              <Text
                fontSize="md"
                color="gray.700"
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.8"
              >
                {intro}
              </Text>
            )}
          </Stack>
        </Container>
      </Box>
      <Box py={{ base: 12, md: 16 }}>
        <Container maxW="4xl">
          <Stack gap={10}>
            {sections.map((section) => (
              <Stack key={section.heading} gap={4}>
                <Heading
                  as="h2"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontFamily="Poppins, sans-serif"
                  color="brand.500"
                >
                  {section.heading}
                </Heading>
                {section.body.map((paragraph, index) => (
                  <Text
                    key={index}
                    fontSize="md"
                    color="gray.700"
                    fontFamily="Open Sans, sans-serif"
                    lineHeight="1.8"
                  >
                    {paragraph}
                  </Text>
                ))}
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
