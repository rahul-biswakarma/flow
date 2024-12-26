import { ComponentBuilderAIChat } from "./left-panel/component-builder-ai-chat";

import { ComponentBuilderPreview } from "./right-panel/preview";
import "../styles.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@ren/ui/components";
import { MetadataFields } from "./left-panel/metadata-fields/metadata-fields";
import { ComponentCodeEditor } from "./right-panel/code-editor";

export const ComponentBuilderEditor = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={30} defaultSize={30}>
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
            <ComponentCodeEditor />
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
