import { AIChat } from "@flow/ai";
import { useCallback, useRef } from "react";
import { useComponentBuilderContext } from "../../context";
import type { PropSchema } from "../../types";
import { parseAIResponse } from "../../utils";

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
    componentCodeRef,
    setIsAIGenerating,
    setComponentName,
    setComponentDescription,
    setComponentKeywords,
    setComponentProps,
    setComponentCode,
  } = useComponentBuilderContext();

  const latestDataRef = useRef<UpdateStateProps>({
    componentName: "",
    componentDescription: "",
    componentKeywords: [],
    componentProps: [],
    componentCode: "",
  });

  const updateState = useCallback(() => {
    if (
      componentKeywordsRef?.current?.firstChild &&
      latestDataRef?.current?.componentKeywords
    ) {
      let keyCount = componentKeywordsRef.current.children.length;
      while (keyCount > 0) {
        componentKeywordsRef.current.lastChild?.remove();
        keyCount--;
      }
    }

    latestDataRef.current.componentName &&
      setComponentName(latestDataRef.current.componentName ?? "");
    latestDataRef.current.componentDescription &&
      setComponentDescription(latestDataRef.current.componentDescription ?? "");
    latestDataRef.current.componentKeywords?.length &&
      setComponentKeywords(latestDataRef.current.componentKeywords ?? []);
    latestDataRef.current.componentProps?.length &&
      setComponentProps(latestDataRef.current.componentProps ?? []);
    latestDataRef.current.componentCode &&
      setComponentCode(latestDataRef.current.componentCode ?? "");
  }, [
    setComponentName,
    componentKeywordsRef,
    setComponentKeywords,
    setComponentProps,
    setComponentCode,
    setComponentDescription,
  ]);

  const handleMetadataStream = (data: {
    response: string;
    totalMessages: number;
    currentMessage: number;
  }): string => {
    const rawParsedData = parseAIResponse(data.response);
    const isLastMessage = data.totalMessages - 1 === data.currentMessage;

    if (!isLastMessage) {
      return rawParsedData.explanation;
    }

    if (rawParsedData.componentName.content) {
      latestDataRef.current.componentName = rawParsedData.componentName.content;
      if (
        componentNameRef?.current &&
        componentNameRef.current.value !==
          rawParsedData.componentName.content &&
        rawParsedData.componentName.status !== "complete"
      ) {
        componentNameRef.current.value = rawParsedData.componentName.content;
      }
    }

    if (rawParsedData.componentDescription.content) {
      latestDataRef.current.componentDescription =
        rawParsedData.componentDescription.content;
      if (
        componentDescriptionRef?.current &&
        componentDescriptionRef.current.value !==
          rawParsedData.componentDescription.content
      ) {
        componentDescriptionRef.current.value =
          rawParsedData.componentDescription.content;
      }
    }

    if (rawParsedData.componentKeywords.content.length) {
      for (const keyword of rawParsedData.componentKeywords.content) {
        if (
          !latestDataRef.current?.componentKeywords?.includes(keyword) &&
          keyword
        ) {
          const keywordElement = document.createElement("div");
          keywordElement.classList.add(
            "flex",
            "gap-1",
            "items-center",
            "justify-center",
            "px-2",
            "py-1",
            "rounded",
            "bg-gray-a4",
            "border",
            "border-gray-a6",
            "cursor-default",
          );
          keywordElement.textContent = keyword;
          componentKeywordsRef?.current?.appendChild(keywordElement);
        }
      }
      latestDataRef.current.componentKeywords =
        rawParsedData.componentKeywords.content;
    }

    if (
      rawParsedData.componentProps.content &&
      rawParsedData.componentProps.status === "complete"
    ) {
      try {
        latestDataRef.current.componentProps = JSON.parse(
          rawParsedData.componentProps.content,
        );
      } catch {
        // ignore
      }
    }

    if (
      rawParsedData.componentCode.content &&
      rawParsedData.componentCode.status !== "complete" &&
      componentCodeRef?.current
    ) {
      latestDataRef.current.componentCode = rawParsedData.componentCode.content;
      Promise.resolve().then(() => {
        const editor = componentCodeRef.current;
        if (!editor) return;
        editor.setValue(rawParsedData.componentCode.content);
      });
    }

    return rawParsedData.explanation ?? "Thinking...";
  };

  return (
    <div className="flex grow relative h-full w-full bg-gray-a1">
      <AIChat
        api="/api/ai/cb"
        title="Component Assistant"
        placeholder="Write here..."
        contentHandler={handleMetadataStream}
        disabled={isAIGenerating}
        onSend={() => {
          setIsAIGenerating(true);
        }}
        onFinish={() => {
          Promise.resolve().then(() => {
            updateState();
            setIsAIGenerating(false);
          });
        }}
        onError={(error) => {
          console.error("Chat error:", error);
        }}
      />
    </div>
  );
};
