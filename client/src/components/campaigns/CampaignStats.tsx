// import { 
//   Box, 
//   Container, 
//   VStack, 
//   HStack,
//   Text, 
//   SimpleGrid
//   Icon
//   Badge
// } from "@chakra-ui/react"
// import { HiTrophy, HiClock, HiCurrencyDollar, HiUsers } from "react-icons/hi2"

// const StatCard = ({ 
//   icon, 
//   value, 
//   label, 
//   description,
//   color
// }: { 
//   icon: any; 
//   value: string; 
//   label: string; 
//   description: string;
//   color: string;
// }) => (
//   <Box p={6} bg="white"  textAlign="center" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//     <VStack gap={4}>
//       <Box 
//         p={4} 
//         bg={`${color}.500`} 
//         rounded="full" 
//         color="white"
//       >
//         <Icon as={icon} w={8} h={8} />
//       </Box>
//       <VStack gap={1}>
//         <Text fontSize="3xl" fontWeight="bold" color={`${color}.500`}>
//           {value}
//         </Text>
//         <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//           {label}
//         </Text>
//         <Text fontSize="sm" color="gray.600" maxW="200px">
//           {description}
//         </Text>
//       </VStack>
//     </VStack>
//   </Box>
// )

// const TrendingCampaign = ({ 
//   patientName, 
//   progress, 
//   raised, 
//   goal, 
//   daysLeft,
//   location 
// }: { 
//   patientName: string; 
//   progress: number; 
//   raised: string; 
//   goal: string; 
//   daysLeft: number;
//   location: string;
// }) => (
//   <Box p={6} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//     <VStack gap={4} align="start">
//       <HStack justify="space-between" w="full">
//         <VStack align="start" gap={0}>
//           <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//             {patientName}
//           </Text>
//           <Text fontSize="sm" color="gray.600">
//             {location}
//           </Text>
//         </VStack>
//         <Badge 
//           colorScheme={daysLeft > 30 ? "green" : daysLeft > 10 ? "orange" : "red"} 
//           size="sm"
//         >
//           {daysLeft} days left
//         </Badge>
//       </HStack>
      
//       <VStack gap={2} w="full">
//         <HStack justify="space-between" w="full">
//           <Text fontSize="sm" color="gray.600">: {progress}%
//           </Text>
//           <Text fontSize="sm" fontWeight="semibold" color="gray.900">
//             {raised} / {goal}
//           </Text>
//         </HStack>
//         <value={progress} 
//           colorScheme={progress >= 75 ? "green" : progress >= 50 ? "orange" : "red"}
//           size="md" 
//           w="full" 
//           rounded="full"
//         />
//       </VStack>
      
//       <Text fontSize="sm" color="gray.600">
//         Last donation: 2 hours ago
//       </Text>
//     </VStack>
//   </Box>
// )

// export function CampaignStats() {
//   return (
//     <Box py={{ base: 16, md: 20 }} bg="gray.50" >
//       <Container maxW="7xl">
//         <VStack gap={12}>
//           <VStack gap={4} textAlign="center">
//             <Text 
//               fontSize={{ base: "3xl", md: "4xl" }} 
//               fontWeight="bold" 
//               color="gray.900"
//             >
//               Campaign Impact Statistics
//             </Text>
//             <Text 
//               fontSize={{ base: "lg", md: "xl" }} 
//               color="gray.600" 
//               maxW="2xl"
//             >
//               See how our community is making a real difference in the lives of 
//               PKD patients across Nigeria through crowdfunded medical support.
//             </Text>
//           </VStack>

//           {/* Main Stats */}
//           <SimpleGrid columns={{ base: 2, md: 4 }} gap={6} w="full">
//             <StatCard
//               icon={HiCurrencyDollar}
//               value="₦25.3M"
//               label="Total Raised"
//               description="Cumulative funds raised for PKD patients"
//               color="brand"
//             />
//             <StatCard
//               icon={HiUsers}
//               value="2,547"
//               label="Total Donors"
//               description="Individual contributors to campaigns"
//               color="accent"
//             />
//             <StatCard
//               icon={HiTrophy}
//               value="128"
//               label="Successful Campaigns"
//               description="Campaigns that reached their funding goals"
//               color="green"
//             />
//             <StatCard
//               icon={HiClock}
//               value="25"
//               label="Active Campaigns"
//               description="Currently running fundraising campaigns"
//               color="blue"
//             />
//           </SimpleGrid>

