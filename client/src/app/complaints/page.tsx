import { ComingSoonPanel, ContentSection, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { Box, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Complaints", description: "How to raise a complaint or concern with Hope4PKD through a protected route.", alternates: { canonical: "/complaints" } };

export default function ComplaintsPage() {
  return <Layout><PageHero eyebrow="Complaints & concerns" title="Share a complaint without unnecessary personal data." description="Hope4PKD will acknowledge, assign and investigate complaints, then close each one with a clear outcome. For a safeguarding emergency, contact the appropriate emergency authority." /><ContentSection><VStack align="stretch" gap={4} mb={10}>{["Describe what happened, when it happened and what outcome you are seeking.", "Do not attach medical records, identity documents or bank details to the initial complaint.", "Only designated staff can access privacy requests and safeguarding concerns.", "Hope4PKD must approve the complaints owner, acknowledgement time and appeal route before the form opens."].map((item) => <Box key={item} borderTopWidth="1px" borderColor="navy.100" py={4}><Text>{item}</Text></Box>)}</VStack><ComingSoonPanel title="The complaints form is not open yet" description="Hope4PKD is confirming the complaints owner, escalation route, safeguarding contacts and response standards before collecting complaint information." /></ContentSection></Layout>;
}
