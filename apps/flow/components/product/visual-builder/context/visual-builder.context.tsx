import type { CodeEditorType } from "@ren/ui/editors";
import type { StyleData, ThemeData } from "@ren/ui/panels";
import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { defaultComponentCode } from "../constants";
import type { PropSchema, PropValues } from "../types";

const VisualBuilderContext = createContext<VisualBuilderContextType>({
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
  themeValue: defaultThemeValue,
  propsValue: {},
  setPropsValue: () => {},
  setThemeValue: () => {},
  setIsAIGenerating: () => {},
  setStyleValue: () => {},
  setComponentName: () => {},
  setComponentDescription: () => {},
  setComponentKeywords: () => {},
  setComponentProps: () => {},
  setComponentCode: () => {},
  resetComponentBuilder: () => {},
});

export const VisualBuilderProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const isAIGeneratingRef = useRef(false);
  const componentNameRef = useRef<HTMLInputElement>(null);
  const componentDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const componentKeywordsRef = useRef<HTMLDivElement>(null);
  const componentPropsRef = useRef<PropSchema[]>([]);
  const componentCodeRef = useRef<CodeEditorType>(null);

  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [styleValue, setStyleValue] = useState<StyleData>({});
  const [componentName, setComponentName] = useState("");
  const [componentDescription, setComponentDescription] = useState("");
  const [componentKeywords, setComponentKeywords] = useState<string[]>([]);
  const [componentProps, setComponentProps] = useState<PropSchema[]>([]);
  const [componentCode, setComponentCode] = useState(defaultComponentCode);
  const [themeValue, setThemeValue] = useState<ThemeData>(defaultThemeValue);
  const [propsValue, setPropsValue] = useState<PropValues>({});

  useEffect(() => {
    isAIGeneratingRef.current = isAIGenerating;
  }, [isAIGenerating]);

  const isConfigValid = Boolean(
    componentName && componentDescription && componentCode,
  );

  const resetComponentBuilder = () => {
    setComponentName("");
    setComponentDescription("");
    setComponentKeywords([]);
    setComponentProps([]);
    setComponentCode(defaultComponentCode);
    setStyleValue({});
    setThemeValue(defaultThemeValue);
    setPropsValue({});
  };

  return (
    <VisualBuilderContext.Provider
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
        themeValue,
        propsValue,
        setPropsValue,
        setIsAIGenerating,
        setThemeValue,
        setStyleValue,
        setComponentName,
        setComponentDescription,
        setComponentKeywords,
        setComponentProps,
        setComponentCode,
        resetComponentBuilder,
      }}
    >
      {children}
    </VisualBuilderContext.Provider>
  );
};

export const useVisualBuilderContext = () => {
  const context = React.useContext(VisualBuilderContext);
  if (context === undefined) {
    throw new Error(
      "useVisualBuilderContext must be used within a VisualBuilderContext",
    );
  }
  return context;
};
