import { Box, Container, Grid, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/assets/logo-wordmark.png";
import { ActionLink, ComingSoonTag } from "@/components/common/PublicPage";
import { organisation } from "@/content/organisation";
import { donateLink, footerGroups, isNavLink, supportLink } from "@/lib/navigation";

export function Footer() {
  return (
    <Box as="footer" bg="navy.900" color="white" borderTopWidth="6px" borderColor="brightTeal.500">
      <Container maxW="7xl" py={{ base: 12, md: 16 }}>
        {/* Lead block: the brand and the two things we want people to do, before the link inventory. */}
        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) auto" }}
          gap={{ base: 8, lg: 12 }}
          alignItems={{ lg: "end" }}
          pb={{ base: 10, md: 12 }}
        >
          <VStack align="start" gap={5}>
            <Box bg="white" borderRadius="lg" px={3} py={2}>
              <Image src={logo} alt={organisation.brandName} width={190} />
            </Box>
            <Text textStyle="lede" color="navy.100" maxW="measureTight">
              PKD information and coordinated support planning for people and families in Nigeria.
            </Text>
          </VStack>
          <HStack gap={3} flexWrap="wrap">
            <ActionLink href={supportLink.href}>{supportLink.label}</ActionLink>
            <ActionLink href={donateLink.href} variant="outline" surface="dark">
              {donateLink.label}
            </ActionLink>
          </HStack>
        </Grid>

        {/* Six groups in two rows of three. The header is flat, so this is where every sub-page lives;
            three columns keep "Early Detection & Family Testing" on one line at lg. No email or phone
            appears here because none has been verified for publication — Contact is the route. */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          gapX={{ base: 10, lg: 8 }}
          gapY={{ base: 10, lg: 12 }}
          layerStyle="hairlineOnDark"
          pt={{ base: 10, md: 12 }}
        >
          {footerGroups.map((group) => (
            <VStack key={group.label} align="start" gap={1}>
              <Text textStyle="eyebrow" color="pink.400" mb={3}>
                {group.label}
              </Text>
              {group.items.map((item) =>
                !isNavLink(item) ? (
                  <VStack key={item.label} as="span" align="start" gap={1} minH="44px" justify="center" py={1}>
                    <Text as="span" textStyle="bodySm" color="navy.200">
                      {item.label}
                    </Text>
                    <ComingSoonTag />
                  </VStack>
                ) : (
                  <Link key={item.href} href={item.href}>
                    <Text
                      as="span"
                      display="inline-flex"
                      alignItems="center"
                      minH="44px"
                      textStyle="bodySm"
                      color="navy.100"
                      transitionProperty="color"
                      transitionDuration="fast"
                      transitionTimingFunction="standard"
                      _hover={{ color: "white" }}
                    >
                      {item.label}
                    </Text>
                  </Link>
                ),
              )}
            </VStack>
          ))}
        </SimpleGrid>

        <Box borderTopWidth="1px" borderColor="navy.700" mt={{ base: 10, md: 12 }} pt={6}>
          <HStack
            justify="space-between"
            align={{ base: "start", md: "center" }}
            flexDirection={{ base: "column", md: "row" }}
            gap={3}
          >
            {/* Copyright belongs to the legal entity; the brand follows so the two names are visibly one body. */}
            <Text textStyle="bodySm" color="navy.200" textWrap="balance">
              © {new Date().getFullYear()} {organisation.legalName}, operating as {organisation.brandName}.
            </Text>
            <HStack gap={5} flexWrap="wrap">
              <Link href="/cookies">
                <Text
                  as="span"
                  display="inline-flex"
                  alignItems="center"
                  minH="44px"
                  textStyle="bodySm"
                  color="navy.200"
                  _hover={{ color: "white" }}
                >
                  Cookies
                </Text>
              </Link>
            </HStack>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}
