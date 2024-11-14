import { useMediaQuery } from "@/hooks/use-media-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { useState } from "react";
import { ChatInterface } from "./chat/chat-interface";
import { SchemaBuilder } from "./schema-builder";
import { SchemaList } from "./schema-list";
import { SchemaPreview } from "./schema-preview";
import type { Schema } from "./types";

export const SchemaEditor = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedSchema, setSelectedSchema] = useState<Schema | null>(null);

  return (
    <div className="w-full h-full">
      <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>
        <ResizablePanel defaultSize={20} minSize={15}>
          <SchemaList
            selectedSchema={selectedSchema}
            onSchemaSelect={setSelectedSchema}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60} minSize={30}>
              <SchemaBuilder
                selectedSchema={selectedSchema}
                onSchemaUpdate={setSelectedSchema}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40} minSize={20}>
              <ChatInterface />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={30} minSize={20}>
          <SchemaPreview schema={selectedSchema} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
