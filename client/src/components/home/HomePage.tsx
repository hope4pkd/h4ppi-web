import {
  ActionLink,
  ContentSection,
  DirectoryList,
  DirectoryRow,
  Eyebrow,
  FeatureCard,
  FeatureGrid,
  MediaFrame,
  PullQuote,
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
import { CircleAlert, CircleCheck, Compass, Landmark, Megaphone, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import founderImage from "@public/assets/images/hospital.jpg";
import heroImage from "@public/assets/images/patient-caregiver-hands.png";

// "Every health page names its source", not "medically reviewed": the site claims no medical review
// (see SourceNote), and a trust line that overstates is worse than none.
const trustItems = ["Free to ask for help", "Your information stays private", "Every health page names its source"];

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
    icon: Compass,
    href: "/support",
    linkLabel: "How we help",
  },
  {
    title: "Financial assistance",
    description: "Help toward the cost of dialysis, medication, tests and transplantation, after assessment and subject to the funds available.",
    icon: Landmark,
    href: "/patient-eligibility",
    linkLabel: "Who is eligible",
  },
  {
    title: "Community",
    description: "Meet patients and caregivers who understand what you are living with, in a moderated space that opens once its safeguards are in place.",
    icon: Users,
    href: "/community",
    linkLabel: "About the community",
  },
  {
    title: "Awareness and advocacy",
    description: "We teach Nigerians about PKD and work with policymakers and health leaders for fairer access to care.",
    icon: Megaphone,
    href: "/awareness",
    linkLabel: "Awareness and advocacy",
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

      {/* Hero — one primary action, one secondary. The trust line sits inside the hero rather than as
          a separate band, so the first screen answers "what is this" and "can I trust it" together. */}
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
                Hope4PKD supports Nigerians living with polycystic kidney disease, and the families who care for them, through guidance, financial assistance, community and advocacy.
              </Text>
              <HStack gap={3} flexWrap="wrap" pt={2}>
                <ActionLink href="/support">Get support</ActionLink>
                <ActionLink href="/pkd" variant="outline" surface="dark">Learn about PKD</ActionLink>
              </HStack>
              <HStack gap={{ base: 3, md: 6 }} flexWrap="wrap" pt={2} color="navy.200">
                {trustItems.map((item) => (
                  <HStack key={item} gap={2} align="center">
                    <Box color="brightTeal.500" flexShrink={0}>
                      <CircleCheck size={16} aria-hidden="true" />
                    </Box>
                    <Text textStyle="bodySm">{item}</Text>
                  </HStack>
                ))}
              </HStack>
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
              {/* The one fact worth putting in front of everyone who lands here, because it is the one
                  most people do not know. */}
              <Link href="/pkd/early-detection">
                <VStack
                  layerStyle="cardInteractive"
                  align="start"
                  gap={2}
                  position="absolute"
                  left={{ base: 4, md: 6 }}
                  right={{ base: 4, md: "auto" }}
                  bottom={{ base: 4, md: 6 }}
                  maxW={{ md: "22rem" }}
                  color="navy.900"
                >
                  <Eyebrow>It runs in families</Eyebrow>
                  <Text textStyle="body" color="navy.700">
                    If you have PKD, your children, brothers and sisters may be at risk too.
                  </Text>
                  <Text as="span" textStyle="bodySm" fontWeight="700" color="action.700">
                    Learn about family testing
                  </Text>
                </VStack>
              </Link>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* The audience table, as a list of the visitor's own questions. Replaces the old audience bar. */}
      <ContentSection tone="white" id="start-here">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 5fr) minmax(0, 7fr)" }} gap={{ base: 8, lg: 16 }} alignItems="start">
          <SectionHeading title="Where would you like to start?" description="Choose what fits you best. Everything else on the site is always one click away." />
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
            <VStack align="start" gap={3} w="full">
              <Text textStyle="featureTitle" color="navy.900">Common signs include</Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3} w="full">
                {commonSigns.map((sign) => (
                  <HStack key={sign} bg="white" borderRadius="xl" px={4} py={3} gap={3} align="center">
                    <Box w="8px" h="8px" borderRadius="full" bg="action.600" flexShrink={0} aria-hidden="true" />
                    <Text textStyle="bodySm" color="navy.800">{sign}</Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </VStack>
            <TextLink href="/pkd">Read the full guide to PKD</TextLink>
          </VStack>

          <VStack layerStyle="panelDark" align="start" gap={5}>
            <Heading as="p" textStyle="display" color="brightTeal.500">
              1 in 2
            </Heading>
            {/* pkdTypes[0]: "each child has a 50% chance of inheriting it" — restated as odds. */}
            <Text textStyle="lede" color="white" fontWeight="600">
              In the most common form of PKD, each child of a parent with the condition has a 1 in 2 chance of inheriting it.
            </Text>
            <Text textStyle="body" color="navy.100">
              That is why we encourage families to talk to a doctor about screening, even before any symptoms appear.
            </Text>
            <ActionLink href="/pkd/early-detection" variant="outline" surface="dark">
              Early detection and family testing
            </ActionLink>
          </VStack>
        </Grid>
        <SourceNote publisher={pkdSource.publisher} title={pkdSource.title} href={pkdSource.href} />
      </ContentSection>

      <ContentSection tone="white" id="our-support" size="spacious">
        <HStack justify="space-between" align="end" gap={8} flexWrap="wrap">
          <SectionHeading eyebrow="Our support" title="Four kinds of help, one place to start." />
          <TextLink href="/support">See how we help</TextLink>
        </HStack>
        <FeatureGrid columns={4}>
          {helpKinds.map((kind) => {
            const Icon = kind.icon;
            return <FeatureCard key={kind.title} title={kind.title} description={kind.description} icon={<Icon size={20} />} href={kind.href} linkLabel={kind.linkLabel} />;
          })}
        </FeatureGrid>
        <HStack layerStyle="card" gap={3} align="start" color="navy.700">
          <Box color="action.700" flexShrink={0} pt="2px">
            <CircleAlert size={20} aria-hidden="true" />
          </Box>
          <Text textStyle="body">Financial support depends on eligibility and available funds, but asking for help is always free.</Text>
        </HStack>
      </ContentSection>

      <ContentSection tone="teal" id="how-it-works" size="spacious">
        <SectionHeading eyebrow="How it works" title="Getting support, step by step" description="We keep the first step short. You only share medical documents later, through a private link, if we can help." />
        <StepList steps={howItWorks} />
        <HStack gap={4} flexWrap="wrap" align="center">
          <ActionLink href="/support">How to ask for help</ActionLink>
          <Text textStyle="bodySm" color="navy.500">Asking is free. The request form opens when intake does; the support page says what will happen.</Text>
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
                Onyekachi Nwakaihe cared for his mother, Margaret, and his brother, John, through their years with kidney disease, and lost both of them. He saw how hard it was to find reliable information, afford treatment, and carry the weight of it all with so little support.
              </Text>
              <Text textStyle="lede" color="navy.100" maxW="measure">
                Hope4PKD exists so that other families do not have to walk that road alone.
              </Text>
              <PullQuote attribution="Onyekachi Nwakaihe, Founder">“No one should navigate PKD alone.”</PullQuote>
              <ActionLink href="/about/founder-story" variant="outline" surface="dark">
                Read Onyekachi’s story
              </ActionLink>
            </VStack>
          </GridItem>
        </Grid>
      </ContentSection>

      <ContentSection tone="white" id="trust" size="spacious">
        <SectionHeading eyebrow="Transparency" title="Trust you can check." description="PKD support involves people’s health and people’s money. We hold ourselves to clear rules for both, and each rule below links to where you can read it." />
        <DirectoryList>
          {trustChecks.map((row) => (
            <DirectoryRow key={row.href} href={row.href} title={row.title}>
              {row.text}
            </DirectoryRow>
          ))}
        </DirectoryList>
        {/* No report date and no registration number appear here: neither has been approved for
            publication, and a bracketed placeholder on a charity site reads as a claim. */}
        <HStack layerStyle="card" justify="space-between" align="center" gap={6} flexWrap="wrap">
          <Text textStyle="body" color="navy.700" maxW="measure">
            No programme report has been published yet. Registration details will appear here once they are approved for publication.
          </Text>
          <TextLink href="/impact">Our accountability framework</TextLink>
        </HStack>
      </ContentSection>

      <StatementBand tone="brightTeal" eyebrow="Get involved" statement="Help a family face PKD with hope.">
        <Text textStyle="lede" color="navy.900" maxW="measure">
          Your gift will help pay for dialysis, medication and tests for people who could not otherwise afford them. Online donations open once the payment controls are approved; the donate page says where things stand.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/donate" surface="brand">Donate</ActionLink>
          <ActionLink href="/get-involved" variant="outline" surface="brand">See all ways to help</ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
