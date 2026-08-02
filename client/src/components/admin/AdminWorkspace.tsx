import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export function AdminWorkspace({ title, description }: { title: string; description: string }) {
  return <VStack align="stretch" gap={6}><Box><Text color="action.700" fontWeight="800" fontSize="sm">INTERNAL WORKSPACE</Text><Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} mt={2}>{title}</Heading><Text color="navy.500" fontSize="lg" mt={3}>{description}</Text></Box><Box bg="white" borderWidth="1px" borderColor="navy.100" borderRadius="2xl" p={8}><Heading as="h2" fontFamily="body" fontSize="xl">Operational gate</Heading><Text color="navy.500" mt={3}>This workspace is schema-ready. Live controls appear only for roles permitted by server checks and Postgres RLS after the relevant feature and approval records are enabled.</Text></Box></VStack>;
}
