import { MfaForm } from "@/components/admin/MfaForm";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export default async function MfaPage() { const supabase = await getSupabaseServerClient(); if (!supabase) return <Box p={10}>Staff authentication is not configured.</Box>; const { data } = await supabase.auth.getUser(); if (!data.user) redirect("/admin/login"); return <Box minH="100dvh" bg="navy.900" py={16}><Container maxW="lg"><VStack align="stretch" gap={6} bg="canvas.50" borderRadius="2xl" p={{ base: 6, md: 10 }}><Text color="action.700" fontWeight="800">SECURITY CHECK</Text><Heading as="h1" fontSize="4xl">Multi-factor authentication</Heading><Text color="navy.500">Use a TOTP authenticator. MFA is enforced in both server access checks and database row-level policies.</Text><MfaForm /></VStack></Container></Box>; }
