"use client";

import {
  Box,
  Container,
  VStack,
  Text,
  Button,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  HiBellAlert,
  HiBeaker,
  HiHeart,
  HiClipboardDocumentList,
  HiMegaphone,
  HiUserGroup,
} from "react-icons/hi2";

const campaignTypes = [
  {
    icon: HiBellAlert,
    title: "Emergency Medical Support",
    description:
      "Rapid coordination of support for verified patients facing urgent, life-threatening medical needs",
    color: "brand.500",
  },
  {
    icon: HiBeaker,
    title: "Dialysis Support",
    description:
      "Helping patients sustain ongoing dialysis treatment — one of the heaviest recurring costs PKD families carry",
    color: "accent.500",
  },
  {
    icon: HiHeart,
    title: "Transplant Support",
    description:
      "Initiatives that help verified patients work toward kidney transplantation and the care surrounding it",
    color: "brand.500",
  },
  {
    icon: HiClipboardDocumentList,
    title: "Medication & Care Access",
    description:
      "Support for medication, consultations, and diagnostic procedures that keep treatment on track",
    color: "accent.500",
  },
  {
    icon: HiMegaphone,
    title: "Awareness & Education",
    description:
      "Campaigns that improve public understanding of PKD, its hereditary nature, and the value of early diagnosis",
    color: "brand.500",
  },
  {
    icon: HiUserGroup,
    title: "Hope4PKD Walk/Run",
    description:
      "Recurring community fundraising and awareness events powered by registrations, sponsorships, and merchandise",
    color: "accent.500",
  },
];

export function CampaignsGrid() {
  return (
    <Box py={{ base: 16, md: 20 }}>
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
            >
              Where Support Is Needed
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
              Our campaigns focus on the areas where PKD patients and families
              carry the heaviest burden.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
            {campaignTypes.map((campaign) => (
              <Box
                key={campaign.title}
                p={6}
                bg="white"
                rounded="xl"
                shadow="md"
                border="1px solid"
                borderColor="gray.200"
                transition="transform 0.3s"
                _hover={{ transform: "translateY(-5px)" }}
              >
                <VStack gap={4} align="start">
                  <Box p={3} bg={campaign.color} rounded="lg" color="white">
                    <Icon as={campaign.icon} w={6} h={6} />
                  </Box>
                  <VStack align="start" gap={2}>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                      {campaign.title}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {campaign.description}
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          <Box
            p={8}
            bg="brand.50"
            w="full"
            textAlign="center"
            rounded="xl"
            shadow="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <VStack gap={4}>
              <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                Individual Patient Campaigns
              </Text>
              <Text color="gray.600" maxW="2xl" mx="auto">
                Verified patient campaigns will be published here as they
                complete our medical verification process. Want to be part of
                them from day one? Register your interest as a supporter and
                we&apos;ll keep you informed.
              </Text>
              <Link href="/donors#support-form">
                <Button variant="solid" size="lg" rounded="full">
                  Register as a Supporter
                </Button>
              </Link>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
