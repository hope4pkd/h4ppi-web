import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react"

const buttonRecipe = defineRecipe({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "full",
    fontWeight: "700",
    letterSpacing: "-0.01em",
    transition: "background-color 160ms ease, color 160ms ease, border-color 160ms ease, transform 160ms ease",
    _focusVisible: { outline: "3px solid", outlineColor: "pink.500", outlineOffset: "3px" },
  },
  variants: {
    variant: {
      solid: { bg: "action.600", color: "white", _hover: { bg: "action.700", transform: "translateY(-1px)" } },
      outline: { borderWidth: "1px", borderColor: "action.600", color: "action.700", _hover: { bg: "teal.50", transform: "translateY(-1px)" } },
      ghost: { color: "navy.900", _hover: { bg: "teal.50" } },
    },
    boxShadow: {
      lg: { boxShadow: "lg" },
    },
    transition: {
      "all 0.2s": { transition: "all 0.2s" },
    },
    size: {
      sm: { h: "9", px: "4", fontSize: "sm" },
      lg: { minH: "12", px: "7", fontSize: "md" },
    },
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
    recipes: {
      button: buttonRecipe,
    },
  },
})

export const system = createSystem(defaultConfig, config)
