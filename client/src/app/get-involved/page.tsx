import { HStack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { ActionLink, ContentSection, DirectoryList, DirectoryRow, PageHero, StatementBand } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Volunteer, partner with Hope4PKD as a hospital or organisation, help raise awareness of PKD, or ask about giving.",
  alternates: { canonical: "/get-involved" },
};

export default function GetInvolvedPage() {
  return (
    <Layout>
      <PageHero
        tone="navy"
        eyebrow="Get involved"
        title="Ways to help"
        description="Volunteer, partner with us as a hospital or organisation, help more people learn about PKD, or ask about giving. Each one starts with an email."
      >
        <HStack gap={3} flexWrap="wrap">
          <ActionLink href="/volunteer">Volunteer</ActionLink>
          <ActionLink href="/impact" variant="outline" surface="dark">
            Where the money goes
          </ActionLink>
        </HStack>
      </PageHero>

      <ContentSection size="spacious">
        <DirectoryList>
          <DirectoryRow href="/volunteer" title="Volunteer">
            Give your time and skills to awareness and patient support.
          </DirectoryRow>
          <DirectoryRow href="/partner" title="Partner with us">
            For hospitals, companies and organisations. How a partnership is agreed and recorded.
          </DirectoryRow>
          <DirectoryRow href="/awareness" title="Awareness and advocacy">
            Help more Nigerians learn about PKD, and push for it to be part of healthcare planning.
          </DirectoryRow>
          <DirectoryRow href="/donate" title="Give">
            This website takes no online payment. Email us to ask about giving.
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
