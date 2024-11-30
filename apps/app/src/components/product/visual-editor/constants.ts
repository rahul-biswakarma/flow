export const GRID_SIZE = 8;
export const MIN_COMPONENT_WIDTH = 50;
export const MIN_COMPONENT_HEIGHT = 50;

export const KEYBOARD_SHORTCUTS = {
  UNDO: ["mod+Z"],
  REDO: ["mod+shift+Z", "mod+Y"],
  COPY: ["mod+C"],
  PASTE: ["mod+V"],
  DELETE: ["Delete", "Backspace"],
  SELECT_ALL: ["mod+A"],
  SAVE: ["mod+S"],
  PREVIEW: ["mod+P"],
} as const;

export const DROP_ZONE_TYPES = {
  ABOVE: "above",
  BELOW: "below",
  INSIDE: "inside",
  LEFT: "left",
  RIGHT: "right",
} as const;
