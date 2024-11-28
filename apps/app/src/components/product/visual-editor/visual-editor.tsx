"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ComponentLibrary } from "./panels/component-library";
import { PropertiesPanel } from "./panels/properties-panel";
import type { VisualEditorProps } from "./types";
import { Workspace } from "./workspace/workspace";

export const VisualEditor = ({
  initialState,
  onSave,
  onPreview,
}: VisualEditorProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full w-full bg-panel">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15}>
            <ComponentLibrary />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={60}>
            <Workspace />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={20} minSize={15}>
            <PropertiesPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </DndProvider>
  );
};
