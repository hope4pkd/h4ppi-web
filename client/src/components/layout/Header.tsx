"use client";

import { Box, Button, chakra, CloseButton, Container, Drawer, HStack, IconButton, Portal, Text, VStack } from "@chakra-ui/react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@public/assets/logo-wordmark.png";
import { organisation } from "@/content/organisation";
import { contactLink, donateLink, homeLink, isActiveHref, primaryLinks, supportLink } from "@/lib/navigation";

const LogoImage = chakra(Image);

function NavigationLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = isActiveHref(pathname, href);

  return (
    <Link href={href} onClick={onClick} aria-current={active ? "page" : undefined}>
      <Text
        as="span"
        display="inline-flex"
        alignItems="center"
        minH="44px"
        px={{ base: 3, lg: 2.5 }}
        color={active ? "action.700" : "navy.800"}
        fontSize={{ base: "md", lg: "sm" }}
        fontWeight={active ? "700" : "600"}
        whiteSpace="nowrap"
        // The rule is always present and merely changes colour, so activating an item never
        // shifts the row by 2px.
        borderBottomWidth="2px"
        borderColor={active ? "action.600" : "transparent"}
        transitionProperty="color, border-color"
        transitionDuration="fast"
        transitionTimingFunction="standard"
        _hover={{ color: "action.700", borderColor: active ? "action.600" : "teal.200" }}
      >
        {label}
      </Text>
    </Link>
  );
}

/**
 * Five flat links and two persistent buttons. Each link lands on a hub page that lists its own
 * sub-pages, so the header carries no dropdowns: the reader picks a question, the hub answers it.
 * Sub-pages are one click further in and are all repeated in the footer.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Lifts the bar off the page once it starts overlapping content. The row keeps a fixed height and
  // only the logo condenses, so nothing below the header reflows.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeDrawer = () => setOpen(false);

  return (
    <Box
      as="header"
      bg="canvas.50/95"
      borderBottomWidth="1px"
      borderColor={scrolled ? "transparent" : "navy.100"}
      boxShadow={scrolled ? "header" : "none"}
      position="sticky"
      top={0}
      zIndex={50}
      backdropFilter="blur(12px)"
      transitionProperty="box-shadow, border-color"
      transitionDuration="base"
      transitionTimingFunction="standard"
    >
      <Container maxW="7xl" py={2}>
        <HStack justify="space-between" gap={4} minH="60px">
          <Box flexShrink={0}>
            <Link href="/" aria-label={`${organisation.shortName} home`} style={{ display: "inline-flex", alignItems: "center", minHeight: "44px" }}>
              <LogoImage
                src={logo}
                alt={organisation.brandName}
                width={166}
                w={{ base: "132px", sm: scrolled ? "144px" : "166px" }}
                h="auto"
                priority
                transitionProperty="width"
                transitionDuration="base"
                transitionTimingFunction="standard"
              />
            </Link>
          </Box>

          <HStack as="nav" aria-label="Primary navigation" gap={1} display={{ base: "none", lg: "flex" }}>
            {primaryLinks.map((link) => (
              <NavigationLink key={link.href} {...link} />
            ))}
          </HStack>

          <HStack gap={2}>
            {/* The two actions that matter most stay visible on every page. Below sm the Donate pill
                alone fits beside the logo and the menu button; Get support is the drawer's first item. */}
            <Button asChild variant="outline" size="sm" minH="44px" display={{ base: "none", sm: "inline-flex" }}>
              <Link href={supportLink.href}>{supportLink.label}</Link>
            </Button>
            <Button asChild size="sm" minH="44px">
              <Link href={donateLink.href}>{donateLink.label}</Link>
            </Button>

            <Drawer.Root open={open} onOpenChange={(details) => setOpen(details.open)} placement="end" size="xs">
              <Drawer.Trigger asChild>
                <IconButton
                  aria-label="Open navigation menu"
                  variant="ghost"
                  size="sm"
                  display={{ base: "inline-flex", lg: "none" }}
                  px={0}
                  minW="44px"
                  minH="44px"
                >
                  <MenuIcon aria-hidden="true" />
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
                        <NavigationLink {...homeLink} onClick={closeDrawer} />
                        {primaryLinks.map((link) => (
                          <NavigationLink key={link.href} {...link} onClick={closeDrawer} />
                        ))}
                        <NavigationLink {...contactLink} onClick={closeDrawer} />
                      </VStack>
                    </Drawer.Body>
                    <Drawer.Footer borderTopWidth="1px" borderColor="navy.100" gap={3}>
                      <Button asChild variant="outline" flex="1">
                        <Link href={supportLink.href} onClick={closeDrawer}>{supportLink.label}</Link>
                      </Button>
                      <Button asChild flex="1">
                        <Link href={donateLink.href} onClick={closeDrawer}>{donateLink.label}</Link>
                      </Button>
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton aria-label="Close navigation menu" size="sm" px={0} minW="44px" minH="44px">
                        <CloseIcon aria-hidden="true" />
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
