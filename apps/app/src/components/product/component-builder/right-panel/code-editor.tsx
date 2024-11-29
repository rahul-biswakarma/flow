import { SandpackCodeEditor, useSandpack } from "@codesandbox/sandpack-react";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import * as parserBabel from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";
import { useCallback, useEffect } from "react";
import { useComponentBuilderContext } from "../context";

export const CodeEditor = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;

  const {
    isAIGenerating,
    isAIGeneratingRef,
    setComponentCode,
    componentCode,
    componentCodeRef,
  } = useComponentBuilderContext();

  // Handle code updates from Sandpack
  useEffect(() => {
    if (!isAIGeneratingRef.current) {
      const newCode = files?.[activeFile]?.code ?? "";
      if (newCode === componentCode) return;
      setComponentCode(() => newCode);
    }
  }, [files, activeFile, setComponentCode, componentCode]);

  const formatCode = useCallback(async (codeToFormat: string) => {
    try {
      return await prettier.format(codeToFormat, {
        parser: "babel",
        plugins: [parserBabel, prettierPluginEstree],
        semi: true,
        singleQuote: true,
      });
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
    <div className="h-full w-full z-10 text-[14px]">
      <div className="flex items-center justify-between gap-2 w-full py-2 px-3 h-10 border-b bg-panel-header border-panel">
        <Text size="2" className="text-gray-11">
          Editor
        </Text>
        <IconButton
          color="gray"
          size="1"
          variant="ghost"
          onClick={handleFormatClick}
          disabled={isAIGenerating}
        >
          <Icons.Wand className="!w-4 !h-4 !text-gray-11" />
        </IconButton>
      </div>
      <div
        className="sandpack-code-editor"
        style={{
          height: "calc(100% - 40px)",
        }}
      >
        <SandpackCodeEditor
          ref={componentCodeRef}
          showTabs={false}
          showLineNumbers={true}
          readOnly={isAIGenerating}
        />
      </div>
    </div>
  );
};
