export interface StyleData {
  // Position
  x?: string;
  y?: string;

  // Layout
  width?: string;
  height?: string;
  display?: "block" | "flex" | "grid";
  flexDirection?: "row" | "column";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";

  // Spacing
  padding?: string;
  margin?: string;

  // Typography
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  lineHeight?: string;
  letterSpacing?: string;

  // Colors
  backgroundColor?: string;
  color?: string;

  // Border
  borderTopWidth?: string;
  borderRightWidth?: string;
  borderBottomWidth?: string;
  borderLeftWidth?: string;
  borderStyle?: "solid" | "dashed" | "dotted";
  borderColor?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomRightRadius?: string;
  borderBottomLeftRadius?: string;

  // Effects
  boxShadow?: string;
  opacity?: string;
  transform?: string;
  transition?: string;
}
