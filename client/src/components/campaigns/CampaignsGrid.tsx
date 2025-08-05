// "use client"

// import { 
//   Box, 
//   Container, 
//   VStack, 
//   HStack,
//   Text, 
//   Button, 
//   SimpleGrid
//   Badge
//   Image
//   Input,
//   InputGroup
//   Icon
// } from "@chakra-ui/react"
// import { HiMagnifyingGlass, HiMapPin, HiClock, HiHeart } from "react-icons/hi2"

// import { 
//   FormControl, 
//   FormLabel, 
//   FormHelperText,
//   Stepper, 
//   useSteps,
//   Select, 
//   Radio, 
//   RadioGroup, 
//   Checkbox,
//   Alert,
//   Avatar,
//   AvatarGroup,
//   Progress,
//   List,
//   ListItem,
//   CardBox
// } from "@/components/ui"

// import { useState } from "react"

// interface Campaign {
//   id: string
//   patientName: string
//   age: number
//   location: string
//   story: string
//   goal: number
//   raised: number
//   daysLeft: number
//   donorCount: number
//   urgency: "high" | "medium" | "low"
//   image?: string
// }

// const campaigns: Campaign[] = [
//   {
//     id: "1",
//     patientName: "Amara Okafor",
//     age: 34,
//     location: "Lagos, Nigeria",
//     story: "A dedicated teacher and mother of two needs urgent kidney transplant to continue caring for her students and family.",
//     goal: 3500000,
//     raised: 3050000,
//     daysLeft: 12,
//     donorCount: 156,
//     urgency: "high"
//   },
//   {
//     id: "2", 
//     patientName: "Ibrahim Suleiman",
//     age: 41,
//     location: "Abuja, Nigeria",
//     story: "Small business owner and father of three battling PKD. His family depends on his income and recovery.",
//     goal: 4000000,
//     raised: 2880000,
//     daysLeft: 25,
//     donorCount: 203,
//     urgency: "medium"
//   },
//   {
//     id: "3",
//     patientName: "Grace Onyeka",
//     age: 28,
//     location: "Port Harcourt, Nigeria",
//     story: "Young nurse who has dedicated her life to helping others now needs help herself for life-saving kidney treatment.",
//     goal: 3500000,
//     raised: 3290000,
//     daysLeft: 8,
//     donorCount: 187,
//     urgency: "high"
//   },
//   {
//     id: "4",
//     patientName: "Yusuf Mohammed",
//     age: 39,
//     location: "Kano, Nigeria", 
//     story: "Engineering lecturer and community leader seeking support for kidney transplant to continue serving his community.",
//     goal: 3800000,
//     raised: 1520000,
//     daysLeft: 45,
//     donorCount: 89,
//     urgency: "medium"
//   },
//   {
//     id: "5",
//     patientName: "Blessing Adebayo",
//     age: 31,
//     location: "Ibadan, Nigeria",
//     story: "Single mother and social worker needs urgent transplant to continue caring for her daughter and helping vulnerable families.",
//     goal: 3200000,
//     raised: 960000,
//     daysLeft: 35,
//     donorCount: 67,
//     urgency: "low"
//   },
//   {
//     id: "6",
//     patientName: "Chinedu Okwu",
//     age: 45,
//     location: "Enugu, Nigeria",
//     story: "Farmer and community elder who feeds many families now needs community support for his kidney treatment.",
//     goal: 3600000,
//     raised: 2160000,
//     daysLeft: 28,
//     donorCount: 134,
//     urgency: "medium"
//   }
// ]

// const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
//   const progress = (campaign.raised / campaign.goal) * 100
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-NG', {
//       style: 'currency',
//       currency: 'NGN',
//       minimumFractionDigits: 0
//     }).format(amount)
//   }

//   const getUrgencyColor = (urgency: string) => {
//     switch (urgency) {
//       case "high": return "red"
//       case "medium": return "orange"
//       case "low": return "green"
//       default: return "gray"
//     }
//   }

//   return (
//     <Box overflow="hidden" bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//       <VStack align="stretch" gap={0}>
//         {/* Image placeholder */}
//         <Box h="200px" bg="gray.100"  position="relative">
//           <Box 
//             position="absolute" 
//             top={3} 
//             right={3} 
//             zIndex={1}
//           >
//             <Badge 
//               colorScheme={getUrgencyColor(campaign.urgency)} 
//               size="sm"
//               textTransform="capitalize"
//             >
//               {campaign.urgency} Priority
//             </Badge>
//           </Box>
//           <Box 
//             position="absolute" 
//             bottom={3} 
//             left={3} 
//             zIndex={1}
//           >
//             <HStack>
//               <size="md" 
//                 name={campaign.patientName} 
//                 bg="brand.500" 
//               />
//               <VStack align="start" gap={0}>
//                 <Text fontSize="sm" fontWeight="bold" color="white">
//                   {campaign.patientName}
//                 </Text>
//                 <Text fontSize="xs" color="white">
//                   Age {campaign.age}
//                 </Text>
//               </VStack>
//             </HStack>
//           </Box>
//           <Box 
//             position="absolute" 
//             inset={0} 
//             bgGradient="linear(to-t, blackAlpha.600, transparent)" 
//           />
//         </Box>
        
