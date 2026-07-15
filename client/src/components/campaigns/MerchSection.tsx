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
  Flex,
} from "@chakra-ui/react";
import type { IconType } from "react-icons";
import {
  PiTShirt,
  PiBaseballCap,
  PiWatch,
  PiTote,
} from "react-icons/pi";
import { HiEnvelope } from "react-icons/hi2";

type MerchItem = {
  icon: IconType;
  name: string;
  description: string;
  price: string;
  bgImage: string;
};

// Placeholder items — swap descriptions, prices, and gradient tiles for real
// product photos (public/assets/merch/) when available.
const merchItems: MerchItem[] = [
  {
    icon: PiTShirt,
    name: "Hope4PKD T-Shirt",
    description:
      "Soft cotton tee with the Hope4PKD logo — wear it to walks, runs, and everyday awareness",
    price: "₦7,500",
    bgImage:
      "linear-gradient(135deg, {colors.brand.500}, {colors.sky.400} 70%, {colors.sky.100})",
  },
  {
    icon: PiBaseballCap,
    name: "Hope4PKD Cap",
    description:
      "Adjustable embroidered cap for community events and sunny-day advocacy",
    price: "₦5,000",
    bgImage:
      "linear-gradient(160deg, {colors.sky.600}, {colors.sky.300} 60%, {colors.sky.100})",
  },
  {
    icon: PiWatch,
    name: "Awareness Wristband",
    description:
      "Silicone wristband that starts conversations about PKD wherever you go",
    price: "₦1,000",
    bgImage: "linear-gradient(200deg, {colors.accent.500}, {colors.accent.100})",
  },
  {
    icon: PiTote,
    name: "Hope4PKD Tote Bag",
    description:
      "Sturdy canvas tote for market runs, clinic visits, and carrying hope around",
    price: "₦4,000",
    bgImage:
      "linear-gradient(135deg, {colors.brand.600}, {colors.brand.400} 65%, {colors.brand.100})",
  },
];

const orderSteps = [
  {
    title: "Pick your items",
    description: "Choose the merch you'd like and note the total amount",
  },
  {
    title: "Make a bank transfer",
    description: "Transfer the total to the Hope4PKD account shown below",
  },
  {
    title: "Send us your order",
    description:
      "Email your proof of payment, items, and delivery details — we'll confirm and dispatch",
  },
];

// TODO: replace with the real Hope4PKD account details
const bankDetails = [
  { label: "Bank", value: "Account details coming soon" },
  { label: "Account Name", value: "Hope4PKD Initiative" },
  { label: "Account Number", value: "—" },
];

const orderMailto = `mailto:hello@hope4pkd.org?subject=${encodeURIComponent(
  "Merch Order — Hope4PKD"
)}&body=${encodeURIComponent(
  "Hello Hope4PKD,\n\nI'd like to order the following merch:\n\n- Item(s) & quantity:\n- Total transferred:\n- Delivery address:\n- Phone number:\n\nProof of payment is attached.\n\nThank you!"
)}`;

export function MerchSection() {
  return (
    <Box id="merch" py={{ base: 16, md: 20 }} bg="white">
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
            >
              Wear Your Support
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
              Every piece of Hope4PKD merch funds patient support and sparks
              conversations about PKD. Pick your favourites and order in three
              simple steps.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} w="full">
            {merchItems.map((item) => (
              <Box
                key={item.name}
                bg="white"
                rounded="xl"
                shadow="md"
                border="1px solid"
                borderColor="gray.200"
                overflow="hidden"
                transition="transform 0.3s"
                _hover={{ transform: "translateY(-5px)" }}
              >
                <Flex
                  h="160px"
                  bgImage={item.bgImage}
                  align="center"
                  justify="center"
                >
                  <Icon as={item.icon} w={16} h={16} color="whiteAlpha.900" />
                </Flex>
                <VStack align="start" gap={2} p={5}>
                  <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                    {item.name}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {item.description}
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" color="brand.500">
                    {item.price}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          <Box
            w="full"
            p={{ base: 6, md: 8 }}
            bg="brand.50"
            rounded="xl"
            shadow="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <VStack gap={8}>
              <VStack gap={2} textAlign="center">
                <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                  How to Order
                </Text>
                <Text color="gray.600" maxW="2xl">
                  We currently take orders by bank transfer — no card or online
                  checkout needed.
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
                {orderSteps.map((step, index) => (
                  <VStack
                    key={step.title}
                    gap={3}
                    p={5}
                    bg="white"
                    rounded="xl"
                    border="1px solid"
                    borderColor="gray.200"
                    textAlign="center"
                  >
                    <Flex
                      w={10}
                      h={10}
                      rounded="full"
                      bg="brand.500"
                      color="white"
                      align="center"
                      justify="center"
                      fontWeight="bold"
                    >
                      {index + 1}
                    </Flex>
                    <Text fontWeight="semibold" color="gray.900">
                      {step.title}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {step.description}
                    </Text>
                  </VStack>
                ))}
              </SimpleGrid>

              <Box
                w="full"
                maxW="lg"
                p={6}
                bg="white"
                rounded="xl"
                border="1px solid"
                borderColor="gray.200"
              >
                <VStack gap={3}>
                  <Text
                    fontSize="xs"
                    letterSpacing="1.5px"
                    textTransform="uppercase"
                    fontWeight="700"
                    color="brand.500"
                  >
                    Bank Transfer Details
                  </Text>
                  {bankDetails.map((detail) => (
                    <HStack
                      key={detail.label}
                      w="full"
                      justify="space-between"
                      gap={4}
                    >
                      <Text fontSize="sm" color="gray.600">
                        {detail.label}
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                        {detail.value}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              <a href={orderMailto}>
                <Button variant="solid" size="lg" rounded="full">
                  <Icon as={HiEnvelope} />
                  Email Your Order
                </Button>
              </a>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
