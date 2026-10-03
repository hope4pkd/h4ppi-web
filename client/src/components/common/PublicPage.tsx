import { Box, Container, Grid, GridItem, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CircleAlert, Clock } from "lucide-react";
import { ButtonLink, type Surface } from "@/components/common/ButtonLink";

/**
 * The shared page kit. Every public route composes from here — compose these, do not fork per-page
 * variants. Typography and surfaces come from the textStyle / layerStyle tokens in lib/theme.ts;
 * nothing in this file re-types a font size or a border trio.
 */

type Tone = "canvas" | "white" | "teal" | "pink" | "navy" | "brightTeal";

const sectionBackgrounds: Record<Tone, string> = {
  canvas: "canvas.50",
  white: "white",
  teal: "teal.50",
  pink: "pink.50",
  navy: "navy.900",
  brightTeal: "brightTeal.500",
};

const isDarkTone = (tone: Tone) => tone === "navy";

const eyebrowColor: Record<Surface, string> = {
  light: "action.700",
  dark: "brightTeal.500",
  brand: "navy.900",
};

export function Eyebrow({ children, surface = "light" }: { children: ReactNode; surface?: Surface }) {
  return (
    <Text as="p" textStyle="eyebrow" color={eyebrowColor[surface]}>
      {children}
    </Text>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  surface = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  surface?: Surface;
}) {
  const centered = align === "center";
  const onDark = surface === "dark";
  return (
    <VStack
      align={centered ? "center" : "start"}
      textAlign={align}
      gap={4}
      maxW={centered ? "measureWide" : "measure"}
      mx={centered ? "auto" : undefined}
    >
      {eyebrow && <Eyebrow surface={surface}>{eyebrow}</Eyebrow>}
      <Heading as="h2" textStyle="sectionTitle" color={onDark ? "white" : "navy.900"}>
        {title}
      </Heading>
      {description && (
        <Text textStyle="lede" color={onDark ? "navy.100" : "navy.500"} maxW="measure">
          {description}
        </Text>
      )}
    </VStack>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  tone = "light",
  aside,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  /** `light` is the default page header. `navy` is for the few pages where a dark opening means something. */
  tone?: "light" | "navy";
  /** Sits beside the text at lg and below it on smaller screens. */
  aside?: ReactNode;
  children?: ReactNode;
}) {
  const onDark = tone === "navy";
  const text = (
    <VStack align="start" gap={5} maxW="measureWide">
      {eyebrow && <Eyebrow surface={onDark ? "dark" : "light"}>{eyebrow}</Eyebrow>}
      <Heading as="h1" textStyle="pageTitle" color={onDark ? "white" : "navy.900"}>
        {title}
      </Heading>
      <Text textStyle="lede" color={onDark ? "navy.100" : "navy.500"} maxW="measure">
        {description}
      </Text>
      {children && <Box pt={2}>{children}</Box>}
    </VStack>
  );
  return (
    <Box
      bg={onDark ? "navy.900" : "canvas.50"}
      color={onDark ? "white" : "navy.900"}
      borderBottomWidth={onDark ? undefined : "1px"}
      borderColor="navy.100"
    >
      <Container maxW="7xl" pt={{ base: 14, md: 24 }} pb={{ base: 12, md: 20 }}>
        {aside ? (
          <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 7fr) minmax(0, 5fr)" }} gap={{ base: 10, lg: 16 }} alignItems="end">
            {text}
            <Box>{aside}</Box>
          </Grid>
        ) : (
          text
        )}
      </Container>
    </Box>
  );
}

const sectionPadding = {
  tight: { base: 5, md: 6 },
  compact: { base: 10, md: 14 },
  default: { base: 16, md: 24 },
  spacious: { base: 20, md: 32 },
} as const;

const sectionWidth = {
  narrow: "3xl",
  default: "7xl",
  wide: "8xl",
} as const;

/**
 * The section wrapper. `size` and `width` exist so a page can vary its vertical rhythm — a run of
 * identically-padded full-width sections is what makes a page read as templated.
 * `width="full"` skips the Container for genuinely full-bleed content.
 */
