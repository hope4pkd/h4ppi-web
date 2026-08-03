import { Box, Container, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/assets/logo-wordmark.png";
import { ComingSoonTag } from "@/components/common/PublicPage";
import { footerGroups, isNavLink } from "@/lib/navigation";

export function Footer() {
  return (
    <Box as="footer" bg="navy.900" color="white" borderTop="6px solid" borderColor="brightTeal.500">
      <Container maxW="7xl" py={{ base: 12, md: 16 }}>
        <VStack align="start" gap={5} mb={{ base: 10, lg: 12 }}>
          <Box bg="white" borderRadius="lg" px={3} py={2}>
            <Image src={logo} alt="Hope4PKD Patients Initiative" width={190} />
          </Box>
          <Text color="navy.100" fontSize="sm" lineHeight="1.7" maxW="lg">
            Building a coordinated support pathway for people and families navigating polycystic kidney disease in Nigeria.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap={{ base: 10, lg: 8 }}>
          {footerGroups.map((group) => (
            <VStack key={group.label} align="start" gap={1}>
              <Text fontWeight="800" color="pink.400" mb={2}>{group.label}</Text>
              {group.items.map((item) => !isNavLink(item) ? (
                <VStack key={item.label} as="span" align="start" gap={1} minH="44px" justify="center" py={1}>
                  <Text as="span" color="navy.200" fontSize="sm" lineHeight="1.6">{item.label}</Text>
                  <ComingSoonTag />
                </VStack>
              ) : (
                <Link key={item.href} href={item.href}>
                  <Text as="span" display="inline-flex" alignItems="center" minH="44px" color="navy.100" fontSize="sm" lineHeight="1.6" _hover={{ color: "white" }}>{item.label}</Text>
                </Link>
              ))}
            </VStack>
          ))}
        </SimpleGrid>

        <Box borderTopWidth="1px" borderColor="navy.700" mt={12} pt={6}>
          <HStack justify="space-between" align={{ base: "start", md: "center" }} flexDirection={{ base: "column", md: "row" }} gap={3}>
            <Text fontSize="sm" color="navy.200">© {new Date().getFullYear()} Hope4PKD Patients Initiative.</Text>
            <HStack gap={5} flexWrap="wrap">
              <Link href="/cookies"><Text as="span" display="inline-flex" alignItems="center" minH="44px" fontSize="sm" color="navy.200" _hover={{ color: "white" }}>Cookies</Text></Link>
            </HStack>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}
