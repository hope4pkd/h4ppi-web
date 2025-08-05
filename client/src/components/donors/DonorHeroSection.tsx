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
import { HiHeart, HiUsers, HiShieldCheck, HiSparkles, HiCheckCircle } from "react-icons/hi2"

export function DonorHeroSection() {
  return (
    <Box 
      bgGradient="linear(to-br, accent.50, white)"
      
      py={{ base: 16, md: 20 }}
    >
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12} alignItems="center">
          {/* Left Content */}
          <VStack align="start" gap={8}>
            <Badge 
              colorScheme="orange" 
              size="lg" 
              px={3} 
              py={1} 
              rounded="full"
              fontSize="sm"
            >
              ❤️ For Kidney Donors
            </Badge>
            
            <VStack align="start" gap={4}>
              <Text 
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} 
                fontWeight="bold" 
                lineHeight="1.1"
                color="gray.900"
              >
                Give the{" "}
                <Text as="span" color="accent.500">
                  Gift
                </Text>{" "}
                of Life
              </Text>
              
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color="gray.600" 
                maxW="lg"
              >
                Become a kidney donor and save a life. Join our community of heroes 
                making a real difference for PKD patients across Nigeria through 
                Adenike Renal Centre.
              </Text>
            </VStack>

            <VStack align="start" gap={3} w="full">
              <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                Why Donate Through Hope4PKD:
              </Text>
              <gap={2}>
                <Item>
                  <Icon as={HiCheckCircle} color="accent.500" />
                  Comprehensive medical screening and safety protocols
                </Item>
                <Item>
                  <Icon as={HiCheckCircle} color="accent.500" />
                  Professional surgical care at Adenike Renal Centre
                </Item>
                <Item>
                  <Icon as={HiCheckCircle} color="accent.500" />
                  Full medical coverage for donation procedure
                </Item>
                <Item>
                  <Icon as={HiCheckCircle} color="accent.500" />
                  Ongoing health monitoring and support
                </Item>
              </>
            </VStack>

            <HStack gap={4} flexWrap="wrap">
              <Button 
                variant="outline" 
                size="lg" 
                
              >
                Apply to Donate
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                
              >
                Learn More
              </Button>
            </HStack>
          </VStack>

          {/* Right Content - Stats & Features */}
          <VStack gap={6} align="stretch">
            <Box p={6} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
              <VStack gap={4}>
                <Text fontSize="xl" fontWeight="bold" color="gray.900" textAlign="center">
                  Donor Impact
                </Text>
                <SimpleGrid columns={3} gap={4} w="full">
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="accent.500">
                      50+
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Verified Donors
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="accent.500">
                      45+
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Lives Saved
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                      100%
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Safety Record
                    </Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </Box>

            <SimpleGrid columns={1} gap={4}>
              <Box p={4} bg="accent.50"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <HStack gap={3}>
                  <Icon as={HiShieldCheck} color="accent.500" w={6} h={6} />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="semibold" color="gray.900" fontSize="sm">
                      Safety First
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      Comprehensive medical screening process
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              <Box p={4} bg="green.50"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <HStack gap={3}>
                  <Icon as={HiHeart} color="green.500" w={6} h={6} />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="semibold" color="gray.900" fontSize="sm">
                      Life-Changing Impact
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      One donation can save and transform a life
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              <Box p={4} bg="blue.50"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <HStack gap={3}>
                  <Icon as={HiSparkles} color="blue.500" w={6} h={6} />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="semibold" color="gray.900" fontSize="sm">
                      Full Support
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      Pre and post-donation care included
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