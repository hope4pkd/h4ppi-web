"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Badge,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  HiCheckCircle,
  HiShieldCheck,
  HiHeart,
  HiChartBar,
} from "react-icons/hi2";

const givingPoints = [
  "Every patient case is medically verified before support is mobilised",
  "Transparent coordination of funds toward real treatment needs",
  "Follow-up and impact monitoring on every supported case",
  "Multiple ways to give — one-time, monthly, or corporate partnership",
];

const TrustCard = ({
  icon,
  title,
  description,
  bg,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  bg: string;
  color: string;
}) => (
  <Box
    p={4}
    bg={bg}
    rounded="xl"
    shadow="md"
    border="1px solid"
    borderColor="gray.200"
  >
    <HStack gap={3} align="start">
      <Icon as={icon} color={color} w={6} h={6} mt={1} />
      <VStack align="start" gap={0}>
        <Text fontWeight="semibold" color="gray.900" fontSize="sm">
          {title}
        </Text>
        <Text color="gray.600" fontSize="sm">
          {description}
        </Text>
      </VStack>
    </HStack>
  </Box>
);

export function DonorHeroSection() {
  return (
    <Box bgGradient="linear(to-br, accent.50, white)" py={{ base: 16, md: 20 }}>
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12} alignItems="center">
          {/* Left Content */}
          <VStack align="start" gap={8}>
            <Badge
              colorPalette="orange"
              size="lg"
              px={3}
              py={1}
              rounded="full"
              fontSize="sm"
            >
              For Supporters &amp; Sponsors
            </Badge>

            <VStack align="start" gap={4}>
              <Text
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                lineHeight="1.1"
                color="gray.900"
              >
                Give{" "}
                <Text as="span" color="accent.500">
                  Hope
                </Text>{" "}
                Where It&apos;s Needed Most
              </Text>

              <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="lg">
                The cost of dialysis, medication, and transplantation is
                devastating for many Nigerian families. Your support helps
                verified PKD patients access life-saving care — through a
                transparent, coordinated, and accountable system.
              </Text>
            </VStack>

            <VStack align="start" gap={3} w="full">
              <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                Why Give Through Hope4PKD:
              </Text>
              <VStack align="start" gap={2}>
                {givingPoints.map((point) => (
                  <HStack key={point} gap={2} align="start">
                    <Icon as={HiCheckCircle} color="accent.500" w={5} h={5} mt={1} />
                    <Text color="gray.700">{point}</Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>

            <HStack gap={4} flexWrap="wrap">
              <Link href="#support-form">
                <Button variant="solid" size="lg" rounded="full">
                  Become a Supporter
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button variant="outline" size="lg" rounded="full">
                  Explore Campaigns
                </Button>
              </Link>
            </HStack>
          </VStack>

          {/* Right Content - Trust Points */}
          <VStack gap={6} align="stretch">
            <Box
              p={6}
              bg="white"
              rounded="xl"
              shadow="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <VStack gap={3}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="gray.900"
                  textAlign="center"
                >
                  Built on Trust
                </Text>
                <Text color="gray.600" textAlign="center" fontSize="sm">
                  Transparency and credibility are central to Hope4PKD. No case
                  is opened for support until it has passed structured medical
                  verification.
                </Text>
              </VStack>
            </Box>

            <SimpleGrid columns={1} gap={4}>
              <TrustCard
                icon={HiShieldCheck}
                title="Verified Cases"
                description="Diagnosis, medical records, treatment plans, and costs are reviewed before any campaign begins"
                bg="accent.50"
                color="accent.500"
              />
              <TrustCard
                icon={HiHeart}
                title="Real Impact"
                description="Your giving is tied to real treatment needs — dialysis, transplants, medication, and emergency care"
                bg="brand.50"
                color="brand.500"
              />
              <TrustCard
                icon={HiChartBar}
                title="Accountability"
                description="Patient progress and outcomes are monitored and reported, so you see the difference you make"
                bg="accent.50"
                color="accent.600"
              />
            </SimpleGrid>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
