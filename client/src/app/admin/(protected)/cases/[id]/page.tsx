import { AdminWorkspace } from "@/components/admin/AdminWorkspace";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const supabase = await getSupabaseServerClient(); const { data } = supabase ? await supabase.from("cases").select("reference, status, safe_next_step, status_changed_at").eq("id", id).maybeSingle() : { data: null }; if (!data) notFound(); return <AdminWorkspace title={data.reference} description={`Current internal stage: ${data.status.replaceAll("_", " ")}. Case tabs and mutations remain controlled by the user role and RLS.`} />; }
