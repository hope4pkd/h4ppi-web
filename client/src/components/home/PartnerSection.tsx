"use client"

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Icon
} from "@chakra-ui/react"
import Link from "next/link"
import {
  HiBuildingOffice2,
  HiBuildingLibrary,
  HiUserGroup,
  HiRocketLaunch
} from "react-icons/hi2"

const PathwayCard = ({
  name,
  description,
  icon,
  color
}: {
  name: string;
  description: string;
  icon: any;
  color: string;
}) => (
  <Box
    p={6}
    bg="white"
    rounded="xl"
    shadow="md"
    border="1px solid"
    borderColor="gray.200"
    textAlign="center"
  >
    <VStack gap={4}>
      <Box
        p={4}
        bg={color}
        rounded="lg"
        color="white"
      >
        <Icon as={icon} w={8} h={8} />
      </Box>

      <VStack gap={2}>
        <Text fontSize="lg" fontWeight="bold" color="gray.900">
          {name}
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          {description}
        </Text>
      </VStack>
    </VStack>
  </Box>
)

export function PartnerSection() {
  return (
    <Box py={{ base: 16, md: 20 }} bg="gray.50">
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
            >
              Partner With Us
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              maxW="2xl"
            >
              Long-term impact requires sustainable systems beyond one-time
              donations. Hope4PKD is built on partnerships that keep support
              flowing to verified patients.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
            <PathwayCard
              name="Corporate Partnerships"
              description="CSR partnerships with banks, telecoms, energy companies, and healthcare organisations supporting patient sponsorship and awareness programmes"
              icon={HiBuildingOffice2}
              color="brand.500"
            />
            <PathwayCard
              name="Grants & Institutional Funding"
              description="Global health grants, NGO funding programmes, public health partnerships, and international donor support"
              icon={HiBuildingLibrary}
              color="accent.500"
            />
            <PathwayCard
              name="Community Events"
              description="Recurring fundraising and awareness events like the Hope4PKD Walk/Run, powered by registrations, sponsorships, and community fundraising"
              icon={HiUserGroup}
              color="brand.500"
            />
            <PathwayCard
              name="Social Enterprise"
              description="Mission-aligned ventures — pharmacy partnerships and health technology platforms — with revenue reinvested into supporting PKD patients"
              icon={HiRocketLaunch}
              color="accent.500"
            />
          </SimpleGrid>

          {/* Call to Action */}
          <VStack gap={6} textAlign="center" py={8}>
            <Text fontSize="xl" fontWeight="semibold" color="gray.900">
              No Patient Should Walk This Journey Alone
            </Text>
            <Text color="gray.600" maxW="md">
              Join a community of patients, caregivers, supporters, and
              partners building a stronger, more coordinated support system
              for PKD patients and families in Nigeria.
            </Text>
            <HStack gap={4}>
              <Link href="/patients">
                <Button variant="solid" size="lg" rounded="full">
                  Get Support
                </Button>
              </Link>
              <Link href="/donors">
                <Button variant="outline" size="lg" rounded="full">
                  Support a Patient
                </Button>
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}