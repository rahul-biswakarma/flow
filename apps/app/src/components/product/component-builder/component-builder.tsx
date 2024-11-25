import { SandpackProvider } from "@codesandbox/sandpack-react";
import { amethyst, aquaBlue } from "@codesandbox/sandpack-themes";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { useTheme } from "next-themes";
import { sandPackFilesConfig } from "./constants";
import { ComponentBuilderHeader } from "./header";
import { ComponentBuilderAIChat } from "./left-panel/component-builder-ai-chat";
import { CodeEditor } from "./right-panel/code-editor";
import { ComponentBuilderPreview } from "./right-panel/preview";
import "./styles.css";
import {
  ComponentBuilderProvider,
  useComponentBuilderContext,
} from "./context/component-builder.context";
import { MetadataFields } from "./left-panel/metadata-fields/metadata-fields";

export const ComponentBuilder = () => {
  return (
    <ComponentBuilderProvider>
      <ComponentBuilderContent />
    </ComponentBuilderProvider>
  );
};

const ComponentBuilderContent = () => {
  const { resolvedTheme } = useTheme();

  const { isConfigValid, componentCode, styleValue } =
    useComponentBuilderContext();

  return (
    <div className="w-full grid grid-rows-[auto_1fr] h-full max-h-full">
      <ComponentBuilderHeader isConfigValid={isConfigValid} />
      <SandpackProvider
        theme={resolvedTheme === "dark" ? amethyst : aquaBlue}
        template="react-ts"
        files={sandPackFilesConfig({ code: componentCode, styleValue })}
      >
        <ComponentBuilderWrapper />
      </SandpackProvider>
    </div>
  );
};

const ComponentBuilderWrapper = () => {
  return (
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
  );
};
