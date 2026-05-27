import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    breakpoints: {
      base: "30em",
      sm: "48em",
      md: "70.0625em",
      lg: "62em",
      xl: "80em",
      "2xl": "96em",
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
      animations: {
        shimmer: {
          value: "shimmer 0.65s ease forwards",
        },
      },
      keyframes: {
        shimmer: {
          value: {
            "0%": { left: "-80%" },
            "100%": { left: "140%" },
          },
        },
      },
    },

    semanticTokens: {
      colors: {
        bgApp: {
          value: { base: "#f7fafc", _dark: "#151d2dff" },
        },
        textApp: {
          value: { base: "#2d3748", _dark: "#e2e8f0" },
        },
        brandSubtle: {
          value: { base: "{colors.brand.500}", _dark: "#ff8a75" },
        },
      },
    },

    recipes: {
      button: {
        variants: {
          variant: {
            shimmer: {
              position: "relative",
              overflow: "hidden",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-80%",
                width: "50%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transform: "skewX(-20deg)",
              },
              _hover: {
                _before: {
                  animation: "{animations.shimmer}",
                },
              },
            },
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
