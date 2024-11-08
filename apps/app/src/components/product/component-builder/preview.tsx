import { StylePanel } from "@/components/panels/style-panel/style-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { Text } from "@v1/ui/text";
import { LiveError, LivePreview } from "react-live";

export const ComponentBuilderPreview = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full px-3 py-2 border-b border-outline-02">
        <Text size="2" className="text-gray-11">
          Preview
        </Text>
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35}>
          <StylePanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <LiveError className="text-red-800 bg-red-100" />
          <LivePreview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
