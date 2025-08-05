// import { 
//   Box, 
//   Container, 
//   VStack, 
//   HStack,
//   Text, 
//   Button, 
//   SimpleGrid
//   IconItemIcon,
//   Badge
// } from "@chakra-ui/react"
// import { 
//   HiCurrencyDollar, 
//   HiShare, 
//   HiUsers, 
//   HiHeart,
//   HiCheckCircle,
//   HiSparkles,
//   HiShieldCheck
// } from "react-icons/hi2"

// const SupportWayCard = ({ 
//   icon, 
//   title, 
//   description, 
//   steps,
//   color
// }: { 
//   icon: any; 
//   title: string; 
//   description: string; 
//   steps: string[];
//   color: string;
// }) => (
//   <Box p={6} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//     <VStack gap={4} align="start">
//       <HStack gap={3}>
//         <Box 
//           p={3} 
//           bg={`${color}.500`} 
//           rounded="lg" 
//           color="white"
//         >
//           <Icon as={icon} w={6} h={6} />
//         </Box>
//         <VStack align="start" gap={0}>
//           <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//             {title}
//           </Text>
//           <Badge colorScheme={color} size="sm">
//             High Impact
//           </Badge>
//         </VStack>
//       </HStack>
      
//       <Text color="gray.600">
//         {description}
//       </Text>
      
//       <VStack align="start" gap={2} w="full">
//         <Text fontSize="sm" fontWeight="semibold" color="gray.900">
//           How it works:
//         </Text>
//         <gap={1}>
//           {steps.map((step, index) => (
//             <Item key={index} fontSize="sm">
//               <Icon as={HiCheckCircle} color={`${color}.500`} />
//               {step}
//             </Item>
//           ))}
//         </>
//       </VStack>
      
//       <Button variant="outline" colorScheme={color} w="full">
//         Get Started
//       </Button>
//     </VStack>
//   </Box>
// )

// const DonationTier = ({ 
//   amount, 
//   title, 
//   description, 
//   impact 
// }: { 
//   amount: string; 
//   title: string; 
//   description: string; 
//   impact: string;
// }) => (
//   <Box p={6} bg="white"  textAlign="center" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//     <VStack gap={4}>
//       <VStack gap={2}>
//         <Text fontSize="2xl" fontWeight="bold" color="brand.500">
//           {amount}
//         </Text>
//         <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//           {title}
//         </Text>
//       </VStack>
      
//       <Text fontSize="sm" color="gray.600">
//         {description}
//       </Text>
      
//       <Box p={3} bg="brand.50"  rounded="md" w="full">
//         <Text fontSize="sm" fontWeight="semibold" color="brand.600">
//           Impact: {impact}
//         </Text>
//       </Box>
      
//       <Button variant="solid" w="full">
//         Donate {amount}
//       </Button>
//     </VStack>
//   </Box>
// )

// export function HowToSupport() {
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
//               How You Can Help
//             </Text>
//             <Text 
//               fontSize={{ base: "lg", md: "xl" }} 
//               color="gray.600" 
//               maxW="2xl"
//             >
//               There are many ways to support PKD patients beyond monetary donations. 
//               Every form of support makes a meaningful difference.
//             </Text>
//           </VStack>

//           {/* Ways to Support */}
//           <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
//             <SupportWayCard
//               icon={HiCurrencyDollar}
//               title="Direct Donations"
//               description="Contribute directly to patient campaigns for immediate impact"
//               steps={[
//                 "Browse active campaigns",
//                 "Choose donation amount", 
//                 "Complete secure payment",
//                 "Receive impact updates"
//               ]}
//               color="brand"
//             />
            
//             <SupportWayCard
//               icon={HiShare}
//               title="Share Campaigns"
//               description="Amplify patient stories by sharing on social media and with networks"
//               steps={[
//                 "Find campaigns to support",
//                 "Share on social platforms",
//                 "Send to friends and family",
//                 "Track shared campaign progress"
//               ]}
//               color="blue"
//             />
            
//             <SupportWayCard
//               icon={HiUsers}
//               title="Organize Fundraisers"
//               description="Host events or create community fundraising initiatives"
//               steps={[
//                 "Register as fundraiser",
//                 "Plan your event or activity",
//                 "Promote to your network",
//                 "Collect and transfer funds"
//               ]}
//               color="purple"
//             />
            
