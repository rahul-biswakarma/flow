export interface ComponentData {
  name: string;
  description: string;
  author: string;
  previewUrl: string;
  keywords: string[];
  props: PropSchema[];
  code: string;
}

export interface PropSchema {
  category: string;
  visualName: string;
  propName: string;
  propType: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

export interface PreviewProps {
  code: string;
  props: Array<{
    prop_name: string;
    prop_type: string;
    default_value?: string;
  }>;
}
