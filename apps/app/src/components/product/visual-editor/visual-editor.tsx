import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const VisualEditor = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    </DndProvider>
  );
};
