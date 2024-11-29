"use client";
import type { Editor } from "@tiptap/react";
import { Avatar } from "@v1/ui/avatar";
import { RichTextEditor } from "@v1/ui/rte";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Text } from "@v1/ui/text";
import { clsx } from "clsx";
import { useRef } from "react";
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
  const { messages, isLoading, submitMessage } = useAIChat(chatOptions);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMessageSubmit = async (editor: Editor) => {
    try {
      const content = editor.getText().trim();
      if (!content || disabled) return;

      onSend?.(content);
      editor.commands.setContent("");
      scrollToBottom();
      await submitMessage(content);
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <div className={clsx("h-full w-full p-3", className)}>
      <ScrollArea>
        <div className="flex flex-col justify-end h-full">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={clsx("py-3 px-4 w-auto rounded-md", {
                "bg-gray-a2 ml-auto": message.role === "user",
              })}
            >
              <div className="flex gap-2">
                {message.role === "assistant" && (
                  <Avatar size="2" fallback="A" />
                )}
                <Text size="2" className="whitespace-pre-wrap">
                  {message.role === "user"
                    ? message.content.trim()
                    : (contentHandler?.({
                        response: message.content.trim(),
                        totalMessages: messages.length,
                        currentMessage: index,
                      }) ?? message.content.trim())}
                </Text>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="sticky bottom-0 w-full left-0 py-3">
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
