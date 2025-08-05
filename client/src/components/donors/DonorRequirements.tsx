import { 
  Box, 
  Container, 
  VStack, 
  HStack,
  Text, 
  SimpleGrid
  IconItemIcon,
  BadgeIconTitleDescription
} from "@chakra-ui/react"
import { 
  HiUser, 
  HiHeart, 
  HiShieldCheck, 
  HiDocumentText,
  HiCheckCircle,
  HiXCircle,
  HiExclamationTriangle
} from "react-icons/hi2"

const RequirementCard = ({ 
  icon, 
  title, 
  requirements, 
  disqualifiers 
}: { 
  icon: any; 
  title: string; 
  requirements: string[];
  disqualifiers?: string[];
}) => (
  <Box p={6} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
    <VStack gap={4} align="start">
      <HStack gap={3}>
        <Box 
          p={3} 
          bg="accent.500" 
          rounded="lg" 
          color="white"
        >
          <Icon as={icon} w={6} h={6} />
        </Box>
        <Text fontSize="lg" fontWeight="semibold" color="gray.900">
          {title}
        </Text>
      </HStack>
      
      <VStack align="start" gap={3} w="full">
        <VStack align="start" gap={2} w="full">
          <Text fontSize="sm" fontWeight="semibold" color="green.600">
            Requirements:
          </Text>
          <gap={1}>
            {requirements.map((req, index) => (
              <Item key={index} fontSize="sm">
                <Icon as={HiCheckCircle} color="green.500" />
                {req}
              </Item>
            ))}
          </>
        </VStack>
        
        {disqualifiers && (
          <VStack align="start" gap={2} w="full">
            <Text fontSize="sm" fontWeight="semibold" color="red.600">
              Disqualifiers:
            </Text>
            <gap={1}>
              {disqualifiers.map((disq, index) => (
                <Item key={index} fontSize="sm">
                  <Icon as={HiXCircle} color="red.500" />
                  {disq}
                </Item>
              ))}
            </>
          </VStack>
        )}
      </VStack>
    </VStack>
  </Box>
)

export function DonorRequirements() {
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
              Donor Requirements
            </Text>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="2xl"
            >
              To ensure the safety of both donors and recipients, we have established 
              comprehensive requirements based on international medical standards.
            </Text>
          </VStack>

          {/* Important Notice */}
          <status="info" rounded="lg">
            <Icon />
            <VStack align="start" gap={2}>
              <Title>Medical Evaluation Required</Title>
              <Description>
                All potential donors must undergo comprehensive medical evaluation at 
                Adenike Renal Centre. Meeting these basic requirements qualifies you 
                for initial screening, but final approval depends on detailed medical tests.
              </Description>
            </VStack>
          </>

          {/* Requirements Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} w="full">
            <RequirementCard
              icon={HiUser}
              title="General Eligibility"
              requirements={[
                "Age between 18-65 years old",
                "Nigerian citizen or legal resident",
                "BMI between 18-35",
                "Non-smoker (or quit 6+ months ago)",
                "No history of substance abuse",
                "Mentally and emotionally stable"
              ]}
              disqualifiers={[
                "Pregnancy (current or planned within 2 years)",
                "History of major psychiatric disorders",
                "Active substance abuse",
                "Age under 18 or over 65"
              ]}
            />
            
            <RequirementCard
              icon={HiHeart}
              title="Medical Health"
              requirements={[
                "Normal kidney function (eGFR >80)",
                "Blood pressure <140/90 mmHg",
                "No diabetes or pre-diabetes",
                "No history of kidney disease",
                "No active infections",
                "Normal heart function"
              ]}
              disqualifiers={[
                "Diabetes (Type 1 or 2)",
                "High blood pressure requiring medication",
                "History of kidney stones (multiple)",
                "Chronic kidney disease",
                "Heart disease or major cardiac issues"
              ]}
            />
            
            <RequirementCard
              icon={HiShieldCheck}
              title="Blood Compatibility" 
              requirements={[
                "Compatible blood type with recipient",
                "Negative for HIV, Hepatitis B & C",
                "Normal complete blood count",
                "No blood clotting disorders",
                "No history of blood transfusion reactions"
              ]}
              disqualifiers={[
                "HIV positive",
                "Hepatitis B or C positive",
                "History of blood disorders",
                "Incompatible blood type"
              ]}
            />
            
            <RequirementCard
              icon={HiDocumentText}
              title="Documentation"
              requirements={[
                "Valid government-issued ID",
                "Proof of Nigerian residency",
                "Complete medical history records",
                "Emergency contact information",
                "Signed informed consent forms"
              ]}
            />
          </SimpleGrid>

          {/* Special Considerations */}
          <Box p={8} bg="amber.50"  w="full" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
            <VStack gap={6}>
              <HStack gap={3}>
                <Icon as={HiExclamationTriangle} color="amber.500" w={8} h={8} />
                <Text fontSize="xl" fontWeight="bold" color="gray.900">
                  Special Considerations
                </Text>
              </HStack>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
                <VStack align="start" gap={2}>
                  <Text fontWeight="semibold" color="gray.900">
                    Family History
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="left">
                    Family history of kidney disease, diabetes, or hereditary conditions 
                    will be carefully evaluated during the screening process.
                  </Text>
                </VStack>
                
                <VStack align="start" gap={2}>
                  <Text fontWeight="semibold" color="gray.900">
                    Medications
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="left">
                    Current medications will be reviewed. Some medications may require 
                    temporary discontinuation before donation.
                  </Text>
                </VStack>
                
                <VStack align="start" gap={2}>
                  <Text fontWeight="semibold" color="gray.900">
                    Lifestyle Factors
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="left">
                    Work requirements, family responsibilities, and support systems 
                    are considered to ensure proper recovery.
                  </Text>
                </VStack>
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Timeline */}
          <VStack gap={6} w="full">
            <Text 
              fontSize="2xl" 
              fontWeight="bold" 
              color="gray.900" 
              textAlign="center"
            >
              Evaluation Timeline
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 4 }} gap={4} w="full">
              <Box p={4} textAlign="center" bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={2}>
                  <Badge colorScheme="blue" size="lg" rounded="full">
                    Week 1-2
                  </Badge>
                  <Text fontWeight="semibold" color="gray.900">
                    Initial Screening
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Application review and basic health assessment
                  </Text>
                </VStack>
              </Box>
              
              <Box p={4} textAlign="center" bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={2}>
                  <Badge colorScheme="orange" size="lg" rounded="full">
                    Week 3-4
                  </Badge>
                  <Text fontWeight="semibold" color="gray.900">
                    Medical Tests
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Comprehensive medical evaluation and lab work
                  </Text>
                </VStack>
              </Box>
              
              <Box p={4} textAlign="center" bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={2}>
                  <Badge colorScheme="purple" size="lg" rounded="full">
                    Week 5-6
                  </Badge>
                  <Text fontWeight="semibold" color="gray.900">
                    Final Review
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Medical team review and final approval
                  </Text>
                </VStack>
              </Box>
              
              <Box p={4} textAlign="center" bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={2}>
                  <Badge colorScheme="green" size="lg" rounded="full">
                    Week 7+
                  </Badge>
                  <Text fontWeight="semibold" color="gray.900">
                    Matching
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Compatibility matching with patients
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}