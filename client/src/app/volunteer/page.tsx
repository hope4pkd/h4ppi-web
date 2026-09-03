import { ComingSoonPanel, ContentSection, FeatureGrid, FeatureItem, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Volunteer", description: "Planned volunteer roles in community support, operations, content, accessibility and professional services.", alternates: { canonical: "/volunteer" } };

export default function VolunteerPage() {
  return <Layout><PageHero eyebrow="Volunteer" title="Volunteer roles need clear supervision." description="Hope4PKD will publish a role only after assigning its owner, scope, safeguarding requirements and onboarding process." /><ContentSection><FeatureGrid columns={3}><FeatureItem title="Community support">Patient-friendly event, peer and caregiver support under programme supervision.</FeatureItem><FeatureItem title="Content & accessibility">Plain-language editing, translation and accessible-content support within the review workflow.</FeatureItem><FeatureItem title="Professional expertise">Clinical, legal, finance, data protection and technical support with conflicts declared.</FeatureItem></FeatureGrid><ComingSoonPanel title="Volunteer applications are not open yet" description="Applications will open after Hope4PKD defines ownership, screening, safeguarding, confidentiality and supervision for each role." /></ContentSection></Layout>;
}
