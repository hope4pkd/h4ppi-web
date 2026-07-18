"use client";

import React from "react";
import Image from "next/image";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

const team: { name: string; role: string; image?: string }[] = [
  {
    name: "Onyekachi Nwakaihe",
    role: "Founder / Executive Director",
    image: "/assets/images/onyekachi.PNG",
  },
  {
    name: "Maureen Alor",
    role: "Patient Support and Programs",
    image: "/assets/images/maureen.png",
  },
  {
    name: "Ifunanya Nwakaihe",
    role: "Partnerships and Fundraising",
    image: "/assets/images/ifunanya.png",
  },
  {
    name: "Israel Oyebamiji",
    role: "Communications and Events",
    image: "/assets/images/israel.png",
  },
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
          <Flex wrap="wrap" justify="center" gap={6} width="100%">
            {team.map((member) => (
              <Box
                key={member.name}
                position="relative"
                width={{
                  base: "100%",
                  sm: "calc(50% - 0.75rem)",
                  lg: "calc(33.333% - 1rem)",
                }}
                maxW={{ base: "360px", sm: "none" }}
                aspectRatio="3/4"
                borderRadius="xl"
                overflow="hidden"
                boxShadow="md"
                cursor="default"
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                _hover={{
                  transform: "translateY(-6px)",
                  boxShadow: "0 16px 40px rgba(22, 48, 92, 0.22)",
                }}
                css={{
                  "& .team-photo": {
                    transition: "transform 0.5s ease",
                  },
                  "&:hover .team-photo": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {member.image ? (
                  <Image
                    className="team-photo"
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 480px) 100vw, (max-width: 992px) 50vw, 33vw"
                  />
                ) : (
                  <Flex
                    className="team-photo"
                    position="absolute"
                    inset={0}
                    align="center"
                    justify="center"
                    bgGradient="to-br"
                    gradientFrom="brand.500"
                    gradientTo="sky.600"
                  >
                    <Text
                      fontSize="5xl"
                      fontWeight="bold"
                      color="whiteAlpha.800"
                      letterSpacing="wider"
                    >
                      {initials(member.name)}
                    </Text>
                  </Flex>
                )}

                <Box
                  position="absolute"
                  inset={0}
                  bgImage="linear-gradient(180deg, rgba(5, 11, 24, 0) 40%, rgba(5, 11, 24, 0.75) 78%, rgba(5, 11, 24, 0.92) 100%)"
                  pointerEvents="none"
                />

                <VStack
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  align="start"
                  gap={1}
                  px={5}
                  pb={5}
                  pt={16}
                  zIndex={1}
                >
                  <Heading
                    as="h3"
                    fontSize={{ base: "md", md: "lg" }}
                    color="white"
                    lineHeight="short"
                  >
                    {member.name}
                  </Heading>
                  <Text fontSize="sm" color="sky.200" fontWeight="medium">
                    {member.role}
                  </Text>
                </VStack>
              </Box>
            ))}
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
