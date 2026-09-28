"use client";

import { Accordion, Box, Button, chakra, CloseButton, Container, Drawer, Heading, HStack, IconButton, Menu, Portal, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, ChevronDown, Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@public/assets/logo-wordmark.png";
import { ComingSoonTag } from "@/components/common/PublicPage";
import { organisation } from "@/content/organisation";
import {
  audienceLinks,
  contactLink,
  donateLink,
  homeLink,
  isActiveGroup,
  isActiveHref,
  isNavLink,
  navGroups,
  type NavColumn,
  type NavFeatured,
  type NavGroup,
  type NavItem,
} from "@/lib/navigation";

const LogoImage = chakra(Image);

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

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

/* ------------------------------------------------------------------------------------------------
 * The audience bar. Who the reader is, answered before what they want to read.
 *
 * It sits outside the sticky <header> on purpose: a bar that stayed pinned would cost 44px of every
 * screen for the whole session, and collapsing it on scroll would leave focusable links inside a
 * zero-height box. Scrolling away is the honest behaviour and needs no transition.
 * ---------------------------------------------------------------------------------------------- */

function AudienceLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = isActiveHref(pathname, href);

  return (
    <Link href={href} aria-current={active ? "page" : undefined}>
      <Text
        as="span"
        display="inline-flex"
        alignItems="center"
        minH="44px"
        px={2.5}
        fontSize="sm"
        fontWeight={active ? "700" : "600"}
        color={active ? "white" : "navy.100"}
        textDecoration={active ? "underline" : "none"}
        textDecorationColor="brightTeal.500"
        textDecorationThickness="2px"
        textUnderlineOffset="6px"
        transitionProperty="color"
        transitionDuration="fast"
        transitionTimingFunction="standard"
        _hover={{ color: "white" }}
      >
        {label}
      </Text>
    </Link>
  );
}

