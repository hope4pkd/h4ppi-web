import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react"

const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
  },
  variants: {
    variant: {
      solid: { bg: "brand.500", color: "white", _hover: { bg: "brand.600", transform: "translateY(-2px)" } },
      outline: { borderWidth: "1px", borderColor: "brand.500", color: "brand.500", _hover: { bg: "brand.50", transform: "translateY(-2px)" } },
    },
    boxShadow: {
      lg: { boxShadow: "lg" },
    },
    transition: {
      "all 0.2s": { transition: "all 0.2s" },
    },
    size: {
      sm: { h: "9", px: "4", fontSize: "sm" },
      lg: { h: "12", minW: "44", px: "7", fontSize: "md", fontWeight: "600" },
    },
  },
})

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#EAF7FC" },
          100: { value: "#D9F2FA" },
          200: { value: "#B9D8E8" },
          300: { value: "#7FA6C4" },
          400: { value: "#3E5B77" }, // muted body text
          500: { value: "#16305C" }, // deep navy - primary
          600: { value: "#122750" },
          700: { value: "#0D1D3D" },
          800: { value: "#09142B" },
          900: { value: "#050B18" },
        },
        sky: {
          50: { value: "#EAF7FC" },
          100: { value: "#D9F2FA" },
          200: { value: "#7FDCEE" },
          300: { value: "#35C3DC" },
          400: { value: "#4FB3D6" },
          500: { value: "#1B7FB8" },
          600: { value: "#0F6E93" },
          700: { value: "#0A5170" },
          800: { value: "#0A2E3B" },
          900: { value: "#052029" },
        },
        accent: {
          50: { value: "#FDEFF5" },
          100: { value: "#FBE2EE" },
          200: { value: "#F9CCE0" },
          300: { value: "#F8BBD4" },
          400: { value: "#F7B0CB" },
          500: { value: "#F6A9C5" }, // hope pink - secondary
          600: { value: "#E687AC" },
          700: { value: "#C25580" },
          800: { value: "#8E3057" },
          900: { value: "#5C1637" }, // dark pink - text on pink
        },
      },
      fonts: {
        body: { value: "var(--font-gabarito), Gabarito, sans-serif" },
        heading: { value: "var(--font-gabarito), Gabarito, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        // Simplified light-mode only semantic tokens
        bg: {
          canvas: { value: "{colors.white}" },
          default: { value: "{colors.white}" },
          subtle: { value: "{colors.gray.50}" },
        },
        fg: {
          default: { value: "{colors.gray.900}" },
          muted: { value: "{colors.gray.600}" },
          subtle: { value: "{colors.gray.500}" },
        },
        border: {
          default: { value: "{colors.gray.200}" },
          muted: { value: "{colors.gray.100}" },
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
