import { useSyncExternalStore } from "react";

/**
 * The visitor's answer to the cookie banner.
 *
 * The site sets no cookies of its own. The answer governs the two optional Google services: the YouTube
 * player (VideoEmbed), which may store data on the device once a video plays, and Google measurement
 * (GoogleTag, which loads Google Tag Manager). The answer lives in localStorage, in this browser only:
 * there is no server to send it to. The cookies notice in content/policies.ts lists this key — keep the
 * two in step.
 */
export const CONSENT_STORAGE_KEY = "hope4pkd-consent";

/**
 * "all" allows the YouTube player and Google measurement. "video" allows the YouTube player only — it is
 * what the prompt inside a video grants, so allowing one video never switches measurement on.
 * "essential" allows neither: a video asks before it plays and Google Tag Manager never loads.
 */
export type ConsentChoice = "all" | "video" | "essential";

export const allowsVideo = (consent: ConsentState) => consent === "all" || consent === "video";
export const allowsMeasurement = (consent: ConsentState) => consent === "all";

/**
 * "undecided" — the visitor has not answered. "pending" — the answer is not known yet, which is the
 * case on the server and during hydration; the banner renders nothing so it never flashes for someone
 * who has already answered.
 */
export type ConsentState = ConsentChoice | "undecided" | "pending";

// Holds the answer for the rest of the visit when the browser refuses localStorage (private mode,
// blocked site data), so the banner still goes away once it has been answered.
let sessionChoice: ConsentChoice | null = null;

const listeners = new Set<() => void>();

function readConsent(): ConsentChoice | "undecided" {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "all" || stored === "video" || stored === "essential") return stored;
  } catch {
    // Storage is unavailable; fall through to the in-memory answer.
  }
  return sessionChoice ?? "undecided";
}

export function setConsent(choice: ConsentChoice) {
  sessionChoice = choice;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Kept in memory for this visit only.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Another tab changing the answer reaches this one through the storage event.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

const serverSnapshot = (): ConsentState => "pending";

export function useConsent(): ConsentState {
  return useSyncExternalStore<ConsentState>(subscribe, readConsent, serverSnapshot);
}
