# Design system

Version: `1.0.0-draft`

## Direction

The visual thesis is a quietly hopeful clinical-editorial platform: warm enough to feel human, precise enough to communicate medical and financial responsibility. Editorial hierarchy, dividers, timelines and whitespace take priority over repeated card grids.

## Colour tokens

| Token | Value | Use |
| --- | --- | --- |
| Navy | `#0B1F33` | Primary text, dark sections, trust and clinical precision |
| Pink | `#FF9AC3` | Hope, emphasis and focus indication with navy text |
| Teal | `#009A98` | Brand surfaces and decorative emphasis |
| Bright teal | `#00CECB` | Highlights on navy; always use navy text on solid bright teal |
| Action teal | `#007A78` | Accessible primary actions with white text |
| Warm canvas | `#FCFAF7` | Default background |

Confirmed teal `#009A98` is not used for normal white action text. Action teal `#007A78` provides the darker control colour. Focus rings use pink against both canvas and navy contexts.

## Typography

- Gabarito: UI, body copy, labels, forms and data.
- Newsreader: headings, founder storytelling and long-form editorial emphasis.
- Headings use compact line height and negative tracking; body copy targets `1.7–1.8` line height.
- Controls use at least 16px on mobile to avoid browser zoom.

## Layout

- Content maximum: Chakra `7xl`; long-form reading maximum: roughly 48–52rem.
- Section rhythm: 64px mobile, 96px desktop.
- Corners are restrained: pills for actions and status; 16–24px for major bounded surfaces.
- Borders and tonal backgrounds define grouping before shadows.

## Components

The shared layer includes page and section heroes, editorial headings, action links, feature items, empty states, form fields, consent controls, confirmation states, safe status displays, campaign progress, medical-review information and admin workspaces.

## Motion and imagery

Motion is limited to subtle focus, hover and entrance behaviour. `prefers-reduced-motion` reduces transition and animation durations and disables smooth scrolling. The approved patient/caregiver hands image is the only public human hero image in Release 1. No synthetic patient photography, remote Unsplash imagery or unapproved team photography is used.
