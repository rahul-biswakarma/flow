import type { EditorView } from "@tiptap/pm/view";
import type {
  Editor,
  JSONContent,
  NodeWithPos,
  Predicate,
} from "@tiptap/react";

export type RichTextEditor = Editor;

export interface RichTextEditorProps {
  content?: string;
  readOnly?: boolean;
  afterSlot?: React.ReactNode;
  beforeSlot?: React.ReactNode;
  editorClassName?: string;
  submitButtonRenderer?: React.ReactNode;
  placeholder?: string;
  onSubmit?: (editor: RichTextEditor) => void;
  disabled?: boolean;
  isLoading?: boolean;
  ref?: React.RefObject<RichTextEditorRef>;
}

export interface RichTextEditorRef {
  editor: Editor;
  /** Returns the content of the editor in Markdown format*/
  getContent: () => string;
  /** Returns the content of the editor in HTML format */
  getHTML: () => string;
  /** Returns true if the editor is empty */
  isEmpty: () => boolean;
  /** Set the content of the editor */
  setContent: (content: string | JSONContent) => void;
  /** Sets the focus on RTE */
  focus: () => boolean | undefined;
  /** Gets the JSON from the editor */
  getJSON: (
    /**
     * cleans all the error nodes from the json
     * @default true
     */
    clean?: boolean,
  ) => JSONContent;
  /** Return the DOM structure that represents RTE */
  editorView: () => EditorView | undefined;
  getNodes: (fn: Predicate) => NodeWithPos[];
  setEditorClassName: (className: string) => void;
  isFocused: () => boolean;
}
