import { HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ContentSection,
  DirectoryList,
  DirectoryRow,
  EmptyState,
  FeatureGrid,
  FeatureItem,
  PageHero,
  SectionHeading,
  StatementBand,
  TextLink,
} from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Find care",
  description:
    "The standard a clinic or nephrologist must meet before Hope4PKD lists it, and what to do while no listing exists.",
  alternates: { canonical: "/find-care" },
};

export default function FindCarePage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Find care"
        title="A referral list is only worth having if it is true."
        description="Hope4PKD will publish clinics and kidney specialists it has verified. Until a facility has been through that check, it will not appear here — an unchecked list sends people a long way for an appointment that was never suitable."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/pkd/early-detection">Prepare for an appointment</ActionLink>
          <TextLink href="/for/health-professionals" surface="dark">
            I work in a clinic
          </TextLink>
        </HStack>
      </PageHero>

      <ContentSection>
        <SectionHeading
          eyebrow="The standard"
          title="What a listing has to survive."
          description="The same discipline the campaigns page applies to money, applied to referrals. Each item is a check somebody has to sign off, not an aspiration."
        />
        <FeatureGrid columns={3}>
          <FeatureItem number="01" title="The service exists as described">
            Confirmed directly with the facility: which kidney services it actually provides, and which it
            refers on.
          </FeatureItem>
          <FeatureItem number="02" title="A named clinician is accountable">
            A qualified professional at the facility agrees to the listing and to being the point of contact
            for it.
          </FeatureItem>
          <FeatureItem number="03" title="Registration is current">
            Professional and facility registration is checked against the relevant register, and rechecked on a
            schedule.
          </FeatureItem>
          <FeatureItem number="04" title="Permission is on record">
            No facility is listed without written permission to publish its name and details.
          </FeatureItem>
          <FeatureItem number="05" title="Costs are described honestly">
            Where cost information is published it comes from the facility, carries the date it was given, and
            is not presented as a quote.
          </FeatureItem>
          <FeatureItem number="06" title="A listing can be removed">
            Facilities can be delisted, and a route exists for patients to report that a listing no longer
            matches reality.
          </FeatureItem>
        </FeatureGrid>
      </ContentSection>

      <ContentSection tone="teal" size="compact">
        <EmptyState
          title="No facility has completed verification yet"
          description="Hope4PKD has not verified any clinic, kidney unit or specialist against the standard above, so there is nothing to list. We would rather show you an empty page than a list we cannot stand behind. Speak with a qualified healthcare professional about where to be seen."
          actionLabel="Read the medical disclaimer"
          actionHref="/medical-disclaimer"
        />
      </ContentSection>

      <ContentSection tone="white">
        <SectionHeading
          eyebrow="In the meantime"
          title="What you can do without a list."
          description="None of this depends on Hope4PKD. It is the part of finding care that you can get right on your own."
        />
        <DirectoryList>
          <DirectoryRow href="/pkd/early-detection" title="Prepare before you go">
            The family history, blood pressure readings and symptom notes worth taking to an appointment, and
            the questions worth asking once you are there.
          </DirectoryRow>
          <DirectoryRow href="/pkd/symptoms-and-diagnosis" title="Know what a diagnosis involves">
            Which symptoms matter, and the three scans a clinician may use, so an unfamiliar word in the room
            is not the first time you hear it.
          </DirectoryRow>
          <DirectoryRow href="/pkd/treatment-and-care" title="Know what care can address">
            Cyst growth, blood pressure, pain, infection and kidney failure — what treatment is aiming at, so
            you can tell whether it is being aimed at yours.
          </DirectoryRow>
          <DirectoryRow href="/help" title="Read the common questions">
            What Hope4PKD is, what it is not, and what happens to any information you share with it.
          </DirectoryRow>
          <DirectoryRow href="/support" title="See how our support pathway works">
            The five stages a request moves through, what gets decided at each, and what a request does not
            guarantee.
          </DirectoryRow>
        </DirectoryList>
        <VStack align="start" gap={3} layerStyle="hairline" pt={6} maxW="measure">
          <Text textStyle="bodySm" color="navy.500">
            Hope4PKD is not a clinical or emergency service and cannot tell you where to be treated. For urgent
            symptoms, contact a qualified healthcare provider or an appropriate local emergency service.
          </Text>
        </VStack>
      </ContentSection>

      <StatementBand
        tone="brightTeal"
        eyebrow="For clinics and specialists"
        statement="If you treat kidney patients, we would rather verify you than guess."
      >
        <Text textStyle="lede" color="navy.900" maxW="measure">
          Verification runs in both directions: it protects patients from a listing that is wrong, and protects
          your clinic from referrals it was never equipped to take.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/for/health-professionals" surface="brand">
            For health professionals
          </ActionLink>
          <ActionLink href="/partner" variant="outline" surface="brand">
            Partner with us
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
