import { SandpackCodeEditor, useSandpack } from "@codesandbox/sandpack-react";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import * as parserBabel from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";
import { useCallback, useEffect } from "react";
import type { ComponentData } from "./types";

export const CodeEditor = ({
  code,
  setNewComponentData,
}: {
  code: string;
  setNewComponentData: React.Dispatch<React.SetStateAction<ComponentData>>;
}) => {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;

  useEffect(() => {
    const newCode = files?.[activeFile]?.code ?? "";
    if (newCode === code) return;
    setNewComponentData((prev) => ({
      ...prev,
      code: newCode,
    }));
  }, [files, activeFile, setNewComponentData]);

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
    const code = files?.[activeFile]?.code ?? "";
    const formattedCode = await formatCode(code);
    setNewComponentData((prev) => ({
      ...prev,
      code: formattedCode,
    }));
  }, [formatCode]);

  return (
    <div className="h-full w-full z-10 text-[14px]">
      <div className="flex items-center justify-between gap-2 w-full py-2 px-3 border-b border-outline-03">
        <Text size="2" className="text-gray-11">
          Editor
        </Text>
        <IconButton
          color="gray"
          size="1"
          variant="ghost"
          onClick={handleFormatClick}
        >
          <Icons.WandSparkles className="!w-4 !h-4 !text-gray-11" />
        </IconButton>
      </div>
      <SandpackCodeEditor
        className="h-full"
        showTabs={false}
        showLineNumbers={true}
      />
    </div>
  );
};
