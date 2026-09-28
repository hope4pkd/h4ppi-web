import { HStack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { ActionLink, ContentSection, DirectoryList, DirectoryRow, PageHero, SectionHeading, StatementBand } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Donate, fundraise, volunteer, partner with Hope4PKD as a hospital or organisation, or shop the merchandise. Every route, and where each one stands today.",
  alternates: { canonical: "/get-involved" },
};

export default function GetInvolvedPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Get involved"
        title="Every kind of help has a place here."
        description="Donate, fundraise, volunteer, partner with us as a hospital or organisation, or shop the merchandise. Each route below says honestly what is open today and what is still being set up."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/donate">Donate</ActionLink>
          <ActionLink href="/impact" variant="outline" surface="dark">
            Where the money goes
          </ActionLink>
        </HStack>
      </PageHero>

      <ContentSection size="spacious">
        <SectionHeading eyebrow="Ways to help" title="Choose the one that fits you." description="Money is one route. Time, a professional relationship and a conversation in the right room are the others." />
        <DirectoryList>
          <DirectoryRow href="/donate" title="Donate">
            Your gift helps pay for dialysis, medication and tests for people who could not otherwise afford them. Online donations open once the payment controls are approved.
          </DirectoryRow>
          <DirectoryRow href="/campaigns" title="Fundraise and campaigns">
            Run a campaign with friends, family, church or workplace. Patient campaigns publish only after verification and with the patient’s consent.
          </DirectoryRow>
          <DirectoryRow href="/volunteer" title="Volunteer">
            Give your time and skills to awareness and patient support.
          </DirectoryRow>
          <DirectoryRow href="/partner" title="Partner with us">
            Hospitals, companies and organisations working for patients: how a partnership is scoped and recorded.
          </DirectoryRow>
          <DirectoryRow href="/shop" title="Shop">
            Wear the cause. The designs are ready; the store opens once the payment service and a merchandise policy are in place.
          </DirectoryRow>
          <DirectoryRow href="/events" title="Events">
            Confirmed public events will be listed with date, place and access details.
          </DirectoryRow>
          <DirectoryRow href="/awareness" title="Awareness and advocacy">
            Tell the people most likely to need it, accurately, and help us push for PKD to count in healthcare planning.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>

      <StatementBand tone="brightTeal" eyebrow="Before you give" statement="Know where the money goes.">
        <Text textStyle="lede" color="navy.900" maxW="measure">
          How funds are raised and used, how patients are selected for assistance, and what will be reported: the transparency page sets out the rules before any figure appears.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/impact" surface="brand">
            Read the transparency page
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
