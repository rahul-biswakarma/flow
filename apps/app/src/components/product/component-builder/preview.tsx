import { StylePanel } from "@/components/panels/style-panel/style-panel";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { Text } from "@v1/ui/text";
import {} from "react-live";

export const ComponentBuilderPreview = () => {
  return (
    <div className="w-full h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35}>
          <div className="px-3 py-2 border-b border-outline-02">
            <Text size="2" className="text-gray-11">
              Properties
            </Text>
          </div>
          <div className="p-3">
            <div className="flex flex-col gap-3 px-3 pt-2 pb-4 bg-gray-a2 rounded-md">
              <Text size="2" className="text-gray-8">
                Styles Panel
              </Text>
              <StylePanel />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="w-full h-full max-h-full min-h-0">
            <div className="w-full px-3 py-2 border-b border-outline-02">
              <Text size="2" className="text-gray-11">
                Preview
              </Text>
            </div>
            <SandpackPreview showOpenInCodeSandbox={false} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
