export type FieldType =
  | "text"
  | "number"
  | "boolean"
  | "date"
  | "reference"
  | "array"
  | "object"
  | "rich-text"
  | "image"
  | "file";

export interface SchemaField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  unique: boolean;
  description?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  defaultValue?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    options?: string[];
  };
  reference?: {
    schema: string;
    field: string;
  };
  fields?: SchemaField[]; // For object/array types
}

export interface Schema {
  id: string;
  name: string;
  description?: string;
  fields: SchemaField[];
  timestamps: boolean;
  softDelete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
