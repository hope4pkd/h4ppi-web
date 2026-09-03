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

/** One sub-headed column inside a mega panel. */
export interface NavColumn {
  readonly label: string;
  readonly items: readonly NavItem[];
}

/** The promoted destination in the last cell of a mega panel. At most one per group. */
export interface NavFeatured {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  /** Names the destination. The whole card is the link, so a bare "Go" tells a screen reader nothing. */
  readonly cta: string;
  readonly href: string;
}

export interface NavGroup {
  readonly label: string;
  /** Flattened destinations. The footer, the sitemap and the tests read this, never `columns`. */
  readonly items: readonly NavItem[];
  /** Present on groups that render as a wide, sub-headed panel. Absent groups render as a plain list. */
  readonly columns?: readonly NavColumn[];
  readonly featured?: NavFeatured;
}

/**
 * `items` is derived rather than declared beside `columns`, because three separate consumers read the
 * flat list and hand-maintaining both copies drifts.
 */
function columnedGroup(label: string, columns: readonly NavColumn[], featured?: NavFeatured): NavGroup {
  return { label, columns, featured, items: columns.flatMap((column) => column.items) };
}

/**
 * Who the reader is, answered before what they want to read. These sit in the slim bar above the
 * primary row and are the first thing in the mobile drawer.
 *
 * The prefix is `/for/` rather than a bare `/patients`: check-content.mjs treats hrefs under the old
 * top-level patients and donors segments as dead legacy routes and fails the build on them, and
 * `/patients` is in any case already a redirect to `/support`. (Quoting either offending path literally
 * in a comment trips the same check — it greps source text, not JSX.)
 */
export const audienceLinks = [
  { label: "Patients", href: "/for/patients" },
  { label: "Caregivers", href: "/for/caregivers" },
  { label: "Health Professionals", href: "/for/health-professionals" },
  { label: "Everyone", href: "/for/everyone" },
] as const satisfies readonly NavLink[];

export const navGroups: readonly NavGroup[] = [
  // Who we are, and what earns trust in us. The one group with a single topic, so it stays a plain
  // list rather than a panel with one column in it.
  {
    label: "About",
    items: [
      { label: "About Hope4PKD", href: "/about" },
      { label: "Founder's Story", href: "/about/founder-story" },
      { label: "Leadership & Governance", href: "/about/leadership" },
      { label: "Impact & Transparency", href: "/impact" },
    ],
  },
  // The disease, not the organisation. Ordered by the reader's own questions — what it is, what I
  // notice and how they confirm it, what can be done — rather than by our source article's headings.
  columnedGroup(
    "Learn About PKD",
    [
      {
        label: "The disease",
        items: [
          { label: "What Is PKD?", href: "/pkd" },
          { label: "Symptoms & Diagnosis", href: "/pkd/symptoms-and-diagnosis" },
          { label: "Treatment & Care", href: "/pkd/treatment-and-care" },
        ],
      },
      {
        label: "Acting early",
        items: [
          { label: "Early Detection & Family Testing", href: "/pkd/early-detection" },
          { label: "Knowledge Centre", href: "/knowledge" },
        ],
      },
    ],
    {
      eyebrow: "Just diagnosed",
      title: "The patient route",
      description: "A shorter path through these same pages, in the order most people need them.",
      cta: "Start here",
      href: "/for/patients",
    },
  ),
  columnedGroup("Get Support", [
    {
      label: "Start here",
      items: [
        { label: "How We Help", href: "/support" },
        { label: "Patient Support Process", href: "/support/process" },
        { label: "Patient & Caregiver Resources", href: "/help" },
      ],
    },
    {
      label: "Find help",
      items: [
        { label: "Find Care", href: "/find-care" },
        { label: "Community", href: "/community" },
      ],
    },
    {
      label: "When intake opens",
      items: [
        { label: "Request Support", comingSoon: true },
        { label: "Check Case Status", comingSoon: true },
      ],
    },
  ]),
  columnedGroup("Get Involved", [
    {
      label: "Give time",
      items: [
        { label: "Volunteer", href: "/volunteer" },
        { label: "Events", href: "/events" },
      ],
    },
    {
      label: "Work with us",
      items: [
        { label: "Partner With Us", href: "/partner" },
        { label: "Awareness", href: "/awareness" },
      ],
    },
  ]),
  columnedGroup("Campaigns", [
    {
      label: "Give",
      items: [
        { label: "Campaigns", href: "/campaigns" },
        { label: "Donate", href: "/donate" },
        { label: "Shop", href: "/shop" },
      ],
    },
    {
      label: "Where it goes",
      items: [{ label: "Impact & Transparency", href: "/impact" }],
    },
  ]),
];

export const homeLink = { label: "Home", href: "/" } as const satisfies NavLink;

export const contactLink = { label: "Contact", href: "/contact" } as const satisfies NavLink;

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
 * The footer mirrors the header group for group, then adds the audience routes the slim bar carries
 * on desktop — the bar is hidden below md, so the footer is where a phone finds them a second time.
 */
export const footerGroups: readonly NavGroup[] = [
  { label: "Start here", items: [...audienceLinks, contactLink] },
  ...navGroups,
  { label: "Trust & Legal", items: legalNavLinks },
];

export function isActiveHref(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function isActiveGroup(pathname: string, group: NavGroup) {
  return group.items.some((item) => isNavLink(item) && isActiveHref(pathname, item.href));
}
