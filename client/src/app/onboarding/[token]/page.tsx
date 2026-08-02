import { createHash } from "node:crypto";
import { ContentSection, EmptyState, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { documentUploadReadiness, hasSupabaseAdminConfig } from "@/lib/env";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Secure onboarding", robots: { index: false, follow: false } };

export default async function OnboardingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  let invitation: { id: string; expires_at: string; accepted_at: string | null } | null = null;
  if (hasSupabaseAdminConfig() && token.length >= 32) {
    const hash = createHash("sha256").update(token).digest("hex");
    const admin = getSupabaseAdminClient();
    const { data } = await admin!.from("invitations").select("id, expires_at, accepted_at").eq("token_hash", hash).maybeSingle();
    invitation = data;
  }
  const valid = invitation && !invitation.accepted_at && new Date(invitation.expires_at).getTime() > Date.now();
  return <Layout><PageHero eyebrow="Secure onboarding" title={valid ? "Continue your protected onboarding." : "This invitation is unavailable."} description={valid ? "Confirm your email through the passwordless sign-in step before viewing or saving any case information." : "The invitation may be invalid, expired, already used, or the onboarding service may not yet be active."} /><ContentSection>{valid ? <VStack align="start" gap={5}><Text color="navy.600">The verified invitation is ready for passwordless authentication. No case data is exposed on this URL before the invited email completes sign-in.</Text>{documentUploadReadiness().enabled ? <Text>Secure onboarding and quarantined uploads are available after authentication.</Text> : <EmptyState title="Document upload remains gated" description="The invitation can proceed to identity and consent steps, but production uploads stay off until malware scanning, DPIA, retention, backup and staff MFA controls are operational." />}</VStack> : <EmptyState title="Request a new invitation through Hope4PKD" description="For privacy, this page does not say whether a case exists. Use the contact guidance in your acknowledgement or support pathway." actionLabel="Return to support" actionHref="/support" />}</ContentSection></Layout>;
}