export function ContentSection({
  children,
  tone = "canvas",
  id,
  size = "default",
  width = "default",
  divider = false,
  gap = "block",
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  size?: "tight" | "compact" | "default" | "spacious";
  width?: "narrow" | "default" | "wide" | "full";
  divider?: boolean;
  gap?: "block" | "none";
}) {
  // The section owns the gap between its direct children, so no page passes `mt` to get the house
  // rhythm. Group two children more tightly by wrapping them in their own stack — an explicit
  // grouping rather than an unexplained margin.
  const stack = (
    <VStack align="stretch" gap={gap === "none" ? 0 : "blockGap"}>
      {children}
    </VStack>
  );
  return (
    <Box
      as="section"
      id={id}
      bg={sectionBackgrounds[tone]}
      py={sectionPadding[size]}
      position="relative"
      borderBottomWidth={divider ? "1px" : undefined}
      borderColor={divider ? "navy.100" : undefined}
    >
      {width === "full" ? stack : <Container maxW={sectionWidth[width]}>{stack}</Container>}
    </Box>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <Box layerStyle="panel">
      <VStack align="start" gap={4} maxW="measure">
        <Heading as="h3" textStyle="cardTitle" color="navy.900">
          {title}
        </Heading>
        <Text textStyle="body" color="navy.500">
          {description}
        </Text>
        {actionLabel && actionHref && (
          <ButtonLink href={actionHref} variant="outline" size="sm">
            {actionLabel}
          </ButtonLink>
        )}
      </VStack>
    </Box>
  );
}

export function ActionLink({
  href,
  children,
  variant = "solid",
  surface = "light",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  surface?: Surface;
}) {
  return (
    <ButtonLink href={href} variant={variant} surface={surface}>
      {children}
      {variant === "solid" && <ArrowRight aria-hidden="true" size={18} />}
    </ButtonLink>
  );
}

/** A quieter inline link for tertiary actions, so CTA rows do not become three peers with no hierarchy. */
export function TextLink({ href, children, surface = "light" }: { href: string; children: ReactNode; surface?: Surface }) {
  const onDark = surface === "dark";
  return (
    <Link href={href}>
      <HStack
        as="span"
        display="inline-flex"
        gap={2}
        minH="44px"
        fontWeight="700"
        color={surface === "dark" ? "brightTeal.500" : surface === "brand" ? "navy.900" : "action.700"}
        textDecoration="underline"
        textDecorationColor={onDark ? "whiteAlpha.400" : "action.200"}
        textUnderlineOffset="5px"
        transitionProperty="text-decoration-color, color"
        transitionDuration="fast"
        transitionTimingFunction="standard"
        _hover={{ textDecorationColor: "currentColor" }}
        css={{ "& svg": { transitionProperty: "transform", transitionDuration: "fast", transitionTimingFunction: "standard" }, "&:hover svg": { transform: "translateX(3px)" }, "@media (prefers-reduced-motion: reduce)": { "&:hover svg": { transform: "none" } } }}
      >
        <Text as="span">{children}</Text>
        <ArrowRight aria-hidden="true" size={16} />
      </HStack>
    </Link>
  );
}

export function ComingSoonTag() {
  return (
    <HStack
      as="span"
      display="inline-flex"
      gap={1.5}
      bg="action.50"
      color="action.700"
      borderRadius="md"
      px={2}
      py={0.5}
      fontSize="0.8125rem"
      fontWeight="700"
      whiteSpace="nowrap"
    >
      <Clock aria-hidden="true" size={13} />
      <Text as="span">Coming soon</Text>
    </HStack>
  );
}

export function ComingSoonPanel({ title, description }: { title: string; description: string }) {
  return (
    <Box layerStyle="panel">
      <VStack align="start" gap={4} maxW="measure">
        <ComingSoonTag />
        <Heading as="h3" textStyle="cardTitle" color="navy.900">
          {title}
        </Heading>
        <Text textStyle="body" color="navy.500">
          {description}
        </Text>
      </VStack>
    </Box>
  );
}

