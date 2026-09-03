import {
  ActionLink,
  ContentSection,
  Eyebrow,
  FeatureCard,
  FeatureGrid,
  Ledger,
  LedgerRow,
  MediaFrame,
  PullQuote,
  SectionHeading,
  StatementBand,
  StepList,
  TextLink,
} from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Box, Container, Grid, GridItem, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowDown, BookOpen, CircleCheck, Compass, HandHeart, HeartHandshake, Landmark, Megaphone, SearchCheck, Stethoscope, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import founderImage from "@public/assets/images/hospital.jpg";
import heroImage from "@public/assets/images/patient-caregiver-hands.png";

const trustItems = ["Patient-centred", "Verification-led", "Privacy protected", "Clear public reporting"];

const problems = [
  ["Diagnosis can feel disorienting", "People need clear, medically responsible information and a practical next step after a suspected or confirmed diagnosis."],
  ["Care pathways are fragmented", "Appointments, tests, referrals and treatment decisions often sit across different providers without a patient navigator."],
  ["Costs are difficult to assess", "Families may face significant diagnostic and treatment costs before they know what support is appropriate or available."],
  ["Trust requires verification", "Patients, providers and supporters need a careful process that protects dignity while confirming each case and cost."],
  ["Long-term support matters", "PKD is lifelong. People need follow-up, community and reliable information throughout care."],
] as const;

const pillars = [
  { title: "Patient navigation", text: "A clear route through requests, onboarding, assessment and follow-up.", icon: Compass },
  { title: "Medical verification", text: "Qualified review before medical content or public cases are approved.", icon: Stethoscope },
  { title: "Financial access", text: "Validated costs, controlled allocations and accountable disbursement records.", icon: Landmark },
  { title: "Community", text: "Human support for patients and the people caring for them.", icon: Users },
  { title: "Awareness", text: "Responsible public education without sensationalising patient stories.", icon: Megaphone },
  { title: "Advocacy", text: "Use verified programme evidence to argue for fairer access to PKD support.", icon: HeartHandshake },
] as const;

const journey = [
  { title: "Request", description: "Share the minimum information needed to understand how we may help." },
  { title: "Review", description: "The team checks the request, confirms next steps and sends a secure invitation when appropriate." },
  { title: "Onboard", description: "Invited patients complete consent, case details and private documents in a protected flow." },
  { title: "Assess", description: "Authorised staff verify medical and cost information, then agree a support plan." },
  { title: "Support & follow-up", description: "Progress is communicated safely through the case pathway, with follow-up after support." },
];

const pathways = [
  ["Patient navigation", "Help moving from a first request to a clearly explained next step.", Compass],
  ["Verified support planning", "A structured review of the case and appropriate support options after onboarding.", SearchCheck],
  ["Knowledge and guidance", "Medically reviewed information as the Knowledge Centre completes its review process.", BookOpen],
  ["Community connection", "Connections to patient, caregiver and family support for people navigating PKD.", Users],
] as const;

// The three programme areas that exist but are not yet live. Grouped into one section rather than three
// consecutive empty panels, so the page states where things stand instead of trailing off.
const programmeStatus = [
  {
    eyebrow: "Verified campaigns",
    title: "Every public campaign must pass verification before publication.",
    description: "Campaigns publish only after verification, valid consent, cost review and programme and finance approval.",
    status: "No verified campaigns are public yet",
    linkLabel: "How campaign verification works",
    href: "/campaigns",
  },
  {
    eyebrow: "PKD Knowledge Centre",
    title: "Medical information should be reviewed, dated and traceable.",
    description: "Every clinical article will name its author and qualified reviewer, cite sources, include a disclaimer and show its next review date.",
    status: "The Knowledge Centre is in medical review",
    linkLabel: "Visit the Knowledge Centre",
    href: "/knowledge",
  },
  {
    eyebrow: "Partnerships",
    title: "Confirmed partnerships need a clear role and scope.",
    description: "Confirmed organisations will be listed only after the relationship, permission to display their identity and partnership scope are documented.",
    status: "Our partnership network is being formalised",
    linkLabel: "Explore partnership pathways",
    href: "/partner",
  },
];

const yearOneTargets = [
  "Launch a reviewed patient-intake and case-management process.",
  "Publish only verified campaigns with current consent and approved costs.",
  "Record allocations and provider disbursements separately.",
  "Publish a clearly sourced first programme report.",
];

