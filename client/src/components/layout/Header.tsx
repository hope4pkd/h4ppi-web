"use client";

import { Box, Button, chakra, CloseButton, Container, Drawer, HStack, IconButton, Portal, Text, VStack } from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@public/assets/logo-wordmark.png";
import { donateLink, primaryNavLinks, secondaryNavLinks } from "@/lib/navigation";

const LogoImage = chakra(Image);

function NavigationLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link href={href} onClick={onClick} aria-current={active ? "page" : undefined}>
      <Text
        as="span"
        display="inline-flex"
        alignItems="center"
        minH="44px"
        px={{ base: 3, xl: 2 }}
        color={active ? "action.700" : "navy.800"}
        fontSize={{ base: "md", xl: "sm" }}
        fontWeight={active ? "700" : "600"}
        borderBottomWidth={active ? "2px" : "0"}
        borderColor="action.600"
        _hover={{ color: "action.700" }}
      >
        {label}
      </Text>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const closeDrawer = () => setOpen(false);

  return (
    <Box as="header" bg="rgba(252, 250, 247, 0.96)" borderBottomWidth="1px" borderColor="navy.100" position="sticky" top={0} zIndex={50} backdropFilter="blur(12px)">
      <Container maxW="7xl" py={2.5}>
        <HStack justify="space-between" gap={4}>
          <Box flexShrink={0}>
            <Link href="/" aria-label="Hope4PKD home">
              <LogoImage src={logo} alt="Hope4PKD Patients Initiative" width={166} w={{ base: "136px", sm: "166px" }} h="auto" priority />
            </Link>
          </Box>

          <HStack as="nav" aria-label="Primary navigation" gap={1} display={{ base: "none", xl: "flex" }}>
            {primaryNavLinks.map((link) => <NavigationLink key={link.href} {...link} />)}
          </HStack>

          <HStack gap={2}>
            <Button asChild size="sm">
              <Link href={donateLink.href}>{donateLink.label}</Link>
            </Button>

            <Drawer.Root open={open} onOpenChange={(details) => setOpen(details.open)} placement="end" size="xs">
              <Drawer.Trigger asChild>
                <IconButton
                  aria-label="Open navigation menu"
                  variant="ghost"
                  display={{ base: "inline-flex", xl: "none" }}
                  minW="44px"
                  minH="44px"
                >
                  <Menu aria-hidden="true" />
                </IconButton>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content bg="canvas.50">
                    <Drawer.Header borderBottomWidth="1px" borderColor="navy.100">
                      <Drawer.Title color="navy.900">Menu</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <VStack as="nav" aria-label="Mobile navigation" align="stretch" gap={1}>
                        {primaryNavLinks.map((link) => (
                          <NavigationLink key={link.href} {...link} onClick={closeDrawer} />
                        ))}
                        <Box borderTopWidth="1px" borderColor="navy.100" mt={3} pt={3}>
                          <Text fontSize="xs" fontWeight="800" color="navy.500" textTransform="uppercase" letterSpacing="0.12em" px={3} mb={1}>
                            More
                          </Text>
                          <VStack align="stretch" gap={1}>
                            {secondaryNavLinks.map((link) => (
                              <NavigationLink key={link.href} {...link} onClick={closeDrawer} />
                            ))}
                          </VStack>
                        </Box>
                      </VStack>
                    </Drawer.Body>
                    <Drawer.Footer borderTopWidth="1px" borderColor="navy.100">
                      <Button asChild width="full">
                        <Link href={donateLink.href} onClick={closeDrawer}>{donateLink.label}</Link>
                      </Button>
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton aria-label="Close navigation menu" minW="44px" minH="44px">
                        <X aria-hidden="true" />
                      </CloseButton>
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
