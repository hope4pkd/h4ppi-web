import { ContentSection, EmptyState, FeatureGrid, FeatureItem, PageHero } from "@/components/common/PublicPage";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Layout } from "@/components/layout/Layout";
import { enquiryReadiness } from "@/lib/env";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Partner with us", description: "Explore responsible clinical, community, corporate, funding, and technical partnerships with Hope4PKD.", alternates: { canonical: "/partner" } };

export default function PartnerPage() {
  const ready = enquiryReadiness();
  return <Layout><PageHero eyebrow="Partner with us" title="Help build the support system around the patient." description="We are developing a responsible network of healthcare, community, funding and technical partners around a shared standard of dignity and accountability." /><ContentSection><FeatureGrid columns={3}><FeatureItem title="Healthcare providers">Referral pathways, verification, diagnostics, treatment and responsible continuity of care.</FeatureItem><FeatureItem title="Patient & community groups">Trusted education, caregiver support, listening and community connection.</FeatureItem><FeatureItem title="Corporate & institutional funders">Restricted or general support with defined reporting and no inappropriate patient access.</FeatureItem><FeatureItem title="Professional bodies">Medical review, clinical governance and evidence-led public education.</FeatureItem><FeatureItem title="Technology & operations">Privacy, security, accessible service delivery and resilient programme infrastructure.</FeatureItem><FeatureItem title="Research & policy">Ethical aggregate learning and advocacy without repurposing patient data.</FeatureItem></FeatureGrid>{ready.enabled ? <EnquiryForm category="partnership" siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} /> : <EmptyState title="Secure partnership enquiries are being configured" description="The form will open after routing, acknowledgement, spam protection and data-handling approvals are operational. No unverified partner logos or relationships are displayed in the meantime." actionLabel="See our accountability approach" actionHref="/impact" />}</ContentSection></Layout>;
}
