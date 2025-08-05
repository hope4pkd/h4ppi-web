// "use client"

// import { 
//   Box, 
//   Container, 
//   VStack, 
//   HStack,
//   Text, 
//   Button, 
//   SimpleGrid
//   Badge,
//   Icon,
//   Input,
//   InputGroup} from "@chakra-ui/react"
// import { HiCurrencyDollar, HiMagnifyingGlass, HiUsers, HiHeart } from "react-icons/hi2"

// export function CampaignsHeroSection() {
//   return (
//     <Box 
//       bgGradient="linear(to-br, green.50, white)"
      
//       py={{ base: 16, md: 20 }}
//     >
//       <Container maxW="7xl">
//         <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12} alignItems="center">
//           {/* Left Content */}
//           <VStack align="start" gap={8}>
//             <Badge 
//               colorScheme="green" 
//               size="lg" 
//               px={3} 
//               py={1} 
//               rounded="full"
//               fontSize="sm"
//             >
//               💚 Support PKD Patients
//             </Badge>
            
//             <VStack align="start" gap={4}>
//               <Text 
//                 fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} 
//                 fontWeight="bold" 
//                 lineHeight="1.1"
//                 color="gray.900"
//               >
//                 Fund{" "}
//                 <Text as="span" color="brand.500">
//                   Life-Saving
//                 </Text>{" "}
//                 Treatments
//               </Text>
              
//               <Text 
//                 fontSize={{ base: "lg", md: "xl" }} 
//                 color="gray.600" 
//                 maxW="lg"
//               >
//                 Support PKD patients in Nigeria by contributing to their kidney transplant 
//                 campaigns. Every donation brings someone closer to receiving the treatment 
//                 they desperately need.
//               </Text>
//             </VStack>

//             <VStack align="start" gap={4} w="full">
//               <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//                 Find campaigns to support:
//               </Text>
              
//               <InputGroup size="lg" maxW="md">
//                 <>
//                   <Icon as={HiMagnifyingGlass} color="gray.400" />
//                 </>
//                 <Input 
//                   placeholder="Search by name or location..."
//                   bg="white"
                  
//                 />
//               </InputGroup>
//             </VStack>

//             <HStack gap={4} flexWrap="wrap">
//               <Button 
//                 variant="solid" 
//                 size="lg" 
                
//               >
//                 Browse Campaigns
//               </Button>
//               <Button 
//                 variant="outline" 
//                 size="lg" 
                
//               >
//                 Start a Campaign
//               </Button>
//             </HStack>
//           </VStack>

//           {/* Right Content - Quick Stats */}
//           <VStack gap={6} align="stretch">
//             <Box p={6} bg="white"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//               <VStack gap={4}>
//                 <Text fontSize="xl" fontWeight="bold" color="gray.900" textAlign="center">
//                   Community Impact
//                 </Text>
//                 <SimpleGrid columns={2} gap={6} w="full">
//                   <VStack>
//                     <Text fontSize="2xl" fontWeight="bold" color="brand.500">
//                       ₦25M+
//                     </Text>
//                     <Text fontSize="sm" color="gray.600" textAlign="center">
//                       Total Raised
//                     </Text>
//                   </VStack>
//                   <VStack>
//                     <Text fontSize="2xl" fontWeight="bold" color="brand.500">
//                       150+
//                     </Text>
//                     <Text fontSize="sm" color="gray.600" textAlign="center">
//                       Patients Helped
//                     </Text>
//                   </VStack>
//                   <VStack>
//                     <Text fontSize="2xl" fontWeight="bold" color="accent.500">
//                       85%
//                     </Text>
//                     <Text fontSize="sm" color="gray.600" textAlign="center">
//                       Success Rate
//                     </Text>
//                   </VStack>
//                   <VStack>
//                     <Text fontSize="2xl" fontWeight="bold" color="accent.500">
//                       2,500+
//                     </Text>
//                     <Text fontSize="sm" color="gray.600" textAlign="center">
//                       Donors
//                     </Text>
//                   </VStack>
//                 </SimpleGrid>
//               </VStack>
//             </Box>

//             <SimpleGrid columns={1} gap={4}>
//               <Box p={4} bg="brand.50"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//                 <HStack gap={3}>
//                   <Icon as={HiUsers} color="brand.500" w={6} h={6} />
//                   <VStack align="start" gap={0}>
//                     <Text fontWeight="semibold" color="gray.900" fontSize="sm">
//                       Active Campaigns
//                     </Text>
//                     <Text color="gray.600" fontSize="sm">
//                       25 patients currently seeking support
//                     </Text>
//                   </VStack>
//                 </HStack>
//               </Box>

//               <Box p={4} bg="green.50"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//                 <HStack gap={3}>
//                   <Icon as={HiCurrencyDollar} color="green.500" w={6} h={6} />
//                   <VStack align="start" gap={0}>
//                     <Text fontWeight="semibold" color="gray.900" fontSize="sm">
//                       Average Campaign Goal
//                     </Text>
//                     <Text color="gray.600" fontSize="sm">
//                       ₦3.5M for complete treatment
//                     </Text>
//                   </VStack>
//                 </HStack>
//               </Box>

//               <Box p={4} bg="accent.50"  rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
//                 <HStack gap={3}>
//                   <Icon as={HiHeart} color="accent.500" w={6} h={6} />
//                   <VStack align="start" gap={0}>
//                     <Text fontWeight="semibold" color="gray.900" fontSize="sm">
//                       This Month's Impact
//                     </Text>
//                     <Text color="gray.600" fontSize="sm">
//                       ₦2.8M raised across 12 campaigns
//                     </Text>
//                   </VStack>
//                 </HStack>
//               </Box>
//             </SimpleGrid>
//           </VStack>
//         </SimpleGrid>
//       </Container>
//     </Box>
//   )
// }