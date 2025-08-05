"use client";

import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

export function AboutSection() {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <Box py={16} width="100%" position="relative">
      <Container maxW="7xl">
        <Flex
          direction={{
            base: "column",
            lg: "row",
          }}
          align="center"
          gap={10}
        >
          <Box
            flex="1"
            maxW={{
              lg: "50%",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2670&auto=format&fit=crop"
              alt="Medical professionals with patient"
              borderRadius="lg"
              boxShadow="lg"
              objectFit="cover"
              width="100%"
            />
          </Box>
          <Stack
            flex="1"
            gap={5}
            maxW={{
              lg: "50%",
            }}
          >
            <Heading
              as="h2"
              fontSize={{
                base: "2xl",
                md: "3xl",
              }}
              fontFamily="Poppins, sans-serif"
              color="#2E7D32"
              lineHeight="1.2"
            >
              Creating a Chance at Life-saving Transplants
            </Heading>
            <Text fontSize="md" fontFamily="Open Sans, sans-serif">
              Polycystic Kidney Disease (PKD) affects thousands of Nigerians,
              requiring costly transplants that are out of reach for many
              families.
            </Text>
            <Text fontSize="md" fontFamily="Open Sans, sans-serif">
              HOPE4PKD bridges this gap by creating a trusted ecosystem where
              verified donors can safely connect with patients, while our
              crowdfunding platform makes the financial burden manageable.
            </Text>
            <Text fontSize="md" fontFamily="Open Sans, sans-serif">
              In partnership with Adenike Renal Centre, we ensure all medical
              procedures meet international standards with comprehensive pre and
              post-operative care.
            </Text>
            <Button
              alignSelf="flex-start"
              mt={2}
              px={8}
              size="md"
              rounded="full"
              variant="outline"
            >
              Learn More
            </Button>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
