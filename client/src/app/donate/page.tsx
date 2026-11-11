import { ContentSection, DirectoryList, DirectoryRow, EmailPanel, PageHero, SectionHeading } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Give",
  description: "Hope4PKD does not take donations through this website. How to ask about giving by email, and the policies that govern donated money.",
  alternates: { canonical: "/donate" },
};

// No checkout, no bank details and no Donate button: the site takes no payment. Bank details may be
// added only for an account in the organisation's registered name, supplied by the owner.
export default function DonatePage() {
  return (
    <Layout>
      <PageHero
        tone="navy"
        eyebrow="Give"
        title="Giving to Hope4PKD"
        description="Hope4PKD does not take donations through this website. If you would like to give, or to fund part of the work, email us and we will reply."
      />
      <ContentSection>
        <EmailPanel title="Ask about giving" subject="Donation">
          Tell us who you are and what you would like to support. Please do not send card or bank details by email.
        </EmailPanel>
      </ContentSection>
      <ContentSection tone="white">
        <SectionHeading title="How donated money is handled" />
        <DirectoryList>
          <DirectoryRow href="/donations" title="Donations policy">
            How Hope4PKD handles donated money and what a donor is told.
          </DirectoryRow>
          <DirectoryRow href="/refunds" title="Refunds policy">
            When a donation can be returned, and how to ask.
          </DirectoryRow>
          <DirectoryRow href="/campaign-surplus" title="Campaign surplus policy">
            What happens to money raised beyond a campaign’s validated costs, and who decides it.
          </DirectoryRow>
          <DirectoryRow href="/impact" title="Transparency">
            How funds are raised and used, and what will be reported.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>
    </Layout>
  );
}
