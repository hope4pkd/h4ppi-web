import "server-only";

import { render } from "@react-email/render";
import { Resend } from "resend";
import { TransactionalEmail } from "@/emails/TransactionalEmail";
import { siteUrl } from "@/lib/env";

function emailClient() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendSupportAcknowledgement({ to, firstName, reference, requestId }: { to: string; firstName: string; reference: string; requestId: string }) {
  const resend = emailClient();
  if (!resend || !process.env.RESEND_FROM_EMAIL) return { queued: false };
  const { error } = await resend.emails.send(
    {
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject: `We received your Hope4PKD request — ${reference}`,
      html: await render(TransactionalEmail({
        preview: `Your Hope4PKD support request reference is ${reference}`,
        heading: `Thank you, ${firstName}.`,
        body: "We have received your support request. Keep your reference safe. The team will review the request and contact you through the details you provided when a next step is available. Please do not email medical documents.",
        reference,
        actionLabel: "Visit the support centre",
        actionUrl: `${siteUrl()}/support`,
      })),
    },
    { idempotencyKey: `support-acknowledgement/${requestId}` },
  );
  return { queued: !error, error: error?.message };
}

export async function sendSafeOperationsAlert({ subject, reference, id, kind }: { subject: string; reference: string; id: string; kind: "support" | "enquiry" }) {
  const resend = emailClient();
  if (!resend || !process.env.RESEND_FROM_EMAIL || !process.env.OPERATIONS_EMAIL) return { queued: false };
  const { error } = await resend.emails.send(
    {
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.OPERATIONS_EMAIL,
      subject,
      html: await render(TransactionalEmail({
        preview: `New ${kind} record ${reference}`,
        heading: `New ${kind} record`,
        body: "A new record is ready for authorised staff review. Open the secure admin workspace to see its contents.",
        reference,
        actionLabel: "Open the admin workspace",
        actionUrl: `${siteUrl()}/admin/${kind === "support" ? "cases" : "content"}`,
      })),
    },
    { idempotencyKey: `${kind}-operations-alert/${id}` },
  );
  return { queued: !error, error: error?.message };
}

export async function sendEnquiryAcknowledgement({ to, name, reference, enquiryId }: { to: string; name: string; reference: string; enquiryId: string }) {
  const resend = emailClient();
  if (!resend || !process.env.RESEND_FROM_EMAIL) return { queued: false };
  const { error } = await resend.emails.send(
    {
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject: `Hope4PKD received your message — ${reference}`,
      html: await render(TransactionalEmail({
        preview: `Your Hope4PKD message reference is ${reference}`,
        heading: `Thank you, ${name}.`,
        body: "Your message has been received and routed for review. Keep this reference if you need to follow up. Please do not reply with medical documents or other sensitive records.",
        reference,
        actionLabel: "Visit Hope4PKD",
        actionUrl: siteUrl(),
      })),
    },
    { idempotencyKey: `enquiry-acknowledgement/${enquiryId}` },
  );
  return { queued: !error, error: error?.message };
}

export async function sendCaseStatusCode({ to, code, challengeId }: { to: string; code: string; challengeId: string }) {
  const resend = emailClient();
  if (!resend || !process.env.RESEND_FROM_EMAIL) return { queued: false };
  const { error } = await resend.emails.send(
    {
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject: "Your Hope4PKD case-status code",
      html: await render(TransactionalEmail({
        preview: "Your time-limited Hope4PKD case-status code",
        heading: "Confirm your status request",
        body: `Your one-time code is ${code}. It expires in 10 minutes. Never share this code with anyone.`,
      })),
    },
    { idempotencyKey: `case-status-code/${challengeId}` },
  );
  return { queued: !error, error: error?.message };
}
