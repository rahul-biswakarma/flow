export interface ComponentData {
  name: string;
  description: string;
  author: string;
  preview_url: string;
  keywords: string[];
  props: Prop[];
  types: Type[];
  code: string;
}

interface Prop {
  category: string;
  visual_name: string;
  prop_name: string;
  prop_type: string;
  description: string;
  required: boolean;
  default_value?: string;
}

interface Type {
  type_name: string;
  type_definition: Record<string, string>;
}

export interface PreviewProps {
  code: string;
  props: Array<{
    prop_name: string;
    prop_type: string;
    default_value?: string;
  }>;
}
