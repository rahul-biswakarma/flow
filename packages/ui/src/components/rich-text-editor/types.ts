import type { Editor, JSONContent } from "@tiptap/react";

export interface RichTextEditorProps {
  content?: JSONContent;
  readOnly?: boolean;
  afterSlot?: React.ReactNode;
  beforeSlot?: React.ReactNode;
  containerClassName?: string;
  submitButtonRenderer?: React.ReactNode;
  placeholder?: string;
  onSubmit?: (editor: Editor) => void;
  disabled?: boolean;
  isLoading?: boolean;
  ref?: React.RefObject<Editor>;
}
