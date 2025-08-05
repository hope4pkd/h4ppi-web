"use client"

import { 
  Box, 
  Container, 
  SimpleGrid, 
  VStack, 
  HStack,
  Text, 
  Icon,
  Badge
} from "@chakra-ui/react"
import { HiStar } from "react-icons/hi2"

const TestimonialCard = ({ 
  name, 
  role, 
  content, 
  location,
  type
}: { 
  name: string; 
  role: string; 
  content: string; 
  location: string;
  type: "patient" | "donor";
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
      {/* Stars */}
      <HStack>
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon key={star} as={HiStar} color="accent.500" w={4} h={4} />
        ))}
      </HStack>
      
      {/* Quote */}
      <Text color="gray.600" fontSize="md" lineHeight="1.7">
        &quot;{content}&quot;
      </Text>
      
      {/* Author */}
      <HStack gap={3} pt={2}>
        <Box 
          w={10} 
          h={10} 
          bg={type === "patient" ? "brand.500" : "accent.500"} 
          rounded="full" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          color="white"
          fontSize="sm"
          fontWeight="bold"
        >
          {name.charAt(0)}
        </Box>
        <VStack align="start" gap={1}>
          <HStack gap={2}>
            <Text fontWeight="semibold" color="gray.900">
              {name}
            </Text>
            <Badge 
              colorScheme={type === "patient" ? "green" : "orange"} 
              size="sm"
            >
              {type === "patient" ? "Patient" : "Donor"}
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            {role} • {location}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
)

export function TestimonialsSection() {
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
              Stories of Hope
            </Text>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="2xl"
            >
              Real stories from patients and donors whose lives have been transformed 
              through our platform and Adenike Renal Centre.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
            <TestimonialCard
              name="Amara Okafor"
              role="Teacher"
              location="Lagos, Nigeria"
              type="patient"
              content="Hope4PKD gave me a second chance at life. Within 3 months, I was matched with an amazing donor and my campaign raised enough funds for the surgery. I'm now healthy and back to teaching my students."
            />
            
            <TestimonialCard
              name="David Adebayo"
              role="Software Engineer"
              location="Abuja, Nigeria"
              type="donor"
              content="Donating a kidney was the most meaningful thing I've ever done. The process was smooth, professional, and I knew I was saving someone's life. Hope4PKD made it all possible."
            />
            
            <TestimonialCard
              name="Sarah Okwu"
              role="Mother of Two"  
              location="Port Harcourt, Nigeria"
              type="patient"
              content="As a single mother with PKD, I thought I'd never get help. The community rallied behind my campaign and I found a donor match. My children still have their mother thanks to Hope4PKD."
            />
            
            <TestimonialCard
              name="Dr. Emeka Nwosu"
              role="Medical Doctor"
              location="Enugu, Nigeria"
              type="donor"
              content="Being a doctor, I understood the critical need for kidney donors in Nigeria. Hope4PKD's thorough screening process and partnership with Adenike Renal Centre convinced me to donate."
            />
            
            <TestimonialCard
              name="Fatima Abdul"
              role="Business Owner"
              location="Kano, Nigeria"
              type="patient"
              content="The financial burden of PKD treatment was overwhelming. Hope4PKD's crowdfunding platform helped me raise ₦3.2M in just 6 weeks. I'm forever grateful to this community."
            />
            
            <TestimonialCard
              name="James Obi"
              role="Electrical Engineer"
              location="Owerri, Nigeria"
              type="donor"
              content="My colleague's brother needed a kidney. Through Hope4PKD, I learned I was a perfect match. The donation process was safe and professional. Seeing him healthy makes it all worthwhile."
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}