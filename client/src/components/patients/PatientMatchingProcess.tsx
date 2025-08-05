import { 
  Box, 
  Container, 
  VStack, 
  HStack,
  Text, 
  SimpleGrid
  Icon,
  BadgeButton
} from "@chakra-ui/react"
import { HiMagnifyingGlass, HiUserGroup, HiChatBubbleLeftEllipsis, HiHeart } from "react-icons/hi2"

const Matching= ({ 
  icon, 
  title, 
  description, 
  status,
  step 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  status: "completed" | "active" | "pending";
  step: number;
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "completed": return "green"
      case "active": return "blue"
      case "pending": return "gray"
      default: return "gray"
    }
  }

  return (
    <Box p={6} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
      <VStack gap={4} align="start">
        <HStack justify="space-between" w="full">
          <Box 
            p={3} 
            bg={`${getStatusColor()}.500`} 
            rounded="lg" 
            color="white"
          >
            <Icon as={icon} w={6} h={6} />
          </Box>
          <Badge 
            colorScheme={getStatusColor()} 
            size="sm"
            textTransform="capitalize"
          >
            {status}
          </Badge>
        </HStack>
        
        <VStack align="start" gap={2}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.900">
            {step}. {title}
          </Text>
          <Text color="gray.600" fontSize="sm">
            {description}
          </Text>
        </VStack>
      </VStack>
    </Box>
  )
}

const PotentialMatch = ({ 
  donorName, 
  compatibility, 
  location, 
  bloodType 
}: { 
  donorName: string; 
  compatibility: number; 
  location: string; 
  bloodType: string;
}) => (
  <Box p={6} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
    <VStack gap={4}>
      <HStack justify="space-between" w="full">
        <HStack gap={3}>
          <size="md" name={donorName} bg="brand.500" />
          <VStack align="start" gap={0}>
            <Text fontWeight="semibold" color="gray.900">
              {donorName}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {location} • {bloodType}
            </Text>
          </VStack>
        </HStack>
        <Badge 
          colorScheme={compatibility >= 80 ? "green" : compatibility >= 60 ? "orange" : "red"} 
          size="lg"
        >
          {compatibility}% Match
        </Badge>
      </HStack>
      
      <VStack gap={2} w="full">
        <HStack justify="space-between" w="full">
          <Text fontSize="sm" color="gray.600">
            Compatibility Score
          </Text>
          <Text fontSize="sm" fontWeight="semibold">
            {compatibility}/100
          </Text>
        </HStack>
        <value={compatibility} 
          colorScheme={compatibility >= 80 ? "green" : compatibility >= 60 ? "orange" : "red"}
          size="sm" 
          w="full" 
        />
      </VStack>
      
      <HStack gap={2} w="full">
        <Button variant="outline" size="sm" flex={1}>
          View Profile
        </Button>
        <Button variant="solid" size="sm" flex={1}>
          Connect
        </Button>
      </HStack>
    </VStack>
  </Box>
)

export function PatientMatchingProcess() {
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
              Your Matching Journey
            </Text>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="2xl"
            >
              Our advanced matching system finds compatible donors based on medical 
              criteria, location, and availability.
            </Text>
          </VStack>

          {/* Matching Processs */}
          <VStack gap={8} w="full">
            <Text 
              fontSize="2xl" 
              fontWeight="bold" 
              color="gray.900" 
              textAlign="center"
            >
              Matching Process
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
              <Matchingicon={HiMagnifyingGlass}
                title="Profile Analysis"
                description="Our system analyzes your medical profile and compatibility requirements"
                status="completed"
                step={1}
              />
              <Matchingicon={HiUserGroup}
                title="Donor Search"
                description="We search our database of verified donors for potential matches"
                status="active"
                step={2}
              />
              <Matchingicon={HiChatBubbleLeftEllipsis}
                title="Initial Contact"
                description="We facilitate initial contact between you and potential donors"
                status="pending"
                step={3}
              />
              <Matchingicon={HiHeart}
                title="Medical Verification"
                description="Final medical compatibility testing at Adenike Renal Centre"
                status="pending"
                step={4}
              />
            </SimpleGrid>
          </VStack>

          {/* Potential Matches */}
          <VStack gap={8} w="full">
            <HStack justify="space-between" w="full">
              <VStack align="start" gap={1}>
                <Text 
                  fontSize="2xl" 
                  fontWeight="bold" 
                  color="gray.900"
                >
                  Potential Matches
                </Text>
                <Text color="gray.600">
                  Based on your profile, we found these compatible donors
                </Text>
              </VStack>
              <Badge colorScheme="green" size="lg" px={3} py={1}>
                3 Active Matches
              </Badge>
            </HStack>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
              <PotentialMatch
                donorName="David A."
                compatibility={92}
                location="Lagos"
                bloodType="O+"
                />
              <PotentialMatch
                donorName="Sarah O."
                compatibility={87}
                location="Abuja"
                bloodType="O+"
              />
              <PotentialMatch
                donorName="Michael N."
                compatibility={75}
                location="Lagos"
                bloodType="O+"
              />
            </SimpleGrid>
          </VStack>

          {/* Call to Action */}
          <Box p={8} bg="brand.50"  w="full" textAlign="center" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
            <VStack gap={4}>
              <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                Ready to Connect with Donors?
              </Text>
              <Text color="gray.600" maxW="md">
                Complete your registration to start the matching process and 
                connect with verified kidney donors.
              </Text>
              <Button variant="solid" size="lg">
                Complete Registration
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}