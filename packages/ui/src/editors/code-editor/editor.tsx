import Editor from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useCallback, useRef } from "react";

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

export const CodeEditor = ({
  code,
  handleCodeChange,
  appliedTheme,
  defaultLanguage = "javascript",
}: {
  code: string;
  defaultLanguage?: string;
  appliedTheme: string;
  handleCodeChange: (newCode: string | undefined) => void;
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Initialize editor on mount
  const handleEditorDidMount = useCallback(
    (editor: editor.IStandaloneCodeEditor) => {
      editorRef.current = editor;
    },
    [],
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
