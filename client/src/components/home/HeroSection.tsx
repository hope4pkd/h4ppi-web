"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";

export function HeroSection() {
  return (
    <Box
      w="100%"
      backgroundImage="url('https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2670&auto=format&fit=crop')"
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
          gap={6}
          py={{
            base: 24,
            md: 32,
          }}
          textAlign="center"
          color="white"
          align="center"
        >
          <Text
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="black"
            lineHeight="1.1"
            textShadow="0 2px 4px rgba(0,0,0,0.1)"
          >
            Restoring{" "}
            <Text
              as="span"
              color="accent.500"
              bgGradient="linear(to-r, accent.400, accent.600)"
              fontWeight="black"
            >
              Hope
            </Text>
            ,
          </Text>
          <Heading
            fontSize={{
              base: "xl",
              md: "3xl",
            }}
            fontWeight="medium"
            fontFamily="Inter, sans-serif"
            pb={2}
          >
            One Kidney at a Time
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            maxW="40rem"
            lineHeight="1.7"
            fontWeight="medium"
          >
            Nigeria&apos;s first platform connecting Polycystic Kidney Disease
            (PKD) patients with verified kidney donors and crowdfunded financial
            aid. Get the life-saving help you need through our trusted medical
            partner.
          </Text>
          <HStack gap={4} flexWrap="wrap" justifyContent="center">
            <Button variant="solid" fontSize="lg" px={8} py={6} rounded="full">
              Find Help Now
            </Button>
            <Button
              variant="outline"
              fontSize="lg"
              px={8}
              py={6}
              rounded="full"
              color="brand.400"
            >
              Become a Donor
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
