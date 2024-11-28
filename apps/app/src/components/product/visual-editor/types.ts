import type { CSSProperties } from "react";

export type ComponentType = "layout" | "form" | "media" | "custom";

export interface ComponentDefinition {
  id: string;
  name: string;
  type: ComponentType;
  category: string;
  thumbnail?: string;
  description?: string;
  defaultProps?: Record<string, unknown>;
  defaultStyles?: CSSProperties;
  allowedChildren?: string[];
  isContainer?: boolean;
}

export interface DropZone {
  id: string;
  type: "above" | "below" | "inside" | "left" | "right";
  componentId: string;
  isValid: boolean;
}

export interface EditorState {
  selectedComponentId: string | null;
  components: Record<string, ComponentDefinition>;
  dropZones: DropZone[];
  undoStack: EditorState[];
  redoStack: EditorState[];
}

export interface VisualEditorProps {
  initialState?: EditorState;
  onSave?: (state: EditorState) => void;
  onPreview?: () => void;
}
