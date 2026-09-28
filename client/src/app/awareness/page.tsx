import { Grid, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ContentSection,
  DirectoryList,
  DirectoryRow,
  EmptyState,
  PageHero,
  PullQuote,
  SectionHeading,
  StatementBand,
  StepList,
  TextLink,
} from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";

const steps = [
  {
    title: "Learn it properly first",
    description:
      "Awareness spread from a half-understanding does more harm than silence. Read what PKD is and where the information came from before you repeat it.",
  },
  {
    title: "Start with your own family",
    description:
      "PKD is inherited. The most useful awareness conversation most people will ever have is with a sibling or a cousin, not with a stranger.",
  },
  {
    title: "Share sources, not claims",
    description:
      "Link the page rather than paraphrasing it. A claim without a source is what makes a family distrust the next thing they are told about their kidneys.",
  },
  {
    title: "Correct the myths you meet",
    description:
      "PKD is not caused by diet, lifestyle or anything anyone did. Saying so out loud, once, in the right room, is worth a great deal to whoever is sitting in it.",
  },
];

export const metadata: Metadata = {
  title: "Awareness & advocacy",
  description:
    "Why polycystic kidney disease goes unrecognised in Nigeria, what you can do about it without overstating what is known, and how Hope4PKD will work with government, health leaders and the media to change it.",
  alternates: { canonical: "/awareness" },
};

export default function AwarenessPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Awareness & advocacy"
        title="Most people meet PKD for the first time in a hospital corridor."
        description="By then the questions are urgent and the answers are expensive. Awareness moves that first meeting earlier, to a point where a conversation with a clinician still changes something."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/pkd">Learn about PKD</ActionLink>
          <TextLink href="/pkd/early-detection" surface="dark">
            Early detection and family testing
          </TextLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="The gap" title="We cannot tell you how many Nigerians have PKD." />
          <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
            <Text>
              That is not an oversight on this page. There is no figure we can put here and stand behind,
              because the counting has not been done. Hope4PKD will not fill that space with a number borrowed
              from another country’s population and presented as though it described this one.
            </Text>
            <Text>
              The absence is the point. A condition nobody has measured is a condition that does not appear in
              health budgets, does not get screened for in families that carry it, and does not get recognised
              early enough to matter. Awareness is the first thing that changes any of that.
            </Text>
            <Text>
              So this page asks for something narrower than a campaign: that the people who already know about
              PKD say so accurately, to the people most likely to need it.
            </Text>
          </VStack>
        </Grid>
        {/* Hope4PKD's own statement, not a patient testimonial — we do not have consented quotes to run. */}
        <PullQuote>“PKD is not caused by anything anyone did.”</PullQuote>
      </ContentSection>

      <ContentSection tone="teal" size="spacious">
        <SectionHeading
          eyebrow="What you can do"
          title="Four things that need no budget and no permission."
          description="None of these require Hope4PKD, a launch date or a printed asset. They are available today."
        />
        <StepList steps={steps} />
      </ContentSection>

      <ContentSection tone="navy" id="advocacy">
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading surface="dark" eyebrow="Advocacy" title="PKD patients are invisible in healthcare planning." />
          <VStack align="start" gap={5} color="navy.100" textStyle="lede" maxW="measure">
            <Text>
              A condition that is not counted does not appear in budgets, screening programmes or policy. Hope4PKD will work with government, healthcare leaders and the media to raise awareness of the realities of living with PKD in Nigeria and to push for care that patients can actually reach.
            </Text>
            {/* The concept note's policy asks are bracketed team decisions. Naming them before they are
                agreed would commit the organisation to positions it has not taken. */}
            <Text textStyle="body" color="navy.200">
              The specific policy asks are being agreed. They will be published here, with the evidence behind each one, once the team has settled them.
            </Text>
            <TextLink href="/partner" surface="dark">
              Work with us as a hospital, organisation or journalist
            </TextLink>
          </VStack>
        </Grid>
      </ContentSection>

      <ContentSection tone="white" size="compact">
        <EmptyState
          title="The awareness materials are not ready"
          description="Posters, social cards and a one-page explainer are planned. Anything carrying clinical statements has to clear the same medical-review process as the Knowledge Centre before Hope4PKD puts its name on it and asks people to hand it out. Until then, the pages on this site are the material — share those."
          actionLabel="Visit the Knowledge Centre"
          actionHref="/knowledge"
        />
      </ContentSection>

      <ContentSection>
        <SectionHeading eyebrow="Share these" title="Pages worth sending to someone." />
        <DirectoryList>
          <DirectoryRow href="/pkd" title="What is PKD?">
            The plain-language explanation, including why it runs in families and what the two inherited forms
            mean. The right link for a relative who has just heard the word.
          </DirectoryRow>
          <DirectoryRow href="/pkd/early-detection" title="Early detection and family testing">
            What a diagnosis in the family means for everyone else in it, and how to prepare for the
            appointment where you ask about it.
          </DirectoryRow>
          <DirectoryRow href="/pkd/symptoms-and-diagnosis" title="Symptoms and diagnosis">
            What people notice, when it is worth raising, and how a clinician confirms an answer.
          </DirectoryRow>
          <DirectoryRow href="/for/everyone" title="For everyone else">
            A short route through the same material for someone with no personal connection to PKD who wants
            to understand it anyway.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>

      <StatementBand
        tone="brightTeal"
        eyebrow="Go further"
        statement="Awareness is the cheapest thing on this site. The rest costs money."
      >
        <Text textStyle="lede" color="navy.900" maxW="measure">
          Verification, patient support and the community all need funding and people. If you have more than a
          conversation to give, these are the routes.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/donate" surface="brand">
            Donate
          </ActionLink>
          <ActionLink href="/volunteer" variant="outline" surface="brand">
            Volunteer
          </ActionLink>
          <ActionLink href="/shop" variant="ghost" surface="brand">
            Shop
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
