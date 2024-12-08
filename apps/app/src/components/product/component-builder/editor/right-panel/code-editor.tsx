import { useComponentBuilderContext } from "@/components/product/component-builder/context";
import { SandpackCodeEditor, useSandpack } from "@codesandbox/sandpack-react";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@v1/ui/resizable";
import { RichTextEditor } from "@v1/ui/rte";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Tabs } from "@v1/ui/tabs";
import { Text } from "@v1/ui/text";
import * as parserBabel from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";
import { useCallback, useEffect, useState } from "react";
import { codeDocs } from "./docs";

export const CodeEditor = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile, updateFile } = sandpack;

  const [showDocs, setShowDocs] = useState(false);

  const {
    isAIGenerating,
    isAIGeneratingRef,
    setComponentCode,
    componentCodeRef,
    componentCode,
  } = useComponentBuilderContext();

  // Handle code updates from Sandpack
  useEffect(() => {
    if (!isAIGeneratingRef.current) {
      const newCode = files?.[activeFile]?.code ?? "";
      if (newCode === componentCode) return;
      setComponentCode(newCode);

      // Update the preview by syncing file changes
      updateFile(activeFile, newCode);
    }
  }, [files, activeFile, setComponentCode, componentCode, updateFile]);

  const formatCode = useCallback(async (codeToFormat: string) => {
    try {
      const formattedCode = await prettier.format(codeToFormat, {
        parser: "babel",
        plugins: [parserBabel, prettierPluginEstree],
        semi: true,
        singleQuote: true,
      });
      return formattedCode;
    } catch (error) {
      console.error("Formatting error:", error);
      return codeToFormat;
    }
  }, []);

  const handleFormatClick = useCallback(async () => {
    const currentCode = files?.[activeFile]?.code ?? "";
    const formattedCode = await formatCode(currentCode);
    sandpack.updateFile(activeFile, formattedCode);
  }, [formatCode, files, activeFile, sandpack]);

  return (
    <div className="w-full h-full max-h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="w-full h-full max-h-full min-h-0">
            <div className="flex justify-between w-full px-3 py-2 border-b border-panel bg-panel-header items-center h-10">
              <Text size="2" className="text-gray-11">
                Editor
              </Text>
              <div className="flex gap-4 justify-end items-center">
                <IconButton
                  color="gray"
                  size="1"
                  variant="ghost"
                  onClick={handleFormatClick}
                  disabled={isAIGenerating}
                >
                  <Icons.Wand className="!w-4 !h-4 !text-gray-11" />
                </IconButton>
                {!showDocs && (
                  <IconButton
                    variant="ghost"
                    color="gray"
                    className="text-gray-11"
                    onClick={() => setShowDocs(true)}
                    disabled={isAIGenerating}
                  >
                    <Icons.FileTypeDoc />
                  </IconButton>
                )}
              </div>
            </div>
            <ScrollArea>
              <SandpackCodeEditor
                ref={componentCodeRef}
                showTabs={false}
                showLineNumbers={true}
                readOnly={isAIGenerating}
              />
            </ScrollArea>
          </div>
        </ResizablePanel>
        {showDocs && (
          <>
            <ResizableHandle />
            <ResizablePanel minSize={40}>
              <Tabs.Root className="max-h-full" defaultValue="doc-panel">
                <Tabs.List
                  size="2"
                  className="relative !shadow-inset-gray bg-panel-header"
                >
                  <Tabs.Trigger value="doc-panel">Doc</Tabs.Trigger>
                  <IconButton
                    variant="ghost"
                    color="gray"
                    className="text-gray-11 absolute right-3 -top-0.5 translate-y-[50%]"
                    onClick={() => setShowDocs(false)}
                    disabled={isAIGenerating}
                  >
                    <Icons.X />
                  </IconButton>
                </Tabs.List>
                <ScrollArea className="flex relative max-h-full">
                  <Tabs.Content className="bg-panel" value="doc-panel">
                    <RichTextEditor readOnly content={codeDocs} />
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
