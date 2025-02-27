import type { CodeEditorType } from "@ren/ui/editors";
import type { StyleData, ThemeData } from "@ren/ui/panels";
import type { PropSchema, PropValues } from "../types";

export type ComponentBuilderContextType = {
  isConfigValid: boolean;
  isAIGenerating: boolean;
  isAIGeneratingRef: React.RefObject<boolean>;
  componentNameRef?: React.RefObject<HTMLInputElement | null>;
  componentDescriptionRef?: React.RefObject<HTMLTextAreaElement | null>;
  componentKeywordsRef?: React.RefObject<HTMLDivElement | null>;
  componentPropsRef?: React.RefObject<PropSchema[]>;
  componentCodeRef?: React.RefObject<CodeEditorType | null>;
  styleValue: StyleData;
  componentName: string;
  componentDescription: string;
  componentKeywords: string[];
  componentProps: PropSchema[];
  componentCode: string;
  themeValue: ThemeData;
  propsValue: PropValues;
  transformedCode: string | null;
  setPropsValue: React.Dispatch<React.SetStateAction<PropValues>>;
  setThemeValue: React.Dispatch<React.SetStateAction<ThemeData>>;
  setIsAIGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  setStyleValue: React.Dispatch<React.SetStateAction<StyleData>>;
  setComponentName: React.Dispatch<React.SetStateAction<string>>;
  setComponentDescription: React.Dispatch<React.SetStateAction<string>>;
  setComponentKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  setComponentProps: React.Dispatch<React.SetStateAction<PropSchema[]>>;
  setComponentCode: React.Dispatch<React.SetStateAction<string>>;
  setTransformedCode: React.Dispatch<React.SetStateAction<string | null>>;
  resetComponentBuilder: () => void;
};
