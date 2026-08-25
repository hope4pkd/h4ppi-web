import { ContentSection, EmptyState, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Events", description: "Confirmed Hope4PKD events will appear here after their operating details are verified and approved.", alternates: { canonical: "/events" } };

export default function EventsPage() {
  return <Layout><PageHero eyebrow="Events" title="Only confirmed events appear here." description="Hope4PKD verifies dates, locations, pricing, accessibility, registration ownership and safeguarding information before publishing an event." /><ContentSection><EmptyState title="There are no confirmed public events" description="Hope4PKD has not approved an event with verified operating details. This page will update when it does." actionLabel="Explore other ways to help" actionHref="/partner" /></ContentSection></Layout>;
}
