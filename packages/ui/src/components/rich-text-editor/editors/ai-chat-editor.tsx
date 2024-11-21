import { type Editor, EditorContent } from "@tiptap/react";
import { clsx } from "clsx";
import { useCallback } from "react";
import type { RichTextEditorProps } from "../types";
import "./ai-chat.css";
import { IconButton } from "../../icon-button";
import { Icons } from "../../icons";

export const AIChatEditor = ({
  containerClassName,
  editor,
  readOnly,
  beforeSlot,
  onSubmit,
  disabled,
  isLoading,
}: RichTextEditorProps & {
  editor: Editor;
}) => {
  const handleContainerClick = useCallback(() => {
    if (editor && !readOnly) {
      editor.commands.focus();
    }
  }, [editor, readOnly]);

  return (
    <div className="flex items-center justify-center relative bg-gradient-to-b from-gray-4 to-gray-3 rounded-sm overflow-hidden max-h-full p-[1px]">
      <div
        onClick={handleContainerClick}
        className={clsx(
          "rte-base relative flex w-full p-2 gap-2 rounded-sm",
          containerClassName,
        )}
      >
        {beforeSlot && beforeSlot}
        <EditorContent
          type="input"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit?.(editor);
            }
          }}
          className="w-full h-full pt-1"
          editor={editor}
        />
        <div className="flex items-center gap-2 h-full">
          <IconButton
            disabled={disabled ?? isLoading}
            variant="ghost"
            color="gray"
            onClick={() => {
              editor.commands.setContent(
                "Build a Pokemon Card component that show random pokemon stats",
              );
            }}
            size="1"
          >
            <Icons.Bulb />
          </IconButton>
          <IconButton
            disabled={disabled ?? isLoading}
            onClick={() => {
              onSubmit?.(editor);
            }}
            size="1"
          >
            {isLoading ? <Icons.Loader /> : <Icons.ArrowRight />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};
