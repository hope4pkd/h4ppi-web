import { ContentSection, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

export const dynamic = "force-dynamic";

const article = cache(async (slug: string) => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.from("public_articles").select("title, summary, body, category, published_at, reviewed_at, next_review_at, references_json, disclaimer, reviewer_name, reviewer_qualification").eq("slug", slug).maybeSingle();
  return data;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const data = await article(slug); if (!data) return { title: "Resource not found" }; return { title: data.title, description: data.summary, alternates: { canonical: `/knowledge/${slug}` } }; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const data = await article(slug); if (!data) notFound();
  const references = Array.isArray(data.references_json) ? data.references_json : [];
  return <Layout><PageHero eyebrow={data.category} title={data.title} description={data.summary} /><ContentSection><VStack align="stretch" gap={8} maxW="3xl"><Box bg="teal.50" borderWidth="1px" borderColor="teal.200" p={5} borderRadius="xl"><Text fontWeight="800">Medically reviewed by {data.reviewer_name}</Text><Text color="navy.500">{data.reviewer_qualification} · Reviewed {new Date(data.reviewed_at).toLocaleDateString("en-NG")} · Next review {new Date(data.next_review_at).toLocaleDateString("en-NG")}</Text></Box><Text whiteSpace="pre-wrap" fontSize="lg" lineHeight="1.8">{data.body}</Text><Box><Heading as="h2" fontSize="2xl">References</Heading><VStack as="ol" align="stretch" pl={5} mt={4}>{references.map((reference, index) => <Text as="li" key={index} color="navy.500">{String(reference)}</Text>)}</VStack></Box><Box borderTopWidth="1px" borderColor="navy.100" pt={5}><Text color="navy.500" fontSize="sm">{data.disclaimer}</Text></Box></VStack></ContentSection></Layout>;
}
