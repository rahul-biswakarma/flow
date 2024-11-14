import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";

import type React from "react";
import { useState } from "react";
import { ComponentBuilderHeader } from "./header";
import { FieldRenders } from "./left-panel/field-renders";
import type { ComponentData } from "./types";
import "./styles.css";
import type { StyleData } from "@/components/panels/style-panel/type";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { amethyst, aquaBlue } from "@codesandbox/sandpack-themes";
import { ScrollArea } from "@v1/ui/scroll-area";
import { useTheme } from "next-themes";
import { defaultComponentCode, sandPackFilesConfig } from "./constants";
import { ComponentBuilderAIChat } from "./left-panel/component-builder-ai-chat";
import { CodeEditor } from "./right-panel/code-editor";
import { ComponentBuilderPreview } from "./right-panel/preview";

export const ComponentBuilder: React.FC = () => {
  const [newComponentData, setNewComponentData] = useState<ComponentData>({
    name: "",
    description: "",
    author: "",
    previewUrl: "",
    keywords: [],
    props: [],
    code: defaultComponentCode,
  });
  const [styleValue, setStyleValue] = useState<StyleData>({});
  console.log("styleValue", styleValue);

  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full grid grid-rows-[auto_1fr] h-screen max-h-screen">
      <ComponentBuilderHeader isConfigValid={false} />
      <SandpackProvider
        theme={resolvedTheme === "dark" ? amethyst : aquaBlue}
        template="react-ts"
        files={sandPackFilesConfig({ code: newComponentData.code, styleValue })}
      >
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={25} defaultSize={30}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel minSize={30} defaultSize={40}>
                <ScrollArea>
                  <FieldRenders
                    newComponentData={newComponentData}
                    setNewComponentData={setNewComponentData}
                  />
                </ScrollArea>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel minSize={30}>
                <ComponentBuilderAIChat />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={25} defaultSize={70}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel minSize={25} defaultSize={50}>
                <CodeEditor
                  code={newComponentData.code}
                  setNewComponentData={setNewComponentData}
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel minSize={25} defaultSize={50}>
                <ComponentBuilderPreview {...{ styleValue, setStyleValue }} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </SandpackProvider>
    </div>
  );
};
