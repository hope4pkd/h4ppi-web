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
  Badge
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
import { HiCloudArrowUp, HiDocumentText, HiUserCircle } from "react-icons/hi2"

const steps = [
  { title: "Personal Info", description: "Basic information" },
  { title: "Medical History", description: "PKD details & health" },
  { title: "Documents", description: "Upload medical records" },
  { title: "Verification", description: "Medical verification" }
]

export function PatientRegistrationForm() {
  const { active setActive} = uses(0, steps.length)
  
  const [bloodType, setBloodType] = useState("")
  const [urgencyLevel, setUrgencyLevel] = useState("")
  const [complications, setComplications] = useState<string[]>([])

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
            
            <>
              <>Emergency Contact Name</>
              <Input placeholder="Full name of emergency contact" />
            </>
            
            <>
              <>Emergency Contact Phone</>
              <Input placeholder="+234 xxx xxx xxxx" />
            </>
          </SimpleGrid>
        )
        
      case 1:
        return (
          <VStack gap={6} align="stretch">
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
                <>When were you diagnosed with PKD?</>
                <Input type="date" />
              </>
              
              <isRequired>
                <>Current eGFR (if known)</>
                <Input placeholder="e.g., 25 mL/min/1.73m²" />
                <>Your kidney function level</>
              </>
              
              <isRequired>
                <>Urgency Level</>
                <Group value={urgencyLevel} onChange={setUrgencyLevel}>
                  <VStack align="start">
                    <value="high" colorScheme="red">
                      High - On dialysis or eGFR &lt; 15
                    </>
                    <value="moderate" colorScheme="orange">
                      Moderate - eGFR 15-30, approaching dialysis
                    </>
                    <value="low" colorScheme="green">
                      Low - eGFR &gt; 30, planning ahead
                    </>
                  </VStack>
                </Group>
              </>
            </SimpleGrid>
            
            <>
              <>PKD-related complications (check all that apply)</>
              <Group value={complications} onChange={(values) => setComplications(values as string[])}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
                  <value="hypertension">High blood pressure</>
                  <value="heart-disease">Heart disease</>
                  <value="kidney-stones">Kidney stones</>
                  <value="liver-cysts">Liver cysts</>
                  <value="brain-aneurysms">Brain aneurysms</>
                  <value="urinary-infections">Urinary tract infections</>
                </SimpleGrid>
              </Group>
            </>
            
            <>
              <>Current medications</>
              <Textarea 
                placeholder="your current medications and dosages"
                rows={4}
              />
            </>
            
            <>
              <>Additional medical history</>
              <Textarea 
                placeholder="Any other relevant medical conditions or family history"
                rows={4}
              />
            </>
          </VStack>
        )
        
      case 2:
        return (
          <VStack gap={6} align="stretch">
            <Text color="gray.600">
              Please upload the following medical documents. These will be reviewed by 
              our medical partners at Adenike Renal Centre.
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <BoxBox p={6} border="2px dashed" borderColor="gray.300" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={4}>
                  <HiCloudArrowUp size="48" color="gray" />
                  <VStack gap={2}>
                    <Text fontWeight="semibold">PKD Diagnosis Report</Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Upload your PKD diagnosis report from a qualified nephrologist
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
                    <Text fontWeight="semibold">Recent Lab Results</Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Kidney function tests, blood work (within last 3 months)
                    </Text>
                  </VStack>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </VStack>
              </CardBox>
              
              <BoxBox p={6} border="2px dashed" borderColor="gray.300" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
                <VStack gap={4}>
                  <HiUserCircle size="48" color="gray" />
                  <VStack gap={2}>
                    <Text fontWeight="semibold">Valid ID</Text>
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
                    <Text fontWeight="semibold">Insurance Documents</Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Health insurance details (if applicable)
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
        
      case 3:
        return (
          <VStack gap={6} textAlign="center">
            <Badge colorScheme="green" size="lg" px={4} py={2} rounded="full">
              Final</Badge>
            
            <Text fontSize="xl" fontWeight="semibold" color="gray.900">
              Medical Verification Process
            </Text>
            
            <Text color="gray.600" maxW="2xl">
              Your application will be reviewed by medical professionals at Adenike Renal Centre. 
              This process typically takes 3-5 business days.
            </Text>
            
            <Box p={6} bg="brand.50"  maxW="md" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
              <VStack gap={4}>
                <Text fontWeight="semibold" color="gray.900">
                  What happens next?
                </Text>
                <VStack align="start" gap={2} fontSize="sm" color="gray.600">
                  <Text>✓ Medical team reviews your documents</Text>
                  <Text>✓ Verification call scheduled if needed</Text>
                  <Text>✓ Profile activated in matching system</Text>
                  <Text>✓ You'll receive email confirmation</Text>
                </VStack>
              </VStack>
            </Box>
            
            <Text fontSize="sm" color="gray.600">
              By submitting this application, you agree to our Terms of Service and 
              Privacy Policy. All medical information is kept strictly confidential.
            </Text>
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
              Patient Registration
            </Text>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              color="gray.600" 
              maxW="2xl"
            >
              Complete your registration to get matched with compatible kidney donors 
              and access our crowdfunding platform.
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
                  variant="solid"
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