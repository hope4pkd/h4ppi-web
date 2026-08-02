import { z } from "zod";
import { isCaseReference, normaliseCaseReference } from "@/lib/case-reference";

const requiredText = (label: string, max = 120) =>
  z.string().trim().min(1, `${label} is required.`).max(max);

export const supportRequestSchema = z.object({
  firstName: requiredText("First name", 80),
  lastName: requiredText("Last name", 80),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(24)
    .regex(/^[+\d][\d\s()-]+$/, "Enter a valid phone number."),
  state: requiredText("State", 80),
  relationship: z.enum(["self", "caregiver", "family", "other"]),
  diagnosisStatus: z.enum(["confirmed", "suspected", "caregiver", "unsure"]),
  supportNeed: z.enum([
    "navigation",
    "medical-verification",
    "financial-guidance",
    "community",
    "information",
    "other",
  ]),
  summary: requiredText("How we may help", 1200),
  contactConsent: z.literal(true, {
    error: "Consent to contact you is required.",
  }),
  privacyConsent: z.literal(true, {
    error: "You must acknowledge the privacy notice.",
  }),
  website: z.string().max(0).optional().default(""),
});

export const enquirySchema = z.object({
  name: requiredText("Name", 160),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  organisation: z.string().trim().max(180).optional().default(""),
  category: z.enum([
    "general",
    "partnership",
    "volunteer",
    "complaint",
    "privacy",
  ]),
  message: requiredText("Message", 3000),
  privacyConsent: z.literal(true, {
    error: "You must acknowledge the privacy notice.",
  }),
  website: z.string().max(0).optional().default(""),
});

export const statusLookupSchema = z.object({
  reference: z
    .string()
    .transform(normaliseCaseReference)
    .refine(isCaseReference, "Enter a valid H4P case reference."),
  email: z.string().trim().email("Enter the email used for your request."),
});

export const donationInitialisationSchema = z.object({
  email: z.string().trim().email().max(254),
  name: z.string().trim().min(1).max(160),
  amountNaira: z.coerce.number().int().min(500).max(50_000_000),
  allocationKind: z.enum(["campaign", "general_fund"]),
  campaignSlug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120).optional(),
  recurring: z.boolean().optional().default(false),
}).superRefine((value, context) => {
  if (value.allocationKind === "campaign" && !value.campaignSlug) {
    context.addIssue({ code: "custom", path: ["campaignSlug"], message: "Choose an approved campaign." });
  }
});

export type SupportRequestInput = z.infer<typeof supportRequestSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;
