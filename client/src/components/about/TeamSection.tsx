"use client";

import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

const team: { name: string; role: string }[] = [
  { name: "Onyekachi Nwakaihe", role: "Founder / Executive Director" },
  { name: "Maureen Alor", role: "Patient Support and Programs" },
  { name: "Ifunanya Nwakaihe", role: "Partnerships and Fundraising" },
  { name: "Israel Oyebamiji", role: "Communications and Events" },
  { name: "Praise Komolafe", role: "Medical Research and Impact" },
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
              color="brand.500"
            >
              Meet the Team
            </Heading>
            <Text
              maxW="2xl"
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
            >
              The people working every day to make sure no one navigates PKD
              alone.
            </Text>
          </VStack>
          <Flex wrap="wrap" justify="center" gap={8} width="100%">
            {team.map((member) => (
              <VStack
                key={member.name}
                width={{
                  base: "100%",
                  sm: "calc(50% - 1rem)",
                  lg: "calc(25% - 1.5rem)",
                }}
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
                >
                  {initials(member.name)}
                </Box>
                <VStack gap={1}>
                  <Heading
                    as="h3"
                    fontSize="md"
                    color="gray.900"
                    textAlign="center"
                  >
                    {member.name}
                  </Heading>
                  <Text
                    fontSize="sm"
                    color="brand.500"
                    fontWeight="medium"
                    textAlign="center"
                  >
                    {member.role}
                  </Text>
                </VStack>
              </VStack>
            ))}
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
