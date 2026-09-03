import { Grid, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ContentSection,
  DirectoryList,
  DirectoryRow,
  Ledger,
  LedgerRow,
  PageHero,
  SectionHeading,
  StatementBand,
  TextLink,
} from "@/components/common/PublicPage";
import { SourceNote } from "@/components/common/SourceNote";
import { KidneyComparison } from "@/components/pkd/KidneyComparison";
import { Layout } from "@/components/layout/Layout";
import { pkdInBrief, pkdSource } from "@/content/pkd";

export const metadata: Metadata = {
  title: "For everyone",
  description:
    "Polycystic kidney disease explained for people who do not have it: what it is, why it is so often missed, and what someone with no personal connection to it can usefully do.",
  alternates: { canonical: "/for/everyone" },
};

export default function ForEveryonePage() {
  return (
    <Layout>
      <PageHero
        eyebrow="For everyone"
        title="You probably do not have PKD. Read this anyway."
        description="Polycystic kidney disease is inherited, and its common adult form is the most common inherited kidney disease there is. It also runs quietly for years. Ten minutes here may be useful to a family you know before it is useful to them."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/pkd">The full explanation</ActionLink>
          <TextLink href="/awareness" surface="dark">
            What you can do about it
          </TextLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: 8, lg: 16 }}>
          <SectionHeading eyebrow="In short" title="Cysts grow, and the kidneys have less room to work." />
          <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
            <Text>{pkdInBrief}</Text>
            <Text>
              Nobody catches PKD and nobody causes it. Diet, lifestyle and personal choices do not bring it on.
              It comes from a changed gene, almost always inherited from a parent, which is why it appears again
              and again in the same family.
            </Text>
            <Text>
              There is no cure yet. Treatment aims at protecting kidney function, mainly by controlling blood
              pressure, and at handling the complications along the way.
            </Text>
          </VStack>
        </Grid>
        <KidneyComparison />
      </ContentSection>

      <ContentSection tone="teal" size="spacious">
        <SectionHeading
          eyebrow="Why it stays hidden"
          title="Four reasons PKD goes unrecognised for years."
          description="Understanding these is most of what separates someone who is useful to a diagnosed friend from someone who is not."
        />
        <Ledger>
          <LedgerRow number="01" title="It arrives in adulthood, quietly">
            Signs of the common adult form often begin between the ages of 30 and 40. Someone can live with it
            for years without knowing, which is long enough for the whole thing to look like it appeared
            overnight when it is finally found.
          </LedgerRow>
          <LedgerRow number="02" title="The early signs belong to everything else">
            High blood pressure, back or side pain, headaches, repeated urinary infections. Every one of them
            has a dozen ordinary explanations, and PKD is rarely the first one anybody reaches for.
          </LedgerRow>
          <LedgerRow number="03" title="Families do not always know their own history">
            When one parent has the dominant form, each child has a 50% chance of inheriting it. That
            information only helps if somebody in the family says it out loud, and often nobody has.
          </LedgerRow>
          <LedgerRow number="04" title="By the time it is loud, it is late">
            Nearly half of people with the condition have kidney failure by the age of 60, at which point
            dialysis or a transplant is needed. That is the point at which most people first hear the name.
          </LedgerRow>
        </Ledger>
        <SourceNote publisher={pkdSource.publisher} title={pkdSource.title} href={pkdSource.href} />
      </ContentSection>

      <ContentSection tone="white">
        <SectionHeading eyebrow="Where to go next" title="Depending on why you came here." />
        <DirectoryList>
          <DirectoryRow href="/awareness" title="Somebody should know this">
            The four things worth doing about PKD that need no budget and nobody’s permission, starting with
            your own family.
          </DirectoryRow>
          <DirectoryRow href="/pkd/early-detection" title="Someone in my family has it">
            What a family history means for relatives, and how to prepare for the appointment where you ask
            about it.
          </DirectoryRow>
          <DirectoryRow href="/for/caregivers" title="I am helping someone through it">
            The practical and emotional load of coordinating another person’s care, and how to make it smaller.
          </DirectoryRow>
          <DirectoryRow href="/donate" title="I want to fund the work">
            How Hope4PKD intends to handle donated money, and why online donations are not open yet.
          </DirectoryRow>
          <DirectoryRow href="/volunteer" title="I want to give time">
            The roles being defined in community support, content, accessibility and professional services.
          </DirectoryRow>
          <DirectoryRow href="/about" title="Who is behind this">
            Why Hope4PKD exists, how it is governed, and what it publishes about itself.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>

      <StatementBand
        tone="brightTeal"
        eyebrow="The useful thing"
        statement="Somebody has to be the person who says it is inherited."
      >
        <Text textStyle="lede" color="navy.900" maxW="measure">
          Most families with PKD in them find that out one member at a time, years apart. The conversation that
          shortens that gap is not a medical one, and it does not need a professional to start it.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/awareness" surface="brand">
            Raise awareness
          </ActionLink>
          <ActionLink href="/shop" variant="outline" surface="brand">
            Shop
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
