import { ContentSection, EmptyState, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Events", description: "Confirmed Hope4PKD events will appear here after operational approval.", alternates: { canonical: "/events" } };

export default function EventsPage() {
  return <Layout><PageHero eyebrow="Events" title="Only confirmed events belong on the calendar." description="Dates, locations, pricing, accessibility, registration ownership and safeguarding information must be verified before an event is published." /><ContentSection><EmptyState title="There are no confirmed public events" description="The previously unverified walk promotion and pricing have been removed. This page will update when Hope4PKD approves a real event and its operating details." actionLabel="Explore other ways to help" actionHref="/partner" /></ContentSection></Layout>;
}
