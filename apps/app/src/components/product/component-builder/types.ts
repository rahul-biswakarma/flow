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
export type StreamDataStatus = "not-started" | "in-progress" | "complete";

export interface PropSchema {
  id: string;
  visualName: string;
  propName: string;
  propType: PropsType;
  description?: string;
  required?: boolean;
  isList?: boolean;
  objectSchema?: ObjectSchema;
}

export interface ObjectSchemaProperty {
  type: PropsType;
  properties?: ObjectSchema;
}

export interface ObjectSchema {
  [key: string]: ObjectSchemaProperty;
}

export interface GenerationState {
  name: boolean;
  description: boolean;
  keywords: boolean;
  props: boolean;
  code: boolean;
}

export interface GenerationStatus {
  isGenerating: boolean;
  completed: GenerationState;
  current: keyof GenerationState | null;
}
