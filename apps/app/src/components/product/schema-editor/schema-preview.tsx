import { ScrollArea } from "@v1/ui/scroll-area";
import { Text } from "@v1/ui/text";
import type { Schema } from "./types";

interface SchemaPreviewProps {
  schema: Schema | null;
}

export const SchemaPreview = ({ schema }: SchemaPreviewProps) => {
  if (!schema) {
    return (
      <div className="h-full flex items-center justify-center">
        <Text size="2" className="text-gray-11">
          Select a schema to preview
        </Text>
      </div>
    );
  }

  const generateTypeScript = (schema: Schema): string => {
    const fields = schema.fields
      .map((field) => {
        const type = getTypeScriptType(field);
        const optional = field.required ? "" : "?";
        return `  ${field.name}${optional}: ${type};`;
      })
      .join("\n");

    const timestamps = schema.timestamps
      ? "\n  createdAt: Date;\n  updatedAt: Date;"
      : "";

    const softDelete = schema.softDelete ? "\n  deletedAt?: Date;" : "";

    return `interface ${schema.name} {
${fields}${timestamps}${softDelete}
}`;
  };

  const getTypeScriptType = (field: Schema["fields"][0]): string => {
    switch (field.type) {
      case "text":
      case "rich-text":
        return "string";
      case "number":
        return "number";
      case "boolean":
        return "boolean";
      case "date":
        return "Date";
      case "reference":
        return `Ref<${field.reference?.schema || "unknown"}>`;
      case "array":
        return "any[]";
      case "object":
        return "Record<string, any>";
      case "image":
      case "file":
        return "string";
      default:
        return "any";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-outline-02">
        <Text size="2" weight="medium">
          Preview
        </Text>
      </div>
      <ScrollArea className="flex-1">
        <pre className="p-4 font-mono text-sm">
          <code>{generateTypeScript(schema)}</code>
        </pre>
      </ScrollArea>
    </div>
  );
};
