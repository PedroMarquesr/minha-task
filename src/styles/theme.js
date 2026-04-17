import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      base: "30em", // 480px
      sm: "48em", // 1121px / 16 "48em"
      md: "70.0625em", // 768px "70.0625em"
      lg: "62em", // 992px
      xl: "80em", // 1280px
      "2xl": "96em", // 1536px
    },

    tokens: {
      colors: {
        brand: {
          500: { value: "tomato" },
        },
      },
      fonts: {
        heading: { value: "var(--font-dm-serif)" },
        body: { value: "var(--font-jost)" },
      },
    },


    semanticTokens: {
      colors: {
        bgApp: {
          value: { base: "#f7fafc", _dark: "#1a202c" },
        },
        textApp: {
          value: { base: "#2d3748", _dark: "#e2e8f0" },
        },
        brandSubtle: {
          value: { base: "{colors.brand.500}", _dark: "#ff8a75" },
        }
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
