"use client";

import { TurnstileField } from "@/components/forms/TurnstileField";
import { Box, Button, Field, Grid, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function SupportRequestForm({ siteKey }: { siteKey: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<{ state: "idle" | "submitting" | "error"; message?: string }>({ state: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "submitting" });
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/support-requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, contactConsent: formData.has("contactConsent"), privacyConsent: formData.has("privacyConsent") }),
      });
      const result = (await response.json()) as { reference?: string; message?: string };
      if (!response.ok || !result.reference) {
        setStatus({ state: "error", message: result.message || "We could not submit your request. Please check the form and try again." });
        return;
      }
      router.push(`/support/confirmation?reference=${encodeURIComponent(result.reference)}`);
    } catch {
      setStatus({ state: "error", message: "The secure service could not be reached. No submission should be assumed complete." });
    }
  }

  const inputStyles = { minH: "48px", fontSize: "16px", borderColor: "navy.200", bg: "white" };

  return (
    <form onSubmit={submit} noValidate>
    <Box bg="white" borderWidth="1px" borderColor="navy.100" borderRadius="2xl" p={{ base: 5, md: 9 }}>
      <VStack align="stretch" gap={6}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
          <Field.Root required><Field.Label>First name <Field.RequiredIndicator /></Field.Label><Input name="firstName" autoComplete="given-name" required {...inputStyles} /></Field.Root>
          <Field.Root required><Field.Label>Last name <Field.RequiredIndicator /></Field.Label><Input name="lastName" autoComplete="family-name" required {...inputStyles} /></Field.Root>
          <Field.Root required><Field.Label>Email <Field.RequiredIndicator /></Field.Label><Input name="email" type="email" inputMode="email" autoComplete="email" required {...inputStyles} /></Field.Root>
          <Field.Root required><Field.Label>Phone <Field.RequiredIndicator /></Field.Label><Input name="phone" type="tel" inputMode="tel" autoComplete="tel" required {...inputStyles} /></Field.Root>
          <Field.Root required><Field.Label>State of residence <Field.RequiredIndicator /></Field.Label><Input name="state" autoComplete="address-level1" required {...inputStyles} /></Field.Root>
          <Field.Root required><Field.Label>I am contacting Hope4PKD for <Field.RequiredIndicator /></Field.Label><select className="hope-native-select" name="relationship" required><option value="">Select one</option><option value="self">Myself</option><option value="caregiver">Someone I care for</option><option value="family">A family member</option><option value="other">Another person</option></select></Field.Root>
          <Field.Root required><Field.Label>Diagnosis status <Field.RequiredIndicator /></Field.Label><select className="hope-native-select" name="diagnosisStatus" required><option value="">Select one</option><option value="confirmed">Confirmed diagnosis</option><option value="suspected">PKD is suspected</option><option value="caregiver">I am a caregiver</option><option value="unsure">I am not sure</option></select></Field.Root>
          <Field.Root required><Field.Label>Primary support need <Field.RequiredIndicator /></Field.Label><select className="hope-native-select" name="supportNeed" required><option value="">Select one</option><option value="navigation">Patient navigation</option><option value="medical-verification">Medical verification pathway</option><option value="financial-guidance">Financial guidance</option><option value="community">Community connection</option><option value="information">PKD information</option><option value="other">Something else</option></select></Field.Root>
        </Grid>
        <Field.Root required><Field.Label>How may we help? <Field.RequiredIndicator /></Field.Label><Textarea name="summary" rows={6} maxLength={1200} required fontSize="16px" borderColor="navy.200" bg="white" /><Field.HelperText>Do not upload or paste medical records here. You can share only enough context for an initial review.</Field.HelperText></Field.Root>
        <Box position="absolute" left="-10000px" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></Box>
        <VStack align="stretch" gap={3}>
          <label><input type="checkbox" name="contactConsent" required /> <Text as="span" ml={2}>I consent to Hope4PKD contacting me about this request.</Text></label>
          <label><input type="checkbox" name="privacyConsent" required /> <Text as="span" ml={2}>I have read the <a href="/policies/privacy">privacy notice</a> and understand how my information will be used.</Text></label>
        </VStack>
        <TurnstileField siteKey={siteKey} />
        {status.state === "error" && <Box role="alert" bg="red.50" color="red.800" borderRadius="lg" p={4}>{status.message}</Box>}
        <Button type="submit" size="lg" alignSelf="start" loading={status.state === "submitting"} loadingText="Submitting">Submit support request</Button>
        <Text color="navy.500" fontSize="sm">Submitting a request does not guarantee assistance. If you need urgent medical help, contact a qualified healthcare provider or emergency service.</Text>
      </VStack>
    </Box>
    </form>
  );
}
