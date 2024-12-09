import { PropsPanel } from "@/components/panels/props-panel/props-panel";
import { StylePanel } from "@/components/panels/style-panel/style-panel";
import { ThemePanel } from "@/components/panels/theme-panel/theme-panel";
import { useComponentBuilderContext } from "@/components/product/component-builder/context";
import { SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
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

export const ComponentBuilderPreview = () => {
  const {
    isAIGenerating,
    styleValue,
    setStyleValue,
    themeValue,
    setThemeValue,
    componentProps,
    propsValue,
    setPropsValue,
  } = useComponentBuilderContext();
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
            <SandpackLayout
              style={{
                border: "none",
                height: "100%",
                borderRadius: "0px",
              }}
            >
              <SandpackPreview
                showRestartButton={true}
                showOpenInCodeSandbox={false}
                showRefreshButton={true}
                style={{
                  height: "calc(100% - 40px)",
                }}
              />
            </SandpackLayout>
          </div>
        </ResizablePanel>
        {showPreviewSettings && (
          <>
            <ResizableHandle />
            <ResizablePanel minSize={40} defaultSize={40}>
              <Tabs.Root className="max-h-full" defaultValue="style-panel">
                <Tabs.List
                  size="2"
                  className="relative !shadow-inset-gray bg-panel-header"
                >
                  <Tabs.Trigger value="style-panel">Styles</Tabs.Trigger>
                  <Tabs.Trigger value="theme-panel">Theme</Tabs.Trigger>
                  {Object.keys(componentProps).length > 0 && (
                    <Tabs.Trigger value="props-panel">Props</Tabs.Trigger>
                  )}
                  <IconButton
                    variant="ghost"
                    color="gray"
                    className="text-gray-11 absolute right-3 -top-0.5 translate-y-[50%]"
                    onClick={() => setShowPreviewSettings(false)}
                    disabled={isAIGenerating}
                  >
                    <Icons.X />
                  </IconButton>
                </Tabs.List>
                <ScrollArea className="flex relative max-h-full">
                  <Tabs.Content className="bg-panel" value="style-panel">
                    <div className="p-4 w-full h-full max-h-full">
                      <StylePanel
                        styleValue={styleValue}
                        setStyleValue={setStyleValue}
                      />
                    </div>
                  </Tabs.Content>
                  <Tabs.Content className="bg-panel" value="theme-panel">
                    <div className="p-4 w-full h-full max-h-full">
                      <ThemePanel
                        themeValue={themeValue}
                        setThemeValue={setThemeValue}
                      />
                    </div>
                  </Tabs.Content>
                  <Tabs.Content className="bg-panel" value="props-panel">
                    <div className="p-4 w-full h-full max-h-full">
                      <PropsPanel
                        props={componentProps}
                        propValues={propsValue}
                        setPropValues={setPropsValue}
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
