import { StylePanel } from "@/components/panels/style-panel/style-panel";
import type { StyleData } from "@/components/panels/style-panel/type";
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

export const ComponentBuilderPreview = ({
  styleValue,
  setStyleValue,
}: {
  styleValue: StyleData;
  setStyleValue: React.Dispatch<React.SetStateAction<StyleData>>;
}) => {
  const [showPreviewSettings, setShowPreviewSettings] = useState(false);

  return (
    <div className="w-full h-full">
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
            <ResizablePanel defaultSize={30}>
              <Tabs.Root defaultValue="style-panel">
                <Tabs.List
                  size="2"
                  className="relative !shadow-inset-gray bg-panel-header"
                >
                  <Tabs.Trigger value="style-panel">Styles</Tabs.Trigger>
                  <IconButton
                    variant="ghost"
                    color="gray"
                    className="text-gray-11 absolute right-3 top-0 translate-y-[50%]"
                    onClick={() => setShowPreviewSettings(false)}
                  >
                    <Icons.X />
                  </IconButton>
                </Tabs.List>
                <ScrollArea>
                  <Tabs.Content className="bg-panel" value="style-panel">
                    <div className="p-4 w-full h-full max-h-full pb-[52px]">
                      <StylePanel
                        styleValue={styleValue}
                        setStyleValue={setStyleValue}
                      />
                    </div>
                  </Tabs.Content>
                </ScrollArea>
              </Tabs.Root>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};
