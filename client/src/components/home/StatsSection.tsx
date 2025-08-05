"use client"

import { 
  Box, 
  Container, 
  SimpleGrid, 
  VStack,
  Text, 
  Icon
} from "@chakra-ui/react"
import { HiHeart, HiUsers, HiCurrencyDollar, HiTrophy } from "react-icons/hi2"

const StatCard = ({ 
  icon, 
  value, 
  label, 
  description 
}: { 
  icon: any; 
  value: string; 
  label: string; 
  description: string;
}) => (
  <VStack 
    gap={6} 
    textAlign="center" 
    p={8}
    bg="white"
    rounded="2xl"
    shadow="xl"
    border="1px solid"
    borderColor="gray.100"
    _hover={{
      shadow: "2xl",
      transform: "translateY(-8px)",
      borderColor: "brand.200"
    }}
    transition="all 0.4s ease"
    cursor="pointer"
    role="group"
  >
    <Box 
      p={6} 
      bg="brand.500" 
      rounded="full" 
      color="white"
      shadow="lg"
      _groupHover={{
        bg: "brand.600",
        transform: "scale(1.1) rotate(5deg)"
      }}
      transition="all 0.3s ease"
    >
      <Icon as={icon} w={10} h={10} />
    </Box>
    <VStack gap={2}>
      <Text 
        fontSize={{ base: "3xl", md: "4xl" }} 
        fontWeight="black" 
        bgGradient="linear(to-r, brand.400, brand.600)"
        bgClip="text"
      >
        {value}
      </Text>
      <Text fontSize="lg" fontWeight="bold" color="gray.900">
        {label}
      </Text>
      <Text fontSize="sm" color="gray.600" maxW="250px" lineHeight="1.6">
        {description}
      </Text>
    </VStack>
  </VStack>
)

export function StatsSection() {
  return (
    <Box py={{ base: 20, md: 24 }} bg="white" position="relative" overflow="hidden">
      {/* Background decorative elements */}
      <Box 
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bgGradient="radial(circle at 30% 50%, brand.50 0%, transparent 70%)"
        opacity={0.7}
      />
      <Box 
        position="absolute"
        top="-100px"
        right="-100px"
        w="300px"
        h="300px"
        bg="accent.100"
        rounded="full"
        opacity={0.4}
        blur="3xl"
      />
      <Container maxW="7xl" position="relative" zIndex={1}>
        <VStack gap={16}>
          <VStack gap={4} textAlign="center">
            <Text 
              fontSize={{ base: "4xl", md: "5xl" }} 
              fontWeight="black" 
              color="gray.900"
              textAlign="center"
              bgGradient="linear(to-r, brand.500, accent.500)"
              bgClip="text"
            >
              Making a Real Impact
            </Text>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="3xl"
              textAlign="center"
              lineHeight="1.7"
              fontWeight="medium"
            >
              Since our launch, we&apos;ve connected patients with life-saving donors and 
              raised significant funds for kidney transplant procedures across Nigeria.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 2, md: 4 }} gap={12} w="full">
            <StatCard
              icon={HiUsers}
              value="150+"
              label="Patients Helped"
              description="PKD patients connected with verified donors"
            />
            <StatCard
              icon={HiHeart}
              value="50+"
              label="Verified Donors"
              description="Generous donors ready to save lives"
            />
            <StatCard
              icon={HiCurrencyDollar}
              value="₦25M+"
              label="Funds Raised"
              description="Community support for medical expenses"
            />
            <StatCard
              icon={HiTrophy}
              value="95%"
              label="Success Rate"
              description="Successful matches and procedures"
            />
          </SimpleGrid>

          {/* <VStack gap={4} textAlign="center" pt={8}>
            <Text fontSize="xs" color="gray.600" textAlign="center" mt={8}>
              🏥 All statistics from Adenike Renal Centre partnerships
            </Text>
          </VStack> */}
        </VStack>
      </Container>
    </Box>
  )
}