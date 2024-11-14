import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";
import { Icons } from "@v1/ui/icons";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { useCallback, useEffect, useRef } from "react";
import type { UseAIChatOptions } from "../hooks/use-ai-chat";
import { useAIChat } from "../hooks/use-ai-chat";

export interface AIChatProps extends UseAIChatOptions {
  title?: string;
  placeholder?: string;
  className?: string;
  onSend?: (message: string) => void;
}

export const AIChat = ({
  title = "AI Assistant",
  placeholder = "Type a message...",
  className = "",
  onSend,
  ...chatOptions
}: AIChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useAIChat(chatOptions);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="p-4 border-b border-outline-02">
        <Text size="2" weight="medium">
          {title}
        </Text>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <Card
              key={message.id}
              className={`p-4 ${
                message.role === "assistant" ? "bg-accent-3" : "bg-gray-3"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {message.role === "assistant" ? (
                  <Icons.Bot className="w-4 h-4" />
                ) : (
                  <Icons.User className="w-4 h-4" />
                )}
                <Text size="2" weight="medium">
                  {message.role === "assistant" ? "AI Assistant" : "You"}
                </Text>
              </div>
              <Text className="whitespace-pre-wrap">{message.content}</Text>
            </Card>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <Card className="m-4 p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              onSend?.(input);
              handleSubmit(e);
            }
          }}
          className="flex items-center gap-2"
        >
          <TextField.Root
            value={input}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Icons.Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Icons.ArrowRight className="w-4 h-4" />
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};
