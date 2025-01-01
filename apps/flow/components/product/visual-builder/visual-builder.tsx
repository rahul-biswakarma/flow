import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@ren/ui/components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BuilderCanvas } from "./canvas/builder-canvas";
import { ComponentList } from "./component-list/component-list";
import { VisualBuilderProvider } from "./context/visual-builder.context";

export const VisualBuilder = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <VisualBuilderProvider>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
            <div className="flex h-full w-full justify-center p-4">
              <ComponentList />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <BuilderCanvas />
          </ResizablePanel>
        </ResizablePanelGroup>
      </VisualBuilderProvider>
    </DndProvider>
  );
};
