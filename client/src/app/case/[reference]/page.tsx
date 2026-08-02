import { redirect } from "next/navigation";

export default async function CaseReferencePage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  redirect(`/case-status?reference=${encodeURIComponent(reference)}`);
}
