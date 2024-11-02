import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { ScrollArea } from "@v1/ui/scroll-area";
import type React from "react";
import { useState } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { FieldRenders } from "./field-renders";
import { ComponentBuilderHeader } from "./header";
import type { ComponentData } from "./types";

export const ComponentBuilder: React.FC = () => {
  const [newComponentData, setNewComponentData] = useState<ComponentData>({
    name: "",
    description: "",
    author: "",
    previewUrl: "",
    keywords: [],
    props: [],
    code: "",
  });

  return (
    <div className="w-full grid grid-rows-[auto_1fr] h-screen max-h-screen overflow-hidden">
      <ComponentBuilderHeader isConfigValid={false} />
      <LiveProvider code={newComponentData.code} noInline>
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
                <LiveEditor
                  onChange={(e) =>
                    setNewComponentData((prev) => ({ ...prev, code: e }))
                  }
                  code={newComponentData.code}
                  className="font-mono"
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel minSize={25} defaultSize={50}>
                <LiveError className="text-red-800 bg-red-100" />
                <LivePreview />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </LiveProvider>
    </div>
  );
};
