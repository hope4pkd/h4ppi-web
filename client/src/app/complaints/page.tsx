import { ContentSection, PageHero } from "@/components/common/PublicPage";
import { OperationalEnquiry } from "@/components/forms/OperationalEnquiry";
import { Layout } from "@/components/layout/Layout";
import { Box, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Complaints", description: "How to raise a complaint or concern with Hope4PKD through a protected route.", alternates: { canonical: "/complaints" } };

export default function ComplaintsPage() {
  return <Layout><PageHero eyebrow="Complaints & concerns" title="Raise a concern without sharing more than is necessary." description="Complaints should be acknowledged, assigned, investigated fairly and closed with a clear outcome. Safeguarding emergencies require the appropriate emergency authority." /><ContentSection><VStack align="stretch" gap={4} mb={10}>{["Describe what happened, when it happened and what outcome you are seeking.", "Do not attach medical records, identity documents or bank details to the initial complaint.", "Privacy requests and safeguarding concerns are restricted to the staff role that owns that process.", "The approved complaints owner, acknowledgement target and appeal route must be configured before production launch."].map((item) => <Box key={item} borderTopWidth="1px" borderColor="navy.100" py={4}><Text>{item}</Text></Box>)}</VStack><OperationalEnquiry category="complaint" unavailableTitle="The protected complaints form is not active yet" unavailableDescription="Hope4PKD is confirming the complaints owner, escalation route, safeguarding contacts and response standards before collecting complaint information." /></ContentSection></Layout>;
}