export function HomePage() {
  const organisationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Hope4PKD Patients Initiative",
    url: "https://hope4pkd.org",
    logo: "https://hope4pkd.org/assets/logo-new.png",
    areaServed: "Nigeria",
    description: "PKD information and coordinated support planning for people and families in Nigeria.",
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero — one primary action, one secondary, one text link. Three peer buttons is no hierarchy. */}
      <Box as="section" bg="navy.900" color="white" overflow="hidden">
        <Container maxW="7xl" px={{ base: 0, lg: 4 }}>
          <Grid templateColumns={{ base: "1fr", lg: "1.08fr 0.92fr" }} minH={{ lg: "clamp(600px, 74vh, 760px)" }}>
            {/* Deliberately off the ContentSection scale: this is a full-bleed split grid whose height is
                driven by the photo column, not a section on the page rhythm. */}
            <VStack align="start" justify="center" gap={6} px={{ base: 5, md: 10, lg: 8 }} py={{ base: 16, lg: 20 }}>
              <Eyebrow surface="dark">PKD patient support in Nigeria</Eyebrow>
              <Heading as="h1" textStyle="display" color="white" maxW="measureTight">
                No one should navigate PKD alone.
              </Heading>
              <Text textStyle="lede" color="navy.100" maxW="measureTight">
                Hope4PKD is developing coordinated support for people and families living with polycystic kidney disease in Nigeria. We connect early questions with verified help.
              </Text>
              <HStack gap={3} flexWrap="wrap" pt={2}>
                <ActionLink href="/support">Get support</ActionLink>
                <ActionLink href="/campaigns" variant="outline" surface="dark">View campaigns</ActionLink>
              </HStack>
              <TextLink href="/pkd" surface="dark">Understand PKD</TextLink>

              {/* Was inert text that looked interactive; now it actually moves you down the page. */}
              <Link href="#the-challenge">
                <HStack
                  as="span"
                  color="navy.200"
                  fontSize="sm"
                  gap={2}
                  minH="44px"
                  transitionProperty="color"
                  transitionDuration="fast"
                  transitionTimingFunction="standard"
                  _hover={{ color: "white" }}
                  css={{
                    "& svg": { transitionProperty: "transform", transitionDuration: "base", transitionTimingFunction: "standard" },
                    "&:hover svg": { transform: "translateY(3px)" },
                    "@media (prefers-reduced-motion: reduce)": { "&:hover svg": { transform: "none" } },
                  }}
                >
                  <ArrowDown size={16} aria-hidden="true" />
                  <Text as="span">See how the pathway works</Text>
                </HStack>
              </Link>
            </VStack>

            <Box position="relative" minH={{ base: "420px", md: "560px", lg: "auto" }}>
              <Image
                src={heroImage}
                alt="A patient and caregiver holding hands"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <Box position="absolute" inset={0} bgGradient="to-r" gradientFrom="navy.900" gradientTo="transparent" opacity={{ base: 0.25, lg: 0.52 }} aria-hidden="true" />
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* A rule, not a billboard. The four claims still read; they no longer shout over the hero. */}
      <ContentSection size="tight" divider>
        <SimpleGrid columns={{ base: 2, md: 4 }} gapX={6} gapY={4}>
          {trustItems.map((item) => (
            <HStack key={item} gap={2.5} align="center" color="navy.500">
              <Box color="action.600" flexShrink={0}>
                <CircleCheck size={16} aria-hidden="true" />
              </Box>
              <Text textStyle="eyebrow">{item}</Text>
            </HStack>
          ))}
        </SimpleGrid>
      </ContentSection>

      <ContentSection id="the-challenge" size="spacious">
        <SectionHeading eyebrow="Living with PKD" title="PKD affects diagnosis, treatment and daily life." description="People need trustworthy information, coordinated care and sustained support while protecting their privacy and dignity." />
        <Box>
          <Ledger>
            {problems.map(([title, text], index) => (
              <LedgerRow key={title} number={`0${index + 1}`} title={title}>
                {text}
              </LedgerRow>
            ))}
          </Ledger>
        </Box>
      </ContentSection>

      {/* One layout at every width. The old radial diagram existed only above lg and had a separate
          stacked list below it — two implementations of the same six facts. */}
      <ContentSection tone="teal" id="ecosystem" size="spacious">
        <SectionHeading align="center" eyebrow="The Hope4PKD ecosystem" title="Six connected parts of patient support." description="Each part covers a different need while keeping the patient at the centre." />

        <VStack align="stretch" gap={6}>
        <Grid
          layerStyle="panelDark"
          templateColumns={{ base: "1fr", md: "auto minmax(0, 1fr)" }}
          gap={{ base: 5, md: 8 }}
          alignItems="center"
        >
          <HStack as="span" justify="center" w="64px" h="64px" flexShrink={0} borderRadius="full" bg="whiteAlpha.100" color="brightTeal.500" aria-hidden="true">
            <HandHeart size={28} />
          </HStack>
          <VStack align="start" gap={2}>
            <Heading as="h3" textStyle="cardTitle" color="white">
              The patient
            </Heading>
            <Text textStyle="lede" color="navy.100" maxW="measure">
              Patient dignity, agency and informed consent guide every part of the service.
            </Text>
          </VStack>
        </Grid>

        <Box>
          <FeatureGrid columns={3}>
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return <FeatureCard key={pillar.title} title={pillar.title} description={pillar.text} icon={<Icon size={20} />} />;
            })}
          </FeatureGrid>
        </Box>
        </VStack>
      </ContentSection>

      <ContentSection tone="white" id="support-pathway" size="spacious">
        <SectionHeading eyebrow="How support works" title="A five-stage pathway with safe, clear next steps." description="The initial request is intentionally short. Medical documents are never collected until a secure onboarding invitation is issued and the protected upload service is operational." />
        <Box>
          <StepList steps={journey} />
        </Box>
        <HStack>
          <ActionLink href="/support">See the support pathway</ActionLink>
        </HStack>
      </ContentSection>

      <ContentSection tone="navy" id="founder">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1.15fr) minmax(0, 0.85fr)" }} gap={{ base: 10, lg: 16 }} alignItems="center">
          <GridItem order={{ base: 2, lg: 1 }}>
            <VStack align="start" gap={6}>
              <Eyebrow surface="dark">Why Hope4PKD exists</Eyebrow>
              <Heading as="h2" textStyle="sectionTitle" color="white" maxW="measureTight">
                A family’s experience became Hope4PKD.
              </Heading>
              <Text textStyle="lede" color="navy.100" maxW="measure">
                Hope4PKD grew from Onyekachi Nwakaihe’s experience caring for his mother, Margaret Toyin Nwakaihe, and his brother, John Ifeanyi Nwakaihe.
              </Text>
              <PullQuote>“No one should navigate PKD alone.”</PullQuote>
              <TextLink href="/about/founder-story" surface="dark">
                Read the founder’s story
              </TextLink>
            </VStack>
          </GridItem>
          <GridItem order={{ base: 1, lg: 2 }}>
            <MediaFrame src={founderImage} alt="Onyekachi Nwakaihe in a surgical gown, cap and mask during a hospital visit as a caregiver" ratio={1} objectPosition="50% 56%" />
          </GridItem>
        </Grid>
      </ContentSection>

      <ContentSection tone="pink" id="support-options">
        <SectionHeading eyebrow="Ways we may help" title="Four support pathways, one coordinated entry point." description="Available support depends on eligibility, operational capacity and case assessment. Submitting a request does not guarantee financial assistance." />
        <Box>
          <FeatureGrid columns={2}>
            {pathways.map(([title, text, Icon]) => (
              <FeatureCard key={title} title={title} description={text} icon={<Icon size={20} />} />
            ))}
          </FeatureGrid>
        </Box>
      </ContentSection>

      <ContentSection id="impact">
        <SectionHeading eyebrow="Impact & accountability" title="Reports will separate results from targets." description="Every published figure will include its source and reporting period." />
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
          <VStack layerStyle="panelDark" align="start" gap={4}>
            <Eyebrow surface="dark">Results to date</Eyebrow>
            <Heading as="h3" textStyle="cardTitle" color="white">
              Pilot reporting state
            </Heading>
            <Text textStyle="body" color="navy.100">
              Hope4PKD will publish programme totals only after data owners approve the methodology, reporting period and evidence.
            </Text>
          </VStack>
          <VStack layerStyle="panelTeal" align="start" gap={4}>
            <Eyebrow>Year-one operating targets</Eyebrow>
            <Heading as="h3" textStyle="cardTitle" color="navy.900">
              Put the controls into operation
            </Heading>
            <VStack align="start" gap={3} color="navy.600">
              {yearOneTargets.map((item) => (
                <HStack key={item} align="start" gap={3}>
                  <Box color="action.600" flexShrink={0} pt="3px">
                    <CircleCheck size={18} aria-hidden="true" />
                  </Box>
                  <Text textStyle="body">{item}</Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Grid>
        <HStack>
          <ActionLink href="/impact" variant="outline">See our accountability framework</ActionLink>
        </HStack>
      </ContentSection>

      <ContentSection tone="white" id="campaigns" size="spacious">
        <SectionHeading eyebrow="Where things stand" title="Each programme goes live only after its safeguards are complete." description="The current status below contains no placeholder activity or invented results." />
        <Box>
          <FeatureGrid columns={3}>
            {programmeStatus.map((item) => (
              <FeatureCard key={item.eyebrow} {...item} />
            ))}
          </FeatureGrid>
        </Box>
      </ContentSection>

      <StatementBand tone="brightTeal" eyebrow="Take the next step" statement="Read about support, partnerships or donations.">
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/support" surface="brand">Get support</ActionLink>
          <ActionLink href="/partner" variant="outline" surface="brand">Partner with us</ActionLink>
          <ActionLink href="/donate" variant="ghost" surface="brand">Donate</ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
