import { AIChat } from "@v1/ai/ai-chat";
import { useCallback } from "react";
import { useSchemas } from "../use-schemas";
import type { DetectedSchema } from "./types";

export const ChatInterface = () => {
  const { createSchema, updateSchema } = useSchemas();

  const handleSchemaDetected = useCallback(
    (schema: DetectedSchema) => {
      const newSchema = createSchema();
      updateSchema({
        ...newSchema,
        name: schema.name,
        description: schema.description,
        fields: schema.fields.map((field) => ({
          ...field,
          id: crypto.randomUUID(),
        })),
      });
    },
    [createSchema, updateSchema],
  );

  const handleMessage = (message: string) => {
    try {
      // Look for JSON schema definitions in the message
      const schemaMatch = message.match(/```json\n([\s\S]*?)```/);
      if (schemaMatch?.[1]) {
        const schema = JSON.parse(schemaMatch[1]);
        if (schema.name && schema.fields) {
          handleSchemaDetected(schema);
        }
      }
    } catch (error) {
      console.error("Error processing schema:", error);
    }
  };

  return (
    <AIChat
      api="/api/ai/sb"
      title="Schema Assistant"
      placeholder="Describe your schema needs..."
      onMessageComplete={handleMessage}
      onError={(error) => {
        console.error("Chat error:", error);
      }}
    />
  );
};
