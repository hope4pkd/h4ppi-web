import { HStack, Text } from "@chakra-ui/react";
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
  PageHero,
  SectionHeading,
  StatementBand,
  TextLink,
  type Faq,
} from "@/components/common/PublicPage";
import { SourceNote } from "@/components/common/SourceNote";
import { Layout } from "@/components/layout/Layout";
import { pkdSource } from "@/content/pkd";

const faqs = [
  {
    question: "Can Hope4PKD tell me whether I have PKD?",
    answer:
      "No. Hope4PKD does not diagnose, run scans, read results or prescribe anything. Only a qualified healthcare professional can tell you what your scan and your blood pressure mean.",
  },
  {
    question: "If I ask for support, will I get money?",
    answer:
      "Not automatically, and not soon. A request begins a review. Whether any support follows depends on eligibility, verification of the case and its costs, and whether Hope4PKD has the capacity at the time. The support pathway is also not open yet.",
  },
  {
    question: "Do I have to make my story public to be helped?",
    answer:
      "No. A public campaign is one route, not the route, and it only ever runs with current consent covering exactly how much of your identity and story appears. Private medical records never form part of a public campaign.",
  },
  {
    question: "What should I not send you?",
    answer:
      "Medical records, scan results, identity documents and bank details. There is no route on this site that should receive them, and anything that asks you for them is not us.",
  },
  {
    question: "Why does so much of this site say “coming soon”?",
    answer:
      "Because it is true. Support intake, case status and donations all need a service Hope4PKD is still building. Marking them honestly costs you a click; pretending they work would cost you an afternoon.",
  },
] as const satisfies readonly Faq[];

export const metadata: Metadata = {
  title: "For patients",
  description:
    "A route through Hope4PKD for people living with polycystic kidney disease: what to do first after a diagnosis, what this site can help with, and what it cannot.",
  alternates: { canonical: "/for/patients" },
};

export default function ForPatientsPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="For patients"
        title="You have PKD. Start here."
        description="Whether the diagnosis arrived this week or years ago, this page is the short route through the rest of the site — what is worth reading first, what Hope4PKD can help with, and what it cannot."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/pkd">Understand PKD</ActionLink>
          <ActionLink href="/support" variant="outline" surface="dark">
            How we help
          </ActionLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <SectionHeading
          eyebrow="The first weeks"
          title="Six things worth doing early."
          description="None of these require money, an appointment you cannot get, or anything from Hope4PKD. They are the ground you can cover on your own while everything else is still uncertain."
        />
        <Ledger>
          <LedgerRow number="01" title="Get the diagnosis in writing">
            Ask for the scan report and the letter, and keep your own copy. You will be asked to repeat this
            story to every new clinician you meet, and memory is a poor substitute for the document.
          </LedgerRow>
          <LedgerRow number="02" title="Find out what your blood pressure is">
            High blood pressure is common in PKD, it can damage the kidneys further if it is not treated, and
            controlling it is one of the most important parts of PKD care. Get a number, write it down, and
            keep getting it.
          </LedgerRow>
          <LedgerRow number="03" title="Tell your siblings and your children">
            This is the hardest one and the most useful. PKD is inherited, so a diagnosis is information about
            them as well as about you. What they do with it is theirs to decide; not knowing is not a choice
            they got to make.
          </LedgerRow>
          <LedgerRow number="04" title="Learn what treatment is aiming at">
            PKD has no cure yet, and that fact makes people stop reading. Care still has clear targets — cyst
            growth, blood pressure, pain, infection, and what happens if kidney function declines. Knowing them
            lets you tell whether yours are being addressed.
          </LedgerRow>
          <LedgerRow number="05" title="Ask what each thing costs before you agree to it">
            Scans, medicines and follow-up appointments accumulate. Asking the price in the room is not rude,
            and it is a great deal easier than unwinding a commitment later.
          </LedgerRow>
          <LedgerRow number="06" title="Do not do it silently">
            PKD is lifelong. The people who manage it best are almost never the ones managing it alone.
          </LedgerRow>
        </Ledger>
        <SourceNote publisher={pkdSource.publisher} title={pkdSource.title} href={pkdSource.href} />
      </ContentSection>

      <ContentSection tone="teal" size="spacious">
        <SectionHeading eyebrow="Where to go on this site" title="Read these, in this order." />
        <DirectoryList>
          <DirectoryRow href="/pkd" title="What is PKD?">
            What the cysts are doing, why it runs in families, and the difference between the adult and
            childhood forms. Start here even if you were diagnosed years ago.
          </DirectoryRow>
          <DirectoryRow href="/pkd/symptoms-and-diagnosis" title="Symptoms and diagnosis">
            What people notice, what is worth raising with a professional, and how the three scans differ.
          </DirectoryRow>
          <DirectoryRow href="/pkd/treatment-and-care" title="Treatment and care">
            What care can do about cyst growth and blood pressure, how pain and infections are handled, and
            what happens when kidney function declines.
          </DirectoryRow>
          <DirectoryRow href="/support/process" title="What Hope4PKD would decide, and when">
            Every stage of a support case, what is assessed at each one, and what a decision at that stage
            actually means for you.
          </DirectoryRow>
          <DirectoryRow href="/community" title="Community">
            The moderated space being built for patients, caregivers and families, and the rules it will run
            on.
          </DirectoryRow>
          <DirectoryRow href="/help" title="Common questions">
            What Hope4PKD is, what happens to information you share, and why parts of this site are not open.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>

      <ContentSection tone="white" size="compact">
        <ComingSoonPanel
          title="Support requests are not open yet"
          description="Intake needs the case-management service Hope4PKD is still building, along with agreed eligibility rules and a response time it can actually meet. Until then there is no form here and no queue you are missing. Everything above is available today."
        />
      </ContentSection>

      <ContentSection>
        <SectionHeading eyebrow="Questions patients ask" title="Straight answers." />
        <FaqList items={faqs} />
        <TextLink href="/help">More questions and answers</TextLink>
      </ContentSection>

      <StatementBand eyebrow="Why this exists" statement="No one should navigate PKD alone.">
        <Text textStyle="lede" color="navy.100" maxW="measure">
          Hope4PKD grew out of one family’s experience of dialysis and transplantation, and of finding that
          goodwill was easy to come by and coordination was not.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/about/founder-story" surface="dark">
            Read the founder’s story
          </ActionLink>
          <ActionLink href="/for/caregivers" variant="outline" surface="dark">
            For the person caring for me
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
