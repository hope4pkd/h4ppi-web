import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { CampaignsHeroSection } from "@/components/campaigns/CampaignsHeroSection";
import { CampaignTransparency } from "@/components/campaigns/CampaignTransparency";
import { CampaignsGrid } from "@/components/campaigns/CampaignsGrid";
import { HowToSupport } from "@/components/campaigns/HowToSupport";

export const metadata: Metadata = {
  title: "Campaigns | Hope4PKD",
  description:
    "Verified fundraising campaigns and awareness initiatives for PKD patients in Nigeria — dialysis support, transplant initiatives, emergency medical support, and more.",
};

export default function CampaignsPage() {
  return (
    <Layout>
      <CampaignsHeroSection />
      <CampaignTransparency />
      <CampaignsGrid />
      <HowToSupport />
    </Layout>
  );
}
