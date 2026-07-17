"use client";

import {
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";

const photoScrim = "linear-gradient(180deg, rgba(10, 30, 60, 0) 45%, rgba(10, 30, 60, 0.65))";

const photoCards = [
  {
    label: "Patient & caregiver, Abuja clinic",
    bgImage: `${photoScrim}, url('/assets/images/patient-caregiver-hands.png')`,
    labelColor: "whiteAlpha.900",
  },
  {
    label: "Our volunteers",
    bgImage: `${photoScrim}, url('https://images.unsplash.com/photo-1710093072228-8c3129f27357?q=80&w=1200&auto=format&fit=crop')`,
    labelColor: "whiteAlpha.900",
  },
  {
    label: "Community walk",
    bgImage: `${photoScrim}, url('https://images.unsplash.com/photo-1770240366958-9d00bca04e26?q=80&w=1200&auto=format&fit=crop')`,
    labelColor: "whiteAlpha.900",
  },
];

export function HeroSection() {
  return (
    <Box w="100%">
      <Box bgImage="linear-gradient(180deg, {colors.sky.500} 0%, {colors.sky.400} 45%, {colors.sky.100} 100%)">
        <Container maxW="7xl" pt={{ base: 12, md: 16 }}>
          <Heading
            as="h1"
            color="white"
            fontWeight="800"
            fontSize={{ base: "40px", md: "52px", lg: "62px" }}
            lineHeight="1.06"
            letterSpacing="-1px"
            maxW="860px"
          >
            No one in Nigeria should face polycystic kidney disease alone.
          </Heading>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, md: 8 }}
            mt={6}
            align={{ base: "flex-start", md: "flex-end" }}
            justify="space-between"
            pb={{ base: 8, md: 10 }}
          >
            <Text
              fontSize={{ base: "md", md: "19px" }}
              lineHeight="1.6"
              color="sky.50"
              maxW="460px"
              fontWeight="medium"
            >
              Hope4PKD connects verified PKD patients with the treatment,
              community and funding they need — from dialysis to transplant.
            </Text>
            <HStack gap={3} flexWrap="wrap">
              <Link href="/donors">
                <Button
                  bg="accent.500"
                  color="accent.900"
                  _hover={{ bg: "accent.400", transform: "translateY(-2px)" }}
                  size="lg"
                  rounded="full"
                >
                  Support a patient
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  bg="transparent"
                  borderWidth="2px"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200", transform: "translateY(-2px)" }}
                  size="lg"
                  rounded="full"
                >
                  What we do
                </Button>
              </Link>
            </HStack>
          </Flex>
          {/* Photo trio overlapping the gradient's bottom edge */}
          <Grid
            templateColumns={{ base: "1fr", md: "1.6fr 1fr 1fr" }}
            gap={4}
            transform={{ base: "translateY(40px)", md: "translateY(60px)" }}
          >
            {photoCards.map((card) => (
              <Box
                key={card.label}
                h={{ base: "220px", md: "320px" }}
                rounded="20px"
                bgImage={card.bgImage}
                bgSize="cover"
                bgPos="center"
                display="flex"
                alignItems="flex-end"
                p={5}
                shadow="0 12px 32px rgba(22, 48, 92, 0.2)"
              >
                <Text
                  fontSize="xs"
                  letterSpacing="1.5px"
                  textTransform="uppercase"
                  color={card.labelColor}
                  fontWeight="700"
                >
                  {card.label}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Spacer absorbing the trio's overlap onto the white background */}
      <Box h={{ base: "64px", md: "84px" }} />
    </Box>
  );
}
