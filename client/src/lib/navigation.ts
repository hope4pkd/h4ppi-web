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

/** A labelled list of destinations. The footer renders these as columns. */
export interface NavGroup {
  readonly label: string;
  readonly items: readonly NavItem[];
}

/**
 * The primary row: five flat links, each landing on a hub page that lists its own sub-pages. The
 * order follows the reader's questions — who are you, what is PKD, can you help me, how can I help,
 * can I trust you — not the order of the concept note. Home is the logo (and an explicit link in the
 * mobile drawer); Contact lives in the drawer and the footer.
 */
export const primaryLinks = [
  { label: "About", href: "/about" },
  { label: "Understanding PKD", href: "/pkd" },
  { label: "Get Support", href: "/support" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Transparency", href: "/impact" },
] as const satisfies readonly NavLink[];

/**
 * Who the reader is. These no longer sit in a header bar; Home's "Where would you like to start?"
 * section and the footer's "Start here" column carry them.
 *
 * The prefix is `/for/` rather than a bare `/patients`: check-content.mjs treats hrefs under the old
 * top-level patients and donors segments as dead legacy routes and fails the build on them, and
 * `/patients` is in any case already a redirect to `/support`.
 */
export const audienceLinks = [
  { label: "Patients", href: "/for/patients" },
  { label: "Caregivers", href: "/for/caregivers" },
  { label: "Health Professionals", href: "/for/health-professionals" },
  { label: "Everyone", href: "/for/everyone" },
] as const satisfies readonly NavLink[];

export const homeLink = { label: "Home", href: "/" } as const satisfies NavLink;

export const contactLink = { label: "Contact", href: "/contact" } as const satisfies NavLink;

/** The two actions that stay visible on every page. */
export const supportLink = { label: "Get support", href: "/support" } as const satisfies NavLink;

export const donateLink = { label: "Donate", href: "/donate" } as const satisfies NavLink;

export const legalNavLinks = [
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  { label: "Complaints and Feedback", href: "/complaints" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Accessibility", href: "/accessibility" },
] as const satisfies readonly NavLink[];

/**
 * The footer carries the sub-pages the flat header does not: one column per top-level section plus
 * the audience routes and the legal suite. The sitemap and the navigation test read these too.
 */
export const footerGroups: readonly NavGroup[] = [
  { label: "Start here", items: [...audienceLinks, contactLink] },
  {
    label: "Understanding PKD",
    items: [
      { label: "What Is PKD?", href: "/pkd" },
      { label: "Symptoms & Diagnosis", href: "/pkd/symptoms-and-diagnosis" },
      { label: "Treatment & Care", href: "/pkd/treatment-and-care" },
      { label: "Early Detection & Family Testing", href: "/pkd/early-detection" },
      { label: "Knowledge Centre", href: "/knowledge" },
    ],
  },
  {
    label: "Get Support",
    items: [
      { label: "How We Help", href: "/support" },
      { label: "How to Apply", href: "/support/process" },
      { label: "Find Care", href: "/find-care" },
      { label: "Community", href: "/community" },
      { label: "Patient & Caregiver Resources", href: "/help" },
      { label: "Request Support", comingSoon: true },
      { label: "Check Case Status", comingSoon: true },
    ],
  },
  {
    label: "Get Involved",
    items: [
      { label: "Ways to Help", href: "/get-involved" },
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Partner With Us", href: "/partner" },
      { label: "Shop", href: "/shop" },
      { label: "Campaigns", href: "/campaigns" },
      { label: "Events", href: "/events" },
      { label: "Awareness & Advocacy", href: "/awareness" },
    ],
  },
  {
    label: "Organisation",
    items: [
      { label: "About Hope4PKD", href: "/about" },
      { label: "Our Story", href: "/about/founder-story" },
      { label: "Team & Governance", href: "/about/leadership" },
      { label: "Transparency", href: "/impact" },
      contactLink,
    ],
  },
  { label: "Trust & Legal", items: legalNavLinks },
];

export function isActiveHref(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}
