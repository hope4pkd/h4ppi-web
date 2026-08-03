# DESIGN_SPEC.md — "Warm Sky Editorial" design system

Extracted from `client/src/lib/theme.ts`, `client/src/app/globals.css`, and the shared components.
Rule: **every color, font, and variant below comes from `theme.ts` tokens — never hardcode values.**

## Color tokens (Chakra scales in theme.ts; hex shown for reference only)

| Scale | Anchor value | Role |
|---|---|---|
| `navy.50–900` | `navy.900` = #0B1F33 | Primary text, dark hero/section backgrounds; `navy.500` muted text, `navy.100/200` borders |
| `teal.50–900` | `teal.500` = #009A98 | Brand accent; `teal.50` subtle section background |
| `action.50–900` | `action.600` = #007A78 | Interactive: buttons, links, eyebrows (`action.700` text-on-light) |
| `pink.50–900` | `pink.400` = #FF9AC3 | Warm accent, selection highlight, focus outlines, hero decoration |
| `canvas.50` | #FCFAF7 | Page background |
| `brightTeal.500` | #00CECB | Eyebrow text on navy backgrounds, hero decoration |

Semantic tokens (light-mode only): `bg.canvas/default` → canvas.50, `bg.subtle` → teal.50,
`fg.default` → navy.900, `fg.muted` → navy.500, `border.default` → navy.100.

`globals.css` mirrors five values as `--hope-navy/-pink/-teal/-action/-canvas` for base styles only.
**Constraint:** these two files must stay in sync; components use Chakra tokens, not the CSS vars.

## Typography

- **Body:** Gabarito (next/font, `--font-gabarito`) — `fonts.body`.
- **Headings:** Newsreader serif (`--font-newsreader`) — `fonts.heading`; Chakra `Heading` uses it by default.
  Headings inside cards/features opt back to sans via `fontFamily="body"` (see `FeatureItem`).
- Observed scale (from `PublicPage.tsx`):
  - h1 hero: `fontSize={{ base: "4xl", md: "6xl" }}`, `lineHeight 0.98`, `letterSpacing -0.04em`, white on navy.
  - h2 section: `{ base: "3xl", md: "5xl" }`, `lineHeight 1.02`, `letterSpacing -0.035em`, navy.900.
  - h3 card: `2xl` (EmptyState) or `xl` sans (FeatureItem).
  - Eyebrow: `sm`, weight 800, `letterSpacing 0.12em`, uppercase; `action.700` on light, `brightTeal.500` on navy.
  - Body copy: `navy.500`, `lineHeight 1.7–1.75`; lede text `{ base: "lg", md: "xl" }` in heroes.

## Spacing & layout rhythm

- Sections: `py={{ base: 16, md: 24 }}` inside `Container maxW="7xl"` — use `ContentSection`, don't rebuild it.
- Section tones: `canvas | white | teal | pink | navy` (the `ContentSection` `tone` prop). Alternate tones between sections.
- Card padding: `p={{ base: 6, md: 10 }}` (large) or `{ base: 5, md: 9 }` (forms). Grid gaps: 5–6.
- Breakpoints: sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536.

## Component variants

- **Button recipe** (`theme.ts`): pill (`borderRadius full`), weight 700; variants `solid` (action.600 bg),
  `outline` (action.600 border), `ghost` (navy text, teal.50 hover); sizes `sm` (h 9) and `lg` (minH 12).
  Hover lifts `translateY(-1px)`. Links styled as buttons use `<Button asChild><Link …>`.
- **Card:** white `Box`, `borderWidth="1px" borderColor="navy.100" borderRadius="2xl"` (Chakra v3 has no Card).
- **Hero (`PageHero`):** navy.900 background, two absolutely-positioned decorative circles
  (pink.400 @ 0.16, brightTeal.500 @ 0.12, `aria-hidden`), eyebrow + h1 + lede in a `maxW="3xl"` stack.
- **FeatureItem:** top border `2px teal.500`, optional number label, sans h3.
- **EmptyState:** card + `CircleAlert` lucide icon + optional outline action button — the standard
  "not live yet" surface; use it for anything gated off, never fake content.
- Shared kit lives in `client/src/components/common/PublicPage.tsx`
  (Eyebrow, SectionHeading, PageHero, ContentSection, EmptyState, ActionLink, InfoPage, FeatureGrid/Item).
  **Compose these; do not fork per-page variants.**

## Accessibility invariants (do not regress)

- Global `:focus-visible`: 3px pink outline, 3px offset (mirrored in the button recipe).
- `.skip-link` to `#main-content` in the root layout; `scroll-padding-top: 96px` for the sticky header.
- `prefers-reduced-motion` kills animations globally.
- Form inputs: `minH 48px`, `fontSize 16px` (prevents iOS zoom). Native `<select>` uses `.hope-native-select`.
- Decorative elements carry `aria-hidden`; icons in buttons are `aria-hidden` with text labels.
- Light mode only: `color-scheme: light`, viewport `themeColor #0B1F33`.

## Known inconsistencies (flagged, not fixed — confirm with owner before changing)

- `.hope-native-select` hardcodes `#afc1cf` / `#0b1f33` (duplicates navy.200/navy.900) instead of referencing vars.
- The button recipe has `boxShadow` and `transition` as variant *axes* (inferred to be a migration artifact — confirm with owner).
- `@import "tailwindcss"` sits in globals.css but no Tailwind utility is used anywhere; forbidden per AGENTS.md.
- Some page files pass one-off `fontSize`/spacing values inline rather than through a shared component.