// The non-navigating counterpart to ActionLink. A styled span rather than a disabled Button: the button
// recipe defines no _disabled state, and a dead button advertises an affordance that never fires.
export function ComingSoonAction({ children }: { children: ReactNode }) {
  return (
    <HStack
      as="span"
      display="inline-flex"
      gap={3}
      minH={12}
      px={6}
      borderWidth="1px"
      borderColor="navy.200"
      borderRadius="lg"
      bg="white"
      color="navy.500"
      fontWeight="700"
    >
      <Text as="span">{children}</Text>
      <ComingSoonTag />
    </HStack>
  );
}

export function InfoPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <ContentSection>{children}</ContentSection>
    </>
  );
}

export function FeatureGrid({ children, columns = 3 }: { children: ReactNode; columns?: 2 | 3 | 4 }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: columns }} gap={6}>
      {children}
    </SimpleGrid>
  );
}

export function FeatureItem({
  number,
  title,
  href,
  children,
}: {
  number?: string;
  title: string;
  /** Makes the title a link to the page that expands on it. */
  href?: string;
  children: ReactNode;
}) {
  return (
    <VStack align="start" gap={3} borderTopWidth="2px" borderColor="teal.500" pt={5}>
      {number && (
        <Text textStyle="counter" color="action.700">
          {number}
        </Text>
      )}
      <Heading as="h3" textStyle="featureTitle" color="navy.900">
        {href ? (
          <Link href={href}>
            <HStack
              as="span"
              display="inline-flex"
              gap={2}
              _hover={{ color: "action.700" }}
              transitionProperty="color"
              transitionDuration="fast"
              transitionTimingFunction="standard"
            >
              <Text as="span">{title}</Text>
              <ArrowRight aria-hidden="true" size={18} />
            </HStack>
          </Link>
        ) : (
          title
        )}
      </Heading>
      <Text textStyle="body" color="navy.500">
        {children}
      </Text>
    </VStack>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Section-level components. Each of these replaces markup that was previously hand-rolled inside a
 * page, which is how the same idea ended up with three different implementations.
 * ---------------------------------------------------------------------------------------------- */

/**
 * Numbered rows separated by hairlines — a reading order, not a grid. Body copy is capped at a measure
 * so long entries do not run the full container width.
 */
export function Ledger({ children }: { children: ReactNode }) {
  return (
    <VStack as="ol" align="stretch" gap={0} listStyleType="none">
      {children}
    </VStack>
  );
}

export function LedgerRow({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <Grid
      as="li"
      templateColumns={{ base: "40px 1fr", md: "64px minmax(0, 0.85fr) minmax(0, 1.15fr)" }}
      gap={{ base: 3, md: 8 }}
      layerStyle="hairline"
      py={{ base: 6, md: 8 }}
      alignItems="start"
    >
      <Text textStyle="numeral" color="action.600" fontSize={{ base: "1.75rem", md: "2rem" }}>
        {number.replace(/^0(?=\d)/, "")}
      </Text>
      <Heading as="h3" textStyle="featureTitle" color="navy.900">
        {title}
      </Heading>
      <Text textStyle="body" color="navy.500" gridColumn={{ base: "2", md: "auto" }} maxW="measure">
        {children}
      </Text>
    </Grid>
  );
}

/**
 * The unnumbered sibling of Ledger: a run of destinations, each a whole-row link. An audience hub is
 * mostly "here are six places to go next", and rendering that as a third consecutive FeatureGrid is
 * what makes a page read as templated. Rows carry the reading order a grid of equal cards destroys.
 */
export function DirectoryList({ children }: { children: ReactNode }) {
  return (
    <VStack as="ul" align="stretch" gap={0} listStyleType="none">
      {children}
    </VStack>
  );
}

export function DirectoryRow({ href, title, children }: { href: string; title: string; children: ReactNode }) {
  return (
    <Box as="li" layerStyle="hairline">
      <Link href={href}>
        <Grid
          templateColumns={{ base: "minmax(0, 1fr) auto", md: "minmax(0, 0.85fr) minmax(0, 1.15fr) auto" }}
          gap={{ base: 2, md: 8 }}
          alignItems={{ base: "center", md: "start" }}
          py={{ base: 5, md: 6 }}
          px={{ base: 0, md: 2 }}
          borderRadius="lg"
          transitionProperty="background-color, padding-left"
          transitionDuration="fast"
          transitionTimingFunction="standard"
          css={{
            "& svg": { transitionProperty: "transform", transitionDuration: "fast", transitionTimingFunction: "standard" },
            "&:hover svg": { transform: "translateX(3px)" },
            "@media (prefers-reduced-motion: reduce)": { "&:hover svg": { transform: "none" } },
          }}
          _hover={{ bg: "teal.50" }}
        >
          <Heading as="h3" textStyle="featureTitle" color="navy.900">
            {title}
          </Heading>
          <Text
            textStyle="bodySm"
            color="navy.500"
            maxW="measure"
            gridColumn={{ base: "1 / -1", md: "auto" }}
            pt={{ base: 1, md: "2px" }}
          >
            {children}
          </Text>
          <Box color="action.700" gridRow={{ base: "1", md: "auto" }} gridColumn={{ base: "2", md: "auto" }} pt={{ md: "3px" }}>
            <ArrowRight aria-hidden="true" size={18} />
          </Box>
        </Grid>
      </Link>
    </Box>
  );
}

export type Faq = { question: string; answer: string };

/**
 * Native <details> rather than Chakra's Accordion: these are static server-rendered pages, the
 * questions must be findable by in-page search with the browser's own find, and an accordion here
 * would drag a client boundary onto every hub for no behaviour a <details> does not already have.
 */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <VStack align="stretch" gap={3}>
      {items.map(({ question, answer }) => (
        <Box
          as="details"
          key={question}
          bg="white"
          borderWidth="1px"
          borderColor="navy.100"
          borderRadius="xl"
          p={{ base: 5, md: 6 }}
        >
          <Box as="summary" cursor="pointer">
            <Heading as="h3" display="inline" textStyle="featureTitle" color="navy.900">
              {question}
            </Heading>
          </Box>
          <Text textStyle="body" color="navy.500" pt={4} maxW="measure">
            {answer}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}

export type Step = { title: string; description: string };

/**
 * An ordered pathway.
 *
 * Capped at three columns regardless of step count. One column per step does not fit: five steps inside
 * the 7xl container leaves ~230px each, which is ~32 characters per line of `bodySm` even at 1440px —
 * below a readable measure at every width. Three columns gives 42–55 characters.
 *
 * There is deliberately no connecting rule: it is only truthful when every step sits in a single row,
 * and a wrapping grid makes it point at the wrong things.
 */
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <Box>
      <SimpleGrid as="ol" columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 6, md: 8 }} listStyleType="none">
        {steps.map((step, index) => (
          <VStack as="li" key={step.title} align="start" gap={3} borderTopWidth="1px" borderColor="teal.300" pt={5}>
            <Text as="span" textStyle="numeral" color="action.600" aria-hidden="true">
              {index + 1}
            </Text>
            <Heading as="h3" textStyle="featureTitle" color="navy.900">
              {step.title}
            </Heading>
            <Text textStyle="bodySm" color="navy.500">
              {step.description}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

/**
 * A card with an optional destination, and an optional `status` line for the
 * common case of "this is real, it just is not live yet" — stated in place rather than faked.
 */
export function FeatureCard({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  status,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  status?: string;
}) {
  return (
    <VStack layerStyle={href ? "cardInteractive" : "card"} align="start" gap={4} h="full">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading as="h3" textStyle="featureTitle" color="navy.900">
        {title}
      </Heading>
      <Text textStyle="body" color="navy.500" flex="1">
        {description}
      </Text>
      {status && (
        <HStack align="start" gap={2.5} layerStyle="hairline" pt={4} w="full" color="action.700">
          <Box flexShrink={0} pt="2px">
            <CircleAlert aria-hidden="true" size={16} />
          </Box>
          <Text textStyle="bodySm" fontWeight="700">
            {status}
          </Text>
        </HStack>
      )}
      {href && linkLabel && <TextLink href={href}>{linkLabel}</TextLink>}
    </VStack>
  );
}

/** An image paired with text. `reverse` flips the order at lg for zig-zag runs. */
export function SplitFeature({
  eyebrow,
  title,
  description,
  image,
  reverse = false,
  surface = "light",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image: { src: StaticImageData | string; alt: string };
  reverse?: boolean;
  surface?: Surface;
  children?: ReactNode;
}) {
  const onDark = surface === "dark";
  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }}
      gap={{ base: 8, lg: 16 }}
      alignItems="center"
    >
      <GridItem order={{ base: 1, lg: reverse ? 2 : 1 }}>
        <VStack align="start" gap={5} maxW="measure">
          {eyebrow && <Eyebrow surface={surface}>{eyebrow}</Eyebrow>}
          <Heading as="h2" textStyle="sectionTitle" color={onDark ? "white" : "navy.900"}>
            {title}
          </Heading>
          {description && (
            <Text textStyle="lede" color={onDark ? "navy.100" : "navy.500"}>
              {description}
            </Text>
          )}
          {children}
        </VStack>
      </GridItem>
      <GridItem order={{ base: 2, lg: reverse ? 1 : 2 }}>
        <MediaFrame src={image.src} alt={image.alt} />
      </GridItem>
    </Grid>
  );
}

/**
 * Image container with the house treatment: rounded, elevated, and a restrained scale on hover that
 * is switched off entirely under prefers-reduced-motion rather than merely made instant.
 */
export function MediaFrame({
  src,
  alt,
  ratio = 4 / 3,
  objectPosition = "center",
}: {
  src: StaticImageData | string;
  alt: string;
  ratio?: number;
  /** Where the crop sits when the source and the frame disagree — a tall phone portrait in a 4/5
   * frame is otherwise centred on the chest and loses the head. */
  objectPosition?: string;
}) {
  return (
    <Box
      position="relative"
      w="full"
      aspectRatio={ratio}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lift"
      css={{
        "& img": {
          transitionProperty: "transform",
          transitionDuration: "slow",
          transitionTimingFunction: "standard",
        },
        "&:hover img": { transform: "scale(1.03)" },
        "@media (prefers-reduced-motion: reduce)": { "&:hover img": { transform: "none" } },
      }}
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition }} />
    </Box>
  );
}

