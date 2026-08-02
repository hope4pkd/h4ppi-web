import { EmptyState, ContentSection, PageHero } from "@/components/common/PublicPage";
import { SupportRequestForm } from "@/components/forms/SupportRequestForm";
import { Layout } from "@/components/layout/Layout";
import { supportIntakeReadiness } from "@/lib/env";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Request support", description: "Submit the minimum information needed for Hope4PKD to review a request for support.", robots: { index: false, follow: true } };

export default function SupportRequestPage() {
  const readiness = supportIntakeReadiness();
  return (
    <Layout>
      <PageHero eyebrow="Support request" title="Tell us how we may help." description="This short form is for initial review only. Do not include medical documents, scans, prescriptions, identity records or bank details." />
      <ContentSection>
        {readiness.enabled ? <SupportRequestForm siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} /> : <EmptyState title="Support intake is not active yet" description="Hope4PKD is confirming eligibility rules, the response window, privacy approvals and operational ownership before accepting personal information. No request is stored while this gate is closed." actionLabel="Understand the support pathway" actionHref="/support" />}
      </ContentSection>
    </Layout>
  );
}
