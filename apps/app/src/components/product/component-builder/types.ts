export interface ComponentData {
  name: string;
  description: string;
  author: string;
  previewUrl: string;
  keywords: string[];
  props: PropSchema[];
  code: string;
}

export type PropsType = "string" | "number" | "boolean" | "object" | "self";

export interface PropSchema {
  visualName: string;
  propName: string;
  propType: PropsType;
  description?: string;
  required?: boolean;
  isList?: boolean;
}

export interface PreviewProps {
  code: string;
  props: Array<{
    prop_name: string;
    prop_type: string;
    default_value?: string;
  }>;
}