"use client";

import {
  Box,
  Container,
  HStack,
  VStack,
  Text,
  Button,
  IconButton,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import {
  HiBars3,
  HiHeart,
  HiUsers,
  HiCurrencyDollar,
  HiInformationCircle,
  HiXMark,
} from "react-icons/hi2";
import Link from "next/link";

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
            <HStack>
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
            </HStack>
          </Link>

          <Spacer />

          {/* Desktop Navigation */}
          <HStack gap={8} display={{ base: "none", md: "flex" }}>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/patients">Programs</NavLink>
            <NavLink href="/donors">Become a Donor</NavLink>
            <NavLink href="/campaigns">Support Campaigns</NavLink>
          </HStack>
          <Spacer />
          <HStack gap={3}>
            {/* Desktop Auth Buttons */}
            <HStack gap={2} display={{ base: "none", md: "flex" }}>
              <Button variant="outline" size="sm" rounded="full">
                Sign In
              </Button>
              <Button variant="solid" size="sm" rounded="full">
                Get Started
              </Button>
            </HStack>

            {/* Mobile Menu Button */}
            {/* Mobile Menu Button (Open) */}
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
            {/* Mobile Menu Button (Close) */}
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
              <MobileNavLink href="/about" icon={<HiInformationCircle size="20" />}>
                About Us
              </MobileNavLink>
              <MobileNavLink href="/patients" icon={<HiUsers size="20" />}>
                Programs
              </MobileNavLink>
              <MobileNavLink href="/donors" icon={<HiHeart size="20" />}>
                Become a Donor
              </MobileNavLink>
              <MobileNavLink
                href="/campaigns"
                icon={<HiCurrencyDollar size="20" />}
              >
                Support Campaigns
              </MobileNavLink>
              <Box pt={6}>
                <VStack gap={3}>
                  <Button w="full" variant="outline" rounded="full">
                    Sign In
                  </Button>
                  <Button w="full" variant="solid" rounded="full">
                    Get Started
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Box>
      )}
    </Box>
  );
}
