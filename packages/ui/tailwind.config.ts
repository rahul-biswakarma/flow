import baseConfig from "@ren/tailwind/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  presets: [baseConfig],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
};

export default config;
