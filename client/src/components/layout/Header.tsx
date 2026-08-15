"use client";

import { Accordion, Box, Button, chakra, CloseButton, Container, Drawer, HStack, IconButton, Menu, Portal, Text, VStack } from "@chakra-ui/react";
import { ChevronDown, Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@public/assets/logo-wordmark.png";
import { ComingSoonTag } from "@/components/common/PublicPage";
import { donateLink, homeLink, isActiveGroup, isActiveHref, isNavLink, navGroups, standaloneNavLinks, type NavGroup, type NavItem } from "@/lib/navigation";

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
        px={{ base: 3, lg: 2 }}
        color={active ? "action.700" : "navy.800"}
        fontSize={{ base: "md", lg: "sm" }}
        fontWeight={active ? "700" : "600"}
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

// Stacked rather than inline: the drawer column is too narrow to hold the label and the
// nowrap tag side by side, which wrapped labels mid-phrase ("Request / Support").
function ComingSoonNavRow({ label }: { label: string }) {
  return (
    <VStack as="span" align="start" justify="center" gap={1} minH="44px" px={{ base: 3, lg: 2 }} py={1}>
      <Text as="span" color="navy.400" fontSize={{ base: "md", lg: "sm" }} fontWeight="600">{label}</Text>
      <ComingSoonTag />
    </VStack>
  );
}

function NavigationItem({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  return isNavLink(item) ? <NavigationLink {...item} onClick={onClick} /> : <ComingSoonNavRow label={item.label} />;
}

function NavigationMenu({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const active = isActiveGroup(pathname, group);

  return (
    <Menu.Root positioning={{ placement: "bottom-start", gutter: 6 }}>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          minH="44px"
          px={2}
          gap={1}
          color={active ? "action.700" : "navy.800"}
          fontSize="sm"
          fontWeight={active ? "700" : "600"}
          borderWidth="0"
          borderBottomWidth="2px"
          borderBottomColor={active ? "action.600" : "transparent"}
          borderBottomStyle="solid"
          borderRadius="0"
          _hover={{ color: "action.700", borderBottomColor: active ? "action.600" : "teal.200" }}
        >
          {group.label}
          <ChevronDown size={16} aria-hidden="true" />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content bg="canvas.50" borderWidth="1px" borderColor="navy.100" borderRadius="xl" boxShadow="lg" minW="14rem" py={2} _focusVisible={{ outline: "none" }}>
            {group.items.map((item) => !isNavLink(item) ? (
              <Menu.Item key={item.label} value={item.label} disabled px={0} borderRadius="md">
                <Text as="span" display="flex" alignItems="center" gap={2} width="full" minH="44px" px={3} color="navy.400" fontSize="sm" fontWeight="600">
                  {item.label}
                  <ComingSoonTag />
                </Text>
              </Menu.Item>
            ) : (
              <Menu.Item
                key={item.href}
                value={item.href}
                px={0}
                borderRadius="md"
                _highlighted={{ bg: "teal.50" }}
                asChild
              >
                <Link href={item.href} aria-current={isActiveHref(pathname, item.href) ? "page" : undefined}>
                  <Text
                    as="span"
                    display="flex"
                    alignItems="center"
                    width="full"
                    minH="44px"
                    px={3}
                    color={isActiveHref(pathname, item.href) ? "action.700" : "navy.800"}
                    fontSize="sm"
                    fontWeight={isActiveHref(pathname, item.href) ? "700" : "600"}
                  >
                    {item.label}
                  </Text>
                </Link>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

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
  const openGroups = navGroups.filter((group) => isActiveGroup(pathname, group)).map((group) => group.label);

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
            <Link href="/" aria-label="Hope4PKD home" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px" }}>
              <LogoImage
                src={logo}
                alt="Hope4PKD Patients Initiative"
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
            <NavigationLink {...homeLink} />
            {navGroups.map((group) => <NavigationMenu key={group.label} group={group} />)}
            {standaloneNavLinks.map((link) => <NavigationLink key={link.href} {...link} />)}
          </HStack>

          <HStack gap={2}>
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
                        <VStack align="stretch" gap={1} pb={2}>
                          <NavigationLink {...homeLink} onClick={closeDrawer} />
                        </VStack>

                        <Accordion.Root collapsible multiple defaultValue={openGroups}>
                          {navGroups.map((group) => (
                            <Accordion.Item key={group.label} value={group.label} borderBottomWidth="1px" borderColor="navy.100">
                              <Accordion.ItemTrigger minH="44px" px={3} py={2} cursor="pointer">
                                <Text
                                  as="span"
                                  flex="1"
                                  textAlign="start"
                                  color={isActiveGroup(pathname, group) ? "action.700" : "navy.800"}
                                  fontSize="md"
                                  fontWeight="700"
                                >
                                  {group.label}
                                </Text>
                                <Accordion.ItemIndicator color="navy.500" />
                              </Accordion.ItemTrigger>
                              <Accordion.ItemContent>
                                <Accordion.ItemBody pb={2}>
                                  <VStack align="stretch" gap={0} pl={2}>
                                    {group.items.map((item) => (
                                      <NavigationItem key={item.label} item={item} onClick={closeDrawer} />
                                    ))}
                                  </VStack>
                                </Accordion.ItemBody>
                              </Accordion.ItemContent>
                            </Accordion.Item>
                          ))}
                        </Accordion.Root>

                        <VStack align="stretch" gap={1} pt={2}>
                          {standaloneNavLinks.map((link) => (
                            <NavigationLink key={link.href} {...link} onClick={closeDrawer} />
                          ))}
                        </VStack>
                      </VStack>
                    </Drawer.Body>
                    <Drawer.Footer borderTopWidth="1px" borderColor="navy.100">
                      <Button asChild width="full">
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
