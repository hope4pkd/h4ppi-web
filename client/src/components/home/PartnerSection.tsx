"use client"

import { 
  Box, 
  Container, 
  VStack, 
  HStack,
  Text, 
  Button,
  SimpleGrid,
  Badge,
  Icon
} from "@chakra-ui/react"
import { HiBuildingOffice2, HiBuildingLibrary, HiAcademicCap, HiShieldCheck } from "react-icons/hi2"

const PartnerCard = ({ 
  name, 
  description, 
  type, 
  badge 
}: { 
  name: string; 
  description: string; 
  type: "hospital" | "organization" | "academic";
  badge?: string;
}) => {
  const getIcon = () => {
    switch (type) {
      case "hospital": return HiBuildingOffice2
      case "organization": return HiBuildingLibrary
      case "academic": return HiAcademicCap
      default: return HiBuildingOffice2
    }
  }

  const getColor = () => {
    switch (type) {
      case "hospital": return "brand.500"
      case "organization": return "accent.500"
      case "academic": return "blue.500"
      default: return "brand.500"
    }
  }

  return (
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
          bg={getColor()} 
          rounded="lg" 
          color="white"
        >
          <Icon as={getIcon()} w={8} h={8} />
        </Box>
        
        <VStack gap={2}>
          <HStack>
            <Text fontSize="lg" fontWeight="bold" color="gray.900">
              {name}
            </Text>
            {badge && (
              <Badge colorScheme="green" size="sm">
                {badge}
              </Badge>
            )}
          </HStack>
          <Text fontSize="sm" color="gray.600" textAlign="center">
            {description}
          </Text>
        </VStack>
      </VStack>
    </Box>
  )
}

export function PartnerSection() {
  return (
    <Box py={{ base: 16, md: 20 }}>
      <Container maxW="7xl">
        <VStack gap={12}>
          {/* Main Partner - Adenike Renal Centre */}
          <VStack gap={8} w="full">
            <VStack gap={4} textAlign="center">
              <Text 
                fontSize={{ base: "3xl", md: "4xl" }} 
                fontWeight="bold" 
                color="gray.900"
              >
                Trusted Medical Partner
              </Text>
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color="gray.600" 
                maxW="2xl"
              >
                All medical procedures are conducted through our exclusive partnership 
                with Adenike Renal Centre, Nigeria&apos;s leading kidney care facility.
              </Text>
            </VStack>

            <Box 
              p={8} 
              bg="brand.50" 
              border="2px solid" 
              borderColor="brand.200"
              w="full"
              maxW="4xl"
              rounded="xl"
              shadow="md"
            >
              <VStack gap={6}>
                <HStack gap={4}>
                  <Box 
                    p={4} 
                    bg="brand.500" 
                    rounded="xl" 
                    color="white"
                  >
                    <Icon as={HiBuildingOffice2} w={10} h={10} />
                  </Box>
                  <VStack align="start" gap={1}>
                    <HStack>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                        Adenike Renal Centre
                      </Text>
                      <Badge colorScheme="green" size="lg">
                        Primary Partner
                      </Badge>
                    </HStack>
                    <Text color="gray.600">
                      Lagos, Nigeria • Established 2015
                    </Text>
                  </VStack>
                </HStack>
                
                <Text color="gray.600" textAlign="center" maxW="2xl">
                  A state-of-the-art medical facility specializing in kidney care, transplants, 
                  and dialysis services. All Hope4PKD procedures are conducted under their 
                  expert supervision with the highest medical standards.
                </Text>
                
                <HStack gap={6} flexWrap="wrap" justify="center">
                  <HStack>
                    <Icon as={HiShieldCheck} color="green.500" w={5} h={5} />
                    <Text fontSize="sm" color="gray.600">
                      ISO Certified
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={HiShieldCheck} color="green.500" w={5} h={5} />
                    <Text fontSize="sm" color="gray.600">
                      200+ Successful Transplants
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={HiShieldCheck} color="green.500" w={5} h={5} />
                    <Text fontSize="sm" color="gray.600">
                      24/7 Care Support
                    </Text>
                  </HStack>
                </HStack>
                
                <Button variant="outline" size="lg">
                  Learn More About Our Partner
                </Button>
              </VStack>
            </Box>
          </VStack>

          {/* Supporting Partners */}
          <VStack gap={8} w="full">
            <Text 
              fontSize="2xl" 
              fontWeight="bold" 
              color="gray.900" 
              textAlign="center"
            >
              Supporting Partners
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
              <PartnerCard
                name="Nigerian Medical Association"
                description="Professional oversight and medical standards compliance"
                type="organization"
                badge="Medical Oversight"
              />
              
              <PartnerCard
                name="University of Lagos Medical School"
                description="Research collaboration and medical student training programs"
                type="academic"
                badge="Research Partner"
              />
              
              <PartnerCard
                name="Lagos State Ministry of Health"
                description="Regulatory compliance and public health coordination"
                type="organization"
                badge="Government Partner"
              />
              
              <PartnerCard
                name="Kidney Foundation Nigeria"
                description="Patient advocacy and awareness campaigns"
                type="organization"
                badge="Advocacy Partner"
              />
            </SimpleGrid>
          </VStack>

          {/* Call to Action */}
          <VStack gap={6} textAlign="center" py={8}>
            <Text fontSize="xl" fontWeight="semibold" color="gray.900">
              Ready to Get Started?
            </Text>
            <Text color="gray.600" maxW="md">
              Join our community of patients, donors, and supporters working together 
              to save lives through kidney donation.
            </Text>
            <HStack gap={4}>
              <Button variant="solid" size="lg">
                Find Help Now
              </Button>
              <Button variant="outline" size="lg">
                Become a Donor
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}