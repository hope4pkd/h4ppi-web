import { Box, Container, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/assets/logo-wordmark.png";
import { donateLink, legalNavLinks, primaryNavLinks, secondaryNavLinks } from "@/lib/navigation";

const groups = [
  { title: "Explore", links: [...primaryNavLinks.filter((link) => link.href !== "/"), donateLink] },
  { title: "Get Involved", links: [...secondaryNavLinks] },
  { title: "Trust & Legal", links: [...legalNavLinks] },
];

export function Footer() {
  return (
    <Box as="footer" bg="navy.900" color="white" borderTop="6px solid" borderColor="brightTeal.500">
      <Container maxW="7xl" py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: 10, lg: 8 }}>
          <VStack align="start" gap={5}>
            <Box bg="white" borderRadius="lg" px={3} py={2}>
              <Image src={logo} alt="Hope4PKD Patients Initiative" width={190} />
            </Box>
            <Text color="navy.100" fontSize="sm" lineHeight="1.7" maxW="sm">
              Building a coordinated support pathway for people and families navigating polycystic kidney disease in Nigeria.
            </Text>
          </VStack>

          {groups.map((group) => (
            <VStack key={group.title} align="start" gap={1}>
              <Text fontWeight="800" color="pink.400" mb={2}>{group.title}</Text>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Text as="span" display="inline-flex" alignItems="center" minH="44px" color="navy.100" fontSize="sm" lineHeight="1.6" _hover={{ color: "white" }}>{link.label}</Text>
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
