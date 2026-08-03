# Responsive wireframes

Version: `1.0.0-draft`

These wireframes define hierarchy and breakpoint behaviour, not final pixel dimensions.

## Homepage — mobile, 360–390px

```text
┌──────────────────────────┐
│ Logo        Donate  Menu │  sticky, 44px targets
├──────────────────────────┤
│ Eyebrow                  │
│ No one should navigate  │
│ PKD alone.              │
│ Supporting copy         │
│ [Request support]       │
│ [View campaigns]        │
│ [Understand PKD]        │
├──────────────────────────┤
│ Approved hands image    │
├──────────────────────────┤
│ Trust strip 2 × 2       │
├──────────────────────────┤
│ Five numbered problems  │
├──────────────────────────┤
│ Pillar 01               │
│ Pillar 02               │  semantic vertical journey;
│ …                       │  no compressed orbit
├──────────────────────────┤
│ Five timeline stages    │
├──────────────────────────┤
│ Founder story           │
├──────────────────────────┤
│ Campaign empty state    │
├──────────────────────────┤
│ Four support pathways   │
├──────────────────────────┤
│ Results / targets       │
├──────────────────────────┤
│ Knowledge review state  │
├──────────────────────────┤
│ Partnership state       │
├──────────────────────────┤
│ Final three actions     │
└──────────────────────────┘
```

Forms are single-column. Inputs use a minimum 16px font and 48px height. Errors sit beside their field or in a focusable live summary. The Turnstile challenge and consent labels remain visible without horizontal scrolling.

## Homepage — tablet, 768px

The hero remains stacked to protect copy and imagery. Trust items use four columns. Problems use number/title/body rows. Pillars remain vertical until the desktop orbit has enough width. Support pathways and impact comparison become two columns.

## Homepage — desktop, 1280–1440px

```text
┌────────────────────────────────────────────────────┐
│ Logo | Home About Support Knowledge … Donate      │
├──────────────────────────┬─────────────────────────┤
│ Large editorial headline│ Approved human image    │
│ copy + actions           │ full-height crop        │
├────────────────────────────────────────────────────┤
│ Trust strip: four equal facts                      │
├────────────────────────────────────────────────────┤
│ Number  | Problem title       | Explanation         │
├────────────────────────────────────────────────────┤
│       [pillar]       [pillar]                       │
│ [pillar]     (patient centre)      [pillar]         │
│       [pillar]       [pillar]                       │
├────────────────────────────────────────────────────┤
│ 01 Request—02 Review—03 Onboard—04 Assess—05 Follow│
└────────────────────────────────────────────────────┘
```

## Admin

Desktop uses a fixed-width navigation column and fluid content area. Mobile stacks navigation above the workspace. Sensitive records are not compressed into wide tables; summary rows link to detail views, and permission-denied data is absent rather than visually disabled.