//           {/* Trending Campaigns */}
//           <VStack gap={8} w="full">
//             <HStack justify="space-between" w="full">
//               <VStack align="start" gap={1}>
//                 <Text 
//                   fontSize="2xl" 
//                   fontWeight="bold" 
//                   color="gray.900"
//                 >
//                   Trending Campaigns
//                 </Text>
//                 <Text color="gray.600">
//                   Most active campaigns this week
//                 </Text>
//               </VStack>
//               <Badge colorScheme="green" size="lg" px={3} py={1}>
//                 Live Updates
//               </Badge>
//             </HStack>
            
//             <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
//               <TrendingCampaign
//                 patientName="Amara Okafor"
//                 progress={87}
//                 raised="₦3.05M"
//                 goal="₦3.5M"
//                 daysLeft={12}
//                 location="Lagos, Nigeria"
//               />
              
//               <TrendingCampaign
//                 patientName="Ibrahim Suleiman"
//                 progress={72}
//                 raised="₦2.88M"
//                 goal="₦4M"
//                 daysLeft={25}
//                 location="Abuja, Nigeria"
//               />
              
//               <TrendingCampaign
//                 patientName="Grace Onyeka"
//                 progress={94}
//                 raised="₦3.29M"
//                 goal="₦3.5M"
//                 daysLeft={8}
//                 location="Port Harcourt, Nigeria"
//               />
//             </SimpleGrid>
//           </VStack>

//           {/* Monthly Breakdown */}
//           <Box p={8} bg="white"  w="full" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//             <VStack gap={6}>
//               <Text 
//                 fontSize="2xl" 
//                 fontWeight="bold" 
//                 color="gray.900" 
//                 textAlign="center"
//               >
//                 This Month's Impact
//               </Text>
              
//               <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
//                 <VStack textAlign="center">
//                   <VStack gap={2}>
//                     <Text fontSize="3xl" fontWeight="bold" color="brand.500">
//                       ₦2.8M
//                     </Text>
//                     <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//                       Funds Raised
//                     </Text>
//                     <Text fontSize="sm" color="gray.600">
//                       Across 12 active campaigns
//                     </Text>
//                   </VStack>
//                   <value={85} colorScheme="brand" size="sm" w="full" />
//                   <Text fontSize="xs" color="gray.600">
//                     85% of monthly goal
//                   </Text>
//                 </VStack>
                
//                 <VStack textAlign="center">
//                   <VStack gap={2}>
//                     <Text fontSize="3xl" fontWeight="bold" color="accent.500">
//                       347
//                     </Text>
//                     <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//                       New Donors
//                     </Text>
//                     <Text fontSize="sm" color="gray.600">
//                       First-time contributors
//                     </Text>
//                   </VStack>
//                   <value={92} colorScheme="orange" size="sm" w="full" />
//                   <Text fontSize="xs" color="gray.600">
//                     92% of target reached
//                   </Text>
//                 </VStack>
                
//                 <VStack textAlign="center">
//                   <VStack gap={2}>
//                     <Text fontSize="3xl" fontWeight="bold" color="green.500">
//                       5
//                     </Text>
//                     <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//                       Goals Reached
//                     </Text>
//                     <Text fontSize="sm" color="gray.600">
//                       Successful campaigns
//                     </Text>
//                   </VStack>
//                   <value={100} colorScheme="green" size="sm" w="full" />
//                   <Text fontSize="xs" color="gray.600">
//                     100% success rate
//                   </Text>
//                 </VStack>
//               </SimpleGrid>
//             </VStack>
//           </Box>
//         </VStack>
//       </Container>
//     </Box>
//   )
// }