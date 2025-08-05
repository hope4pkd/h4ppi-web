// import { 
//   Box, 
//   Container, 
//   VStack, 
//   HStack,
//   Text, 
//   SimpleGrid
//   Icon,
//   Badge,
//   Timeline
//   Button
// } from "@chakra-ui/react"
// import { 
//   HiDocumentCheck, 
//   HiUserGroup, 
//   HiBeaker, 
//   HiHeart,
//   HiShieldCheck,
//   HiCalendarDays,
//   HiChatBubbleLeftRight
// } from "react-icons/hi2"

// const Process= ({ 
//   icon, 
//   title, 
//   description, 
//   duration,
//   details,
//   step 
// }: { 
//   icon: any; 
//   title: string; 
//   description: string; 
//   duration: string;
//   details: string[];
//   step: number;
// }) => (
//   <Box p={6} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//     <VStack gap={4} align="start">
//       <HStack justify="space-between" w="full">
//         <HStack gap={3}>
//           <Box 
//             p={3} 
//             bg="accent.500" 
//             rounded="lg" 
//             color="white"
//           >
//             <Icon as={icon} w={6} h={6} />
//           </Box>
//           <VStack align="start" gap={0}>
//             <Text fontSize="lg" fontWeight="semibold" color="gray.900">{step}: {title}
//             </Text>
//             <Badge colorScheme="orange" size="sm">
//               {duration}
//             </Badge>
//           </VStack>
//         </HStack>
//       </HStack>
      
//       <Text color="gray.600">
//         {description}
//       </Text>
      
//       <VStack align="start" gap={1} w="full">
//         <Text fontSize="sm" fontWeight="semibold" color="gray.900">
//           What's included:
//         </Text>
//         {details.map((detail, index) => (
//           <Text key={index} fontSize="sm" color="gray.600">
//             • {detail}
//           </Text>
//         ))}
//       </VStack>
//     </VStack>
//   </Box>
// )

// const SafetyFeature = ({ 
//   icon, 
//   title, 
//   description 
// }: { 
//   icon: any; 
//   title: string; 
//   description: string;
// }) => (
//   <HStack gap={4} align="start">
//     <Box 
//       p={3} 
//       bg="green.500" 
//       rounded="lg" 
//       color="white"
//       flexShrink={0}
//     >
//       <Icon as={icon} w={5} h={5} />
//     </Box>
//     <VStack align="start" gap={1}>
//       <Text fontWeight="semibold" color="gray.900">
//         {title}
//       </Text>
//       <Text fontSize="sm" color="gray.600">
//         {description}
//       </Text>
//     </VStack>
//   </HStack>
// )

// export function DonorProcess() {
//   return (
//     <Box py={{ base: 16, md: 20 }}>
//       <Container maxW="7xl">
//         <VStack gap={12}>
//           <VStack gap={4} textAlign="center">
//             <Text 
//               fontSize={{ base: "3xl", md: "4xl" }} 
//               fontWeight="bold" 
//               color="gray.900"
//             >
//               The Donation Process
//             </Text>
//             <Text 
//               fontSize={{ base: "lg", md: "xl" }} 
//               color="gray.600" 
//               maxW="2xl"
//             >
//               A comprehensive, safe process designed to protect donors while 
//               saving lives. Every step is guided by medical professionals 
//               at Adenike Renal Centre.
//             </Text>
//           </VStack>

//           {/* Process Timeline */}
//           <VStack gap={8} w="full">
//             <Text 
//               fontSize="2xl" 
//               fontWeight="bold" 
//               color="gray.900" 
//               textAlign="center"
//             >
//               Your Journey as a Donor
//             </Text>
            
//             <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} w="full">
//               <Processicon={HiDocumentCheck}
//                 title="Application & Screening"
//                 description="Initial application review and basic health screening"
//                 duration="1-2 weeks"
//                 details={[
//                   "Online application submission",
//                   "Document verification",
//                   "Initial phone interview",
//                   "Basic eligibility assessment"
//                 ]}
//                 step={1}
//               />
              
//               <Processicon={HiBeaker}
//                 title="Medical Evaluation"
//                 description="Comprehensive medical testing and health assessment"
//                 duration="2-3 weeks"
//                 details={[
//                   "Blood and urine tests",
//                   "Kidney function assessment",
//                   "Imaging studies (CT scan, ultrasound)",
//                   "Heart and lung evaluation",
//                   "Psychological assessment"
//                 ]}
//                 step={2}
//               />
              
//               <Processicon={HiUserGroup}
//                 title="Matching Process"
//                 description="Compatibility matching with recipient patients"
//                 duration="1-4 weeks"
//                 details={[
//                   "Blood type compatibility",
//                   "Tissue typing (HLA matching)",
//                   "Cross-match testing",
//                   "Medical compatibility review"
//                 ]}
//                 step={3}
//               />
              
//               <Processicon={HiCalendarDays}
//                 title="Pre-Surgery Preparation"
//                 description="Final preparations and surgery scheduling"
//                 duration="1-2 weeks"
//                 details={[
//                   "Final medical clearance",
//                   "Surgery date scheduling",
//                   "Pre-operative instructions",
//                   "Family counseling session"
//                 ]}
//                 step={4}
//               />
              
