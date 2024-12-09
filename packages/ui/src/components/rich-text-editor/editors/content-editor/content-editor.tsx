import { type Editor, EditorContent } from "@tiptap/react";
import "./content-editor.css";

interface ContentEditorProps {
  editor: Editor;
  readOnly?: boolean;
}

export const ContentEditor = ({ editor, readOnly }: ContentEditorProps) => {
  return (
    <EditorContent
      className="rte-content-editor"
      readOnly={readOnly}
      editor={editor}
    />
  );
};
