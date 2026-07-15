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
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";

const StatementCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box
    bg="brand.50"
    borderLeft="4px solid"
    borderColor="brand.500"
    borderRadius="md"
    p={5}
  >
    <Heading as="h3" size="md" color="brand.500" mb={2}>
      {title}
    </Heading>
    <Text fontSize="sm" lineHeight="1.7">
      {children}
    </Text>
  </Box>
);

export function AboutSection() {
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
              color="brand.500"
              lineHeight="1.2"
            >
              A Trusted Support Ecosystem for PKD Patients
            </Heading>
            <Text fontSize="md">
              Polycystic Kidney Disease (PKD) is a life-altering chronic
              condition. In Nigeria, many patients struggle with delayed
              diagnosis, limited awareness, expensive treatment pathways, and
              poor access to structured guidance throughout their healthcare
              journey.
            </Text>
            <Text fontSize="md">
              Hope4PKD exists to bridge these gaps. More than a charity or
              fundraising platform, we are a coordinated, transparent, and
              compassionate support infrastructure — connecting patients to the
              care, information, financial access, medical validation, and
              community they need.
            </Text>
            <Text fontSize="md">
              At our core is a simple belief: no individual should have to
              navigate PKD alone.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <StatementCard title="Our Vision">
                A future where every individual living with PKD in Nigeria has
                access to the support, care, resources, and community needed to
                live healthier, longer, and more dignified lives.
              </StatementCard>
              <StatementCard title="Our Mission">
                To provide a transparent, structured, and accessible patient
                support ecosystem through patient navigation, medical
                verification, financial access, awareness, advocacy, and
                strategic healthcare partnerships.
              </StatementCard>
            </SimpleGrid>
            <Link href="/about">
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
            </Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
