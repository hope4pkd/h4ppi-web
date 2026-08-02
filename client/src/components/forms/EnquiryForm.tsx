"use client";

import { TurnstileField } from "@/components/forms/TurnstileField";
import { Box, Button, Field, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState, type FormEvent } from "react";

export function EnquiryForm({ category, siteKey }: { category: "general" | "partnership" | "volunteer" | "complaint" | "privacy"; siteKey: string }) {
  const [status, setStatus] = useState<{ state: "idle" | "submitting" | "success" | "error"; message?: string; reference?: string }>({ state: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "submitting" });
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(formData.entries()), category, privacyConsent: formData.has("privacyConsent") }),
      });
      const result = (await response.json()) as { message?: string; reference?: string };
      if (!response.ok || !result.reference) {
        setStatus({ state: "error", message: result.message || "We could not send your message. Please try again." });
        return;
      }
      form.reset();
      setStatus({ state: "success", message: "Your message has been received.", reference: result.reference });
    } catch {
      setStatus({ state: "error", message: "The secure service could not be reached. No message should be assumed complete." });
    }
  }

  if (status.state === "success") {
    return <Box role="status" bg="teal.50" borderWidth="1px" borderColor="teal.200" borderRadius="2xl" p={{ base: 6, md: 9 }}><Text color="action.700" fontWeight="800">Message received</Text><Text fontSize="2xl" fontWeight="800" mt={2}>{status.reference}</Text><Text color="navy.500" mt={3}>Keep this reference if you need to follow up. An acknowledgement will be sent to your email address.</Text></Box>;
  }

  return (
    <form onSubmit={submit}>
    <Box bg="white" borderWidth="1px" borderColor="navy.100" borderRadius="2xl" p={{ base: 5, md: 9 }}>
      <VStack align="stretch" gap={5}>
        <Field.Root required><Field.Label>Full name <Field.RequiredIndicator /></Field.Label><Input name="name" autoComplete="name" required minH="48px" fontSize="16px" /></Field.Root>
        <Field.Root required><Field.Label>Email <Field.RequiredIndicator /></Field.Label><Input name="email" type="email" inputMode="email" autoComplete="email" required minH="48px" fontSize="16px" /></Field.Root>
        <Field.Root><Field.Label>Organisation <Text as="span" color="navy.400">(optional)</Text></Field.Label><Input name="organisation" autoComplete="organization" minH="48px" fontSize="16px" /></Field.Root>
        <Field.Root required><Field.Label>Message <Field.RequiredIndicator /></Field.Label><Textarea name="message" rows={7} maxLength={3000} required fontSize="16px" /></Field.Root>
        <Box position="absolute" left="-10000px" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></Box>
        <label><input type="checkbox" name="privacyConsent" required /> <Text as="span" ml={2}>I have read the <a href="/policies/privacy">privacy notice</a>.</Text></label>
        <TurnstileField siteKey={siteKey} />
        {status.state === "error" && <Box role="alert" bg="red.50" color="red.800" borderRadius="lg" p={4}>{status.message}</Box>}
        <Button type="submit" size="lg" alignSelf="start" loading={status.state === "submitting"} loadingText="Sending">Send message</Button>
      </VStack>
    </Box>
    </form>
  );
}
