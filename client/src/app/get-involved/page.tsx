import { HStack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { ActionLink, ContentSection, DirectoryList, DirectoryRow, PageHero, StatementBand } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Donate, fundraise, volunteer, partner with Hope4PKD as a hospital or organisation, or buy the merchandise, and which of these are open today.",
  alternates: { canonical: "/get-involved" },
};

export default function GetInvolvedPage() {
  return (
    <Layout>
      <PageHero
        tone="navy"
        eyebrow="Get involved"
        title="Ways to help"
        description="Donate, fundraise, volunteer, partner with us as a hospital or organisation, or buy the merchandise. Some of these are still being set up, and each one says so below."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/donate">Donate</ActionLink>
          <ActionLink href="/impact" variant="outline" surface="dark">
            Where the money goes
          </ActionLink>
        </HStack>
      </PageHero>

      <ContentSection size="spacious">
        <DirectoryList>
          <DirectoryRow href="/donate" title="Donate">
            Your gift helps pay for dialysis, medication and tests for people who could not otherwise afford them. Online donations are not open yet.
          </DirectoryRow>
          <DirectoryRow href="/campaigns" title="Fundraise and campaigns">
            Raise money with friends, family, church or workplace. A patient campaign goes public only after it is verified and the patient consents.
          </DirectoryRow>
          <DirectoryRow href="/volunteer" title="Volunteer">
            Give your time and skills to awareness and patient support.
          </DirectoryRow>
          <DirectoryRow href="/partner" title="Partner with us">
            For hospitals, companies and organisations. How a partnership is agreed and recorded.
          </DirectoryRow>
          <DirectoryRow href="/shop" title="Shop">
            T-shirts, caps, totes and more. The shop opens once payments and a merchandise policy are in place.
          </DirectoryRow>
          <DirectoryRow href="/events" title="Events">
            Confirmed public events will be listed with date, place and access details.
          </DirectoryRow>
          <DirectoryRow href="/awareness" title="Awareness and advocacy">
            Help more Nigerians learn about PKD, and push for it to be part of healthcare planning.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>

      <StatementBand tone="brightTeal" eyebrow="Before you give" statement="Know where the money goes.">
        <Text textStyle="lede" color="navy.900" maxW="measure">
          The transparency page sets out how funds are raised and used, how patients are selected for help, and what will be reported.
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
