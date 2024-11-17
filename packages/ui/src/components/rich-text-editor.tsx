import { EditorProvider, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

export const RichTextEditor = ({
  content,
  readOnly,
}: {
  content: JSONContent;
  readOnly?: boolean;
}) => {
  return <EditorProvider extensions={extensions} content={content} />;
};
