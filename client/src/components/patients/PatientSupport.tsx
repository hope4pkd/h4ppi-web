import { 
  Box, 
  Container, 
  VStack, 
  HStack,
  Text, 
  Button, 
  SimpleGrid
  IconItemIcon,
  BadgeGroup
} from "@chakra-ui/react"
import { 
  HiChatBubbleLeftRight, 
  HiPhone, 
  HiVideoCamera, 
  HiUsers,
  HiHeart,
  HiDocumentText,
  HiCheckCircle
} from "react-icons/hi2"

const SupportCard = ({ 
  icon, 
  title, 
  description, 
  available, 
  action 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  available: string;
  action: string;
}) => (
  <Box p={6} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
    <VStack gap={4} align="start">
      <HStack gap={3}>
        <Box 
          p={3} 
          bg="brand.500" 
          rounded="lg" 
          color="white"
        >
          <Icon as={icon} w={6} h={6} />
        </Box>
        <VStack align="start" gap={0}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.900">
            {title}
          </Text>
          <Badge colorScheme="green" size="sm">
            {available}
          </Badge>
        </VStack>
      </HStack>
      
      <Text color="gray.600">
        {description}
      </Text>
      
      <Button variant="outline" size="sm" w="full">
        {action}
      </Button>
    </VStack>
  </Box>
)

export function PatientSupport() {
  return (
    <Box py={{ base: 16, md: 20 }} bg="gray.50" >
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text 
              fontSize={{ base: "3xl", md: "4xl" }} 
              fontWeight="bold" 
              color="gray.900"
            >
              Comprehensive Patient Support
            </Text>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="2xl"
            >
              We provide 24/7 support throughout your journey, from initial registration 
              to post-transplant care.
            </Text>
          </VStack>

          {/* Support Services */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
            <SupportCard
              icon={HiChatBubbleLeftRight}
              title="Live Chat Support"
              description="Instant messaging with our patient support team for quick questions and updates"
              available="24/7 Available"
              action="Start Chat"
            />
            
            <SupportCard
              icon={HiPhone}
              title="Phone Consultation" 
              description="Speak directly with our medical coordinators about your case and progress"
              available="Mon-Fri 8AM-6PM"
              action="Schedule Call"
            />
            
            <SupportCard
              icon={HiVideoCamera}
              title="Video Consultation"
              description="Face-to-face meetings with medical professionals and counselors"
              available="By Appointment"
              action="Book Session"
            />
            
            <SupportCard
              icon={HiUsers}
              title="Support Groups"
              description="Connect with other PKD patients sharing similar experiences and challenges"
              available="Weekly Meetings"
              action="Join Group"
            />
          </SimpleGrid>

          {/* Medical Support */}
          <VStack gap={8} w="full">
            <Text 
              fontSize="2xl" 
              fontWeight="bold" 
              color="gray.900" 
              textAlign="center"
            >
              Medical Support Services
            </Text>
            
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} w="full">
              <Box p={8} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={6} align="start">
                  <HStack gap={3}>
                    <Icon as={HiHeart} color="brand.500" w={8} h={8} />
                    <VStack align="start" gap={0}>
                      <Text fontSize="xl" fontWeight="bold" color="gray.900">
                        Pre-Transplant Care
                      </Text>
                      <Text color="gray.600">
                        Comprehensive care before your transplant
                      </Text>
                    </VStack>
                  </HStack>
                  
                  <gap={2}>
                    <Item>
                      <Icon as={HiCheckCircle} color="brand.500" />
                      Regular health monitoring and assessments
                    </Item>
                    <Item>
                      <Icon as={HiCheckCircle} color="brand.500" />
                      Dialysis coordination if needed
                    </Item>
                    <Item>
                      <Icon as={HiCheckCircle} color="brand.500" />
                      Nutritional counseling and meal planning
                    </Item>
                    <Item>
                      <Icon as={HiCheckCircle} color="brand.500" />
                      Psychological support and counseling
                    </Item>
                  </>
                  
                  <Button variant="outline" w="full">
                    Learn More
                  </Button>
                </VStack>
              </Box>
              
              <Box p={8} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={6} align="start">
                  <HStack gap={3}>
                    <Icon as={HiDocumentText} color="accent.500" w={8} h={8} />
                    <VStack align="start" gap={0}>
                      <Text fontSize="xl" fontWeight="bold" color="gray.900">
                        Post-Transplant Care
                      </Text>
                      <Text color="gray.600">
                        Ongoing support after your successful transplant
                      </Text>
                    </VStack>
                  </HStack>
                  
                  <gap={2}>
                    <Item>
                      <Icon as={HiCheckCircle} color="accent.500" />
                      Regular follow-up appointments
                    </Item>
                    <Item>
                      <Icon as={HiCheckCircle} color="accent.500" />
                      Medication management and monitoring
                    </Item>
                    <Item>
                      <Icon as={HiCheckCircle} color="accent.500" />
                      Lifestyle guidance and rehabilitation
                    </Item>
                    <Item>
                      <Icon as={HiCheckCircle} color="accent.500" />
                      Emergency support and rapid response
                    </Item>
                  </>
                  
                  <Button variant="outline" w="full">
                    Learn More
                  </Button>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>

          {/* Community Support */}
          <Box p={8} bg="brand.50"  w="full" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
            <VStack gap={6} textAlign="center">
              <VStack gap={4}>
                <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                  Join Our Patient Community
                </Text>
                <Text color="gray.600" maxW="2xl">
                  Connect with over 150 PKD patients who have successfully found donors 
                  and received transplants through Hope4PKD.
                </Text>
              </VStack>
              
              <HStack gap={8} flexWrap="wrap" justify="center">
                <VStack>
                  <Group size="lg" maxCount={5}>
                    <name="Amara Okafor" bg="brand.500" />
                    <name="David Adebayo" bg="brand.600" />
                    <name="Sarah Okwu" bg="brand.400" />
                    <name="Fatima Abdul" bg="brand.700" />
                    <name="James Obi" bg="brand.300" />
                  </Group>
                  <Text fontSize="sm" color="gray.600">
                    150+ Active Members
                  </Text>
                </VStack>
                
                <VStack align="start" gap={2} textAlign="left">
                  <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                    Community Benefits:
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    • Share experiences and advice
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    • Get emotional support
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    • Access exclusive resources
                  </Text>
                </VStack>
              </HStack>
              
              <Button variant="solid" size="lg">
                Join Community
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}