import type { StyleData } from "@/components/panels/style-panel/type";
import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { defaultComponentCode } from "../constants";
import type { CodeMirrorRef, PropSchema } from "../types";
import type { ComponentBuilderContextType } from "./type";

const ComponentBuilderContext = createContext<ComponentBuilderContextType>({
  isConfigValid: false,
  isAIGenerating: false,
  isAIGeneratingRef: { current: false },
  componentNameRef: undefined,
  componentDescriptionRef: undefined,
  componentKeywordsRef: undefined,
  componentPropsRef: undefined,
  componentCodeRef: undefined,
  styleValue: {},
  componentName: "",
  componentDescription: "",
  componentKeywords: [],
  componentProps: [],
  componentCode: defaultComponentCode,
  setIsAIGenerating: () => {},
  setStyleValue: () => {},
  setComponentName: () => {},
  setComponentDescription: () => {},
  setComponentKeywords: () => {},
  setComponentProps: () => {},
  setComponentCode: () => {},
});

export const ComponentBuilderProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const isAIGeneratingRef = useRef(false);
  const componentNameRef = useRef<HTMLInputElement>(null);
  const componentDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const componentKeywordsRef = useRef<HTMLDivElement>(null);
  const componentPropsRef = useRef<PropSchema[]>([]);
  const componentCodeRef = useRef<CodeMirrorRef>(null);

  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [styleValue, setStyleValue] = useState<StyleData>({});
  const [componentName, setComponentName] = useState("");
  const [componentDescription, setComponentDescription] = useState("");
  const [componentKeywords, setComponentKeywords] = useState<string[]>([]);
  const [componentProps, setComponentProps] = useState<PropSchema[]>([]);
  const [componentCode, setComponentCode] = useState(defaultComponentCode);

  useEffect(() => {
    isAIGeneratingRef.current = isAIGenerating;
  }, [isAIGenerating]);

  const isConfigValid = Boolean(
    componentName && componentDescription && componentCode,
  );

  return (
    <ComponentBuilderContext.Provider
      value={{
        isConfigValid,
        isAIGenerating,
        isAIGeneratingRef,
        componentNameRef,
        componentDescriptionRef,
        componentKeywordsRef,
        componentPropsRef,
        componentCodeRef,
        styleValue,
        componentName,
        componentDescription,
        componentKeywords,
        componentProps,
        componentCode,
        setIsAIGenerating,
        setStyleValue,
        setComponentName,
        setComponentDescription,
        setComponentKeywords,
        setComponentProps,
        setComponentCode,
      }}
    >
      {children}
    </ComponentBuilderContext.Provider>
  );
};

export const useComponentBuilderContext = () => {
  const context = React.useContext(ComponentBuilderContext);
  if (context === undefined) {
    throw new Error(
      "useComponentBuilderContext must be used within a ComponentBuilderContext",
    );
  }
  return context;
};
