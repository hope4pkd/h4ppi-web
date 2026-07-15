"use client";

import React from "react";
import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export function HelpCTA() {
  return (
    <Box bg="gray.50" py={{ base: 14, md: 16 }} width="100%">
      <Container maxW="7xl">
        <VStack gap={4} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            color="brand.500"
          >
            Still Have Questions?
          </Heading>
          <Text
            maxW="2xl"
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
          >
            Our team is happy to help — whether you are a patient, a family
            member, or someone who wants to support the mission.
          </Text>
          <Link href="/contact">
            <Button size="lg" rounded="full" variant="solid" px={8} mt={2}>
              Contact Us
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
