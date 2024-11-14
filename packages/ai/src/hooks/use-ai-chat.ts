import type { Message } from "ai";
import { useChat as useVercelChat } from "ai/react";
import { useCallback } from "react";

export interface UseAIChatOptions {
  api?: string;
  id?: string;
  initialMessages?: Message[];
  onResponse?: (response: Response) => void;
  onFinish?: (message: Message) => void;
  onError?: (error: Error) => void;
}

export const useAIChat = ({
  api = "/api/chat",
  id,
  initialMessages = [],
  onResponse,
  onFinish,
  onError,
}: UseAIChatOptions = {}) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
    reload,
    stop,
    setMessages,
  } = useVercelChat({
    api,
    id,
    initialMessages,
    onResponse,
    onFinish,
    onError,
  });

  const submitMessage = useCallback(
    async (message: string) => {
      try {
        await append({
          content: message,
          role: "user",
        });
      } catch (err) {
        console.error("Error submitting message:", err);
        onError?.(err as Error);
      }
    },
    [append, onError],
  );

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    submitMessage,
    reload,
    stop,
    setMessages,
  };
};
