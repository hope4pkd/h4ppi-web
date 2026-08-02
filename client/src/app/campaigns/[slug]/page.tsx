import { ContentSection, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

export const dynamic = "force-dynamic";

const campaign = cache(async (slug: string) => { const supabase = await getSupabaseServerClient(); if (!supabase) return null; const { data } = await supabase.from("public_campaigns").select("title, summary, public_name, identity_level, target_amount_minor, allocated_amount_minor, currency, published_at").eq("slug", slug).maybeSingle(); return data; });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const data = await campaign(slug); if (!data) return { title: "Campaign not found" }; return { title: data.title, description: data.summary, alternates: { canonical: `/campaigns/${slug}` } }; }

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const data = await campaign(slug); if (!data) notFound();
  const format = (amount: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: data.currency, maximumFractionDigits: 0 }).format(amount / 100);
  const percent = Math.min(100, Math.round((data.allocated_amount_minor / data.target_amount_minor) * 100));
  return <Layout><PageHero eyebrow="Verified campaign" title={data.title} description={data.summary} /><ContentSection><VStack align="stretch" gap={7} maxW="3xl"><HStack gap={2}><Box bg="teal.100" color="action.700" px={3} py={1} borderRadius="full" fontWeight="800" fontSize="sm">Verification complete</Box><Box bg="pink.100" color="pink.800" px={3} py={1} borderRadius="full" fontWeight="800" fontSize="sm">Consent current</Box></HStack><Box><HStack justify="space-between"><Text fontWeight="800">Allocated {format(data.allocated_amount_minor)}</Text><Text color="navy.500">Goal {format(data.target_amount_minor)}</Text></HStack><Box h="10px" bg="navy.100" borderRadius="full" mt={3} overflow="hidden"><Box h="full" w={`${percent}%`} bg="action.600" /></Box></Box><Text color="navy.500">This public page is generated from the approved campaign projection. It does not expose private medical records, staff notes or unapproved identity information.</Text></VStack></ContentSection></Layout>;
}
