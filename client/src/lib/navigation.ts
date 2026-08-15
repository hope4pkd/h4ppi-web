export interface NavLink {
  readonly label: string;
  readonly href: string;
}

/** A destination that needs the operational service, which does not exist yet. Renders without a link. */
export interface ComingSoonNavItem {
  readonly label: string;
  readonly comingSoon: true;
}

export type NavItem = NavLink | ComingSoonNavItem;

export const isNavLink = (item: NavItem): item is NavLink => "href" in item;

export interface NavGroup {
  readonly label: string;
  readonly items: readonly NavItem[];
}

export const navGroups = [
  // Who we are, and what earns trust in us.
  {
    label: "About",
    items: [
      { label: "About Hope4PKD", href: "/about" },
      { label: "Founder's Story", href: "/about/founder-story" },
      { label: "Leadership & Governance", href: "/about/leadership" },
      { label: "Impact & Transparency", href: "/impact" },
    ],
  },
  // The disease, not the organisation. Ordered by the patient's own questions — what it is, what I
  // notice and how they confirm it, what can be done — rather than by our source article's headings.
  // Kept to four top-level groups: a fifth trigger crowds the lg row between the logo and the Donate pill.
  {
    label: "Learn About PKD",
    items: [
      { label: "What Is PKD?", href: "/pkd" },
      { label: "Symptoms & Diagnosis", href: "/pkd/symptoms-and-diagnosis" },
      { label: "Treatment & Care", href: "/pkd/treatment-and-care" },
      { label: "Knowledge Centre", href: "/knowledge" },
    ],
  },
  {
    label: "Get Support",
    items: [
      { label: "How We Help", href: "/support" },
      { label: "Patient Support Process", href: "/support/process" },
      { label: "Patient & Caregiver Resources", href: "/help" },
      { label: "Request Support", comingSoon: true },
      { label: "Check Case Status", comingSoon: true },
    ],
  },
  {
    label: "Get Involved",
    items: [
      { label: "Campaigns", href: "/campaigns" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Events", href: "/events" },
      { label: "Partner With Us", href: "/partner" },
    ],
  },
] as const satisfies readonly NavGroup[];

export const standaloneNavLinks = [
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavLink[];

export const homeLink = { label: "Home", href: "/" } as const satisfies NavLink;

export const donateLink = { label: "Donate", href: "/donate" } as const satisfies NavLink;

export const legalNavLinks = [
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  { label: "Complaints and Feedback", href: "/complaints" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Accessibility", href: "/accessibility" },
] as const satisfies readonly NavLink[];

// Positional — the footer mirrors the header's group order, so reordering navGroups reorders the footer.
const [aboutGroup, learnGroup, supportGroup, involvedGroup] = navGroups;

export const footerGroups = [
  aboutGroup,
  learnGroup,
  supportGroup,
  { label: involvedGroup.label, items: [...involvedGroup.items, ...standaloneNavLinks, donateLink] },
  { label: "Trust & Legal", items: legalNavLinks },
] as const satisfies readonly NavGroup[];

export function isActiveHref(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function isActiveGroup(pathname: string, group: NavGroup) {
  return group.items.some((item) => isNavLink(item) && isActiveHref(pathname, item.href));
}