//             <SupportWayCard
//               icon={HiHeart}
//               title="Volunteer Support"
//               description="Offer time and skills to help patients and their families"
//               steps={[
//                 "Apply as volunteer",
//                 "Complete orientation",
//                 "Get matched with patients",
//                 "Provide ongoing support"
//               ]}
//               color="pink"
//             />
//           </SimpleGrid>

//           {/* Donation Tiers */}
//           <VStack gap={8} w="full">
//             <VStack gap={4} textAlign="center">
//               <Text 
//                 fontSize="2xl" 
//                 fontWeight="bold" 
//                 color="gray.900"
//               >
//                 Suggested Donation Amounts
//               </Text>
//               <Text color="gray.600" maxW="2xl">
//                 Every amount helps, but here are some suggested tiers and their 
//                 impact on patient care and treatment costs.
//               </Text>
//             </VStack>
            
//             <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
//               <DonationTier
//                 amount="₦5,000"
//                 title="Supporter"
//                 description="Help cover basic medical consultations and tests"
//                 impact="Covers 1 consultation session"
//               />
              
//               <DonationTier
//                 amount="₦25,000"
//                 title="Advocate"
//                 description="Support diagnostic tests and medical evaluations"
//                 impact="Covers basic diagnostic tests"
//               />
              
//               <DonationTier
//                 amount="₦100,000"
//                 title="Champion"
//                 description="Contribute to dialysis sessions and medication costs"
//                 impact="Covers 2 months of dialysis"
//               />
              
//               <DonationTier
//                 amount="₦500,000"
//                 title="Hero"
//                 description="Make a significant impact toward transplant surgery costs"
//                 impact="Covers 15% of surgery costs"
//               />
//             </SimpleGrid>
//           </VStack>

//           {/* Security & Trust */}
//           <Box p={8} bg="green.50"  w="full" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//             <VStack gap={6}>
//               <VStack gap={4} textAlign="center">
//                 <HStack gap={3}>
//                   <Icon as={HiShieldCheck} color="green.500" w={8} h={8} />
//                   <Text fontSize="2xl" fontWeight="bold" color="gray.900">
//                     Secure & Transparent Donations
//                   </Text>
//                 </HStack>
//                 <Text color="gray.600" maxW="2xl">
//                   Your donations are processed securely and go directly to verified 
//                   patient campaigns. We provide full transparency on fund usage.
//                 </Text>
//               </VStack>
              
//               <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
//                 <VStack textAlign="center">
//                   <Icon as={HiShieldCheck} color="green.500" w={8} h={8} />
//                   <Text fontWeight="semibold" color="gray.900">
//                     Secure Payments
//                   </Text>
//                   <Text fontSize="sm" color="gray.600">
//                     Bank-grade encryption and secure payment processing through Paystack
//                   </Text>
//                 </VStack>
                
//                 <VStack textAlign="center">
//                   <Icon as={HiSparkles} color="green.500" w={8} h={8} />
//                   <Text fontWeight="semibold" color="gray.900">
//                     Verified Campaigns
//                   </Text>
//                   <Text fontSize="sm" color="gray.600">
//                     All patients verified by Adenike Renal Centre medical professionals
//                   </Text>
//                 </VStack>
                
//                 <VStack textAlign="center">
//                   <Icon as={HiHeart} color="green.500" w={8} h={8} />
//                   <Text fontWeight="semibold" color="gray.900">
//                     Impact Updates
//                   </Text>
//                   <Text fontSize="sm" color="gray.600">
//                     Regular updates on patient progress and fund utilization
//                   </Text>
//                 </VStack>
//               </SimpleGrid>
              
//               <VStack gap={4} textAlign="center" pt={4}>
//                 <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//                   Ready to Make a Difference?
//                 </Text>
//                 <HStack gap={4}>
//                   <Button variant="solid" size="lg">
//                     Browse Campaigns
//                   </Button>
//                   <Button variant="outline" size="lg">
//                     Start Fundraising
//                   </Button>
//                 </HStack>
//               </VStack>
//             </VStack>
//           </Box>
//         </VStack>
//       </Container>
//     </Box>
//   )
// }