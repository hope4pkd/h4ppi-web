import { ContentSection, PageHero } from "@/components/common/PublicPage";
import { OperationalEnquiry } from "@/components/forms/OperationalEnquiry";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contact", description: "Send a secure general enquiry to Hope4PKD when operational routing is available.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <Layout><PageHero eyebrow="Contact" title="Send the right message through a safe channel." description="Use this route for general questions. Patient support has a separate minimal-data request, and urgent medical needs should go to a qualified healthcare provider." /><ContentSection><OperationalEnquiry category="general" unavailableTitle="Secure contact routing is being configured" unavailableDescription="The form will open after acknowledgement, routing, spam protection and privacy controls are active. Hope4PKD has not published an unverified telephone number, office location, response time or social account." /></ContentSection></Layout>;
}
