import type { StyleData } from "@/components/panels/style-panel/type";
import type { CodeMirrorRef, PropSchema } from "../types";

export type ComponentBuilderContextType = {
  isConfigValid: boolean;
  isAIGenerating: boolean;
  isAIGeneratingRef: React.MutableRefObject<boolean>;
  componentNameRef?: React.RefObject<HTMLInputElement>;
  componentDescriptionRef?: React.RefObject<HTMLTextAreaElement>;
  componentKeywordsRef?: React.MutableRefObject<string[]>;
  componentPropsRef?: React.MutableRefObject<PropSchema[]>;
  componentCodeRef?: React.RefObject<CodeMirrorRef>;
  styleValue: StyleData;
  componentName: string;
  componentDescription: string;
  componentKeywords: string[];
  componentProps: PropSchema[];
  componentCode: string;
  setIsAIGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  setStyleValue: React.Dispatch<React.SetStateAction<StyleData>>;
  setComponentName: React.Dispatch<React.SetStateAction<string>>;
  setComponentDescription: React.Dispatch<React.SetStateAction<string>>;
  setComponentKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  setComponentProps: React.Dispatch<React.SetStateAction<PropSchema[]>>;
  setComponentCode: React.Dispatch<React.SetStateAction<string>>;
};
