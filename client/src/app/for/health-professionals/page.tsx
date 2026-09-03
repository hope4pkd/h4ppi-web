import { Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ComingSoonPanel,
  ContentSection,
  DirectoryList,
  DirectoryRow,
  Eyebrow,
  PageHero,
  SectionHeading,
  StatementBand,
  StepList,
  TextLink,
} from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";

const referralSteps = [
  {
    title: "You raise the case",
    description:
      "A clinician or clinic flags a PKD patient whose barrier to care is practical rather than clinical — cost, coordination, distance, follow-up.",
  },
  {
    title: "The patient consents",
    description:
      "Nothing proceeds on a referral alone. The patient or their authorised representative has to agree, and their consent covers what may be shared and with whom.",
  },
  {
    title: "Hope4PKD assesses",
    description:
      "Programme and medical reviewers see only the parts of the case their role requires. Cost items are validated against documentation, not against an estimate.",
  },
  {
    title: "The outcome comes back",
    description:
      "You are told what was decided, within the limits of the patient’s consent. A declined case is stated as declined rather than left open.",
  },
];

export const metadata: Metadata = {
  title: "For health professionals",
  description:
    "What Hope4PKD is and is not, how clinical referral and clinic verification will work, and where nephrologists and other health professionals are needed.",
  alternates: { canonical: "/for/health-professionals" },
};

export default function ForHealthProfessionalsPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="For health professionals"
        title="We are not a clinical service, and we will not behave like one."
        description="Hope4PKD is a patient support organisation working on polycystic kidney disease in Nigeria. This page is the honest version of what we do, what we deliberately do not do, and where your involvement would change something."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/partner">Partnership pathways</ActionLink>
          <TextLink href="/find-care" surface="dark">
            How clinic verification works
          </TextLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <SectionHeading eyebrow="Scope" title="The boundary, stated first." />
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
          <VStack layerStyle="panelDark" align="start" gap={4}>
            <Eyebrow surface="dark">What Hope4PKD does</Eyebrow>
            <Heading as="h3" textStyle="cardTitle" color="white">
              Coordination, verification and funding
            </Heading>
            <VStack align="start" gap={3} color="navy.100" textStyle="body">
              <Text>Navigates patients through requests, assessment and follow-up as a single pathway.</Text>
              <Text>Validates case costs against documentation before any money is allocated.</Text>
              <Text>Publishes plain-language PKD information with its external source named on the page.</Text>
              <Text>Records allocations and disbursements separately, and reports against them.</Text>
            </VStack>
          </VStack>
          <VStack layerStyle="panelPink" align="start" gap={4}>
            <Eyebrow>What Hope4PKD does not do</Eyebrow>
            <Heading as="h3" textStyle="cardTitle" color="navy.900">
              Anything clinical
            </Heading>
            <VStack align="start" gap={3} color="navy.700" textStyle="body">
              <Text>Does not diagnose, prescribe, advise on treatment or triage symptoms.</Text>
              <Text>Does not label any page medically reviewed — no reviewer programme exists yet.</Text>
              <Text>Does not hold or transmit clinical records; the protected route for them is not built.</Text>
              <Text>Does not recommend a clinic it has not verified, which currently means any clinic.</Text>
            </VStack>
          </VStack>
        </Grid>
      </ContentSection>

      <ContentSection tone="teal" size="spacious">
        <SectionHeading
          eyebrow="Where you are needed"
          title="Four things only a clinician can do for this."
          description="Each of these is currently a gap rather than a programme, which is precisely why naming them is useful."
        />
        <DirectoryList>
          <DirectoryRow href="/knowledge" title="Medically review the Knowledge Centre">
            No article carries a reviewed label, because no qualified reviewer, independence check or
            next-review date exists to put behind one. That is the blocker on the whole content programme.
          </DirectoryRow>
          <DirectoryRow href="/find-care" title="Put your clinic through verification">
            A referral list that has not been checked sends patients a long way for an appointment that was
            never suitable. The standard a listing has to survive is published in full.
          </DirectoryRow>
          <DirectoryRow href="/partner" title="Build a referral pathway with us">
            Defined roles, patient dignity and public accountability, with the clinical judgement staying where
            it belongs.
          </DirectoryRow>
          <DirectoryRow href="/impact" title="Hold the reporting to a standard">
            Every published figure is meant to carry its reporting period, definition, method and approval.
            Scrutiny from people who read outcome data for a living is the point of publishing it.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>

      <ContentSection tone="white">
        <SectionHeading
          eyebrow="Referral"
          title="How a referral would run."
          description="Written down now so it can be argued with now, rather than discovered by a patient later."
        />
        <StepList steps={referralSteps} />
        <ComingSoonPanel
          title="There is no referral route open yet"
          description="Referral needs the case-management service, a consent record and a protected way to receive documents. None of those exist in this site, and a clinician’s time is too expensive to spend on a form that goes nowhere. The partnership page explains what can be discussed in the meantime."
        />
      </ContentSection>

      <StatementBand
        tone="brightTeal"
        eyebrow="One request"
        statement="Tell your PKD patients their relatives can ask about it."
      >
        <Text textStyle="lede" color="navy.900" maxW="measure">
          It costs a sentence at the end of a consultation, and it reaches the siblings and children who
          otherwise never learn that the condition in their family is an inherited one.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/pkd/early-detection" surface="brand">
            The page to send them
          </ActionLink>
          <ActionLink href="/partner" variant="outline" surface="brand">
            Partner with us
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
