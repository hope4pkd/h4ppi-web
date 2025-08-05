"use client"

import { 
  Box, 
  Container, 
  VStack, 
  HStack,
  Text, 
  Button, 
  SimpleGrid
  Badge,
  IconItemIcon
} from "@chakra-ui/react"
import { HiHeart, HiUsers, HiCurrencyDollar, HiSparkles, HiCheckCircle } from "react-icons/hi2"

export function PatientHeroSection() {
  return (
    <Box 
      bgGradient="linear(to-br, brand.50, white)"
      
      py={{ base: 16, md: 20 }}
    >
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12} alignItems="center">
          {/* Left Content */}
          <VStack align="start" gap={8}>
            <Badge 
              colorScheme="green" 
              size="lg" 
              px={3} 
              py={1} 
              rounded="full"
              fontSize="sm"
            >
              🏥 For PKD Patients
            </Badge>
            
            <VStack align="start" gap={4}>
              <Text 
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} 
                fontWeight="bold" 
                lineHeight="1.1"
                color="gray.900"
              >
                Get the{" "}
                <Text as="span" color="brand.500">
                  Help
                </Text>{" "}
                You Need
              </Text>
              
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color="gray.600" 
                maxW="lg"
              >
                Find compatible kidney donors and access crowdfunded financial support 
                for your PKD treatment through our trusted medical partner, 
                Adenike Renal Centre.
              </Text>
            </VStack>

            <VStack align="start" gap={3} w="full">
              <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                What's Included:
              </Text>
              <gap={2}>
                <Item>
                  <Icon as={HiCheckCircle} color="brand.500" />
                  Donor matching based on medical compatibility
                </Item>
                <Item>
                  <Icon as={HiCheckCircle} color="brand.500" />
                  Crowdfunding platform for medical expenses
                </Item>
                <Item>
                  <Icon as={HiCheckCircle} color="brand.500" />
                  Medical support through Adenike Renal Centre
                </Item>
                <Item>
                  <Icon as={HiCheckCircle} color="brand.500" />
                  24/7 patient support and guidance
                </Item>
              </>
            </VStack>

            <HStack gap={4} flexWrap="wrap">
              <Button 
                variant="solid" 
                size="lg" 
                
              >
                Register as Patient
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                
              >
                Start Campaign
              </Button>
            </HStack>
          </VStack>

          {/* Right Content - Stats & Features */}
          <VStack gap={6} align="stretch">
            <Box p={6} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
              <VStack gap={4}>
                <Text fontSize="xl" fontWeight="bold" color="gray.900" textAlign="center">
                  Success Stories
                </Text>
                <SimpleGrid columns={3} gap={4} w="full">
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                      150+
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Patients Helped
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                      45+
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Successful Matches
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="accent.500">
                      ₦25M+
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Funds Raised
                    </Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </Box>

            <SimpleGrid columns={1} gap={4}>
              <Box p={4} bg="brand.50"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <HStack gap={3}>
                  <Icon as={HiHeart} color="brand.500" w={6} h={6} />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="semibold" color="gray.900" fontSize="sm">
                      Average Match Time
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      2-4 weeks for compatible donor
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              <Box p={4} bg="accent.50"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <HStack gap={3}>
                  <Icon as={HiCurrencyDollar} color="accent.500" w={6} h={6} />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="semibold" color="gray.900" fontSize="sm">
                      Average Campaign Success
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      85% reach their funding goal
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}