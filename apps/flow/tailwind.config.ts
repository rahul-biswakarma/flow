import baseConfig from "@ren/tailwind/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      keyframes: {
        bubble: {
          "0%, 100%": { transform: "translateY(60%) scale(1)", opacity: "0.4" },
          "50%": { transform: "translateY(55%) scale(1.05)", opacity: "0.6" },
        },
      },
      animation: {
        bubble: "bubble 4s ease-in-out infinite",
      },
    },
  },
} satisfies Config;