//         <VStack p={6} gap={4} align="stretch">
//           <VStack align="start" gap={2}>
//             <HStack gap={2}>
//               <Icon as={HiMapPin} color="gray.500" w={4} h={4} />
//               <Text fontSize="sm" color="gray.600">
//                 {campaign.location}
//               </Text>
//             </HStack>
            
//             <Text fontSize="sm" color="gray.600" // noOfLines={3}>
//               {campaign.story}
//             </Text>
//           </VStack>
          
//           <VStack gap={3} align="stretch">
//             <HStack justify="space-between">
//               <Text fontSize="sm" color="gray.600">
//                 {progress.toFixed(1)}% funded
//               </Text>
//               <Text fontSize="sm" fontWeight="semibold" color="gray.900">
//                 {formatCurrency(campaign.raised)}
//               </Text>
//             </HStack>
            
//             <value={progress} 
//               colorScheme={progress >= 75 ? "green" : progress >= 50 ? "orange" : "red"}
//               size="md" 
//               rounded="full"
//             />
            
//             <HStack justify="space-between" fontSize="sm" color="gray.600">
//               <Text>
//                 Goal: {formatCurrency(campaign.goal)}
//               </Text>
//               <HStack gap={1}>
//                 <Icon as={HiClock} w={4} h={4} />
//                 <Text>{campaign.daysLeft} days left</Text>
//               </HStack>
//             </HStack>
//           </VStack>
          
//           <HStack justify="space-between" align="center">
//             <Text fontSize="sm" color="gray.600">
//               {campaign.donorCount} donors
//             </Text>
//             <HStack gap={2}>
//               <Button variant="outline" size="sm">
//                 Learn More
//               </Button>
//               <Button variant="solid" size="sm" >
//                 Donate
//               </Button>
//             </HStack>
//           </HStack>
//         </VStack>
//       </VStack>
//     </Box>
//   )
// }

// export function CampaignsGrid() {
//   const [sortBy, setSortBy] = useState("newest")
//   const [filterBy, setFilterBy] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")

//   return (
//     <Box py={{ base: 16, md: 20 }}>
//       <Container maxW="7xl">
//         <VStack gap={8}>
//           <VStack gap={4} textAlign="center">
//             <Text 
//               fontSize={{ base: "3xl", md: "4xl" }} 
//               fontWeight="bold" 
//               color="gray.900"
//             >
//               Active Campaigns
//             </Text>
//             <Text 
//               fontSize={{ base: "lg", md: "xl" }} 
//               color="gray.600" 
//               maxW="2xl"
//             >
//               Support PKD patients by contributing to their treatment campaigns. 
//               Every donation makes a difference in someone's life.
//             </Text>
//           </VStack>

//           {/* Filters */}
//           <HStack 
//             gap={4} 
//             w="full" 
//             justify="space-between" 
//             flexDirection={{ base: "column", md: "row" }}
//           >
//             <InputGroup maxW="md">
//               <>
//                 <Icon as={HiMagnifyingGlass} color="gray.400" />
//               </>
//               <Input 
//                 placeholder="Search campaigns..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </InputGroup>
            
//             <HStack gap={3}>
//               <value={filterBy} 
//                 onChange={(e) => setFilterBy(e.target.value)}
//                 maxW="200px"
//               >
//                 <option value="all">All Campaigns</option>
//                 <option value="high">High Priority</option>
//                 <option value="medium">Medium Priority</option>
//                 <option value="low">Low Priority</option>
//               </>
              
//               <value={sortBy} 
//                 onChange={(e) => setSortBy(e.target.value)}
//                 maxW="200px"
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="urgent">Most Urgent</option>
//                 <option value="progress">Most</option>
//                 <option value="amount">Highest Goal</option>
//               </>
//             </HStack>
//           </HStack>

//           {/* Campaigns Grid */}
//           <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
//             {campaigns.map((campaign) => (
//               <CampaignCard key={campaign.id} campaign={campaign} />
//             ))}
//           </SimpleGrid>

//           {/* Load More */}
//           <VStack gap={4} pt={8}>
//             <Text color="gray.600">
//               Showing 6 of 25 active campaigns
//             </Text>
//             <Button variant="outline" size="lg">
//               Load More Campaigns
//             </Button>
//           </VStack>
//         </VStack>
//       </Container>
//     </Box>
//   )
// }