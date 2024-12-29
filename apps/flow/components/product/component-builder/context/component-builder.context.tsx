import type { CodeEditorType } from "@ren/ui/editors";
import type { StyleData, ThemeData } from "@ren/ui/panels";
import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { defaultComponentCode } from "../constants";
import type { PropSchema, PropValues } from "../types";
import type { ComponentBuilderContextType } from "./type";

const defaultThemeValue: ThemeData = {
  accentColor: "indigo",
  grayColor: "slate",
  appearance: "dark",
  radius: "medium",
  scaling: "100%",
  panelBackground: "translucent",
};

const ComponentBuilderContext = createContext<ComponentBuilderContextType>(
  {} as ComponentBuilderContextType,
);

export const ComponentBuilderProvider = ({
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
  const [transformedCode, setTransformedCode] = useState<string | null>(null);
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
        transformedCode,
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
        setTransformedCode,
        resetComponentBuilder,
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
