import type {
  themeAccentColors,
  themeAppearance,
  themeGrayColors,
  themePanelBackground,
  themeScaling,
} from "@ren/ui/themes";
import type { Tables } from "./internal-data-contract";
export type User = Tables<"users">;

export type Project = Tables<"projects">;

export type ProjectWithPages = Tables<"projects"> & {
  pages: Tables<"pages">[];
  config: Record<string, unknown>;
};

export type Component = Tables<"components">;
export type Properties = Tables<"properties">;

export type Theme = {
  appearance: (typeof themeAppearance)[number];
  panelBackground: (typeof themePanelBackground)[number];
  scale: (typeof themeScaling)[number];
  accentColor: (typeof themeAccentColors)[number];
  grayColor: (typeof themeGrayColors)[number];
};