function AudienceBar() {
  return (
    <Box as="nav" aria-label="Audience navigation" bg="navy.900" display={{ base: "none", lg: "block" }}>
      <Container maxW="7xl">
        <HStack justify="space-between" gap={4}>
          <HStack gap={0} align="center">
            {/* "For" and not "I am a": the labels are plural nouns, so "I am a Patients" does not read. */}
            <Text as="span" textStyle="eyebrow" color="brightTeal.500" pr={3} whiteSpace="nowrap">
              For
            </Text>
            {audienceLinks.map((link) => (
              <AudienceLink key={link.href} {...link} />
            ))}
          </HStack>
          <AudienceLink {...contactLink} />
        </HStack>
      </Container>
    </Box>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Mega panels. A group with `columns` renders sub-headed columns plus an optional featured card; a
 * group without them renders the plain list it always did.
 * ---------------------------------------------------------------------------------------------- */

function MenuDestination({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = isActiveHref(pathname, href);

  return (
    <Menu.Item value={href} px={0} borderRadius="md" _highlighted={{ bg: "teal.50" }} asChild>
      <Link href={href} aria-current={active ? "page" : undefined}>
        <Text
          as="span"
          display="flex"
          alignItems="center"
          width="full"
          minH="44px"
          px={3}
          color={active ? "action.700" : "navy.800"}
          fontSize="sm"
          fontWeight={active ? "700" : "600"}
        >
          {label}
        </Text>
      </Link>
    </Menu.Item>
  );
}

function MenuComingSoon({ label }: { label: string }) {
  return (
    <Menu.Item value={label} disabled px={0} borderRadius="md">
      <Text as="span" display="flex" alignItems="center" gap={2} width="full" minH="44px" px={3} color="navy.400" fontSize="sm" fontWeight="600">
        {label}
        <ComingSoonTag />
      </Text>
    </Menu.Item>
  );
}

const menuItem = (item: NavItem) =>
  isNavLink(item) ? <MenuDestination key={item.href} {...item} /> : <MenuComingSoon key={item.label} label={item.label} />;

function MenuColumn({ groupLabel, column }: { groupLabel: string; column: NavColumn }) {
  const id = `nav-${slug(groupLabel)}-${slug(column.label)}`;
  return (
    <Menu.ItemGroup id={id}>
      <Menu.ItemGroupLabel asChild>
        <Text textStyle="eyebrow" fontSize="xs" color="action.700" px={3} pt={1} pb={2}>
          {column.label}
        </Text>
      </Menu.ItemGroupLabel>
      {column.items.map(menuItem)}
    </Menu.ItemGroup>
  );
}

function FeaturedItem({ featured }: { featured: NavFeatured }) {
  return (
    <Menu.Item value={featured.href} px={0} py={0} borderRadius="2xl" _highlighted={{ bg: "transparent" }} asChild>
      <Link href={featured.href}>
        <VStack layerStyle="cardInteractive" align="start" gap={2} h="full" bg="teal.50" borderColor="teal.200">
          <Text textStyle="eyebrow" fontSize="xs" color="action.700">
            {featured.eyebrow}
          </Text>
          <Heading as="span" textStyle="featureTitle" color="navy.900">
            {featured.title}
          </Heading>
          <Text textStyle="bodySm" color="navy.500">
            {featured.description}
          </Text>
          <HStack as="span" gap={2} color="action.700" fontWeight="700" fontSize="sm" pt={1}>
            <Text as="span">{featured.cta}</Text>
            <ArrowRight aria-hidden="true" size={16} />
          </HStack>
        </VStack>
      </Link>
    </Menu.Item>
  );
}

function NavigationMenu({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const active = isActiveGroup(pathname, group);
  const cells = (group.columns?.length ?? 1) + (group.featured ? 1 : 0);

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
          whiteSpace="nowrap"
          _hover={{ color: "action.700", borderBottomColor: active ? "action.600" : "teal.200" }}
        >
          {group.label}
          <ChevronDown size={16} aria-hidden="true" />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            bg="canvas.50"
            borderWidth="1px"
            borderColor="navy.100"
            borderRadius="xl"
            boxShadow="float"
            p={group.columns ? 4 : 2}
            display="grid"
            gridTemplateColumns={`repeat(${cells}, minmax(13rem, 1fr))`}
            gap={group.columns ? 5 : 0}
            alignItems="start"
            minW="14rem"
            maxW="min(58rem, calc(100vw - 2rem))"
            _focusVisible={{ outline: "none" }}
          >
            {group.columns
              ? group.columns.map((column) => <MenuColumn key={column.label} groupLabel={group.label} column={column} />)
              : group.items.map(menuItem)}
            {group.featured && <FeaturedItem featured={group.featured} />}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

/** The drawer's answer to the audience bar, which is hidden below lg. */
function DrawerAudienceBlock({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <VStack align="stretch" gap={2} bg="navy.900" borderRadius="xl" p={4}>
      <Text as="span" textStyle="eyebrow" fontSize="xs" color="brightTeal.500">
        Find your starting point
      </Text>
      <SimpleGrid columns={2} gap={2}>
        {audienceLinks.map((link) => {
          const active = isActiveHref(pathname, link.href);
          return (
            <Link key={link.href} href={link.href} onClick={onNavigate} aria-current={active ? "page" : undefined}>
              <Text
                as="span"
                display="flex"
                alignItems="center"
                minH="44px"
                px={3}
                borderRadius="lg"
                bg={active ? "whiteAlpha.200" : "whiteAlpha.100"}
                color="white"
                fontSize="sm"
                fontWeight={active ? "700" : "600"}
                lineHeight="1.25"
              >
                {link.label}
              </Text>
            </Link>
          );
        })}
      </SimpleGrid>
    </VStack>
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
    <>
      <AudienceBar />

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

            {/* Home and Contact live in the drawer and the audience bar respectively: five dropdown
                triggers plus the Donate pill leave no room for two more text links at lg. */}
            <HStack as="nav" aria-label="Primary navigation" gap={1} display={{ base: "none", lg: "flex" }}>
              {navGroups.map((group) => <NavigationMenu key={group.label} group={group} />)}
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
                          <Box pb={3}>
                            <DrawerAudienceBlock onNavigate={closeDrawer} />
                          </Box>

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
                                      {/* Column sub-headings are dropped here: the drawer is one narrow
                                          column, so they would add a second heading level to a list of
                                          two or three links. */}
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
                            <NavigationLink {...contactLink} onClick={closeDrawer} />
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
    </>
  );
}
