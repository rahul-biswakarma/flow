export interface PropOptions {
  label: string;
  value: string;
}

export interface ComponentData {
  name: string;
  description: string;
  author: string;
  previewUrl: string;
  keywords: string[];
  props: PropSchema[];
  code: string;
}

export type PropsType =
  | "string"
  | "text"
  | "number"
  | "boolean"
  | "object"
  | "dropdown"
  | "self";
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
  options?: PropOptions[];
}

export interface ObjectSchemaProperty {
  name: string;
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

export interface ObjectPropValue {
  [key: string]: BasePropValue;
}

export type BasePropValue = string | number | boolean | ObjectPropValue | null;

export type PropValues = Record<string, BasePropValue | BasePropValue[]>;
