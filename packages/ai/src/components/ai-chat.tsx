"use client";
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
}

export const AIChat = ({
  title = "AI Assistant",
  placeholder = "Type a message...",
  className = "",
  onSend,
  userAvatar,
  ...chatOptions
}: AIChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useAIChat(chatOptions);

  return (
    <div className={clsx("h-full w-full p-3", className)}>
      <ScrollArea>
        <div className="flex flex-col h-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 w-fit ${
                message.role === "assistant" ? "bg-gray-a3" : "bg-accent-a3"
              }`}
            >
              <div className="flex items-start gap-2">
                {message.role === "assistant" ? (
                  <Avatar size="2" fallback={"U"} src={userAvatar} />
                ) : (
                  <Avatar size="2" fallback={"U"} src={userAvatar} />
                )}
                <Text size="2" className="whitespace-pre-wrap">
                  {message.content}
                </Text>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="w-full sticky bottom-0 left-0 py-3">
        <RichTextEditor
          content={{}}
          variant="ai-chat"
          placeholder="Hello, how can I help you?"
        />
      </div>
    </div>
  );
};
