import { Box, Button, Container, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CircleAlert, Clock } from "lucide-react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Text as="p" color="action.700" fontSize="sm" fontWeight="800" letterSpacing="0.12em" textTransform="uppercase">
      {children}
    </Text>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <VStack align={align === "center" ? "center" : "start"} textAlign={align} gap={3} maxW={align === "center" ? "3xl" : "2xl"} mx={align === "center" ? "auto" : undefined}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading as="h2" color="navy.900" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.02" letterSpacing="-0.035em">{title}</Heading>
      {description && <Text color="navy.500" fontSize={{ base: "md", md: "lg" }} lineHeight="1.75">{description}</Text>}
    </VStack>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <Box bg="navy.900" color="white" position="relative" overflow="hidden">
      <Box position="absolute" right="-120px" top="-180px" w="420px" h="420px" borderRadius="full" bg="pink.400" opacity="0.16" aria-hidden="true" />
      <Box position="absolute" left="-100px" bottom="-180px" w="360px" h="360px" borderRadius="full" bg="brightTeal.500" opacity="0.12" aria-hidden="true" />
      <Container maxW="7xl" py={{ base: 16, md: 24 }} position="relative">
        <VStack align="start" gap={5} maxW="3xl">
          <Text color="brightTeal.500" fontSize="sm" fontWeight="800" letterSpacing="0.12em" textTransform="uppercase">{eyebrow}</Text>
          <Heading as="h1" color="white" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="0.98" letterSpacing="-0.04em">{title}</Heading>
          <Text color="navy.100" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.7">{description}</Text>
          {children}
        </VStack>
      </Container>
    </Box>
  );
}

export function ContentSection({ children, tone = "canvas", id }: { children: ReactNode; tone?: "canvas" | "white" | "teal" | "pink" | "navy"; id?: string }) {
  const backgrounds = { canvas: "canvas.50", white: "white", teal: "teal.50", pink: "pink.50", navy: "navy.900" };
  return <Box as="section" id={id} bg={backgrounds[tone]} py={{ base: 16, md: 24 }}><Container maxW="7xl">{children}</Container></Box>;
}

export function EmptyState({ title, description, actionLabel, actionHref }: { title: string; description: string; actionLabel?: string; actionHref?: string }) {
  return (
    <Box borderWidth="1px" borderColor="navy.100" borderRadius="2xl" bg="white" p={{ base: 6, md: 10 }}>
      <VStack align="start" gap={4} maxW="2xl">
        <Box color="action.700"><CircleAlert aria-hidden="true" /></Box>
        <Heading as="h3" fontSize="2xl" color="navy.900">{title}</Heading>
        <Text color="navy.500" lineHeight="1.7">{description}</Text>
        {actionLabel && actionHref && <Button asChild variant="outline"><Link href={actionHref}>{actionLabel}</Link></Button>}
      </VStack>
    </Box>
  );
}

export function ActionLink({ href, children, variant = "solid" }: { href: string; children: ReactNode; variant?: "solid" | "outline" | "ghost" }) {
  return <Button asChild variant={variant} size="lg"><Link href={href}>{children}<ArrowRight aria-hidden="true" size={18} /></Link></Button>;
}

export function ComingSoonTag() {
  return (
    <HStack as="span" display="inline-flex" gap={1.5} bg="action.50" color="action.700" borderRadius="full" px={2.5} py={1} fontSize="xs" fontWeight="800" letterSpacing="0.08em" textTransform="uppercase" whiteSpace="nowrap">
      <Clock aria-hidden="true" size={13} />
      <Text as="span">Coming soon</Text>
    </HStack>
  );
}

export function ComingSoonPanel({ title, description }: { title: string; description: string }) {
  return (
    <Box borderWidth="1px" borderColor="navy.100" borderRadius="2xl" bg="white" p={{ base: 6, md: 10 }}>
      <VStack align="start" gap={4} maxW="2xl">
        <ComingSoonTag />
        <Heading as="h3" fontSize="2xl" color="navy.900">{title}</Heading>
        <Text color="navy.500" lineHeight="1.7">{description}</Text>
      </VStack>
    </Box>
  );
}

// The non-navigating counterpart to ActionLink. A styled span rather than a disabled Button: the button
// recipe defines no _disabled state, and a dead button advertises an affordance that never fires.
export function ComingSoonAction({ children }: { children: ReactNode }) {
  return (
    <HStack as="span" display="inline-flex" gap={3} minH={12} px={6} borderWidth="1px" borderColor="navy.200" borderRadius="full" bg="white" color="navy.500" fontWeight="700">
      <Text as="span">{children}</Text>
      <ComingSoonTag />
    </HStack>
  );
}

export function InfoPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <><PageHero eyebrow={eyebrow} title={title} description={description} /><ContentSection><VStack align="stretch" gap={12}>{children}</VStack></ContentSection></>;
}

export function FeatureGrid({ children, columns = 3 }: { children: ReactNode; columns?: 2 | 3 | 4 }) {
  return <SimpleGrid columns={{ base: 1, md: 2, lg: columns }} gap={6}>{children}</SimpleGrid>;
}

export function FeatureItem({ number, title, children }: { number?: string; title: string; children: ReactNode }) {
  return (
    <VStack align="start" gap={3} borderTopWidth="2px" borderColor="teal.500" pt={5}>
      {number && <Text color="action.700" fontWeight="800" fontSize="sm">{number}</Text>}
      <Heading as="h3" fontFamily="body" fontSize="xl" color="navy.900">{title}</Heading>
      <Text color="navy.500" lineHeight="1.7">{children}</Text>
    </VStack>
  );
}
