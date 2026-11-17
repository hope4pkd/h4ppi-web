/**
 * The organisation's names and registration. Every structural use (metadata, manifest, JSON-LD, logo alt text, footer,
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

/**
 * Registration details, exactly as supplied by the owner (2026-11-11; email changed to
 * info@hope4pkd.org on the owner's instruction, 2026-11-12). They render through
 * `RegistrationDetails` in the page kit — in the footer of every page and again on /about and
 * /contact — so a change here changes all three. Do not edit a value without the owner's say-so.
 */
export const registration = {
  country: "Nigeria",
  registrar: "Corporate Affairs Commission",
  entityType: "Incorporated Trustee",
  number: "9996845",
  address: "Plot 1556 Cadastral Zone B08, Jahi, Und St. Jahi 1, Abuja, FCT, Nigeria",
  email: "info@hope4pkd.org",
} as const;

/**
 * How to reach the organisation. Both phone numbers were supplied by the owner on 2026-11-11, in the
 * international form shown; they render on /contact, /support and in the footer. The owner confirmed
 * on 2026-11-17 that +234(0)9117778034 is also on WhatsApp; the wa.me link renders beside the phone
 * numbers in the same three places. No reply time has been supplied, so none is stated anywhere.
 */
export const contact = {
  phones: [
    // { display: "+234(0)9076412444", href: "tel:+2349076412444" },
    { display: "+234(0)9117778034", href: "tel:+2349117778034" },
  ],
  whatsapp: { display: "+234(0)9117778034", href: "https://wa.me/2349117778034" },
} as const;

/**
 * The organisation's social accounts, supplied by the owner on 2026-11-11. They render as icons in the
 * footer. Add an account only when the owner supplies its address.
 */
export const social = [
  { name: "Instagram", href: "https://www.instagram.com/hope4pkd/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/hope4pkd" },
] as const;

/** A mailto link to the registered address with the subject line already filled in. */
export const mailto = (subject: string) => `mailto:${registration.email}?subject=${encodeURIComponent(subject)}`;
