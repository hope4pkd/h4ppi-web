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
  Card and feature headings opt back to sans — serif at small sizes reads as decoration.
- **The scale lives in `theme.ts` `textStyles`. Never re-type `fontSize`/`lineHeight`/`letterSpacing` at a
  call site — use `textStyle="…"`.** Values are fluid `clamp()` so there is no visible step at `md`:

| textStyle | Used for | Face |
|---|---|---|
| `display` | Home h1 | serif, clamp 2.75→4.5rem, lh .94, ls -.045em |
| `pageTitle` | `PageHero` h1 (all other pages) | serif, clamp 2.25→3.75rem, lh 1.0, ls -.035em |
| `sectionTitle` | `SectionHeading` / `SplitFeature` / `StatementBand` h2 | serif, clamp 1.875→3rem, lh 1.06 |
| `cardTitle` | `EmptyState`, `ComingSoonPanel`, hub cards h3 | serif, clamp 1.375→1.625rem |
| `featureTitle` | `FeatureItem` / `FeatureCard` / `LedgerRow` / `StepList` h3 | **sans**, 1.25rem, weight 700 |
| `eyebrow` | `Eyebrow` (all surfaces) | sans, .9375rem, weight 600, sentence case (no uppercase, no tracking) |
| `lede` | Hero and section descriptions | sans, clamp 1.0625→1.25rem, lh 1.65 |
| `body` / `bodySm` | Body copy | sans, 1rem / .9375rem, lh 1.7 / 1.65 |
| `quote` | `PullQuote` | serif italic, clamp 1.5→2rem |
| `numeral` | `StepList` / `LedgerRow` figures | serif, clamp 2→2.75rem, lh 1, tabular |
| `counter` | small ordinals (`FeatureItem` number) | sans, .875rem, weight 800, tabular-nums |

- Eyebrow colour follows the surface: `action.700` on light, `brightTeal.500` on navy, `navy.900` on
  brightTeal — pass `<Eyebrow surface="dark|brand">` (see "Component variants" for why it is not a boolean).
- `globalCss` applies `text-wrap: balance` to headings and `pretty` to paragraphs.

## Spacing & layout rhythm

**Spacing is tokenised like the type scale, and for the same reason — these are relationships, not numbers.
A page should never pass `mt` or `p` to get the house rhythm; the components own it.**

- `spacing` tokens (fluid `clamp()`, in `theme.ts`):
  - `blockGap` 40→56px — section heading → its content, and between sibling blocks in a section.
  - `cardPad` 24→28px — a card sitting in a grid. Baked into `layerStyle="card"`/`cardInteractive`.
  - `panelPad` 24→40px — a large standalone panel. Baked into `panel`/`panelDark`/`panelTeal`/`panelPink`.
- **`ContentSection` applies `blockGap` between its direct children automatically.** To group two children
  more tightly, wrap them in their own `<VStack gap={…}>` — an explicit grouping, not a stray margin.
  Pass `gap="none"` to opt out entirely.
- Sections: use `ContentSection`, don't rebuild it. It owns the rhythm:
  - `size`: `tight` `{base:5, md:6}` · `compact` `{base:10, md:14}` · `default` `{base:16, md:24}` ·
    `spacious` `{base:20, md:32}`.
  - `width`: `narrow` 3xl · `default` 7xl · `wide` 8xl · `full` (no Container, for bleed).
  - `tone`: `canvas | white | teal | pink | navy | brightTeal`; `divider` adds a bottom hairline.
  - **Alternate tones and sizes between sections** — a run of identically-padded full-width sections is
    what makes a page read as templated. Concretely, two rules the pages added on 2026-08-25 follow and
    every new page should:
    1. **No two adjacent `ContentSection`s share both `tone` and `size`.**
    2. **At most one `FeatureGrid` per page.** Carry the other sections with `Ledger`, `DirectoryList`,
       `StepList`, `SplitFeature` or `StatementBand`. Hero → grid → `EmptyState`, repeated down the
       page, is the shape to avoid — see "Three list primitives" under Component variants.
- **Measure caps** (`sizes` tokens): `measureTight` 54ch · `measure` 68ch · `measureWide` 78ch. Body copy
  must carry one; text running the full `7xl` container is the fastest way to look untended.
