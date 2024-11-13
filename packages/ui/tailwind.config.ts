import type { Config } from "tailwindcss";

const radixColors = [
  "gray",
  "accent",
  "crimson",
  "jade",
  "indigo",
  "green",
  "blue",
  "orange",
];

const generateRadixColorScale = (color: string) => {
  const obj: { [key: string]: string } = {};
  for (let i = 1; i <= 12; i++) {
    obj[i] = `var(--${color}-${i})`;
    obj[`a${i}`] = `var(--${color}-a${i})`;
  }
  obj.surface = `var(--${color}-surface)`;
  obj.indicator = `var(--${color}-indicator)`;
  obj.track = `var(--${color}-track)`;
  obj.contrast = `var(--${color}-contrast)`;
  return obj;
};

const radixColorObject = radixColors.reduce(
  (acc, color) => {
    acc[color] = generateRadixColorScale(color);
    return acc;
  },
  {} as { [key: string]: { [key: string]: string } },
);

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "inset-gray": "inset 0 -1px 0 0 var(--gray-3)",
      },
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        border: "border 4s linear infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
      colors: {
        ...radixColorObject,
        accent: generateRadixColorScale("accent"),
        focus: generateRadixColorScale("focus"),
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      backgroundColor: {
        base: "var(--color-background)",
        "panel-solid": "var(--color-panel-solid)",
        "panel-translucent": "var(--color-panel-translucent)",
        surface: "var(--color-surface)",
        overlay: "var(--color-overlay)",
      },
      borderRadius: {
        xs: "var(--radius-1)",
        sm: "var(--radius-2)",
        base: "var(--radius-3)",
        md: "var(--radius-4)",
        lg: "var(--radius-5)",
        xl: "var(--radius-6)",
      },
      borderColor: {
        "outline-00": "var(--gray-3)",
        "outline-01": "var(--gray-4)",
        "outline-02": "var(--gray-5)",
        "outline-03": "var(--gray-6)",
        "outline-04": "var(--gray-7)",
        surface: "var(--gray-surface)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
