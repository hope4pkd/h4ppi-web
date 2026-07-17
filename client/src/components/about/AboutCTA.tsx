"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export function AboutCTA() {
  return (
    <Box bg="brand.500" py={{ base: 16, md: 20 }} width="100%">
      <Container maxW="7xl">
        <VStack gap={6} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            color="white"
          >
            Join Us in Building Hope
          </Heading>
          <Text
            maxW="2xl"
            fontSize={{ base: "md", md: "lg" }}
            color="whiteAlpha.900"
          >
            Whether you support a patient, partner with us, or help spread
            awareness — you become part of the reason no one in Nigeria has to
            face PKD alone.
          </Text>
          <HStack gap={4} flexWrap="wrap" justifyContent="center">
            <Link href="/donors">
              <Button
                bg="accent.500"
                color="accent.900"
                _hover={{ bg: "accent.400", transform: "translateY(-2px)" }}
                size="lg"
                rounded="full"
              >
                Support a Patient
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                borderColor="white"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                size="lg"
                rounded="full"
              >
                Partner With Us
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
