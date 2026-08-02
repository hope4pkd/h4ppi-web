"use client";

import { Box, Text } from "@chakra-ui/react";
import Script from "next/script";
import { useId, useState } from "react";

declare global {
  interface Window {
    turnstile?: { render: (target: string, options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void }) => string };
  }
}

export function TurnstileField({ siteKey }: { siteKey: string }) {
  const reactId = useId().replace(/:/g, "");
  const id = `turnstile-${reactId}`;
  const [token, setToken] = useState("");

  const renderChallenge = () => {
    if (!window.turnstile || document.querySelector(`#${id} iframe`)) return;
    window.turnstile.render(`#${id}`, {
      sitekey: siteKey,
      callback: setToken,
      "expired-callback": () => setToken(""),
    });
  };

  return (
    <Box>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={renderChallenge} />
      <Box id={id} minH="65px" aria-label="Spam protection challenge" />
      <input type="hidden" name="turnstileToken" value={token} />
      <Text fontSize="xs" color="navy.400" mt={1}>Spam protection is required before submission.</Text>
    </Box>
  );
}
