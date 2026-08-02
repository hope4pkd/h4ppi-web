import { AdminShell } from "@/components/admin/AdminShell";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Box, Heading, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return <Box p={10}><Heading>Admin is not configured</Heading><Text mt={3}>Connect the staging Supabase project and apply the reviewed migration before staff access is available.</Text></Box>;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/admin/login");
  const assurance = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (assurance.data?.currentLevel !== "aal2") redirect("/admin/mfa");
  const { data: profile } = await supabase.from("staff_profiles").select("display_name, role, active").eq("user_id", userData.user.id).single();
  if (!profile?.active) return <Box p={10}><Heading>Access not authorised</Heading><Text mt={3}>This account has no active Hope4PKD staff role.</Text></Box>;
  return <AdminShell profile={profile}>{children}</AdminShell>;
}