export function Portrait({
  src,
  alt,
  name,
  role,
}: {
  src: StaticImageData | string;
  alt: string;
  name: string;
  role: string;
}) {
  return (
    <VStack align="start" gap={4}>
      <MediaFrame src={src} alt={alt} ratio={4 / 5} />
      <VStack align="start" gap={1}>
        <Text textStyle="featureTitle" color="inherit">
          {name}
        </Text>
        <Text textStyle="bodySm" color="navy.400">
          {role}
        </Text>
      </VStack>
    </VStack>
  );
}

export function PullQuote({ children, attribution }: { children: ReactNode; attribution?: string }) {
  return (
    <VStack
      as="figure"
      align="start"
      gap={4}
      borderLeftWidth="2px"
      borderColor="pink.400"
      pl={{ base: 5, md: 7 }}
      m={0}
    >
      <Text as="blockquote" textStyle="quote" color="pink.400" maxW="measureTight">
        {children}
      </Text>
      {attribution && (
        <Text as="figcaption" textStyle="bodySm" color="navy.200">
          {attribution}
        </Text>
      )}
    </VStack>
  );
}

/**
 * A full-bleed centred statement. Used sparingly to break a long run of grid sections — the page needs
 * somewhere to inhale.
 */
export function StatementBand({
  eyebrow,
  statement,
  tone = "navy",
  children,
}: {
  eyebrow?: string;
  statement: string;
  tone?: Extract<Tone, "navy" | "teal" | "brightTeal">;
  children?: ReactNode;
}) {
  const surface: Surface = tone === "navy" ? "dark" : tone === "brightTeal" ? "brand" : "light";
  const onDark = isDarkTone(tone);
  return (
    <ContentSection tone={tone} width="narrow" gap="none">
      <VStack gap={6} textAlign="center">
        {eyebrow && <Eyebrow surface={surface}>{eyebrow}</Eyebrow>}
        <Heading as="h2" textStyle="sectionTitle" color={onDark ? "white" : "navy.900"} maxW="measureWide">
          {statement}
        </Heading>
        {children}
      </VStack>
    </ContentSection>
  );
}
