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
  {
    label: "About",
    items: [
      { label: "Our Story", href: "/about" },
      { label: "Founder's Story", href: "/about/founder-story" },
      { label: "Impact & Transparency", href: "/impact" },
    ],
  },
  {
    label: "Get Support",
    items: [
      { label: "How We Help", href: "/support" },
      { label: "Request Support", comingSoon: true },
      { label: "Check Case Status", comingSoon: true },
      { label: "Help Centre", href: "/help" },
    ],
  },
  {
    label: "Learn",
    items: [
      { label: "Learn About PKD", href: "/knowledge" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    label: "Get Involved",
    items: [
      { label: "Campaigns", href: "/campaigns" },
      { label: "Volunteer", href: "/volunteer" },
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

const [aboutGroup, supportGroup, learnGroup, involvedGroup] = navGroups;

export const footerGroups = [
  aboutGroup,
  supportGroup,
  learnGroup,
  { label: involvedGroup.label, items: [...involvedGroup.items, ...standaloneNavLinks, donateLink] },
  { label: "Trust & Legal", items: legalNavLinks },
] as const satisfies readonly NavGroup[];

export function isActiveHref(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function isActiveGroup(pathname: string, group: NavGroup) {
  return group.items.some((item) => isNavLink(item) && isActiveHref(pathname, item.href));
}
