import { EditorContent, useEditor } from "@tiptap/react";
import "./rich-text-editor.css";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { useEffect } from "react";
import { starterExtension } from "./extension";
import type { RichTextEditorProps } from "./types";

export const RichTextEditor = ({
  content,
  placeholder,
  ...props
}: RichTextEditorProps & {}) => {
  const lowlight = createLowlight(all);
  lowlight.register("html", html);
  lowlight.register("css", css);
  lowlight.register("js", js);
  lowlight.register("ts", ts);

  const extensions = [
    starterExtension,
    Highlight,
    Typography,
    CodeBlock,
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Code,
    Placeholder.configure({
      placeholder: "How can I help you?",
    }),
  ];

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    editable: !props.readOnly,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <EditorContent
      className="rte-content-editor"
      readOnly={props.readOnly}
      editor={editor}
    />
  );
};
