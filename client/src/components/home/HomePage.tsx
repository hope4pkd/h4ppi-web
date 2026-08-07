import { ActionLink, ContentSection, EmptyState, Eyebrow, SectionHeading } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Box, Container, Grid, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowDown, BookOpen, CircleCheck, Compass, HandHeart, HeartHandshake, Landmark, Megaphone, SearchCheck, Stethoscope, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@public/assets/images/patient-caregiver-hands.png";

const trustItems = ["Patient-centred", "Verification-led", "Privacy-aware", "Transparent by design"];

const problems = [
  ["Diagnosis can feel disorienting", "People need clear, medically responsible information and a practical next step after a suspected or confirmed diagnosis."],
  ["Care pathways are fragmented", "Appointments, tests, referrals and treatment decisions often sit across different providers without a patient navigator."],
  ["Costs are difficult to assess", "Families may face significant diagnostic and treatment costs before they know what support is appropriate or available."],
  ["Trust requires verification", "Patients, providers and supporters need a careful process that protects dignity while confirming each case and cost."],
  ["Long-term support matters", "PKD is a lifelong condition. People need follow-up, community and reliable information—not a single moment of attention."],
] as const;

const pillars = [
  { title: "Patient navigation", text: "A clear route through requests, onboarding, assessment and follow-up.", icon: Compass, position: { top: "0", left: "50%", transform: "translateX(-50%)" } },
  { title: "Medical verification", text: "Qualified review before medical content or public cases are approved.", icon: Stethoscope, position: { top: "18%", right: "3%" } },
  { title: "Financial access", text: "Validated costs, controlled allocations and accountable disbursement records.", icon: Landmark, position: { bottom: "7%", right: "8%" } },
  { title: "Community", text: "Human support for patients and the people caring for them.", icon: Users, position: { bottom: "0", left: "50%", transform: "translateX(-50%)" } },
  { title: "Awareness", text: "Responsible public education without sensationalising patient stories.", icon: Megaphone, position: { bottom: "7%", left: "8%" } },
  { title: "Advocacy", text: "Evidence-led work toward stronger, fairer PKD support systems.", icon: HeartHandshake, position: { top: "18%", left: "3%" } },
] as const;

const journey = [
  ["Request", "Share the minimum information needed to understand how we may help."],
  ["Review", "The team checks the request, confirms next steps and sends a secure invitation when appropriate."],
  ["Onboard", "Invited patients complete consent, case details and private documents in a protected flow."],
  ["Assess", "Authorised staff verify medical and cost information, then agree a support plan."],
  ["Support & follow-up", "Progress is communicated safely through the case pathway, with follow-up after support."],
] as const;

const pathways = [
  ["Patient navigation", "Help understanding the pathway from first request to a clearly explained next step.", Compass],
  ["Verified support planning", "A structured review of the case and appropriate support options after onboarding.", SearchCheck],
  ["Knowledge and guidance", "Medically reviewed information as the Knowledge Centre completes its review process.", BookOpen],
  ["Community connection", "Compassionate signposting for patients, caregivers and families navigating PKD.", Users],
] as const;

