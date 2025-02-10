import {
  EditorContent,
  type Predicate,
  findChildren,
  useEditor,
} from "@tiptap/react";
import "./rich-text-editor.css";
import clsx from "clsx";
import { useEffect, useImperativeHandle, useMemo } from "react";
import React from "react";
import { getRteExtensions } from "./extension";
import type { RichTextEditorProps, RichTextEditorRef } from "./types";
import { cleanNodes } from "./utils/clean-node";

const RichTextEditor = React.forwardRef<RichTextEditorRef, RichTextEditorProps>(
  (props, ref) => {
    const { content, placeholder } = props;

    const editor = useEditor({
      immediatelyRender: false,
      extensions: getRteExtensions({
        placeholder,
      }),
      editable: !props.readOnly,
      editorProps: {
        attributes: {
          class: props.editorClassName ?? "",
        },
      },
    });

    const editorOperations = useMemo(() => {
      return {
        editor,
        editorView: () => editor?.view,
        focus: () => editor?.commands.focus(),
        getContent: () => {
          return editor?.storage?.contentUtils?.getMarkdown?.(editor);
        },
        getHTML: () => editor?.getHTML() || "",
        getJSON: (clean = true) => {
          if (!editor) return {};

          if (clean) {
            cleanNodes(editor);
          }

          return editor.getJSON();
        },
        getNodes: (fn: Predicate) =>
          editor?.state.doc ? findChildren(editor.state.doc, fn) : [],
        isEmpty: () => editor?.isEmpty ?? true,
        isFocused: () => editor?.isFocused,
        setContent: (newContent: string) =>
          editor?.commands.setContent(newContent),
      } as RichTextEditorRef;
    }, [editor]);

    useImperativeHandle(ref, () => editorOperations, [editorOperations]);

    useEffect(() => {
      if (editor) {
        editor.commands.setContent(content || "");
      }
    }, [content, editor]);

    if (!editor) return null;

    return (
      <EditorContent
        className={clsx("rte-content-editor")}
        readOnly={props.readOnly}
        editor={editor}
      />
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
