"use client";

import { Box, Button, Field, Input, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function MfaForm() {
  const router = useRouter();
  const [factorId, setFactorId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) { if (!cancelled) { setError("MFA is not configured."); setBusy(false); } return; }
      const factors = await supabase.auth.mfa.listFactors();
      const verified = factors.data?.totp.find((factor) => factor.status === "verified");
      if (verified) { if (!cancelled) { setFactorId(verified.id); setBusy(false); } return; }
      const enrollment = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: "Hope4PKD staff" });
      if (enrollment.error) { if (!cancelled) { setError("MFA enrolment could not be started."); setBusy(false); } return; }
      if (!cancelled) { setFactorId(enrollment.data.id); setQrCode(enrollment.data.totp.qr_code); setBusy(false); }
    };
    void load();
    return () => { cancelled = true; };
  }, []);

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const code = String(new FormData(event.currentTarget).get("code") || "");
    const supabase = getSupabaseBrowserClient();
    if (!supabase || !factorId) { setError("MFA is not ready."); setBusy(false); return; }
    const result = await supabase.auth.mfa.challengeAndVerify({ factorId, code });
    if (result.error) { setError("The authenticator code is invalid."); setBusy(false); return; }
    router.push("/admin"); router.refresh();
  }

  if (busy && !factorId) return <Text>Preparing multi-factor authentication…</Text>;
  return <form onSubmit={verify}><VStack align="stretch" gap={5}>{qrCode && <Box><Text color="navy.500" mb={3}>Scan this code in an authenticator app. The QR code is not stored by Hope4PKD.</Text><Image src={qrCode} alt="Authenticator enrolment QR code" width={220} height={220} unoptimized /></Box>}<Field.Root required><Field.Label>Authenticator code</Field.Label><Input name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" required minH="48px" fontSize="18px" /></Field.Root>{error && <Box role="alert" bg="red.50" color="red.800" p={4}>{error}</Box>}<Button type="submit" loading={busy}>Verify and continue</Button></VStack></form>;
}
