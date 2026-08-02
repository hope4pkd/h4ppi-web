"use client";

import { Box, Button, Field, Input, Text, VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

type SafeStatus = { label: string; date: string; nextStep: string; contactGuidance: string };

export function StatusLookupForm() {
  const searchParams = useSearchParams();
  const [challengeId, setChallengeId] = useState("");
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState(searchParams.get("reference") || "");
  const [status, setStatus] = useState<"idle" | "sending" | "code" | "verifying" | "error" | "complete">("idle");
  const [message, setMessage] = useState("");
  const [caseStatus, setCaseStatus] = useState<SafeStatus | null>(null);

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/case-status/request-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ reference, email }) });
      const result = (await response.json()) as { challengeId?: string; message?: string };
      if (!response.ok || !result.challengeId) { setStatus("error"); setMessage(result.message || "We could not start the status check."); return; }
      setChallengeId(result.challengeId);
      setStatus("code");
      setMessage("If the details match an active case, a one-time code has been sent to that email address.");
    } catch {
      setStatus("error"); setMessage("The secure status service could not be reached.");
    }
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("verifying");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/case-status/verify", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ challengeId, code: data.get("code") }) });
      const result = (await response.json()) as { message?: string; status?: SafeStatus };
      if (!response.ok || !result.status) { setStatus("error"); setMessage(result.message || "The code is invalid or expired."); return; }
      setCaseStatus(result.status);
      setStatus("complete");
    } catch {
      setStatus("error"); setMessage("The secure status service could not be reached.");
    }
  }

  if (status === "complete" && caseStatus) {
    return <VStack align="stretch" gap={5} bg="white" borderWidth="1px" borderColor="teal.200" borderRadius="2xl" p={{ base: 6, md: 9 }}><Text color="action.700" fontWeight="800">Current case status</Text><Text fontFamily="heading" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="700">{caseStatus.label}</Text><Box borderTopWidth="1px" borderColor="navy.100" pt={4}><Text color="navy.400" fontSize="sm">Updated</Text><Text>{caseStatus.date}</Text></Box><Box><Text color="navy.400" fontSize="sm">Next step</Text><Text>{caseStatus.nextStep}</Text></Box><Box><Text color="navy.400" fontSize="sm">Contact guidance</Text><Text>{caseStatus.contactGuidance}</Text></Box></VStack>;
  }

  if (status === "code" || status === "verifying") {
    return <form onSubmit={verifyCode}><Box bg="white" borderWidth="1px" borderColor="navy.100" borderRadius="2xl" p={{ base: 6, md: 9 }}><VStack align="stretch" gap={5}><Text role="status" color="navy.600">{message}</Text><Field.Root required><Field.Label>Six-digit code <Field.RequiredIndicator /></Field.Label><Input name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required minH="48px" fontSize="20px" letterSpacing="0.25em" /></Field.Root><Button type="submit" alignSelf="start" loading={status === "verifying"}>View safe status</Button></VStack></Box></form>;
  }

  return <form onSubmit={requestCode}><Box bg="white" borderWidth="1px" borderColor="navy.100" borderRadius="2xl" p={{ base: 6, md: 9 }}><VStack align="stretch" gap={5}><Field.Root required><Field.Label>Case reference <Field.RequiredIndicator /></Field.Label><Input value={reference} onChange={(event) => setReference(event.target.value.toUpperCase())} placeholder="H4P-2026-00001" autoCapitalize="characters" required minH="48px" fontSize="16px" /></Field.Root><Field.Root required><Field.Label>Email used for the request <Field.RequiredIndicator /></Field.Label><Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" inputMode="email" autoComplete="email" required minH="48px" fontSize="16px" /></Field.Root>{status === "error" && <Box role="alert" bg="red.50" color="red.800" p={4} borderRadius="lg">{message}</Box>}<Button type="submit" alignSelf="start" loading={status === "sending"}>Send one-time code</Button><Text color="navy.500" fontSize="sm">A case reference alone never reveals a status. Codes expire after 10 minutes and repeated attempts are rate-limited.</Text></VStack></Box></form>;
}
