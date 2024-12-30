import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@ren/ui/components";
import { ComponentList } from "./component-list/component-list";
import { VisualBuilderProvider } from "./context/visual-builder.context";

export const VisualBuilder = () => {
  return (
    <VisualBuilderProvider>
      <ResizablePanelGroup direction={"horizontal"}>
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="flex w-full justify-center p-5">
            <ComponentList />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>hello</ResizablePanel>
      </ResizablePanelGroup>
    </VisualBuilderProvider>
  );
};
