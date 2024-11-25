import { AIChat } from "@v1/ai/ai-chat";
import { useCallback, useRef } from "react";
import { useComponentBuilderContext } from "../context";
import type { PropSchema } from "../types";
import { parseAIResponse } from "../utils";

type UpdateStateProps = {
  componentName?: string;
  componentDescription?: string;
  componentKeywords?: string[];
  componentProps?: PropSchema[];
  componentCode?: string;
};

export const ComponentBuilderAIChat = () => {
  const {
    isAIGenerating,
    componentNameRef,
    componentDescriptionRef,
    componentKeywordsRef,
    componentPropsRef,
    componentCodeRef,
    setIsAIGenerating,
    setComponentName,
    setComponentDescription,
    setComponentKeywords,
    setComponentProps,
    setComponentCode,
  } = useComponentBuilderContext();

  const nameRef = useRef<string>("");
  const descriptionRef = useRef<string>("");

  const updateState = useCallback(() => {
    setComponentName((prev) => nameRef?.current || prev);
    setComponentDescription((prev) => descriptionRef?.current || prev);
    setComponentKeywords((prev) => componentKeywordsRef?.current || prev);
    setComponentProps((prev) => componentPropsRef?.current || prev);
    setComponentCode((prev) => componentCodeRef?.current || prev);
  }, []);

  const handleMetadataStream = (data: {
    response: string;
    totalMessages: number;
    currentMessage: number;
  }): string => {
    const rawParsedData = parseAIResponse(data.response);
    const isLastMessage = data.totalMessages - 1 === data.currentMessage;

    if (!isLastMessage) {
      return rawParsedData.explanation;``
    }

    const updates: UpdateStateProps = {};

    if (rawParsedData.componentName) {
      updates.componentName = rawParsedData.componentName.content;
      nameRef.current = rawParsedData.componentName.content;
      if (
        componentNameRef?.current &&
        componentNameRef.current.value !==
          rawParsedData.componentName.content &&
        rawParsedData.componentName.status !== "complete"
      ) {
        componentNameRef.current.value = rawParsedData.componentName.content;
      }
      if (rawParsedData.componentName.status === "complete") {
        setComponentName(rawParsedData.componentName.content);
      }
    }

    if (rawParsedData.componentDescription) {
      updates.componentDescription = rawParsedData.componentDescription.content;
      descriptionRef.current = rawParsedData.componentDescription.content;
      if (
        componentDescriptionRef?.current &&
        componentDescriptionRef.current.value !==
          rawParsedData.componentDescription.content
      ) {
        componentDescriptionRef.current.value =
          rawParsedData.componentDescription.content;
      }

      if (rawParsedData.componentDescription.status === "complete") {
        setComponentDescription(rawParsedData.componentDescription.content);
      }
    }

    if (
      rawParsedData.componentKeywords &&
      componentKeywordsRef?.current &&
      componentKeywordsRef.current.join("") !==
        rawParsedData.componentKeywords.content.join("") &&
      rawParsedData.componentKeywords.status !== "complete"
    ) {
      updates.componentKeywords = rawParsedData.componentKeywords.content;
      componentKeywordsRef.current = rawParsedData.componentKeywords.content;
      setComponentKeywords(() => [...rawParsedData.componentKeywords.content]);
    }

    // if (rawParsedData.componentProps) {
    //   updates.componentProps = JSON.parse(rawParsedData.componentProps);
    // }

    // if (rawParsedData.componentCode) {
    //   updates.componentCode = rawParsedData.componentCode;
    // }

    return rawParsedData.explanation ?? "";
  };

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
          updateState();
        }}
        onError={(error) => {
          console.error("Chat error:", error);
        }}
      />
    </div>
  );
};
