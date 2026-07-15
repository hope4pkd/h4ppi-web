"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Icon,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiEnvelope, HiPhone, HiMapPin } from "react-icons/hi2";
import type { IconType } from "react-icons";

// TODO: replace placeholder contact details with the initiative's real
// email, phone number, and address before launch.
const contactChannels: {
  icon: IconType;
  title: string;
  value: string;
  href?: string;
  accent: boolean;
}[] = [
  {
    icon: HiEnvelope,
    title: "Email Us",
    value: "hello@hope4pkd.org",
    href: "mailto:hello@hope4pkd.org",
    accent: false,
  },
  {
    icon: HiPhone,
    title: "Call Us",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
    accent: true,
  },
  {
    icon: HiMapPin,
    title: "Find Us",
    value: "Lagos, Nigeria",
    accent: false,
  },
];

export function ContactInfoSection() {
  return (
    <Box py={{ base: 16, md: 20 }} width="100%">
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          {contactChannels.map((channel) => (
            <VStack
              key={channel.title}
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
              p={8}
              gap={4}
              textAlign="center"
              transition="transform 0.2s ease"
              _hover={{ transform: "translateY(-5px)" }}
            >
              <Box
                p={4}
                bg={channel.accent ? "accent.500" : "brand.500"}
                rounded="xl"
                color="white"
              >
                <Icon as={channel.icon} boxSize={6} />
              </Box>
              <Heading
                as="h3"
                fontSize="lg"
                fontFamily="Poppins, sans-serif"
                color="gray.900"
              >
                {channel.title}
              </Heading>
              {channel.href ? (
                <ChakraLink
                  href={channel.href}
                  color="brand.500"
                  fontFamily="Open Sans, sans-serif"
                  fontWeight="medium"
                >
                  {channel.value}
                </ChakraLink>
              ) : (
                <Text
                  color="gray.600"
                  fontFamily="Open Sans, sans-serif"
                  fontWeight="medium"
                >
                  {channel.value}
                </Text>
              )}
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
