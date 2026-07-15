"use client";

import React from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export function HelpHero() {
  return (
    <Box bg="brand.500" py={{ base: 14, md: 20 }} width="100%">
      <Container maxW="7xl">
        <VStack gap={4} textAlign="center">
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontFamily="Poppins, sans-serif"
            color="white"
            lineHeight="1.2"
          >
            Help Center
          </Heading>
          <Text
            maxW="2xl"
            fontSize={{ base: "md", md: "lg" }}
            fontFamily="Open Sans, sans-serif"
            color="whiteAlpha.900"
          >
            Answers to common questions about Polycystic Kidney Disease, how
            Hope4PKD supports patients, and how you can help.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
