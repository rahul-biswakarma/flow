import { StandaloneComponentPreview } from "@flow/components/preview";
import {
  ClassicTabs,
  IconButton,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Text,
} from "@ren/ui/components";
import { Icons } from "@ren/ui/icons";
import { StylePanel, ThemePanel } from "@ren/ui/panels";
import { useState } from "react";
import { useComponentBuilderContext } from "../../../context";
import { PropsPanel } from "../../../props-panel/props-panel";

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
    componentCode,
    transformedCode,
    setTransformedCode,
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
            <StandaloneComponentPreview
              {...{
                componentCode,
                isAIGenerating,
                styleValue,
                componentProps,
                themeValue,
                transformedCode,
                setTransformedCode,
              }}
            />
          </div>
        </ResizablePanel>
        {showPreviewSettings && (
          <>
            <ResizableHandle />
            <ResizablePanel minSize={40} defaultSize={40}>
              <ClassicTabs.Root
                className="max-h-full"
                defaultValue="style-panel"
              >
                <ClassicTabs.List
                  size="2"
                  className="relative !shadow-inset-gray bg-panel-header"
                >
                  <ClassicTabs.Trigger value="style-panel">
                    Styles
                  </ClassicTabs.Trigger>
                  <ClassicTabs.Trigger value="theme-panel">
                    Theme
                  </ClassicTabs.Trigger>
                  {Object.keys(componentProps).length > 0 && (
                    <ClassicTabs.Trigger value="props-panel">
                      Props
                    </ClassicTabs.Trigger>
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
                </ClassicTabs.List>
                <ScrollArea className="flex relative max-h-full">
                  <ClassicTabs.Content className="bg-panel" value="style-panel">
                    <div className="p-4 w-full h-full max-h-full">
                      <StylePanel
                        styleValue={styleValue}
                        setStyleValue={setStyleValue}
                      />
                    </div>
                  </ClassicTabs.Content>
                  <ClassicTabs.Content className="bg-panel" value="theme-panel">
                    <div className="p-4 w-full h-full max-h-full">
                      <ThemePanel
                        themeValue={themeValue}
                        setThemeValue={setThemeValue}
                      />
                    </div>
                  </ClassicTabs.Content>
                  <ClassicTabs.Content className="bg-panel" value="props-panel">
                    <div className="p-4 w-full h-full max-h-full">
                      <PropsPanel
                        props={componentProps}
                        propValues={propsValue}
                        setPropValues={setPropsValue}
                      />
                    </div>
                  </ClassicTabs.Content>
                </ScrollArea>
              </ClassicTabs.Root>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};
