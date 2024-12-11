"use client";
import type { Editor } from "@tiptap/react";
import { Avatar } from "@v1/ui/avatar";
import { RichTextEditor } from "@v1/ui/rte";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Text } from "@v1/ui/text";
import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import { type UseAIChatOptions, useAIChat } from "../hooks/use-ai-chat";

export interface AIChatProps extends UseAIChatOptions {
  title?: string;
  placeholder?: string;
  className?: string;
  onSend?: (message: string) => void;
  userAvatar?: string;
  disabled?: boolean;
  ref?: React.RefObject<Editor>;
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
  ref,
  ...chatOptions
}: AIChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, submitMessage } = useAIChat(chatOptions);

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

  return (
    <div className={clsx("flex flex-col h-full w-full", className)}>
      <ScrollArea ref={scrollAreaRef}>
        <div className="relative flex gap-2 flex-col justify-end h-full p-3 pb-0">
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
        <RichTextEditor
          ref={ref}
          variant="ai-chat"
          placeholder={placeholder}
          onSubmit={handleMessageSubmit}
          disabled={disabled}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