- **Column counts are bounded by measure, not by item count.** `StepList` caps at three columns however
  many steps it is given: five columns inside the 7xl container leaves ~230px each — about 32 characters
  per line — at *every* width. Check the arithmetic before adding an n-up grid.
- Breakpoints: sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536.

## Surfaces, elevation & motion

- **`layerStyles` replace hand-rolled card markup, padding included:** `card` · `cardInteractive` (hover
  lift) · `panel` · `panelDark` · `panelTeal` · `panelPink` · `hairline` · `hairlineOnDark`.
  Use `layerStyle="card"`, not the border trio — and do not add `p` at the call site, the surface carries it.
  `card*` = sits in a grid (`cardPad`); `panel*` = large and standalone (`panelPad`).
- **Cards and panels carry no resting shadow** (border only, radius `xl`); `cardInteractive` hover changes the
  border colour and nothing moves. Shadows are reserved for `MediaFrame` and the sticky header.
- **`shadows` tokens:** `soft` · `lift` · `float` · `header`. All navy-tinted (`rgba(11,31,51,…)`), wide
  radius, low opacity, so elevation reads as part of the palette. Never write a raw `rgba()` shadow.
- **Motion tokens:** `durations` `fast 160ms` / `base 240ms` / `slow 420ms`; `easings` `standard` /
  `entrance`. Use `transitionDuration="fast"` + `transitionTimingFunction="standard"`, not literals.
  Anything that moves must also be neutralised under `prefers-reduced-motion` — the global rule only makes
  transitions instant, so a hover `transform` needs an explicit `transform: none` in a reduced-motion query
  (see `MediaFrame`), otherwise it snaps.

## Component variants

- **Button recipe** (`theme.ts`): `borderRadius lg`, weight 700; variants `solid` (action.600 bg),
  `outline` (action.600 border), `ghost` (navy text, teal.50 hover); sizes `sm` (h 9) and `lg` (minH 12).
  `defaultVariants` are `solid` / `lg`, so an `IconButton` or compact button **must** pass `size="sm"`.
  Hover is a colour change only — no lift, no shadow. `ActionLink` shows its trailing arrow on `solid`
  only, so a pair of CTAs always has one visible primary.
- **Links styled as buttons go through `ButtonLink`** (`components/common/ButtonLink.tsx`) — the single
  `"use client"` leaf that owns the `<Button asChild><Link/></Button>` composition. Do not inline that
  pattern anywhere else: authored inside a *server* component, the `<Link>` reaches Chakra as a
  `React.lazy` client reference and `asChild`'s `React.Children.only` throws during prerender.
- **Card:** `layerStyle="card"` for grid cards, `panel` for large standalone ones (Chakra v3 has no Card component).
- **Hero (`PageHero`):** `tone="light"` (default) is canvas with navy text and a bottom hairline;
  `tone="navy"` is opt-in for pages where a dark opening means something (`/get-involved`, `/donate`).
  No decorative blooms or blobs. `eyebrow` is optional; `aside` puts a panel beside the text at lg.
  Children inside a light hero must not pass `surface="dark"`.
- **FeatureItem:** top border `2px teal.500`, optional number label, sans h3; optional `href` makes the title a link.
- **FeatureCard** has no icon chip. Icon-in-a-circle cards are a generic generated-UI pattern; the title carries the card.
- **EmptyState:** panel + serif title + body + optional outline action, no icon — the standard "not live yet" surface.
  For a card that is mostly real content with one thing pending, `FeatureCard`'s `status` prop states it
  in place instead. Never fake content.
- **Three list primitives, and the choice between them is a design decision, not a preference.** Reaching
  for `FeatureGrid` every time is what makes consecutive pages look like one template with the words
  swapped:
  - **`Ledger` / `LedgerRow`** — numbered hairline rows, no link. A *reading order*: these steps or facts
    happen in this sequence and the numbers mean something.
  - **`DirectoryList` / `DirectoryRow`** — unnumbered hairline rows, the whole row is a link. For "here
    are six places to go next", which is most of what an audience hub does.
  - **`FeatureGrid` / `FeatureCard` / `FeatureItem`** — equal-weight cards in a grid. Peers with no
    order and no destination. If the items *do* have an order, or every one of them is a link, one of
    the two above is the right component.