export function HomePage() {
  const organisationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Hope4PKD Patients Initiative",
    url: "https://hope4pkd.org",
    logo: "https://hope4pkd.org/assets/logo-new.png",
    areaServed: "Nigeria",
    description: "A coordinated support pathway for people and families navigating polycystic kidney disease in Nigeria.",
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd).replace(/</g, "\\u003c") }} />

      <Box as="section" bg="navy.900" color="white" overflow="hidden">
        <Container maxW="7xl" px={{ base: 0, lg: 4 }}>
          <Grid templateColumns={{ base: "1fr", lg: "1.08fr 0.92fr" }} minH={{ lg: "680px" }}>
            <VStack align="start" justify="center" gap={6} px={{ base: 5, md: 10, lg: 8 }} py={{ base: 16, lg: 20 }}>
              <Eyebrow>PKD patient support in Nigeria</Eyebrow>
              <Heading as="h1" color="white" fontSize={{ base: "5xl", md: "7xl" }} lineHeight="0.92" letterSpacing="-0.055em" maxW="3xl">
                No one should navigate PKD alone.
              </Heading>
              <Text color="navy.100" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.7" maxW="2xl">
                Hope4PKD is building a coordinated pathway for people and families living with polycystic kidney disease—from first questions to verified, accountable support.
              </Text>
              <HStack gap={3} flexWrap="wrap" pt={2}>
                <ActionLink href="/support">Get support</ActionLink>
                <ActionLink href="/campaigns" variant="outline">View campaigns</ActionLink>
                <ActionLink href="/knowledge" variant="ghost" onDark>Understand PKD</ActionLink>
              </HStack>
              <HStack color="navy.200" fontSize="sm" gap={2} pt={3}>
                <ArrowDown size={16} aria-hidden="true" />
                <Text>See how the pathway works</Text>
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
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box as="section" bg="pink.400" color="navy.900" borderBottomWidth="1px" borderColor="pink.500">
        <Container maxW="7xl" py={5}>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={5}>
            {trustItems.map((item) => (
              <HStack key={item} gap={2} align="start"><CircleCheck size={18} aria-hidden="true" /><Text fontSize="sm" fontWeight="800">{item}</Text></HStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <ContentSection id="the-challenge">
        <SectionHeading eyebrow="The PKD journey" title="The problem is not one moment. It is the whole pathway." description="PKD affects more than clinical appointments. People need trustworthy information, coordinated care and sustained support while protecting their privacy and dignity." />
        <VStack align="stretch" gap={0} mt={12}>
          {problems.map(([title, text], index) => (
            <Grid key={title} templateColumns={{ base: "48px 1fr", md: "96px 0.8fr 1.2fr" }} gap={{ base: 3, md: 8 }} borderTopWidth="1px" borderColor="navy.100" py={6} alignItems="start">
              <Text color="action.700" fontWeight="800">0{index + 1}</Text>
              <Heading as="h3" fontFamily="body" fontSize={{ base: "lg", md: "xl" }}>{title}</Heading>
              <Text gridColumn={{ base: "2", md: "auto" }} color="navy.500" lineHeight="1.7">{text}</Text>
            </Grid>
          ))}
        </VStack>
      </ContentSection>

      <ContentSection tone="teal" id="ecosystem">
        <SectionHeading align="center" eyebrow="The Hope4PKD ecosystem" title="Six connected pillars, centred on the patient." description="Each pillar answers a different part of the journey. Together, they form one accountable support system." />

        <Box display={{ base: "none", lg: "block" }} position="relative" h="650px" maxW="1000px" mx="auto" mt={12} aria-label="Six Hope4PKD support pillars surrounding the patient">
          <Box position="absolute" inset="8% 18%" border="1px dashed" borderColor="teal.300" borderRadius="full" aria-hidden="true" />
          <VStack position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" bg="navy.900" color="white" w="210px" h="210px" borderRadius="full" justify="center" gap={2} boxShadow="0 24px 70px rgba(11,31,51,0.22)" zIndex={2}>
            <HandHeart aria-hidden="true" color="#00CECB" />
            <Heading as="h3" fontFamily="body" fontSize="2xl" color="white">The patient</Heading>
            <Text color="navy.100" fontSize="sm" textAlign="center" px={5}>Dignity, agency and informed consent at the centre.</Text>
          </VStack>
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <VStack key={pillar.title} position="absolute" {...pillar.position} w="210px" minH="164px" align="start" gap={2} bg="white" p={5} borderRadius="xl" borderWidth="1px" borderColor="teal.200" boxShadow="0 14px 35px rgba(11,31,51,0.08)">
                <Box color="action.700"><Icon aria-hidden="true" size={22} /></Box>
                <Heading as="h3" fontFamily="body" fontSize="lg">{pillar.title}</Heading>
                <Text color="navy.500" fontSize="sm" lineHeight="1.55">{pillar.text}</Text>
              </VStack>
            );
          })}
        </Box>

        <VStack as="ol" listStyleType="none" align="stretch" gap={3} mt={10} display={{ base: "flex", lg: "none" }}>
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <HStack as="li" key={pillar.title} align="start" gap={4} bg="white" borderWidth="1px" borderColor="teal.200" borderRadius="xl" p={5}>
                <VStack bg="teal.100" color="action.700" borderRadius="full" w="44px" h="44px" justify="center" flexShrink={0}>
                  <Icon aria-hidden="true" size={20} />
                </VStack>
                <Box><Text color="action.700" fontSize="xs" fontWeight="800">0{index + 1}</Text><Heading as="h3" fontFamily="body" fontSize="lg" mt={1}>{pillar.title}</Heading><Text color="navy.500" fontSize="sm" lineHeight="1.6" mt={1}>{pillar.text}</Text></Box>
              </HStack>
            );
          })}
        </VStack>
      </ContentSection>

      <ContentSection id="support-pathway">
        <SectionHeading eyebrow="How support works" title="A five-stage pathway with safe, clear next steps." description="The initial request is intentionally short. Medical documents are never collected until a secure onboarding invitation is issued and the protected upload service is operational." />
        <SimpleGrid as="ol" listStyleType="none" columns={{ base: 1, md: 5 }} gap={0} mt={12}>
          {journey.map(([title, text], index) => (
            <VStack as="li" key={title} align="start" borderTopWidth="3px" borderColor={index === 0 ? "pink.400" : "teal.500"} pt={5} pr={{ md: 5 }} pb={{ base: 7, md: 0 }} gap={3}>
              <Text color="action.700" fontWeight="800" fontSize="sm">0{index + 1}</Text>
              <Heading as="h3" fontFamily="body" fontSize="xl">{title}</Heading>
              <Text color="navy.500" fontSize="sm" lineHeight="1.65">{text}</Text>
            </VStack>
          ))}
        </SimpleGrid>
        <HStack mt={10}><ActionLink href="/support">See the support pathway</ActionLink></HStack>
      </ContentSection>

      <ContentSection tone="navy" id="founder">
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }} alignItems="end">
          <VStack align="start" gap={4}>
            <Text color="brightTeal.500" fontSize="sm" fontWeight="800" letterSpacing="0.12em" textTransform="uppercase">Why Hope4PKD exists</Text>
            <Heading as="h2" color="white" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1">Pain transformed into organised impact.</Heading>
          </VStack>
          <VStack align="start" gap={5}>
            <Text color="navy.100" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.75">
              Hope4PKD grew from Onyekachi Nwakaihe’s experience as a caregiver and the family’s experience of the dialysis and transplant burden faced by Margaret Toyin Nwakaihe and John Ifeanyi Nwakaihe.
            </Text>
            <Text color="pink.400" fontFamily="heading" fontSize={{ base: "2xl", md: "3xl" }} fontStyle="italic" lineHeight="1.35">
              “No one should navigate PKD alone.”
            </Text>
            <Link href="/about/founder-story"><Text as="span" color="brightTeal.500" fontWeight="800">Read the founder’s story →</Text></Link>
          </VStack>
        </Grid>
      </ContentSection>

      <ContentSection id="campaigns">
        <SectionHeading eyebrow="Verified campaigns" title="Every public case must earn trust before it asks for support." description="Campaigns publish only after verification, valid consent, cost review and programme and finance approval." />
        <Box mt={10}><EmptyState title="No verified campaigns are public yet" description="Hope4PKD is completing the safeguards required to publish patient stories and costs responsibly. No fictional cases or provisional fundraising totals are shown." actionLabel="How campaign verification works" actionHref="/campaigns" /></Box>
      </ContentSection>

      <ContentSection tone="pink" id="support-options">
        <SectionHeading eyebrow="Ways we may help" title="Four support pathways, one coordinated entry point." description="Available support depends on eligibility, operational capacity and case assessment. Submitting a request does not guarantee financial assistance." />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mt={10}>
          {pathways.map(([title, text, Icon]) => (
            <HStack key={title} align="start" gap={5} borderTopWidth="2px" borderColor="navy.900" pt={5}>
              <Box bg="navy.900" color="brightTeal.500" borderRadius="full" p={3}><Icon aria-hidden="true" /></Box>
              <Box><Heading as="h3" fontFamily="body" fontSize="xl">{title}</Heading><Text color="navy.600" lineHeight="1.7" mt={2}>{text}</Text></Box>
            </HStack>
          ))}
        </SimpleGrid>
      </ContentSection>

      <ContentSection id="impact">
        <SectionHeading eyebrow="Impact & accountability" title="Results and targets will never be mixed." description="Public reporting separates verified delivery from future operating goals, with sources and reporting periods attached." />
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6} mt={10}>
          <VStack align="start" bg="navy.900" color="white" p={{ base: 6, md: 9 }} borderRadius="2xl" gap={4}>
            <Text color="brightTeal.500" fontWeight="800">Results to date</Text>
            <Heading as="h3" color="white" fontSize="3xl">Pilot reporting state</Heading>
            <Text color="navy.100" lineHeight="1.7">Verified programme totals and reports will appear here after data owners approve the methodology, reporting period and evidence. Unverified figures are deliberately withheld.</Text>
          </VStack>
          <VStack align="start" bg="teal.50" borderWidth="1px" borderColor="teal.200" p={{ base: 6, md: 9 }} borderRadius="2xl" gap={4}>
            <Text color="action.700" fontWeight="800">Year-one operating targets</Text>
            <Heading as="h3" fontSize="3xl">Build the accountable pathway</Heading>
            <VStack align="start" gap={3} color="navy.600">
              {["Launch a reviewed patient-intake and case-management process.", "Publish only verified campaigns with current consent and approved costs.", "Record allocations and provider disbursements separately.", "Publish a clearly sourced first programme report."].map((item) => <HStack key={item} align="start"><CircleCheck size={18} aria-hidden="true" /><Text>{item}</Text></HStack>)}
            </VStack>
          </VStack>
        </Grid>
        <HStack mt={8}><ActionLink href="/impact" variant="outline">See our accountability framework</ActionLink></HStack>
      </ContentSection>

      <ContentSection tone="teal" id="knowledge">
        <SectionHeading eyebrow="PKD Knowledge Centre" title="Medical information should be reviewed, dated and traceable." description="Every clinical article will name its author and qualified reviewer, cite sources, include a disclaimer and show its next review date." />
        <Box mt={10}><EmptyState title="The Knowledge Centre is in medical review" description="No article will be presented as medically reviewed until Hope4PKD appoints qualified reviewers and completes the publication workflow. The support pathway remains available for non-emergency guidance." actionLabel="Visit the Knowledge Centre" actionHref="/knowledge" /></Box>
      </ContentSection>

      <ContentSection id="partners">
        <SectionHeading eyebrow="Partnerships" title="Building the clinical, community and funding network." description="Confirmed organisations will be listed only after the relationship, permission to display their identity and partnership scope are documented." />
        <Box mt={10}><EmptyState title="Our partnership network is being formalised" description="We welcome conversations with healthcare providers, professional bodies, patient groups, responsible funders and technical partners." actionLabel="Explore partnership pathways" actionHref="/partner" /></Box>
      </ContentSection>

      <Box as="section" bg="brightTeal.500" color="navy.900">
        <Container maxW="7xl" py={{ base: 16, md: 20 }}>
          <Grid templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }} gap={10} alignItems="end">
            <Box><Text fontWeight="800" letterSpacing="0.12em" textTransform="uppercase" fontSize="sm">Take the next step</Text><Heading as="h2" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="0.98" mt={3}>Support begins with one clear action.</Heading></Box>
            <HStack gap={3} flexWrap="wrap" justify={{ lg: "end" }}>
              <ActionLink href="/support">Get support</ActionLink>
              <ActionLink href="/partner" variant="outline">Partner with us</ActionLink>
              <ActionLink href="/donate" variant="ghost">Donate</ActionLink>
            </HStack>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}
