import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { ScrollArea } from "@v1/ui/scroll-area";

import type React from "react";
import { useState } from "react";
import { FieldRenders } from "./field-renders";
import { ComponentBuilderHeader } from "./header";
import type { ComponentData } from "./types";
import "./styles.css";
import type { StyleData } from "@/components/panels/style-panel/type";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { amethyst, aquaBlue } from "@codesandbox/sandpack-themes";
import { useTheme } from "next-themes";
import { CodeEditor } from "./code-editor";
import { defaultComponentCode, sandPackFilesConfig } from "./constants";
import { ComponentBuilderPreview } from "./preview";

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

  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full grid grid-rows-[auto_1fr] h-screen max-h-screen">
      <ComponentBuilderHeader isConfigValid={false} />
      <SandpackProvider
        theme={resolvedTheme === "dark" ? amethyst : aquaBlue}
        template="react-ts"
        options={{
          bundlerURL: "https://sandpack-bundler.codesandbox.io",
          experimental_enableServiceWorker: true,
        }}
        files={sandPackFilesConfig({ code: newComponentData.code, styleValue })}
      >
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={25} defaultSize={30}>
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              style={{
                height: "100%",
                maxHeight: "100%",
              }}
            >
              <FieldRenders
                newComponentData={newComponentData}
                setNewComponentData={setNewComponentData}
              />
            </ScrollArea>
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
