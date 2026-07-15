"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

export function CampaignsHeroSection() {
  return (
    <Box bgGradient="to-br" gradientFrom="brand.50" gradientTo="white" py={{ base: 16, md: 20 }}>
      <Container maxW="7xl">
        <VStack gap={6} textAlign="center" maxW="3xl" mx="auto">
          <Text
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
            lineHeight="1.1"
            color="gray.900"
          >
            Campaigns That Bring{" "}
            <Text as="span" color="brand.500">
              Care
            </Text>{" "}
            Within Reach
          </Text>

          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
            Hope4PKD coordinates fundraising campaigns for medically verified
            PKD patients — and awareness initiatives that help more Nigerians
            understand PKD and seek help earlier. Every campaign is verified
            before it goes live, and every contribution is accounted for.
          </Text>

          <HStack gap={4} flexWrap="wrap" justifyContent="center">
            <Link href="/donors#support-form">
              <Button variant="solid" size="lg" rounded="full">
                Support a Campaign
              </Button>
            </Link>
            <Link href="/patients#intake">
              <Button variant="outline" size="lg" rounded="full">
                Request Support
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
