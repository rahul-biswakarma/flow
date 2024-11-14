import type { FieldType } from "../types";

export interface DetectedSchemaField {
  name: string;
  type: FieldType;
  required: boolean;
  unique: boolean;
  description?: string;
}

export interface DetectedSchema {
  name: string;
  description?: string;
  fields: DetectedSchemaField[];
}
