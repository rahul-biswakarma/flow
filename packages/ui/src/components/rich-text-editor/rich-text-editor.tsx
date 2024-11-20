import { useEditor } from "@tiptap/react";
import "./rich-text-editor.css";
import Placeholder from "@tiptap/extension-placeholder";
import { AIChatEditor } from "./editors/ai-chat-editor";
import { starterExtension } from "./extension";
import type { RichTextEditorProps } from "./types";

export const RichTextEditor = ({
  variant,
  content,
  placeholder,
  ...props
}: RichTextEditorProps & {
  variant?: "ai-chat";
}) => {
  const extensions = [
    starterExtension,
    Placeholder.configure({
      placeholder: "How can I help you?",
    }),
  ];

  const editor = useEditor({
    extensions,
    content,
  });
  if (!editor) return null;

  switch (variant) {
    case "ai-chat":
      return (
        <AIChatEditor
          content={content}
          editor={editor}
          placeholder={placeholder}
          {...props}
        />
      );
    default:
      return null;
  }
};
