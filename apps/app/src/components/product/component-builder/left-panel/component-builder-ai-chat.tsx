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

  const latestDataRef = useRef<UpdateStateProps>({
    componentName: "",
    componentDescription: "",
    componentKeywords: [],
    componentProps: [],
    componentCode: "",
  });

  const updateState = useCallback(() => {
    setComponentName(latestDataRef.current.componentName ?? "");
    setComponentDescription(latestDataRef.current.componentDescription ?? "");
    setComponentKeywords(latestDataRef.current.componentKeywords ?? []);
    setComponentProps(latestDataRef.current.componentProps ?? []);
    setComponentCode(latestDataRef.current.componentCode ?? "");
  }, []);

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

    if (rawParsedData.componentName) {
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

    if (rawParsedData.componentDescription) {
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

    if (
      rawParsedData.componentCode.content &&
      rawParsedData.componentCode.status !== "complete" &&
      componentCodeRef?.current
    ) {
      latestDataRef.current.componentCode = rawParsedData.componentCode.content;
      Promise.resolve().then(() => {
        const editor = componentCodeRef.current?.getCodemirror();
        if (!editor) return;

        const currentContent = editor.state.doc.toString();
        const newContent = rawParsedData.componentCode.content;

        if (currentContent !== newContent) {
          editor.dispatch({
            changes: {
              from: 0,
              to: editor.state.doc.length,
              insert: newContent,
            },
          });
        }
      });
    }

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
