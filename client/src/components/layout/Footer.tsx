import { Box, Container, Grid, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import logo from "@public/assets/logo-full-white.png";
import { ActionLink, RegistrationDetails } from "@/components/common/PublicPage";
import { contact, organisation, registration, social } from "@/content/organisation";
import { contactLink, footerGroups, isNavLink, supportLink } from "@/lib/navigation";

const socialIcons = { Instagram, LinkedIn: Linkedin } as const;

/** One entry in the contact row: an icon and a value, linked when there is something to open. */
function ContactItem({ icon, href, children }: { icon: ReactNode; href?: string; children: ReactNode }) {
  const body = (
    <HStack
      as="span"
      display="inline-flex"
      align="center"
      gap={3}
      minH="44px"
      textStyle="bodySm"
      fontWeight="700"
      color="white"
      css={{ "& svg": { flexShrink: 0 } }}
    >
      <Box as="span" display="inline-flex" color="navy.200">
        {icon}
      </Box>
      <Text as="span" overflowWrap="anywhere">
        {children}
      </Text>
    </HStack>
  );
  if (!href) return body;
  return (
    <Text asChild textDecoration="underline" textDecorationColor="transparent" textUnderlineOffset="4px" transitionProperty="text-decoration-color" transitionDuration="fast" transitionTimingFunction="standard" _hover={{ textDecorationColor: "currentColor" }}>
      <a href={href}>{body}</a>
    </Text>
  );
}

export function Footer() {
  return (
    <Box as="footer" bg="navy.900" color="white">
      <Container maxW="7xl" py={{ base: 12, md: 16 }}>
        {/* Lead block: the brand and the two things people can do, before the link inventory. */}
        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) auto" }}
          gap={{ base: 8, lg: 12 }}
          alignItems={{ lg: "end" }}
          pb={{ base: 10, md: 12 }}
        >
          <VStack align="start" gap={5}>
            <Image src={logo} alt={organisation.brandName} width={200} />
            <Text textStyle="lede" color="navy.100" maxW="measureTight">
              Support for people living with PKD in Nigeria, and the families who care for them.
            </Text>
          </VStack>
          <HStack gap={3} flexWrap="wrap">
            <ActionLink href={supportLink.href}>{supportLink.label}</ActionLink>
            <ActionLink href={contactLink.href} variant="outline" surface="dark">
              {contactLink.label}
            </ActionLink>
          </HStack>
        </Grid>

        {/* Six groups in two rows of three. The header is flat, so this is where every sub-page lives;
            three columns keep "Early Detection & Family Testing" on one line at lg. */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          gapX={{ base: 10, lg: 8 }}
          gapY={{ base: 10, lg: 12 }}
          layerStyle="hairlineOnDark"
          pt={{ base: 10, md: 12 }}
        >
          {footerGroups.map((group) => (
            <VStack key={group.label} align="start" gap={1}>
              <Text textStyle="bodySm" fontWeight="700" color="white" mb={2}>
                {group.label}
              </Text>
              {/* A coming-soon entry has no href and is not rendered: what cannot be reached is left out. */}
              {group.items.filter(isNavLink).map((item) => (
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
              ))}
            </VStack>
          ))}
        </SimpleGrid>

        {/* Contact row: the three ways to reach the organisation, readable at a glance, each on one line. */}
        <HStack
          as="address"
          fontStyle="normal"
          layerStyle="hairlineOnDark"
          mt={{ base: 10, md: 12 }}
          pt={{ base: 6, md: 8 }}
          align={{ base: "start", lg: "center" }}
          flexDirection={{ base: "column", lg: "row" }}
          flexWrap="wrap"
          columnGap={{ lg: 12 }}
          rowGap={1}
        >
          {contact.phones.map((phone) => (
            <ContactItem key={phone.href} icon={<Phone size={18} strokeWidth={1.75} aria-hidden />} href={phone.href}>
              {phone.display}
            </ContactItem>
          ))}
          <ContactItem icon={<Mail size={18} strokeWidth={1.75} aria-hidden />} href={`mailto:${registration.email}`}>
            {registration.email}
          </ContactItem>
          <ContactItem icon={<MapPin size={18} strokeWidth={1.75} aria-hidden />}>{registration.address}</ContactItem>
        </HStack>

        {/* Legal bar: who publishes the site and where it is registered, on every page. The address and
            email are in the contact row above, so the registration sentence stops at the number. */}
        <HStack
          layerStyle="hairlineOnDark"
          mt={{ base: 6, md: 8 }}
          pt={6}
          justify="space-between"
          align={{ base: "start", md: "end" }}
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: 3, md: 10 }}
        >
          <VStack align="start" gap={2}>
            <RegistrationDetails surface="dark" withContact={false} />
            {/* Copyright belongs to the legal entity; the sentence above ties it to the brand. */}
            <Text textStyle="bodySm" color="navy.200" textWrap="balance">
              © {new Date().getFullYear()} {organisation.legalName}.
            </Text>
          </VStack>
          <HStack gap={{ base: 2, md: 3 }} flexShrink={0} ml={{ base: -3, md: 0 }}>
            {social.map((account) => {
              const Icon = socialIcons[account.name];
              return (
                <Box
                  key={account.href}
                  asChild
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  boxSize="44px"
                  borderRadius="full"
                  color="white"
                  transitionProperty="background-color"
                  transitionDuration="fast"
                  transitionTimingFunction="standard"
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  <a href={account.href} target="_blank" rel="noopener noreferrer" aria-label={`${organisation.shortName} on ${account.name}`}>
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                  </a>
                </Box>
              );
            })}
            <Link href="/cookies">
              <Text
                as="span"
                display="inline-flex"
                alignItems="center"
                minH="44px"
                ml={{ base: 1, md: 3 }}
                textStyle="bodySm"
                color="navy.200"
                _hover={{ color: "white" }}
              >
                Cookies
              </Text>
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
