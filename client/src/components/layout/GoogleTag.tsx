"use client";

import { useEffect } from "react";
import { allowsMeasurement, useConsent } from "@/lib/consent";

/** The Google Tag Manager container. Its tags are managed in Tag Manager, not in this repository. */
export const GTM_CONTAINER_ID = "GTM-N54HQ7XR";

const SCRIPT_ID = "google-tag-manager";

// Analytics and ad-conversion measurement. ad_personalization stays denied in every case: the cookie
// choice does not cover personalised advertising or remarketing.
const measurement = { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted" } as const;
const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" } as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// The Google tag reads each entry as an `arguments` object, not an array, so this must not be an arrow
// function or use rest parameters.
function gtag(..._args: unknown[]): void;
function gtag() {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/**
 * Loads Google Tag Manager, but only once the visitor has chosen "Allow all" (lib/consent.ts). Until
 * then nothing is requested from Google. Consent Mode defaults are pushed as denied before the
 * container loads, then updated, so every tag in the container sees the visitor's answer. If the
 * visitor later withdraws on /cookies, consent is updated to denied for the rest of the visit, and on
 * the next page load the container is not requested at all.
 *
 * Production only, so local development and the e2e run (against `npm run dev`) send nothing to the
 * container. Renders nothing.
 */
export function GoogleTag() {
  const allowed = allowsMeasurement(useConsent());

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const loaded = document.getElementById(SCRIPT_ID) !== null;

    if (!allowed) {
      if (loaded) gtag("consent", "update", denied);
      return;
    }

    if (!loaded) {
      gtag("consent", "default", denied);
      gtag("js", new Date());
    }
    gtag("consent", "update", measurement);

    if (!loaded) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
      document.head.appendChild(script);
    }
  }, [allowed]);

  return null;
}
