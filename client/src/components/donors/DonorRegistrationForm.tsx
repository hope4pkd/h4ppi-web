"use client"

import { 
  Box, 
  Container, 
  VStack, 
  HStack,
  Text, 
  Button, 
  SimpleGrid
  Input,
  TextareaIndicatorStatusIconNumberTitleDescriptionSeparator,
  usesGroupGroup,
  BadgeIcon
} from "@chakra-ui/react"

import { 
  FormControl, 
  FormLabel, 
  FormHelperText,
  Stepper, 
  useSteps,
  Select, 
  Radio, 
  RadioGroup, 
  Checkbox,
  Alert,
  Avatar,
  AvatarGroup,
  Progress,
  List,
  ListItem,
  CardBox
} from "@/components/ui"

import { useState } from "react"
import { HiCloudArrowUp, HiDocumentText, HiUserCircle, HiHeart } from "react-icons/hi2"

const steps = [
  { title: "Personal Info", description: "Basic information" },
  { title: "Health History", description: "Medical background" },
  { title: "Motivation", description: "Why you want to donate" },
  { title: "Documents", description: "Upload required files" },
  { title: "Review", description: "Confirm submission" }
]

export function DonorRegistrationForm() {
  const { active setActive} = uses(0, steps.length)
  
  const [bloodType, setBloodType] = useState("")
  const [smokingStatus, setSmokingStatus] = useState("")
  const [medicalConditions, setMedicalConditions] = useState<string[]>([])
  const [motivation, setMotivation] = useState("")

  const handleNext = () => {
    if (active< steps.length - 1) {
      setActive(active+ 1)
    }
  }

  const handlePrev = () => {
    if (active> 0) {
      setActive(active- 1)
    }
  }

  const renderContent = () => {
    switch (active) {
      case 0:
        return (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <isRequired>
              <>Full Name</>
              <Input placeholder="Enter your full name" />
            </>
            
            <isRequired>
              <>Email Address</>
              <Input type="email" placeholder="your.email@example.com" />
            </>
            
            <isRequired>
              <>Phone Number</>
              <Input placeholder="+234 xxx xxx xxxx" />
            </>
            
            <isRequired>
              <>Date of Birth</>
              <Input type="date" />
              <>Must be between 18-65 years old</>
            </>
            
            <isRequired>
              <>Gender</>
              <placeholder="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </>
            </>
            
            <isRequired>
              <>State of Residence</>
              <placeholder="your state">
                <option value="lagos">Lagos</option>
                <option value="abuja">FCT Abuja</option>
                <option value="kano">Kano</option>
                <option value="rivers">Rivers</option>
                <option value="ogun">Ogun</option>
                <option value="other">Other</option>
              </>
            </>
            
            <isRequired>
              <>Occupation</>
              <Input placeholder="Your current occupation" />
            </>
            
            <>
              <>Employer</>
              <Input placeholder="Company/organization name" />
            </>
            
            <isRequired>
              <>Emergency Contact Name</>
              <Input placeholder="Full name of emergency contact" />
            </>
            
            <isRequired>
              <>Emergency Contact Phone</>
              <Input placeholder="+234 xxx xxx xxxx" />
            </>
            
            <isRequired>
              <>Relationship to Emergency Contact</>
              <placeholder="relationship">
                <option value="spouse">Spouse</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="child">Child</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </>
            </>
          </SimpleGrid>
        )
        
      case 1:
        return (
          <VStack gap={6} align="stretch">
            <status="info">
              <Icon />
              <Text fontSize="sm">
                This information helps us determine your initial eligibility. 
                Detailed medical screening will be conducted later.
              </Text>
            </>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <isRequired>
                <>Blood Type</>
                <Group value={bloodType} onChange={setBloodType}>
                  <SimpleGrid columns={4} gap={2}>
                    <value="A+">A+</>
                    <value="A-">A-</>
                    <value="B+">B+</>
                    <value="B-">B-</>
                    <value="AB+">AB+</>
                    <value="AB-">AB-</>
                    <value="O+">O+</>
                    <value="O-">O-</>
                  </SimpleGrid>
                </Group>
              </>
              
              <isRequired>
                <>Height (cm)</>
                <Input placeholder="e.g., 170" type="number" />
              </>
              
              <isRequired>
                <>Weight (kg)</>
                <Input placeholder="e.g., 70" type="number" />
              </>
              
              <isRequired>
                <>Smoking Status</>
                <Group value={smokingStatus} onChange={setSmokingStatus}>
                  <VStack align="start">
                    <value="never">Never smoked</>
                    <value="former">Former smoker (quit 6+ months ago)</>
                    <value="current">Current smoker</>
                  </VStack>
                </Group>
              </>
            </SimpleGrid>
            
            <>
              <>Medical conditions (check all that apply)</>
              <Group value={medicalConditions} onChange={(values) => setMedicalConditions(values as string[])}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
                  <value="diabetes">Diabetes</>
                  <value="hypertension">High blood pressure</>
                  <value="heart-disease">Heart disease</>
                  <value="kidney-stones">Kidney stones</>
                  <value="liver-disease">Liver disease</>
                  <value="depression">Depression/anxiety</>
                  <value="none">None of the above</>
                </SimpleGrid>
              </Group>
            </>
            
            <>
              <>Current medications</>
              <Textarea 
                placeholder="any medications you're currently taking (including supplements)"
                rows={3}
              />
            </>
            
            <>
              <>Family medical history</>
              <Textarea 
                placeholder="Any family history of kidney disease, diabetes, or other hereditary conditions"
                rows={3}
              />
            </>
            
            <>
              <>Previous surgeries</>
              <Textarea 
                placeholder="any previous surgeries or major medical procedures"
                rows={3}
              />
            </>
          </VStack>
        )
        
      case 2:
        return (
          <VStack gap={6} align="stretch">
            <VStack gap={4} align="start">
              <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                Tell Us About Your Motivation
              </Text>
              <Text color="gray.600">
                Understanding your motivation helps us provide better support throughout 
                the donation process and ensures you're making an informed decision.
              </Text>
            </VStack>
            
            <isRequired>
              <>Why do you want to become a kidney donor?</>
              <Group value={motivation} onChange={setMotivation}>
                <VStack align="start" gap={2}>
                  <value="help-someone">I want to help someone in need</>
                  <value="personal-experience">Personal experience with kidney disease</>
                  <value="religious-beliefs">Religious or spiritual beliefs</>
                  <value="give-back">Want to give back to society</>
                  <value="other">Other reason</>
                </VStack>
              </Group>
            </>
            
            <isRequired>
              <>Please elaborate on your motivation</>
              <Textarea 
                placeholder="Tell us more about what drives you to become a donor..."
                rows={5}
              />
            </>
            
            <>
              <>Have you discussed this decision with your family?</>
              <Group>
                <VStack align="start">
                  <value="yes-supportive">Yes, they are supportive</>
                  <value="yes-concerns">Yes, they have some concerns</>
                  <value="no-plan-to">No, but I plan to discuss it</>
                  <value="no-private">No, this is a private decision</>
                </VStack>
              </Group>
            </>
            
            <>
              <>Do you have any concerns about donating?</>
              <Textarea 
                placeholder="Share any concerns or questions you have about the donation process..."
                rows={4}
              />
            </>
            
            <>
              <>How did you hear about Hope4PKD?</>
              <placeholder="option">
                <option value="social-media">Social media</option>
                <option value="friend-family">Friend or family member</option>
                <option value="healthcare-provider">Healthcare provider</option>
                <option value="online-search">Online search</option>
                <option value="news-media">News or media</option>
                <option value="other">Other</option>
              </>
            </>
          </VStack>
        )
        
      case 3:
        return (
          <VStack gap={6} align="stretch">
            <Text color="gray.600">
              Please upload the following documents. These will be reviewed as part 
              of your initial application.
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <BoxBox p={6} border="2px dashed" borderColor="gray.300" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={4}>
                  <HiUserCircle size="48" color="gray" />
                  <VStack gap={2}>
                    <Text fontWeight="semibold">Valid Government ID</Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      National ID, Driver's License, or International Passport
                    </Text>
                  </VStack>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </VStack>
              </CardBox>
              
              <BoxBox p={6} border="2px dashed" borderColor="gray.300" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={4}>
                  <HiDocumentText size="48" color="gray" />
                  <VStack gap={2}>
                    <Text fontWeight="semibold">Proof of Residence</Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Utility bill, bank statement, or lease agreement (within 3 months)
                    </Text>
                  </VStack>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </VStack>
              </CardBox>
              
              <BoxBox p={6} border="2px dashed" borderColor="gray.300" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={4}>
                  <HiHeart size="48" color="gray" />
                  <VStack gap={2}>
                    <Text fontWeight="semibold">Recent Medical Records</Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Recent blood work or health check-up (if available)
                    </Text>
                  </VStack>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </VStack>
              </CardBox>
              
              <BoxBox p={6} border="2px dashed" borderColor="gray.300" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={4}>
                  <HiCloudArrowUp size="48" color="gray" />
                  <VStack gap={2}>
                    <Text fontWeight="semibold">Additional Documents</Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Any other relevant medical documents
                    </Text>
                  </VStack>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </VStack>
              </CardBox>
            </SimpleGrid>
          </VStack>
        )
        
      case 4:
        return (
          <VStack gap={6} textAlign="center">
            <Badge colorScheme="orange" size="lg" px={4} py={2} rounded="full">
              Review & Submit
            </Badge>
            
            <Text fontSize="xl" fontWeight="semibold" color="gray.900">
              Ready to Submit Your Application?
            </Text>
            
            <Text color="gray.600" maxW="2xl">
              Your application will be reviewed by our medical team at Adenike Renal Centre. 
              The initial review process takes 5-7 business days.
            </Text>
            
            <Box p={6} bg="accent.50"  maxW="md" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
              <VStack gap={4}>
                <Text fontWeight="semibold" color="gray.900">
                  Nexts After Submission:
                </Text>
                <VStack align="start" gap={2} fontSize="sm" color="gray.600">
                  <Text>✓ Application review (5-7 days)</Text>
                  <Text>✓ Initial phone screening</Text>
                  <Text>✓ Medical evaluation scheduled</Text>
                  <Text>✓ Comprehensive health assessment</Text>
                  <Text>✓ Final approval and matching</Text>
                </VStack>
              </VStack>
            </Box>
            
            <status="info" maxW="2xl">
              <Icon />
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="semibold">
                  Important Information:
                </Text>
                <Text fontSize="sm">
                  By submitting this application, you acknowledge that kidney donation 
                  is a serious medical procedure. All costs related to evaluation and 
                  donation are covered by Hope4PKD and Adenike Renal Centre.
                </Text>
              </VStack>
            </>
          </VStack>
        )
        
      default:
        return null
    }
  }

  return (
    <Box py={{ base: 16, md: 20 }} bg="gray.50" >
      <Container maxW="4xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text 
              fontSize={{ base: "3xl", md: "4xl" }} 
              fontWeight="bold" 
              color="gray.900"
            >
              Donor Application
            </Text>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="2xl"
            >
              Join our community of life-saving kidney donors. Your generosity 
              can give someone a second chance at life.
            </Text>
          </VStack>

          <Box w="full">
            <index={active} w="full" mb={8}>
              {steps.map((step, index) => (
                <key={index}>
                  <Indicator>
                    <Status
                      complete={<Icon />}
                      incomplete={<Number />}
                      active={<Number />}
                    />
                  </Indicator>

                  <Box flexShrink="0">
                    <Title>{step.title}</Title>
                    <Description>{step.description}</Description>
                  </Box>

                  <Separator />
                </>
              ))}
            </>

            <Box p={8} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
              {renderContent()}
              
              <HStack justify="space-between" pt={8}>
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  isDisabled={active=== 0}
                >
                  Previous
                </Button>
                
                <Button
                  variant={active=== steps.length - 1 ? "accent" : "primary"}
                  onClick={handleNext}
                  isDisabled={active=== steps.length - 1}
                >
                  {active=== steps.length - 1 ? "Submit Application" : "Next"}
                </Button>
              </HStack>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}