import Editor from "@monaco-editor/react";
import { useCallback } from "react";
import type { CodeEditorType } from "./type";

enum EDITOR_THEME {
  DARK = "vs-dark",
  LIGHT = "vs-light",
}

const EDITOR_OPTIONS = {
  formatOnPaste: true,
  formatOnType: true,
  minimap: { enabled: false },
  overviewRulerLanes: 0,
  padding: { bottom: 8, top: 8 },
  renderLineHighlight: "none" as const,
  scrollBeyondLastLine: false,
  scrollbar: {
    alwaysConsumeMouseWheel: false,
  },
  wordWrap: "on" as const,
};

interface CodeEditorProps {
  code: string;
  defaultLanguage?: string;
  appliedTheme: string;
  editorRef?: React.RefObject<CodeEditorType | null>;
  handleCodeChange: (newCode: string | undefined) => void;
}

export const CodeEditor = ({
  code,
  handleCodeChange,
  appliedTheme,
  defaultLanguage = "javascript",
  editorRef,
}: CodeEditorProps) => {
  // Initialize editor on mount
  const handleEditorDidMount = useCallback(
    (editor: CodeEditorType) => {
      if (editorRef) editorRef.current = editor;
    },
    [editorRef],
  );

  return (
    <Editor
      className="bg-overlay"
      defaultLanguage={defaultLanguage}
      height={"100%"}
      onChange={handleCodeChange}
      onMount={handleEditorDidMount}
      options={EDITOR_OPTIONS}
      theme={appliedTheme === "dark" ? EDITOR_THEME.DARK : EDITOR_THEME.LIGHT}
      value={code}
    />
  );
};
