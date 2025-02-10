import type React from "react";

export type VisualBuilderContainerLayout = {
  direction: "row" | "column";
  justifyContent: "start" | "end" | "center" | "between" | "around" | "evenly";
  alignItems: "start" | "end" | "center" | "baseline" | "stretch";
  gap: string;
};

export type DropZone = "left" | "right" | "top" | "bottom";
export type ContainerDirection = "row" | "column";

export interface DropTarget {
  containerId: string;
  targetId?: string;
  zone?: DropZone;
}

export interface DragItem {
  id?: string;
  type: "new-component" | "existing-component";
  componentCode?: string;
}

export type VisualBuilderComponent = {
  id: string;
  code: string;
  styles: Record<string, unknown>;
  props: Record<string, unknown>[];
};

export type VisualBuilderContainer = {
  id: string;
  children: (VisualBuilderContainer | VisualBuilderComponent)[];
  styles: Record<string, unknown>;
  layout: VisualBuilderContainerLayout;
};

export type VisualBuilderContextType = {
  vbData: VisualBuilderContainer[];
  setVbData: React.Dispatch<React.SetStateAction<VisualBuilderContainer[]>>;
  selectedComponent: VisualBuilderComponent | null;
  setSelectedComponent: React.Dispatch<
    React.SetStateAction<VisualBuilderComponent | null>
  >;
  selectedContainer: VisualBuilderContainer | null;
  setSelectedContainer: React.Dispatch<
    React.SetStateAction<VisualBuilderContainer | null>
  >;
};
