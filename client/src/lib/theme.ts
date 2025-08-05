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
      sm: { padding: "4", fontSize: "12px" },
      lg: { padding: "8", fontSize: "24px" },
    },
  },
})

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e3f2e8" },
          100: { value: "#c1e0ca" },
          200: { value: "#9dceab" },
          300: { value: "#79bc8c" },
          400: { value: "#57ab6d" },
          500: { value: "#2E7D32" }, // health green - primary
          600: { value: "#256528" },
          700: { value: "#1b491e" },
          800: { value: "#102d13" },
          900: { value: "#061308" },
        },
        accent: {
          50: { value: "#FEF3C7" },
          100: { value: "#FEF0B2" },
          200: { value: "#FDE68A" },
          300: { value: "#FCD34D" },
          400: { value: "#FBBF24" },
          500: { value: "#F59E0B" }, // hope orange - secondary
          600: { value: "#D97706" },
          700: { value: "#B45309" },
          800: { value: "#92400E" },
          900: { value: "#78350F" },
        },
      },
      fonts: {
        body: { value: "Poppins, sans-serif" },
        heading: { value: "Poppins, sans-serif" },
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