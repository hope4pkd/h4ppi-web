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
  HiUsers,
  HiHandRaised,
  HiChatBubbleLeftRight,
  HiBookOpen,
} from "react-icons/hi2";

const SupportCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <Box
    p={6}
    bg="white"
    rounded="xl"
    shadow="md"
    border="1px solid"
    borderColor="gray.200"
  >
    <VStack gap={4} align="start">
      <Box p={3} bg="brand.500" rounded="lg" color="white">
        <Icon as={icon} w={6} h={6} />
      </Box>
      <VStack align="start" gap={2}>
        <Text fontSize="lg" fontWeight="semibold" color="gray.900">
          {title}
        </Text>
        <Text color="gray.600" fontSize="sm">
          {description}
        </Text>
      </VStack>
    </VStack>
  </Box>
);

export function PatientSupport() {
  return (
    <Box id="community" py={{ base: 16, md: 20 }}>
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
            >
              Community &amp; Emotional Support
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
              Living with a chronic condition can feel isolating. We believe
              healing is not only medical, but emotional and communal.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
            <SupportCard
              icon={HiUsers}
              title="Patient Communities"
              description="Connect with other people living with PKD in safe, supportive spaces built for shared experiences"
            />
            <SupportCard
              icon={HiHandRaised}
              title="Caregiver Networks"
              description="Support networks for the family members and caregivers walking this journey alongside patients"
            />
            <SupportCard
              icon={HiChatBubbleLeftRight}
              title="Peer Encouragement"
              description="Survivor and patient stories, peer encouragement systems, and community engagement that remind you hope is real"
            />
            <SupportCard
              icon={HiBookOpen}
              title="Education & Resources"
              description="Trusted educational content about PKD — its hereditary nature, symptoms, and management — for you and your family"
            />
          </SimpleGrid>

          {/* Community CTA */}
          <Box
            p={8}
            bg="brand.50"
            w="full"
            rounded="xl"
            shadow="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <VStack gap={6} textAlign="center">
              <VStack gap={4}>
                <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                  Join Our Patient Community
                </Text>
                <Text color="gray.600" maxW="2xl">
                  Whether you are newly diagnosed, on dialysis, caring for a
                  loved one, or simply seeking answers — there is a place for
                  you here. No one should walk this journey alone.
                </Text>
              </VStack>
              <Link href="#intake">
                <Button variant="solid" size="lg" rounded="full">
                  Get Connected
                </Button>
              </Link>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
