import { ContentSection, EmptyState, PageHero } from "@/components/common/PublicPage";
import { StatusLookupForm } from "@/components/forms/StatusLookupForm";
import { Layout } from "@/components/layout/Layout";
import { hasSupabaseAdminConfig } from "@/lib/env";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Check case status", description: "Securely view a limited Hope4PKD case status using a case reference and time-limited email code.", robots: { index: false, follow: false } };

export default function CaseStatusPage() {
  return <Layout><PageHero eyebrow="Case status" title="A safe update, protected by email verification." description="Enter the case reference and email address used for the request. A time-limited code is required before any status is displayed." /><ContentSection>{hasSupabaseAdminConfig() ? <Suspense fallback={<div>Loading secure status form…</div>}><StatusLookupForm /></Suspense> : <EmptyState title="Secure status lookup is not active yet" description="Status access will open after the case database, one-time code delivery, privacy controls and operational response guidance are configured." actionLabel="Return to support" actionHref="/support" />}</ContentSection></Layout>;
}
