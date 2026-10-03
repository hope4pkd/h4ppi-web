import {
  ComingSoonAction,
  ComingSoonPanel,
  ContentSection,
  FaqList,
  FeatureCard,
  FeatureGrid,
  Ledger,
  LedgerRow,
  PageHero,
  SectionHeading,
  TextLink,
  type Faq,
} from "@/components/common/PublicPage";
import { VideoEmbed } from "@/components/common/VideoEmbed";
import { Layout } from "@/components/layout/Layout";
import { supportVideo } from "@/content/media";
import { Box, Container, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { TriangleAlert } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get support",
  description: "What Hope4PKD can help with, who can ask, the five steps a request goes through, and answers to the questions people ask first.",
  alternates: { canonical: "/support" },
};

const helpKinds = [
  {
    title: "Guidance through care",
    description: "Understand your diagnosis in plain language, find nephrologists and dialysis centres near you, and know which questions to ask at your next appointment.",
  },
  {
    title: "Help with costs",
    description: "Support toward dialysis, medication, consultations, tests and transplantation. It depends on an assessment and the funds available, so we cannot promise it to everyone, and we will tell you plainly what we can do.",
  },
  {
    title: "People who understand",
    description: "Talk to other patients and caregivers about what has helped them. The moderated space opens once its safeguards are in place.",
  },
  {
    title: "Family testing guidance",
    description: "If PKD runs in your family, we help relatives understand their risk and find where to get screened.",
  },
] as const;

// No response window is quoted anywhere on this page: none has been agreed, and a made-up one is the
// first thing a worried caller would hold us to.
const steps = [
  ["Send a short request", "Tell us who needs support and what kind of help would make a difference. Please do not attach medical records yet."],
  ["We contact you", "A member of our team reviews your request and reaches out to talk through the next step."],
  ["Share your details securely", "If we can help, we send you a private link to give consent and upload documents such as test results or hospital bills."],
  ["We agree a plan with you", "Our team checks the medical and cost information with your provider and explains exactly what support we can offer."],
  ["We stay in touch", "We check in after support is given, and keep you connected to guidance and community."],
] as const;

const faqs = [
  { question: "Does it cost anything to ask for help?", answer: "No. Asking for support is always free." },
  {
    question: "Will I definitely get financial support?",
    answer: "Not always. It depends on assessment and the funds available. Even when we cannot help with costs, we can often help with guidance and community.",
  },
  { question: "Do I need a confirmed diagnosis?", answer: "No. If you think you might have PKD, we can help you find a doctor who can confirm it." },
  {
    question: "Can I ask on behalf of a family member?",
    answer: "Yes. Caregivers can start a request. We will ask for the patient’s consent before any personal or medical details are shared.",
  },
  {
    question: "When does the request form open?",
    answer: "When the case-management service behind it is built and the eligibility rules are agreed. Until then there is no form, and no queue you are missing.",
  },
] as const satisfies readonly Faq[];

