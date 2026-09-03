import { ComingSoonPanel, ContentSection, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact", description: "General enquiries will open after Hope4PKD approves secure contact routing and privacy controls.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <Layout><PageHero eyebrow="Contact" title="Use the right channel for each question." description="Use this page for general questions. Patient support has a separate minimal-data request, and urgent medical needs should go to a qualified healthcare provider." /><ContentSection><ComingSoonPanel title="The contact form is not open yet" description="The form will open after acknowledgement, routing, spam protection and privacy controls are active. Hope4PKD will publish contact details only after verification." /></ContentSection></Layout>;
}
