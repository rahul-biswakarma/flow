import { Avatar } from "@v1/ui/avatar";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { RichTextEditor } from "@v1/ui/rte";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { useCallback, useEffect, useRef } from "react";
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

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className={`h-full w-full ${className}`}>
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col h-full justify-end space-y-4">
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

      <div className="p-3 w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              onSend?.(input);
              handleSubmit(e);
            }
          }}
        >
          <RichTextEditor content={{}} />
          <TextField.Root
            value={input}
            size="3"
            radius="full"
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex-1 !px-0 !w-fit"
          >
            <TextField.Slot
              style={{
                padding: "5px",
              }}
            />
            <TextField.Slot>
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? (
                  <Icons.Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Icons.ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </TextField.Slot>
          </TextField.Root>
        </form>
      </div>
    </div>
  );
};
