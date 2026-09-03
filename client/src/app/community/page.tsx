import { HStack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ComingSoonPanel,
  ContentSection,
  DirectoryList,
  DirectoryRow,
  FeatureCard,
  FeatureGrid,
  Ledger,
  LedgerRow,
  PageHero,
  SectionHeading,
  StatementBand,
  TextLink,
} from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { HeartHandshake, ShieldCheck, Users, UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Community",
  description:
    "The moderated peer community Hope4PKD is building for patients, caregivers and families, the rules it will run on, and why no channel is open yet.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Community"
        title="The people who already know what you are about to ask."
        description="PKD is lifelong, and most of what makes it liveable is learned from other people who have it. Hope4PKD is building a moderated space where that knowledge can move between patients, caregivers and families."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/for/patients">If you have PKD</ActionLink>
          <ActionLink href="/for/caregivers" variant="outline" surface="dark">
            If you care for someone
          </ActionLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <SectionHeading
          eyebrow="What it will hold"
          title="Four rooms, not one group chat."
          description="Lumping everyone into a single channel means the newly diagnosed person reads a transplant thread on their first day. These are separated on purpose."
        />
        <FeatureGrid columns={2}>
          <FeatureCard
            icon={<Users size={20} />}
            title="Patients"
            description="People living with PKD, at every stage from a recent scan to years after a transplant. Somewhere to ask the question you did not want to take up appointment time with."
          />
          <FeatureCard
            icon={<HeartHandshake size={20} />}
            title="Caregivers"
            description="The relative coordinating appointments, chasing results and holding the household together. Caregiving is its own experience and it needs its own room."
          />
          <FeatureCard
            icon={<UsersRound size={20} />}
            title="Families"
            description="Siblings, children and parents working out what an inherited condition means for the rest of them, including whether and when to ask about screening."
          />
          <FeatureCard
            icon={<ShieldCheck size={20} />}
            title="Moderation"
            description="Named moderators, a reporting route and a safeguarding escalation path. A health community without them becomes a marketplace within weeks."
          />
        </FeatureGrid>
      </ContentSection>

      <ContentSection tone="teal" size="spacious">
        <SectionHeading
          eyebrow="Ground rules"
          title="What will and will not be allowed."
          description="Published before the doors open rather than after the first incident, so nobody joins under a different impression."
        />
        <Ledger>
          <LedgerRow number="01" title="No medical advice between members">
            Members can say what happened to them. Nobody may tell another member what to take, what to stop
            taking, or whether to have a procedure. That conversation belongs with a qualified professional.
          </LedgerRow>
          <LedgerRow number="02" title="What is said here stays here">
            No screenshots, no forwarding, no reusing another member’s story in a post, a campaign or a talk
            without their explicit permission.
          </LedgerRow>
          <LedgerRow number="03" title="No selling, no soliciting">
            No products, no treatments, no clinics touting for patients, and no fundraising appeals from
            individuals. Hope4PKD campaigns go through verification precisely so they do not have to be pitched
            in a support group.
          </LedgerRow>
          <LedgerRow number="04" title="Safeguarding overrides privacy">
            Where a member appears to be at risk of serious harm, moderators act under the safeguarding policy.
            That is the one circumstance in which something said in the community leaves it.
          </LedgerRow>
          <LedgerRow number="05" title="Moderators are named">
            You will know who is moderating, and there is a route to complain about a moderation decision,
            including one that goes past the moderator.
          </LedgerRow>
        </Ledger>
        <TextLink href="/safeguarding">Read the safeguarding policy</TextLink>
      </ContentSection>

      <ContentSection tone="white" size="compact">
        <ComingSoonPanel
          title="No community channel is open yet"
          description="Opening a health community before its moderators, reporting route and safeguarding escalation exist puts vulnerable people in a room with nobody watching. Hope4PKD will publish the channel here once those are named and in place — and nowhere else, so an invitation claiming to be ours can be checked against this page."
        />
      </ContentSection>

      <ContentSection>
        <SectionHeading eyebrow="Until then" title="Where people are finding each other." />
        <DirectoryList>
          <DirectoryRow href="/help" title="Read what other people asked first">
            The questions patients and caregivers bring to us most often, answered plainly.
          </DirectoryRow>
          <DirectoryRow href="/pkd" title="Get the vocabulary">
            Walking into a room already knowing what ADPKD, ARPKD and a cyst are makes the first conversation
            considerably less isolating.
          </DirectoryRow>
          <DirectoryRow href="/events" title="Check for a confirmed event">
            Hope4PKD publishes an event only once its date, venue, cost and safeguarding arrangements are
            confirmed.
          </DirectoryRow>
          <DirectoryRow href="/volunteer" title="Help build it">
            Moderation is one of the roles being defined. Community is not something a small team can run for
            people; it gets run with them.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>

      <StatementBand eyebrow="Nobody should be the only one" statement="No one should navigate PKD alone.">
        <Text textStyle="lede" color="navy.100" maxW="measure">
          It is the reason Hope4PKD exists, and community is the part of it that does not depend on funding,
          verification or a payment provider — only on getting it right before it opens.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/support" surface="dark">
            How we help
          </ActionLink>
          <ActionLink href="/about" variant="outline" surface="dark">
            About Hope4PKD
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