//               <Processicon={HiHeart}
//                 title="Donation Surgery"
//                 description="Minimally invasive laparoscopic kidney removal"
//                 duration="1 day"
//                 details={[
//                   "3-4 hour surgical procedure",
//                   "Laparoscopic (keyhole) surgery",
//                   "General anesthesia",
//                   "Post-operative monitoring"
//                 ]}
//                 step={5}
//               />
              
//               <Processicon={HiShieldCheck}
//                 title="Recovery & Follow-up"
//                 description="Comprehensive recovery support and long-term monitoring"
//                 duration="Lifelong"
//                 details={[
//                   "3-5 day hospital stay",
//                   "2-4 week recovery period",
//                   "Regular follow-up appointments",
//                   "Annual health monitoring"
//                 ]}
//                 step={6}
//               />
//             </SimpleGrid>
//           </VStack>

//           {/* Safety & Support */}
//           <VStack gap={8} w="full">
//             <Text 
//               fontSize="2xl" 
//               fontWeight="bold" 
//               color="gray.900" 
//               textAlign="center"
//             >
//               Your Safety & Support
//             </Text>
            
//             <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w="full">
//               <Box p={8} bg="green.50"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//                 <VStack gap={6} align="start">
//                   <Text fontSize="xl" fontWeight="bold" color="gray.900">
//                     Medical Safety Measures
//                   </Text>
                  
//                   <VStack gap={4} align="stretch">
//                     <SafetyFeature
//                       icon={HiShieldCheck}
//                       title="World-Class Facility"
//                       description="State-of-the-art surgical facility at Adenike Renal Centre with international standards"
//                     />
                    
//                     <SafetyFeature
//                       icon={HiUserGroup}
//                       title="Expert Medical Team"
//                       description="Experienced transplant surgeons and medical professionals specializing in kidney donation"
//                     />
                    
//                     <SafetyFeature
//                       icon={HiBeaker}
//                       title="Comprehensive Testing"
//                       description="Thorough medical evaluation ensures your safety and suitability for donation"
//                     />
                    
//                     <SafetyFeature
//                       icon={HiHeart}
//                       title="Minimally Invasive Surgery"
//                       description="Laparoscopic technique results in smaller incisions, less pain, and faster recovery"
//                     />
//                   </VStack>
//                 </VStack>
//               </Box>
              
//               <Box p={8} bg="blue.50"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//                 <VStack gap={6} align="start">
//                   <Text fontSize="xl" fontWeight="bold" color="gray.900">
//                     Support Services
//                   </Text>
                  
//                   <VStack gap={4} align="stretch">
//                     <SafetyFeature
//                       icon={HiChatBubbleLeftRight}
//                       title="24/7 Support Hotline"
//                       description="Round-the-clock access to medical support staff for any questions or concerns"
//                     />
                    
//                     <SafetyFeature
//                       icon={HiCalendarDays}
//                       title="Flexible Scheduling"
//                       description="Work with your schedule for all appointments and procedures"
//                     />
                    
//                     <SafetyFeature
//                       icon={HiUserGroup}
//                       title="Family Support"
//                       description="Counseling and support services for your family throughout the process"
//                     />
                    
//                     <SafetyFeature
//                       icon={HiShieldCheck}
//                       title="Lifetime Follow-up"
//                       description="Annual health monitoring and support for the rest of your life"
//                     />
//                   </VStack>
//                 </VStack>
//               </Box>
//             </SimpleGrid>
//           </VStack>

//           {/* Cost Coverage */}
//           <Box p={8} bg="accent.50"  w="full" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//             <VStack gap={6} textAlign="center">
//               <Text fontSize="2xl" fontWeight="bold" color="gray.900">
//                 Complete Cost Coverage
//               </Text>
              
//               <Text color="gray.600" maxW="3xl">
//                 All costs related to your donation are completely covered by Hope4PKD 
//                 and our medical partners. You will never pay anything out of pocket.
//               </Text>
              
//               <SimpleGrid columns={{ base: 1, md: 4 }} gap={6} w="full" maxW="4xl">
//                 <VStack>
//                   <Text fontSize="lg" fontWeight="semibold" color="accent.500">
//                     Medical Evaluation
//                   </Text>
//                   <Text fontSize="sm" color="gray.600" textAlign="center">
//                     All tests, scans, and consultations
//                   </Text>
//                 </VStack>
                
//                 <VStack>
//                   <Text fontSize="lg" fontWeight="semibold" color="accent.500">
//                     Surgery & Hospital
//                   </Text>
//                   <Text fontSize="sm" color="gray.600" textAlign="center">
//                     Complete surgical and hospital costs
//                   </Text>
//                 </VStack>
                
//                 <VStack>
//                   <Text fontSize="lg" fontWeight="semibold" color="accent.500">
//                     Recovery Support
//                   </Text>
//                   <Text fontSize="sm" color="gray.600" textAlign="center">
//                     Post-operative care and medications
//                   </Text>
//                 </VStack>
                
//                 <VStack>
//                   <Text fontSize="lg" fontWeight="semibold" color="accent.500">
//                     Lifetime Monitoring
//                   </Text>
//                   <Text fontSize="sm" color="gray.600" textAlign="center">
//                     Annual check-ups and health screening
//                   </Text>
//                 </VStack>
//               </SimpleGrid>
              
//               <Button variant="outline" size="lg">
//                 Start Your Application
//               </Button>
//             </VStack>
//           </Box>
//         </VStack>
//       </Container>
//     </Box>
//   )
// }

