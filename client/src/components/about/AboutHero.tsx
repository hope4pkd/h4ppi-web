"use client";

import React from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export function AboutHero() {
  return (
    <Box
      w="100%"
      backgroundImage="url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop')"
      backgroundSize="cover"
      backgroundPosition="center"
      position="relative"
    >
      {/* Dark overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.6)"
      />
      <Container maxW="7xl" position="relative" zIndex="1">
        <VStack
          gap={5}
          py={{ base: 16, md: 24 }}
          textAlign="center"
          color="white"
          align="center"
        >
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="black"
            lineHeight="1.1"
          >
            About{" "}
            <Text as="span" color="accent.500">
              Hope4PKD
            </Text>
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            maxW="40rem"
            lineHeight="1.7"
            fontWeight="medium"
          >
            A coordinated, transparent, and compassionate support
            infrastructure for people living with Polycystic Kidney Disease in
            Nigeria.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
