"use client";

import { Box, Button, Field, Input, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const supabase = getSupabaseBrowserClient();
    if (!supabase) { setError("Staff authentication is not configured."); setBusy(false); return; }
    const result = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
    if (result.error) setError("Sign-in could not be started. Use an invited staff email."); else setSent(true);
    setBusy(false);
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const code = String(new FormData(event.currentTarget).get("code") || "");
    const supabase = getSupabaseBrowserClient();
    if (!supabase) { setError("Staff authentication is not configured."); setBusy(false); return; }
    const result = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    if (result.error) { setError("The code is invalid or expired."); setBusy(false); return; }
    router.push("/admin/mfa"); router.refresh();
  }

  return sent ? (
    <form onSubmit={verifyCode}><VStack align="stretch" gap={5}><Text color="navy.500">Enter the code sent to the invited staff address.</Text><Field.Root required><Field.Label>One-time code</Field.Label><Input name="code" inputMode="numeric" autoComplete="one-time-code" required minH="48px" fontSize="18px" /></Field.Root>{error && <Box role="alert" bg="red.50" color="red.800" p={4}>{error}</Box>}<Button type="submit" loading={busy}>Continue</Button></VStack></form>
  ) : (
    <form onSubmit={requestCode}><VStack align="stretch" gap={5}><Field.Root required><Field.Label>Invited staff email</Field.Label><Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required minH="48px" fontSize="16px" /></Field.Root>{error && <Box role="alert" bg="red.50" color="red.800" p={4}>{error}</Box>}<Button type="submit" loading={busy}>Send sign-in code</Button><Text color="navy.500" fontSize="sm">Accounts cannot be created from this page. A super administrator must invite each staff member.</Text></VStack></form>
  );
}
