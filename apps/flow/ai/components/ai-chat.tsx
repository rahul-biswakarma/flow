"use client";

import { FlowArc2 } from "@flow/components/flow/arcs";
import { Avatar, IconButton, ScrollArea, Text } from "@ren/ui/components";
import { RichTextEditor, type RichTextEditorRef } from "@ren/ui/editors";
import { Icons } from "@ren/ui/icons";
import type { Editor } from "@tiptap/react";
import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import { type UseAIChatOptions, useAIChat } from "../hooks/use-ai-chat";

import "./ai-chat.css";
import { useFlowContext } from "@flow/providers";

export interface AIChatProps extends UseAIChatOptions {
  title?: string;
  placeholder?: string;
  className?: string;
  onSend?: (message: string) => void;
  userAvatar?: string;
  disabled?: boolean;
  contentHandler?: ({
    response,
    totalMessages,
    currentMessage,
  }: {
    response: string;
    totalMessages: number;
    currentMessage: number;
  }) => string;
}

export const AIChat = ({
  title = "AI Assistant",
  placeholder = "Type a message...",
  className = "",
  onSend,
  userAvatar,
  disabled = false,
  contentHandler,
  ...chatOptions
}: AIChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<RichTextEditorRef>(null);
  const { messages, isLoading, submitMessage } = useAIChat(chatOptions);
  const { user } = useFlowContext();

  // Auto-scroll effect
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]",
        );
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    };

    scrollToBottom();
    // Add a small delay to ensure content is rendered
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [messages.length]); // Re-run when messages change

  const handleMessageSubmit = async (editor: Editor) => {
    try {
      const content = editor.getText().trim();
      if (!content || disabled) return;

      onSend?.(content);
      editor.commands.setContent("");
      await submitMessage(content);
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  const isSubmitDisabled =
    disabled || isLoading || editorRef.current?.isEmpty();

  return (
    <div className={clsx("flex flex-col h-full w-full", className)}>
      <ScrollArea ref={scrollAreaRef}>
        <div className="relative flex gap-2 flex-col justify-end h-full p-3 pb-0">
          {messages.length === 0 && (
            <div className="flex flex-col gap-8 justify-center items-center w-full h-full">
              <div className="w-[100px] h-[100px]">
                <FlowArc2 />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Text className="text-[18px] text-gray-12">
                  Hello, {user.full_name?.split(" ")[0]}
                </Text>
                <Text className="text-[16px] text-gray-10">
                  What would you like to build today?
                </Text>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={message.id} className={clsx("w-full")}>
              <div
                className={clsx("flex gap-2 py-3 rounded-md", {
                  "bg-gray-a2 px-4": message.role === "user",
                })}
              >
                {message.role === "assistant" && (
                  <Avatar size="2" fallback="A" />
                )}
                <Text size="2" className="whitespace-pre-wrap">
                  {message.role === "user"
                    ? message.content.trim()
                    : contentHandler?.({
                        response: message.content.trim(),
                        totalMessages: messages.length,
                        currentMessage: index,
                      }) ||
                      message.content.trim() ||
                      "Thinking..."}
                </Text>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-3 pt-0">
        <div
          className="w-full bg-gray-a2 border border-gray-a5 rounded-sm gap-2 overflow-hidden"
          onClick={() => {
            editorRef.current?.focus();
          }}
        >
          <RichTextEditor
            ref={editorRef}
            editorClassName="rounded-none focus:outline-none max-h-32 overflow-y-auto no-scrollbar"
            placeholder={placeholder}
            onSubmit={handleMessageSubmit}
            disabled={disabled}
            isLoading={isLoading}
          />
          <div className="flex gap-1 p-1.5 justify-between items-center">
            <IconButton
              color="gray"
              variant="ghost"
              className="border-none shadow-none !bg-transparent hover:!bg-gray-a3 focus:bg-gray-a3"
            >
              <Icons.Photo
                className={clsx("!text-gray-10", {
                  "!text-gray-7": isSubmitDisabled,
                })}
                size={18}
              />
            </IconButton>
            <IconButton
              variant="ghost"
              disabled={isSubmitDisabled}
              color="gray"
              onClick={async () => {
                if (editorRef.current?.editor)
                  await handleMessageSubmit(editorRef.current?.editor);
              }}
            >
              <Icons.Send2
                className={clsx("!text-gray-10", {
                  "!text-gray-7": isSubmitDisabled,
                })}
                size={20}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
