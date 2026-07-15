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
  Image,
} from "@chakra-ui/react";
import {
  HiBars3,
  HiHeart,
  HiUsers,
  HiCurrencyDollar,
  HiInformationCircle,
  HiCalendarDays,
  HiXMark,
} from "react-icons/hi2";
import Link from "next/link";
import logo from "@public/assets/logo-new.png";

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
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link href={href} onClick={onClick}>
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
      <Container maxW="7xl" py={3}>
        <HStack>
          {/* Logo */}
          <Link href="/">
            <Image
              src={logo.src}
              alt="Hope4PKD Patients Initiative Logo"
              h="52px"
              w="auto"
              objectFit="contain"
            />
          </Link>

          <Spacer />

          {/* Desktop Navigation */}
          <HStack gap={7} display={{ base: "none", md: "flex" }}>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/patients">Patients</NavLink>
            <NavLink href="/campaigns">Campaigns</NavLink>
            <NavLink href="/#pkd-day">PKD Day</NavLink>
            <NavLink href="/donors">Sponsors</NavLink>
          </HStack>
          <Spacer />
          <Link href="/donors">
            <Button
              variant="solid"
              rounded="full"
              fontSize="sm"
              fontWeight="700"
              px={6}
              display={{ base: "none", md: "flex" }}
            >
              Donate
            </Button>
          </Link>
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
                onClick={onClose}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                href="/patients"
                icon={<HiUsers size="20" />}
                onClick={onClose}
              >
                Patients
              </MobileNavLink>
              <MobileNavLink
                href="/campaigns"
                icon={<HiCurrencyDollar size="20" />}
                onClick={onClose}
              >
                Campaigns
              </MobileNavLink>
              <MobileNavLink
                href="/#pkd-day"
                icon={<HiCalendarDays size="20" />}
                onClick={onClose}
              >
                PKD Day
              </MobileNavLink>
              <MobileNavLink
                href="/donors"
                icon={<HiHeart size="20" />}
                onClick={onClose}
              >
                Sponsors
              </MobileNavLink>
              <Link href="/donors" onClick={onClose}>
                <Button variant="solid" rounded="full" w="full" mt={2} py={5}>
                  Donate
                </Button>
              </Link>
            </VStack>
          </Container>
        </Box>
      )}
    </Box>
  );
}
