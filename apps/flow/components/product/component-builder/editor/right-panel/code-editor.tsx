import {
  ClassicTabs,
  IconButton,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Text,
} from "@ren/ui/components";
import { CodeEditor, RichTextEditor } from "@ren/ui/editors";
import { Icons } from "@ren/ui/icons";
import { useTheme } from "next-themes";
import parserTypeScript from "prettier/parser-typescript";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";
import { useCallback, useState } from "react";
import { useComponentBuilderContext } from "../../context";
import { codeDocs } from "./docs";

export const ComponentCodeEditor = () => {
  const [showDocs, setShowDocs] = useState(false);
  const { resolvedTheme } = useTheme();

  const { isAIGenerating, setComponentCode, componentCode } =
    useComponentBuilderContext();

  const formatCode = useCallback(async (codeToFormat: string) => {
    try {
      const formattedCode = await prettier.format(codeToFormat, {
        parser: "typescript",
        plugins: [parserTypeScript, prettierPluginEstree as unknown as string],
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
    const currentCode = componentCode ?? "";
    const formattedCode = await formatCode(currentCode);
    setComponentCode(formattedCode);
  }, [formatCode, componentCode, setComponentCode]);

  return (
    <div className="w-full h-full max-h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="flex flex-col w-full h-full max-h-full min-h-0">
            <div className="flex justify-between w-full px-3 py-2 border-b border-panel bg-panel-header items-center h-10 min-h-10">
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
              <CodeEditor
                code={componentCode}
                appliedTheme={resolvedTheme ?? "dark"}
                handleCodeChange={(newCode: string | undefined): void => {
                  setComponentCode(newCode ?? "");
                }}
              />
            </ScrollArea>
          </div>
        </ResizablePanel>
        {showDocs && (
          <>
            <ResizableHandle />
            <ResizablePanel minSize={40}>
              <ClassicTabs.Root className="max-h-full" defaultValue="doc-panel">
                <ClassicTabs.List
                  size="2"
                  className="relative !shadow-inset-gray bg-panel-header"
                >
                  <ClassicTabs.Trigger value="doc-panel">
                    Doc
                  </ClassicTabs.Trigger>
                  <IconButton
                    variant="ghost"
                    color="gray"
                    className="text-gray-11 absolute right-3 -top-0.5 translate-y-[50%]"
                    onClick={() => setShowDocs(false)}
                    disabled={isAIGenerating}
                  >
                    <Icons.X />
                  </IconButton>
                </ClassicTabs.List>
                <ScrollArea className="flex relative max-h-full">
                  <ClassicTabs.Content className="bg-panel" value="doc-panel">
                    <RichTextEditor readOnly content={codeDocs} />
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
