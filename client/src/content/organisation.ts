/**
 * The organisation's names. Every structural use (metadata, manifest, JSON-LD, logo alt text, footer,
 * policy issuer line) reads from here, so a registry change is a one-line edit.
 *
 * - legalName: the registered name. Use it where legal identity matters — the copyright holder, policy
 *   issuer, governance and structured data. The registrar refused an earlier name that abbreviated
 *   "PKD", so the legal name spells the disease out.
 * - brandName: the operating name on the logo, page titles and first mentions.
 * - shortName: the running-copy form ("Hope4PKD will…"). Body copy writes it inline rather than
 *   importing it; it is here for the manifest and aria labels.
 */

export const organisation = {
  legalName: "Hope for Polycystic Kidney Disease Patients Initiative",
  brandName: "Hope4PKD Patients Initiative",
  shortName: "Hope4PKD",
} as const;
