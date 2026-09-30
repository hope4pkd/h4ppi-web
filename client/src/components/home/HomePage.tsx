import {
  ActionLink,
  ContentSection,
  DirectoryList,
  DirectoryRow,
  Eyebrow,
  FeatureGrid,
  FeatureItem,
  MediaFrame,
  SectionHeading,
  StatementBand,
  StepList,
  TextLink,
} from "@/components/common/PublicPage";
import { SourceNote } from "@/components/common/SourceNote";
import { Layout } from "@/components/layout/Layout";
import { organisation } from "@/content/organisation";
import { pkdInBrief, pkdSource, pkdSymptoms } from "@/content/pkd";
import { Box, Container, Grid, GridItem, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import founderImage from "@public/assets/images/hospital.jpg";
import heroImage from "@public/assets/images/patient-caregiver-hands.png";

// Built from the audience table, not the concept note: each row is a visitor's own question.
const startHere = [
  { href: "/for/patients", title: "I have PKD, or my doctor thinks I might", text: "Understand your diagnosis and see how we can help." },
  { href: "/for/caregivers", title: "I care for someone with PKD", text: "Practical guidance, and people who understand caregiving." },
  { href: "/pkd/early-detection", title: "PKD runs in my family", text: "Learn about the risk and when to ask a doctor about screening." },
  { href: "/get-involved", title: "I want to help", text: "Donate, volunteer, fundraise or partner with us." },
  { href: "/for/health-professionals", title: "I am a health professional", text: "Refer a patient or work with us on medical review." },
] as const;

// Four of Mayo's symptom statements, chosen because they are the ones a person can notice or a routine
// appointment can pick up. The full list is on /pkd/symptoms-and-diagnosis.
const commonSigns = [pkdSymptoms[0], pkdSymptoms[1], pkdSymptoms[2], pkdSymptoms[6]];

const helpKinds = [
  {
    title: "Guidance",
    description: "We help you understand your diagnosis, find nephrologists and dialysis centres, and plan what comes next.",
    href: "/support",
  },
  {
    title: "Financial assistance",
    description: "Help toward the cost of dialysis, medication, tests and transplantation, after assessment and subject to the funds available.",
    href: "/patient-eligibility",
  },
  {
    title: "Community",
    description: "A moderated space to meet other patients and caregivers. It opens once its safeguards are in place.",
    href: "/community",
  },
  {
    title: "Awareness and advocacy",
    description: "We teach Nigerians about PKD and work with policymakers and health leaders for fairer access to care.",
    href: "/awareness",
  },
] as const;

// No response window is quoted: none has been agreed. The steps describe the shape, not a promise.
const howItWorks = [
  { title: "Ask", description: "Send a short request. No medical documents at this stage." },
  { title: "Hear back", description: "Our team reviews your request and contacts you about the next step." },
  { title: "Share securely", description: "If we can help, you get a private link to share your details and documents." },
  { title: "Agree a plan", description: "We check the medical and cost information and agree a support plan with you." },
  { title: "Stay in touch", description: "We follow up after support, because PKD is lifelong." },
];

// Each row links to the page where the claim can be checked, which is the point of the section.
const trustChecks = [
  { href: "/campaigns", title: "Every campaign is verified", text: "Patient campaigns go public only after medical and cost checks, and with the patient's consent." },
  { href: "/impact", title: "Every payment is recorded", text: "Financial support is recorded against the case and the provider it was paid for, and reported." },
  { href: "/medical-disclaimer", title: "Health information names its source", text: "Every page about PKD says where its facts come from and that Hope4PKD has not medically reviewed them." },
  { href: "/policies/privacy", title: "Your privacy is protected", text: "We collect only what we need, and never share your story without your written consent." },
] as const;

export function HomePage() {
  const organisationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: organisation.brandName,
    legalName: organisation.legalName,
    alternateName: organisation.shortName,
    url: "https://hope4pkd.org",
    logo: "https://hope4pkd.org/assets/logo-new.png",
    areaServed: "Nigeria",
    description: "Guidance, financial assistance, community and advocacy for people living with polycystic kidney disease in Nigeria and the families who care for them.",
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero: the headline and the two actions first, then the photograph as a wide band at its own
          ratio. The source is a 1983x793 landscape; a portrait slot upscaled it and made it soft. */}
      <Box as="section" bg="canvas.50" pt={{ base: 12, md: 20 }} pb={{ base: 12, md: 16 }}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 7fr) minmax(0, 5fr)" }} gap={{ base: 6, lg: 16 }} alignItems="end">
            <VStack align="start" gap={5}>
              <Eyebrow>PKD patient support in Nigeria</Eyebrow>
              <Heading as="h1" textStyle="display" color="navy.900" maxW="14ch">
                No one should navigate PKD alone.
              </Heading>
            </VStack>
            <VStack align="start" gap={6}>
              <Text textStyle="lede" color="navy.500" maxW="measureTight">
                Hope4PKD supports Nigerians living with polycystic kidney disease, and the families who care for them, through guidance, financial assistance, community and advocacy.
              </Text>
              <HStack gap={3} flexWrap="wrap">
                <ActionLink href="/support">Get support</ActionLink>
                <ActionLink href="/pkd" variant="outline">Learn about PKD</ActionLink>
              </HStack>
              <Text textStyle="bodySm" color="navy.500">Asking for help is free, and what you tell us stays private.</Text>
            </VStack>
          </Grid>

          <Box position="relative" mt={{ base: 10, md: 14 }}>
            <Box position="relative" aspectRatio={{ base: 4 / 3, md: 2.5 }} borderRadius="xl" overflow="hidden" bg="navy.100">
              <Image
                src={heroImage}
                alt="A patient and caregiver holding hands"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1216px"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </Box>
            {/* The one fact worth putting in front of everyone who lands here, because it is the one
                most people do not know. */}
            <Box
              position={{ base: "relative", md: "absolute" }}
              right={{ md: 6 }}
              bottom={{ md: 6 }}
              mt={{ base: -10, md: 0 }}
              mx={{ base: 4, md: 0 }}
              maxW={{ md: "24rem" }}
            >
              <Link href="/pkd/early-detection">
                <VStack
                  align="start"
                  gap={2}
                  bg="navy.900"
                  borderRadius="xl"
                  p="cardPad"
                  transitionProperty="background-color"
                  transitionDuration="fast"
                  transitionTimingFunction="standard"
                  _hover={{ bg: "navy.800" }}
                >
                  <Eyebrow surface="dark">It runs in families</Eyebrow>
                  <Text textStyle="body" color="navy.100">
                    If you have PKD, your children, brothers and sisters may be at risk too.
                  </Text>
                  <Text as="span" textStyle="bodySm" fontWeight="700" color="brightTeal.500">
                    Learn about family testing
                  </Text>
                </VStack>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* The audience table, as a list of the visitor's own questions. Replaces the old audience bar. */}
      <ContentSection tone="white" id="start-here">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 5fr) minmax(0, 7fr)" }} gap={{ base: 8, lg: 16 }} alignItems="start">
          <SectionHeading title="Where would you like to start?" />
          <DirectoryList>
            {startHere.map((row) => (
              <DirectoryRow key={row.href} href={row.href} title={row.title}>
                {row.text}
              </DirectoryRow>
            ))}
          </DirectoryList>
        </Grid>
      </ContentSection>

      <ContentSection id="understand" size="spacious">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: 10, lg: 16 }} alignItems="start">
          <VStack align="start" gap={6}>
            <SectionHeading eyebrow="Understanding PKD" title="What is PKD?" description={pkdInBrief} />
            <VStack align="start" gap={4} w="full">
              <Text textStyle="featureTitle" color="navy.900">Common signs include</Text>
              <SimpleGrid as="ul" columns={{ base: 1, sm: 2 }} gapX={8} gapY={3} w="full" listStyleType="none">
                {commonSigns.map((sign) => (
                  <HStack as="li" key={sign} gap={3} align="center">
                    <Box w="6px" h="6px" borderRadius="full" bg="action.600" flexShrink={0} aria-hidden="true" />
                    <Text textStyle="body" color="navy.800">{sign}</Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </VStack>
            <TextLink href="/pkd">Read the full guide to PKD</TextLink>
          </VStack>

          <VStack layerStyle="panelPink" align="start" gap={5}>
            <Heading as="p" textStyle="display" color="pink.700">
              1 in 2
            </Heading>
            {/* pkdTypes[0]: "each child has a 50% chance of inheriting it" — restated as odds. */}
            <Text textStyle="lede" color="navy.900" fontWeight="600">
              In the most common form of PKD, each child of a parent with the condition has a 1 in 2 chance of inheriting it.
            </Text>
            <Text textStyle="body" color="navy.700">
              That is why we encourage families to talk to a doctor about screening, even before any symptoms appear.
            </Text>
            <ActionLink href="/pkd/early-detection" variant="outline">
              Early detection and family testing
            </ActionLink>
          </VStack>
        </Grid>
        <SourceNote publisher={pkdSource.publisher} title={pkdSource.title} href={pkdSource.href} />
      </ContentSection>

      <ContentSection tone="white" id="our-support" size="spacious">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 5fr) minmax(0, 7fr)" }} gap={{ base: 8, lg: 16 }} alignItems="start">
          <VStack align="start" gap={6}>
            <SectionHeading eyebrow="Our support" title="How we help" />
            <TextLink href="/support">Get support</TextLink>
          </VStack>
          <FeatureGrid columns={2}>
            {helpKinds.map((kind) => (
              <FeatureItem key={kind.title} title={kind.title} href={kind.href}>
                {kind.description}
              </FeatureItem>
            ))}
          </FeatureGrid>
        </Grid>
      </ContentSection>

      <ContentSection tone="teal" id="how-it-works" size="spacious">
        <SectionHeading eyebrow="How it works" title="What happens when you ask for help" description="The first step is short. You only share medical documents later, through a private link, if we can help." />
        <StepList steps={howItWorks} />
        <HStack gap={4} flexWrap="wrap" align="center">
          <ActionLink href="/support">How to ask for help</ActionLink>
          <Text textStyle="bodySm" color="navy.500">The request form is not open yet.</Text>
        </HStack>
      </ContentSection>

      <ContentSection tone="navy" id="our-story">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 0.85fr) minmax(0, 1.15fr)" }} gap={{ base: 10, lg: 16 }} alignItems="center">
          <GridItem>
            <MediaFrame src={founderImage} alt="Onyekachi Nwakaihe in a surgical gown, cap and mask during a hospital visit as a caregiver" ratio={1} objectPosition="50% 56%" />
          </GridItem>
          <GridItem>
            <VStack align="start" gap={6}>
              <Eyebrow surface="dark">Our story</Eyebrow>
              <Heading as="h2" textStyle="sectionTitle" color="white" maxW="measureTight">
                Hope4PKD began with a family’s loss.
              </Heading>
              <Text textStyle="lede" color="navy.100" maxW="measure">
                Onyekachi Nwakaihe cared for his mother, Margaret, and his brother, John, through their years with kidney disease, and lost both of them. Reliable information was hard to find, treatment was hard to afford, and there was little support for the family carrying it.
              </Text>
              <Text textStyle="lede" color="navy.100" maxW="measure">
                He started Hope4PKD so that other families get more help than his did.
              </Text>
              <ActionLink href="/about/founder-story" variant="outline" surface="dark">
                Read Onyekachi’s story
              </ActionLink>
            </VStack>
          </GridItem>
        </Grid>
      </ContentSection>

      <ContentSection tone="white" id="trust" size="spacious">
        <SectionHeading eyebrow="Transparency" title="How we handle money and health information" description="Each rule links to the page where you can read it in full." />
        <DirectoryList>
          {trustChecks.map((row) => (
            <DirectoryRow key={row.href} href={row.href} title={row.title}>
              {row.text}
            </DirectoryRow>
          ))}
        </DirectoryList>
        {/* No report date and no registration number appear here: neither has been approved for
            publication, and a bracketed placeholder on a charity site reads as a claim. */}
        <HStack justify="space-between" align="center" gap={6} flexWrap="wrap">
          <Text textStyle="body" color="navy.500" maxW="measure">
            No programme report has been published yet. Registration details will appear here once they are approved for publication.
          </Text>
          <TextLink href="/impact">Read the transparency page</TextLink>
        </HStack>
      </ContentSection>

      <StatementBand tone="brightTeal" eyebrow="Donate" statement="Help pay for dialysis, medication and tests.">
        <Text textStyle="lede" color="navy.900" maxW="measure">
          Your gift goes toward treatment for people with PKD who could not otherwise afford it. Online donations are not open yet.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/donate" surface="brand">Donate</ActionLink>
          <ActionLink href="/get-involved" variant="outline" surface="brand">Other ways to help</ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
