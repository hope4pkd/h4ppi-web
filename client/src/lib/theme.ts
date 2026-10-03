import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react"

const buttonRecipe = defineRecipe({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "lg",
    fontWeight: "700",
    letterSpacing: "-0.01em",
    transitionProperty: "background-color, color, border-color",
    transitionDuration: "fast",
    transitionTimingFunction: "standard",
    _focusVisible: { outline: "3px solid", outlineColor: "pink.500", outlineOffset: "3px" },
  },
  variants: {
    variant: {
      solid: { bg: "action.600", color: "white", _hover: { bg: "action.700" } },
      outline: { borderWidth: "1px", borderColor: "action.600", color: "action.700", _hover: { bg: "teal.50" } },
      ghost: { color: "navy.900", _hover: { bg: "teal.50" } },
    },
    size: {
      sm: { h: "9", px: "4", fontSize: "sm" },
      lg: { minH: "12", px: "6", fontSize: "md" },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "lg",
  },
})

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        navy: {
          50: { value: "#EFF4F8" },
          100: { value: "#D7E2EA" },
          200: { value: "#AFC1CF" },
          300: { value: "#8199AB" },
          400: { value: "#567186" },
          500: { value: "#344F65" },
          600: { value: "#243D52" },
          700: { value: "#182F43" },
          800: { value: "#10273B" },
          900: { value: "#0B1F33" },
        },
        teal: {
          50: { value: "#E6F8F7" },
          100: { value: "#C3EFEE" },
          200: { value: "#8FDEDC" },
          300: { value: "#52C8C5" },
          400: { value: "#1BAEAB" },
          500: { value: "#009A98" },
          600: { value: "#007A78" },
          700: { value: "#006260" },
          800: { value: "#084D4C" },
          900: { value: "#083E3D" },
        },
        pink: {
          50: { value: "#FFF0F6" },
          100: { value: "#FFE0ED" },
          200: { value: "#FFC5DC" },
          300: { value: "#FFACCD" },
          400: { value: "#FF9AC3" },
          500: { value: "#F47FB0" },
          600: { value: "#D95D91" },
          700: { value: "#B53D72" },
          800: { value: "#8E2B59" },
          900: { value: "#651D40" },
        },
        action: {
          50: { value: "#E6F8F7" },
          100: { value: "#C3EFEE" },
          200: { value: "#8FDEDC" },
          300: { value: "#52C8C5" },
          400: { value: "#1BAEAB" },
          500: { value: "#008B89" },
          600: { value: "#007A78" },
          700: { value: "#006260" },
          800: { value: "#084D4C" },
          900: { value: "#083E3D" },
        },
        canvas: {
          50: { value: "#FCFAF7" },
        },
        brightTeal: {
          500: { value: "#00CECB" },
        },
      },
      fonts: {
        body: { value: "var(--font-gabarito), Gabarito, sans-serif" },
        heading: { value: "var(--font-newsreader), Newsreader, Georgia, serif" },
      },
      // Elevation is tinted with navy rather than black so shadows read as part of the palette.
      // Wide radius, low opacity: depth you notice only when it is missing.
      shadows: {
        soft: { value: "0 1px 2px rgba(11, 31, 51, 0.04), 0 8px 24px -12px rgba(11, 31, 51, 0.10)" },
        lift: { value: "0 2px 4px rgba(11, 31, 51, 0.05), 0 18px 40px -20px rgba(11, 31, 51, 0.18)" },
        float: { value: "0 4px 8px rgba(11, 31, 51, 0.05), 0 32px 70px -30px rgba(11, 31, 51, 0.28)" },
        header: { value: "0 1px 0 rgba(11, 31, 51, 0.06), 0 10px 30px -24px rgba(11, 31, 51, 0.45)" },
      },
      durations: {
        fast: { value: "160ms" },
        base: { value: "240ms" },
        slow: { value: "420ms" },
      },
      easings: {
        standard: { value: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
        entrance: { value: "cubic-bezier(0.16, 1, 0.3, 1)" },
      },
      sizes: {
        // Line-length caps. Body copy that runs the full 7xl container is the fastest way to look untended.
        measureTight: { value: "54ch" },
        measure: { value: "68ch" },
        measureWide: { value: "78ch" },
      },
      // Spacing rhythm. Fluid like the type scale, and for the same reason: these are relationships, not
      // numbers, so they must not be re-typed at a call site. ContentSection and the layerStyles below own
      // them — a page should never need to pass `mt` or `p` to get the house rhythm.
      spacing: {
        // Section heading -> its content, and between sibling blocks inside a section.
        blockGap: { value: "clamp(2.5rem, 1.9rem + 2.4vw, 3.5rem)" },
        // Padding for a card sitting in a grid.
        cardPad: { value: "clamp(1.5rem, 1.35rem + 0.6vw, 1.75rem)" },
        // Padding for a large standalone panel.
        panelPad: { value: "clamp(1.5rem, 1.1rem + 1.6vw, 2.5rem)" },
      },
    },
    semanticTokens: {
      colors: {
        // Simplified light-mode only semantic tokens
        bg: {
          canvas: { value: "{colors.canvas.50}" },
          default: { value: "{colors.canvas.50}" },
          subtle: { value: "{colors.teal.50}" },
        },
        fg: {
          default: { value: "{colors.navy.900}" },
          muted: { value: "{colors.navy.500}" },
          subtle: { value: "{colors.navy.400}" },
        },
        border: {
          default: { value: "{colors.navy.100}" },
          muted: { value: "{colors.navy.50}" },
        },
      },
    },
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    // The type scale. Fluid clamp() values rather than responsive objects: one token value, no visible
    // step at md, and headings that keep their proportions at every width. Reference these with
    // textStyle="…" — never re-type fontSize/lineHeight/letterSpacing at a call site.
    textStyles: {
      display: {
        value: {
          fontFamily: "heading",
          fontSize: "clamp(2.75rem, 1.6rem + 4.8vw, 4.5rem)",
          lineHeight: "0.94",
          letterSpacing: "-0.045em",
          fontWeight: "500",
        },
      },
      pageTitle: {
        value: {
          fontFamily: "heading",
          fontSize: "clamp(2.25rem, 1.5rem + 3.2vw, 3.75rem)",
          lineHeight: "1.0",
          letterSpacing: "-0.035em",
          fontWeight: "500",
        },
      },
      sectionTitle: {
        value: {
          fontFamily: "heading",
          fontSize: "clamp(1.875rem, 1.35rem + 2.2vw, 3rem)",
          lineHeight: "1.06",
          letterSpacing: "-0.03em",
          fontWeight: "500",
        },
      },
      cardTitle: {
        value: {
          fontFamily: "heading",
          fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.625rem)",
          lineHeight: "1.2",
          letterSpacing: "-0.02em",
          fontWeight: "500",
        },
      },
      // Card and feature headings opt back to the sans face — serif at small sizes reads as decoration.
      featureTitle: {
        value: {
          fontFamily: "body",
          fontSize: "1.25rem",
          lineHeight: "1.3",
          letterSpacing: "-0.015em",
          fontWeight: "700",
        },
      },
      eyebrow: {
        value: {
          fontFamily: "body",
          fontSize: "0.9375rem",
          lineHeight: "1.4",
          letterSpacing: "0",
          fontWeight: "600",
        },
      },
      lede: {
        value: {
          fontFamily: "body",
          fontSize: "clamp(1.0625rem, 1rem + 0.45vw, 1.25rem)",
          lineHeight: "1.65",
          letterSpacing: "-0.005em",
        },
      },
      body: {
        value: { fontFamily: "body", fontSize: "1rem", lineHeight: "1.7" },
      },
      bodySm: {
        value: { fontFamily: "body", fontSize: "0.9375rem", lineHeight: "1.65" },
      },
      quote: {
        value: {
          fontFamily: "heading",
          fontSize: "clamp(1.5rem, 1.1rem + 1.6vw, 2rem)",
          lineHeight: "1.3",
          letterSpacing: "-0.02em",
          fontStyle: "italic",
        },
      },
      // Serif figures for pathway steps and ledger rows.
      numeral: {
        value: {
          fontFamily: "heading",
          fontSize: "clamp(2rem, 1.7rem + 1.2vw, 2.75rem)",
          lineHeight: "1",
          letterSpacing: "-0.02em",
          fontWeight: "500",
          fontVariantNumeric: "tabular-nums lining-nums",
        },
      },
      // Small ordinal markers.
      counter: {
        value: {
          fontFamily: "body",
          fontSize: "0.875rem",
          lineHeight: "1",
          letterSpacing: "0.08em",
          fontWeight: "800",
          fontVariantNumeric: "tabular-nums",
        },
      },
    },
    // Surfaces. Every card in the app was the same border/radius trio copy-pasted; these name it once.
    // Padding lives here too, so a surface cannot be padded two different ways at two call sites.
    // `card*` = sits in a grid (cardPad). `panel*` = large and standalone (panelPad).
    layerStyles: {
      card: {
        value: {
          bg: "white",
          borderWidth: "1px",
          borderColor: "navy.100",
          borderRadius: "xl",
          p: "cardPad",
        },
      },
      cardInteractive: {
        value: {
          bg: "white",
          borderWidth: "1px",
          borderColor: "navy.100",
          borderRadius: "xl",
          p: "cardPad",
          transitionProperty: "border-color",
          transitionDuration: "fast",
          transitionTimingFunction: "standard",
          _hover: { borderColor: "teal.300" },
        },
      },
      panel: {
        value: {
          bg: "white",
          borderWidth: "1px",
          borderColor: "navy.100",
          borderRadius: "xl",
          p: "panelPad",
        },
      },
      panelDark: {
        value: {
          bg: "navy.900",
          color: "white",
          borderRadius: "xl",
          p: "panelPad",
        },
      },
      panelTeal: {
        value: { bg: "teal.50", borderWidth: "1px", borderColor: "teal.200", borderRadius: "xl", p: "panelPad" },
      },
      panelPink: {
        value: { bg: "pink.50", borderWidth: "1px", borderColor: "pink.200", borderRadius: "xl", p: "panelPad" },
      },
      hairline: {
        value: { borderTopWidth: "1px", borderColor: "navy.100" },
      },
      hairlineOnDark: {
        value: { borderTopWidth: "1px", borderColor: "whiteAlpha.200" },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
  globalCss: {
    // Stops the orphaned last word that makes an otherwise good headline look untended. Progressive —
    // browsers without text-wrap simply keep the current behaviour.
    "h1, h2, h3, h4, blockquote": { textWrap: "balance" },
    p: { textWrap: "pretty" },
  },
})

export const system = createSystem(defaultConfig, config)
