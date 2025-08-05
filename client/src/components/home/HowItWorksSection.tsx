"use client"

import { 
  Box, 
  Container, 
  SimpleGrid, 
  VStack, 
  HStack,
  Text, 
  Icon
} from "@chakra-ui/react"
import { HiUserPlus, HiMagnifyingGlass, HiHeart, HiSparkles } from "react-icons/hi2"

const ProcessCard = ({ 
  icon, 
  title, 
  description, 
  step 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  step: number;
}) => (
  <Box 
    p={6} 
    bg="white" 
    rounded="xl"
    shadow="md"
    border="1px solid"
    borderColor="gray.200"
    position="relative"
  >
    <VStack gap={4} align="start">
      <HStack justify="space-between" w="full">
        <Box 
          p={3} 
          bg="brand.500" 
          rounded="lg" 
          color="white"
        >
          <Icon as={icon} w={6} h={6} />
        </Box>
        <Box 
          w={8} 
          h={8} 
          bg="accent.500" 
          rounded="full" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          color="white"
          fontSize="sm"
          fontWeight="bold"
        >
          {step}
        </Box>
      </HStack>
      
      <VStack align="start" gap={2}>
        <Text fontSize="xl" fontWeight="semibold" color="gray.900">
          {title}
        </Text>
        <Text color="gray.600">
          {description}
        </Text>
      </VStack>
    </VStack>
  </Box>
)

export function HowItWorksSection() {
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
              How Hope4PKD Works
            </Text>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="2xl"
            >
              Our simple, secure process connects PKD patients with donors and financial support 
              through our partnership with Adenike Renal Centre.
            </Text>
          </VStack>

          {/* For Patients */}
          <VStack gap={8} w="full">
            <Text fontSize="2xl" fontWeight="bold" color="brand.500" textAlign="center">
              For Patients
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
              <ProcessCard
                icon={HiUserPlus}
                title="Create Profile"
                description="Register and complete medical verification with our partner hospital"
                step={1}
              />
              <ProcessCard
                icon={HiMagnifyingGlass}
                title="Find Matches"
                description="Our system matches you with compatible donors based on medical criteria"
                step={2}
              />
              <ProcessCard
                icon={HiHeart}
                title="Start Campaign"
                description="Launch a crowdfunding campaign to cover medical expenses"
                step={3}
              />
              <ProcessCard
                icon={HiSparkles}
                title="Get Treatment"
                description="Receive your transplant at Adenike Renal Centre with full support"
                step={4}
              />
            </SimpleGrid>
          </VStack>

          {/* For Donors */}
          <VStack gap={8} w="full">
            <Text fontSize="2xl" fontWeight="bold" color="accent.500" textAlign="center">
              For Donors
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
              <ProcessCard
                icon={HiUserPlus}
                title="Apply to Donate"
                description="Complete our comprehensive donor application and initial screening"
                step={1}
              />
              <ProcessCard
                icon={HiMagnifyingGlass}
                title="Medical Screening"
                description="Undergo thorough medical evaluation at Adenike Renal Centre"
                step={2}
              />
              <ProcessCard
                icon={HiHeart}
                title="Match with Patient"
                description="Get matched with a compatible patient based on medical criteria"
                step={3}
              />
              <ProcessCard
                icon={HiSparkles}
                title="Save a Life"
                description="Complete the donation procedure and change someone's life forever"
                step={4}
              />
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}