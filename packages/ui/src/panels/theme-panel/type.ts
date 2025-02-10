import type { THEME_ACCENT_COLORS, THEME_GRAY_COLORS } from "./constants";

type AccentColor = (typeof THEME_ACCENT_COLORS)[number];
type GrayColor = (typeof THEME_GRAY_COLORS)[number];

export type ThemeData = {
  accentColor: AccentColor;
  grayColor: GrayColor;
  appearance: "light" | "dark";
  radius: "none" | "small" | "medium" | "large" | "full";
  scaling: "90%" | "95%" | "100%" | "105%" | "110%";
  panelBackground: "translucent" | "solid";
};
