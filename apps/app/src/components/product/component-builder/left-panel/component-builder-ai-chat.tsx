import { useFlowContext } from "@/context";
import { AIChat } from "@v1/ai/ai-chat";
import { useCallback, useRef } from "react";
import type { ComponentData, PropSchema } from "../types";
import { parseAIResponse } from "../utils";

interface ComponentBuilderAIChatProps {
  setNewComponentData?: React.Dispatch<React.SetStateAction<ComponentData>>;
}

export const ComponentBuilderAIChat = ({
  setNewComponentData,
}: ComponentBuilderAIChatProps) => {
  const { user } = useFlowContext();
  const lastMessageRef = useRef<{
    response: string;
    totalMessages: number;
    currentMessage: number;
  } | null>(null);
  const lastParsedDataRef = useRef<Partial<ComponentData>>({});

  const processMessage = useCallback(
    (message: typeof lastMessageRef.current) => {
      if (!message || message.totalMessages - 1 !== message.currentMessage) {
        return;
      }

      const rawParsedData = parseAIResponse(message.response);
      console.log("Raw parsed data:", rawParsedData, message.response);

      let componentKeywords: string[] = [];
      let componentProps: PropSchema[] = [];

      try {
        if (rawParsedData.componentKeywords) {
          componentKeywords =
            JSON.parse(rawParsedData.componentKeywords ?? "[]") ?? [];
        }
      } catch (error) {
        console.error("Error parsing componentKeywords:", error);
      }

      try {
        if (rawParsedData.componentProps) {
          componentProps =
            JSON.parse(rawParsedData.componentProps ?? "[]") ?? [];
        }
      } catch (error) {
        console.error("Error parsing componentProps:", error);
      }

      const newData: Partial<ComponentData> = {
        name: rawParsedData.componentName,
        description: rawParsedData.componentDescription,
        keywords: componentKeywords,
        props: componentProps,
        code: rawParsedData.componentCode,
      };

      if (
        JSON.stringify(newData) !== JSON.stringify(lastParsedDataRef.current)
      ) {
        lastParsedDataRef.current = newData;
        setNewComponentData?.((prev) => ({
          ...prev,
          ...(newData.name && { name: newData.name }),
          ...(newData.description && { description: newData.description }),
          ...(newData.keywords && { keywords: newData.keywords }),
          ...(newData.props && { props: newData.props }),
          ...(newData.code && { code: newData.code }),
        }));
      }
    },
    [setNewComponentData],
  );

  const handleMetadataStream = useCallback(
    (data: {
      response: string;
      totalMessages: number;
      currentMessage: number;
    }): string => {
      lastMessageRef.current = data;
      const rawParsedData = parseAIResponse(data.response);

      // Schedule the processing for the next tick
      setTimeout(() => processMessage(data), 0);

      return rawParsedData.explanation;
    },
    [processMessage],
  );

  return (
    <div className="h-full w-full bg-gray-a1 pb-[56px]">
      <AIChat
        api="/api/ai/cb"
        userAvatar={user?.avatar_url ?? undefined}
        title="Component Assistant"
        placeholder="Describe the component you want to create..."
        contentHandler={handleMetadataStream}
        onError={(error) => {
          console.error("Chat error:", error);
        }}
      />
    </div>
  );
};
