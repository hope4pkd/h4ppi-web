"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { HiUsers, HiCurrencyDollar, HiBuildingOffice2 } from "react-icons/hi2";

interface CoreFocusCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  bgColor: string;
}

const CoreFocusCard = ({
  title,
  description,
  icon,
  bgColor,
}: CoreFocusCardProps) => {
  return (
    <VStack
      bg="white"
      p={8}
      borderRadius="lg"
      boxShadow="md"
      gap={4}
      align="center"
      textAlign="center"
      transition="transform 0.3s"
      _hover={{
        transform: "translateY(-5px)",
      }}
    >
      <Box p={4} bg={bgColor} rounded="xl" color="white" shadow="lg">
        <Icon as={icon} boxSize={12} h={7} w={7} />
      </Box>

      <Heading as="h3" size="lg" fontWeight="bold" color={bgColor}>
        {title}
      </Heading>
      <Text fontFamily="Open Sans, sans-serif">{description}</Text>
    </VStack>
  );
};
export function CoreFocusSection() {
  return (
    <Box py={16} bg="gray.50" width="100%" position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="-50px"
        right="-50px"
        w="200px"
        h="200px"
        bg="brand.100"
        rounded="full"
        opacity={0.3}
        blur="3xl"
      />
      <Box
        position="absolute"
        bottom="-30px"
        left="-30px"
        w="150px"
        h="150px"
        bg="accent.100"
        rounded="full"
        opacity={0.4}
        blur="2xl"
      />
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading
              as="h2"
              fontSize={{
                base: "2xl",
                md: "3xl",
              }}
              color="brand.500"
            >
              Our Core Focus
            </Heading>
            <Text
              maxW="2xl"
              fontSize={{
                base: "md",
                md: "lg",
              }}
              fontFamily="Open Sans, sans-serif"
            >
              HOPE4PKD Patients Initiative provides a comprehensive ecosystem
              for PKD patients seeking life-saving treatments.
            </Text>
          </VStack>
          <SimpleGrid
            columns={{
              base: 1,
              md: 3,
            }}
            gap={10}
            width="100%"
          >
            <CoreFocusCard
              title="Verified Donors"
              description="We connect patients with medically-verified kidney donors through an advanced, secure and ethical matching system."
              icon={HiUsers}
              bgColor="brand.500"
            />
            <CoreFocusCard
              title="Crowdfund Support"
              description="Our platform enables transparent fundraising for treatment costs with 100% of funds going to medical care."
              icon={HiCurrencyDollar}
              bgColor="accent.500"
            />
            <CoreFocusCard
              title="Verified Medical Partner"
              description="All procedures are performed at the specialized Adenike Renal Centre, ensuring quality care and oversight."
              icon={HiBuildingOffice2}
              bgColor="brand.500"
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
