import { AIChat } from "@v1/ai/ai-chat";
import debounce from "lodash/debounce";
import { useCallback } from "react";
import { useComponentBuilderContext } from "../context";
import { parseAIResponse } from "../utils";

export const ComponentBuilderAIChat = () => {
  const {
    isAIGenerating,
    componentName,
    componentDescription,
    componentKeywords,
    componentProps,
    componentCode,
    setIsAIGenerating,
    setComponentName,
    setComponentDescription,
    setComponentKeywords,
    setComponentProps,
    setComponentCode,
  } = useComponentBuilderContext();

  const updateState = useCallback((updates: Partial<typeof state>) => {
    // Batch all state updates
    setComponentName((prev) => updates.componentName || prev);
    setComponentDescription((prev) => updates.componentDescription || prev);
    setComponentKeywords((prev) => updates.componentKeywords || prev);
    setComponentProps((prev) => updates.componentProps || prev);
    setComponentCode((prev) => updates.componentCode || prev);
  }, []);

  const debouncedUpdateState = useCallback(debounce(updateState, 300), [
    updateState,
  ]);

  const handleMetadataStream = useCallback(
    (data: {
      response: string;
      totalMessages: number;
      currentMessage: number;
    }): string => {
      const rawParsedData = parseAIResponse(data.response);
      const isLastMessage = data.totalMessages - 1 === data.currentMessage;

      if (!isLastMessage) {
        return rawParsedData.explanation;
      }

      const updates: Partial<typeof state> = {};

      if (
        rawParsedData.componentName &&
        componentName !== rawParsedData.componentName
      ) {
        updates.componentName = rawParsedData.componentName;
      }

      if (
        rawParsedData.componentDescription &&
        componentDescription !== rawParsedData.componentDescription
      ) {
        updates.componentDescription = rawParsedData.componentDescription;
      }

      if (
        rawParsedData.componentKeywords &&
        JSON.stringify(componentKeywords) !== rawParsedData.componentKeywords
      ) {
        updates.componentKeywords = JSON.parse(rawParsedData.componentKeywords);
      }

      if (
        rawParsedData.componentProps &&
        JSON.stringify(componentProps) !== rawParsedData.componentProps
      ) {
        updates.componentProps = JSON.parse(rawParsedData.componentProps);
      }

      if (
        rawParsedData.componentCode &&
        componentCode !== rawParsedData.componentCode
      ) {
        updates.componentCode = rawParsedData.componentCode;
      }

      debouncedUpdateState(updates);

      return rawParsedData.explanation ?? "";
    },
    [
      componentName,
      componentDescription,
      componentKeywords,
      componentProps,
      componentCode,
      debouncedUpdateState,
    ],
  );

  return (
    <div className="relative h-full w-full bg-gray-a1">
      <AIChat
        api="/api/ai/cb"
        title="Component Assistant"
        placeholder="Describe the component you want to create..."
        contentHandler={handleMetadataStream}
        disabled={isAIGenerating}
        onSend={() => {
          setIsAIGenerating(true);
        }}
        onFinish={() => {
          setIsAIGenerating(false);
        }}
        onError={(error) => {
          console.error("Chat error:", error);
        }}
      />
    </div>
  );
};
