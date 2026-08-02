import "server-only";

const enabled = (value: string | undefined) => value === "true";

export type FeatureReadiness = {
  enabled: boolean;
  reason?: string;
};

export function hasSupabasePublicConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function hasSupabaseAdminConfig() {
  return Boolean(
    hasSupabasePublicConfig() && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function supportIntakeReadiness(): FeatureReadiness {
  if (!enabled(process.env.NEXT_PUBLIC_SUPPORT_INTAKE_ENABLED)) {
    return { enabled: false, reason: "Support intake is in operational review." };
  }
  if (!hasSupabaseAdminConfig() || !process.env.RESEND_API_KEY) {
    return { enabled: false, reason: "Support intake is not configured." };
  }
  if (!process.env.OPERATIONS_EMAIL || !process.env.RESEND_FROM_EMAIL) {
    return { enabled: false, reason: "Acknowledgement routing is not configured." };
  }
  if (
    !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    !process.env.TURNSTILE_SECRET_KEY ||
    !process.env.REQUEST_HASH_SECRET
  ) {
    return { enabled: false, reason: "Spam and rate-limit protection is not configured." };
  }
  return { enabled: true };
}

export function enquiryReadiness(): FeatureReadiness {
  if (!hasSupabaseAdminConfig() || !process.env.RESEND_API_KEY) {
    return { enabled: false, reason: "Secure enquiry routing is not configured." };
  }
  if (!process.env.OPERATIONS_EMAIL || !process.env.RESEND_FROM_EMAIL) {
    return { enabled: false, reason: "Enquiry acknowledgements are not configured." };
  }
  if (
    !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    !process.env.TURNSTILE_SECRET_KEY ||
    !process.env.REQUEST_HASH_SECRET
  ) {
    return { enabled: false, reason: "Spam and rate-limit protection is not configured." };
  }
  return { enabled: true };
}

export function donationReadiness(): FeatureReadiness {
  if (!enabled(process.env.NEXT_PUBLIC_DONATIONS_ENABLED)) {
    return { enabled: false, reason: "Online donations are not active yet." };
  }
  if (!process.env.PAYSTACK_SECRET_KEY || !hasSupabaseAdminConfig()) {
    return { enabled: false, reason: "Payment processing is not configured." };
  }
  return { enabled: true };
}

export function documentUploadReadiness(): FeatureReadiness {
  if (!enabled(process.env.NEXT_PUBLIC_DOCUMENT_UPLOADS_ENABLED)) {
    return { enabled: false, reason: "Secure document uploads are not active." };
  }
  if (!process.env.MALWARE_SCANNER_WEBHOOK_SECRET || !hasSupabaseAdminConfig()) {
    return { enabled: false, reason: "Document scanning is not configured." };
  }
  return { enabled: true };
}

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://hope4pkd.org";
}
