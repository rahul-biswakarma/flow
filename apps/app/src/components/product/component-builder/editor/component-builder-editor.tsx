import { SandpackProvider } from "@codesandbox/sandpack-react";
import { amethyst, aquaBlue } from "@codesandbox/sandpack-themes";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { useTheme } from "next-themes";
import { sandPackFilesConfig } from "../constants";
import { ComponentBuilderAIChat } from "./left-panel/component-builder-ai-chat";
import { CodeEditor } from "./right-panel/code-editor";
import {} from "./right-panel/preview";
import "../styles.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useComponentBuilderContext } from "../context/component-builder.context";
import { MetadataFields } from "./left-panel/metadata-fields/metadata-fields";

export const ComponentBuilderPreview = dynamic(
  () =>
    import("./right-panel/preview").then((mod) => mod.ComponentBuilderPreview),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full relative overflow-hidden top-0 left-0" />
    ),
  },
);

export const ComponentBuilderEditor = () => {
  const { resolvedTheme } = useTheme();
  const { componentCode, styleValue } = useComponentBuilderContext();

  // Create files config when component code or style changes
  const files = useMemo(
    () => sandPackFilesConfig({ code: componentCode, styleValue }),
    [componentCode, styleValue],
  );

  return (
    <SandpackProvider
      theme={resolvedTheme === "dark" ? amethyst : aquaBlue}
      template="react-ts"
      files={files}
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={30} defaultSize={40}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel minSize={30}>
              <MetadataFields />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel minSize={40}>
              <ComponentBuilderAIChat />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={40}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel minSize={30}>
              <CodeEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel minSize={30}>
              <ComponentBuilderPreview />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SandpackProvider>
  );
};
