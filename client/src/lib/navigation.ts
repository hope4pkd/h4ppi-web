export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export const primaryNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Get Support", href: "/support" },
  { label: "Learn About PKD", href: "/knowledge" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Impact & Transparency", href: "/impact" },
  { label: "Partner With Us", href: "/partner" },
] as const satisfies readonly NavLink[];

export const donateLink = { label: "Donate", href: "/donate" } as const satisfies NavLink;

export const secondaryNavLinks = [
  { label: "Events", href: "/events" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Help Centre", href: "/help" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavLink[];

export const legalNavLinks = [
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  { label: "Complaints and Feedback", href: "/complaints" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Accessibility", href: "/accessibility" },
] as const satisfies readonly NavLink[];
