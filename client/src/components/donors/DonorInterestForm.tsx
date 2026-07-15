"use client";

import {
  Box,
  Container,
  VStack,
  Text,
  Button,
  SimpleGrid,
  Input,
  Textarea,
  Icon,
} from "@chakra-ui/react";
import {
  HiHeart,
  HiArrowPath,
  HiBuildingOffice2,
  HiUserGroup,
} from "react-icons/hi2";

const givingOptions = [
  {
    icon: HiHeart,
    title: "One-Time Gift",
    description: "Support a verified patient campaign or the general patient support fund",
  },
  {
    icon: HiArrowPath,
    title: "Monthly Sponsorship",
    description: "Provide steady, recurring support that keeps care flowing to patients",
  },
  {
    icon: HiBuildingOffice2,
    title: "Corporate Partnership",
    description: "CSR partnerships supporting patient sponsorship, awareness, and healthcare interventions",
  },
  {
    icon: HiUserGroup,
    title: "Community Events",
    description: "Sponsor or join events like the Hope4PKD Walk/Run that fund patient support",
  },
];

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <VStack align="start" gap={1} w="full">
    <Text fontSize="sm" fontWeight="semibold" color="gray.700">
      {label}
      {required && (
        <Text as="span" color="red.500">
          {" "}
          *
        </Text>
      )}
    </Text>
    {children}
  </VStack>
);

export function DonorInterestForm() {
  return (
    <Box id="support-form" py={{ base: 16, md: 20 }} bg="gray.50">
      <Container maxW="5xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
            >
              Become a Supporter
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
              There are many ways to stand with PKD patients in Nigeria. Tell
              us how you&apos;d like to help, and our team will reach out to
              discuss the pathway that fits you best.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
            {givingOptions.map((option) => (
              <Box
                key={option.title}
                p={6}
                bg="white"
                rounded="xl"
                shadow="md"
                border="1px solid"
                borderColor="gray.200"
                textAlign="center"
              >
                <VStack gap={3}>
                  <Box p={3} bg="accent.500" rounded="lg" color="accent.900">
                    <Icon as={option.icon} w={6} h={6} />
                  </Box>
                  <Text fontWeight="semibold" color="gray.900">
                    {option.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {option.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          <Box
            w="full"
            p={8}
            bg="white"
            rounded="xl"
            shadow="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <VStack gap={6} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <Field label="Full Name" required>
                  <Input placeholder="Enter your full name" />
                </Field>
                <Field label="Email Address" required>
                  <Input type="email" placeholder="your.email@example.com" />
                </Field>
                <Field label="Phone Number">
                  <Input placeholder="+234 xxx xxx xxxx" />
                </Field>
                <Field label="Organisation (if applicable)">
                  <Input placeholder="Company, foundation, or group name" />
                </Field>
              </SimpleGrid>

              <Field label="How would you like to support?" required>
                <Textarea
                  placeholder="e.g. I'd like to make a one-time donation, sponsor a patient monthly, or explore a corporate partnership"
                  rows={4}
                />
              </Field>

              <Button
                variant="solid"
                size="lg"
                rounded="full"
                alignSelf="center"
                px={10}
              >
                Express Interest
              </Button>

              <Text fontSize="sm" color="gray.600" textAlign="center">
                Hope4PKD is a mission-driven, non-profit initiative. Your
                support goes toward medically verified patient needs, awareness
                programmes, and building better support systems for PKD
                patients in Nigeria.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
