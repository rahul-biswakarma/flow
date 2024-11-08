import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { useTheme } from "next-themes";
import * as parserBabel from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";
import { themes } from "prism-react-renderer";
import { useCallback, useState } from "react";
import { LiveEditor } from "react-live";
import type { ComponentData } from "./types";

export const CodeEditor = ({
  code,
  setNewComponentData,
}: {
  code: string;
  setNewComponentData: React.Dispatch<React.SetStateAction<ComponentData>>;
}) => {
  const { resolvedTheme } = useTheme();
  const [editorCode, setEditorCode] = useState(code);

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

  const minifyCode = (code: string) => {
    return code
      .replace(/\s+/g, " ")
      .replace(/\s*({|}|\(|\)|\[|\]|,|;|\+|=|\?|:|<|>)\s*/g, "$1")
      .trim();
  };

  const handleCodeChange = useCallback(
    (newCode: string) => {
      setEditorCode(newCode);
      setNewComponentData((prev) => ({
        ...prev,
        code: newCode,
      }));
    },
    [setNewComponentData],
  );

  const handleFormatClick = useCallback(async () => {
    const formattedCode = await formatCode(editorCode);
    setEditorCode(formattedCode);
  }, [editorCode, formatCode]);

  return (
    <div className="h-full w-full">
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
      <LiveEditor
        theme={
          resolvedTheme === "light" ? themes.duotoneLight : themes.duotoneDark
        }
        language="tsx"
        onChange={handleCodeChange}
        code={editorCode}
        className="font-mono h-full text-[14px]"
      />
    </div>
  );
};
