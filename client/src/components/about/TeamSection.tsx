"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

// TODO: replace placeholder team data with real names, roles, and photos.
const team: { name: string; role: string }[] = [
  { name: "Adaeze Okafor", role: "Founder / Executive Director" },
  { name: "Dr. Emeka Nwosu", role: "Medical Advisor" },
  { name: "Funmi Adebayo", role: "Patient Navigation Lead" },
  { name: "Chidi Eze", role: "Community & Partnerships Lead" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export function TeamSection() {
  return (
    <Box py={{ base: 16, md: 20 }} width="100%">
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontFamily="Poppins, sans-serif"
              color="brand.500"
            >
              Meet the Team
            </Heading>
            <Text
              maxW="2xl"
              fontSize={{ base: "md", md: "lg" }}
              fontFamily="Open Sans, sans-serif"
              color="gray.600"
            >
              The people working every day to make sure no one navigates PKD
              alone.
            </Text>
          </VStack>
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 4 }}
            gap={8}
            width="100%"
          >
            {team.map((member) => (
              <VStack
                key={member.name}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                border="1px solid"
                borderColor="gray.200"
                p={8}
                gap={4}
                transition="transform 0.2s ease"
                _hover={{ transform: "translateY(-5px)" }}
              >
                <Box
                  boxSize="20"
                  rounded="full"
                  bg="brand.100"
                  color="brand.600"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                  fontSize="xl"
                  fontFamily="Poppins, sans-serif"
                >
                  {initials(member.name)}
                </Box>
                <VStack gap={1}>
                  <Heading
                    as="h3"
                    fontSize="md"
                    fontFamily="Poppins, sans-serif"
                    color="gray.900"
                    textAlign="center"
                  >
                    {member.name}
                  </Heading>
                  <Text
                    fontSize="sm"
                    fontFamily="Open Sans, sans-serif"
                    color="brand.500"
                    fontWeight="medium"
                    textAlign="center"
                  >
                    {member.role}
                  </Text>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
