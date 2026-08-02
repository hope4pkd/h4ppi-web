import { ContentSection, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { Box, Text } from "@chakra-ui/react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Donation confirmation", robots: { index: false, follow: false } };

export default async function DonationConfirmationPage({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const { reference } = await searchParams;
  const admin = getSupabaseAdminClient();
  const { data } = admin && reference ? await admin.from("donations").select("status, currency, amount_minor, confirmed_at").eq("provider_reference", reference).maybeSingle() : { data: null };
  const confirmed = data?.status === "confirmed";
  return <Layout><PageHero eyebrow="Donation confirmation" title={confirmed ? "Your donation is confirmed." : "Your payment is being verified."} description={confirmed ? "The signed provider event has been recorded. A receipt and acknowledgement will follow through the approved email workflow." : "A browser return is not proof of payment. Hope4PKD waits for a signature-verified Paystack webhook before confirming a donation."} /><ContentSection>{confirmed && <Box bg="teal.50" borderWidth="1px" borderColor="teal.200" borderRadius="2xl" p={8} maxW="xl"><Text color="action.700" fontWeight="800">Confirmed amount</Text><Text fontSize="4xl" fontWeight="800" mt={2}>{new Intl.NumberFormat("en-NG", { style: "currency", currency: data.currency }).format(data.amount_minor / 100)}</Text></Box>}</ContentSection></Layout>;
}
