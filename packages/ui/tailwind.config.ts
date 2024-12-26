import baseConfig from "@ren/tailwind/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [baseConfig],
  content: ["./src/**/*.{ts,tsx}", "**/*.{ts,tsx}"],
};

export default config;
