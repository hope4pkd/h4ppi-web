import { Box, Container, Skeleton, VStack } from "@chakra-ui/react";

export default function Loading() {
  return <Box minH="70vh" bg="canvas.50" py={20} aria-label="Loading page"><Container maxW="7xl"><VStack align="stretch" gap={5}><Skeleton h="16px" maxW="180px" /><Skeleton h={{ base: "64px", md: "92px" }} maxW="780px" /><Skeleton h="24px" maxW="620px" /><Skeleton h="260px" mt={10} /></VStack></Container></Box>;
}
