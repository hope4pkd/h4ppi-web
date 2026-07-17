"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  HiHeart,
  HiArrowPath,
  HiBuildingOffice2,
  HiMegaphone,
} from "react-icons/hi2";

const supportWays = [
  {
    icon: HiHeart,
    title: "Give to a Campaign",
    description:
      "Contribute directly to verified patient campaigns or the general patient support fund",
    color: "brand.500",
  },
  {
    icon: HiArrowPath,
    title: "Sponsor a Patient",
    description:
      "Become a monthly sponsor and provide steady support a patient can count on through treatment",
    color: "sky.500",
  },
  {
    icon: HiBuildingOffice2,
    title: "Partner With Us",
    description:
      "Bring your organisation on board through CSR partnerships, grants, and institutional funding",
    color: "brand.500",
  },
  {
    icon: HiMegaphone,
    title: "Spread Awareness",
    description:
      "Join community events, share patient stories, and help more Nigerians understand PKD",
    color: "sky.500",
  },
];

export function HowToSupport() {
  return (
    <Box py={{ base: 16, md: 20 }} bg="gray.50">
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
            >
              How You Can Help
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
              Whether you give once, give monthly, partner as an organisation,
              or simply raise your voice — you become part of a coordinated
              support system for PKD patients in Nigeria.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
            {supportWays.map((way) => (
              <Box
                key={way.title}
                p={6}
                bg="white"
                rounded="xl"
                shadow="md"
                border="1px solid"
                borderColor="gray.200"
                textAlign="center"
              >
                <VStack gap={4}>
                  <Box p={4} bg={way.color} rounded="lg" color="white">
                    <Icon as={way.icon} w={8} h={8} />
                  </Box>
                  <VStack gap={2}>
                    <Text fontSize="lg" fontWeight="bold" color="gray.900">
                      {way.title}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {way.description}
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Call to Action */}
          <VStack gap={6} textAlign="center" py={4}>
            <Text fontSize="xl" fontWeight="semibold" color="gray.900">
              No Patient Should Walk This Journey Alone
            </Text>
            <Text color="gray.600" maxW="md">
              Every contribution — financial or otherwise — helps build a
              stronger, more coordinated support system for PKD patients and
              families.
            </Text>
            <HStack gap={4} flexWrap="wrap" justifyContent="center">
              <Link href="/donors#support-form">
                <Button variant="solid" size="lg" rounded="full">
                  Become a Supporter
                </Button>
              </Link>
              <Link href="/patients">
                <Button variant="outline" size="lg" rounded="full">
                  Get Support
                </Button>
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
