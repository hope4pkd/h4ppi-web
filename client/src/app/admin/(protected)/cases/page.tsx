import { AdminWorkspace } from "@/components/admin/AdminWorkspace";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default async function Page() {
  const supabase = await getSupabaseServerClient();
  const { data } = supabase ? await supabase.from("cases").select("id, reference, status, status_changed_at").order("status_changed_at", { ascending: false }).limit(50) : { data: null };
  if (!data?.length) return <AdminWorkspace title="Cases" description="The assigned and permitted case queue will appear here after verified intake creates case records." />;
  return <VStack align="stretch" gap={6}><Box><Text color="action.700" fontWeight="800">INTERNAL WORKSPACE</Text><Heading as="h1" fontSize="5xl">Cases</Heading></Box>{data.map((record) => <Link key={record.id} href={`/admin/cases/${record.id}`}><HStack justify="space-between" bg="white" borderWidth="1px" borderColor="navy.100" p={5} borderRadius="xl"><Box><Text fontWeight="800">{record.reference}</Text><Text color="navy.500" fontSize="sm">{record.status.replaceAll("_", " ")}</Text></Box><Text color="navy.400" fontSize="sm">{new Date(record.status_changed_at).toLocaleDateString("en-NG")}</Text></HStack></Link>)}</VStack>;
}
