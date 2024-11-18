import { useEditor } from "@tiptap/react";
import "./rich-text-editor.css";
import Placeholder from "@tiptap/extension-placeholder";
import { AIChat } from "./editors/ai-chat";
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
        <AIChat
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
