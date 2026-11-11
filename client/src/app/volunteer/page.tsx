import { ContentSection, EmailPanel, FeatureGrid, FeatureItem, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Volunteer", description: "Volunteer with Hope4PKD in community support, content, accessibility and professional services. Email us to start.", alternates: { canonical: "/volunteer" } };

export default function VolunteerPage() {
  return <Layout><PageHero eyebrow="Volunteer" title="Volunteer roles need clear supervision." description="Hope4PKD assigns each role an owner, a scope, safeguarding requirements and an onboarding process before anyone starts in it." /><ContentSection><FeatureGrid columns={3}><FeatureItem title="Community support">Patient-friendly event, peer and caregiver support under programme supervision.</FeatureItem><FeatureItem title="Content & accessibility">Plain-language editing, translation and accessible-content support within the review workflow.</FeatureItem><FeatureItem title="Professional expertise">Clinical, legal, finance, data protection and technical support with conflicts declared.</FeatureItem></FeatureGrid><EmailPanel title="Tell us you want to volunteer" subject="Volunteer">Say what you would like to help with and where you are based.</EmailPanel></ContentSection></Layout>;
}
