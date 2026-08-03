import { ComingSoonPanel, ContentSection, FeatureGrid, FeatureItem, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Volunteer", description: "Future volunteer pathways for community, operations, content, accessibility, and professional support.", alternates: { canonical: "/volunteer" } };

export default function VolunteerPage() {
  return <Layout><PageHero eyebrow="Volunteer" title="Offer skills where the programme can supervise them safely." description="Volunteer roles publish only when Hope4PKD has a named owner, scope, safeguarding requirements and a realistic onboarding pathway." /><ContentSection><FeatureGrid columns={3}><FeatureItem title="Community support">Patient-friendly event, peer and caregiver support under programme supervision.</FeatureItem><FeatureItem title="Content & accessibility">Plain-language editing, translation and accessible-content support within the review workflow.</FeatureItem><FeatureItem title="Professional expertise">Clinical, legal, finance, data protection and technical support with conflicts declared.</FeatureItem></FeatureGrid><ComingSoonPanel title="Volunteer applications are not open yet" description="Roles remain closed until ownership, screening, safeguarding, confidentiality and supervision are defined. No open role is implied without that operational capacity." /></ContentSection></Layout>;
}