export default function SupportPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Above the hero, because the person it is for is not going to scroll. */}
      <Box role="note" bg="pink.50" borderBottomWidth="1px" borderColor="pink.200">
        <Container maxW="7xl" py={3}>
          <HStack gap={3} align="start" justify="center" color="navy.800">
            <Box color="pink.700" flexShrink={0} pt="2px">
              <TriangleAlert size={18} aria-hidden="true" />
            </Box>
            <Text textStyle="bodySm">
              <Text as="strong" fontWeight="700">Feeling very unwell right now?</Text> Go to the nearest hospital emergency unit. Hope4PKD cannot provide emergency care.
            </Text>
          </HStack>
        </Container>
      </Box>

      <PageHero
        eyebrow="Get support"
        title="Let’s work out your next step together."
        description="Whether you were diagnosed last week or have lived with PKD for years, you can ask us for help. It is free, and the first step will be a short form."
        aside={
          <VStack layerStyle="panel" align="start" gap={3} color="navy.900">
            <Heading as="h2" textStyle="featureTitle" color="navy.900">Who can ask for help</Heading>
            <Text textStyle="body" color="navy.700">
              People living with PKD in Nigeria, people who think they might have it, and the family members who care for them. The eligibility rules for financial help are being finalised.
            </Text>
            <HStack gap={3} flexWrap="wrap" pt={1}>
              <ComingSoonAction>Start a request</ComingSoonAction>
              <ComingSoonAction>Check case status</ComingSoonAction>
            </HStack>
            <TextLink href="/patient-eligibility">How eligibility will be decided</TextLink>
          </VStack>
        }
      />

      <ContentSection tone="white" size="spacious">
        <SectionHeading title="What we can help with" />
        <FeatureGrid columns={2}>
          {helpKinds.map((kind) => (
            <FeatureCard key={kind.title} title={kind.title} description={kind.description} />
          ))}
        </FeatureGrid>
      </ContentSection>

      <ContentSection divider>
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 5fr) minmax(0, 7fr)" }} gap={{ base: 8, lg: 16 }} alignItems="center">
          <SectionHeading
            title="Watch how to ask us for support"
            description={`A ${supportVideo.length} video for patients and families on how to ask Hope4PKD for help.`}
          />
          <VideoEmbed youtubeId={supportVideo.youtubeId} title={supportVideo.title} />
        </Grid>
      </ContentSection>

      <ContentSection size="spacious">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 5fr) minmax(0, 7fr)" }} gap={{ base: 8, lg: 16 }} alignItems="start">
          <SectionHeading eyebrow="How it works" title="What happens after you ask" />
          <Ledger>
            {steps.map(([title, text], index) => (
              <LedgerRow key={title} number={`0${index + 1}`} title={title}>
                {text}
              </LedgerRow>
            ))}
          </Ledger>
        </Grid>
        <TextLink href="/support/process">What gets decided at each stage</TextLink>
      </ContentSection>

      {/* The mockup carries a request form here. There is no server to receive one, so the panel says so
          in place; the aside keeps the promises the form would have made. */}
      <ContentSection tone="white" id="request" size="spacious">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 7fr) minmax(0, 5fr)" }} gap={{ base: 8, lg: 12 }} alignItems="start">
          <ComingSoonPanel
            title="The request form is not open yet"
            description="It opens when the case-management service behind it is built and the eligibility rules and response time are agreed. It will ask for your name, how to reach you, who needs support and what kind of help would make a difference. No medical records at that stage."
          />
          <VStack align="stretch" gap={0}>
            <VStack align="start" gap={2} pb={6}>
              <Heading as="h3" textStyle="featureTitle" color="navy.900">What happens next</Heading>
              <Text textStyle="body" color="navy.500">
                When the form opens, you will get a confirmation straight away, and a member of our team will contact you to talk through your request.
              </Text>
            </VStack>
            <VStack layerStyle="hairline" align="start" gap={2} py={6}>
              <Heading as="h3" textStyle="featureTitle" color="navy.900">Your privacy</Heading>
              <Text textStyle="body" color="navy.500">
                Only authorised team members will see your request. We never publish your name or story without your written consent, and you can ask us to delete your details at any time.
              </Text>
            </VStack>
            <VStack layerStyle="hairline" align="start" gap={2} pt={6}>
              <Heading as="h3" textStyle="featureTitle" color="navy.900">Prefer to talk?</Heading>
              <Text textStyle="body" color="navy.500">
                Phone and WhatsApp numbers will be published once they are verified and staffed.
              </Text>
              <TextLink href="/contact">How to contact us</TextLink>
            </VStack>
          </VStack>
        </Grid>
      </ContentSection>

      <ContentSection size="spacious">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 5fr) minmax(0, 7fr)" }} gap={{ base: 8, lg: 16 }} alignItems="start">
          <SectionHeading title="Questions people often ask" />
          <FaqList items={faqs} />
        </Grid>
        <HStack gap={6} flexWrap="wrap">
          <TextLink href="/find-care">Find care</TextLink>
          <TextLink href="/community">Community</TextLink>
          <TextLink href="/help">More questions and answers</TextLink>
        </HStack>
      </ContentSection>
    </Layout>
  );
}
