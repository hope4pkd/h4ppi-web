import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Link,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "@public/assets/logo.png";

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <VStack align="start" gap={3}>
    <Text fontWeight="semibold" color="gray.900">
      {title}
    </Text>
    <VStack align="start" gap={2}>
      {children}
    </VStack>
  </VStack>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    color="gray.600"
    fontSize="sm"
    _hover={{ color: "brand.500" }}
  >
    {children}
  </Link>
);

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Box as="footer" bg="gray.50">
      <Container maxW="7xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
          {/* Brand */}
          <VStack align="start" gap={4}>
            <Image
              src={logo.src}
              alt="Hope4PKD Patients Initiative Logo"
              width={180}
              objectFit="contain"
            />
            <Text fontSize="sm" color="gray.600" maxW="sm">
              Restoring hope, one kidney at a time. Connecting PKD patients with
              verified donors and crowdfunded financial aid through Adenike
              Renal Centre.
            </Text>
            <HStack>
              <IconButton
                aria-label="Twitter"
                variant="ghost"
                size="sm"
                color="gray.600"
                _hover={{ color: "brand.500" }}
              >
                <FaTwitter />
              </IconButton>
              <IconButton
                aria-label="Facebook"
                variant="ghost"
                size="sm"
                color="gray.600"
                _hover={{ color: "brand.500" }}
              >
                <FaFacebook />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                variant="ghost"
                size="sm"
                color="gray.600"
                _hover={{ color: "brand.500" }}
              >
                <FaInstagram />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                variant="ghost"
                size="sm"
                color="gray.600"
                _hover={{ color: "brand.500" }}
              >
                <FaLinkedin />
              </IconButton>
            </HStack>
          </VStack>

          {/* For Patients */}
          <FooterSection title="For Patients">
            <FooterLink href="/patients/register">
              Register as Patient
            </FooterLink>
            <FooterLink href="/patients/find-donor">Find a Donor</FooterLink>
            <FooterLink href="/patients/support">Get Support</FooterLink>
            <FooterLink href="/campaigns/create">Start Campaign</FooterLink>
          </FooterSection>

          {/* For Donors */}
          <FooterSection title="For Donors">
            <FooterLink href="/donors/register">Become a Donor</FooterLink>
            <FooterLink href="/donors/process">Donation Process</FooterLink>
            <FooterLink href="/donors/requirements">Requirements</FooterLink>
            <FooterLink href="/donors/faq">Donor FAQ</FooterLink>
          </FooterSection>

          {/* Support */}
          <FooterSection title="Support & Info">
            <FooterLink href="/about">About Hope4PKD</FooterLink>
            {/* <FooterLink href="/about/adenike">Adenike Renal Centre</FooterLink> */}
            <FooterLink href="/help">Help Center</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </FooterSection>
        </SimpleGrid>

        <Box h="1px" bg="gray.200" my={8} />

        <HStack
          justify="space-between"
          flexDirection={{ base: "column", md: "row" }}
          gap={4}
        >
          <Text fontSize="sm" color="gray.600">
            © {currentYear} Hope4PKD Patients Initiative. All rights reserved.
          </Text>
          <HStack gap={6}>
            {/* <Text fontSize="sm" color="gray.600">
              🏥 Partner: Adenike Renal Centre
            </Text> */}
            <Text fontSize="sm" color="gray.600">
              🇳🇬 Made in Nigeria
            </Text>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
