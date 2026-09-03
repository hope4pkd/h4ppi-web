import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ComingSoonPanel,
  ContentSection,
  DirectoryList,
  DirectoryRow,
  FaqList,
  Ledger,
  LedgerRow,
  MediaFrame,
  PageHero,
  SectionHeading,
  StatementBand,
  TextLink,
  type Faq,
} from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import caregiverImage from "@public/assets/images/patient-caregiver-hands.png";

const faqs = [
  {
    question: "I am not a relative. Does any of this apply to me?",
    answer:
      "Yes. Caregiving is defined here by what you do, not by how you are related. If you are the person chasing results, arranging transport or keeping the appointments straight, this page is for you.",
  },
  {
    question: "Can I ask Hope4PKD for support on someone else’s behalf?",
    answer:
      "When intake opens, yes — the first request asks your relationship to the patient precisely because it is often not the patient who makes it. Consent from the patient is still required before a case proceeds.",
  },
  {
    question: "Should I send you their medical records?",
    answer:
      "No, and not just because we cannot receive them yet. Documents belonging to someone else need their consent and a protected route. Nothing on this site is that route.",
  },
  {
    question: "Should I be tested too?",
    answer:
      "That depends on how you are related. PKD is inherited, so a parent, brother, sister or child of a diagnosed person has reason to ask a clinician about it. A spouse or an unrelated carer does not inherit the risk by proximity.",
  },
  {
    question: "How do I talk to the rest of the family about it?",
    answer:
      "Start with the fact rather than the fear: it is inherited, it is not caused by anything anyone did, and there are things a clinician can check. The awareness page is written to be shared for exactly this conversation.",
  },
] as const satisfies readonly Faq[];

export const metadata: Metadata = {
  title: "For caregivers",
  description:
    "A route through Hope4PKD for the person coordinating someone else's PKD care: what the role involves, what to read, and what you are entitled to ask for yourself.",
  alternates: { canonical: "/for/caregivers" },
};

export default function ForCaregiversPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="For caregivers"
        title="Someone has to hold all of it. Usually that is you."
        description="Appointments, results, medicines, money, and the emotional weather of a household. Caregiving for someone with PKD is a role nobody applies for and nobody explains. This is the short route through what helps."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/pkd">Understand the condition</ActionLink>
          <ActionLink href="/community" variant="outline" surface="dark">
            Find other caregivers
          </ActionLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="The role" title="You are doing a job that has no handover notes." />
          <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
            <Text>
              PKD is lifelong, so caregiving for it is not a short crisis you get through. It is a long
              administrative and emotional load that arrives without training, without a title and usually
              without anyone asking whether you had capacity for it.
            </Text>
            <Text>
              Two things follow from that. The first is that the practical parts are learnable, and learning
              them early makes the whole thing measurably easier. The second is that your own health is part of
              the picture, not a distraction from it.
            </Text>
          </VStack>
        </Grid>
        <Box>
          <MediaFrame
            src={caregiverImage}
            alt="A patient and a caregiver holding hands"
            ratio={1983 / 793}
          />
        </Box>
      </ContentSection>

      <ContentSection tone="teal" size="spacious">
        <SectionHeading
          eyebrow="The practical part"
          title="Six jobs nobody names, and how to make them smaller."
          description="These are the tasks that quietly consume a caregiver’s year. None of them is difficult; all of them get harder when they are improvised each time."
        />
        <Ledger>
          <LedgerRow number="01" title="Keep one record, not six">
            One folder, physical or on a phone, holding scan reports, letters, prescriptions and blood pressure
            readings with dates. Every new clinician asks the same questions, and the folder answers them
            faster than either of you can.
          </LedgerRow>
          <LedgerRow number="02" title="Own the calendar">
            Appointments, repeat prescriptions and follow-ups. Whoever holds the calendar is doing the single
            most valuable piece of caregiving there is, and it should be an agreed job rather than a default
            one.
          </LedgerRow>
          <LedgerRow number="03" title="Know what the medicines are for">
            Not the pharmacology — the purpose. Which one is protecting blood pressure, which is for pain,
            which must not be taken with the others. Ask the prescriber to say it in a sentence you can repeat.
          </LedgerRow>
          <LedgerRow number="04" title="Track the money as it happens">
            Costs arrive in small pieces and are impossible to reconstruct afterwards. A running list of what
            was spent and when is also what any future support request would need.
          </LedgerRow>
          <LedgerRow number="05" title="Agree what you may ask about">
            Being trusted with someone’s care is not the same as being authorised to discuss it. Settle
            explicitly what you can ask a clinician, and what you may tell the wider family, before you need to.
          </LedgerRow>
          <LedgerRow number="06" title="Say out loud when you are past capacity">
            Not as a confession. As information the household needs in order to redistribute something before
            it drops.
          </LedgerRow>
        </Ledger>
      </ContentSection>

      <ContentSection tone="white">
        <SectionHeading eyebrow="Where to go on this site" title="What to read, and why." />
        <DirectoryList>
          <DirectoryRow href="/pkd" title="What is PKD?">
            The condition in plain language. Understanding what the cysts are doing is what turns you from a
            passenger in the appointment into a participant.
          </DirectoryRow>
          <DirectoryRow href="/pkd/treatment-and-care" title="Treatment and care">
            What care is aiming at, the complications it watches for, and what happens if kidney function
            declines. The page to read before a conversation about dialysis or transplantation.
          </DirectoryRow>
          <DirectoryRow href="/pkd/early-detection" title="Early detection and family testing">
            What the diagnosis means for the rest of the family, and how to prepare for the appointment where
            somebody asks about it.
          </DirectoryRow>
          <DirectoryRow href="/support/process" title="How a support case would work">
            What Hope4PKD would assess at each stage, and what information is asked for at which point.
          </DirectoryRow>
          <DirectoryRow href="/awareness" title="Talking to the rest of the family">
            The conversation about an inherited condition, and pages written to be forwarded rather than
            paraphrased.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>

      <ContentSection tone="pink" size="compact">
        <SectionHeading eyebrow="For you, specifically" title="Your health is not the secondary case." />
        <VStack align="start" gap={4} maxW="measure">
          <Text textStyle="lede" color="navy.700">
            Caregivers postpone their own appointments, their own blood pressure checks and their own rest, and
            call it priorities. When the caregiver goes down, the patient loses the person holding the folder,
            the calendar and the family.
          </Text>
          <Text textStyle="body" color="navy.600">
            If you are a blood relative of the person you care for, this matters twice: PKD is inherited, and
            you may have reason to ask a clinician about yourself as well.
          </Text>
          <TextLink href="/pkd/early-detection">What a family history means</TextLink>
        </VStack>
      </ContentSection>

      <ContentSection>
        <SectionHeading eyebrow="Questions caregivers ask" title="Straight answers." />
        <FaqList items={faqs} />
        <ComingSoonPanel
          title="There is no caregiver support line yet"
          description="A route for caregivers to reach a person rather than a page needs staffing, a response standard and a safeguarding escalation path that Hope4PKD has not yet put in place. When it exists it will be published here, with the hours it actually operates."
        />
      </ContentSection>

      <StatementBand eyebrow="You are not the only one" statement="The caregiver is the second patient.">
        <Text textStyle="lede" color="navy.100" maxW="measure">
          Hope4PKD was started by someone who did this job before there was anywhere to look it up.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/about/founder-story" surface="dark">
            Read the founder’s story
          </ActionLink>
          <ActionLink href="/support" variant="outline" surface="dark">
            How Hope4PKD helps
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
