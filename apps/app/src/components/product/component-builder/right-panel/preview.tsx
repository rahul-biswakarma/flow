import { StylePanel } from "@/components/panels/style-panel/style-panel";
import { SandpackPreview } from "@codesandbox/sandpack-react";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Tabs } from "@v1/ui/tabs";
import { Text } from "@v1/ui/text";
import { useState } from "react";
import { useComponentBuilderContext } from "../context";

export const ComponentBuilderPreview = () => {
  const { isAIGenerating, styleValue, setStyleValue } =
    useComponentBuilderContext();

  const [showPreviewSettings, setShowPreviewSettings] = useState(true);

  return (
    <div className="w-full h-full max-h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="w-full h-full max-h-full min-h-0">
            <div className="flex justify-between w-full px-3 py-2 border-b border-panel bg-panel-header items-center h-10">
              <Text size="2" className="text-gray-11">
                Preview
              </Text>
              {!showPreviewSettings && (
                <IconButton
                  variant="ghost"
                  color="gray"
                  className="text-gray-11"
                  onClick={() => setShowPreviewSettings(true)}
                  disabled={isAIGenerating}
                >
                  <Icons.Settings />
                </IconButton>
              )}
            </div>
            <SandpackPreview
              style={{
                height: "calc(100% - 40px)",
              }}
              showOpenInCodeSandbox={false}
            />
          </div>
        </ResizablePanel>
        {showPreviewSettings && (
          <>
            <ResizableHandle />
            <ResizablePanel minSize={40}>
              <ScrollArea className="relative max-h-full">
                <Tabs.Root className="max-h-full" defaultValue="style-panel">
                  <div className="sticky z-10 top-0">
                    <Tabs.List
                      size="2"
                      className="!shadow-inset-gray bg-panel-header"
                    >
                      <Tabs.Trigger value="style-panel">Styles</Tabs.Trigger>
                      <IconButton
                        variant="ghost"
                        color="gray"
                        className="text-gray-11 absolute right-3 top-0 translate-y-[50%]"
                        onClick={() => setShowPreviewSettings(false)}
                        disabled={isAIGenerating}
                      >
                        <Icons.X />
                      </IconButton>
                    </Tabs.List>
                  </div>

                  <Tabs.Content className="bg-panel" value="style-panel">
                    <div className="p-4 w-full h-full max-h-full pb-[52px]">
                      <StylePanel
                        styleValue={styleValue}
                        setStyleValue={setStyleValue}
                      />
                    </div>
                  </Tabs.Content>
                </Tabs.Root>
              </ScrollArea>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};