- **`FaqList`** takes `{ question, answer }[]` and renders native `<details>` — not Chakra's `Accordion`.
  These are static server-rendered pages: the browser's own find-in-page has to reach the answers, and an
  accordion would drag a client boundary onto every page carrying an FAQ for no behaviour `<details>`
  lacks. A page that also emits `FAQPage` JSON-LD builds it from the same array (see `/help`).
- Shared kit lives in `client/src/components/common/PublicPage.tsx`:
  Eyebrow, SectionHeading, PageHero, ContentSection, EmptyState, ActionLink, TextLink, ComingSoon*,
  InfoPage, FeatureGrid/Item, plus the section-level set — **Ledger/LedgerRow, DirectoryList/DirectoryRow,
  FaqList, StepList, FeatureCard, SplitFeature, MediaFrame, Portrait, PullQuote, StatementBand**.
  **Compose these; do not fork per-page variants.**
- **`VideoEmbed`** (`components/common/VideoEmbed.tsx`, a client leaf) embeds a YouTube video in the
  MediaFrame treatment. It renders a button over the thumbnail and swaps in a `youtube-nocookie` player
  only on click. Video IDs and titles live in `content/media.ts`; video files never go in `public/`.
  Unless the reader allowed YouTube video (`useConsent()` from `lib/consent.ts`), the click shows a
  prompt in the frame instead: "Allow and play" or "Watch on YouTube".
- **`CookieBanner`** (`components/layout/CookieBanner.tsx`, mounted in the root layout) is a fixed white
  bar at the bottom, not a dialog: no focus trap, no scrim. One short message linking the cookies notice,
  then a "Cookie settings" link (to `/cookies`) and two buttons of the same size, side by side at every
  width: "Accept all" and "Decline all", both solid so neither answer is favoured. It is the one fixed surface
  besides the header, so it carries the `float` shadow. **`CookieChoice`** (`components/legal/`) offers
  "Decline all", "YouTube video only" and "Accept all" on `/cookies`, with the current answer solid and
  `aria-pressed`. **`GoogleTag`** (`components/layout/`, root layout, renders nothing) loads Google Tag
  Manager only on "Accept all", in production only. Anything new that
  stores data on the device or calls a third party must read `useConsent()` and be listed in the
  cookies notice in `content/policies.ts`.
- **`SourceNote`** (`components/common/SourceNote.tsx`) closes any page carrying clinical information:
  a hairline footnote naming the external source, linking it, and stating that Hope4PKD has not medically
  reviewed the page. Its inline links are Chakra `Link` (external) and `next/link` wrapping a `Text` span —
  never `asChild` (Children.only) and never `chakra.a` (resolves to undefined under `optimizePackageImports`).

## Accessibility invariants (do not regress)

- Global `:focus-visible`: 3px pink outline, 3px offset (mirrored in the button recipe).
- `.skip-link` to `#main-content` in the root layout; `scroll-padding-top: 96px` for the sticky header.
- `prefers-reduced-motion` kills animations globally.
- Form inputs: `minH 48px`, `fontSize 16px` (prevents iOS zoom). Native `<select>` uses `.hope-native-select`.
- Decorative elements carry `aria-hidden`; icons in buttons are `aria-hidden` with text labels.
- Light mode only: `color-scheme: light`, viewport `themeColor #0B1F33`.

## Known inconsistencies (flagged, not fixed — confirm with owner before changing)

- `.hope-native-select` hardcodes `#afc1cf` / `#0b1f33` (duplicates navy.200/navy.900) instead of referencing vars.
- `@import "tailwindcss"` sits in globals.css but no Tailwind utility is used anywhere; forbidden per AGENTS.md.
- The 13 content pages and 13 policy pages still pass some one-off `fontSize`/spacing values inline
  (e.g. `PolicyDocument.tsx` h2 at `{base:"2xl", md:"3xl"}`). They inherit the new scale through the shared
  kit but have not been swept onto `textStyle` tokens individually. Home, Header and Footer have been.
- `components/legal/LegalPage.tsx` is dead (zero imports) and references `brand.500` / `gray.*` tokens that
  do not exist in `theme.ts`. Delete it before a future model copies the pattern.
- Resolved 2026-09-28: the Home hero now shows `patient-caregiver-hands.png` as a full-width band at its
  native ~2.5:1 ratio instead of upscaling it into a portrait slot. A higher-resolution original would
  still help on 2x screens wider than ~1000px.
