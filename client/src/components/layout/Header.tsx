"use client";

import {
  Box,
  Container,
  HStack,
  VStack,
  Text,
  IconButton,
  useDisclosure,
  Spacer,
  Image,
} from "@chakra-ui/react";
import {
  HiBars3,
  HiHeart,
  HiUsers,
  HiCurrencyDollar,
  HiInformationCircle,
  HiQuestionMarkCircle,
  HiEnvelope,
  HiXMark,
} from "react-icons/hi2";
import Link from "next/link";
import logo from "@public/assets/logo.png";

const NavLink = ({
  href,
  children,
  isActive = false,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) => (
  <Link href={href}>
    <Text
      fontSize="sm"
      fontWeight={isActive ? "semibold" : "medium"}
      color={isActive ? "brand.500" : "gray.900"}
      _hover={{ color: "brand.500" }}
      cursor="pointer"
    >
      {children}
    </Text>
  </Link>
);

const MobileNavLink = ({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) => (
  <Link href={href}>
    <HStack w="full" p={3} _hover={{ bg: "brand.50" }} rounded="md">
      {icon}
      <Text fontWeight="medium">{children}</Text>
    </HStack>
  </Link>
);

export function Header() {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="7xl" py={4}>
        <HStack>
          {/* Logo */}
          <Link href="/">
            {/* <HStack>
              <Box
                w={10}
                h={10}
                bg="brand.500"
                rounded="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <HiHeart color="white" size="24" />
              </Box>
              <VStack align="start" gap={0}>
                <Text fontSize="lg" fontWeight="bold" color="brand.500">
                  Hope4PKD
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Patients Initiative
                </Text>
              </VStack>
            </HStack> */}
            <Image
              src={logo.src}
              alt="Hope4PKD Patients Initiative Logo"
              width={120}
              objectFit="contain"
            />
          </Link>

          <Spacer />

          {/* Desktop Navigation */}
          <HStack gap={6} display={{ base: "none", md: "flex" }}>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/patients">For Patients</NavLink>
            <NavLink href="/donors">Support a Patient</NavLink>
            <NavLink href="/campaigns">Campaigns</NavLink>
            <NavLink href="/help">Help</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </HStack>
          <Spacer />
          {!open && (
            <IconButton
              aria-label="Open menu"
              variant="ghost"
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
            >
              <HiBars3 size="20" />
            </IconButton>
          )}
          {open && (
            <IconButton
              aria-label="Close menu"
              variant="ghost"
              display={{ base: "flex", md: "none" }}
              onClick={onClose}
            >
              <HiXMark size="20" />
            </IconButton>
          )}
        </HStack>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <Box
          display={{ base: "block", md: "none" }}
          bg="white"
          borderTop="1px solid"
          borderColor="gray.200"
          py={4}
        >
          <Container maxW="7xl">
            <VStack align="stretch" gap={1}>
              <MobileNavLink
                href="/about"
                icon={<HiInformationCircle size="20" />}
              >
                About Us
              </MobileNavLink>
              <MobileNavLink href="/patients" icon={<HiUsers size="20" />}>
                For Patients
              </MobileNavLink>
              <MobileNavLink href="/donors" icon={<HiHeart size="20" />}>
                Support a Patient
              </MobileNavLink>
              <MobileNavLink
                href="/campaigns"
                icon={<HiCurrencyDollar size="20" />}
              >
                Campaigns
              </MobileNavLink>
              <MobileNavLink
                href="/help"
                icon={<HiQuestionMarkCircle size="20" />}
              >
                Help
              </MobileNavLink>
              <MobileNavLink
                href="/contact"
                icon={<HiEnvelope size="20" />}
              >
                Contact
              </MobileNavLink>
            </VStack>
          </Container>
        </Box>
      )}
    </Box>
  );
}
