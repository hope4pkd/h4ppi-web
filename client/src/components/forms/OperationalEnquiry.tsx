import { EmptyState } from "@/components/common/PublicPage";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { enquiryReadiness } from "@/lib/env";

export function OperationalEnquiry({ category, unavailableTitle, unavailableDescription }: { category: "general" | "partnership" | "volunteer" | "complaint" | "privacy"; unavailableTitle: string; unavailableDescription: string }) {
  const readiness = enquiryReadiness();
  return readiness.enabled ? <EnquiryForm category={category} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} /> : <EmptyState title={unavailableTitle} description={unavailableDescription} />;
}
